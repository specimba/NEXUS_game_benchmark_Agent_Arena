# Benchmark Package Index — One-Shot Game Development Agent Creation

External, read-only evaluation system for **One-Shot Game Development Agent Creation Benchmark**.
Agent is **developer**, not player. Nothing here ships inside a game; scores computed from external evidence only (containment).

| File | Purpose |
|------|---------|
| `00-problem-analysis.md` | Why naive game creation benchmarks fail (template bias, first-prototype bias) + design responses |
| `01-one-shot-arena-prompt.md` | **Human jury evaluation prompt** — verbatim text for head-to-head comparison of two created games |
| `02-scoring-rubric.md` | Formal rubric: code quality, creative originality, long-session execution, design judgment, visual ambition (heavily weighted), human-perceived quality — scales, anchors, weights, ceilings. §2.11 embeds the machine contract |
| `03-long-session-test-plan.md` | Verification plan for development process and final game (S1-S9 incl. S9 Creative Probe and the S4a runtime-soak / S4b experience-endurance split), probes, hard-case handling |
| `04-defect-taxonomy.md` | Defect classes, severities, schema (future seed bank for the Repair track) |
| `05-reporting-template.md` | Jury report template |
| `06-anti-bias-anti-gaming.md` | Anti-bias, anti-gaming strategy for human jury |
| `07-operational-automated.md` | Operational runbook (weights pinned to the contract; validate + consistency gates) |
| `08-selection-and-final-decision.md` | Decision rules: which created game human jury would choose |
| `09-agent-arena-v2-design.md` | **Design**: five-track architecture (A open arena, B fixed-gen, C repair, D optimize, E sim-fidelity), comparison regimes, evidence receipts, S4a/S4b, v19 ablation plan |
| `prompt-lineage-deep-analysis.md` | **Deep analysis**: section-by-section investigation of v10→v18 and the last experiments (R010–R014) — verdicts, metric reconstruction, cluster forensics → the evidence for v19/v20 |
| `19-prompt-merge-blueprint.md` | **v19 blueprint**: exact edit list from the deep analysis, the de-recipe'd/game-first prompt draft, M-6 "is it a game" scoring addition, and the 3-arm validation experiment |
| `contracts/RUBRIC_v2.json` | **Canonical machine rubric contract** — weights, criteria ids, ceilings, penalties (single source of truth; Markdown describes, JSON computes) |
| `contracts/pairwise_result.schema.json` | Schema for the separate pairwise jury receipt |
| `contracts/README.md` | Contract doctrine + change protocol |
| `literature/` | Verified briefs on the 2026 game-agent papers (RLHEV, GameEngineBench, GameXpert-Bench, Harness-of-Harness) + synthesis of NEXUS actions |
| `deploy/01-deploy-prompt.txt` | Deployable evaluator prompt (only evaluator instructions) |
| `deploy/ARENA_DEPLOY.md` | Deployment guide, CEIL rules, anti-sniffing |
| `examples/example-evaluation-report.md` | Worked example report |
| `examples/synthetic/` | Synthetic v2 bundle: run_head_to_head.py validates + scores + BT ranking + decision block |
| `ops/evidence_schema.json` | Evidence contract **v2** (per-game records; pairwise forbidden inside; sessions S1-S9/S4a/S4b) |
| `ops/aggregate_scores.py` | Aggregator: category scores, penalties, Bradley-Terry, CIs — **reads the contract** |
| `ops/decision_block.py` | Decision generator (accepts v2 pairwise receipts) |
| `ops/validate_evidence.py` | Dependency-free evidence validator (criteria/ceilings pinned to contract) |
| `ops/consistency_check.py` | Drift gate: contract ↔ aggregator ↔ rubric doc ↔ schema ↔ runbooks |
| `tests/run_all.py` | Regression suite (consistency, validation, demo byte-stability, math, negative tests) |

## Anti-drift guard (run after any rubric/ops change)

```bash
python3 ops/consistency_check.py     # control-plane agreement
python3 ../tests/run_all.py          # full regression suite
```

## Evaluation philosophy

- Agent is developer, not player contestant
- Unlimited creativity: no restriction to 2D/2.5D/3D, genre, rendering style, engine, input, narrative, level structure, realism, procedural vs authored
- Code quality + long-session execution matter: plan → prototype → test → debug → iterate → polish
- Visual ambition weighted heavily: push beyond simple box gradient colored enemies / flash-game approach
- Human jury chooses memorable authored game over generic functional template
- Automated checks verify launch, input, pause, restart, persistence, no telemetry; human jury judges authorship

## Quick start

1. Read `00-problem-analysis.md` then `06-anti-bias-anti-gaming.md`
2. Freeze both game builds (no edits), audit containment
3. Run automated launch checks
4. Run human jury with `01-one-shot-arena-prompt.md` supplying `02,03,04,05` and `ops/evidence_schema.json` as references
5. Collect evidence JSON, run `python ops/aggregate_scores.py <evidence_dir> --bt`
6. Write report per `05-reporting-template.md`
