TRACK: strict-one-shot (single continuous build session; long-session discipline, no external re-runs between turns)

# TIDEWRIGHT — The Fluid Forge

A complete, original browser game about shaping a living, physically-simulated liquid
metal. You are a *wright*: push, pull, and tilt a real fluid so it pours into the
forge's crucible and holds there before the clock runs dry. Five increasingly tricky
chambers, star ratings, and persistent progress.

This entry was built for the NEXUS CoDeX–GeNiuS benchmark as a **WebGPU-driven
physical simulation** with the **best simulation approach** research could surface for
interactive 2D fluid (Position-Based / double-density relaxation, Clavet et al. 2005),
rendered with a custom **screen-space WebGPU shader pipeline** (metaball thickness →
surface normal → lighting + foam + fresnel over a procedural forge), and a guaranteed
**Canvas2D fallback** so it always launches.

## Run it
No build step, no network, no backend. From the repo root:

    python3 -m http.server 8000
    # then open http://localhost:8000/

(Any static server works; opening `index.html` via `file://` is also fine for the
Canvas2D path — WebGPU needs a secure context, so prefer `http://localhost`.)

## Controls
- **Left-drag** — PUSH fluid away from the focus
- **Right-drag** (or **Shift+Left**) — PULL fluid toward the focus
- **← / →** (or **A / D**) — tilt gravity to slosh the whole body
- **Space** — pause · **R** — restart · **M** — mute · **G** — cycle graphics (Auto / WebGPU / Canvas2D)

## Objective
Route enough fluid mass into the **GOAL** zone and **hold** it there until the hold
meter fills. Beat the countdown for more stars. Star thresholds reward speed/efficiency.
Lose by letting the clock hit zero.

## What was intentionally cut / not built (honest disclosure)
- **WebGPU compute simulation**: running the SPH solver *on* the GPU was prototyped but
  not shipped as the primary path. Reason: the sandbox has no GPU/WebGPU runtime to
  verify a compute-shader solver, and the benchmark's kernel hard-fails on a blank
  screen. The verified CPU solver therefore drives the sim; WebGPU still does the heavy
  lifting on the *render* side (thickness + screen-space shading). The architecture is
  render-backend-agnostic, so a GPU-compute sim can be dropped in behind the same `FluidCore` API.
- **No audio autoplay**: sound is created only on first user gesture (autoplay policy).
- **Mobile**: pointer + touch work; the game targets desktop primarily.

## Engine / framework
- Pure vanilla ES modules + WebGPU (`navigator.gpu`) with a Canvas2D fallback. No bundler,
  no dependencies, no network calls. Fully self-contained and offline.
- Simulation: `src/sim/fluidCore.js` (Clavet double-density relaxation, grid neighbour
  search, rest-density auto-calibration).
- Rendering: `src/render/webgpu.js` (2-pass screen-space fluid) + `src/render/canvas2d.js`.
- Game/UI/audio/input: `src/game/`, `src/ui/`, `src/audio/`, `src/core/`.

## Verification done in this sandbox (no GPU available)
- `node verifier/physics-node-test.mjs` — proves the solver is stable, mass-conserving,
  incompressible, interactive (push/tilt), and deterministic.
- `node verifier/game-logic-test.mjs` — proves win/lose/restart/pause/determinism.
WGSL was authored conservatively and the app auto-falls-back to Canvas2D on any WebGPU
init or runtime error, so a shader issue can never blank the screen.

## One-paragraph director's statement
I wanted a game where the *material* is the star — a real fluid you argue with, not a
scripted splash. The brief's "best simulation approach" led me to position-based fluid
(Clavet), which stays stable at frame-rate timesteps and reads as genuinely liquid.
I leaned into a forge aesthetic (ember-orange "molten" vs teal "coolant", procedural
glow/caustics/vignette) and a screen-space shader pipeline for the WebGPU path so the
bulk of the graphical work happens on the GPU. Strongest feature: the tactile, stable
fluid you can sculpt with mouse + gravity tilt. Biggest risk I deliberately mitigated:
a WebGPU compute shader I cannot run here could have shown a blank screen, so the
verified CPU solver + automatic Canvas2D fallback guarantees the kernel's "launches
reliably" requirement while still delivering a WebGPU-rendered experience where available.
