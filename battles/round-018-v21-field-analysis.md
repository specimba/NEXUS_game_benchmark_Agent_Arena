# Round 018 (v21 single-prompt field test) — deep read of log 17

**Source:** `ARENAaiAGENTandGAMEbenchNEXUSfreecreationlogs17.txt` (22 sessions, 11 battles, 11 operator comments, 12 205 lines)
**Prompt under test:** `challenge/BATTLE_PROMPT_v21.md` (pasted verbatim at the head of the log, 15.7 KB)
**Operator:** specimba · **Recorded by benchmark:** 2026-09-21
**Trigger (operator):** *"Be grounded, and let's continue with logs. 17 new reviews and examples are being created to improve our prompts and the benchmark's capabilities. For example, we can see that they do not use the engines we expected and planned — Godot or Blender — but there are still good graphical or game-mechanic approaches we need to distill to better combine with old logs and knowledge."*
**Status:** analysis complete; v22 draft produced (`challenge/BATTLE_PROMPT_v22.md`), change map in `battles/log17-v22-revision-notes.md`, approach ledger in `battles/log17-approach-distillation.md`. Nothing is promoted live until the operator verdict.

---

## 0. Session map — what actually ran

| # | Model | Game | Route actually taken | Opponent | Route | Operator verdict (log line) |
|---|---|---|---|---|---|---|
| B1 | qwen3.7-max | **The Cartographer's Ink** — sail an archipelago, coastlines ink themselves onto parchment; finite ink, ending season | Canvas-2D + 2 generated images (parchment, compass rose) | glm-5.2-max | **3D kite-duel (manja) world** — npm-3D route (`three`), procedural city, kite physics + line tension; `title.jpg` generated but **not viewable** in-session (L633) | L1537 *"qwen made nonsense game but glm-5.2 created 3d game but nothing playable at least I did not able to control it but that original 3d world approach easy win"* → **glm wins on the 3D attempt, unplayable as it was** |
| B2 | claude-opus-4-8 | **PRISMA — Light the Observatory** — mirrors + prisms route white light into colour crystals before the star dims | three.js; 1 generated nebula reference → re-authored procedurally → **file deleted** | mimo-v2.5-pro | **LUMEN** — light-trail trapping of shadow creatures, 10 levels | L2841 *"claude made good 3d puzzle game but basic 3d graphics… complete game with own mechanics; Mimo made simple 2d game cannot comprehend"* → claude wins |
| B3 | gemini-3.8-flash-low | **APEX SALVAGE // ORBITAL BREAK** — Newtonian salvage tug, plasma cutter, magnetic harpoon, re-entry decay clock | three.js, PCF shadows, ACES, tether physics | mimo-v2.5-pro | **Tunnel racer** — custom GLSL tunnel shader, centrifugal curves, boost risk-reward | L4072 *"gemini made nonsense cardboard boxes graphical 3d 0 gameplay and controls meaningfulness game again even with gemini 3.8… other side creation also not great but at least made simple 3d idea to game looking thing and it can be count as game from months older model won"* → mimo wins |
| B4 | claude-fable-5.1-high | **The Ferret of Comets — Paris, 1771** — sweep the sky for hazes; announce a comet before your rival, or lose standing claiming a nebula | three.js; shader sky dome, 45k-star point shader with real extinction, 230 real stars + constellations, 43 Messier objects; 4 viewed AI images inlined | deepseek-v4-flash-vision-exp-high | **Abyssal Breath** — free-diving relic run on one held breath, shop between dives | L4960 *"fable made very interesting original game… visuals are really okay with that intelligent approach and idea is original itself, a bit boring after couple minutes but still good base; deepseek's creation is very crippled basic version of dave the diver clone… no graphical magic"* → fable wins |
| B5 | muse-spark-1.3-max | **DEAD LISTINGS: Haunted Realty** — cast ghosts, time the scares, thrill buyers into signing | Canvas-2D manor cutaway + AI key art; 12-assertion self-test on load | deepseek-v4-flash-vision-exp-max | **KITE & INK** — dusk courier; the kite's string tension is the whole game | L6521 *"meta muse 1.3 made interesting game it can be original idea if not old 2003 creation ghost master game made that creation flawlessly 23 years ago. deepseek tried kite flying game 3d… when started game vision is bugged and cannot playable so both get marked bad, I cannot let win that shitty implementation"* → **both bad**; novelty collision named explicitly |
| B6 | qwen3.7-max | **Maison Noir — The Perfumer** — Paris 1924; read a client's half-remembered longing, blend 4 of 15 notes before the season ends | Image route (6 portraits + atelier, *"which I can see"*) + CSS/SVG flask + pure reducer | deepseek-v4-flash-vision-exp-low | **ALOFT** — a dandelion seed; wind only blows to the sea, thermals are the only way up, height = health = fuel | L7833 *"qwen made original simple text and image based game but the idea worked well, **played until end (10 minute)**, other creation is just nonsense"* → qwen wins; **the round's only comment describing a full play-through** |
| B7 | claude-opus-4-8-thinking | **Meadowfall — Herd at Dusk** — 3D sheepdog; read the flock, funnel it through the lantern gate before sunset | three.js entirely code-modelled; gradient sky shader, PCF shadows, wool emissive at dusk, no images | claude-fable-5.1-low | **BREAKBULK — Night Salvage Auction** — 12 sealed containers, 4 nights, 3 rivals with learnable tells, compounding debt | L8444 *"opus is mechanical failure when level 2 with wolf it cannot be possible to control sheeps without giving to wolf. Fable's creation is magnificent simple but working great… with couple days of work on it is ready for steam release actually. finally very good creation"* → fable wins; **round peak** |
| B8 | inkling | **TENSION SPHERE** — guide a glowing thread between nodes; speed vs energy | three.js emissive/shadows/fog + 1 AI title image | qwen3.8-27b | **TIDEGUN** — dawn coastal mortar duel across a seeded bay; wind gusts mid-flight, persistent craters, adaptive rival gunner | L9850 *"inkling tried to create something 3d but it is nonsense meaningless game. Qwen tried to made very old flash browser game like club penguin mortar game which is outdated, both marked bad"* → both bad |
| B9 | claude-opus-5-high | **GOING TWICE** — Hollowgate auction of curiosities; one purse, 4 rivals, ~1 lot in 6 is a forgery | three.js code-modelled; 70-candela spotlight, FogExp2, ACES, UnrealBloom, hand-written GLSL light shafts, **8 viewed AI lot images**, Graphics-Plain fallback | deepseek-v4-pro-low | **ZEPHYR — Balloon Courier** — you cannot steer; altitude selects the wind band | L10917 *"opus made 3d strange bidding game with no enjoyment, deepseek made shitty game 2d lazy creation, opus won easy"* → opus wins on structure, enjoyment flagged absent |
| B10 | solar-pro4 | (telescope-operations game — **log truncated**, no delivery summary; operator: *"nonsense… bullshit"*) | unknown (E1/E2/E3 undeclared — evidence gap) | muse-spark-1.3-xhigh | **TABLE FOR TROUBLE** — seat six feuding animal gourmets across three candlelit nights; hidden feuds and crushes | L11490 *"muse made static table thing game with image creations at least it is game, other nonsense model is created bullshit"* → muse wins by default |
| B11 | claude-opus-5 | **The Provenance Room** — closed-door antiquities sale; 4 viewing minutes, 45% forgeries, then the auction | three.js code-modelled artifacts (Catmull-Rom lathes, bezier extrusion, seeded-noise displacement), 512² canvas fbm albedo/roughness maps, PMREM, 2048² shadow key light with a 6° raking mode, 365 nm UV lamp; **probe executed through a build hook** | muse-spark-1.3-xhigh | **ECHO VAULT** — time-loop heist; your past runs anchor as ghosts holding doors | L12206 *"opus made very interesting bidding game with investigation sauce with 3d random created artifact mindset interest, muse also created good game mechanics and implementation but very basic 2d graphics and decreased a lot interest with that messy visuals"* → opus wins |

