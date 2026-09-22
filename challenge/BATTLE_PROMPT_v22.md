# BATTLE PROMPT — Build one good browser game, in one session (v22)

You have one sustained session to build a complete, original, playable browser game. Push your environment as far as it goes — you are **not** limited to a small 2D game, and you are not limited to code: this benchmark has verified that modern 3D libraries, generated imagery, procedural geometry and material pipelines turn prompts into real game assets. Frontier models in 2026 routinely deliver WebGL/WebGPU generative visuals, real simulations, shader post-processing, and procedural worlds. **That capability is in your hands — use it.** Build something a person would genuinely be glad they played, and that looks like 2026, not 2013.

## 0. The four answers — write them before you write any code

Write these four answers before any code — in your notebook and in the README (the README is what a judge reads first). Write them as facts about your game, not as moods or intentions: a sentence with a verb, an object and a cost is an answer; a sentence with adjectives is not. Each question has a **rejection test** — if your answer fails it, the fault is the concept, not the wording: change the game, then answer again.

**Q1 — Why must this be played?** What does the player *do* that a viewer, a reader, or a passive simulation could not get? *Reject if:* the sentence still stands with "the player" replaced by "someone watching a recording of it".

**Q2 — What is the player's sentence?** One sentence: what the player is trying to do, what can stop them, and what makes it fun. *Reject if:* (a) it describes a system that runs rather than a choice a person makes; (b) you can swap in a different goal and verb and the sentence still stands — that is a genre, not a game; (c) it names only obstacles and never a pleasure.

**Q3 — What does the player decide, again and again, and what does each side cost?** Name the recurring decision, the price of both options, and why neither is always right. *Reject if:* a competent player would always pick one side (then it is a correct answer, not a decision), or the decision happens once in the run and never returns.

**Q4 — Has this already been made?** Name the closest shipped commercial game, then name the one mechanic, perspective or decision you bring that it does not have. *Reject if:* your game is that game with the systems removed (theme kept, depth dropped), or a famous 2003–2015 title already executed the idea and you add nothing — that is a clone or a form-era retread, and it will be judged as one.

**The game comes first.** A correct simulation of something is not a game until a player has a goal, a real obstacle, and at least one decision with a tradeoff they can feel. Build the smallest version of that loop first, in the ugliest possible graphics; make it fun; only then add the real numbers and the polish. **A game also needs a reason to be enjoyed** — something that delights, fascinates, amuses, moves, or intrigues. Name what the player will *like*, not only what can stop them.

**Fun is a contract with minutes.** Know what is fun at **minute one** — the player must do something genuinely pleasant and legible within the first ~60 seconds, no difficulty cliff, no perfect-play demanded to reach content — and what keeps a real player wanting **one more run at minute ten** (no boredom plateau). Balance for a first-time player, not for yourself. If minute one is a wall or minute ten is work, you have a pacing defect, not a content problem — fix the pacing.

**Ship complete.** An unfinished ambitious game is the worst outcome in this benchmark — worse than a small finished one. Scope so the full loop closes end-to-end on a fresh load. If you catch yourself building to infinity (features accumulating, no closure, endless "one more system"), stop and close the loop first. A closed small loop beats an open big one, every time.

**A claim is not evidence.** The parts you actually *executed* count for more than the parts you believe. In one round of this benchmark, 20 of 22 sessions shipped a self-test they never ran; the single session that made its own test executable found a real balance defect with it — and delivered the round's best-received game. Execution is available to you in more ways than you think (§1).

## 1. Know your environment first (≤3 minutes — then one line in the README, done)

Battle sandboxes differ, and every class can win. Run three quick checks and take the matching route:

- **E1 — Full shell/CLI** (`python`, `pip`, `bash` work): everything is open to you, including headless Blender (`pip install bpy`, CPU renders for QA stills). If you have it, use it and say so; if not, do not burn session time reaching for it — the classes below are complete without it.
- **E2 — Package manager only** (`npm install` + build work; arbitrary shell does not): this is the class most battles run in, and **everything the benchmark considers "engine work" is available here** — install a 3D library and model in code. Use the npm-3D recipe below plus the image route.
- **E3 — File/response edits only** (no installs, no shell): code-procedural + the image route. Fully acceptable; the loop and the look decide the grade, not the class.

Put a one-line **ENV** report in your README: your class, what you attempted beyond plain code, **what you managed to execute** (see the verification route below), and — if you attempted nothing beyond plain code — the single line that blocked you. Attempting and failing fast is fine; skipping silently is an honesty defect.

**The npm-3D route (E1/E2)** — the recipe set behind this benchmark's best-received builds:

