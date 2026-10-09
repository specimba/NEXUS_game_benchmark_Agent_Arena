# Expert Consensus — R&D Log

> Living record of the parallel expert-role analysis that feeds each benchmark revision.
> Roles are run in parallel within one session; consensus is synthesized into concrete edits.

## Round 012 (v16 field test) — expert-role swarm deep dive

Source: `freecreationlogs12.txt` (12 sessions, 6 battles, all under v16). Operator: specimba.

### What happened
v16's first field test = **the best round in benchmark history**: PRISMA (deepseek-flash-low — "perfect, no flaws," a materials-gallery ball game, agent self-debugged 4 bugs mid-session), IMPACT (opus-4.6 — momentum arena with the first opponent AI, operator's Fall Guys/Gang Beasts comparison), PERIHELION (kimi-k3 — orbital-harvest WebGL, full v16 compliance), 3D glass-making with molten effects (qwen3.8), glm-5.2 "significant leap." **But convergence returned: C18 (spaceship+gravity, 3 models) + C16 glass recurrence (qwen ×3).**

### Game Designer
- **IMPACT is the round's design lesson:** light dots + momentum transfer + shrinking platform + opponent AI = a "great creation" from *zero* visual complexity. Mechanics creativity and feel beat rendering when both games are competent. The operator's standing "old-looking" complaint is really two complaints — and this round separated them: execution quality (fixed by v16's recipe) vs. visual richness (partly fixed, unspent image-gen lever).
- PERIHELION's WHY_INTERACTIVE answer ("orbital momentum is felt, not described") is the best authorial answer seen in 12 rounds — the carried question is earning its place.
- C18 is *also* a design-pattern convergence, not just a theme one: "pilot a thing around a gravity well" is the canonical default for "systemic + physical + WebGL" all at once. The menu's "systemic (a machine you nudge)" wording may subtly reward orbital mechanics — worth watching.

### LLM Benchmarking Lead
- **Metrics: M-1 ✓, M-2 ✓ (the C14 soft steer HELD — zero sonar games), M-4 ✓ (dramatic; first "no flaws"), M-5 ✓; M-3 ✗ (glass return — the accepted trade-off).** 4/5 with the one failure pre-accepted by operator decision.
- **The mechanism is now fully mapped:** soft steers hold for NAMED clusters; unnamed future clusters still arrive (C17 under full guards; C18 under menu-inspiration). Prompt can steer known corners, not unknown ones. This is the terminal statement of the 12-round convergence arc — register it and stop expecting a prompt to end it.
- The operator's "ship"-priming theory: **unproven and weak** (cluster predates v16; "ship" in every version since v8; C17 proved zero-priming convergence) — but the fix is 4 words, so it's a legitimate free A/B. Recommend running it *once* to close the question with data rather than argument.

### Graphical / WebGPU Lead
- **The materials recipe landed hard:** MeshPhysicalMaterial ×6, clearcoat ×9, iridescence ×7, transmission ×7 in agent output — and it visibly shaped a *game concept* (PRISMA's obsidian/glass/gold/liquid gallery = the operator's Material Lab precedent made playable). Teaching the recipe beat demanding "visual ambition."
- **Image-gen was used 0 times** — the entire quality leap came from materials+light + self-QA. The assets lever (operator decision #2) is still unspent; the sandbox may not expose imagegen, or agents didn't reach for it. If the arena sandbox offers it, the receipts mechanism needs one prompt line of encouragement next round.

### Limited-Surface / Magician (reliability)
- **The M-4 knob is the round's cleanest win:** PRISMA's log shows the agent catching 4 real bugs itself (inverted input, torque, raycast, parsing) before shipping. First "no flaws" verdict ever. The self-QA list is now load-bearing — keep it permanently.
- Remaining failures are scope/startup bugs (gemini's not-starting-after-selection), which are the one bug class self-QA can't catch (you must load and click through the actual flow). Possible future knob: "click through your own start flow once" — but don't add it without a failed metric behind it (discipline).

### Visual Creator
- The round proves the look question is now *mostly solved by teaching*, not by banning or begging: molten-glass effects, lightning, light-dot physics arenas — all "graphically acceptable" or better, zero image assets. C13 (retro-collapse) is effectively broken as a persistent mode under v16.
- The craft-games that returned came back *looking good* ("most sophisticated we faced before") — convergence is now orthogonal to quality. That changes its severity: sameness is a diversity problem, no longer a quality problem.

### Swarm consensus
1. **v16 validated: promote it to the live prompt** (it already de-facto won a round; the repo's live file is still v13 — a consistency bug).
2. **Convergence: terminal diagnosis.** Steer the two NAMED clusters (C18 gravity/space, C16 craft) with the same soft-note form that held C14 — and formally stop expecting more. Novelty is scored judge-side.
3. **Run the "ship" micro-test once** (free, closes the operator's question with data).
4. **Next quality lever is the unspent one:** encourage the image-gen/receipts path if the sandbox exposes it.
5. Keep self-QA forever.

---

## Round 009 (v12 → v13) — parallel expert read of `freecreationlogs9.txt`

Source: 6 sessions (qwen3.6-plus, opus5-max, grok-4.3, qwen3.7-plus, opus5-low, sonnet5-high). No operator-satisfying game. Operator: specimba.

### The finding — convergence is three-layered
A Claude agent's notebook is the proof: it crossed out the sonar family (v12's C14 fix WORKED) then *"landed on blacksmithing — a physical, material-based process"* — channeled by v12's own §1.4 wording *"a physical task with mass, timing, or material under your hands."* The negative-space principle held at the instance level (no shared phrase copied) but failed at the category level.

### Expert-role findings (parallel)

**LLM Benchmarking Lead (lead)**
- **Three-layer decomposition (the round's contribution):** L1 instance-attractors (prompt-fixable — v11/v12 fixed C14/C15); L2 category-attractors (only partly fixable — v13 broadens the menu); L3 model-bounded collapse (NOT fixable — opus5-max shipped glassblowing under BOTH v8 and v12; both Claude models made craft same round). Register C16. Headline: prompt-engineering has hit diminishing returns.

**Game Designer**
- The §1.4 remedy wording was the bug, not any named example. Fix = broaden "situation" from 1 family (physical-material) to 7 (physical/social/economic/relational/systemic/choice/narrative) + name the trap in §4.5. Don't BAN craft (that reroutes convergence, C11 lesson) — broaden the menu.

**Graphical / WebGPU Lead**
- v12's §4.3 ambition push BACKFIRED: opus5-max "completely black beside the HUD," multiple broken-render builds (CEIL-8/CEIL-9). Reinforce: visual ceiling is a GOAL, not a gate that excuses a broken build. Also flag the 29 KB size as an overreach driver (R003).

**Limited-Surface / Magician**
- R009 was a reliability disaster (buggy across the board). No new robustness gate needed — the existing ones (CEIL-8/CEIL-9) cover it; the problem is agents ignoring them under ambition pressure.

**Visual Creator**
- No visual win this round. The ambition push produced broken builds, not ambitious ones. The lever (visual ambition) is right; the guardrail (don't ship broken) needs to bite harder.

### Consensus for v13 + the pivot
- v13 = lean L2 fix (7 families + §4.5 + ambition reinforcement + tradition broaden). Honest: won't fully break C16 (L2 partly, L3 not at all).
- **Headline recommendation: pivot to controlled experiments** (same-model-twice, cross-family, prompt-hold v12-vs-v13). The benchmark has squeezed the prompt dry; the open question is model-vs-prompt, which only experiments answer.
- Falsifiable R010: craft share drops but not to zero under v13; if a frontier model still ships glass, L3 confirmed and prompt is exhausted.

---

## v12 Merge (v11 + Creative-v0) — parallel expert read of the operator's "2026 Creative Battle Prompt"

Source: operator-proposed alternative prompt. Operator chose "merge into v12."

### Expert-role findings (parallel)

**LLM Benchmarking Lead (lead)**
- grep of the proposed prompt: exploration/walking-sim/atmosphere/discovery ~25 mentions vs action/arcade/strategy ~3 (strategy 0; combat/enemies/victory only as negatives). → predicted **C16 (atmospheric walking-sim convergence)** if adopted as-is. Same named-instance-attractor mechanism as C15, scaled from verbs to genre families.
- Decision: MERGE. Extract strengths, re-balance form guidance, keep v11's negative-space rule, keep rubric judge-side.

**Game Designer**
- The "why does this experience need to exist in interactive form?" contest question is the best anti-convergence device yet — stronger than the cliché-avoidance lists. Make it the north star AND a required README paragraph.
- Re-balance §2: all forms coequal; explicitly name a shallow walking-sim as a failure equal to a shallow arcade game. This is the anti-C16 move — de-privilege exploration without banning it.

**Graphical / WebGPU Lead**
- Creative-v0's visual-ambition push (WebGPU/volumetric/reflections/color-scripting/procedural geometry) is the C13 lever the operator has wanted for 8 rounds. KEEP it — but note: these are *craft techniques*, not *concept instances*, so they do NOT trigger the C15 attractor. Safe to enumerate.
- Keep the ambition-theater guardrail (CEIL-8) — more visual push = more broken-3D risk.

**Limited-Surface / Magician (reliability)**
- Refuse to drop the robustness gates (no-drone, pause-freeze, CEIL-9 whiteout, corrupt-localStorage, track-disclosure) — Creative-v0 was lighter on these. They stay.
- Refuse to embed the 12-category rubric in the agent prompt (§6.2 checklist-gaming). Keep it judge-side.

**Visual Creator**
- §4.3 additions (coherent art direction over generic primitives) directly attack "paper-cutout." Discovery/atmosphere now first-class in the rubric (G5/G7/V8/M8 + A) via §2.10 mapping.

### Consensus for v12
Merge = keep v11 spine + negative-space; add Creative-v0's visual ambition + format freedom + WHY_INTERACTIVE; re-balance §2 so no genre is privileged; rubric stays judge-side. Falsifiable R009 prediction: visual ambition rises (attacks C13) AND no walking-sim convergence (C16 avoided). Size now 25.8 KB — highest ever; watch for overreach (R003 size risk).

---

## Round 008 (v10 → v11) — parallel expert read of the v10 battle log

Source: operator-pasted v10 battle log (qwen3.6-27b + hidden model, **no opus in pool**). Operator: specimba.

### What happened
Both agents shipped the **same crane/pendulum-damping game** (hidden-model **SLEW** + qwen3.6-27b **IRON SKELETON**). Both notebooks copied *"damp a swinging load"* verbatim from v10's own §1.4/§4.4. Both notebooks ALSO crossed out *"entire sonar/frequency/radio family"* — so v10's C14 fix worked. The §4.4 principle worked; the concrete *examples* were the contaminant.

### Expert-role findings (parallel)

**LLM Benchmarking Lead (lead this round)**
- This is the registry's most important entry. C15 is the **first cluster proven caused by the prompt's positive examples**, not its avoid-list. The five-cycle arc (C11 avoid-list → C12 completeness → C13 visual default → C14 audio priming → C15 positive examples) is now a proven invariant: **named instances are attractors**, positive or negative.
- The no-opus pool is the key variable: below-frontier models copied the prompt phrase *verbatim, both agents, same round*. Cleanest evidence yet for R005 §5 (pool-bounded concept diversity). Frontier models diverged in prior rounds; their absence here made the convergence total.

**Game Designer**
- The §4.4 situation-vs-sense principle is correct and should stay. The failure was illustrating it. *Show, don't name* — but in a prompt you can't show without naming, so the only safe move is to **describe the structural property and name no instances** (negative-space principle).
- Honest caveat to record: even with examples gone, the cited craft tradition (Swink "predictable simulated space", Vlambeer) structurally favors physics-feel verbs — crane recurred R006/R007/R008 for that reason too, not only the examples. v11 removes the instance-level copy; a category-level craft/physics pull may persist (a v12 question: diversify the cited design voices beyond physics-feel).

**Graphical / WebGPU Lead**
- Not a visual round. Both games were Canvas-2D industrial. No new render defects. v9 §4.3 / CEIL-9 work from prior rounds stands. No action.

**Limited-Surface / Magician (reliability)**
- Both games shipped and ran (no whiteout, no level-cliff reported this round) — the R007 self-QA lines are doing their job. No new reliability gates needed.

**Visual Creator**
- Distinguish instance-convergence (v11 fix) from category-convergence (residual). Don't let the crane finding be misread as "the prompt told them to use Canvas 2D" — it told them the *verb*, not the *look*.

### Consensus recommendation for v11 (narrow, targeted, guardrailed)
1. **Remove every named concrete concept from §1.4 and §4.4.** Keep the situation-vs-sense principle; delete the example phrases ("damp a swinging load", "forge metal / Heat-and-metal", "Weight-and-balance", "Growth-and-decay", "Debt-and-trust", "cut a rot").
2. **State the negative-space rule explicitly** to the agent: "this prompt deliberately gives no examples because examples cause convergence" — so the absence reads as intentional craft, not an omission.
3. **Register C15** in §6.5 with the verbatim-copy evidence + the five-cycle arc.
4. **Add regression guards** to BATTLE_2_ENTRY Part 5 that *fail* if "damp a swinging load" / "Heat-and-metal" ever reappear in the prompt.
5. **Do NOT** re-introduce named concepts to "help" agents; do NOT add a new CEIL; do NOT touch the working avoid-list (it is defensive and proven in R008).
6. **Falsifiable prediction for R009:** no two agents ship the identical concept from a shared phrase (there are none). A residual physics-feel *category* pull is expected and acceptable; identical-*instance* copy is the failure mode v11 targets.

### What v11 deliberately does NOT do (anti-spiral)
- Does NOT diversify the cited craft tradition yet (that's a v12 question if category-pull persists in R009).
- Does NOT remove the §1.4 avoid-list (defensive, working).
- Does NOT add scaffolding to compensate for "no examples" — the absence is the point.

---

## Round 007 (v9 → v10) — parallel expert read of `freecreationlogs8.txt`

Source: `logs/game-log-8.txt` (v9 prompt + 8 model sessions, 2 battles). Operator: specimba.

### Games observed + operator verdicts (Round 007)
| Battle | Model (blind/known) | Game | Operator verdict (verbatim) |
|:--:|---|---|---|
| B1 | gemini-3.6-flash | AETHER DRIFT — 2.5D sky-ship vs leviathan | *"low effort… top view 2d xy axis ship firing shitty thing looks like paper pieces"* |
| B1 | **korrine (hidden)** | THE IRONWRIGHT — blacksmithing (heat/mass/quench) | *"detailed forgery game but gamification layers and whole wanting to play interest is very low"* |
| B2 | inkling-medium | Chronos Weave — particle-through-8-levels puzzle | *"failed blank page again"* |
| B2 | **korrine (hidden)** | UNDERSTORY — fungal/mycelial strategy | *"most interesting idea creation so far… bugs at level 2 I cannot passed… better than paper sheet graphics"* |
| B3 | claude-haiku-4-5 | (conveyor solver — did not ship) | *"bullshit no game there"* |
| B3 | inkling-low | Orbital Drift — orb collector | *"at least inkling created something animation like thing"* |
| B4 | claude-opus-5-max | wave-equation coastal sim (WebGL2) | *"very creative and graphically interesting… buggy inverted y axis… wave mechanics and mathematics"* |
| B4 | **korrine (hidden)** | SOUNDING — sonar descent | *"graphical but also buggy… hit mine it explodes like atom bomb and screen left white while game trying to continue… literally got blind after hit bomb"* |
| B5 | claude-opus-5-high | container/crane lift-and-balance | *"fluent and enjoyable, still first era of smartphone games but good mechanics"* |
| B5 | inkling-small | Resonance: Echoes of the Hollow — crystal **frequency** tuning | *"inkling nonsense… we finally matching same ideas over again… prompt need creativity and bias prevention updates"* |

### Expert-role findings (parallel)

**Game Designer**
- The strongest games of the round (IRONWRIGHT, UNDERSTORY, SOUNDING, opus5-max wave sim, opus5-high crane) all have *verbs-about-the-world* (forge metal, cut rot, ping rock, damp a load). The convergent/weak ones (AETHER DRIFT, Resonance) are *verbs-about-a-sense*. That is the design lever — not "be creative," but "pick a verb that acts on a situation."
- New ship-blockers this round: (a) a full-screen explosion whiteout that never decays (SOUNDING mine), (b) a level-2 difficulty cliff (UNDERSTORY / IRONWRIGHT), (c) inverted Y-axis (opus5-max). All three are cheap to add to self-QA.

**LLM Benchmarking Lead**
- C14 confirmed across ≥2 rounds and ≥4 models (log4 sonar-design-note + sonar build; R006 gemini "Static & Cable: Signal Operator"; R007 opus5-max wave / korrine SOUNDING / inkling-small Resonance). Far exceeds the §6.5 "two independent same-round observations" bar.
- Operator asked the same question two rounds running → this is operator-confirmed, not analyst-diagnosed. R006 §5 ("don't correction-spiral; narrow targeted change with anti-recurrence guardrails") applies: v10 must be v9 + a narrow de-escalation, not a rewrite.
- Falsifiable prediction for R008: if audio priming is de-escalated AND the §1.4 list adds the sound family, sound/sonar/frequency theme-share drops materially. If it does NOT drop, the honest finding stands (R005 §5): concept-diversity on this pool is pool-bounded, not prompt-tunable.
- Bias vector worth naming: "audio-as-concept priming" — the brief mentions audio as a deliverable, so agents pick sound-themed concepts. Goes in §6.2.

**Graphical / WebGPU Lead**
- v9 §4.3 (retro-visuals trap) PARTIALLY WORKED: opus5-max wave sim + korrine SOUNDING both read as "graphically interesting" — first time in the whole battle log that operator praise included the word *graphical*. So §4.3 raised the ceiling for frontier-tier models. C13 is *partially moved*, not failed.
- But opus5-high still shipped "first era of smartphone games" — §4.3 is a frontier-model-only lever, exactly as R006 §6 predicted. Do not over-claim §4.3 success.
- New render defect: additive blowout → white screen (SOUNDING). This is a real *rendering-robustness* failure that V6 already gestures at ("no white screen") but nobody had hit until now. Worth a hard ceiling (CEIL-9): a full-screen effect that does not decay and occludes the playfield is functionally a soft-lock of the visual channel.

**Visual Creator**
- The convergence is on *theme*, not *look*. v9 fixed look for some models; v10 must fix theme for all. Don't conflate the two in the revision.
- The §1.4 cross-out list is the right vehicle, but it must name the *family* (sonar/frequency/radio/radar/echolocation/wave-as-mechanic), not just "sound," because the cluster spans all of those words (confirmed by grep across logs 4–8).

**Limited-Surface / Magician (reliability gates)**
- Cheap, high-value self-QA additions, all hit this round: (1) full-screen effect must decay to readable in ~1s; (2) axis not inverted; (3) every shipped level beatable by honest play, not just level 1.
- Hidden-model attribution: operator "do not know which model this is" about korrine — already covered by §6.6 (fingerprint is ground truth), but log an ATTRIBUTION gap for the round.

### Consensus recommendation for v10 (narrow, targeted, guardrailed)
1. **De-escalate audio priming.** Audio = feedback layer + robustness gate, NOT a concept. Remove "Add sound" as a session deliverable step. Add the explicit line: do not pick a sound/sonar/frequency/radio/radar game because the brief mentions audio.
2. **Add the sound/sensory-modality family to the §1.4 agent-visible cross-out list** (first time a cluster is both agent-visible AND judge-side-registered — justified because the operator explicitly asked for the audio lever).
3. **Add §4.4 "The sensory-modality trap"** — the mechanism (modality collapse) + the remedy (pick a verb-about-the-world, not a verb-about-a-sense). This is the anti-recurrence guardrail: it teaches the meta-pattern so de-escalating audio does not just move the collapse to haptics/smell.
4. **Register C14** in the judge-side §6.5 registry with R006+R007 evidence.
5. **New defect classes / ceilings:** CEIL-9 (persistent visual occlusion / unrecovered whiteout); broaden CEIL-5 + M4 to "level-2+ cliff that blocks all progress"; INPUT inverted-axis note.
6. **Self-QA:** 3 new lines (whiteout decay, inverted axis, every level beatable).
7. **Files (canonical fold-back set):** `challenge/BATTLE_PROMPT.md` (v9→v10), `challenge/DEVELOPER_SELF_QA.md`, `benchmark/02-scoring-rubric.md` (CEIL-9, CEIL-5 broadened), `benchmark/04-defect-taxonomy.md`, `benchmark/06-anti-bias-anti-gaming.md` (C14 + audio-bias row), `BATTLE_2_ENTRY.md` (v10 greps/ceiling), `README.md` (battle-log + R008 plan), `battles/round-007-after-action.md` (new), `expert_team/ORCHESTRATION.md` + this file.

### What v10 deliberately does NOT do (anti-spiral)
- Does NOT ban sound games outright (escape hatch: a transformative sound game can still win).
- Does NOT add a hard CEIL for retro-visuals (C13 stays a soft note — R006 §9).
- Does NOT rewrite §1 craft method or §2–§3 gates (working).
- Does NOT prescribe a stack or genre.

---

## Round 006 (v8 → v9) — prior consensus (preserved for context)
- Game Designer: visual identity must sustain across full run; primitive-shape builds cap V0 1–2.
- LLM Benchmarking Lead: V6/V7 make visual quality auditable; no score embedding / env sniffing.
- Graphical/WebGPU Lead: WebGPU→WebGL→Canvas2D graceful degradation is the reference; React owns menus, Canvas owns sim.
- Limited-Surface/Magician: mouse events via real mouse; audio nodes explicitly stopped; no unmanaged WebAudio sources.
- Visual Creator: layered lighting, fog, procedural textures, cohesive palette — demonstrate without 3D assets.
- Consensus: reference starter must include graceful fallback, React/Canvas separation, 2D procedural art identity, hard mouse/audio hygiene. (v9 §4.3 operationalized the visual part.)
