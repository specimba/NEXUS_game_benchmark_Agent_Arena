#!/usr/bin/env python3
"""
NEXUS Agent Arena — decision block generator.

Turns aggregated evidence into the concise one-page "decision" summary defined in
benchmark/08-selection-and-final-decision.md: which game wins, on which pillars, with the
reliability-vs-creative separation and a confidence statement.

It reuses the aggregation math from aggregate_scores.py (category scores, OVERALL,
hard-failure penalties, ceilings, pillars) and applies the decision procedure from 08:
  (1) hard-failure/ceiling gate,
  (2) OVERALL margin,
  (3) pairwise agreement,
  (4) sub-criterion audit on close calls,
  (5) emit a Clear winner / Winner on balance / Tie verdict + confidence.

Usage:
    python decision_block.py <evidence_dir> [--pairs pairs.json] [--seed N] [--n-boot N]
        [--hard-margin 5.0] [--tie-margin 2.0]

The evidence dir must contain evidence for exactly two games (Game A and Game B) for the
head-to-head decision block. The pairwise signal comes from either --pairs with a
head-to-head winner list (e.g. benchmark/examples/synthetic/h2h_pairs.json), or from
standalone v2 pairwise receipts (pairwise_result*.json, contracts/pairwise_result.schema.json)
found inside the evidence dir.

Note: this is a reporting helper and contains NO scoring logic that ships with a game.
"""

from __future__ import annotations

import argparse
import json
import os
import sys

from aggregate_scores import (  # import from sibling module
    CEILINGS,
    aggregate_game,
    load_evidence,
)

# Labels expected for a head-to-head.
AB = ("A", "B")


def _has_ceiling(res: dict) -> bool:
    return len(res.get("ceilings_hit") or []) > 0


def _scan_pairwise_receipts(evidence_dir: str | None) -> list[dict]:
    """Collect canonical v2 pairwise receipts (flat {pair_id, game_a, game_b, winner, ...})
    from the evidence directory. Legacy combined-pair files are NOT double counted here —
    their votes surface through load_evidence()/--pairs instead."""
    receipts: list[dict] = []
    if not evidence_dir:
        return receipts
    for fn in sorted(os.listdir(evidence_dir)):
        if not fn.endswith(".json"):
            continue
        try:
            with open(os.path.join(evidence_dir, fn)) as f:
                obj = json.load(f)
        except (OSError, json.JSONDecodeError):
            continue
        if (isinstance(obj, dict) and obj.get("pair_id")
                and isinstance(obj.get("game_a"), str)
                and isinstance(obj.get("game_b"), str)
                and obj.get("winner") in ("A", "B", "tie")):
            receipts.append(obj)
    return receipts


def pairwise_signal(pairs_path: str | None, evidence_dir: str | None = None
                    ) -> tuple[str, float, bool]:
    """Return (winner_label|'tie'|'none', confidence, both_orderings_agree).

    Votes come from --pairs rows ({a,b,winner}) and/or canonical v2 pairwise receipts
    found in the evidence dir. A tie vote counts toward the tie bucket; the confidence is
    the winning vote share."""
    a = b = tie = 0
    if pairs_path:
        with open(pairs_path) as f:
            rows = json.load(f)
        for r in rows:
            w = r.get("winner")
            if w == r.get("a"):
                a += 1
            elif w == r.get("b"):
                b += 1
            elif w == "tie":
                tie += 1
    receipts = _scan_pairwise_receipts(evidence_dir)
    receipt_agree = True
    for r in receipts:
        w = r.get("winner")
        if w == r.get("game_a"):
            a += 1
        elif w == r.get("game_b"):
            b += 1
        elif w == "tie":
            tie += 1
        if r.get("both_orderings_agree") is False:
            receipt_agree = False
    total = a + b + tie
    if total == 0:
        return "none", 0.0, False
    if a > b and a >= b + tie:
        return "A", a / total, receipt_agree
    if b > a and b >= a + tie:
        return "B", b / total, receipt_agree
    if a == b:
        return "tie", max(a, b) / total if total else 0.0, receipt_agree
    return ("A" if a > b else "B"), max(a, b) / total, receipt_agree


def decide(results: dict, hard_margin: float, tie_margin: float, pw: tuple) -> dict:
    """Apply benchmark/08 decision rules. Returns the decision block fields."""
    a, b = results["A"], results["B"]
    ca, cb = _has_ceiling(a), _has_ceiling(b)
    overall_diff = a["overall"] - b["overall"]  # + = A ahead

    # Rule 1: hard-failure/ceiling gate.
    if ca and not cb:
        winner = "B"
        basis = "hard_failure"
        confidence = "MEDIUM"
    elif cb and not ca:
        winner = "A"
        basis = "hard_failure"
        confidence = "MEDIUM"
    elif ca and cb:
        # both gated: fall through to margin
        winner = None
        basis = "both_failed"
        confidence = "LOW"
    else:
        winner = None
        basis = None
        confidence = None

    if basis is None:
        if abs(overall_diff) < tie_margin:
            winner, basis, confidence = "tie", "margin_inside_tie", "MEDIUM"
        elif abs(overall_diff) >= hard_margin:
            winner = "A" if overall_diff > 0 else "B"
            basis = "clear_margin"
            confidence = "HIGH" if abs(overall_diff) >= 2 * hard_margin else "MEDIUM"
        else:
            # narrow margin: pairwise + sub-criteria decide
            pw_w, pw_conf, agree = pw
            if pw_w == "tie":
                winner, basis, confidence = "tie", "narrow_margin_pairwise_tie", "LOW"
            elif pw_w in AB:
                if (pw_w == "A") == (overall_diff > 0):
                    winner, basis = pw_w, "narrow_margin_pairwise_agrees"
                else:
                    winner, basis = "tie", "narrow_margin_pairwise_conflict"
                confidence = "LOW"
            else:
                winner, basis, confidence = "tie", "narrow_margin_no_signal", "LOW"

    return {
        "winner": winner,
        "basis": basis,
        "confidence": confidence,
        "overall_diff": round(overall_diff, 1),
        "ceiling_a": ca, "ceiling_b": cb,
    }


