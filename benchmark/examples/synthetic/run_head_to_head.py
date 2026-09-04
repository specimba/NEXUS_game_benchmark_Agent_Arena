#!/usr/bin/env python3
"""
End-to-end head-to-head demo on the synthetic evidence bundle.

Runs the full pipeline that a real comparison goes through:
  1. Per-game OVERALL + pillar scores (+ Bradley-Terry ranking across the pool).
  2. The one-page DECISION BLOCK (benchmark/08) choosing the better game.

Usage (from this directory):
    python run_head_to_head.py
or
    python ../../ops/aggregate_scores.py . --bt --pairs pairs.json --seed 7 --n-boot 800
    python ../../ops/decision_block.py . --pairs h2h_pairs.json

This is demo tooling on SYNTHETIC data — not a real evaluation.
"""

from __future__ import annotations

import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
OPS = os.path.join(HERE, "..", "..", "ops")


def run(cmd: list[str], cwd: str) -> int:
    print("\n$ " + " ".join(cmd))
    r = subprocess.run([sys.executable, *cmd], cwd=cwd)
    return r.returncode


def main() -> None:
    print("#" * 66)
    print("# NEXUS Agent Arena — synthetic head-to-head demo")
    print("# (synthetic data; not a real evaluation)")
    print("#" * 66)

    # 0. Evidence gate: every record must satisfy the v2 evidence contract
    run(["../../ops/validate_evidence.py", "."], HERE)

    # 1. Per-game scores + Bradley-Terry ranking (aggregate_scores.py, reads contract)
    run(["../../ops/aggregate_scores.py", ".", "--bt", "--pairs", "pairs.json",
         "--seed", "7", "--n-boot", "800"], HERE)

    # 2. One-page decision block (decision_block.py; also consumes pairwise_result.json)
    run(["../../ops/decision_block.py", ".", "--pairs", "h2h_pairs.json"], HERE)


if __name__ == "__main__":
    main()