**Pool:** 19 distinct model identities across 22 sessions (qwen3.7-max, mimo-v2.5-pro and muse-spark-1.3-xhigh each run twice); 11 pairwise duels, each resolved by a single operator line — 9 decisive wins and **2 battles marked "both bad" (B5, B8), recorded as ties / no winner**, since the operator's own words (*"both get marked bad"*, *"both marked bad"*) establish no preference between the two deliveries. No battle needed a second comment; the pairwise contract supports ties, and these two are kept as such rather than invented into wins.

---

## 1. The headline metrics (log 17 vs logs 15 / 16)

| Axis | log15 (R016) | log16 (R017) | **log17 (R018, v21)** | Read |
|---|---|---|---|---|
| Sessions / battles | 11 / 6 | 12 / 6 | **22 / 11** | first full-size run of a single-paste prompt |
| Fire/ember/wildfire games | 6 | 4+ | **0** | **C21 soft-steer HELD** — and grid (C20), growth (C19), lighthouse (C23) are 0 too. The only fire words in the whole log are the prompt's own warning and one notebook line where an agent *rejected* the umbrella (L7105 ✕). |
| "unfinished / to infinity" complaints | 2 battles | 2 | **0** | **ship-complete rule HELD** — 21/22 sessions delivered a closed build with a delivery summary; the 22nd (B10 solar-pro4) is truncated in the log capture and counts as **unverified, not closed** (§2 C10) |
| Audio complaints | 0 | 1 (*"ear blasting"*) | **0** | audio-defaults clause held (no round-17-style blast) |
| Blender / Godot / engine tooling | 0 | 0 | **0 (third consecutive round)** | see §4 — this is a *sandbox property*, not an intent failure |
| three.js sessions | ~4 | ~4 | **11 of 22** | npm-3D is now a mainstream route, not an outlier |
| Sessions that *viewed* generated imagery | few | few | **≥9** | the image channel is the working eye for agents; one session (glm-5.2-max, B1) explicitly had generation but **no viewing** (L633) |
| Sessions that **executed** their probe | 0 | 0 | **1 of 22** (B11) | the single biggest unclaimed lever in the benchmark (§5) |
| Operator visual praise | none | none | **3 explicit** (B4 *"visuals are really okay with that intelligent approach"*; B7 *"magnificent… ready for steam release"*; B10 *"with image creations at least it is game"*) | M-1 moves for the first time in three rounds |
| "nonsense" verdicts | 4 | 3 | **5** (B1, B3, B5-other, B8, B10-other) | the reliable failure word — it means *no legible game meaning*, not "ugly" |

