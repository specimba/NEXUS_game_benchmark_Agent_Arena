#!/usr/bin/env python3
"""
NEXUS Agent Arena — score aggregator (reference implementation).

Pure, external aggregation. Reads evidence JSON (ops/evidence_schema.json v2 format)
and computes, per game:
    - category scores  (0-10) and OVERALL_raw (0-100)
    - hard-failure penalty and OVERALL_adj
    - score ceilings  (OVERALL = min(OVERALL_adj, ceilings))
    - pillar scores   (technical reliability / creative / gameplay / flow / defect severity)
And across pairs:
    - pairwise win/loss record and a Bradley-Terry / Elo-anchored ranking
      with bootstrap confidence intervals.

SINGLE SOURCE OF TRUTH: weights, criteria id sets, ceilings and penalty constants are
loaded from benchmark/contracts/RUBRIC_v2.json (canonical), NOT hard-coded here.
benchmark/ops/consistency_check.py fails if this module ever drifts from the contract
again (historically the aggregator silently ignored M7/M8, G7, V6-V9, A6 and CEIL-5..9).

This module contains NO scoring logic that ships with a game. It only reads external
evidence. Containment is an operational requirement enforced at freeze/audit time.

Usage:
    python aggregate_scores.py <evidence_dir> [--pairs pairs.json] [--bt]
                               [--contract PATH]

Evidence layout, v2 (one frozen record per game, no pairwise content inside):
    <evidence_dir>/game_A.json   {"game": "A", ... schema ...}
    <evidence_dir>/game_B.json   {"game": "B", ... schema ...}
    <evidence_dir>/pairwise_result.json   separate pairwise receipt (optional, canonical)
Legacy layouts still accepted:
    combined pair file  {"game_a": {...}, "game_b": {...}, "pairwise": {"winner": ...}}
    per-game file with legacy "pairwise_verdict" (deprecated — v2 schema forbids it)

--pairs pairs.json : optional list of {"a": "A", "b": "B", "winner": "A|B|tie"} to fit
                     a Bradley-Terry ranking across many pair results.
--contract PATH    : override the rubric contract (default benchmark/contracts/RUBRIC_v2.json;
                     may also be set with the NEXUS_RUBRIC_CONTRACT environment variable).
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import os
import random
import sys
from collections import defaultdict
from pathlib import Path

# --------------------------------------------------------------------------
# Rubric contract (canonical: benchmark/contracts/RUBRIC_v2.json)
# --------------------------------------------------------------------------

DEFAULT_CONTRACT = Path(__file__).resolve().parents[1] / "contracts" / "RUBRIC_v2.json"


def load_contract(path: str | os.PathLike | None = None) -> tuple[dict, str]:
    """Load the rubric contract JSON. Path resolution order:
    explicit argument > NEXUS_RUBRIC_CONTRACT env var > repository canonical file.
    Returns (parsed contract, sha256 of contract file bytes)."""
    p = None
    if path:
        p = Path(path)
    elif os.environ.get("NEXUS_RUBRIC_CONTRACT"):
        p = Path(os.environ["NEXUS_RUBRIC_CONTRACT"])
    else:
        p = DEFAULT_CONTRACT
    if not p.exists():
        sys.exit(f"[fatal] rubric contract not found: {p} — run consistency_check.py")
    raw = p.read_bytes()
    data = json.loads(raw.decode("utf-8"))
    if data.get("weights_sum_check") != 100:
        sys.exit(f"[fatal] rubric contract {p} weights no longer sum to 100")
    return data, hashlib.sha256(raw).hexdigest()


_CONTRACT, CONTRACT_SHA256 = load_contract()
CONTRACT_ID = f"{_CONTRACT['contract_id']} v{_CONTRACT['version']}"

# Rubric weights (from contract). Sum = 100.
WEIGHTS = {k: int(v) for k, v in _CONTRACT["weights"].items()}
CATEGORIES = sorted(WEIGHTS, key=lambda c: -WEIGHTS[c])

# Sub-criterion ids per category (rubric §2.2) — from contract.
CRITERIA = {k: list(v) for k, v in _CONTRACT["criteria"].items()}

SEV_HARD_POINTS = dict(_CONTRACT["penalties"]["hard_by_severity"])
SEV_SEV_POINTS = dict(_CONTRACT["penalties"]["defect_severity_by_severity"])
HARD_PENALTY_CAP = float(_CONTRACT["penalties"]["hard_cap"])

CEILINGS = {k: float(v) for k, v in _CONTRACT["ceilings"].items()}


def category_score(sub_scores: dict, cat: str) -> tuple[float, int, list[int]]:
    """Return (category 0-10, number of scored criteria, list of scored sub-scores)."""
    vals = []
    for cid in CRITERIA[cat]:
        v = sub_scores.get(cat, {}).get(cid)
        if isinstance(v, (int, float)) and v is not None:
            vals.append(float(v))
    if not vals:
        return 0.0, 0, []
    return round(sum(vals) / len(vals) * 2.0, 1), len(vals), [int(v) for v in vals]


def hard_failures(defects: list[dict]) -> tuple[int, int, float]:
    blockers = sum(1 for d in defects if d.get("severity") == "Blocker" and not d.get("resolved_as_harness"))
    criticals = sum(1 for d in defects if d.get("severity") == "Critical" and not d.get("resolved_as_harness"))
    penalty = min(HARD_PENALTY_CAP, blockers * SEV_HARD_POINTS["Blocker"] + criticals * SEV_HARD_POINTS["Critical"])
    return blockers, criticals, round(penalty, 1)


def min_sev_counts(defects: list[dict]) -> tuple[int, int]:
    minor = sum(1 for d in defects if d.get("severity") == "Minor")
    trivial = sum(1 for d in defects if d.get("severity") == "Trivial")
    return minor, trivial


def aggregate_game(data: dict) -> dict:
    game = data["game"]
    sub = data.get("sub_scores", {})
    defects = data.get("defects", [])

    cats = {}
    scored = {}
    for c in CATEGORIES:
        sc, n, vals = category_score(sub, c)
        cats[c] = sc
        scored[c] = n

    # category scores are 0-10; weights sum to 100 (percent) => raw overall in 0-100
    overall_raw = sum(WEIGHTS[c] * cats[c] for c in CATEGORIES) / 10.0
    blockers, criticals, hard_pen = hard_failures(defects)
    overall_adj = max(0.0, overall_raw - hard_pen)

    ceilings_hit = []
    for c in data.get("ceilings", []):
        if c in CEILINGS:
            ceilings_hit.append(c)
    overall = overall_adj
    for c in CEILINGS:
        if c in ceilings_hit:
            overall = min(overall, CEILINGS[c])
    overall = round(overall, 1)

    minor, trivial = min_sev_counts(defects)
    defect_sev = max(0.0, 100 - hard_pen - minor * SEV_SEV_POINTS["Minor"] - trivial * SEV_SEV_POINTS["Trivial"])
    defect_sev = round(defect_sev, 1)

    norm_hard = min(100.0, hard_pen / HARD_PENALTY_CAP * 100.0)
    tech_rel = round(0.70 * (cats["T"] * 10) + 0.30 * (100 - norm_hard), 1)
    creative = round((0.45 * cats["V"] + 0.40 * cats["A"] + 0.15 * cats["X"]) * 10, 1)
    gameplay = round((0.50 * cats["M"] + 0.50 * cats["G"]) * 10, 1)
    flow = round((0.60 * cats["F"] + 0.20 * cats["A"] + 0.20 * cats["G"]) * 10, 1)

    return {
        "game": game,
        "category_scores": cats,
        "criteria_scored": scored,
        "overall_raw": round(overall_raw, 1),
        "hard_penalty": hard_pen,
        "overall_adj": round(overall_adj, 1),
        "ceilings_hit": ceilings_hit,
        "overall": overall,
        "hard_failures": {"blockers": blockers, "criticals": criticals},
        "pillars": {
            "technical_reliability": tech_rel,
            "creative_presentation": creative,
            "gameplay": gameplay,
            "flow_engagement": flow,
            "defect_severity": defect_sev,
        },
        "defect_counts": {"blocker": blockers, "critical": criticals, "major": sum(
            1 for d in defects if d.get("severity") == "Major"), "minor": minor, "trivial": trivial},
    }


# ---------- Bradley-Terry ranking ----------

LOG_CLAMP = 10.0  # clamp log-strength to avoid infinite MLE on sparse/degenerate data


def fit_bt(comparisons: list[tuple[str, str, float]], tol: float = 1e-12, max_iter: int = 5000) -> dict[str, float]:
    """Order-independent Bradley-Terry MLE via the stable MM (minorize-maximize) update
    (Hunter, 2004). comparisons = (winner_label, loser_label, weight).
    Returns log-strength per label (clamped to [-LOG_CLAMP, LOG_CLAMP]).

    MM update in weights (w_i = exp(logp_i)):
        w_i_new = Wins_i / sum_j [ N_ij / (w_i + w_j) ]
    which has the same fixed point as the MLE gradient condition
        Wins_i = sum_j N_ij * w_i / (w_i + w_j).
    """
    labels = set()
    for a, b, _ in comparisons:
        labels.add(a)
        labels.add(b)
    labels = sorted(labels)
    if not labels:
        return {}
    logp = {lbl: 0.0 for lbl in labels}

    # per-pair totals
    wins = defaultdict(float)      # label -> total weighted wins
    pair_n = defaultdict(float)    # sorted (x,y) -> total weighted comparisons
    for w, l, wt in comparisons:
        wins[w] += wt
        pair_n[tuple(sorted((w, l)))] += wt

    for _ in range(max_iter):
        delta = 0.0
        for x in labels:
            denom = 0.0
            for (i, j), n in pair_n.items():
                if i == x:
                    denom += n / (math.exp(logp[x]) + math.exp(logp[j]))
                elif j == x:
                    denom += n / (math.exp(logp[i]) + math.exp(logp[x]))
            if denom > 0:
                new = math.log(wins[x]) - math.log(denom) if wins[x] > 0 else -LOG_CLAMP
            else:
                new = logp[x]
            new = max(-LOG_CLAMP, min(LOG_CLAMP, new))
            delta = max(delta, abs(new - logp[x]))
            logp[x] = new
        if delta < tol:
            break
    # normalize (sum logp = 0) for identifiability
    mean = sum(logp.values()) / len(logp)
    for lbl in labels:
        logp[lbl] -= mean
    return logp


def bt_to_elo(logp: dict[str, float], anchor: float = 1500.0, scale: float = 400.0 / math.log(10)) -> dict[str, float]:
    """Map log-strengths to Elo-like anchored scores."""
    return {lbl: anchor + scale * v for lbl, v in logp.items()}


def bootstrap_ci(comparisons: list[tuple[str, str, float]], n_boot: int = 1000,
                 seed: int = 0) -> dict[str, tuple[float, float]]:
    """Bootstrap 95% CI on Elo ratings (order-independent fit per resample)."""
    rng = random.Random(seed)
    labels = sorted({lbl for a, b, _ in comparisons for lbl in (a, b)})
    ratings = []                      # list of {label: elo}
    n = len(comparisons)
    for _ in range(n_boot):
        sample = [rng.choice(comparisons) for _ in range(n)]
        ratings.append(bt_to_elo(fit_bt(sample)))
    out = {}
    for lbl in labels:
        vals = sorted(r[lbl] for r in ratings if lbl in r)
        if len(vals) < 2:
            out[lbl] = (1500.0, 1500.0)
        else:
            lo, hi = vals[max(0, int(0.025 * len(vals)) - 1)], vals[min(len(vals) - 1, int(0.975 * len(vals)))]
            out[lbl] = (lo, hi)
    return out


def add_vote(comparisons: list, x: str, y: str, winner: str) -> None:
    """Record a pairwise result between labels x and y.
    winner is 'x', 'y', or 'tie'. A tie becomes two half-weight directional entries so the
    Bradley-Terry fit counts it as a draw rather than a bogus 'tie' label."""
    if winner == "tie":
        comparisons.append((x, y, 0.5))
        comparisons.append((y, x, 0.5))
    elif winner == x:
        comparisons.append((x, y, 1.0))
    elif winner == y:
        comparisons.append((y, x, 1.0))



# ---------- I/O ----------

def load_evidence(dirpath: str) -> tuple[list[dict], list[tuple[str, str, float]]]:
    """Load per-game evidence and pairwise votes from an evidence directory.

    Accepted files:
      * per-game v2 evidence      {"game": "A"|"B", ...} (no pairwise content)
      * canonical pairwise        {"pair_id": ..., "game_a": "A", "game_b": "B",
                                   "winner": "A"|"B"|"tie", ...} (flat receipt)
      * legacy combined pair      {"game_a": {...}, "game_b": {...},
                                   "pairwise": {"winner": ...}}
      * legacy per-game w/        {"game": "A", "pairwise_verdict": {...}}
        pairwise_verdict          (deprecated; v2 schema forbids pairwise in game records)
    Lists (e.g. h2h_pairs.json) are ignored here — pass them via --pairs instead.
    """
    games, comparisons = [], []
    for fn in sorted(os.listdir(dirpath)):
        if not fn.endswith(".json"):
            continue
        path = os.path.join(dirpath, fn)
        try:
            with open(path) as f:
                obj = json.load(f)
        except (OSError, json.JSONDecodeError) as e:
            print(f"[warn] skipping unreadable {fn}: {e}", file=sys.stderr)
            continue
        if not isinstance(obj, dict):
            continue
        if obj.get("game") in ("A", "B"):
            games.append(obj)
            pv = obj.get("pairwise_verdict") or {}
            winner = pv.get("winner")
            if winner in ("A", "B", "tie"):
                # legacy embedded verdict (deprecated in the v2 evidence schema)
                add_vote(comparisons, "A", "B", winner)
        elif isinstance(obj.get("game_a"), dict) and isinstance(obj.get("game_b"), dict):
            # legacy combined pair file
            games.extend([obj["game_a"], obj["game_b"]])
            pw = obj.get("pairwise") or {}
            w = pw.get("winner")
            if w in ("A", "B", "tie"):
                add_vote(comparisons, "A", "B", w)
        elif isinstance(obj.get("game_a"), str) and isinstance(obj.get("game_b"), str):
            # canonical v2 standalone pairwise receipt (pairwise_result*.json)
            w = obj.get("winner")
            if w in ("A", "B", "tie"):
                add_vote(comparisons, obj["game_a"], obj["game_b"], w)
    return games, comparisons


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("evidence_dir", help="directory of evidence JSON files")
    ap.add_argument("--pairs", help="optional pairs.json (list of {'a','b','winner'}) to merge for BT ranking")
    ap.add_argument("--contract", help="override rubric contract JSON (default: benchmark/contracts/RUBRIC_v2.json)")
    ap.add_argument("--bt", action="store_true", help="fit Bradley-Terry ranking + bootstrap CIs")
    ap.add_argument("--seed", type=int, default=0)
    ap.add_argument("--n-boot", type=int, default=1000)
    args = ap.parse_args()

    # (re)load contract if overridden on the command line
    global _CONTRACT, CONTRACT_SHA256, CONTRACT_ID, WEIGHTS, CATEGORIES, CRITERIA, CEILINGS  # noqa: PLW0603
    if args.contract:
        _CONTRACT, CONTRACT_SHA256 = load_contract(args.contract)
        CONTRACT_ID = f"{_CONTRACT['contract_id']} v{_CONTRACT['version']}"
        WEIGHTS = {k: int(v) for k, v in _CONTRACT["weights"].items()}
        CATEGORIES = sorted(WEIGHTS, key=lambda c: -WEIGHTS[c])
        CRITERIA = {k: list(v) for k, v in _CONTRACT["criteria"].items()}
        CEILINGS = {k: float(v) for k, v in _CONTRACT["ceilings"].items()}

    games, comparisons = load_evidence(args.evidence_dir)
    if args.pairs:
        with open(args.pairs) as f:
            for row in json.load(f):
                x, y, w = row.get("a"), row.get("b"), row.get("winner")
                if x and y and w in ("A", "B", "tie"):
                    # rows may use arbitrary labels (e.g. C, D); normalize the vote
                    add_vote(comparisons, x, y, w)

    results = {g["game"]: aggregate_game(g) for g in games}

    print(f"CONTRACT: {CONTRACT_ID}  sha256 {CONTRACT_SHA256[:12]}…")
    print("=== PER-GAME SCORES ===")
    for lbl in sorted(results, key=lambda l: -results[l]["overall"]):
        r = results[lbl]
        print(f"\nGame {lbl}  OVERALL={r['overall']}  (raw {r['overall_raw']}, pen {r['hard_penalty']}, "
              f"adj {r['overall_adj']}, ceilings {r['ceilings_hit'] or 'none'})")
        print("  category:", "  ".join(f"{c}={r['category_scores'][c]}" for c in CATEGORIES))
        print("  pillars :", "  ".join(f"{k}={v}" for k, v in r["pillars"].items()))
        print("  defects :", "  ".join(f"{k}={v}" for k, v in r["defect_counts"].items()))

    if args.bt and comparisons:
        logp = fit_bt(comparisons)
        elo = bt_to_elo(logp)
        cis = bootstrap_ci(comparisons, n_boot=args.n_boot, seed=args.seed)
        print("\n=== PAIRWISE / BRADLEY-TERRY (Elo-like, 95% CI bootstrap) ===")
        for lbl in sorted(elo, key=lambda l: -elo[l]):
            lo, hi = cis[lbl]
            print(f"  {lbl}: Elo {elo[lbl]:.1f}  (CI {lo:.1f}–{hi:.1f})  n={sum(1 for a,b,_ in comparisons if lbl in (a,b))}")
        order = sorted(elo, key=lambda l: -elo[l])
        if len(order) >= 2 and elo[order[0]] - elo[order[1]] > 0:
            print(f"\n  Ranking: {order[0]} > {order[1]}" + (f" (margin {elo[order[0]]-elo[order[1]]:.1f} Elo)"
                    if elo[order[0]] - elo[order[1]] >= 1.0 else " — not separable"))
    else:
        print("\n(skip BT ranking: pass --bt and provide pairwise evidence)")


if __name__ == "__main__":
    main()
