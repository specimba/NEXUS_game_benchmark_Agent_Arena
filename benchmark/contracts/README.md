# contracts — machine-authoritative benchmark contracts

The benchmark used to repeat the same facts (weights, criteria, ceilings) by hand in
Markdown and Python. That is exactly how drift happened: the rubric said
`T16 M17 G17 F12 V20 A12 X6` with M1–M8, V0–V9 and CEIL-1…CEIL-9, while the canonical
aggregator still computed `T20 M18 G18 F14 V12 A10 X8` with M1–M6, V0–V5 and CEIL-1…CEIL-4 —
silently dropping modern sub-scores from real evaluations.

From now on the executable semantics live here as JSON:

| File | Role |
|------|------|
| `RUBRIC_v2.json` | The scoring contract: weights, criteria id sets, ceilings, penalty constants. Consumers: `benchmark/ops/aggregate_scores.py`, `benchmark/ops/validate_evidence.py`, `benchmark/ops/consistency_check.py`. |
| `pairwise_result.schema.json` | Schema for the **separate** pairwise jury receipt (never embedded in a game's evidence record). |

## Doctrine

- **Markdown describes, JSON computes.** Human semantics and behavioural anchors stay in
  `benchmark/02-scoring-rubric.md`; the executable numbers come from `RUBRIC_v2.json`.
- **One embedded copy.** `benchmark/02-scoring-rubric.md` carries a marker-delimited copy
  of the contract so a human reading the rubric sees the exact machine facts.
- **No silent drift.** Any disagreement between contract ↔ aggregator ↔ rubric doc ↔
  evidence schema is a failing check:
  `python3 benchmark/ops/consistency_check.py`
- **Full regression gate:**
  `python3 benchmark/tests/run_all.py`

## Change protocol

1. Edit `RUBRIC_v2.json`.
2. Update `benchmark/02-scoring-rubric.md` (semantics + embedded copy),
   `benchmark/ops/evidence_schema.json` (criteria enums, ceilings enum),
   `benchmark/07-operational-automated.md` (weights line) and
   `benchmark/05-reporting-template.md` as needed.
3. Run `consistency_check.py` and `benchmark/tests/run_all.py` — they must pass.
4. Only then treat the new rubric version as canonical for new rounds.
