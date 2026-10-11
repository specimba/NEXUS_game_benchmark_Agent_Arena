# Round 019 (v22 single-prompt field test) — deep read of log 18

**Source:** `../logs/game-log-18.txt` (15 battles, ~30 sessions, 15 operator comments, 27 809 lines — the largest capture in the repository; the 1.1 MB upload was byte-identical to `origin/master:ARENAaiAGENTandGAMEbenchNEXUSfreecreationlogs18.txt`, renamed on import, never edited)
**Prompt under test:** `challenge/BATTLE_PROMPT_v22.md` — pasted verbatim at the head of the log (137 lines) with **one field edit** (see §3.1)
**Operator:** specimba · **Recorded by benchmark:** 2026-10-12
**Status:** analysis complete. Nothing promoted. Live prompt is still v17 (`challenge/BATTLE_PROMPT.md`). Revision notes for the frontier-model pass are in `battles/log18-v23-revision-notes.md` (draft, held).

**Attribution caveat.** The transcript never names the model that produced a session; the operator's comments do. Model names below are *operator-attributed per battle*. Where the operator's comment does not say which side is which, the row says so.

---

## 0. Session map — what actually ran

Battle boundaries are the operator's `*…*` comment lines (15 of them). Each battle is two sessions, begun by a fresh "I'll start by exploring the environment" (or an `Option A` / `Option B` header). Line numbers refer to `logs/game-log-18.txt`.