- **Geometry in code:** `LatheGeometry`, `ExtrudeGeometry`, parametric primitives, merged and displaced with seeded noise. Per-instance variation from a seed is what makes procedural sets look *made* rather than repeated.
- **Materials, specified explicitly** (you cannot admire them, so choose them): PBR roughness/metallic values, plus your own texture variation — **paint fbm noise maps into an offscreen canvas at load** (512² albedo/roughness per material class beats flat colour every time). A PMREM environment map makes metals and glass read.
- **One motivated key light:** one direction, soft shadows, a reason to change over the run (a sun that sets, a lamp the player swings, a spotlight that defines the room), one cool rim or fill, ACES tone mapping, fog for depth. Emissive things actually glow.
- **Post-processing: hand-rolled and guarded.** In single-file builds prefer a small custom composer (bloom/vignette/grade) over `three/examples` addon imports, which break bundling. Wrap it in `try/catch`, ship a `Graphics: plain` toggle, guard WebGL context failure — a rendering path that can blank the screen is a defect, not ambition.
- **Population and depth:** instance repeated objects (buildings, trees, props) rather than drawing a handful; give the frame foreground/midground/background; write one GLSL effect for the single thing that matters instead of a stack you cannot verify.
- **If your renderer is 2D**, the look is a *layered painter's stack*, obeyed in order: sky → light source and rays → clouds → two or three parallax planes → ground/water with glitter → wisps → terrain → hero → particles → vignette + ground-shadow cue. Additive glow for anything luminous, squash/stretch on the hero, shake on impact.

**The image route (all classes).** If your environment provides image generation, this channel is your **eyes**: make it carry the visual identity — key art, portraits, tiles, panels. Use **few** assets (1–8), inspect every one, 2–4 passes is normal. Two hard-won rules: (a) **check each asset for baked-in text or numbers** that will contradict your game state (a lot number, a price, a level count) and regenerate; (b) if the build must stay asset-free, generate a **reference**, look at it, re-author it procedurally, delete the file.

**The verification route (all classes — read this twice).** You need no extra tools, no companion file and no shell: write one small script yourself and let the package manager run it. `esbuild` is already installed inside Vite (otherwise `npm i -D esbuild`).

```js
// scripts/probe.mjs — bundles your pure sim/probe and executes it on Node.
import { build } from 'esbuild';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const out = join(mkdtempSync(join(tmpdir(), 'probe-')), 'probe.mjs');
await build({ entryPoints: ['src/game/probe.ts'], outfile: out, bundle: true, format: 'esm', platform: 'node',
              define: { 'import.meta.env.DEV': 'true' } });
const { fails } = await import(out);
if (fails !== 0) { console.error(`PROBE FAILED — ${fails} check(s)`); process.exit(1); }
```

- End your probe with `export const fails = results.filter(r => !r.ok).length;` and `console.log(JSON.stringify({ check, results, fails }))`. The runner exits non-zero when `fails` is not 0, so **a broken game fails your build loudly** instead of shipping quietly.
- If you can run npm scripts: add `"probe": "node scripts/probe.mjs"` to `package.json` and run it.
- If only the build runs: put it in the build chain — `"prebuild": "node scripts/probe.mjs"`, or `"build": "node scripts/probe.mjs && vite build"` — so the build you already have executes the probe; read the result in the build log. It changes nothing in the bundle.
- Do not report a pass you did not see in that output.
- If nothing executes at all: ship the probe and state plainly in the README that **you could not run it**. An unrun probe is a claim; a disclosure is honest.

Immutable rules on all routes: every asset is bundled (no runtime network); sources every agent receives equally; receipts disclosed.

## 2. The look — why rounds keep producing cardboard, and the checklist that fixes it

"Cardboard" means: unlit flat-coloured shapes, default materials, no shadow, no atmosphere, polish that stops at the UI. Its 3D signature is unmistakable — **if your scene could be described as coloured boxes with no light story, it is not finished.** The fix is a checklist, not a budget:

- **Light and shadow first.** One clear light direction; the hero casts or receives shadow; emissive things actually glow.
- **Materials respond.** Roughness/metallic variation; surfaces broken by noise, not uniform fills. Flat colour is a deliberate choice, never the default.
- **Palette discipline.** 3–5 deliberate colours plus neutrals; every screen — title, HUD, world — draws from the same tokens.
- **Depth in the frame.** Foreground/mid/background, scale contrast, fog or a depth cue; not a single plane.
- **Motion juice.** Particles, trails, squash-and-stretch, shake on impact, glow that responds to state. Feel is visual.
- **Finish the frame.** Title, menu, HUD and game share one design language; nothing left as browser-default chrome.

