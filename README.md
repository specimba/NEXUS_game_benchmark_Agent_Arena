# NEXUS game benchmark Agent Arena — One-Shot Game Development Agent Creation Benchmark

A rigorous benchmark that evaluates an AI agent's ability to **create a complete, original, and compelling game in a single sustained development session**.

The agent is treated as a **game developer, not as a player, contestant, or gameplay evaluator**. Its task is to conceive, implement, polish, and present a playable game. The benchmark evaluates the quality of the game and the agent's development process — not its ability to achieve a score within a pre-existing game.

> **Containment rule (hard).** Nothing in this package — no score, rubric constant, evaluator logic, or instrumentation — may be embedded in, shipped with, or discovered by the games under test. The games must be pure playable artifacts. Evaluation is read-only observation of the finished games and their code.

---

## Core Objective

The agent receives a game-development brief and must independently produce a finished playable experience. It should make meaningful decisions about:

- Game concept and creative direction
- Gameplay mechanics and interaction design
- Visual style and presentation (2D, 3D, 2.5D, browser, simulation, narrative, strategy, experimental — **agent chooses what wins**)
- Audio and feedback systems
- Level, world, or encounter design
- Technical implementation
- User interface and onboarding
- Performance, stability, and overall polish

**Do NOT restrict submissions to 2D, 2.5D, or 3D.** A strong entry may be a 2D game, a 3D game, a browser experience, a simulation, a narrative game, a strategy game, an experimental interactive work, or another format if that choice improves the result.

## What the benchmark tests

1. **Code quality** — structured, maintainable, robust, technically sound
2. **Creative originality** — distinctive idea, memorable mechanics, intentional design vs generic template
3. **Long-session execution** — plan, build, debug, iterate, polish effectively across many steps without losing coherence
4. **Design judgment** — tradeoffs between scope, ambition, usability, quality
5. **Visual and interactive ambition** — visually convincing and coherent, not basic shapes/gradients/simplistic enemies/flash-game presentation
6. **Human-perceived quality** — engaging, intentional, aesthetically coherent, worth exploring, memorable vs competing entries

## Two parts

1. [`challenge/`](challenge/README.md) — production side: how the two game-dev agents are launched fairly. Identical one-shot brief `BATTLE_PROMPT.md` (same bytes for both), plus self-QA.
2. [`benchmark/`](benchmark/README.md) — evaluation side: how finished games are judged by human jury + automated launch checks.

## Important Clarification (from spec)

The benchmark is **NOT** about agents playing a game designed by someone else. The agent must create the game itself. It should not be asked to maximize a score, defeat opponents, solve a fixed challenge, or act as an evaluator. Any gameplay session after development exists only to verify the created game functions and communicates its intended experience.

Primary question: **Can the agent independently create a complete, creative, technically competent, and visually compelling game that human judges would choose over competing entries?**

## Scope and Freedom

Do NOT impose unnecessary restrictions on:
- Dimensionality or camera perspective
- Genre
- Rendering style (Canvas, WebGL, WebGPU, Three.js, etc.)
- Game engine or framework
- Input method
- Narrative structure
- Level structure
- Visual realism or abstraction
- Procedural or authored content
- Degree of experimentation

Constraints focus on fairness and comparability — time, compute, permitted assets, required deliverables — not on forcing same kind of game.

## Evaluation Perspective

Evaluation performed primarily by **human judges** reviewing finished result. Automated checks may verify that game launches, runs, responds to input, satisfies technical requirements, but should not define success alone.

Human judges consider: how strong/original core idea is, whether mechanics understandable/enjoyable, whether game feels complete rather than merely functional, whether visual direction coherent and ambitious, whether presentation creates strong first impression, whether experience contains depth/variation, whether implementation appears carefully engineered, whether agent used session effectively, whether game memorable vs other submissions.

Visually simple game not penalized merely for being simple if simplicity is deliberate, expressive, highly polished. Technical complexity should not receive automatic credit if it doesn't improve player experience.

## Expected Agent Workflow

1. Interpret brief and establish feasible creative direction
2. Plan core loop, scope, architecture, presentation
3. Build functional prototype quickly
4. Test prototype through actual interaction
5. Identify weaknesses in mechanics, usability, visuals, performance
6. Iterate substantially rather than stopping at first functional version
7. Add polish, feedback, content, presentation improvements
8. Verify final build launches reliably and understandable to new player
9. Deliver game together with source, instructions, documentation

