#!/usr/bin/env python3
"""
NEXUS Agent Arena — evidence record validator (dependency-free).

Validates evidence files against the v2 evidence contract
(benchmark/ops/evidence_schema.json semantics + benchmark/contracts/RUBRIC_v2.json
criteria/ceiling pins) WITHOUT requiring the jsonschema library.

Accepts:
  * per-game v2 evidence records  {"game": "A"|"B", meta, sessions, sub_scores, ...}
  * canonical v2 pairwise receipts {"pair_id", "game_a", "game_b", "winner", ...}
    (benchmark/contracts/pairwise_result.schema.json semantics — light checks)
  * legacy combined pair files    {"game_a": {...}, "game_b": {...}} (both validated)

Usage:
    python validate_evidence.py <evidence_dir>
    python validate_evidence.py <file.json> [<file.json> ...]
Exit code 0 = all files valid; 1 = at least one file has problems.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parent  # benchmark/
CONTRACT = json.loads((REPO / "contracts" / "RUBRIC_v2.json").read_text(encoding="utf-8"))

CRITERIA = CONTRACT["criteria"]
CATEGORIES = set(CRITERIA)
CEILING_IDS = set(CONTRACT["ceilings"])
SESSIONS_RE = re.compile(r"^S[1-9][ab]?$")
SHA256_RE = re.compile(r"^[0-9a-f]{64}$")

META_REQUIRED = [
    "hardware", "browser_matrix", "evaluator", "ordering", "judge_family",
    "rubric_version", "prompt_version", "contract_version", "contract_sha256",
]
META_REQUIRED_DEFECT = [
    "id", "severity", "class", "title", "reproduction",
    "blocks_progress", "recoverable", "score_channel",
]
SEVERITIES = {"Blocker", "Critical", "Major", "Minor", "Trivial"}
SCORE_CHANNELS = {"HARD_PENALTY", "CATEGORY", "DEFECT_SEVERITY", "CONTAINMENT"}
RECOVERABLE = {"restart", "reload", "self_resolved", "none"}
COVERAGE = {"FULL", "PARTIAL", "NOT_SCORED"}
WINNERS = {"A", "B", "tie"}


def problems_for_game(g: dict, label: str) -> list[str]:
    """Return a list of human-readable problems for one per-game evidence record."""
    out: list[str] = []
    if not isinstance(g, dict):
        return [f"{label}: not an object"]
    if g.get("game") not in ("A", "B"):
        out.append(f"{label}: 'game' must be 'A' or 'B' (got {g.get('game')!r})")
    if "pairwise_verdict" in g:
        out.append(f"{label}: pairwise_verdict is FORBIDDEN in a game evidence record "
                   f"(move it to a separate pairwise_result.json)")
    meta = g.get("meta")
    if not isinstance(meta, dict):
        out.append(f"{label}: missing 'meta' object")
    else:
        for k in META_REQUIRED:
            if k not in meta:
                out.append(f"{label}: meta missing required '{k}'")
        if meta.get("ordering") not in ("A-first", "B-first"):
            out.append(f"{label}: meta.ordering must be A-first or B-first")
        cs = meta.get("contract_sha256")
        if cs and not SHA256_RE.match(str(cs)):
            out.append(f"{label}: meta.contract_sha256 must be 64 hex chars")

    sessions = g.get("sessions")
    if not isinstance(sessions, dict) or not sessions:
        out.append(f"{label}: 'sessions' object with >=1 archetype required (S1..S9, S4a/S4b)")
    elif isinstance(sessions, dict):
        for sid, s in sessions.items():
            if not SESSIONS_RE.match(sid):
                out.append(f"{label}: session id {sid!r} invalid (expect S1..S9 / S4a / S4b)")
            if not isinstance(s, dict) or "duration_seconds" not in s or "objective_met" not in s:
                out.append(f"{label}: session {sid} missing duration_seconds/objective_met")

    sub = g.get("sub_scores")
    if not isinstance(sub, dict):
        out.append(f"{label}: missing 'sub_scores' object")
    else:
        for cat, scores in sub.items():
            if cat not in CATEGORIES:
                out.append(f"{label}: unknown category {cat!r}")
                continue
            if not isinstance(scores, dict):
                out.append(f"{label}: sub_scores.{cat} must be an object")
                continue
            for cid, v in scores.items():
                if cid not in CRITERIA[cat]:
                    out.append(f"{label}: {cid} is not a criterion of {cat} "
                               f"(contract lists {CRITERIA[cat]})")
                elif not isinstance(v, int) or isinstance(v, bool) or not (0 <= v <= 5):
                    out.append(f"{label}: {cid} must be an integer 0..5 (got {v!r})")

    na = g.get("not_applicable") or {}
    na_flat = set()
    if not isinstance(na, dict):
        out.append(f"{label}: not_applicable must be an object (category -> ids)")
    else:
        for cat, ids in na.items():
            if cat not in CATEGORIES:
                out.append(f"{label}: not_applicable unknown category {cat!r}")
                continue
            if not isinstance(ids, list):
                out.append(f"{label}: not_applicable.{cat} must be a list")
                continue
            for cid in ids:
                if cid not in CRITERIA[cat]:
                    out.append(f"{label}: not_applicable {cid} is not a criterion of {cat}")
                na_flat.add(f"{cat}.{cid}")

    coverage = g.get("coverage")
    if not isinstance(coverage, dict):
        out.append(f"{label}: missing 'coverage' object")
    else:
        for cat, cov in coverage.items():
            if cat not in CATEGORIES:
                out.append(f"{label}: coverage unknown category {cat!r}")
                continue
            if cov not in COVERAGE:
                out.append(f"{label}: coverage.{cat} must be FULL/PARTIAL/NOT_SCORED (got {cov!r})")
            if isinstance(sub, dict) and isinstance(sub.get(cat), dict):
                present = set(sub[cat])
                missing = set(CRITERIA[cat]) - present
                missing_na = {c for c in missing if f"{cat}.{c}" in na_flat}
                if cov == "FULL" and missing - missing_na:
                    out.append(f"{label}: coverage.{cat}=FULL but unscored (non-N/A) criteria: "
                               f"{sorted(missing - missing_na)}")
                if present & na_flat:
                    out.append(f"{label}: criterion scored and listed not_applicable: "
                               f"{sorted(present & na_flat)}")
        unknown_na_cat = set(na) - set(coverage or {})
        if unknown_na_cat:
            out.append(f"{label}: not_applicable categories missing from coverage: {sorted(unknown_na_cat)}")

    ceilings = g.get("ceilings") or []
    if not isinstance(ceilings, list):
        out.append(f"{label}: ceilings must be a list")
    else:
        for cid in ceilings:
            if cid not in CEILING_IDS:
                out.append(f"{label}: unknown ceiling {cid!r} (contract lists CEIL-1..9)")

    defects = g.get("defects")
    if not isinstance(defects, list):
        out.append(f"{label}: 'defects' list required")
    else:
        for i, d in enumerate(defects):
            if not isinstance(d, dict):
                out.append(f"{label}: defect #{i} not an object")
                continue
            for k in META_REQUIRED_DEFECT:
                if k not in d:
                    out.append(f"{label}: defect #{i} missing '{k}'")
            if d.get("severity") not in SEVERITIES:
                out.append(f"{label}: defect #{i} bad severity {d.get('severity')!r}")
            if d.get("score_channel") not in SCORE_CHANNELS:
                out.append(f"{label}: defect #{i} bad score_channel {d.get('score_channel')!r}")
            if d.get("recoverable") not in RECOVERABLE:
                out.append(f"{label}: defect #{i} bad recoverable {d.get('recoverable')!r}")
    return out


def problems_for_pairwise(p: dict, label: str) -> list[str]:
    """Light structural checks on a canonical pairwise receipt (full JSON-schema
    conformance is enforced by contracts/pairwise_result.schema.json for tools that
    use a JSON-schema validator)."""
    out: list[str] = []
    for k in ("pair_id", "game_a", "game_b", "winner", "confidence",
              "both_orderings_agree", "evaluator", "ordering", "contract_version"):
        if k not in p:
            out.append(f"{label}: pairwise receipt missing '{k}'")
    if p.get("game_a") != "A" or p.get("game_b") != "B":
        out.append(f"{label}: game_a/game_b must be A/B")
    if p.get("winner") not in WINNERS:
        out.append(f"{label}: winner must be A/B/tie")
    if "evidence_hashes" in p:
        eh = p["evidence_hashes"]
        if not isinstance(eh, dict) or "game_a_evidence" not in eh or "game_b_evidence" not in eh:
            out.append(f"{label}: evidence_hashes requires game_a_evidence/game_b_evidence")
    return out


def validate_file(path: Path) -> tuple[str, list[str]]:
    try:
        obj = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as e:
        return path.name, [f"unreadable/invalid JSON: {e}"]
    if not isinstance(obj, dict):
        if isinstance(obj, list):
            # legacy --pairs vote-row list ({"a","b","winner"}) — legitimate BT input
            bad = []
            if not obj:
                return path.name, ["empty vote list"]
            for i, row in enumerate(obj):
                a, b, w = (row.get("a"), row.get("b"), row.get("winner")) if isinstance(row, dict) else (None, None, None)
                if not a or not b or w not in (a, b, "tie"):
                    bad.append(f"row {i}: need a/b/winner (winner must be a, b or 'tie')")
            if bad:
                return path.name, bad
            return path.name, []
        return path.name, ["top-level must be a JSON object"]

    if isinstance(obj.get("game"), str):
        return path.name, problems_for_game(obj, path.name)
    if isinstance(obj.get("game_a"), str) and isinstance(obj.get("game_b"), str) \
            and "winner" in obj:
        return path.name, problems_for_pairwise(obj, path.name)
    if isinstance(obj.get("game_a"), dict) and isinstance(obj.get("game_b"), dict):
        probs = problems_for_game(obj["game_a"], f"{path.name}[game_a]")
        probs += problems_for_game(obj["game_b"], f"{path.name}[game_b]")
        return path.name, probs
    return path.name, ["unrecognized evidence shape "
                       "(expected per-game record, pairwise receipt, or legacy combined pair)"]


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print(__doc__)
        return 2
    targets: list[Path] = []
    for t in argv[1:]:
        p = Path(t)
        if p.is_dir():
            targets.extend(sorted(p.glob("*.json")))
        else:
            targets.append(p)
    if not targets:
        print("[error] no .json files found")
        return 2

    n_bad = 0
    for p in targets:
        name, problems = validate_file(p)
        if problems:
            n_bad += 1
            print(f"[FAIL] {name}")
            for pr in problems:
                print(f"       - {pr}")
        else:
            print(f"[pass] {name}")
    print("-" * 60)
    if n_bad:
        print(f"{n_bad}/{len(targets)} file(s) INVALID")
        return 1
    print(f"all {len(targets)} file(s) VALID")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
