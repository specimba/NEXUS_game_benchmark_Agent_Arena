# 05 — Synthesis: what the four papers mean for NEXUS, and what we do about it

Verified 2026-09-03 against arXiv. Full briefs: [01](01-rlhev-agentic-game-dev-trajectory-engine.md),
[02](02-gameenginebench-cpp-runtime.md), [03](03-gamexpert-bench-lifecycle.md),
[04](04-harness-of-harness-multiday.md).

## The one-paragraph picture

- **GameXpert** tells us agents split cleanly across the lifecycle: good at playable
  foundations, weak at defect discovery, runtime verification, regression preservation.
- **GameEngineBench** tells us fixed, executable, real-runtime tasks expose weaknesses
  open-ended creation cannot, and that un-pinned environments corrupt results.
- **RLHEV** tells us an engine is an executable verifier (dense machine signals) while a
  human supplies the acceptance signal — and the community critique reminds us that
  "didn't crash" is a floor, never a quality.
- **Harness-of-Harness** tells us harness structure over long iterative horizons is where
  the big relative gains live, and that implementation-time checks must be kept separate
  from independent evaluation.

Together they converge on one design, which NEXUS is now explicitly adopting
(`benchmark/09-agent-arena-v2-design.md`):

```
OPEN CREATIVE ARENA      (keep: product quality, authorship, taste)
        +
FIXED EXECUTABLE TASKS   (same problem, many agents — diagnosis)
        +
REPAIR                   (Fail-to-Pass / Pass-to-Pass)
        +
MULTI-TURN OPTIMIZATION  (cumulative acceptance, regression gates)
        +
SIMULATION FIDELITY      (repeated-rollout distribution, optional)
        +
MODEL x HARNESS PROVENANCE (receipts, not just a model name)
```

Each plane keeps its own evidence — never one opaque 0–100 score.

## Status of every proposed action

| # | Action | Status | Where |
|---|--------|--------|-------|
| 1 | Machine rubric contract (weights/criteria/ceilings in JSON) + drift gate | **ADOPTED — this revision** | `benchmark/contracts/RUBRIC_v2.json`, `benchmark/ops/consistency_check.py`, `benchmark/ops/validate_evidence.py`, `benchmark/tests/run_all.py` |
| 2 | Aggregator reads the contract (fixes silent drop of M7/M8, G7, V6–V9, A6, CEIL-5..9) | **ADOPTED — this revision** | `benchmark/ops/aggregate_scores.py` |
| 3 | Evidence schema v2: per-game records contain no pairwise verdict | **ADOPTED — this revision** | `benchmark/ops/evidence_schema.json`, `benchmark/contracts/pairwise_result.schema.json` |
| 4 | S4 split: runtime soak vs experience endurance (fair to 12-minute games) | **ADOPTED — this revision** | `benchmark/03-long-session-test-plan.md`, sessions `S4a/S4b` in evidence schema |
| 5 | S9 (creative probe) + reproducibility meta (`contract_version`, `contract_sha256`, sessions S1–S9) in the schema | **ADOPTED — this revision** | `benchmark/ops/evidence_schema.json` |
| 6 | Track labels: ARENA / SYSTEM_BATTLE / MODEL_CONTROL / HARNESS_CONTROL | **ADOPTED as design** | `benchmark/09-agent-arena-v2-design.md` |
| 7 | Evidence receipts (game/process/verifier/pairwise/run) as five separate objects | **ADOPTED as design** (provisional `process` block already in schema) | `benchmark/09` |
| 8 | Track B — FIXED-GEN (browser-native scoped tasks, same task across agents) | **NEXT-EPOCH** | `benchmark/09` |
| 9 | Track C — REPAIR (seeded defects; REPORTED + DISCOVERY modes; F2P/P2P) | **NEXT-EPOCH** | `benchmark/09`, task seed = `benchmark/04-defect-taxonomy.md` |
| 10 | Track D — OPTIMIZE (six-turn cumulative request chains, regression every turn) | **NEXT-EPOCH** | `benchmark/09` |
| 11 | Track E — SIM-FIDELITY (fixed state/input × N rollouts → invariant pass rate, coverage, calibration, readout failures) | **NEXT-EPOCH (optional)** | `benchmark/09` |
| 12 | v19 held-experiment prompt + v17/v18/v19 ablation protocol | **NEXT-EPOCH** | see §7 of `benchmark/09` |
| 13 | Exact environment pins + task manifests with category mapping shipped | **PARTIAL** (receipt design adopted; task shelves not yet built) | `benchmark/09`, contracts/ |

## Adjacent context (secondary sources, not part of the uploaded four)

Referenced through the NEXUS advisory review; include only as background:

- **GameDevBench** (github.com/waynchi/gamedevbench, via advisory): 333 Godot tasks,
  model+harness evaluation with screenshot/video feedback; reports GPT-5.4 41.1% → 52.0%
  with visual feedback (project-repo claim). Also the source of the Godot 4.4.1 vs 4.7.1
  version-pinning caution (issue #7) and the missing task→category mapping issue (#9).
- **PAWBench** (pawbench.github.io, via advisory): fixes start state + action, repeats the
  rollout 50×, reports calibration/support coverage/readout failures separately; ≥20
  readable outcomes required to score a scene. Basis for Track E's statistics discipline.
- **OpenGame / whole-game generation evaluations** (via advisory): need both runtime
  health and intent/visual assessment — same two-plane conclusion as RLHEV.

## Guardrail restated (protect the uniqueness)

NEXUS's unique asset is the **open creative arena**: an AI developer under creative
freedom, judged as a finished interactive product by humans. The four papers argue for
*adding* controlled planes, never for replacing the arena with task-pass rates. Every
future round must continue to report Track A (human pairwise quality) even after Tracks
B–E exist — otherwise NEXUS becomes "another coding leaderboard", which is the outcome
the advisory (and these papers) warn against.
