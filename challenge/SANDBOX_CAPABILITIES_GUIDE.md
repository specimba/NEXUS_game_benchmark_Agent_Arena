# SANDBOX CAPABILITIES GUIDE (v2 — companion to BATTLE_PROMPT_v22)

**Purpose.** What a battle agent can *actually* do in the arena sandbox, measured rather than assumed — and what the benchmark therefore puts in the prompt. v1 of this guide (2026-09-06) documented the verified Blender pipeline; three field-test rounds later (logs 15, 16, 17 — 45 sessions) **not one battle session has ever had access to it.** This version records that honestly and promotes the routes that work.

**Evidence base:** `battles/arena-sandbox-engine-capability-audit.md` (E1 analyst sandbox, measured), `battles/round-015-v19core-field-analysis.md`, `battles/log15-16-v21-revision-notes.md`, `battles/round-018-v21-field-analysis.md` (log 17: 22 sessions), `repo-ops/sandbox-tools/e2-probe-harness/` (verified 2026-09-21).

---

## 1. The classes, as measured

| Capability | **E1** analyst sandbox | **E2** battle class (typical) | **E3** battle class (minimal) |
|---|---|---|---|
| arbitrary shell (`bash`, `python`, `node` scripts) | yes | **no** | no |
| `npm install` + `npm run build` | yes | **yes** | no (file edits + build only) |
| `pip` / `bpy` / headless Blender | yes (stubs + CPU renders verified) | **no — 0 of 45 battle sessions** | no |
| Godot / Unity / Unreal binaries | no (CDN blocked) | no | no |
| browser / preview of own runtime | no | **no** | no |
| image generation | yes | **yes** (15 of 22 log-17 sessions generated assets) | sometimes |
| image *viewing* (the agent's eye) | yes | **usually** (≥9 of 22 log-17 sessions explicitly inspected their art; 1 session had generation but no viewing) | varies; some sessions report no image channel at all |

**Consequences encoded in v22 §1:** E1 gets one line (use Blender if it exists; do not hunt for it). E2 carries the full npm-3D recipe set. E3 gets the code-procedural + image route. **Godot is not mentioned anywhere** — no battle sandbox can run it, and naming an unreachable option spends concept space (C15 law).

## 2. What "engine work" means in the battle class (and why it is not a downgrade)

Measured from log 17 (enumeration in `battles/round-018-v21-field-analysis.md` §4): `three.js` in **11 of 22** sessions; Canvas-2D/DOM-2D in **9 of 22** (2 unclassified: one truncated session, one hybrid text+CSS); Babylon/Phaser/Pixi/PlayCanvas and every JS physics package in 0; all physics hand-rolled (verlet, boids, ballistic solvers, tether springs). The complete working pipeline is:

| What Blender/Godot would give | The E2 substitute (verified in real deliveries) |
|---|---|
| mesh authoring | `LatheGeometry` / `ExtrudeGeometry` / parametric primitives + seeded-noise displacement; UV-free, per-instance variation from a seed |
| texture baking | fbm noise painted into an offscreen canvas at load (512² albedo/roughness per material class) |
| environment lighting | PMREM from a simple gradient/env scene; one key light with soft shadows + ACES + fog |
| scene graph / editor | code-built scene, explicit camera rig, instanced population |
| physics engine | hand-rolled fixed-step physics — which doubles as the *game's* feel and keeps the sim pure (probe-able) |
| post-processing stack | a small custom composer (bloom/vignette/grade) — safer than `three/examples` addons in single-file builds — wrapped in `try/catch` with a Plain toggle |
| asset store / downloaded models | the image channel for key art, portraits and backdrops (1–8 assets, inlined as data URIs, inspected, regenerated when wrong) |

If the benchmark ever wants *Blender-authored* meshes in the battle class, they must arrive **pre-baked in the workspace** — the sandbox cannot produce them. That is a scaffold decision (see §4).

## 3. Verification without a browser (the round-018 unlock)

The largest measurable quality lever found so far is not a toolchain — it is **execution**. In log 17, 20 of 22 sessions shipped a self-test they never ran; the one session that hooked its build step to execute its probe found a real balance defect (a 1/24 win rate) and delivered the round's best-received game (the 22nd session, B10, was truncated in the capture with no probe evidence).

**The harness:** `repo-ops/sandbox-tools/e2-probe-harness/` (self-test green). It bundles a TypeScript probe with `esbuild` — a Vite 7 dependency that Vite 8 no longer brings, so one `npm i -D esbuild` may be needed — stubs the few browser globals a guarded probe may touch, runs it on Node, and reads one JSON report line. Exit codes: `0` pass · `1` a check failed · `2` could not execute/report (**never** a pass). Copy `run-probe.mjs` into `scripts/` and add `"probe": "node scripts/run-probe.mjs"`.

**The three tiers** (v22 §1): (1) shell available → run it directly; (2) npm available → bundle with esbuild and run on Node, or hook the build so the build itself executes the probe (the round-018 method — remove the hook afterwards and confirm the build is unchanged); (3) nothing executes → ship the probe and **state plainly that it was not run**. An unrun probe is a claim; a disclosure is honest.

**What it proves / cannot prove.** Proves: sim rules, first-goal/win/fail reachability, per-level solvability, dead-state absence, determinism, restart, control mapping if asserted. Cannot prove: pixels, shader output, layout, camera framing as rendered, audio, feel, pacing. The honest README sentence is *"I executed the probe (output below) → sim truth; I could not see or hear the build → visuals/audio verified by construction only."*

## 4. Operator decisions on the table (not shipped)

| # | Proposal | Rationale | Cost / risk |
|---|---|---|---|
| D2 | Ship `scripts/run-probe.mjs` + the `probe` npm script into every battle workspace | turns the verification route from prose into a one-command reality; no reading burden (nothing new the agent must study) | tiny; needs the operator's approval to change the workspace scaffold |
| D2b | Pre-install one non-`three` engine or a physics package to break the monoculture | engine diversity, if that is a goal | may create a new attractor (C15 law) and adds dependencies to maintain |
| D2c | Pre-bake a small set of Blender-authored assets (glTF) into the workspace | gives the battle class the "real engine" flavour the operator expected from Blender | assets must be equally available to both agents; needs an asset-pack audit and a licence note |

## 5. The E1 recipe, kept for the record

Blender-as-Python (`pip install bpy==4.2.19`), stub `.so` files for the missing X11/GL SONAMEs (`repo-ops/sandbox-tools/blender-headless/build_stubs.sh`), seeded generator scripts, `export_scene.gltf` → Khronos `gltf-validator` (0 errors), `GLTFLoader` at runtime, and **Cycles CPU renders** (256–512 px, seconds per frame) for visual QA. Still valid and verified — for the analyst class, for asset pre-baking, and for any future battle sandbox that grants shell access.