**What worked (the three wins that matter):**

1. **The fatigue note.** v21 named fire/grid/growth/lighthouse and the operations-crisis umbrella; the field produced **zero** of them. This is the cleanest soft-steer success since C14 held in R012 — and, per the C15 law, it relocated convergence rather than removing it (§3).
2. **Ship-complete.** Not one comment about unfinished work. Three logs ago this was the operator's dominant complaint; the loop-closure rule plus "a closed small loop beats an open big one" produced 21 closed builds — plus one session (B10) truncated in the log capture, which is recorded as unverified rather than counted — including the round's only two near-Steam verdicts (B7 winner; B11 winner).
3. **The look checklist, applied in 3D.** For the first time, the *default* for three.js sessions was real lights + soft shadows + tone mapping + fog + palette tokens. Four sessions went past C13's remedy rows (custom GLSL, custom composer, bloom with a Plain toggle, canvas-generated albedo/roughness) — see the ledger in `battles/log17-approach-distillation.md`.

**What still failed:** legibility and control in 3D (3 sessions called unplayable or meaningless), derivative concepts (3 sessions named against an existing game), and — above all — *verification*: 20 of 22 sessions shipped a self-test they never ran (one executed it — B11; the truncated B10 session left no probe evidence).

---

## 2. Your comments, one by one (comment → read → mechanism)

