# Synthetic Evidence Bundle — `aggregate_scores.py --bt` demo

This folder is a **synthetic, self-contained demo** of the aggregation pipeline. It is
**not** real evaluation data. Its purpose is to show, with a single command, how the
benchmark turns raw evidence into (1) per‑game OVERALL/pillar scores and (2) a
Bradley–Terry / Elo ranking with bootstrap confidence intervals.

The bundle demonstrates the **v2 evidence architecture**:
per‑game records are self-contained and contain **no pairwise content**; the pairwise
verdict lives in a separate `pairwise_result.json` receipt whose `evidence_hashes` pin the
two frozen game records the verdict compares.

## Contents

| File | Meaning |
|------|---------|
| `game_A.json` | Evidence record for Game A (the head‑to‑head favorite). v2 schema: meta (with `contract_version` / `contract_sha256`), sessions S1–S9 incl. S4a/S4b, sub‑scores over the full contract criteria set (T1‑T7, M1‑M8, G1‑G7, F1‑F6, V0‑V9, A1‑A6, X1‑X5), `not_applicable`, defects, ceilings, coverage, provisional process receipt. |
| `game_B.json` | Evidence record for Game B (more original, structurally broken build). |
| `pairwise_result.json` | Canonical v2 pairwise receipt (winner, confidence, both‑orderings agreement, SHA‑256 of both frozen evidence files). |
| `pairs.json` | 78 synthetic pairwise votes across four labels (A, B, C, D) for the BT ranking (includes 4 explicit tie rows). |
| `h2h_pairs.json` | Head‑to‑head (A vs B only) pairwise votes for the decision block. |
| `RESULTS_demo.txt` | Captured `aggregate_scores.py --bt` output (readable without running). |
| `DECISION_demo.txt` | Captured one‑page decision block (readable without running). |
| `run_head_to_head.py` | One command that runs the whole pipeline (validate → scores + BT → decision block). |

## Run it yourself

Everything, in one shot:

```bash
python run_head_to_head.py
```

Or step by step:

```bash
python ../../ops/validate_evidence.py .
python ../../ops/aggregate_scores.py . --bt --pairs pairs.json --seed 7 --n-boot 800
python ../../ops/decision_block.py . --pairs h2h_pairs.json
```

## What the demo shows

- **Per‑game scores (contract v2 weights T16 M17 G17 F12 V20 A12 X6).**
  Game A: OVERALL **84.7**, no ceilings. Game B: raw 69.1, hard penalty 4 (one Critical),
  **CEIL‑1** → OVERALL **55.0** (adj 65.1). This is the reliability gate in action — B's
  single critical soft‑lock caps it even though its *raw* score is 69.1.
- **Extended criteria are actually scored.** The v2 sub‑score sets include M7/M8 (creative
  twist, depth‑after‑wow), G7 (player story), V6–V9 (render fallback, cross‑environment
  consistency, surprise/inversion, working‑3D bonus) and A6 (world invention). Game A
  deliberately omits V9 as documented N/A (`not_applicable`), which the validator accepts;
  Game B scores V9=3 (attempted heavy tech, partially works).
- **Creative vs reliable split.** A leads overall *and* on the creative pillar (89.8 vs
  83.4), yet B leads on **raw graphical originality** (V0 = 5 vs 3) and surprise
  (V8 = 5 vs 4). A build can be more original (B) while a less flashy but more polished,
  readable build (A) is still the better complete game.
- **Pairwise is a separate receipt.** `game_A.json`/`game_B.json` contain no pairwise
  verdict; `pairwise_result.json` pins both evidence hashes and declares the winner.
  The aggregator and decision block both consume it.
- **Bradley–Terry ranking with CIs.** A > B > C ≈ D. A and B separate cleanly (Elo margin
  246.2, CIs far apart). C and D both bottom out at the same clamp (~611) because neither
  ever beats A or B and they rarely meet — flagged as "not separable".
- **Both‑orderings tie handling.** `pairs.json` includes 4 explicit `"winner":"tie"` rows;
  these are expanded into two half‑weight directional votes inside `add_vote`, so ties
  correctly count as draws instead of corrupting the ranking with a bogus "tie" label.
- **One‑page decision block.** `decision_block.py` applies the benchmark/08 decision rules
  and prints a DECISION: here **Game A wins** on the hard‑failure gate (B hit CEIL‑1), while
  explicitly reporting that **B leads on raw graphical originality (V0 = 5 vs 3)** — the
  reliability‑vs‑creative separation is visible in a single page.

## Reproducibility

The seed is fixed (`--seed 7`), so re‑running gives identical ratings and CIs. The
`benchmark/tests/run_all.py` regression suite re‑runs this demo and fails if the captured
outputs drift from what the current code produces. This is the auditability property the
benchmark requires for its real runs too.
