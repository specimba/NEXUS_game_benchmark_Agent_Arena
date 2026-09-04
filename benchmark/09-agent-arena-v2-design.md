# 09 — Agent Arena v2: design for the post-v18 benchmark architecture

**Status: DESIGN (not yet operational).** This document is the bridge between the
benchmark's current single-track open arena and the five-track architecture implied by
the 2026 game-agent literature. Paper grounding: `benchmark/literature/` (GameXpert,
GameEngineBench, RLHEV, Harness-of-Harness) and the review in
`ARENAaiAGENTandGAMEbenchNEXUSfreecreationlogs13gptADVISORY.txt`.

Adopted-now items from this design (machine contract, evidence v2, pairwise split,
S4a/S4b) are already implemented and enforced by `benchmark/ops/consistency_check.py` +
`benchmark/tests/run_all.py`. Everything marked **NEXT-EPOCH** below is future work and
must NOT be half-implemented into the current pipeline.

## 1. The benchmark is two instruments (stop mixing them)

| | Arena mode (current Track A) | Benchmark mode (Tracks B–E) |
|---|---|---|
| Question | Which agent creates the better game under creative freedom? | Why/where does an agent fail on a controlled task? |
| Task | open creative brief, agent chooses everything | identical task across agents |
| Evidence | human jury + hard runtime gates | behavioral tests, regression gates, rollouts |
| Strong at | product quality, authorship, taste, scope judgment | diagnosis, model/harness ablation |

Never present an arena result as a controlled-task result or vice versa; label every run
with its mode.

## 2. Track architecture (five independent tracks)

| Track | Purpose | Primary evidence | Status |
|---|---|---|---|
| **A — OPEN-CREATIVE** | current flagship one-shot battle | human jury + hard gates (evidence schema v2) | **LIVE** |
| **B — FIXED-GEN** | same browser-native task across agents (articulated crane physics, 3-state opponent AI, deterministic projectiles, render-fallback repair, save migration, HUD isolation …) | hidden behavioral tests + jury | NEXT-EPOCH |
| **C — REPAIR** | find/fix seeded defects, REPORTED and DISCOVERY modes | FAIL_TO_PASS + PASS_TO_PASS | NEXT-EPOCH |
| **D — OPTIMIZE** | six-turn cumulative request chains | cumulative acceptance + regression every turn | NEXT-EPOCH |
| **E — SIM-FIDELITY** | physics/world/ecology claims: N repeated rollouts from fixed state+input | invariant pass rate, support coverage, calibration, readout failure rate | NEXT-EPOCH, optional |

One agent may be excellent on A and poor on C — that is a finding, not an inconsistency.
Track C/D sizing reference: GameXpert (100 repair tasks from 50 human-verified levels,
19–27 injected bugs each; 17 chains × 6 turns); seed bank: `benchmark/04-defect-taxonomy.md`.

## 3. Comparison regimes (label every run)

| Regime | Meaning |
|---|---|
| `SYSTEM_BATTLE` | natural model + native harness + available tools (what Track A actually runs) |
| `MODEL_CONTROL` | same harness/tool environment, different model |
| `HARNESS_CONTROL` | same model, different harness |

"Do not force every battle into MODEL_CONTROL; just stop calling a SYSTEM_BATTLE a pure
model comparison." (Advisory §9.) Needed to answer: did Gemini win, or did the harness
win? Grounded by GameDevBench's reported harness/visual-feedback effects and HoH's
harness gains.

## 4. Evidence receipts (five objects, kept separate)

Advisory §14/§25, partially adopted now:

