# ops — External Aggregation Tooling

Pure, external computation. No scoring/telemetry ships inside a game. All executable
scoring facts come from `benchmark/contracts/RUBRIC_v2.json` — never hard-code weights,
criteria or ceilings in Python (that is exactly how drift happened before).

## `contracts/` (canonical)

- `RUBRIC_v2.json` — weights, criteria id sets, ceilings, penalties. Single source of truth.
- `pairwise_result.schema.json` — separate pairwise receipt (game records contain no
  pairwise content).

## `evidence_schema.json`

The machine‑readable contract every evaluator's per‑game evidence must conform to (one
object per game per comparison; v2: sessions S1–S9 incl. S4a/S4b, criteria pinned to the
contract, `pairwise_verdict` forbidden). `aggregate_scores.py` reads these to recompute
scores independently.

## `aggregate_scores.py`

```
python aggregate_scores.py <evidence_dir> [--pairs pairs.json] [--bt] [--seed N]
                            [--n-boot N] [--contract PATH]
```

- `<evidence_dir>` — directory of `*.json` evidence files. v2 layout: per‑game files
  (`{"game":"A", ...}` / `{"game":"B", ...}`) + optional standalone pairwise receipts
  (`pairwise_result*.json`). Legacy layouts still accepted: combined pair files
  (`{"game_a":{...},"game_b":{...},"pairwise":{...}}`) and per‑game `pairwise_verdict`
  (deprecated — the v2 schema forbids it in new evidence).
- `--pairs pairs.json` — optional list of `{"a","b","winner"}` rows to merge for a
  Bradley–Terry ranking across many comparisons.
- `--contract PATH` — override the rubric contract (default: repo canonical file; env
  var `NEXUS_RUBRIC_CONTRACT` also honored).

### Output
- Per game: category scores (0–10), `overall_raw` (0–100), `hard_penalty`,
  `overall_adj`, `ceilings_hit`, `overall`, and pillar scores (technical reliability /
  creative presentation / gameplay / flow‑engagement / defect severity).
- Pairwise: Elo‑like rating per label with bootstrap CI and a ranking verdict.
- Header line prints the contract id/version/sha used for the run.

### Example

```bash
python aggregate_scores.py evidence/ --bt --pairs pairs.json --seed 1 --n-boot 1000
```

### Dependencies
Python 3.8+ standard library only (no numpy/scipy required).

> The math here mirrors the LMArena methodology (Bradley–Terry → Elo‑like ratings with
> bootstrap confidence intervals), adapted for game‑quality evidence rather than chat
> preference votes.

## `decision_block.py` — one‑page head‑to‑head decision

Applies `benchmark/08` decision rules (hard‑failure gate, OVERALL margin, pairwise signal)
and prints a concise DECISION block for a Game A vs Game B comparison, with the
reliability‑vs‑creative separation. The pairwise signal comes from `--pairs h2h_pairs.json`
and/or standalone v2 pairwise receipts found in the evidence dir.

```bash
python decision_block.py <evidence_dir> [--pairs h2h_pairs.json]
```

## `validate_evidence.py` — evidence gate

```bash
python validate_evidence.py <evidence_dir>
python validate_evidence.py <file.json> [<file.json> ...]
```

Dependency‑free structural validation of evidence records, pairwise receipts, legacy
combined pairs and legacy vote‑row lists. Criteria ids, ceilings and score scales are
pinned to `contracts/RUBRIC_v2.json`; embedded pairwise verdicts in game records are an
error. Exit code 1 on any invalid file.

## `consistency_check.py` — drift gate

```bash
python consistency_check.py
```

Fails if the contract, the aggregator, `02-scoring-rubric.md` (embedded copy + weights),
the evidence schema, `07-operational-automated.md`, and `05-reporting-template.md`
disagree on any executable fact. Run after every rubric/ops change, then
`python ../tests/run_all.py` for the full regression suite.

Runnable demo: `benchmark/examples/synthetic/run_head_to_head.py` (validate → scores →
decision, all against the v2 bundle).
