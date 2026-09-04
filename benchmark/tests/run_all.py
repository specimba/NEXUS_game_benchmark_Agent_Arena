#!/usr/bin/env python3
"""
NEXUS Agent Arena — regression suite (no third-party dependencies).

Guards the benchmark control plane against drift and the demo bundle against
unintended output changes:

  1. consistency gate       — contract <-> aggregator <-> rubric md <-> schema <-> runbooks
  2. synthetic bundle valid — every file satisfies the v2 evidence contract
  3. demo outputs stable    — RESULTS_demo.txt / DECISION_demo.txt byte-match fresh runs
  4. receipts-only decision — decision block works with canonical pairwise_result.json
                             (no legacy --pairs file)
  5. aggregator math        — weights sum, category mean, hard penalty, ceilings
  6. validator rejects      — bad criteria ids, embedded pairwise verdicts, bad ceilings,
                             and malformed vote rows are all caught

Usage:
    python benchmark/tests/run_all.py
Exit code 0 = all tests pass; 1 = at least one failure.
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]          # repository root
REPO = ROOT / "benchmark"
OPS = REPO / "ops"
SYNTHETIC = REPO / "examples" / "synthetic"
CONTRACT = json.loads((REPO / "contracts" / "RUBRIC_v2.json").read_text(encoding="utf-8"))

FAILURES: list[str] = []


def run_py(args: list[str], cwd: Path | None = None, capture: bool = False):
    cmd = [sys.executable, *args]
    kw: dict = {"cwd": str(cwd) if cwd else str(ROOT)}
    if capture:
        kw["capture_output"] = True
        kw["text"] = True
    r = subprocess.run(cmd, **kw)
    return r


def test(name: str, ok: bool, detail: str = "") -> None:
    print(f"[{'PASS' if ok else 'FAIL'}] {name}" + (f" — {detail}" if detail and not ok else ""))
    if not ok:
        FAILURES.append(f"{name}: {detail}")


def t_consistency_gate() -> None:
    r = run_py([str(OPS / "consistency_check.py")])
    test("consistency gate passes", r.returncode == 0,
         f"exit {r.returncode}; see output above")


def t_synthetic_valid() -> None:
    r = run_py([str(OPS / "validate_evidence.py"), str(SYNTHETIC)])
    out = r.stdout if r.stdout else ""
    test("synthetic bundle valid (v2 evidence contract)", r.returncode == 0,
         f"exit {r.returncode}\n{out}")


def _fresh_demo_outputs() -> tuple[str, str]:
    """Re-run the demo commands exactly as run_head_to_head.py does; return stdout."""
    agg = run_py([str(OPS / "aggregate_scores.py"), ".", "--bt", "--pairs", "pairs.json",
                  "--seed", "7", "--n-boot", "800"], cwd=SYNTHETIC, capture=True)
    dec = run_py([str(OPS / "decision_block.py"), ".", "--pairs", "h2h_pairs.json"],
                 cwd=SYNTHETIC, capture=True)
    if agg.returncode != 0 or dec.returncode != 0:
        return "AGGREGATOR FAILED", "DECISION FAILED"
    return agg.stdout, dec.stdout


def t_demo_outputs_stable() -> None:
    fresh_agg, fresh_dec = _fresh_demo_outputs()
    captured_agg = (SYNTHETIC / "RESULTS_demo.txt").read_text(encoding="utf-8")
    captured_dec = (SYNTHETIC / "DECISION_demo.txt").read_text(encoding="utf-8")
    test("RESULTS_demo.txt matches fresh run", fresh_agg == captured_agg,
         "re-run 'python benchmark/examples/synthetic/run_head_to_head.py' and commit the "
         "new captures if the change is intended")
    test("DECISION_demo.txt matches fresh run", fresh_dec == captured_dec,
         "re-run the demo and commit the new captures if the change is intended")


def t_receipts_only_decision() -> None:
    """Decision block must work from canonical pairwise_result.json alone."""
    with tempfile.TemporaryDirectory() as tmp:
        for fn in ("game_A.json", "game_B.json", "pairwise_result.json"):
            shutil.copy2(SYNTHETIC / fn, Path(tmp) / fn)
        r = run_py([str(OPS / "decision_block.py"), "."], cwd=Path(tmp), capture=True)
        ok = r.returncode == 0 and "Game A wins" in r.stdout and \
            "winner=A" in r.stdout and "confidence=" in r.stdout
        test("decision block from standalone pairwise receipts", ok,
             f"exit {r.returncode}\n{r.stdout[-500:]}")


def t_aggregator_math() -> None:
    sys.path.insert(0, str(OPS))
    import aggregate_scores as agg  # noqa: PLC0415

    weights = agg.WEIGHTS
    test("aggregator weights sum to 100 == contract",
         sum(weights.values()) == 100 == CONTRACT["weights_sum_check"],
         f"sum={sum(weights.values())}")

    sc, n, vals = agg.category_score({"T": {"T1": 4, "T2": 4}}, "T")
    test("category score = mean x 2 (0-10)", sc == 8.0 and n == 2 and vals == [4, 4],
         f"got {sc}, n={n}")

    tiny = {"game": "A",
            "sub_scores": {"T": {f"T{i}": 5 for i in range(1, 8)}},
            "defects": [{"severity": "Blocker", "resolved_as_harness": False}],
            "ceilings": ["CEIL-5"]}
    res = agg.aggregate_game(tiny)
    # T category 10.0 -> raw = 16*10/10 = 16.0 ; blocker -6 -> adj 10.0 ; CEIL-5 cap 50 not binding
    test("aggregator penalty + ceiling math",
         res["overall_raw"] == 16.0 and res["hard_penalty"] == 6.0
         and res["overall_adj"] == 10.0 and res["overall"] == 10.0
         and res["ceilings_hit"] == ["CEIL-5"],
         str(res))
    test("aggregator recognizes CEIL-9 (historical blind spot)",
         "CEIL-9" in agg.CEILINGS and agg.CEILINGS["CEIL-9"] == 55.0)


def t_validator_rejects_bad_evidence() -> None:
    bad_dir = Path(tempfile.mkdtemp(prefix="nexus_bad_evidence_"))
    try:
        good = json.loads((SYNTHETIC / "game_A.json").read_text(encoding="utf-8"))

        bad_criteria = json.loads(json.dumps(good))
        bad_criteria["sub_scores"]["M"]["M9"] = 3
        (bad_dir / "bad_criteria.json").write_text(json.dumps(bad_criteria))

        bad_pairwise = json.loads(json.dumps(good))
        bad_pairwise["pairwise_verdict"] = {"winner": "A"}
        (bad_dir / "bad_pairwise.json").write_text(json.dumps(bad_pairwise))

        bad_ceiling = json.loads(json.dumps(good))
        bad_ceiling["ceilings"] = ["CEIL-99"]
        (bad_dir / "bad_ceiling.json").write_text(json.dumps(bad_ceiling))

        bad_rows = json.loads((SYNTHETIC / "pairs.json").read_text(encoding="utf-8"))
        bad_rows[0]["winner"] = "nobody"
        (bad_dir / "bad_rows.json").write_text(json.dumps(bad_rows))

        r = run_py([str(OPS / "validate_evidence.py"), str(bad_dir)], capture=True)
        out = r.stdout
        ok = (r.returncode == 1 and "bad_criteria.json" in out and "bad_pairwise.json" in out
              and "bad_ceiling.json" in out and "bad_rows.json" in out
              and "M9 is not a criterion" in out
              and "pairwise_verdict is FORBIDDEN" in out
              and "unknown ceiling 'CEIL-99'" in out)
        test("validator rejects bad criteria / pairwise / ceilings / vote rows", ok,
             f"exit {r.returncode}\n{out}")
    finally:
        shutil.rmtree(bad_dir, ignore_errors=True)


def main() -> int:
    print("NEXUS Agent Arena — regression suite")
    print("-" * 60)
    t_consistency_gate()
    t_synthetic_valid()
    t_demo_outputs_stable()
    t_receipts_only_decision()
    t_aggregator_math()
    t_validator_rejects_bad_evidence()
    print("-" * 60)
    if FAILURES:
        print(f"{len(FAILURES)} TEST(S) FAILED:")
        for f in FAILURES:
            print(f"  - {f}")
        return 1
    print("ALL TESTS PASS")
    return 0


if __name__ == "__main__":
    os.chdir(ROOT)
    sys.exit(main())