**C1 (L1537, B1).** *"qwen made nonsense game but glm-5.2 created 3d game but nothing playable at least I did not able to control it but that original 3d world approach easy win."*
Read: an **unplayable 3D world still beats a competently-finished 2D one for you** — ambition is priced above polish in the pairwise verdict, and the failure is *control*, not concept. Mechanism: mouse-coupled kite control, calibrated in the final edits (L1528: *"the kite must respond quickly to the mouse in minute one"*); the agent never tested it because it had no browser. This is the round's clearest case for a **control probe** (input → response reachability) and for the "verify end-to-end on a fresh load" clause being unenforceable without execution.

**C2 (L2841, B2).** *"claude made good 3d puzzle game but basic 3d graphics but still… complete game with own mechanics not big physics representation of optics. Mimo made simple 2d game cannot comprehend with other creation."*
Read: a *legendary default* — the round's first 3D puzzle game, called "good" while its 3D was "basic"; the optics were not physically simulated and you did not mind, because the loop was complete and had its own mechanics. Judge-side consequence: for this operator, **invention + closure outrank physical fidelity**; a "not-big-physics" implementation is not a defect.

**C3 (L4072, B3).** *"gemini made nonsense cardboard boxes graphical 3d 0 gameplay and controls meaningfulness game again even with gemini 3.8… simple 3d idea… can be count as game from months older model won."*
Read: two separate failures in one battle. Gemini's is the classic **ambition-theater** signature (3D present, gameplay and controls meaningless); mimo's tunnel racer is thin but *legible*, and legibility wins. Note the operator's framing — the "months older model" winning is treated as evidence, not surprise.

**C4 (L4960, B4).** *"fable made very interesting original game with not even created 3d things but visuals are really okay with that intelligent approach and idea is original itself, game a bit boring after couple minutes but still good base, deepseek's creation is very crippled basic version of dave the diver clone."*
Read: your first *"visuals are really okay"* of the last three logs — earned not by 3D (the sky/islands are 3D but the strength is *data and restraint*: real star catalogue, real extinction, white-keyed generated silhouettes) but by **an intelligent approach**. And the round's cleanest derivative verdict: a clone that keeps the theme and drops the systems ("only diver and equipment purchase part") reads worse than an original that is slightly boring.

**C5 (L6521, B5).** *"meta muse 1.3 made interesting game… if not old 2003 creation ghost master game made that creation flawlessly 23 years ago. deepseek tried kite flying game 3d… game vision is bugged and cannot playable so both get marked bad, I cannot let win that shitty implementation."*
Read: (a) **novelty is now scored against the video-game canon**, not only against our own registry — a 2003 RTS did the haunted-realty idea "flawlessly", so an interesting original-looking game can still lose. (b) A *vision bug* (camera/framing) is indistinguishable from an unplayable game to a player, and it is invisible to a blind author. (c) Explicit: an implementation you consider shitty must not win by default.

**C6 (L7833, B6).** *"qwen made original simple text and image based game but the idea worked well, played until end (10 minute), other creation is just nonsense."*
Read: the round's most valuable single data point for the benchmark. A **text + generated portraits + SVG flask** game — no 3D, no shader, no engine — produced the only run you *finished*. The winning ingredients are legibility, a solvable puzzle of reading a person, and 7 viewed paintings carrying identity. Nothing about it needed Blender.

**C7 (L8444, B7).** *"both great ideas we saw before… opus is mechanical failure when level 2 with wolf… Fable's creation is magnificent simple but working great with couple days of work on it is ready for steam release actually. finally very good creation."*
Read: the round's peak, and both halves are instructive. Opus's failure is a **new defect class**: the probe-able claim "win reachable" was true for the naive autopilot, yet *level 2* was unwinnable for a human once the wolf arrived — reachability must be asserted **per level**, not once. Fable's win is the benchmark's thesis stated by the operator: *simple, complete, working, verified by a probe the author actually designed* (40 seeds, win/fail reachability, determinism).

