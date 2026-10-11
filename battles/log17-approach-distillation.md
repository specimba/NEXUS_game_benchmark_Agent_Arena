# Log 17 approach ledger — what to distill (graphics · mechanics · verification)

**Source:** `../logs/game-log-17.txt` (R018, v21, 22 sessions / 11 battles).
**Purpose:** the benchmark's prompt revisions have always been comment-driven; this round the operator asked for the *other* half — **distill the approaches that actually produced good-looking or well-playing results so they can be combined with the old log knowledge** (`battles/round-015…`, `benchmark/prompt-lineage-deep-analysis.md`, `benchmark/19-prompt-merge-blueprint.md`, registry C11–C23).
**Rule of the ledger:** every card is anchored to a session, a quoted artifact line, and the operator's verdict on it. No card is invented from taste. Cards marked **[embed]** went into `challenge/BATTLE_PROMPT_v22.md`; **[repo]** are for benchmark-side assets; **[watch]** are held.

The verdict scale used below is the operator's own vocabulary in this log: *nonsense · not great but counts as a game · okay/looks fine · magnificent/very interesting*.

---

## Part A — Graphics ledger (what made a build look like something)

### A0. The measured route reality (context for every card)

| Route | Sessions | Operator verdicts on it |
|---|---|---|
| `three` npm-3D, code-modelled | 11 | B9 *"3d strange bidding game"*, B11 *"3d random created artifact mindset interest"* (winner), B2 *"good 3d puzzle game… basic 3d graphics"*, B3 gemini *"nonsense cardboard boxes graphical 3d"* (loser) |
| Canvas-2D / DOM-2D + procedural | 9 | B6 *"played until end (10 minute)"* (winner), B8 qwen3.8 *"very old flash browser game… outdated"* (loser) |
| Generated imagery (any route) | 15 of 22 sessions, **48 distinct assets (50 generation events incl. 2 regenerations)** | B7 *"magnificent"* (winner, 6 assets), B6 *"idea worked well"* (winner, 7 assets), B10 *"with image creations at least it is game"*, B11 muse *"very basic 2d graphics… messy visuals"* (loser despite 2 assets) |
| Blender / Godot / Babylon / Phaser / physics engines | 0 | — |

