# Prompt Lineage Deep Analysis — v10→v18 & the last experiments (R007–R014)

**Purpose:** the section-by-section, experiment-by-experiment investigation of the recent
prompt lineage and the last controlled/free runs, leading to one synthesized v19/v20
prompt. This is the *evidence* document; the executable outcome is
`benchmark/19-prompt-merge-blueprint.md` and the new prompt itself once approved.

**Sources read for this pass:** logs 10–13 (R010–R014 sessions + operator verdicts),
`round-010/011/012-after-action.md`, `v12-merge-design.md`, `v15-stability-review.md`,
`regime-deep-dive.md`, `fable-showcase-deep-dive.md`, `claude-of-tanks-deep-dive.md`,
`expert_team/CONSENSUS.md`, and the prompt files v14→v18 (+ v13 reconstructed from log10).

---

## 0. The blunt bottom line from R013/R014 (log13 verdicts)

Read every operator verdict in log13. The recent experiments did NOT keep R012's quality.
Row by row:

| Pair | Result (verbatim essence) |
|---|---|
| qwen3.8-flash-next vs claude-opus-5-max (v17) | "both made great game… opus won with 3d success" — **the round's high point** |
| kimi-k2.5-thinking vs grok-4.5 (v17) | "both shitty… grok made sprouting game, isn't that strange we face this too common now?" |
| inkling-small-low vs deepseek-v4-flash-vision-exp-high (v17) | "inkling… same 2-button shitty game ×3 retries… deepseek… moderate but it is a game eventually" |
| gemini-3.5-flash vs deepseek-v4-pro-max (v17) | "both shitty… gemini nearly made me deaf… audio blast… deepseek bugged, mouse-drag breaking the game" |
| deepseek-v4-flash-vision-exp-low vs qwen3.8-flash-next (v17) | "deepseek useless… qwen again sprout network… I cannot find how they affected… maybe mesh wording?" |
| claude-opus-5-medium vs gemini-3.6-flash (v18) | "gemini tried 3d space ship… controls bugged unplayable again. Opus… city energy control resource sim… very strange and creative… not that much enjoyable" |
| claude-opus-5-medium vs qwen3.8-flash-next (v18) | "gpt made finished game but boring… claude another 4x energy-gen sim… I cannot move/achieve… enjoyment near 0… claude won" |
| gemini-3.6-flash vs deepseek-v4-pro-max (v18) | "gemini classic: 3d submarine strange controls… qwen detailed engineering bridge thing… creative but not enjoyable" |
| grok-4.6-xhigh vs gemini-3.5-flash (v18) | "both creative but not working as a game, bugs + bad graphics" |
| gemini-3.7-flash vs hy4-preview (v18) | "both shitty… hy4 blank-blue at menu… gemini blasted sounds, nothing to play, buggy" |
| gpt-5.5-high vs claude-opus-5-max (v18) | "gpt nonsense 0 enjoyment… claude energy grid sim again… interesting graphics… gamification layer missing, unclear challenge… winner by default" |
| qwen3.8-max vs gemini-3.6-flash (v18) | "gemini being gemini (images unused, nonsense)… other graphically low but complex successful mechanics, at least a game" |
| glm-5.3-max vs muse-spark (v18) | "muse couldn't make anything (bug). **glm-5.3 nearly created a new genre: populating 4X simulation with simple but mindful 3D planet usage — the latest best creation after all the nonsense**" |