**C8 (L9850, B8).** *"inkling tried to create something 3d but it is nonsense meaningless game. Qwen tried to made very old flash browser game like club penguin mortar game which is outdated, both marked bad."*
Read: 3D alone does not buy anything — *meaningless* is the verdict when the sphere/thread/nodes have no comprehensible goal. And the second half is a **form-era** verdict: a competent canvas ballistics duel with an adaptive AI rival was dismissed as a 2010s flash game. The benchmark's M-1 ("looks like 2026, not 2013") has a second edge: *plays like 2013* also fails.

**C9 (L10917, B9).** *"opus made 3d strange bidding game with no enjoyment, deepseek made shitty game 2d lazy creation, opus won easy."*
Read: the round's first *enjoyment* complaint against an opus auction game — the mechanics were real (bid ladder, reserves, hammer window, four readable rivals) but you felt no pleasure in them. Compare C11: the *same genre* one battle later, with an **investigation layer** (rotate, rake the lamp, UV, loupe, log marks) earned *"very interesting… mindset interest"*. The difference between the two Claude auction games is agency in the inspection phase.

**C10 (L11490, B10).** *"muse made static table thing game with image creations at least it is game, other nonsense model is created bullshit."*
Read: "static table thing" is not praise, but the paintings and the social-deduction loop made it count as a game; solar-pro4's session is **truncated in the log** (ends on `Show More`, L11106) with no delivery summary — the first evidence gap of its kind. Note for ops: a session without a captured final summary cannot be diagnosed; only the verdict survives.

**C11 (L12206, B11).** *"opus made very interesting bidding game with investigation sauce with 3d random created artifact mindset interest, muse also created good game mechanics and implementation but very basic 2d graphics and decreased a lot interest with that messy visuals."*
Read: the round's best-received game is **code-modelled 3D with zero external art** — procedural artifacts, canvas-generated material maps, a real inspection loop — plus an executed probe. Muse's time-loop heist was mechanically praised ("good game mechanics and implementation") and lost on *visual interest*: "very basic 2d graphics… messy visuals". Two lessons: (a) 2D can win (B6, B7) but only with a deliberate look, not a default one; (b) the visual verdict is now deciding close pairs.

---

## 3. Convergence — what the field's prior did this round

**3.1 The steered families went to zero; a new one arrived (C24).**

**Single-axis air/wind negotiation** — 4 sessions, 4 distinct model identities (three of them the deepseek family), 4 different battles, no prompt vocabulary anywhere:

| Session | Game | The one axis |
|---|---|---|
| B1 glm-5.2-max | 3D kite duel (manja) | line tension |
| B5 deepseek-v4-flash-vision-exp-max | KITE & INK courier | hold/release string tension ("the whole game is one negotiated resource — tension") |
| B6 deepseek-v4-flash-vision-exp-low | ALOFT dandelion seed | glide attitude; height is health and fuel; wind is one-way |
| B9 deepseek-v4-pro-low | ZEPHYR balloon courier | altitude selects the wind band; you cannot steer |

Adjacent: qwen3.8-27b's TIDEGUN (mortar duel where mid-flight wind gusts decide the outcome) and solar-pro4's telescope drift-chasing. **Three of the four came from the deepseek family** — the per-family attractor pattern (opus5-max/glass, muse/fire) now has a third instance. Registered as **C24** in `benchmark/06` §6.5.

**3.2 The valuation cluster (C25).** Three sessions in three battles: fable-5.1-low's container auction (B7 winner), opus-5-high's curiosities auction (B9 winner), opus-5's antiquities sale (B11 winner). Two of the three are the **opus-5 line**, i.e. the same per-family signature as opus5-max's glassblowing — a model pet concept, not a prompt artefact. Registered as **C25**.