| Receipt | Content | Status |
|---|---|---|
| `GameEvidenceReceipt` | artifact quality: reliability, mechanics, flow, visual, atmosphere, accessibility + defects + ceilings | **LIVE** — `benchmark/ops/evidence_schema.json` (v2; no pairwise inside) |
| `PairwiseJuryReceipt` | winner, confidence, both orderings, evidence hashes of both frozen game records | **LIVE** — `benchmark/contracts/pairwise_result.schema.json` |
| `ProcessReceipt` | time-to-first-playable, tests run, self-detected defects, repairs, regressions introduced/repaired, wall time, tool calls | **LIVE (provisional)** — optional `process` block in evidence schema; never rescues a bad artifact |
| `VerifierReceipt` | deterministic + behavioral verifier results (launch, restart, soak, invariants, scripted-input expectations) | **LIVE (spread across S-archtypes/P-probes)**; consolidated schema NEXT-EPOCH |
| `BenchmarkRunReceipt` | benchmark id/commit/track, prompt/rubric/aggregator/task manifest hashes, agent (provider/model/revision/harness/effort), environment (os/browser/node/gpu/viewport/dpr/tools), execution (start/end/wall/tool calls), artifact (build hash, file manifest) | NEXT-EPOCH |

Identity rule (advisory §25): pairwise comparison happens only after both game receipts
are immutable; hash references make the ordering structurally enforceable.

## 5. Adaptive testing: S4a / S4b (implemented)

`benchmark/03` now splits the old "S4 = 60 continuous minutes" into:

- **S4a Runtime Soak** — fixed 60 min where feasible; technical only (perf samples, jank,
  memory, leaks, state corruption). No engagement scoring, no content-duration bias.
- **S4b Experience Endurance** — complete intended arc + 2–3 repeats/alternate paths;
  long/endless games may use ≤60 min natural play.

A deliberately excellent 12-minute game is no longer structurally disadvantaged, and
runtime longevity is no longer confused with designed content duration. Legacy `S4`
remains a valid key for historical rounds.

## 6. Reproducibility

Next-epoch run receipts must record MODEL × HARNESS × TOOLS × ENVIRONMENT × PROMPT ×
TASK, never just MODEL. Concretely:

- pin exact toolchain/engine versions (GameEngineBench Godot 4.4.1-vs-4.7.1 caution);
- ship task manifests that contain the task→category mapping used for reporting;
- version and hash: prompt, rubric contract (`contract_sha256` is already mandatory in
  evidence meta), aggregator, task manifest, artifact.

## 7. Prompt science epoch (held experiment, not live)

The v10→v18 lineage is research evidence that prompt wording moves concept distribution.
Next controlled experiment (advisory §20):

```
PROMPT A: v17    PROMPT B: v18    PROMPT C: v19 CORE (de-primed materials advice)
same model+harness class
measure: hard-gate pass rate · Blocker/Critical defects · self-discovered repairs ·
time-to-first-playable · human pairwise quality · V0/V8 · M8 · concept-cluster entropy ·
cross-run semantic similarity · wall time/tool calls
```

v19 must first be created as a **held experimental prompt**, not shipped live: keep the
materials/light *principle* while removing the named implementation recipe
(MeshPhysicalMaterial/clearcoat/…) that v17 introduced, per the benchmark's own
convergence findings (§15–16 of the advisory).

## 8. Anti-gaming doctrine (documented stance)

Rubric secrecy is defense-in-depth, never the sole control:

```
NORMAL CONDITION     rubric hidden from agents
SECURITY REQUIREMENT benchmark must remain useful if the rubric leaks
NEVER RELY ON        rubric secrecy as the only anti-gaming measure
```

Machine gates are ceilings, not scores; pairwise separation is structural; coverage
rules require evidence for any score ≥3; ties are valid outcomes.

## 9. Relationship to the current repo

| Design item | Now | Next epoch |
|---|---|---|
| Machine contract + drift gate | `contracts/` + `ops/consistency_check.py` + `tests/run_all.py` | keep |
| Evidence v2 + pairwise split | `ops/evidence_schema.json` + `contracts/pairwise_result.schema.json` | keep |
| S4a/S4b | `03-long-session-test-plan.md` | keep |
| Tracks B–E | — | new `benchmark/tracks/*` folders; never merge into Track A results |
| v19 ablation | — | held prompt + runbook in `challenge/` |
| Sim-fidelity statistics | — | per PAWBench: report calibration/support/readout separately; ≥20 readable rollouts before a sim claim is scoreable |
