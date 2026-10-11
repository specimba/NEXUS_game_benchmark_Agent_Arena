# Design Notebook — TIDEWRIGHT

Method: v8 craft process (design pillars → find-the-fun ordering → small interlocking
systems → notebook-then-scary-pick). Written as the brief recommends.

## 1. Emotional core
The material is the star. Not "solve this puzzle" but "argue with a real liquid." The fun
is the *tactile resistance* of pushing/pulling/tilting a stable, alive fluid.

## 2. Design pillars (kept in view throughout)
- **Tactile physics first.** If the fluid isn't stable and responsive, nothing else matters.
- **Readable goal state.** A glowing crucible + a hold meter; you always know what to do.
- **Cohesive forge identity.** Ember/teal palette, procedural glow, sustained across every screen.
- **Forgiving clock.** Fail = time out, never an unfair instant death.

## 3. Find-the-fun ordering (what I built first → last)
1. Solver (Clavet double-density relaxation) — proven stable on CPU before any visuals.
2. Core loop: push/pull + tilt + goal-hold. Verified headless before UI existed.
3. Levels (5 chambers) as *geometry puzzles*, not stat inflation.
4. Rendering: WebGPU screen-space fluid + Canvas2D fallback.
5. UI/HUD/audio/polish.

## 4. Small interlocking systems
- Pointer force (push/pull) ↔ gravity tilt ↔ obstacle geometry ↔ goal zone.
- Each mechanic changes *how* you move fluid; none is decorative.

## 5. The scary pick
I chose a **GPU-unverifiable WebGPU renderer** (no GPU in sandbox). Scary because a shader
bug could blank the screen — a kernel hard-fail. Mitigation that made it safe: keep the
*verified CPU solver* as the simulation source of truth, and wrap WebGPU in an automatic
Canvas2D fallback triggered by any init/runtime/uncapturederror. Ambition without
reliability risk.

## 6. Cut ideas (and why)
- GPU-compute SPH solver: unverifiable here; CPU solver already proven stable. Deferred,
  not abandoned (same `FluidCore` API would host it).
- Multi-fluid color-mixing puzzles: added palette variety instead; mixing was scope creep.
- Burst ability: dropped to keep interaction legible (push/pull/tilt is enough).

## 7. Verification (sandbox, no GPU)
- `verifier/physics-node-test.mjs`: stability, mass conservation, incompressibility,
  obstacle non-penetration, tilt slosh, determinism — ALL PASS.
- `verifier/game-logic-test.mjs`: win/lose/restart/pause/determinism — ALL PASS.