**3.3 Flock funnelling (watch item — provisional, unnumbered).** log16's grok-4.6 sheep idea (broken, sheep invisible) and log17's opus-4-8-thinking Meadowfall are the same concept two rounds apart. Cross-round and below the two-model-same-round registration bar, so it stays an **unnumbered watch item** (no C-identifier) until a qualifying same-round observation appears — logged provisionally, to be watched in R019.

**3.4 Recurrences.** C10 (sci-fi optics/spectrum puzzle, Round 002) returned as PRISMA — the first return of a Round-002 cluster. C11 ("novel-verb + procedural canvas + WebAudio, no assets") is no longer a *cluster*, it is the **default execution mode** for 2D sessions (8 of 22) — with one new twist that the operator rates above pure C11: a generated key-art layer under procedural gameplay (B6 *played to the end*, B10 *"at least it is game"*). C13 (retro visuals) still lands in 3 sessions (gemini's cardboard boxes, mimo's LUMEN, muse's "messy visuals").

**3.5 The light motif.** Light remains the field's favourite *material* — beams (PRISMA), glowing trails (LUMEN, inkling), lamps and candlelight (B9, B10), sun glint and dusk (B7, B8) — but **light-as-resource (C23) is absent** for the first time since it was registered. The prior keeps the aesthetic, drops the resource.

---

## 4. The engine question — measured, answered

**Measured facts from log 17 (all 22 sessions, whole-file scan):**

| Lever | Sessions | Evidence |
|---|---|---|
| Blender / `bpy` / any headless 3D toolchain | **0** | three consecutive rounds at zero; every session that mentions Blender states it is unreachable: *"ENV = E2 (package-manager only; no shell/pip/Blender)"* (B5), *"No Blender available (would require arbitrary shell / E1)"* (B8), *"no shell, so no Blender"* (B9) |
| Godot | **0** | the word does not appear once in 12 205 lines |
| Unity | **0** | (only false positives from "opportunity") |
| Babylon.js / Phaser / PixiJS / PlayCanvas | **0** | the npm-3D choice is a *monoculture*: `three` |
| Physics engines (rapier / cannon-es / ammo) | **0** | all physics is hand-rolled: verlet tails, boids flocks, ballistic solvers, tether springs |
| `three` (three.js) | **11 of 22** | B1 glm, B2 opus-4-8, B3 gemini, B3 mimo, B4 fable-high, B5 deepseek-max, B7 opus-thinking, B7 fable-low, B8 inkling, B9 opus-5-high, B11 opus-5 |
| Canvas-2D / DOM-2D + WebAudio | **9 of 22** (2 unclassified: one truncated session, one hybrid text+CSS) | B1 qwen, B2 mimo, B4 deepseek-high, B5 muse, B6 qwen, B6 deepseek-low, B8 qwen3.8, B10 muse, B11 muse |
| Image generation | **15 of 22 sessions** — 48 distinct assets (50 generation events incl. 2 regenerations), 46 shipped | full receipt table in `battles/log17-approach-distillation.md` §A0 |
| Image *viewing* (the agent's eye) | **≥9 of 22** | B4 fable-high *"I can see these"*; B5 deepseek-max *"I can view images in this environment"*; B6 qwen *"which I can see"*; B7 fable-low *"look at the generated images"*; B8 qwen3.8 *"inspect the generated art (my visual eyes)"*; B9 opus-5-high *"I looked at every render"*; B10 muse *"7 viewed AI paintings"*; B11 muse *"generated art was viewed"*; B2 opus-4-8 *"looked at it, then re-authored it"*. B1 glm had generation with **no viewing** (L633). |
| Environment class declared | **20 E2, 1 E3, 1 undeclared** | 0 E1 — the Blender route in v21 §1 was written for a class no battle agent occupies (third confirmation after logs 15/16) |

**Conclusion — the engine we "planned" does not exist in the battle class, and the substitute is now proven.** The working definition of "engine" for R018 is:

> `three` (npm) + **code-modelled geometry** (lathes, extrusions, parametric primitives, seeded-noise displacement) + **canvas-generated material maps** + hand-written GLSL for the one effect that matters + hand-rolled physics + the **image channel** for authored identity — verified by a **probe that the build step executes**.

That is a complete replacement for what Blender (mesh/texture authoring) and Godot (scene graph + physics + editor) were supposed to provide. No single session demonstrated every piece: the components were proven **across separate sessions** — B11 opus-5 demonstrated code-modelled geometry + canvas material maps + the executed probe (with zero generated art), B9 opus-5-high and B4 fable-high demonstrated the full generated-art pipeline (with no executed probe; B9's was written but unrun), and B7 fable-low demonstrated the asset half of the route.

**Two operator decisions this analysis puts on the table (not shipped, drafts only):**

- **D1 — keep the prompt honest about the engine class** (done in v22 §1): Blender demoted to a one-line E1 note; npm-3D expanded into the tested recipe set; no mention of Godot at all, since no battle sandbox can run it and naming a dead option costs concept space.
- **D2 — put the *verification* tool in the workspace, not only in the prompt.** The one thing that measurably raised quality this round was executing the probe; the harness that makes it possible is now verified and committed at `repo-ops/sandbox-tools/e2-probe-harness/` (self-test green). Shipping it into each battle workspace as `scripts/run-probe.mjs` + `"probe": "node scripts/run-probe.mjs"` costs the agent nothing to read and unlocks execution in every E2 session. *This is a scaffold change and needs your approval.* An optional D2b — pre-installing one alternative engine (e.g. a 2D engine or a physics package) to break the `three` monoculture — is possible but carries the C15 attractor cost; recommend holding it until engine diversity is actually a goal.

---

## 5. Verification ledger — 20 of 22 probes never ran

| Session | Probe written | Probe executed | What the agent said |
|---|---|---|---|
| B1 qwen, B1 glm, B2 opus-4-8, B2 mimo, B3 gemini, B3 mimo, B4 fable-high, B4 deepseek-high, B5 muse, B5 deepseek-max, B6 qwen, B6 deepseek-low, B7 opus-thinking, B7 fable-low, B8 inkling, B8 qwen3.8, B9 opus-5-high, B9 deepseek-pro, B10 muse, B11 muse | yes (all 20 summary-carrying sessions shipped one) | **no** | variations on *"I could not execute the probe"* — B4 fable-high: *"I could not execute it here, so I do not claim its result"*; B6 deepseek-low: *"no shell → no Blender; no browser → I could not visually play"*; B8 qwen3.8: *"This sandbox has no browser and no node runner"* |
| **B11 opus-5** | yes | **yes** — temporary `postcss.config.mjs` hook → esbuild-bundled `src/game/probe.ts` → **executed inside `vite build`** | *"The probe works — and it says the game is currently too tight to win (1/24). Tuning the rival economics."* (L11640) → after the fix, *"It caught a genuine balance bug (omniscient rivals → 1/24 win rate)"* (L11843) |

Two facts make this the round's most actionable finding. First, this session's game is the operator's most enthusiastic verdict of the log. Second, the *failure other sessions shipped blind* is exactly the class the probe catches: B7's unwinnable level 2, B1's uncontrollable kite, B5's broken camera — all invisible to an author without execution and all instantly visible to a player.

Honest bounds: one observation is not proof of causation, and B11's agent was also the most conservative scripter in the pool. But the asymmetry is stark enough to change the prompt: **v22 makes "if `npm` runs at all, the build step can run your sim" a first-class route, and demotes an unexecuted probe from "evidence" to "claim".**

---

## 6. New defect classes for the taxonomy

| Class | Trigger (log 17) | Judge-side handling |
|---|---|---|
| **CONTROL-LEGIBILITY** (3D) | glm-5.2-max's kite (uncontrollable mouse coupling), deepseek-max's kite ("vision is bugged"), gemini's salvage (controls meaningless) | Severity Major→Blocker per §4.1; record camera framing, near-plane clipping, and input→response mapping explicitly; a 3D build that was never render-verified by its author is presumptively at risk |
| **LEVEL-N-SOLVABILITY** | opus-4-8-thinking's Meadowfall: level 2 unwinnable once the wolf exists (L8444) | Extends CEIL-5's "early level-2/3 cliff" with a *proof obligation*: reachability must be asserted per level in the probe, or the level is unverified |
| **NOVELTY-COLLISION** | 3 deliveries named against existing games — *Ghost Master* (2003, muse B5), *Club Penguin*-era mortar flash game (qwen3.8 B8), *Dave the Diver* clone (deepseek B4) | The registry's CLICHÉ-CLUSTER row is no longer only about *our* rounds: an idea a shipped commercial game already executes better receives the §2.7 soft-note treatment (V0/V1 4–5 require explicit evidence the delivery transforms beyond the named reference), recorded with the named reference |
| **EVIDENCE-GAP (ops)** | solar-pro4's session truncated (L11106 `Show More`) — verdict without artifact | Round hygiene: the log capture must retain the delivery summary; a truncated session cannot be scored beyond the operator's line, and the failure cannot be diagnosed |

---

## 7. What v22 changes (summary — full map in `battles/log17-v22-revision-notes.md`)

1. **§1 capability rewrite:** E1/Blender compressed to one honest line; npm-3D becomes the headline route with the R018-proven recipe list; **the probe-execution route added** (three tiers: shell → npm build hook → ship-and-disclose), with the E2 harness referenced as the ready-made tool.
2. **§2 look upgrade:** the anti-cardboard checklist keeps its rows and gains the *tested* ingredient vocabulary from the praised builds (one motivated key light; canvas-generated material maps; instancing for population; fog; bloom with a try/catch Plain fallback; painter's-stack layering for 2D; generated art inlined and inspected).
3. **§3 premise note:** adds this round's repeat families (kite/wind single-axis flight, auction/valuation, flock funnelling) to the existing list, and adds a **"does this game already exist?"** line — checking the concept against shipped games, not just against our rounds.
4. **§4 engineering:** invariants unchanged; the probe section is rewritten around execution and per-level reachability; the "claim vs evidence" distinction is stated as an honesty rule.
5. **§5 hard rules:** control-legibility clause (camera/framing/input verified or explicitly disclosed blind), novelty clause referencing canon, and the README honesty line now requires the probe's *actual output* when it ran.
6. Kept from v21 because log 17 validated them: the fatigue note, fun-as-minutes, ship-complete, the ENV line, receipts, and the blind-visuals honesty protocol.

---

## 8. Evidence index (for the next analyst)

- Prompt in test: L1–87. Battles begin at L89; separators at L1539, 2843, 4074, 4962, 6523, 7835, 8446, 9852, 10919, 11492.
- Operator comments: L1537, L2841, L4072, L4960, L6521, L7833, L8444, L9850, L10917, L11490, L12206.
- The executed probe: L11638–11644 (creation), L11640 (result), L11843 (summary), L11827 (hook removed, CSS hash unchanged).
- Environment statements: L588 (glm E2 + image route), L633 (glm: generation without viewing), L4158/4522 (fable-high), L4952 (deepseek-high), L5450/6424 (deepseek-max), L6607/7005 (qwen B6), L7099/7824 (deepseek-low), L7961/8087 (opus-thinking), L8435/8439 (fable-low), L9189 (inkling), L9279/9846 (qwen3.8), L9897/10501 (opus-5-high), L10600/10913 (deepseek-pro), L11486 (muse B10), L11576/11843 (opus-5), L12202 (muse B11).
- Truncation: L11106 (`Show More`, solar-pro4).