The honest constraint: some battle sandboxes give you **no browser and no way to see your own runtime** — code-rendered visuals you cannot see are *blind*, and blind iteration is how cardboard ships. Handle it deliberately: (a) let the visual identity you *can* see (generated assets, provable-by-construction parameters) carry the first impression; (b) keep unseen code-visuals simple and defensive — strong silhouettes, explicit palette tokens, real lights, and the values written down rather than guessed; (c) state in the README which parts you saw and which you verified blind by construction. If you DO have a browser or preview: play and look before delivering, and say that you did.

If you commit to 3D/WebGPU, **finish it** — a broken ambitious build scores worse than a clean simple one, so scope what you can actually complete end-to-end on a fresh load with a real mouse.

## 3. Originality — be ambitious, and choose your second idea

**Be ambitious and trust your own taste.** Any genre, any camera, any stack, any form (action, strategy, simulation, narrative, puzzle, exploration, abstract, experimental — your call). A situation can equally be **physical** (something transforms), **social** (people or factions in tension), **economic** (scarcity, trade, debt), **relational** (a tie under stress), **systemic** (a world whose rules respond to you with consequences you can feel), **choice-driven** (a decision with consequences), or **narrative** (a story the player uncovers) — seven families, all coequal, and the physical one is only the default if you let it be.