Exact asset receipts (log lines in parentheses; a session's assets are inlined into the single-file build unless noted):

| Session | Assets | Note |
|---|---|---|
| B1 qwen3.7-max | 2 — `parchment.jpg`, `compass.png` (L135, L183) | the rest procedural |
| B1 glm-5.2-max | 2 — `title.jpg`, `night.jpg` (L835, L837); an earlier `public/art/title.jpg` (L593) deleted | **generated but not viewable** in that session (L633) |
| B2 claude-opus-4-8 | 1 — `nebula.jpg` (L1874) | used as reference, re-authored procedurally, file deleted (L2134) |
| B3 gemini-3.8-flash-low | 2 — `orbital_salvage_bg.jpg`, `contractor_badge.jpg` (L2922, L2924) | did not rescue the build |
| B4 claude-fable-5.1-high | 4 — `keyart`, `horizon`, `milkyway`, `parchment` (L4163–4169) | all inspected; silhouette white-keyed to alpha for the 3D wrap |
| B5 muse-spark-1.3-max | 1 — `keyart.jpg` (L5051) | over a procedural canvas manor |
| B5 deepseek-…-exp-max | 1 — `keyart.png` (L5462) | 3D night city otherwise procedural |
| B6 qwen3.7-max | 7 — 6 portraits + `atelier.jpg` (L6626–6638) | the round's only completed play-through |
| B6 deepseek-…-exp-low | 1 — `hero.png` (L7114) | over a layered canvas painter |
| B7 claude-fable-5.1-low | 6 — `keyart`, `corrugated`, `concrete`, 3 rival portraits (L8171–8181) | textures *and* faces; the round peak |
| B8 inkling | 1 — `title-bg.jpg` (L8533) | abstract 3D otherwise |
| B8 qwen3.8-27b | 2 — `keyart.jpg`, `sky.jpg` (L9288, L9290) | + fonts inlined |
| B9 claude-opus-5-high | 8 lots + 2 regenerated (L9944–9998, L10393, L10437) | "Lot 237" placards caught by inspecting every render |
| B10 muse-spark-1.3-xhigh | 7 — `hall-bg` + 6 guests (L11196–11208) | the identity carrier for a canvas game |
| B11 muse-spark-1.3-xhigh | 2 — `keyart.jpg`, `vault.jpg` (L11931, L11973) | 3D cut for reliability, art kept |
| B11 claude-opus-5 | **0** | pure code-modelled 3D — the round's best-received game |

### A1. **[embed] Code-modelled props instead of downloaded meshes** — B11 claude-opus-5
> *"every artifact is modelled in code — Catmull-Rom lathes for the amphora, ushabti and bronze votary, a bezier-silhouette extrusion for the Cycladic idol, a pillowed box tablet, a struck flan with relief for the denarius — merged and displaced by seeded noise"* (L11841)

Verdict: *"very interesting… 3d random created artifact mindset interest"*. This is the **Blender substitute**: parametric geometry + seeded noise gives per-item uniqueness, which the operator read as "random created artifact" — i.e. authored-looking variety with zero asset pipeline. Old-log link: answers the R005/R009 C16 craft-appetite without a toolchain.

### A2. **[embed] Canvas-generated material maps + PMREM environment** — B11 claude-opus-5
> *"512² canvas fbm albedo/roughness maps per material class, PMREM environment reflections, a 2048² shadow-casting key light that physically swings to a 6° grazing angle in raking mode, a violet 365 nm lamp for UV"* (L11841)

The texture step of the Blender pipeline is replaced by painting noise maps into an offscreen canvas at load. The *gameplay* then uses those materials as mechanics (raking light reveals a forged surface). Old-log link: this is the R012 "materials+light teaching" reaching its logical end — the material *is* the mechanic.

### A3. **[embed] One motivated key light, with a story** — B9 opus-5-high, B7 fable-low, B7 opus-thinking, B5 deepseek-max
- B9: *"One warm 70-candela spotlight with soft shadows, FogExp2, a cool rim from behind, ACES tone mapping, UnrealBloom on genuinely emissive lamps, a hand-written GLSL light-shaft shader"* (L10498)
- B7 fable-low: *"shadow-casting sodium spotlight, PBR corrugated-steel container built to ISO 20ft dimensions, wet-concrete ground, exp fog, rain, hinged doors"* (L8435)
- B7 opus-thinking: *"one warm directional sun with soft PCF shadows that descends and reddens as daylight drains… wool self-illuminates at dusk; panicked sheep flush warm-red"* (L8079)
- B5 deepseek-max: *"low amber sun with PCF soft shadows that follow the action"* (L6509)

Rule distilled: **light = one source + one direction + a reason to change over time.** Every "not cardboard" verdict in this log has exactly this shape; the cardboard verdicts (gemini B3, muse B11) have none of it.

### A4. **[embed] Hand-written GLSL for the one effect that matters** — B3 mimo, B9 opus-5-high
mimo's tunnel: *"Custom GLSL tunnel shader — animated glow lines that intensify with speed, boost flare effect"* (L4052); opus-5-high's shafts (above). Verdict impact: mimo's thin racer beat gemini's 3D because it was *legible*; the shader is what made it legible. Old-log link: satisfies C13's remedy row "custom shader" without a post-processing stack.

### A5. **[embed] Hand-rolled composer over `three/examples` addons** — B5 deepseek-max
> *"bloom post-processing (custom composer — safer than `three/examples` for the single-file build)"* (L6426) — plus *"~480 procedural buildings with instanced glowing windows, fog-matched sky dome… plus a hand-written bloom/vignette/… "* (L6509)

Single-file bundles (`vite-plugin-singlefile`) break on addon imports; the winning pattern is a ~60-line composer. The *kite* build then failed on a camera bug (L6521) — the graphics recipe was right, the control calibration was not.

### A6. **[embed] Post-processing behind a guard, with a Plain toggle** — B9 opus-5-high
> *"The post-processing chain is wrapped in try/catch with a Graphics: Plain toggle on the title and pause screens, so the clean fallback is always one click away."* (L10505)

Also B11 opus-5: *"Adding a WebGL failure guard so a context error can never produce a blank screen"* (L11801); B7 fable-low: *"WebGL-failure fallback keeps the game playable"* (L8437). This is how an ambitious rendering path survives a blind author — hard rule 1 (no blank screen) becomes an engineering guarantee instead of a hope.

### A7. **[embed] The 2D painter's stack, named in order** — B6 deepseek-v4-flash-vision-exp-low (ALOFT)
> *"layered sky → sun + god rays → clouds → two parallax ridge planes → sea + sun-glitter → thermal wisps → terrain → shelf rock → grove glow → the seed (with a pappus that droops as plumage is lost) → particles, plus a vignette and a ground-shadow depth cue"* (L7821)

The most complete 2D look recipe in any log: it produces depth without 3D, and the operator never called this one cardboard ("other creation is just nonsense" refers to the *opponent*, L7833). Sibling: B4 deepseek-high's *"real light pools (additive glow), god rays, two-layer parallax trench, rim-lit diver with squash/stretch… bubbles, fog, vignette, screen shake"* (L4945) — that one lost on *derivative* concept, not on look.

### A8. **[embed] Cinematic-grade discipline over novelty of technique** — B3 mimo, B2 opus-4-8
B3: *"ACES Filmic tonemapping for cinematic highlights"* + 5 explicit tokens (L4058–4061). B2 opus-4-8: *"warm key light + cool rim + a dimming central point-light, PCF soft shadows, ACES tonemapping, physical transmission/IOR glass prisms"* (L2129). The operator's read on B2 was *"basic 3d graphics but… complete game"* — i.e. correct technique is the floor, not the win.

### A9. **[embed] Real data as a look** — B4 claude-fable-5.1-high
> *"a 45k-star point shader with real extinction, 230 real stars + constellation lines from real positions, 43 real Messier objects, Milky Way band rotated into the galactic frame, comets with anti-sunward tails. Four AI-generated images (key art, rooftop silhouette white-keyed to alpha and mirrored around a cylinder, Milky Way band, parchment), all inspected before use."* (L4518)

Verdict: *"very interesting original game… visuals are really okay with that intelligent approach"* (L4960). Two transferable ideas: (a) catalogue data makes a sky feel like a sky; (b) a generated silhouette white-keyed to alpha and wrapped around a cylinder is the cheapest bridge from 2D art into a 3D scene.

### A10. **[embed] Image route QA: generate → look → regenerate, and check the text in the art** — B9 opus-5-high, B4 fable-high, B6 qwen, B7 fable-low, B8 qwen3.8, B10 muse, B11 muse
> *"The codex image baked in a caption plaque reading 'Lot 237', which would contradict the in-game lot number. Regenerating it."* … *"Two generated images had baked-in 'Lot 237' placards that would have contradicted the in-game lot numbers — I looked at every render and regenerated both."* (L10390, L10504)

The eye channel's whole value is that the agent can *reject its own asset*. Rules distilled: small asset counts (1–8 per game), one identity carrier (portraits / lots / key art), inline as data URIs, and always inspect for embedded text/numbers that contradict game state.

### A11. **[embed] Reference-then-re-author** — B2 claude-opus-4-8
> *"Generated one nebula reference image, looked at it, then re-authored it procedurally in code and deleted the file so the final build is 100% bundled"* (L2134)

A clean way to use the image channel when the game must stay fully procedural: use it as an eye and a target, ship no file. Pairs with A2 (canvas maps) as the "no-asset 3D" stack.

### A12. **[embed] Instancing / population** — B5 deepseek-max
> *"~480 procedural buildings with instanced glowing windows"* (L6509). Population is what makes a procedural city read as a city; it is also the cheapest performance win available in `three`. Old-log link: R012's "significant leap" builds all had population (trees, crowds, props).

### A13. **[embed] Palette tokens + everything inlined (fonts, images)** — B8 qwen3.8, B4 fable-high, B9 opus-5-high, B5 deepseek-high
qwen3.8: *"procedural world built on the same 5-token palette (deep teal, rock, brass, hit-coral, bone) with rim light, mist depth, sun glint, trails, particles"* + *"Fonts are inlined… Everything is self-contained"* (L9839, L9830). deepseek-high: *"disciplined palette (deep navy + cyan bioluminescence + gold relics + coral danger + pearl neutrals), reused across every screen and the HUD"* (L4949). This is the one v21 checklist row that was universally obeyed — keep it.

### A14. **[embed] Motion-juice inventory the operator reads as "modern"** — across B5, B7, B9, B11, B4
Observed and praised: god rays, additive glowing ribbons that brighten with state (kite strings), dust motes, drifting chimneys, wind streaks, birds, screen shake, squash/stretch, steam, candle flicker, mood rings (B10), particle pools. None of it is expensive; all of it is what distinguishes "2026" from "2013" in the operator's eye.

### A15. **[watch] Blind-by-construction is still the fallback, and it is honest** — B6 deepseek-low, B9 deepseek-pro, B11 muse
> *"world/HUD visuals are 'blind by construction' (strong silhouettes, explicit palette tokens, real glow)… I disclose plainly"* (L7824). The 2D builds that disclose blind visuals were *not* punished for it; the builds that broke (camera bugs, cardboard 3D) were not disclosing, they were guessing.

---

## Part B — Mechanics ledger (what made a build play well)

### B1. **[embed] Simulate the rival as a learning opponent, not a script** — B8 qwen3.8-27b (TIDEGUN)
> *"a closed-form ballistic solver that reads the wind at reduced accuracy per difficulty (Cadet / Gunner / Admiral) and keeps a persistent error vector corrected from its own impacts — it converges like a real gunner, which is the clock."* (L9838)

The game lost on form-era ("club penguin mortar", L9850) but the rival design is the most sophisticated opponent AI in any NEXUS log — it makes difficulty *emergent* and gives the player a clock made of skill. Old-log link: R012 praised opus-4.6's IMPACT as the first opponent AI; this is the pattern's second generation.

### B2. **[embed] Rivals with learnable tells = progression without content** — B7 fable-low (BREAKBULK), B9 opus-5-high (GOING TWICE)
BREAKBULK: *"three rivals with learnable tells (Cutter overpays on electronics, Marisol never overpays but is always right, Deacon bids on instinct)"* (L8433). GOING TWICE: *"Four rivals with readable personalities — Cormac Vane never blinks and chases bronzes; Mrs Pike folds if you raise your voice… Learning them is the progression."* (L10494)

This is *why* B7 was called Steam-ready: the game's content is the other agents' behaviour, so a small build plays long.

### B3. **[embed] One resource that is health, fuel and position at once** — B5/B6 kite tension, B6 ALOFT altitude, B11 auction purse
KITE & INK: *"the whole game is one negotiated resource — tension"* (L6505). ALOFT: *"height is simultaneously your health and your fuel"* (L7813). Provenance Room: *"one shared pool of four viewing minutes"* (L11837). Verdict correlation: the two games the operator either finished or called "very interesting" both have a single master resource that every decision spends.

### B4. **[embed] Hidden information with irreversible moves** — B11 opus-5, B10 muse, B7 fable-low
*"Roughly 45% of the objects are modern forgeries — your only edge is looking harder than the room does"* (L11837); muse: *"seating is spatial social deduction under hidden info with irreversible moves — you must probe, commit, and live with the gasps"* (L11483). Old-log link: v16's "tradeoff you can feel" upgraded to *commitment* — the operator's most enthusiastic lines this round are about decisions that cannot be taken back.

### B5. **[embed] The investigation layer is what separates two otherwise identical genres** — compare B9 *"no enjoyment"* (L10917) with B11 *"very interesting… investigation sauce"* (L12206)
Both are opus auction games. The difference: B11 lets the player *rotate, rake the lamp, switch to UV, use the 10× loupe, click and log marks* before bidding. Verdict: form alone is not enough; the player must have a physical verb in the hidden-information phase.

### B6. **[embed] Level-N solvability is part of the design, not QA** — B7 opus-thinking Meadowfall
*"mechanical failure when level 2 with wolf it cannot be possible to control sheeps without giving to wolf"* (L8444). The author's probe asserted win-reachability for the *final* state and missed a mid-ramp wall. Rule distilled: every level must be asserted reachable by a policy that uses only the mechanics unlocked at that level.

### B7. **[embed] The clock can be the rival, not a timer** — B8 TIDEGUN (gunner convergence), B11 (four-second hammer window that resets on every bid), B6 qwen (the season ends)
*"the hammer falls four seconds after the last bid"* (L10493). Time pressure that responds to the player's actions reads as drama; a fixed timer reads as a treadmill.

### B8. **[embed] A settlement ledger as the ending** — B9 opus-5-high
> *"a settlement ledger that reveals what everything was actually worth, what your clients paid or fined you, and whether you out-traded every dealer in the room"* (L10496). Real endings that *reveal hidden truth* were praised in three separate games (B7 debt cleared / B11 provenance verdicts / B9 ledger). "The run ends" is not only a completeness rule, it is where the payoff lives.

### B9. **[embed] Minute-one legibility stated as a sensory beat** — B6 qwen, B1 qwen, B10 muse
qwen: *"Minute one: first bottle clinks, color swirls, brief reads like a small mystery"* (L6991); *"within ~2 seconds the starter island's coastline begins bleeding onto the chart in sepia ink (no tutorial, no failure possible)"* (L488). Even the rejected B1 build understood the rule. The operator's play-through happened in the game whose minute one was a *readable mystery*.

### B10. **[embed] Written self-audit that finds real balance bugs** — B5 muse, B9 opus-5-high, B7 fable-low
B5: *"my math review found fleeing was nearly unreachable (sale-first ordering + decay tuning) — fixed with fright-preempts-thrill ordering and a full retune"* (L5365). B9: *"I rebalanced the economy by hand after deriving that my first pass made rivals so rich a careful player would have won nothing all night"* (L10503). B5 deepseek-max's code audit: *"caught and fixed nine real defects (missing main-pass render, double-transforms on world-space meshes, event-id reset, scene.background repaint, shadow-camera projection, light-side mismatch…)"* (L6424). Static audit is a real, cheap substitute for playtesting — and it caught bugs the probes would not.

### B11. **[embed] Time-loop self-cooperation** — B11 muse (ECHO VAULT)
*"press E to anchor — that run becomes a looping ghost that holds the door while your next self pushes deeper"* (L12196). The operator explicitly credited the mechanics ("muse also created good game mechanics and implementation", L12206) while the visuals cost it the battle. Preserve as a mechanic pattern that survives a visual failure.

### B12. **[embed] Difficulty menu = accuracy of an information channel** — B8 TIDEGUN (*Cadet/Gunner/Admiral* = how accurately the rival reads the wind). A difficulty setting that changes *what an opponent knows* instead of its stats is a one-line design change that reads as intelligence.

---

## Part C — Anti-pattern ledger (what produced the five "nonsense" verdicts)

| # | Anti-pattern | Session | Operator's words | What v22 does about it |
|---|---|---|---|---|
| C1 | **3D with no legible goal** (abstract sphere, thread, nodes) | B8 inkling | *"3d but it is nonsense meaningless game"* | §4 requires the player's sentence to name a goal in the same sentence as the mechanic; §5 hard rule 3 ("if a random clicker reaches the end unchanged, it isn't a game") is kept and sharpened |
| C2 | **Cardboard 3D** — geometry present, materials/lighting meaningless | B3 gemini | *"nonsense cardboard boxes graphical 3d 0 gameplay and controls meaningfulness"* | §2 checklist already existed and this session ignored it; v22 adds the *failure signature* explicitly ("if your 3D could be described as coloured boxes with no light story, it is not finished") |
| C3 | **Control failure in 3D** (mouse-coupled flight never calibrated) | B1 glm, B5 deepseek-max | *"nothing playable… I did not able to control it"* / *"game vision is bugged and cannot playable"* | §5 new clause: control + camera verified by a probe or explicitly disclosed as unseen; first-minute input calibration named |
| C4 | **Derivative minus its systems** (a clone that keeps the theme, drops the systems) | B4 deepseek-high | *"very crippled basic version of dave the diver clone… only diver and equipment purchase part"* | §3 "does this game already exist?" now names the *systems test*, not just the theme |
| C5 | **Form-era failure** — competent but reads as a 2010s flash game / 2003 RTS | B8 qwen3.8, B5 muse | *"very old flash browser game… outdated"*, *"old 2003 creation ghost master game made that creation flawlessly 23 years ago"* | §3 novelty line + judge-side NOVELTY-COLLISION defect class |
| C6 | **Genre without a verb in its weak phase** (auction with no inspection) | B9 opus-5-high | *"3d strange bidding game with no enjoyment"* | §3's "the recurring decision" must exist in *every phase* of the loop, not only in the core phase |
| C7 | **Messy 2D visuals on good mechanics** | B11 muse | *"good game mechanics and implementation but very basic 2d graphics and decreased a lot interest with that messy visuals"* | §2: 2D is allowed but the painter's stack (A7) is a requirement, not an option; "messy" is the verdict when layering is implicit |
| C8 | **Ambition without completion** | — | *absent this round* | leave the ship-complete rule alone; it worked |

---

## Part D — Cross-links: how this combines with the old logs

| Old knowledge | How log 17 changes it |
|---|---|
| **C13 (retro visuals, rounds 001–006)** | First round where the *default* three.js build carries lights, shadows, tone mapping, fog and palette tokens. C13's remedy rows are being reached in practice — but only by the models that construct their scenes deterministically; gemini and the 2D-default builds still land in C13. Judge-side V0/V1 anchors unchanged. |
| **C11 ("novel-verb + procedural canvas + WebAudio, no assets")** | No longer an anti-cliché reaction — it is the **house style of 8/22 sessions**, now hybridised with a generated key-art layer (B6 winner, B10, B11 muse). The hybrid scores *above* pure C11 in this log. |
| **R012 materials+light teaching (v16)** | Verified again at scale, and extended: material *values* now feed gameplay (raking light revealing forgeries; wool emissivity signalling panic). v22 keeps the checklist and adds the canvas-map + PMREM pair as the way to get variation without assets. |
| **R015 "stakes-frame is a recipe"** | The v21 counter-measure (hedonics + fatigue note) *worked*: zero crisis-ops games. The field's energy moved to air/flight and valuation. Expect the next cluster to land wherever the prompt leaves a named-but-uncosted opening. |
| **C15 law (never name instances)** | Log 17's new families (kite, auction, herding) arrived **without any prompt vocabulary for them** — confirming again that naming cannot suppress what the prior wants. v22 therefore adds them to the agent-visible note *only* as a fatigue list (the operator is visibly tired of auctions the way he was of fire), accepting the relocation cost, and keeps the deeper treatment judge-side. |
| **R010/R011 (guards are load-bearing; avoid-lists are a concept tax)** | v21's replacement of bans with a note + judge-side novelty worked better than any ban did. v22 keeps that structure and adds *no* new bans. |
| **Arena sandbox capability audit (E1 recipes)** | The Blender/bpy/stub-lib pipeline stays valuable for the analyst class and for *pre-baked assets*, but three consecutive battle rounds at 0 confirm it cannot be reached from E2/E3. `challenge/SANDBOX_CAPABILITIES_GUIDE.md` is rewritten to say this plainly and to promote the verified substitutes. |

---

## Part E — What was shipped from this ledger

| Artifact | Content |
|---|---|
| `challenge/BATTLE_PROMPT_v22.md` | cards A1–A14 and B1–B12 compressed into §1 (routes), §2 (look), §3 (premise/novelty), §4 (engineering + probe execution), §5 (hard rules) |
| `repo-ops/sandbox-tools/e2-probe-harness/` **[repo]** | the verification unlock (probe executed through the build step, self-test green) — the concrete capability answer to "0 engines used" |
| `challenge/SANDBOX_CAPABILITIES_GUIDE.md` (v2) | measured route table by environment class + the honest statement that Blender/Godot are unreachable in the battle class |
| `benchmark/06` §6.5 | C24 (single-axis wind flight), C25 (auction/valuation), flock funnelling (unnumbered watch item, below the registration bar) |
| `benchmark/04-defect-taxonomy.md` | CONTROL-LEGIBILITY, LEVEL-N-SOLVABILITY, NOVELTY-COLLISION |
| `battles/round-018-v21-field-analysis.md` | the full comment-by-comment read + metrics + evidence index |

**Held (need the operator's decision, not shipped):**
1. **D2 scaffold change** — install `scripts/run-probe.mjs` + `npm run probe` into every battle workspace (see analysis §4).
2. **D2b engine diversity** — pre-install a non-`three` engine/physics package to break the monoculture; carries C15 attractor cost.
3. **Pre-baked Blender assets** — if Blender-authored meshes are ever wanted in the battle class, they must arrive in the workspace, because the sandbox cannot produce them.