def _v0(raw_game: dict):
    """Pull the V0 sub-score (graphical originality) from raw evidence, or '-'."""
    v = (raw_game.get("sub_scores") or {}).get("V") or {}
    val = v.get("V0")
    return val if isinstance(val, (int, float)) else "-"


def format_block(results: dict, decision: dict, pw: tuple, hard_margin: float, raw: dict) -> str:
    a, b = results["A"], results["B"]
    winner = decision["winner"]
    winner_word = {"A": "Game A wins", "B": "Game B wins", "tie": "TIE / NOT SEPARABLE"}[winner]

    def line(label, av, bv, better):
        return f"  {label:<14} A = {av:<6} | B = {bv:<6}  ({better})"

    better = "A better" if a["overall"] > b["overall"] else ("B better" if b["overall"] > a["overall"] else "even")

    block = []
    block.append("=" * 66)
    block.append("DECISION BLOCK — head-to-head")
    block.append(f"  DECISION : {winner_word}")
    block.append(f"  Basis    : {decision['basis']}   Confidence: {decision['confidence']}")
    block.append("-" * 66)
    block.append(line("OVERALL", a["overall"], b["overall"], better))
    pa, pb = a["pillars"], b["pillars"]
    block.append(line("Reliability", pa["technical_reliability"], pb["technical_reliability"],
                      "A" if pa["technical_reliability"] > pb["technical_reliability"] else "B"))
    block.append(line("Creative", pa["creative_presentation"], pb["creative_presentation"],
                      "A" if pa["creative_presentation"] > pb["creative_presentation"] else "B"))
    block.append(line("Gameplay", pa["gameplay"], pb["gameplay"],
                      "A" if pa["gameplay"] > pb["gameplay"] else "B"))
    block.append(line("Flow", pa["flow_engagement"], pb["flow_engagement"],
                      "A" if pa["flow_engagement"] > pb["flow_engagement"] else "B"))
    block.append(line("DefectSev", pa["defect_severity"], pb["defect_severity"],
                      "A" if pa["defect_severity"] > pb["defect_severity"] else "B"))
    block.append("-" * 66)
    block.append(f"  Originality (V0) : A = {_v0(raw['A'])} | B = {_v0(raw['B'])}  (separate creative signal)")
    block.append(f"  Ceilings          : A = {a['ceilings_hit'] or 'none'} | B = {b['ceilings_hit'] or 'none'}")
    block.append(f"  Hard failures     : A = {a['hard_failures']} | B = {b['hard_failures']}")
    pw_w, pw_conf, agree = pw
    block.append(f"  Pairwise          : winner={pw_w}  confidence={pw_conf:.2f}  both_orderings_agree={agree}")
    block.append("=" * 66)
    return "\n".join(block)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("evidence_dir")
    ap.add_argument("--pairs", help="head-to-head pairs.json for the pairwise signal")
    ap.add_argument("--hard-margin", type=float, default=5.0, help="OVERALL margin for a clear winner")
    ap.add_argument("--tie-margin", type=float, default=2.0, help="OVERALL margin below which = tie")
    ap.add_argument("--seed", type=int, default=0, help="accepted for parity with aggregate_scores")
    ap.add_argument("--n-boot", type=int, default=1000, help="accepted for parity (not used in the block)")
    args = ap.parse_args()

    games, comparisons = load_evidence(args.evidence_dir)
    # Keep only head-to-head games A and B for the decision block.
    labels = {g["game"] for g in games}
    unknown = labels - set(AB)
    if unknown:
        print(f"[info] ignoring non-head-to-head labels found in evidence: {sorted(unknown)}", file=sys.stderr)
    results = {g["game"]: aggregate_game(g) for g in games if g["game"] in AB}
    raw = {g["game"]: g for g in games if g["game"] in AB}
    if set(results.keys()) != set(AB):
        sys.exit(f"[error] need evidence for both Game A and Game B; found {sorted(results.keys())}")

    pw = pairwise_signal(args.pairs, args.evidence_dir)
    decision = decide(results, args.hard_margin, args.tie_margin, pw)
    print(format_block(results, decision, pw, args.hard_margin, raw))


if __name__ == "__main__":
    main()