**The diagnosis writes itself:**
1. **R012's quality collapsed in R013/R014.** Under both v17 and v18, most builds were
   operator-rated shitty / boring / buggy / not-a-game. Only a handful cleared
   "actually a game": opus-5-max's 3D (×1), qwen's aesthetic 2D (×1), glm-5.3's 4X
   planet-population sim (the round's best — with graphicallly simple mindful 3D).
2. **v18 did NOT produce the R014-quality leap it promised.** The engineering discipline
   produced *architecturally sophisticated, emotionally empty* simulators ("enjoyment
   near 0," "no gamification layer," "unclear challenge"). The domain-notes/self-test
   method made agents *better at building simulation engines* — and worse at building
   games.
3. **A new unnamed cluster emerged — C19: "grow/sprout/network life" sims** (grok-4.5
   sprout, qwen3.8 sprout-network ×2, plus r12's qwen "sting/corals"…). The operator
   explicitly couldn't find the cause ("maybe mesh wording?").
4. **Reliability REGRESSED**: unplayable controls, mouse-drag breaks, deafening audio
   blasts, blank screens, sessions that won't start (muse, inkling ×3 retries), broken
   menus. The self-QA list (kept from R012) did not hold.
5. **v18 "4X/energy-grid" convergence is the loudest new signal:** opus-5-max shipped
   energy-grid sims in THREE separate sessions; gpt-5.5's "energy grid" too. Same
   category as C16 craft/sim, but "grid/infrastructure/balance" flavored — see §5.
6. **gemini's failure mode is consistent and specific:** makes images, never uses them,
   plays "strange menu + nonsense," buggy controls, audio blasts. A model-level trait.

**The pattern that unifies ALL of it:** agents under v16→v18 learned to make *systems
that run* but lost the *game* — the fun, the challenge, the readability, the "what do I
actually DO and why do I care". R012 succeeded *despite* the recipe because the material
gallery games had tight physical verbs. v17/v18's "be ambitious + be an engineer"
recruited the frontier models' strongest skill (architectural systems) toward their
weakest outcome (joyless simulators).

---

## 1. The lineage at a glance (v10 → v18)

| Version | Size | The change | Experiment evidence |
|---|---|---|---|
| v10 | ~? | +§4.4 sensory trap + audio de-escalation (post-C14) | R007 |
| v11 | ~? | Removed ALL named positive examples (negative-space) | R008 (C15 caused by v10's examples) |
| v12 | ~? | v11 + "situation not sense", broadened families; craft recipe wording | R009 — **C16 craft: recipe wording WAS the bug** |
| v13 | ~29 KB | Cautious giant: design-pillars, MDA/Swink/Vlambeer lectures, §4.1-4.5 trap essays, "no examples anywhere", 7 families, avoid-lists | R010/R011 — **over-caution suppresses ambition** (13× less 3D); traps load-bearing |
| v14 LEAN | ~2.6 KB | Permissive, no apparatus | R010 — unleashed WebGPU 3D **but C14 returned** |
| v15 HYBRID | ~2.8 KB | LEAN tone + C14/C16 guards | R011 — ambition ✓; **reliability ✗ (M-4)**; C17 (killer mystery) under full guards |
| v16 | ~4.9 KB | Materials+light teaching + MeshPhysicalMaterial + receipts + self-QA list + 7 families | R012 — **best round ever: M-1/2/4/5 pass**, "no flaws" first time; C18 (gravity/space) unprimed; C16 glass ×3 (accepted) |
| v17 | ~5.1 KB | v16 + ship→deliver micro-test + C18/C16 soft steers | R013 (log13 part 1) — quality collapse, C19 sprout |
| v18 | ~6.9 KB | v17 + engineering-discipline block (domain-notes, mini-contract, 6 invariants, self-test) | R014 (log13 part 2) — still no quality leap; joyless 4X/grid sims |

**Kernel insight:** every fix was a *reaction to the last cluster* — and the prompt grew
by accretion of warnings. The prompts that worked (v15's tone, v16's materials recipe)
were *generative additions*, not *warnings*. v17/v18 are v16 + warnings + engineering —
and the warnings/engineering crowded out the generative core.

---

## 2. Section-by-section evidence ledger (v17/v18, the live prompt)

What each section actually did, with the log evidence:

### § "Be ambitious and trust your own taste" + 7 families (v16→v18)
- **Effect:** mostly good — glm-5.3's 4X planet sim and opus-5-max's 3D emerged from
  ambition-permission. The 7-family menu demonstrably helps *some* models navigate
  (glm-5.2 R011: "crossed out sonar/craft… picked social+choice").
- **Cost:** "physical/systemic" family wording keeps funneling agents into systemic
  simulations (the 4X/grid cluster — they read "systemic = a machine you nudge" as
  "build an infrastructure simulator").

### § Materials + light recipe (the v16 magic, still in v17/v18)
- **Effect:** The single most successful teaching ever added (R012: PRISMA materials
  gallery, glass 3D, "graphically acceptable"). Still producing: glm-5.3's "mindful 3D
  planet", opus energy-grid "interesting graphics".
- **Cost in v17/v18:** The recipe (MeshPhysicalMaterial/clearcoat/iridescence/
  transmission + "look comes from light on material") is *implementation detail
  vocabulary*. For weaker/faster models (gemini-flash, kimi) it becomes **material
  theater**: "strange menu + pretty shaders + no game" (the "nonsense with nice
  materials" builds). The advisory's §16 was right: it's a positive attractor AND a
  scope-trap for non-frontier models.

### § The 3-patterns soft-note (sonar/gravity-craft, added v17)
- **Effect:** C14 held (zero sonar in R013/R014 ✓). C18/C16 partially steered — no pure
  spaceship-pilot games, BUT craft-adjacent sims (glass/hive) still appeared and the
  *grid/infrastructure* sibling emerged. Soft steers: real but leaky.
- **The sprout/C19 gap:** the note names three families; it cannot name the fourth, and
  the mechanism (terminal statement of R012) means a *new* cluster always arrives. C19
  arrived within ONE round of v17 — "grow/spread/root/network-life" games ×3 (grok sprout,
  qwen sprout ×2). The operator's "mesh wording?" guess is plausible but unprovable
  (v17 says "materials… mesh… procedural worlds"); more likely it's the *current default
  corner of the shared prior* after craft/space/sound were steered — the same mechanism as
  C17/C18. **The prompt cannot win the cluster-whack-a-mole by naming more clusters.**

### § The hard-rules list + "run this list before you deliver" (self-QA, v16+)
- **Effect:** R012's PRISMA self-debugging proved the list CAN work. But R013/R014 shows
  it does not *enforce*: models self-report passing ("verified controls") while shipping
  broken mouse-drag, audio blasts, blank screens, unstartable sessions. **Self-reported
  QA is not QA.** Agents that actually load-and-click (opus-medium's careful runs) still
  miss gameplay-brokenness. The list needs *objective, runnable checks*, not more
  self-persuasion.

### § v18's engineering block (domain-notes + mini-contract + 6 invariants + self-test)
- **Effect — architecture: clearly positive.** gpt-5.5 and opus-5-medium produced
  domain-grounded, fixed-step, seeded, self-tested sims (grid swing equation, coral
  NOAA thresholds, bee overwinter numbers, glm's 88-season/22-year 4X with self-tests).
  Code quality and "real data" visibly up. Mini-contract held (gpt: "Architecture
  (mini-contract held exactly)").
- **Effect — game: clearly negative.** The same builds are "boring," "enjoyment 0,"
  "no gamification layer," "cannot move/achieve anything," "unclear where the challenge
  is." The engineering block teaches *simulation fidelity* but NOT *game design*: nothing
  tells the agent to design a *fun loop with a visible goal, decisions with tradeoffs the
  player can feel, and a challenge curve*. Real data ≠ game. **This is the single biggest
  lesson of R014.**
- **Caveat:** glm-5.3's best-in-round 4X (which used domain numbers + simple mindful 3D)
  shows the method can feed a *real game genre* — 4X has goals, choices, challenge. The
  difference between glm-5.3 and opus's energy-grid: glm built a *game with a win
  condition and player agency*; opus built a *simulation to watch*.

### § The deliverables/README block
- Consistently followed (TRACK lines, receipts, pillars). No change needed except adding
  the GAMEPLAY-first checklist item (see blueprint).

---

## 3. What the controlled experiments actually proved (R010/R011 — do not re-litigate)

1. **Over-caution suppresses ambition — PROVEN** (R010: LEAN 13× more 3D, first WebGPU
   3D game; v13 herded Grok into static visual novels).
2. **The convergence apparatus is load-bearing — PROVEN** (R010: C14 returned verbatim
   the moment LEAN removed guards). The FABLE deep-dive's "misdiagnosis" claim was
   refuted by R010's own data.
3. **Guards rename convergence, they don't remove it — PROVEN** (R011: C17 "who is the
   killer" appeared under FULL guards, two models, same round).
4. **Model differences are real and large** (Grok ≫ Sonnet on visuals; gemini-flash has
   a specific image-make-but-ignore failure; DeepSeek/muse reliability failures).
5. **Positive specificity = attractor** (v10's examples → C15; v12's "physical task
   wording" → C16; v16's materials recipe → PRISMA *and* glass-theater).
6. **Self-QA works only when the model actually runs the game** (R012 PRISMA vs R013/R014
   self-reported passes).

**Implication:** v19/v20 must (a) keep the *tone* (ambition-first, short, generative),
(b) keep the *proven guards* but as a compact steer, (c) add an *anti-simulator
gameplay gate* (the missing half), (d) make QA *runnable*, and (e) stop adding named
clusters.

---

## 4. R013/R014 metric reconstruction (v17/v18 vs R012)

| Metric | R012 (v16) | R013 (v17) | R014 (v18) | Read |
|---|---|---|---|---|
| M-1 ambition/visual | PASS (materials) | mixed (opus 3D win; much "nonsense") | mixed (glm 3D 4X best; hy4 blank) | visual teaching alone ≠ game |
| M-2 C14 (sonar) | PASS | PASS (steer held) | PASS | soft steer durable |
| M-3 convergence | FAIL (glass, accepted) | FAIL (C19 sprout ×3 + grid seeds) | FAIL (4X/energy-grid ×3+; hive; sprout echoes) | whack-a-mole continues; **the prompt must stop trying to fix it and the JUDGE must score novelty** |
| M-4 reliability | PASS (first no-flaws) | FAIL (buggy/blank/audio-blast) | FAIL (unstartable sessions, blank menu, controls) | self-QA list insufficient; needs runnable checks + "did you actually play it" enforcement |
| M-5 fail-state/story | PASS | partial | partial (sims have fail states but no pull) | fail-state exists ≠ game |
| **NEW: M-6 "is it a game" (fun/goal/agency/challenge)** | implicit PASS (tight verbs) | FAIL (many) | **FAIL hard** (joyless sims) | **the missing metric — add to scoring** |

---

## 5. Cluster forensics for the new prompt

| Cluster | Rounds | Status | What the prompt should do |
|---|---|---|---|
| C14 sonar/radio/frequency | 6-10, 13 | steered (holds) | keep as a one-line soft note only |
| C16 tangible craft | 8-12, 14 | partly steered; glass/hive persist | keep one-line note; don't ban |
| C17 text-mystery | 11 | appeared under full guards | **nothing** (unnameable in advance) |
| C18 gravity/space piloting | 12 | steered (no pure pilot games R13/14) | keep one-line note |
| C19 grow/sprout/network-life | 13 | NEW — arrived within one round | **do not add a 4th named cluster** (proves the mechanism; naming just moves it) |
| C20 infrastructure/4X/energy-grid | 14 | NEW — opus ×3, gpt, glm, qwen-bridge, hy4-blank | **do not name; add the systemic→"system with a soul" gameplay gate instead** (see blueprint) |
| gemini's image-make-ignore-nonsense | 10-14 | model-specific trait | handled by M-6 gate + receipts honesty, not by prompt text |

**The only sustainable anti-convergence move left** (12-round terminal statement):
soft-steer the *known* three families in one line; then **stop**. Judge novelty
judge-side (already the design in rubric V8/M7/A6/S9); do not expand the prompt's
warning list — every expansion is a new attractor or a new tax.

---

## 6. The seven section-level prescriptions for v19/v20

1. **Kill the § "materials + light" recipe as a concept-funnel; keep it as an optional
   craft tip.** Replace the MeshPhysicalMaterial/clearcoat/iridescence block with one
   line: *"make it look considered — light, material, texture, composition, atmosphere;
   the specific technique is your call (a coherent stylized look beats an unfinished
   fancy one)."* Why: the recipe was the R012 magic for frontier models BUT it has become
   (a) an implementation-vocabulary attractor and (b) material-theater for weaker models.
   If it returns as a *craft tip* (not a recipe), frontier models still use it; weaker
   models stop pretending.
2. **Add the missing half — a "game first" gate (§ the game is not the sim).** Before any
   code: write the **player's sentence** — *"in one sentence: what the player is trying
   to do, what can stop them, and what makes it fun."* Then a **fun-first rule**: the
   FIRST playable version must make you *want one more run*; a simulation that "runs
   correctly" but has no goal, no choices that matter, no tension, no reward is a failed
   build no matter how real its numbers. (This is the R014 gap — engineer agents build
   simulators. It is also the C20 fix: 4X/hive/grid concepts are FINE if they're games —
   glm-5.3 proved it — but the prompt must force the game layer.)
3. **Keep the ambition-permission + 7-family menu** (v15/v16's generative core — glm-5.3,
   opus-5-max both used it well), but rebalance the menu wording so "systemic" reads as
   *"a world with consequences you can feel"* not *"a balanced machine"*.
4. **Make QA runnable, not self-reported.** Replace "run this list once before you
   deliver" with: *"play your own game once, end to end, as a player. If you cannot play
   it yourself, do not deliver it."* Add explicit **hard gates that are checkable in
   code**: console-clean, no `Math.random()` in sim (only seeded), audio has a mute that
   zeroes in one frame, mouse never soft-locks, no full-screen whiteout, and **the README
   must state exactly what you verified by actually playing** (not "should work").
5. **Keep v18's engineering block — but demote it below the game gate and tie it to the
   game.** Domain-notes/mini-contract/invariants/self-test stay (they raised code quality
   and glm's win). New order: (1) player's sentence + game-first, (2) THEN domain notes +
   mini-contract + invariants + self-test, (3) then "now make it FUN" polish. And add one
   invariant the engineer block forgot: **"the sim serves a game"** — every system must
   map to something the player decides, risks, or feels.
6. **One compact convergence note (3 families, one line) — and nothing more.** Keep the
   proven C14/C16/C18 soft-note as-is; explicitly do NOT add C19/C20. Add a final
   sentence that reframes WHY: *"these notes exist because of observed repetition, not
   because the listed things are bad — your job is a game you'd defend to a friend, in
   any family."* (This preserves the anti-attractor property while reducing the
   "cognitive furniture" tax R011 found.)
7. **Deliverables + receipts stay** (they're working), with two additions: the README's
   HONEST_SELF_ASSESSMENT must answer *"what did you actually play-test and what broke?"*,
   and WHY_INTERACTIVE is now explicitly required to name the *decision/tension* the
   player faces (glm-5.3's and the best R012 answers already do this — make it a gate).

---

## 7. Target shape of the new prompt (v19/v20 — for the blueprint)

```
[ambition-permission — keep, tightened: "modern, considered, finished"]
[7 families menu — keep, reworded: systemic = felt consequences, not a balanced machine]
[THE GAME FIRST GATE (new): player's sentence + "no sim without a game"]
[craft tip (materials/light) — optional, de-recipe'd; NOT a concept funnel]
[convergence note — 3 named families only, one compact paragraph, + "not banned" frame]
[engineering block — kept, DEMOTED below game gate, + invariant "sim serves a game"]
[hard rules — keep, add: "play it yourself once" + code-checkable gates]
[deliverables/receipts — keep, + playtest honesty + tension-naming WHY_INTERACTIVE]
```
Length target ~5.5–6.5 KB (v16/v17-sized; NOT v13-sized). Tone: v15/v16's permissive,
ambition-first — NOT v18's lecture tone.