(Honest notes from many rounds — the field's default premises now include: **sonar / radio / frequency tuning**; **gravity-well piloting**; **tangible-craft work** (forging, glass, cranes); **wildfire / ember / fire-response**; **energy-grid / infrastructure balance**; **root / sprout / mycelium growth networks**; **lighthouse / beacon / light-as-a-resource**; **single-axis wind flight** (kite line, balloon altitude, seed-glide); **auctions and appraisals** (hidden value, a purse, a hammer). The umbrella behind most repeats is one shape: *a threat or a meter advances while you ration a scarce resource under a clock* — it can wear fire, a power grid, a flight plan or a tuxedo. None of these are banned, and a great game in any of them can still win, but they have flooded recent rounds — including near-identical games shipped by different models in one battle — and the operator is visibly tired of them. If your first instinct sits inside that umbrella, assume your second idea is more original.)

So: before you write code, draft **two candidate premises** in your notebook. If both sit under the umbrella shape (spreading threat / sliding meter / rationed spend / hidden-value bidding), discard both and find a third in a family you have not shipped recently. One line in the README: which families your candidates touched and why you shipped the one you did (**PREMISE_NOTE**) — and Q4's canon check applies to the premise you ship.

## 4. Build it like an engineer, not a scripter

Before implementation code, spend ten minutes on two short notes: **domain notes** — the real numbers your simulation runs on (masses, rates, tolerances, prices — look them up; real data is what makes a simulation substantial, and real catalogue data such as star positions or ISO container dimensions makes a *look* real too). And a **mini-contract** — which module owns what (fixed file paths), the exact shape of shared data, and the complete list of events that cross module boundaries. Never invent a new cross-module dependency mid-build; where something is unspecified, pick the simplest option that satisfies the interfaces you already wrote.

Then hold these invariants while you build:

1. **Fixed-step simulation, decoupled from rendering.** The sim advances in fixed steps and never reads the frame clock. The renderer visualizes the sim — it may not create game state.
2. **Zero top-level side effects.** Modules define pure data and functions at top level; setup happens inside init functions — so your logic can run without a canvas.
3. **Seeded randomness only.** No `Math.random()` and no wall-clock time inside simulation code. Randomness arrives as a seed; time arrives as a parameter.
4. **Durable state is not a one-shot event.** A persistent fact (health, position, reload) is never encoded only as a transient event.
5. **No per-frame allocation in hot loops.** Reuse scratch objects.
6. **Presentation is cosmetic.** Quality settings may change resolution and effects — never rules, timing, or outcomes.
7. **The simulation serves a game.** Every system you build must map to something the player decides, cares about, or feels. If a system is pure background math the player never touches, cut it — or find the decision that touches it.

**Write the probe — then run it if you possibly can** (see §1, verification route). A good probe plays your game like a naive first-time player, through the real rules, and asserts:

- **the first goal is reachable** by a policy that does not know the answers;
- **a win is reachable**, and **failure is reachable by more than one cause** (greed must fail, timidity must fail) — one loss path means a wall, not a design, and if neither side of your Q3 decision ever loses, the decision is not real;
- **every level is reachable using only the mechanics unlocked at that level** — an early level that becomes unwinnable when a new element appears is a real defect this benchmark has shipped;
- **no dead state** where no input makes progress; **restart truly resets**; **identical seeds are deterministic**;
- and if your game has a camera and a mouse, that **the control mapping is sane** (no inverted axes, no unreachable targets, the hero visible and in frame at every camera state).

If a check fails, fix the game until it passes — that is the point of the probe. Report its **actual output** in the README, or state plainly that you could not run it.

**Static audit is the cheap complement** — no execution needed, and it caught the most real bugs in this benchmark's best builds. Check every time: the first render pass is actually drawn (a missing main pass is invisible in code review), objects parented to a transformed group but written in world coordinates (double transform), a shadow camera or light side that does not match the visible light, `updateProjectionMatrix()` after changing a camera, `scene.background` clobbered by a later pass, event ids that reset across restarts, audio gain applied before the graph exists, near-plane clipping that hides the hero, and any state written only inside an event instead of durably.

If your sim honours invariants 2 and 3, write and run a tiny self-test of its core rules before you deliver — it is the cheapest "no flaws" you will ever buy.

**Playability probe (when you cannot play):** if your sandbox gives you no browser, the probe is your substitute — but only if it *ran*. Say which parts of the game the probe covers (rules, reachability, determinism) and which it cannot (pixels, audio, feel).

## 5. The only hard rules (reliability, fairness, honesty — everything else is your call)

1. **Launches** cleanly on a fresh load — no blank screen, no console-error loop. If you use WebGL or post-processing, the failure path is guarded and the game remains playable without it.
2. **Complete loop with real resistance, closed** — start → play → something that can actually stop you (a fail state, a wall, a cost you can't undo, a rival, a deadline, a mystery, an appetite) → end → restart, without a page refresh, and the run *ends* — no infinite-building, no "to be continued". If a player clicking randomly reaches the end unchanged, it isn't a game yet — and a narrative form must have an actual story to find.
3. **Controls and pacing for a real player** — controls work with a real mouse/keyboard/touch and are *legible*: the hero is visible in frame, axes are not inverted, an action follows the input that caused it. The first goal is reachable in ~5 min of honest play; no difficulty cliff in the first minute; **every level is beatable with the tools available at that level**; audio is not harsh or ear-blasting at default volume.
4. **Pause** freezes everything; **mute** silences within one frame (no constant drone); **restart** resets fully; defaults are moderate (volume, speed, difficulty).
5. **Self-contained & fair:** the final build runs offline with everything bundled. Any visual source your sandbox provides **equally to every agent** is fair — procedural, generated imagery, baked assets, engine/tool-generated assets — as long as you bundle it (no runtime network) and **disclose in the README what you generated** (a short receipts list: what, and roughly how). No telemetry.
6. **Robust**: resize/orientation safe, tab-blur safe, corrupt-`localStorage` safe, no full-screen flash/whiteout that fails to decay.
7. **Honest**: no placeholder screens, no dead buttons, no autoplay that fakes quality. README opens with `TRACK: strict-one-shot` or `TRACK: iterated (N passes)`, and contains the ENV line, the PREMISE_NOTE line, the receipts, and the **verification line** — either the probe's real output, or the plain statement that it could not be executed here.
8. **Play your own game — or probe it.** Before you deliver, play it once, end to end, as a player — not as the developer who knows the answers. If you cannot play it (no browser), run the probe from §4 and report it. If you did not enjoy the run you just played (or probed), do not deliver it; fix it first. In the README, say exactly what you verified (fresh load, one full run, restart) — not "should work".

**Run this list once before you deliver:** fresh load → title in <10 s, no console-error loop · full loop including a real fail state and a real ending · real mouse: controls and aim work, no soft-lock, axes not inverted, hero in frame · every level reachable · pause freezes everything; mute kills audio within one frame · resize mid-play safe · no full-screen flash/whiteout that fails to decay · pacing: minute one is fun and reachable, minute ten still wants one more run · if you built the ambitious rendering path (3D / WebGPU / shaders), verify it **end-to-end on a fresh load** — if it breaks, deliver the clean fallback instead · if you generated assets, you looked at every one (and checked them for text that contradicts the game) · if you ran a probe, its output is in the README; if you could not run it, that is written down too.

**Deliverables:** the runnable game; a short README (TRACK line; **ENV** line; **PREMISE_NOTE** line; how to run; controls; stack; receipts — what you generated and with which route; verification line — what actually executed; and short **DESIGN_PILLARS** / **DIRECTOR_STATEMENT** (state the look: light, palette, material language) / **WHY_INTERACTIVE** (your Q1–Q3 answers, concretely) / **FUN_LINE** (what is fun at minute one, and what pulls one more run at minute ten) / **HONEST_SELF_ASSESSMENT** (what you actually play-tested or probed, and what broke)); and, if you keep a `design_notebook.md`, it must carry the four answers (§0) and your two candidate premises (§3).

Deliver a complete, polished, modern game you'd actually want to play. Good luck.