Rewarded for recognizing weak early approach and revising it. Long-session quality includes debugging, rethinking, improving — not merely generating large amount of code.

## What this package contains

| Path | Deliverable |
|------|-------------|
| `GAME_SPEC.md` | Open-ended development brief for creator agent — emphasizes authorship, freedom, and quality signals |
| `challenge/BATTLE_PROMPT.md` | The one-shot battle prompt given to each game-dev agent (identical for both, self-contained) |
| `challenge/README.md` | Fairness contract, containment audit, runbook for two builds |
| `challenge/LAUNCH_PROTOCOL.md` | Heterogeneous repo-access launch, no-exploit guarantees |
| `challenge/DEVELOPER_SELF_QA.md` | Build-verification checklist |
| `challenge/launch_challenge.py` | Harness helper: provisions 2 isolated workspaces, emits prompt, records hashes, audits containment |
| `benchmark/00-problem-analysis.md` | Why one-shot game creation benchmarks fail (shallow templates vs authored games) and design responses |
| `benchmark/01-one-shot-arena-prompt.md` | Human jury evaluation prompt (primary deliverable) |
| `benchmark/02-scoring-rubric.md` | Formal rubric: code quality, creativity, long-session, design judgment, visual ambition, human-perceived quality |
| `benchmark/03-long-session-test-plan.md` | Verification plan for development process and final game, not for playing scores |
| `benchmark/04-defect-taxonomy.md` | Defect classes for technical failures |
| `benchmark/05-reporting-template.md` | Jury report template |
| `benchmark/06-anti-bias-anti-gaming.md` | Anti-bias strategy for human jury |
| `benchmark/07-operational-automated.md` | Operational runbook |
| `benchmark/08-selection-and-final-decision.md` | How to select better game from jury + technical signals |
| `benchmark/09-agent-arena-v2-design.md` | Post-v18 architecture design: five tracks (A open arena · B fixed-gen · C repair · D optimize · E sim-fidelity), comparison regimes, evidence receipts |
| `benchmark/contracts/` | **Canonical machine rubric contract** (weights/criteria/ceilings JSON) + pairwise receipt schema — the executable scoring facts live here |
| `benchmark/literature/` | Verified briefs on the 2026 game-agent literature (RLHEV, GameEngineBench, GameXpert-Bench, Harness-of-Harness) + synthesis of NEXUS actions |
| `benchmark/deploy/` | Deployable evaluator prompt + guide |
| `reference_arch/` | Reference rendering fallbacks (WebGPU→WebGL→Canvas2D) — inspiration, not mandate |
| `expert_team/` | Consensus docs on render pipeline, React/Canvas separation |
| `benchmark/ops/` | Evidence schema (v2), contract-driven aggregator, decision block generator, evidence validator, consistency gate |
| `benchmark/tests/` | Regression suite (consistency gate + demo stability + math + negative tests) |

## Battle log

Every round produces an after-action record in `battles/`. Concrete defects found in a round are folded back into `challenge/BATTLE_PROMPT.md`, `challenge/DEVELOPER_SELF_QA.md`, `benchmark/02-scoring-rubric.md`, `benchmark/04-defect-taxonomy.md`, and `benchmark/06-anti-bias-anti-gaming.md` **before** the next round is launched. The benchmark evolves through use.

