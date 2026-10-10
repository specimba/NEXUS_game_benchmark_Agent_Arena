# Battle Round 011 — After-Action Record (v15.1 validation + the restrictions question)

**Status:** controlled validation round (v13 vs v15.1 per operator-approved change log) + strategic pivot point.
**Source log:** `../logs/game-log-11.txt` (14 sessions: 8 under v13, 6 under v15.1)
**Operator:** specimba
**Recorded by benchmark:** 2026-08-24 (Ankara)

---

## 1. Validation verdict (per `v15-stability-review.md` §6, operator-approved thresholds)

| Metric | Target | Result | Verdict |
|---|---|---|---|
| **M-1 ambition** | ≥50% of LEAN baseline (≈3.8 stack-mentions/session) | 3D/WebGL/Three.js mentions: **v13 arm 4 vs v15.1 arm 62** (~15×); GLM-5.3 shipped a **full 3D WebGPU waves ship+boss game in one shot** | ✅ **PASS — decisively** |
| **M-2 C14 guard** | 0 C14 concepts | v15.1 arm contains frequency(24), echolocation(5), sonar(3), radar(1), SIGNAL(1) — some technical, but the family returned in concept space (operator: ray-reflection game "with acoustic things") | ⚠️ **BORDERLINE FAIL** |
| **M-3 craft-default** | 0 craft games by default | No craft/sim game shipped (the forge/crane/glassblow hits are in notebooks — models crossing the families out, not shipping them) | ✅ **PASS** |
| **M-4 reliability** | 0 bugged/crashed; 100% launch | Buggy across BOTH arms: unreachable second level, "everything bugged," buggy controls, dark-page fail, drifted HUD, glm-5.1 failed to deploy ×2 | ❌ **FAIL** |
| **M-5 fail-state/story** | every build has a real fail state + story | Partial: some sessions implemented explicit fail states; but gemini's papers-please-like: *"random clicks moved to the final ending easy"* (FM-6 recurrence) | ⚠️ **PARTIAL** |

**Pre-committed knobs now owed (NOT applied — held pending the strategic decisions, see the regime deep-dive):** M-4 fail → re-add minimal self-QA (NC-5); M-2 fail → re-add the C14 guard (CH-3). The operator is questioning the framework itself this round, so the knobs wait.

## 2. Games observed

**v13 arm (8 sessions):** gemini-3.1-pro → 2D top-view snow-spreading truck · claude-opus-4-8 → tabletop ("okay but not for here") · **glm-5.2-max → train-routing timetable puzzle — "first time in our bench," round winner** · glm-5.1 → failed to deploy ×2 · gemini-3.7-flash → papers-please-like (original idea; "random clicks → final ending") · qwen3.5-397b → "complete shit but delivered" · claude-opus-4-7 → **"who is the killer" text game** · korrine → **"who is the killer," sophisticated version**.

**v15.1 arm (6 sessions):** korrine → 2D buggy top-view space shooter with blackhole ("made more than 3 times" per operator) · gemini-3.5-flash-high → ray-reflection optic game (buggy, "acoustic things") · gemini-3.7-flash → strange 3D flight+shooting (buggy controls) · **glm-5.3-max → full 3D WebGPU waves ship+boss game** ("great webgpu 3d approach in one shot but so buggy… could be a real game in 1-2 days of fixes") · glm-5.2 → dark+sound-bleep, dark-page fail · hunyuan-hy3 → buggy 3D plane, drifted HUD.

## 3. The two decisive R011 findings

**Finding A — the operator's observed self-talk is real, and it cuts both ways.** Line 1011 (glm-5.2, the round winner): *"Design family (deliberately avoiding the traps): I crossed out the sonar/signal/frequency family (§4.4) and the forge/glass/crane craft-sim family (§4.5), and picked from the social + choice families instead."* Line 1570: *"That's a situation, not a sensory modality, and it lives in the systemic family, not the craft/material corner."*
→ For SOME models, the categorical menu is a **navigation aid** — glm-5.2 used it to steer into social/systemic and produced the round's most novel game. For others it's cognitive furniture ("no crane, no blacksmith, no glass blowing…") that taxes the concept space.

**Finding B — a NEW convergence cluster appeared under FULL guards: C17.** Under v13 — with every guard we have (§4.4 sensory-modality, §4.5 craft-category, the avoid-lists, the 7 families) — **two different models independently shipped the same game in the same round: a "who is the killer" text mystery** (claude-opus-4-7's "very simple only text" + korrine's "same but better and highly sophisticated mechanics"). No guard mentioned it because the cluster did not exist yet. The operator named it precisely: *"HOW ALL OF THEM SUDDENLY STARTED CREATING SAME GAMES or THEMES."*
→ **The guards rename convergence; they do not remove it.** The convergence lives in the models' shared prior over "what a good small indie game is," and any open-ended brief samples that prior. C17 is also notable as an *anti-ambition* convergence: under a prompt pushing visual ambition, two models found the lowest-graphics genre that still satisfies "complete loop with resistance" — a text deduction game needs no art at all. Constraint pressure finds the path of least resistance.

**C17 registered** in the §6.5 cluster registry: "Who-is-the-killer / text-deduction mystery" (R011, 2 models, v13 arm).

## 4. Files changed this pass

| Path | Change |
|---|---|
| `battles/round-011-after-action.md` | (this file) |
| `battles/regime-deep-dive.md` | the strategic answer to the operator's restrictions question (the main deliverable of this pass) |
| `benchmark/06-anti-bias-anti-gaming.md` | C17 registered; post-R011 note (guards rename convergence; self-talk evidence) |
| `README.md` | Round 011 row + Round 012 plan (pending operator strategic decisions) |
| `../logs/game-log-11.txt` | brought in from the operator's master-branch upload |

**Deliberately NOT done this pass:** applying the M-2/M-4 pre-committed knobs (v15.2) — the operator is questioning the framework itself; knob-turning inside a framework under review would be the surface-sweep behavior they explicitly rejected.