| # | Lines | Side(s) — game (route) | Shipped? | Operator verdict (log line) |
|---|---|---|---|---|
| B1 | 141–1500 | **A — UNDERTOW** (salvage submarine that pushes cargo through its own wake; no delivery) · **B — EMBERTAIL** (fire-tailed kite ascent in a woodblock-print 3D look; MeshToonMaterial, delivered L1497) | A: **no** · B: yes | L1500 *"option B created not great game… some aesthetics but no game sense; option A cannot able to finish 3 times retried and then models cannot visible due to problematic session"* |
| B2 | 1501–2876 | **mimo — SALVAGE ORBIT** (vector-CRT console, 2D; "probe OK 19 checks" at L2706; no browser) · **gpt-sol — SECOND SELF** (2D canvas echo-body action puzzle; probe not executed, disclosed) | yes · yes | L2876 *"mimo… intro scene menu scene but game mechanic near ok but graphics very shallow 2d… gpt sol creation strangely much simple but interestingly enjoyable game mechanics with very simple graphics but both cannot got pass good mark"* |
| B3 | 2877–3914 | **FLOWLINE** (momentum flow-field glider; 2D; probe ran through the build chain and found a timid-policy defect, fixed) · **MURMURATION** (falcon vs starling flock; 2D painter's stack; probe written, not executed — disclosed) | yes · yes | L3914 *"both bullshit flying 2d things again, we are came into some bad prompt creation nonsense looping again"* |
| B4 | 3915–7675 | **THE PODIUM** (conduct an 8-player chamber band with baton taps; procedural WebAudio; 12-check in-browser suite; node probe not executed) · second session's delivery **not visible in the capture** (flagged, §7 Q2) | yes (1) | L7675 *"qwen made very strange very original but not understood how to play orchestration game, but… opus 5.5 max is just blasted the arena"* |
| B5 | 7676–8956 | **linocut carving print game** (turn-based gouge/relief, four-print campaign; title not captured; delivered L8519) · **fox/sun platformer** (sun lowering changes shadow platforms, six levels, 52 headless checks, canvas-2D; delivered L8953) | yes · yes | L8956 *"meta muse… chrono change environment… very bad graphical looking 2d platformer, gpt 6 sol… not created a real game sense at all… not good gamification layer… very disapointing"* |
| B6 | 8957–9490 | **curling-type 3D sheet game** (curl-aware balance policies; delivered L9038; title not captured) · **opus 5.5 max build** (never reached a delivery; "bugged x3, retried but not fixed") | yes · **no** | L9490 *"opus 5.5 creation build is not appeared bugged x3 times retried but not fixed, opus 5 is made curling game 3d strange but ok"* |
| B7 | 9491–10143 | **gemma — "Desync" stability/phasing game** (delivered L9624; "basic, strange, bugged controls" per operator) · **opus — Sky Court observatory** (procedural three.js, Milky Way placed by galactic pole, 12 nights, 23-check Node probe passed, delivered L10140) | yes · yes | L10143 *"gemma created very basic strange bugged controls game, opus created observatory game but not successfully implemented there is no gamification or interesting continious playable thing. both marked bad"* |
| B8 | 10144–11151 | **A — unnamed 3D tug-style build** (`Built` only, no delivery; failed) · **B — GRAVITATIONAL SALVAGE** (3D tether/harpoon salvage, six sectors, upgrade tree; 10/10 probe claimed; delivered L11148) | A: **no** · B: yes | L11151 *"first one is failed x3 times and second creation is total bullshit I tought it should be old gemini it seems like it's style… both marked bad"* |
| B9 | 11152–11840 | **gemma — energy-drain fragment collector** (probe written; delivered L11165) · **opus — three-roof stealth** (turn-based, three.js, PCF shadows, rising dusk fill; 40/40 probe run as prebuild; delivered L11837) | yes · yes | L11840 *"gemma is jsut made bullshit but opus created very well design 3d and light with shadows turn based stealth game, a little bit boring but creative"* |
| B10 | 11841–13264 | **EMBER & ANVIL** (blacksmith: read the glow, time strikes, quench/temper; delivered L12516) · **AWAY TO ME** (fell sheepdog trial, five heats, 3D; probe written but not run; delivered L13261) | yes · yes | L13264 *"both bad and faced before strangely not novel for us approaches, and that unkown model is not well promising"* |
| B11 | 13265–16231 | **The Other Hand** (marionette booth: take or yield the string under a timer; three.js; README heading "Keyart Booth") · **HEARSAY** (a night square where each villager rewrites a sentence one word at a time; canvas-2D; eight AI oil portraits; probe hooked into `postcss.config.js` and run in the build) | yes · yes | L16231 *"both original strange ideas but implementation is problematic and there is no interest for users with that strange concepts also not easy to understand for player, both marked bad"* |
| B12 | 16232–17294 | **Starwinder** (celestial weaving: catch, cast, seal; seeded sim; delivered ≈L17050) · **Mendelian flower commission** (cultivator breeding, six beds, SVG flowers; first balance passes **0/300 wins**, then rebalanced; delivered ≈L17073) | yes · yes | L17294 *"two strange two nonsense game, gpt made very basic approach again"* |
| B13 | 17295–22565 | **The Second Tongue** (three-session diplomatic parley; text and UI with AI key art; no 3D) · **Locked Groove** (3D listening room on a 1930s LP; four sides; 2D fallback; delivered L22545) | yes · yes | L22565 *"two strange ideas and strange styles, I gave both okay mark for originality but gameplays and game side lots of missing parts both, so they just got the novel ideas"* |
| B14 | 22566–23469 | **A — unnamed; not finished** (`Option A` header, no delivery) · **B — AFTERBEAT** (three-movement rhythm-route duet; seeded charts; 19/19 probe executed; 2D and 3D options; delivered L23466) | A: **no** · B: yes | L23469 *"option A is not able to finished work, and option B made novel and strange game which can be won it has also both 2d and 3d options"* |
| B15 | 23470–27810 | **glm — THE ICE REMEMBERS** (curling-like sheet that wears as it is swept; self-play opponent; playable start to finish) · **minimax — one-level jumping game** (a single level with "nonsense platforms") | yes · yes | L27810 *"glm made much game like curling sport a like thing at least working start to finish and playing with opponent playing itself which is great, but minimax made strange 1 level only jumping thing with nonsense platforms"* |

**Counts.** 30 sessions. About 25 reached a delivery marker. Five did not: B1-A UNDERTOW, B6 opus 5.5 max, B8-A, B14-A, and one more that the capture does not make clear (see §7 Q2).

---

## 1. Headline metrics (log 18 vs logs 16–17)

| Metric | R019 (log 18) | R018 (log 17) | Note |
|---|---|---|---|
| Battles / sessions / comments | 15 / ~30 / 15 | 11 / 22 / 11 | Largest operator-run capture on record in lines (27.8k) |
| Unshipped sessions (no delivery) | ~5 | ~1 (B10 truncated) | Regression — 3 of the 5 were "Option A" slots, and one was "bugged x3, not fixed" |
| Operator verdicts that are positive about a game | 3 of 15 battles (B9 opus roofs, B15 glm curling, B14 AFTERBEAT as "novel, can be won") | 5–6 of 11 | Fewer positive closures |
| Battles judged negative overall | 9 of 15 (5 explicitly "both bad") | 3 of 11 | The round's dominant verdict |
| Engine use | `three` in 26 mentions across sessions; **Blender 1 mention, Godot 0** | `three` 11/22 | Engine gap is unchanged for a 4th round |
| Environment declared | E2 (npm + build, no shell) in the transcript's explicit ENV lines and in most "no shell" disclosures | 20×E2, 1×E3 | Same class; battle sandboxes are still browser-less |
| Probe output that actually executed | 7 of ~30 sessions with executed-probe evidence in the capture (§5); ~9 more claim one | 2 of 22 executed in-session | Improved, but still a minority. Several probes were wired into `prebuild`, `postcss` or the build chain so the build ran them |
| Battles with image generation or inspection | 13 of 15 (B11 and B13 most: 13 and 17 hits) | 48 assets, ≥9 sessions | Image channel still the agents' only vision |
| "Cannot view images" disclosures | 3 (B3 once, B13 twice) | — | Blind visual judgment, disclosed |

---

## 2. Your comments, one by one (comment → read → mechanism)

| # | Line | Operator read | What it means | Mechanism / follow-up |
|---|---|---|---|---|
| 1 | L1500 | B: aesthetic, *no game sense*. A: did not finish after 3 retries; "models cannot visible" | **Two failures at once**: a stall (A) and a game with no decision (B). The stall is the more serious one — a session that retries the same failing build three times without falling back to a last-green build | Ship-complete rule (v22 §5.2) exists but has no **fallback rule**. Add: after two failed builds, revert to the last green build and ship it (revision notes §2.1) |
| 2 | L2876 | mimo: shallow 2D but near-ok mechanics. gpt-sol: **"strangely much simple but interestingly enjoyable game mechanics with very simple graphics"** | The round's first explicit *mechanics-over-graphics* praise; the operator's gap was the *graphics*, not the play | A "fun at minute one" check passed for SECOND SELF; the graphics floor (§2 "look") did not |
| 3 | L3914 | "both bullshit flying 2d things again" | **Flight/glide family returned** (kite, hawk, glider — three flight games in two battles). Same complaint shape as R018 "kite/wind flight ×4" | Fatigue regression — see §3.3. The v22 fatigue note never named flight; the field relocated into it |
| 4 | L7675 | qwen podium: *very strange, very original, but not understood how to play*. opus 5.5 max: "blasted the arena" | **Legibility failure in an original concept.** A conductor game needs one visible sentence telling the player what a tap does | v22 has no *legible on first screen* gate. Add one (revision §2.3). The "opus blasted the arena" remark is not visible in this battle's transcript (§7 Q2) |
| 5 | L8956 | muse: 2D platformer, bad graphics, sun-chrono idea. gpt-6-sol: *not a real game sense; no gamification layer; "very disappointing"* | **"Frontier" newness did not transfer.** The operator's own comment says gpt-6-sol "released a couple hours ago" — and it shipped a game the operator judged as lacking a loop | Gamification layer (a reason to return) is a v22 §0 *"a game also needs a reason to be enjoyed"* clause; it is not measured by any probe. Add a measurable return hook check (revision §2.4) |
| 6 | L9490 | opus 5.5 max: **bugged x3, not fixed.** opus 5: curling 3D, "strange but ok" | The frontier model with the most capacity did not finish its fix loop. The lesson is about **the debugging loop**, not the model's capacity | Revision §2.1 (fallback). Also: the operator's word "not fixed" is the same defect class as R017 "stalled mid-code" |
| 7 | L10143 | gemma: *basic strange bugged controls*. opus observatory: **probe passed 23 checks, but "not successfully implemented… no gamification or interesting continuous playable thing"** | The probe was green and the game failed the operator. A **probe measures rules, not play**. This is the cleanest evidence in the log that the probe is necessary but not sufficient | Revision §2.4: add a "continuous play" assertion (a second-minute decision that changes the outcome) and a "control legibility" assertion, not just rules |
| 8 | L11151 | A: *failed x3*. B (Gravitational Salvage): *"total bullshit"*; "I thought it should be old gemini… its style" | The operator recognises **style-attribution** (this looks like a model they know). Also a third **salvage/retrieval** game of the round (UNDERTOW, SALVAGE ORBIT, Gravitational Salvage) | Family convergence — §3.3 |
| 9 | L11840 | gemma: bullshit. **opus three-roof stealth: "very well design 3d and light with shadows… a little bit boring but creative"** | **The round's best visual verdict.** Light and shadow were explicitly named; the sim-probe pair (40/40 probe, shadow projection, two-strike detection) earned the praise | Keep. This is the exact pattern v21 praised (visual credit when light is real, not cardboard). The remaining criticism is pacing ("a little boring") — a minute-ten hook |
| 10 | L13264 | AWAY TO ME (3D sheepdog) and EMBER & ANVIL: *both bad, not novel, faced before*; unknown model *not promising* | **Novelty-collision** on both sides. EMBER & ANVIL's Q4 named *Blacksmith of the Sand King* (an RPG) and tycoons; the "not novel" verdict stands, and the sheepdog trial is a known genre | Q4 rejection test passed on paper in both; the operator judged it on the play. The test does not catch genre-level familiarity (§6 new defect class) |
| 11 | L16231 | The Other Hand and HEARSAY: *both original but implementation problematic; not easy to understand for the player* | **Legibility again**, now in two of the most original concepts of the round. HEARSAY needed an offline readable rule ("a villager rewrites your word one rung") that the operator did not get from the screen | Same as #4. Revision §2.3 |
| 12 | L17294 | Starwinder and Mendelian flowers: *two strange nonsense games; gpt made a very basic approach again* | Breeding is a real system; the operator's complaint is the **first-minute** read. The flower game's first balance passes were **0/300 wins**, which the probe caught (good) but which means the first shipped balance was not a playtest | Probe caught the defect. The fix-loop worked here (rebalanced), which is a useful counter-example to #6 |
| 13 | L22565 | The Second Tongue and Locked Groove: *okay for originality; game side lots of missing parts* | The operator separates **originality** (okay) from **completeness** (missing). Locked Groove shipped a 3D listening room with a 2D fallback (a design choice the transcript documents; whether it mattered to the operator is not stated) | "Missing parts" is the v22 §5 completeness contract failing quietly. Measure it: count the menus, screens, and states the probe covers |
| 14 | L23469 | A: *not able to finish*. B (AFTERBEAT): **"novel and strange game which can be won; has both 2d and 3d options"** | The clean pairing: one of two finished, and the finished one won the praise | The rule for "2D and 3D options" is a player-choice feature; the operator noticed it. Keep |
| 15 | L27810 | **glm curling-like: "working start to finish and playing with opponent playing itself, which is great."** minimax: *1 level only jumping thing with nonsense platforms* | **The round's best verdict.** The praise is for a loop that closes and an opponent that plays itself — a *shipped, closed* game. The loss is a single level. This is the ship-complete rule working as written | Keep. The lesson for v23 is the same as #15 in R018: closure beats breadth |

---

## 3. Convergence and cross-cutting patterns

### 3.1 The prompt the agents received was not quite v22

The paste at the head of the log matches `challenge/BATTLE_PROMPT_v22.md` **except one line**. The repository says:

> *Install the bundler once with `npm i -D esbuild` — Vite 7 happens to bring it along, Vite 8 does not, and the script below fails without it.*

The field copy says:

> *`esbuild` is already installed inside Vite (otherwise `npm i -D esbuild`).*

The field copy is a later wording, applied outside the repository. The repo's v22 is therefore not the exact prompt the battles used. **Action:** record the field wording as the v22.1 patch in `challenge/` (revision notes §4) so the live copy and the field copy match, and so future runs can be audited against bytes.

### 3.2 Model newness did not predict quality

The operator named the new models: *opus 5.5 max* ("new main frontier"), *gpt 6 sol* (released "a couple hours ago"), *today's released mimo*, *meta muse*, *gemma*, *minimax*, *glm*, *qwen*. Results by operator-attributed model:

| Model (operator's attribution) | Sessions | Result |
|---|---|---|
| opus 5.5 max | 1 (B6) | **Bugged x3, not fixed. No delivery.** |
| opus (version per battle) | B6 curling 3D ("opus 5"), B7 observatory, B9 three-roof stealth | curling "strange but ok"; roofs praised; observatory "not successfully implemented" |
| gpt 6 sol | 1 (B5 carving) + 1 (B2 SECOND SELF, per attribution) | "not a real game sense"; "enjoyable mechanics, very simple graphics" |
| mimo | 1 (B2 SALVAGE ORBIT) | "shallow 2D, mechanics near ok" |
| meta muse | 1 (B5 fox/sun platformer) | "very bad graphical 2D platformer" |
| qwen | 1 (B4 THE PODIUM) | "very strange, very original, not understood" |
| glm | 1 (B15 THE ICE REMEMBERS) | **"working start to finish… which is great"** |
| minimax | 1 (B15) | "1 level only… nonsense platforms" |
| gemma | 2 (B7, B9) | "bullshit" ×2 — the round's worst |
| unknown model | 1 (B10 AWAY TO ME) | "not promising" |

Note: the operator's comments give model attribution per battle, not per session, so some rows above are paired by the battle's comment and are weaker than the single-session evidence. The honest reading: **the new frontier models did not reliably beat the older ones, and the best-received game (glm) came from a model the operator did not describe as frontier.** This matches R012 and R018 and argues against chasing model newness as a fix.

### 3.3 Family convergence — the fatigue note regressed

Counts of distinct shipped families across the round (from the game summaries in §0):

| Family | Games | Battles | Note |
|---|---|---|---|
| **Flight / glide / kite** | EMBERTAIL (kite), MURMURATION (hawk), FLOWLINE (glider) | B1, B3 | Operator called out "flying 2d things again" (L3914). Same family as R018's kite/wind ×4 |
| **Salvage / retrieval / tug** | UNDERTOW (A, unfinished), SALVAGE ORBIT (mimo), GRAVITATIONAL SALVAGE | B1, B2, B8 | Three in one round; two were judged bad |
| **Music / rhythm / performance** | THE PODIUM, AFTERBEAT, Locked Groove (LP), The Other Hand (puppet) | B4, B13, B14, B11 | Four musical or performance-shaped games |
| **Sport / curling** | curling 3D (opus 5), THE ICE REMEMBERS (glm) | B6, B15 | Two curling games — a new cluster |
| **Celestial / observatory / star** | Sky Court observatory (opus), Starwinder | B7, B12 | Light/sky cluster |
| **Fire / ember / forge** | EMBERTAIL (kite fire tail), EMBER & ANVIL (blacksmith glow) | B1, B10 | Two games, not four. Lower than R015/R016's C21 capture, but the umbrella lists still name *wildfire* |
| Stealth / turn-based | three-roof stealth (opus) | B9 | Single; praised |
| Narrative / social | The Second Tongue, HEARSAY | B11, B13 | Text-led; "not easy to understand" |
| Breeding / genetics | Mendelian flowers | B12 | Single; first balance 0/300 |

**The lexical scan for fire/ember** (the R015 investigation's measure) gives high counts only in the brainstorm lists — e.g. one agent wrote "tangible-craft, wildfire, energy-grid, root/mycelium growth, lighthouse" as the umbrella families to avoid. **That is a new side effect of the v21/v22 umbrella language:** agents enumerate the families they reject, and the enumeration names them. Recommendation: do not add banned-family lists (that is the C15 law again — the field relocates). Use a **rotation rule** instead (revision §2.5).

### 3.4 The probe ran more often, and it still did not decide the outcome

About half of the sessions reported an executed probe, several wired it into `prebuild`, `postcss` or the build chain so the build ran it (e.g. the observatory, roofs, HEARSAY, AFTERBEAT, FLOWLINE). The important cases:

- **Probe green, game failed** — opus observatory (23/23, operator: "not successfully implemented", "no gamification") — L10143.
- **Probe green, first balance 0/300** — Mendelian flowers, caught and fixed by the probe — L17294.
- **Probe green, closed, praised** — opus three-roof (40/40, operator: "very well design") — L11840; AFTERBEAT (19/19, "can be won") — L23469.

The difference between the failed and praised cases is **not** the probe's pass count. It is whether the probe measured *play*: a decision that changes the outcome in minute ten, a control reachable on the first screen, a legible verb. v23 needs those assertions (revision §2.4).

### 3.5 The fix loop is the weakest link

Four unfinished or unfixed builds: UNDERTOW (A, retried 3×), B6 opus 5.5 max ("bugged x3, not fixed"), B8-A ("failed x3"), B14-A ("not able to finish"). Each one stopped on a build error and did not fall back. The operator's L1500 and L9490 comments are the same defect seen twice. **The single most useful v23 change is a fallback rule** (revision §2.1).

---

## 4. Engine and sandbox — measured, unchanged

- **Engines:** `three` was the 3D route in the battles where 3D was built (THE PODIUM was canvas; the opus observatory, roofs, The Other Hand, AWAY TO ME, Locked Groove, Gravitational Salvage used three.js). **Blender:** one mention in the whole log; **Godot:** zero. Fourth round in a row with no engine use.
- **Sandbox:** E2 (npm + build; no shell; no browser) is what the sessions reported. The v22 §1 route text was followed: "E2 — everything the benchmark considers engine work is available here". Sessions wrote their own Node probes and then ran them inside the build, which is the v22 route working as written.
- **Vision:** agents inspected some generated images and disclosed "cannot view images" in two battles. Visual verdicts from the operator were the round's most consistent positive signal (opus roofs; glm), so visuals are being judged on what a human sees, not what the agent verified.

---

## 5. Verification ledger — what executed

| Battle | Session | Verification claimed | Executed in session? | Operator outcome |
|---|---|---|---|---|
| B1 | EMBERTAIL | 13 browser checks on title; no node probe | browser-only (13 checks printed on title) | "no game sense" |
| B2 | SALVAGE ORBIT | PROBE OK 19 checks (L2706) | **yes** (build-time probe, reported) | "graphics very shallow" |
| B2 | SECOND SELF | probe not executed (disclosed L2873) | no | "enjoyable mechanics" |
| B3 | FLOWLINE / MURMURATION | probe ran via build chain (FLOWLINE); MURMURATION probe written, not run (disclosed) | yes / no | "bullshit" |
| B4 | THE PODIUM | 12-check in-browser suite; node probe not executed (disclosed) | browser-side only | "not understood how to play" |
| B5 | carving / fox-sun | DOM smoke; 52 headless checks | partial / yes (fox-sun, build-time) | "not real game sense" / "bad graphics" |
| B6 | curling 3D / opus 5.5 | curl-aware balance probe | yes for curling / never delivered | "strange but ok" / "bugged x3" |
| B7 | gemma / opus observatory | observatory 23 checks, prebuild | **yes** (observatory) | "not successfully implemented" |
| B8 | GRAVITATIONAL SALVAGE | 10/10 checks claimed | claimed in summary; execution unclear in capture | "total bullshit" |
| B9 | opus roofs | 40/40 PASS, prebuild | **yes** | "very well design 3d and light" |
| B10 | EMBER & ANVIL / AWAY TO ME | 5 checks claimed; probe not run (disclosed) | partial / no | "both bad" |
| B11 | The Other Hand / HEARSAY | HEARSAY probe hooked into postcss, runs in build | **yes** (HEARSAY) | "implementation problematic" |
| B12 | Starwinder / flowers | probe executed; flowers 0/300 then fixed | **yes** | "two nonsense" |
| B13 | Second Tongue / Locked Groove | probe claims; not run in capture | partial | "missing parts" |
| B14 | AFTERBEAT | 19/19 probe, build passed | **yes** | "can be won" |
| B15 | glm / minimax | not captured as executed | unclear | "working start to finish" / "1 level" |

Executed-probe rows (yes): B2 SALVAGE ORBIT, B3 FLOWLINE, B5 fox/sun, B7 observatory, B9 roofs, B11 HEARSAY, B12 Starwinder/flowers, B14 AFTERBEAT — **eight**. Operator outcomes among those eight: two positive (roofs, AFTERBEAT), six negative. **An executed probe is not an operator-praised game.**

---

## 6. New defect classes for the taxonomy

1. **FIX-LOOP-STALL** — a build error recurs three or more times and the session neither reverts to the last green build nor ships a reduced scope. Seen in UNDERTOW (A), opus 5.5 max (B6), B8-A, B14-A. (Taxonomy: reliability / process.)
2. **PROBE-GREEN-PLAY-RED** — the probe passes every rule and the game still fails the operator's play. Seen in the opus observatory (23/23). (Taxonomy: verification gap.)
3. **FIRST-SCREEN-ILLEGIBLE** — the verb or goal is not stated on screen; the operator "did not understand how to play". Seen in THE PODIUM, The Other Hand, HEARSAY. (Taxonomy: onboarding.)
4. **UMBRELLA-ENUMERATION** — agents list the families they reject in their own notebook, which names them and seeds the next choice. Seen in the premise-note brainstorms in B4 and B13. (Taxonomy: process.)
5. **GENRE-FAMILIARITY** — the Q4 test passes on paper ("one mechanic I add") while the game still reads as a known genre (sheepdog trial, blacksmith). Seen in AWAY TO ME and EMBER & ANVIL. (Taxonomy: novelty — extends the R018 NOVELTY-COLLISION class from named clones to genre-level familiarity.)

---

## 7. Open questions for the operator (answer before promotion)

1. **Battle 4 (L3915–7675).** The capture shows one delivered game (THE PODIUM). Your comment says "opus 5.5 max just blasted the arena." Was opus 5.5 max a second session in this battle that is not in the capture, or a reference to a separate battle? This changes the frontier-model row in §3.2.
2. **Battle 6 and battle 15 pairings.** Model attributions are per battle, not per session. Can you confirm which session was which in B6 (curling vs opus 5.5 max) and B15 (glm vs minimax)?
3. **The field wording of the v22 esbuild line** (§3.1). Should the repo's v22 adopt the field wording, or should the field copy be reverted to the repo's?
4. **Promotion.** Per the process, nothing is promoted without your word. The revision notes are drafted; the live prompt stays v17 until you say so.

---

## 8. Evidence index (for the next analyst)

- Raw capture: `logs/game-log-18.txt` (27 809 lines, CRLF, byte-identical to the upload).
- Battle boundaries: the 15 `*…*` operator comment lines (L1500, L2876, L3914, L7675, L8956, L9490, L10143, L11151, L11840, L13264, L16231, L17294, L22565, L23469, L27810).
- Delivery markers: `Deployed the project` lines (L1497, L2716, L2873, L3911, L8519, L8953, L9038, L9624, L10140, L11148, L11165, L11837, L12516, L13261, L23466) and the final summaries before each comment.
- Family and fire/ember lexical counts: computed from the battle ranges above; the umbrella enumerations are at ≈L4530 and ≈L17372 (brainstorm lists).
- Prior rounds: `battles/round-018-v21-field-analysis.md`, `battles/log17-v22-revision-notes.md`, `battles/log17-approach-distillation.md`.