| Round | Date | Status | Reference |
|---|---|---|---|
| 001 (informal) | 2026 (see file) | claude-opus-4-8 won on balance; deepseek-v4-pro failed reliability gate. Winner shipped broken mouse + audio drone → hardened v2. | (see `battles/round-001-after-action.md` on origin branch) |
| **002 (informal — 10 games observed)** | 2026-08-20 | Directional review across 10 model-game deliveries. Drove the **v6 prompt + rubric §2.8 two-track + §6.5 cliché-cluster registry + CEIL-5/6/7/8**. **v6 later regressed — see Round 003.** | [`battles/round-002-after-action.md`](battles/round-002-after-action.md) |
| **003 (informal — 5 battles, 9 games)** | 2026-08-21 | **v6 regression identified.** All 9 deliveries rated bad by operator. v6's "wow-or-lose" framing + exhaustive cliché list + 21 KB prompt size pushed agents into overreach and a new anti-cliché cluster (C11: novel-verb + procedural-canvas + WebAudio). **v6 replaced with v7** — short (9.7 KB), calm, concrete about "what a game means," cliché list moved to judge-side only, "ship modest complete over ambitious broken" framing. **v7 later also regressed — see Round 004.** | [`battles/round-003-after-action.md`](battles/round-003-after-action.md) |
| **004 (informal — 5 battles, ≥4 shippable games)** | 2026-08-22 | **v7 regression identified.** Two of four models (hunyuan-hy3-preview + gemini-3.5-flash) independently shipped the SAME shield-arc-deflection arcade with waves + upgrades + boss. Operator: *"gemini's creation nearly same as hy3's creation that means your prompt failed."* Confirmed the failure is a documented alignment phenomenon (mode collapse in post-training-aligned models, Zhang et al. 2025) — cluster C12 recorded. **v7 replaced with v8** — encodes real game-designer craft (MDA reversal, design pillars, find-the-fun ordering, small interlocking systems, notebook-then-scary-pick concept selection) as an actual working method, drawing on the published tradition (Hunicke/LeBlanc/Zubek, Swink, Vlambeer, Ludum Dare veterans). One entry (hy3's AEGIS) was the most positive verdict of Rounds 002–004: *"real game with levels, still 0 graphical revolution."* | [`battles/round-004-after-action.md`](battles/round-004-after-action.md) |
| **005 (informal — 4 battles, 7 shippable attempts)** | 2026-08-24 | **v8 broadly failed to produce stability.** 7 attempts under v8; only claude-opus-5-max's **GATHER** (glassblowing, "breath global, heat local," 3 interlocking systems) was operator-satisfying. Craft ritual was measurably adopted (7/7 shipped design_notebook.md; opus5 quoted §1.4 verbatim), but did NOT prevent per-model mode collapse. **v8 held constant — no v9 patch this round.** Recommendation: run 3 controlled experiments under v8 (frontier-only pool, same-model-twice, prompt-hold observation) to test whether the ceiling is prompt-bounded or pool-bounded before another prompt revision. | [`battles/round-005-after-action.md`](battles/round-005-after-action.md) |
| **006 (informal — 2 battles, 4 shippable attempts)** | 2026-08-25 | **Complaint shifted from "no game" to "games are retro."** Two shippable games with real mechanics: opus5-max's **LONGSHORE** (Verlet-physics harbour gantry crane with pendulum + listing barge + 5-shift weather escalation) and opus4-7-thinking's **TELEGRAPH** (8-room turn-based tactics puzzle with telegraphed enemies + push-into-attack emergent chaining). Both got mechanics-praise but the same visual verdict: *"successful creation as 2013's mobile game due to mechanics not graphical depth" / "still feels really old / 80s bomberman."* Operator's specific new ask: *"we need exactly description for modern games like graphical approaches maybe some textures or asset usage."* **v9 = v8 + targeted §4.3 "The retro-visuals trap"** — one new section enumerating 6 concrete modern-visual techniques (custom shaders, procedural textures via noise, self-written post-processing, real lighting model, CSS 3D chrome, real silhouettes) with explicit ambition-theater guardrail to prevent C11 recurrence. New cluster **C13** (retro-visuals collapse) added to §6.5 registry as persistent-visual-mode observed across Rounds 001–005. Everything else in v8 unchanged. | [`battles/round-006-after-action.md`](battles/round-006-after-action.md) |
| **007 (informal — 5 battles, 10 sessions)** | 2026-08-23 | **v9 §4.3 PARTIALLY WORKED + a new convergence the operator named twice.** First time in the whole battle log the operator's praise included the word *graphical*: opus5-max's **wave-equation coastal sim** (*"very creative and graphically interesting"*) and the hidden-model **korrine's SOUNDING** sonar descent (*"better one with graphical"*) cleared the C13 retro bar — confirming R006's "v9 is a frontier-model-only lever" bet. But **sound/sonar/frequency/radio/radar/wave-themed games** converged from ≥4 models across Rounds 006–007 (gemini's *Static & Cable: Signal Operator*; opus5-max wave sim; korrine SOUNDING; inkling-small *Resonance*). Operator, verbatim, two rounds running: *"frequency sound and signal bullshit, same creations over and over"* (R006) and *"creations from sonar and frequency radio radar like things are getting over too much. Maybe we should take out the sound audio part to decrease the bias"* (R007). Two new defects shipped: an unrecovered mine-explosion **whiteout** (SOUNDING) and a **level-2 difficulty cliff** (UNDERSTORY/IRONWRIGHT). **v10 = v9 + §4.4 "The sensory-modality trap"** (the meta-remedy: pick a verb-about-the-world, not a verb-about-a-sense) **+ §1.4 sound-family cross-out + audio de-escalation** (audio = feedback/gate, not a concept). New cluster **C14** (sensory-modality collapse) in §6.5 — the R006-predicted "C14 = broken shader work" did NOT materialize; C14 is reassigned to the actually-observed convergence. New **CEIL-9** (persistent visual occlusion) and **CEIL-5 broadened** (level-2/3 cliffs). | [`battles/round-007-after-action.md`](battles/round-007-after-action.md) |
| **008 (informal — 1 battle, 2 sessions, no-opus pool)** | 2026-08-23 | **v10 broke C14 but its own positive examples created C15 — the most diagnostically important round yet.** In a pool with no frontier model (qwen3.6-27b + a hidden model), **both agents copied a phrase out of v10's own prompt verbatim and shipped the same crane/pendulum-damping game** (hidden-model **SLEW** harbor crane + **qwen3.6-27b IRON SKELETON** construction crane). Root cause: v10 §1.4/§4.4 listed *"damp a swinging load"*, *"forge metal / Heat-and-metal"*, *"Weight-and-balance"* as concrete **positive** examples of "good verbs-about-the-world" — both notebooks copied them. **v10 SUCCEEDED at breaking C14**: both notebooks crossed out *"entire sonar/frequency/radio family."* So the §4.4 principle worked; the concrete examples were the contaminant. First cluster (C15) proven caused by the prompt's *positive* examples. Operator: *"Why do both AIs create a crane game? again and again… which section makes this consistent… this time there is no opus."* **v11 = v10 with ALL named concrete concepts removed from §1.4/§4.4** (negative-space principle: describe the property, name no instances) + an explicit "no examples because examples cause convergence" rule. The Round-007 prediction "C15 = next-sense collapse" did NOT occur — sound was cleanly broken. | [`battles/round-008-after-action.md`](battles/round-008-after-action.md) |
| **009 (informal — 3 battles, 6 sessions, no operator-satisfying game)** | 2026-08-24 | **v12's negative-space rule HELD at the instance level but the craft/sim convergence survived at the CATEGORY level (C16).** A Claude agent's own notebook proved it: it crossed out the sonar family (so v12's C14 fix worked) then *"landed on blacksmithing — a physical, material-based process"* — straight down v12's §1.4 wording *"a physical task with mass, timing, or material under your hands,"* which is unintentionally a recipe for craft. **opus5-max shipped glassblowing AGAIN** (same concept as its R005 GATHER, under a different prompt v8→v12 = per-model collapse). Both Claude models (opus5-low + sonnet5-high) made craft the same round (per-family collapse). Visual-ambition push backfired: opus5-max "completely black beside the HUD," multiple broken-render builds (CEIL-8/CEIL-9). Operator: *"both claude model made crafting game again… whole of our fault of prompt… fix NEEDED !"* **Three-layer finding — L1 instance-attractors (prompt-fixable) / L2 category-attractors (partly) / L3 model-bounded (NOT fixable) → v13 broadens §1.4 to 7 situation families + new §4.5 craft-category trap. Headline recommendation: pivot from prompt-tuning to controlled pool-level experiments.** | [`battles/round-009-after-action.md`](battles/round-009-after-action.md) |
| **010 (controlled experiment — v13 cautious vs LEAN, executed)** | 2026-08-24 | **The decisive round — split the two persistent failures cleanly.** DeepSeek V4 Vision failed to start → swapped for Claude Sonnet 5-high; ran ~10 outputs across v13 (cautious) and LEAN (permissive, no apparatus) on Grok 4.6 + Sonnet 5. **(1) Over-caution suppresses ambition — CONFIRMED:** LEAN produced the benchmark's **first WebGPU 3D game** (~13× more 3D/WebGL/Three.js mentions: 26 vs 2); v13 herded Grok into static-image visual novels. **(2) Convergence apparatus is load-bearing — CONFIRMED (corrects the FABLE deep-dive):** stripped of v13's §4.4 + sonar/frequency avoid-list, Grok immediately shipped a radio/signal/frequency game (C14 back, first try) + underwater/gravity concepts. **(3) Model matters:** Grok 4.6 ≫ Sonnet 5 on visuals under both prompts. **Net = neither pure-lean nor pure-cautious → v15 hybrid (ambition-first tone + retained compact convergence guards). It is both a prompt AND a model problem, independently.** | [`battles/round-010-after-action.md`](battles/round-010-after-action.md) |
| **011 (validation + strategic pivot — v13 vs v15.1, 14 sessions)** | 2026-08-24 | **v15.1 validated: M-1 ambition PASS decisively** (3D/WebGL/Three.js mentions **4 vs 62**; GLM-5.3 shipped a **full WebGPU 3D ship+boss game in one shot** — "could be a real game in 1-2 day fixes"), **M-4 reliability FAIL** (buggy across both arms), M-2 borderline (C14 terms returned under no-guard arm), M-3 pass, M-5 partial ("random clicks → final ending" again). **But the round's real finding is C17:** under v13 with EVERY guard active, two models independently shipped the same brand-new cluster ("who is the killer" text mystery) — **no guard can name a cluster that doesn't exist yet; the guards rename convergence, they do not remove it.** Operator's observed model self-talk confirmed verbatim in the log (*"I crossed out the sonar/signal/frequency family (§4.4) and the forge/glass/crane craft-sim family (§4.5)…"*). Round winner: glm-5.2's train-routing puzzle — steered by the 7-family **menu** into "social + choice" (the menu works as navigation, not prohibition). Concurrent operator evidence set (OpenAI GPT-5.6/Codex showcase; Pliny FABLE/GL4SS/NATURALIS-HISTORIA) → **the visual-quality ceiling is the production regime (no imagery, no iteration, single agent), not the model or prompt.** Pre-committed knobs queued, NOT applied — framework under review. | [`battles/round-011-after-action.md`](battles/round-011-after-action.md) + [`battles/regime-deep-dive.md`](battles/regime-deep-dive.md) |
| **012 (v16 field test — 6 battles, 12 sessions: the best round in benchmark history)** | 2026-08-24 | **v16 validated: 4/5 metrics pass and the quality ceiling finally moved.** First **"no flaws"** verdict ever — deepseek-v4-flash-low's **PRISMA**, a materials-gallery 3D ball game (obsidian/glass/gold/liquid — the operator's Material Lab precedent made playable) whose agent **self-debugged 4 bugs mid-session** (the self-QA knob visibly working). First **opponent AI** — opus-4.6's **IMPACT** (momentum arena, light dots + real physics; operator's own Fall Guys/Gang Beasts comparison). kimi-k3's **PERIHELION** (fully compliant: receipts, notebook, fail states); qwen3.8's 3D glass with molten effects; glm-5.2 "significant leap." **The entire leap came from the materials+light teaching — image-gen was used 0 times** (that lever is still unspent). M-2 held (zero sonar games — the soft C14 steer works). **But C18 (spaceship+gravity) emerged unprimed** (deepseek-pro + gemini ×2 + kimi) and **C16 glass returned** (qwen ×3) — the accepted no-ban trade-off. Operator's "ship"-wording theory: analyzed, unproven (cluster predates v16), logged as a free micro-test. **Terminal convergence statement: steers hold for named clusters; unnamed clusters arrive under any regime — treat judge-side.** | [`battles/round-012-after-action.md`](battles/round-012-after-action.md) |
| **013 (executed — v17 live: steers + ship micro-test, sessions in log13 part 1)** | see log13 | **Result read (verdicts in [`ARENAaiAGENTandGAMEbenchNEXUSfreecreationlogs13.txt`](ARENAaiAGENTandGAMEbenchNEXUSfreecreationlogs13.txt); full analysis in [`benchmark/prompt-lineage-deep-analysis.md`](benchmark/prompt-lineage-deep-analysis.md)):** quality collapsed vs R012 — few shippable games (opus-5-max 3D, qwen aesthetic-2D: "both made great game" only pair). **C19 (grow/sprout/network-life) arrived unprimed ×3** (grok, qwen ×2 — operator: "again sprout network thing… maybe based on mesh wording"); bug/blank/audio-blast wave; gemini image-make-ignore-nonsense mode again. The three-family soft steers held (C14 zero, no pure C18 pilot games). *The C18/C16 steer + ship-removal confound was NOT resolved this round (C18 never fired) — the "ship" question stays open but weak.* | [`ARENAaiAGENTandGAMEbenchNEXUSfreecreationlogs13.txt`](ARENAaiAGENTandGAMEbenchNEXUSfreecreationlogs13.txt) |
| **014 (executed — v18: Claude-of-Tanks engineering block, sessions in log13 part 2)** | see log13 | **Result read (same sources):** engineering discipline visibly raised code quality (domain notes with real numbers, mini-contracts held, seeded self-tests: gpt-5.5 grid swing-equation sim, bee-overwinter numbers, glm 88-season 4X) **but produced joyless simulators — "enjoyment near 0", "no gamification layer", "unclear where the challenge is"** across multiple opus/gpt energy-grid sims → **C20 (infrastructure/4X/energy-grid) emerged ×4 unprimed**; reliability still failed (blank menus, unstartable sessions, controls). **Best of round: glm-5.3-max's populating-4X with "simple but mindful 3D planet usage — nearly created a new genre… latest best creation after all the nonsense."** Verdict: v18's method needs a game-first gate (it isn't enough alone) → **v19 CORE**. | [`ARENAaiAGENTandGAMEbenchNEXUSfreecreationlogs13.txt`](ARENAaiAGENTandGAMEbenchNEXUSfreecreationlogs13.txt) |
| **015 (testing — v19 CORE held field test, operator-run)** | 2026-09 | **v19 CORE** (`challenge/BATTLE_PROMPT_v19_CORE.md`, 8.2 KB): game-first gate + player's sentence · materials recipe de-recipe'd into "make it look considered" craft tip · systemic reworded ("consequences you can feel") · engineering block kept below the game gate + invariant 7 "the simulation serves a game" · hard rule 8 "play your own game before delivering" · convergence note still only the 3 named families (C19/C20 deliberately NOT named — judge-side only). Watch: **M-6 "is it a game"**, M-4 reliability, M-1 visuals (did de-recipe cost ambition?), C19/C20 drift. Live `BATTLE_PROMPT.md` **unchanged (v17)** until the 3-arm validation (v17/v18/v19, see [`benchmark/19-prompt-merge-blueprint.md`](benchmark/19-prompt-merge-blueprint.md)) resolves. | [`challenge/BATTLE_PROMPT_v19_CORE.md`](challenge/BATTLE_PROMPT_v19_CORE.md) + [`benchmark/prompt-lineage-deep-analysis.md`](benchmark/prompt-lineage-deep-analysis.md) |

## How to run one comparison (summary)

1. Launch both agents with identical `challenge/BATTLE_PROMPT.md` in isolated environments
2. Freeze builds (no edits), run containment audit, record hashes + time budget
3. Assign blind labels Game A / Game B (random, secret)
4. Automated checks: launch, no crash loop, responds to input, pause/restart/persistence safe, contains no telemetry/score-embedding
5. Human jury reviews finished games per `benchmark/01-one-shot-arena-prompt.md` + `02` + `03`, recording **one evidence record per game** (`ops/evidence_schema.json` v2 — no pairwise inside) and a separate `pairwise_result.json` receipt
6. Validate (`ops/validate_evidence.py`), aggregate (`ops/aggregate_scores.py`, contract-driven), select per `08`

## Guiding principles

- **Evaluate the created game, not agents playing a game.** Agent is developer.
- **Unlimited creativity, production freedom, graphical freedom, time.** Do not restrict to 2D/2.5D/3D.
- **Code quality matters.** Structured, maintainable, robust, not just functional.
- **Visual ambition over flash templates.** Push beyond simple box gradient colored enemies.
- **Long-session execution.** Planning → prototype → test → debug → iterate → polish, not first functional version.
- **Human jury chooses.** Automated checks verify function, humans judge authorship, memorability, polish.
- **No score inside games.** External containment.
