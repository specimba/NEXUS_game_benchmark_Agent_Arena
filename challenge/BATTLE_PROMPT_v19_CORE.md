# BATTLE PROMPT — Build one good browser game, in one session (v19 CORE)

You have one sustained session to build a complete, original, playable browser game. Push the sandbox as far as it goes — you are **not** limited to a small 2D browser game. Frontier models in 2026 routinely deliver WebGL/WebGPU generative visuals, real simulations, shader post-processing, and procedural worlds in a single self-contained file. **That capability is in your hands — use it.** Build something a person would genuinely be glad they played, and that looks like 2026, not 2013.

Answer one question before you write any code: **why does this experience need to exist in interactive form?** If you can't answer it, you don't have a game yet.

Before you write any code, write the **player's sentence** — one sentence answering: *what is the player trying to do, what can stop them, and what makes it fun?* If your sentence is about systems that run rather than choices a person makes, you don't have a game yet. **The game comes first: a correct simulation of something is not a game until a player has a goal, a real obstacle, and at least one decision with a tradeoff they can feel.** Build the smallest version of that loop first, in the ugliest possible graphics; make it fun; only then add the real numbers and the polish.

**Be ambitious and trust your own taste.** Any genre, any camera, any stack, any form (action, strategy, simulation, narrative, puzzle, exploration, abstract, experimental — your call). A situation can equally be **physical** (something transforms), **social** (people or factions in tension), **economic** (scarcity, trade, debt), **relational** (a tie under stress), **systemic** (a world whose rules respond to you with consequences you can feel), **choice-driven** (a decision with consequences), or **narrative** (a story the player uncovers) — seven families, all coequal, and the physical one is only the default if you let it be. (Honest notes from many rounds of this benchmark: three patterns keep coming back as the field's defaults — **sonar / radio / frequency tuning**, **gravity-well piloting** (orbiting a star or black hole), and **tangible-craft work** (forging, glass, cranes). Each has been the most common convergence of some stretch of rounds. None are banned — but if you notice yourself reaching for one of them by default, look once more at the other families first.) These notes exist because this benchmark has watched many rounds, not because the listed things are bad — a genuinely great game in any of these families can still win. They exist to make you look twice at your first instinct, then trust your own judgment.

**Make it look considered.** Light, material, texture, composition, atmosphere — a coherent stylized look beats an unfinished fancy one, and deliberate minimalism with real polish beats both. The specific technique is your call: if your sandbox provides image generation, use it as an art director and source-asset generator, condition what it gives you, and disclose what you generated; if your stack supports physically-based materials, use them if they serve the look — never as an end in themselves. Whatever you choose, finish it end-to-end on a fresh load.

If you commit to 3D/WebGPU, **finish it** — a broken ambitious build scores worse than a clean simple one, so scope what you can actually complete end-to-end on a fresh load with a real mouse.

**Build it like an engineer, not a scripter.** Before writing implementation code, spend ten minutes on two short notes: **domain notes** — the real numbers your simulation should use. Look them up: real masses, rates, tolerances, prices, whatever your concept runs on. Real data is what makes a simulation feel substantial instead of invented. And a **mini-contract** — which module owns what (file paths fixed), the exact shape of the data shared between modules, and the complete list of events that cross module boundaries. Never invent a new cross-module dependency mid-build; if something is unspecified, pick the simplest option that satisfies the interfaces you already wrote.

Then hold these invariants while you build:

1. **Fixed-step simulation, decoupled from rendering.** The sim advances in fixed steps and never reads the frame clock. The renderer visualizes the sim — it may not create game state.
2. **Zero top-level side effects.** Modules define pure data and functions at top level; setup happens inside init functions — so your logic can run without a canvas.
3. **Seeded randomness only.** No `Math.random()` and no wall-clock time inside simulation code. Randomness arrives as a seed; time arrives as a parameter.
4. **Durable state is not a one-shot event.** A persistent fact (health, position, reload) is never encoded only as a transient event.
5. **No per-frame allocation in hot loops.** Reuse scratch objects.
6. **Presentation is cosmetic.** Quality settings may change resolution and effects — never rules, timing, or outcomes.
7. **The simulation serves a game.** Every system you build must map to something the player decides, risks, or feels. If a system is pure background math the player never touches, cut it — or find the decision that touches it.

If your sim honors invariants 2 and 3, write and run a tiny self-test of its core rules before you deliver — it is the cheapest "no flaws" you will ever buy.

**The only hard rules (reliability + fairness — everything else is your call):**

1. **Launches** cleanly on a fresh load — no blank screen, no console-error loop.
2. **Complete loop with real resistance** — start → play → something that can actually stop you (a fail state, a wall, a cost you can't undo) → end → restart, without a page refresh. If a player clicking randomly reaches the end unchanged, it isn't a game yet — and a narrative form must have an actual story to find.
3. **Controls work** with a real mouse/keyboard/touch; the first goal is reachable in ~5 min of honest play.
4. **Pause** freezes everything; **mute** silences within one frame (no constant drone); **restart** resets fully.
5. **Self-contained & fair:** the final build runs offline with everything bundled. Any visual source your sandbox provides **equally to every agent** is fair — procedural, generated imagery, baked assets — as long as you bundle it (no runtime network) and **disclose in the README what you generated** (a short receipts list: what, and roughly how). No telemetry.
6. **Robust**: resize/orientation safe, tab-blur safe, corrupt-`localStorage` safe, no full-screen flash/whiteout that fails to decay.
7. **Honest**: no placeholder screens, no dead buttons, no autoplay that fakes quality. First line of the README: `TRACK: strict-one-shot` or `TRACK: iterated (N passes)`.
8. **Play your own game.** Before you deliver, play it once, end to end, as a player — not as the developer who knows the answers. If you cannot play it, or you did not enjoy the run you just played, do not deliver it; fix it first. In the README, say exactly what you verified by playing (fresh load, one full run, restart) — not "should work".

**Run this list once before you deliver:** fresh load → title in <10 s, no console-error loop · full loop including a real fail state · real mouse: controls and aim work, no soft-lock, axes not inverted · pause freezes everything; mute kills audio within one frame · resize mid-play safe · no full-screen flash/whiteout that fails to decay · if you built the ambitious rendering path (3D / WebGPU / shaders), verify it **end-to-end on a fresh load** — if it breaks, deliver the clean fallback instead.

**Deliverables:** the runnable game; a short README (TRACK line, how to run, controls, stack, what you cut, what you generated [receipts], and short **DESIGN_PILLARS** / **DIRECTOR_STATEMENT** / **WHY_INTERACTIVE** / **HONEST_SELF_ASSESSMENT** paragraphs — WHY_INTERACTIVE must name the recurring decision the player makes and the tension that makes it interesting; HONEST_SELF_ASSESSMENT must say what you actually play-tested and what broke); optionally a `design_notebook.md`.

Deliver a complete, polished, modern game you'd actually want to play. Good luck.
