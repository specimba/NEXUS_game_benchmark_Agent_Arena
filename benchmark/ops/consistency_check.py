#!/usr/bin/env python3
"""
NEXUS Agent Arena — benchmark control-plane consistency gate.

Fails loudly if the executable scoring semantics drift across the four places they
are expressed:

    1. benchmark/contracts/RUBRIC_v2.json      (canonical machine contract)
    2. benchmark/ops/aggregate_scores.py       (runtime scorer)
    3. benchmark/02-scoring-rubric.md          (human rubric + embedded contract copy)
    4. benchmark/ops/evidence_schema.json      (evidence record contract)
    5. benchmark/07-operational-automated.md   (operational weights line)

Historical bug this prevents: the rubric moved to T16 M17 G17 F12 V20 A12 X6 with
M1-M8 / G1-G7 / V0-V9 / A1-A6 / CEIL-1..9 while the aggregator kept
T20 M18 G18 F14 V12 A10 X8 with M1-M6 / V0-V5 / CEIL-1..4 — silently dropping
modern sub-scores and ceilings from real evaluations.

Usage:
    python consistency_check.py
Exit code 0 = all checks pass; 1 = at least one drift detected.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parent  # benchmark/
ROOT = REPO.parent  # repository root

CONTRACT_PATH = REPO / "contracts" / "RUBRIC_v2.json"
RUBRIC_MD = REPO / "02-scoring-rubric.md"
SCHEMA = REPO / "ops" / "evidence_schema.json"
OPS_MD = REPO / "07-operational-automated.md"
TEMPLATE_MD = REPO / "05-reporting-template.md"

RUBRIC_EMBED_BEGIN = "<!-- RUBRIC_CONTRACT_V2_BEGIN -->"
RUBRIC_EMBED_END = "<!-- RUBRIC_CONTRACT_V2_END -->"

FAILURES: list[str] = []


def check(name: str, ok: bool, detail: str = "") -> None:
    status = "PASS" if ok else "FAIL"
    print(f"[{status}] {name}" + (f" — {detail}" if detail and not ok else ""))
    if not ok:
        FAILURES.append(f"{name}: {detail}")


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def validate_contract(c: dict) -> bool:
    """Structural self-validation of the contract file."""
    ok = True
    if c.get("weights_sum_check") != 100:
        ok = False
        check("contract: weights_sum_check == 100", False, str(c.get("weights_sum_check")))
    weights = c.get("weights", {})
    total = sum(int(v) for v in weights.values())
    check("contract: weights sum to 100", total == 100, f"sum={total}")
    ok &= total == 100
    check("contract: 7 categories T M G F V A X",
          sorted(weights) == ["A", "F", "G", "M", "T", "V", "X"])
    ok &= sorted(weights) == ["A", "F", "G", "M", "T", "V", "X"]

    criteria = c.get("criteria", {})
    ok &= set(criteria) == set(weights)
    seen: set[str] = set()
    for cat, ids in criteria.items():
        for cid in ids:
            ok &= isinstance(cid, str)
            seen.add(cid)
            if not re.fullmatch(r"[A-Z]\d+", cid):
                check(f"contract: criterion id format {cid}", False)
                ok = False
    check("contract: criteria ids unique", len(seen) == sum(len(v) for v in criteria.values()))

    ceilings = c.get("ceilings", {})
    check("contract: ceilings CEIL-1..CEIL-9 present",
          sorted(ceilings) == [f"CEIL-{i}" for i in range(1, 10)])
    ok &= sorted(ceilings) == [f"CEIL-{i}" for i in range(1, 10)]
    for k, v in ceilings.items():
        ok &= isinstance(v, (int, float)) and 0 < v <= 100
    # ceiling caps per rubric §2.3 (regression pin)
    expected_caps = {"CEIL-1": 55, "CEIL-2": 65, "CEIL-3": 60, "CEIL-4": 70,
                     "CEIL-5": 50, "CEIL-6": 65, "CEIL-7": 60, "CEIL-8": 55, "CEIL-9": 55}
    check("contract: ceiling caps match rubric §2.3", ceilings == expected_caps,
          f"{ {k: ceilings.get(k) for k in sorted(ceilings)} }")
    ok &= ceilings == expected_caps
    return ok


def check_aggregator_against_contract() -> None:
    sys.path.insert(0, str(HERE))
    import aggregate_scores as agg  # noqa: PLC0415

    c = load_json(CONTRACT_PATH)
    check("aggregator WEIGHTS == contract weights",
          agg.WEIGHTS == {k: int(v) for k, v in c["weights"].items()},
          f"aggregator={agg.WEIGHTS} contract={c['weights']}")
    check("aggregator CRITERIA == contract criteria",
          agg.CRITERIA == {k: list(v) for k, v in c["criteria"].items()},
          f"aggregator={agg.CRITERIA} contract={c['criteria']}")
    check("aggregator CEILINGS == contract ceilings",
          agg.CEILINGS == {k: float(v) for k, v in c["ceilings"].items()},
          f"aggregator={agg.CEILINGS} contract={c['ceilings']}")
    check("aggregator penalty constants == contract penalties",
          agg.SEV_HARD_POINTS == dict(c["penalties"]["hard_by_severity"])
          and agg.SEV_SEV_POINTS == dict(c["penalties"]["defect_severity_by_severity"])
          and agg.HARD_PENALTY_CAP == float(c["penalties"]["hard_cap"]))


def check_rubric_md_embedded_copy() -> None:
    text = RUBRIC_MD.read_text(encoding="utf-8")
    if RUBRIC_EMBED_BEGIN not in text or RUBRIC_EMBED_END not in text:
        check("rubric md embeds contract copy", False,
              f"missing {RUBRIC_EMBED_BEGIN} / {RUBRIC_EMBED_END} markers")
        return
    body = text.split(RUBRIC_EMBED_BEGIN, 1)[1].split(RUBRIC_EMBED_END, 1)[0]
    try:
        embedded = json.loads(body)
    except json.JSONDecodeError as e:
        check("rubric md embedded JSON parses", False, str(e))
        return
    canonical = load_json(CONTRACT_PATH)
    # byte-equality of semantics: same parsed JSON
    same = json.dumps(embedded, sort_keys=True) == json.dumps(canonical, sort_keys=True)
    check("rubric md embedded contract == canonical contract", same,
          "edit 02-scoring-rubric.md and contracts/RUBRIC_v2.json together")


def check_ops_md_weights_line() -> None:
    text = OPS_MD.read_text(encoding="utf-8")
    c = load_json(CONTRACT_PATH)
    w = c["weights"]
    needle = f"weights T{w['T']} M{w['M']} G{w['G']} F{w['F']} V{w['V']} A{w['A']} X{w['X']}"
    check("07-operational weights line == contract", needle in text,
          f"expected '{needle}' in {OPS_MD.name}")


def check_evidence_schema_criteria() -> None:
    schema = load_json(SCHEMA)
    c = load_json(CONTRACT_PATH)
    props = (schema.get("properties", {}).get("sub_scores", {})
             .get("properties", {}))
    # v2 schema shape: sub_scores.properties.<CAT>.properties.<ID>
    ok = set(props) == set(c["criteria"])
    check("evidence schema category set == contract", ok,
          f"schema={sorted(props)} contract={sorted(c['criteria'])}")
    if ok:
        for cat in c["criteria"]:
            ids = set(props[cat].get("properties", {}))
            check(f"evidence schema {cat} criteria == contract",
                  ids == set(c["criteria"][cat]),
                  f"schema={sorted(ids)} contract={sorted(c['criteria'][cat])}")
    ceilings_enum = (schema.get("properties", {}).get("ceilings", {})
                     .get("items", {}).get("enum", []))
    check("evidence schema ceilings enum == contract ceilings",
          sorted(ceilings_enum) == sorted(c["ceilings"]),
          f"schema={sorted(ceilings_enum)} contract={sorted(c['ceilings'])}")
    # Pairwise verdict must be FORBIDDEN inside per-game evidence (doctrine).
    pv = schema.get("properties", {}).get("pairwise_verdict")
    check("evidence schema forbids pairwise_verdict in game record", pv is False)
    # sessions allow S1..S9 plus S4a/S4b
    pn = schema.get("properties", {}).get("sessions", {}).get("propertyNames", {})
    check("evidence schema sessions propertyNames pattern", pn.get("pattern") == "^S[1-9][ab]?$")


def check_template_md_tokens() -> None:
    text = TEMPLATE_MD.read_text(encoding="utf-8")
    c = load_json(CONTRACT_PATH)
    w = c["weights"]
    weight_tok = f"T{w['T']} M{w['M']} G{w['G']} F{w['F']} V{w['V']} A{w['A']} X{w['X']}"
    check("05-reporting-template weights token == contract", weight_tok in text)
    check("05-reporting-template lists M1..M8", "M1..M8" in text)
    check("05-reporting-template lists V0..V9", "V0..V9" in text)


def main() -> int:
    print("NEXUS Agent Arena — consistency gate")
    print(f"contract: {CONTRACT_PATH.relative_to(ROOT)}")
    print("-" * 60)
    c = load_json(CONTRACT_PATH)
    check("contract file parses as JSON", isinstance(c, dict))
    validate_contract(c)
    check_aggregator_against_contract()
    check_rubric_md_embedded_copy()
    check_ops_md_weights_line()
    check_evidence_schema_criteria()
    check_template_md_tokens()
    print("-" * 60)
    if FAILURES:
        print(f"DRIFT DETECTED — {len(FAILURES)} failing check(s):")
        for f in FAILURES:
            print(f"  - {f}")
        return 1
    print("ALL CONSISTENCY CHECKS PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
