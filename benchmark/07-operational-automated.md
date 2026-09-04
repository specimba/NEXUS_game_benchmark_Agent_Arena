# 07 — Operational Protocol (Concise, for Large‑Scale Automated Use)

A terse runbook for running the arena at scale with evaluation agents, structured evidence,
and automated aggregation. Everything here is a mechanical, repeatable pipeline.

## 7.1 End‑to‑end runbook (per pair)

1. **Build.** Both agents build from `GAME_SPEC.md` in isolated environments. No shared state.
2. **Freeze.** Snap both builds; hash them; no edits during evaluation.
3. **Audit containment.** Scan frozen builds for rubric constants / telemetry / eval strings.
   Any hit ⇒ Critical CONTAINMENT defect; channel barred.
4. **Provision.** Standardized hardware profile + browser matrix (see `03`). Fresh browser
   profile per game.
5. **Assign.** One evaluator agent per game order; counterbalance A‑first/B‑first across the
   pool. Blind labels only.
6. **Play & record.** Evaluator executes `03` session set per game using `01` prompt, emitting
   one `ops/evidence_schema.json` (v2)‑compatible record PER GAME (no pairwise content), then
   one separate `pairwise_result.json` receipt after both orderings (contracts/
   pairwise_result.schema.json).
7. **Validate.** `python ops/validate_evidence.py <evidence_dir>` — drift‑guarded evidence
   gate (criteria/ceilings pinned to `contracts/RUBRIC_v2.json`).
8. **Aggregate.** `python ops/aggregate_scores.py <evidence_dir>` computes per‑game OVERALL,
   pillars, defect penalties, ceilings, pairwise/BT ranking, and bootstrap CIs. All scoring
   constants come from `contracts/RUBRIC_v2.json`.
9. **Report.** Format per `05`; include confidence and limitations.
10. **Archive.** Evidence bundle, report, frozen build hashes, prompt/rubric/contract versions
    → store for audit.

**Control‑plane guard (run after any rubric/ops change):**
`python ops/consistency_check.py` + `python ../tests/run_all.py` — fails on any drift
between contract JSON, aggregator, rubric doc, evidence schema, and this runbook.

## 7.2 Scoring pipeline (pure function)

```
for each game:
    CATEGORY_c = mean(sub_scores_c) × 2                    # from evaluator sub-scores
    OVERALL_raw = Σ WEIGHT_c × CATEGORY_c                   # weights T16 M17 G17 F12 V20 A12 X6
    HARD_PENALTY = min(30, blockers×6 + criticals×4)
    OVERALL_adj = max(0, OVERALL_raw − HARD_PENALTY)
    OVERALL = min(OVERALL_adj, applicable CEIL)
    pillars = TECH_REL / CREATIVE / GAMEPLAY / FLOW / DEFECT_SEV   # rubric §2.4
ranking:
    preferences = pairwise verdicts across all pairs (tie = 0.5)
    fit Bradley–Terry (order-independent, offline) → strengths → Elo-anchored ratings
    bootstrap (1000×) → 95% CI per game
outputs:
    per-game scores, pillars, defect register summary, rating + CI, pairwise result
```

## 7.3 Large‑scale controls

- **Judge ensemble:** ≥3 judge families, majority pairwise verdict; judge family ≠ generator.
- **Both orderings** per pairwise; split verdicts = tie.
- **Evidence gate:** skip/reject any sub‑score ≥3 with no evidence link.
- **Confidence:** report CIs; label any pair with overlapping CIs as "not statistically
  separable."
- **Quality gates per evaluator:** coverage completeness (S1–S9 incl. S4a/S4b per game),
  position‑consistency sample, outlier review; drop evaluators below threshold.
- **Reproducibility:** version everything (prompt, rubric, schema, aggregator, builds). Record
  seeds, hashes, timestamps.

## 7.4 Minimal viable run (thin budget)

When full scale is impossible, keep the **essential core** so results stay defensible:

1. Blind labels, both orderings, ≥1 independent evaluator per ordering.
2. Per game: S1, S2, S3(30 min goal), S5, and a 10‑min late‑session check + P‑Persist/P‑Corrupt.
   (S4 60‑min and S8 repeats are the first to trim, but must be noted as coverage gaps that
   lower confidence.)
3. Score with the full rubric (never a single global number); apply hard‑failure ceilings.
4. Pairwise verdict + CI, with the report's confidence section honestly flagging trimmed coverage.

## 7.5 Reference artifacts

- `contracts/RUBRIC_v2.json` — **canonical scoring contract** (weights/criteria/ceilings).
- `contracts/pairwise_result.schema.json` — separate pairwise receipt schema.
- `ops/evidence_schema.json` — machine‑readable per‑game evidence contract (v2, no pairwise).
- `ops/aggregate_scores.py` — aggregator: OVERALL, pillars, ceilings, BT + bootstrap CIs
  (reads the contract; `--contract PATH` to override).
- `ops/validate_evidence.py` — dependency‑free evidence validator.
- `ops/consistency_check.py` — drift gate between contract/aggregator/rubric/schema/docs.
