# v19 Merge Blueprint — one synthesized prompt from the deep analysis

**Input:** `benchmark/prompt-lineage-deep-analysis.md` (the section-by-section
investigation + verdicts). This blueprint converts it into an executable decision: exact
edit list, the new prompt draft, scoring/metrics additions, and the experiment design.
**Status:** draft for operator review — NOT the live prompt until approved.

---

## A. What we are NOT doing (equally important)

1. **Not adding C19/C20 to the warning list.** R011 proved guards can't name future
   clusters; adding "no sprout games / no 4X grids" would (a) make them attractors, (b)
   tax every agent's concept space, (c) be obsolete in one round. The convergence note
   stays at the three named families.
2. **Not deleting v18's engineering block.** It raised real code quality and powered
   glm-5.3's best-in-round 4X. It gets *demoted and re-sequenced*, not removed.
3. **Not growing the prompt.** Target 5.5–6.5 KB — the v16/v17 size. If the draft exceeds
   it, cut warnings before cutting generative content.
4. **Not re-litigating R010/R011.** Their conclusions are locked (ambition-permission +
   load-bearing guards + model variance).
5. **Not pretending one prompt fixes reliability.** Reliability needs the M-6 gate +
   "play it yourself" enforcement + the runtime verifier plane (Track E/verifier docs),
   not just prose.

---

## B. Exact edit list (v18 → v19)

| # | Section | Action |
|---|---|---|
| 1 | Title/framing | Keep. v19. |
| 2 | Opening ambition paragraph | Keep verbatim (proven generative core). |
| 3 | WHY_INTERACTIVE question | Keep, **plus** one sentence forcing the player's decision/tension: *"name the decision the player keeps making, and the tension that makes it interesting."* |
| 4 | 7-family menu | Reword "systemic": *"systemic — a world whose rules respond to you with consequences you can feel"* (anti-"balanced machine" reading). Others unchanged. |
| 5 | Materials+light recipe | **Replace** the MeshPhysicalMaterial/clearcoat/iridescence/transmission block with a de-recipe'd craft tip: *"Make it look considered: light, material, texture, composition, atmosphere — a coherent stylized look beats an unfinished fancy one. The technique is your call (this includes, if your stack supports it, physically-based materials — but only what you can finish end-to-end)."* |
| 6 | NEW §: **The game comes first** | Insert after the families: player's sentence rule + "no sim without a game" rule (text in §D). |
| 7 | Convergence soft-note | Keep the 3-family note; append the "not banned / why it exists" reframe (1 sentence). |
| 8 | Engineering block | Keep domain-notes/mini-contract/six invariants/self-test **verbatim**, but move it BELOW the game-first gate and add invariant 7: *"the simulation serves a game — every system maps to something the player decides, risks, or feels."* |
| 9 | Hard rules | Keep 7 rules; **tighten #4** (audio) with "no sound can exceed a sane level; test with headphones off"; **add a new rule** (or fold into #1): *"You must actually play your own build once, end to end, as a player, before delivering. If you cannot play it, do not deliver it."* |
| 10 | Self-QA list | Reword from self-report to code-checkable: replace "run this list" with the **play-through gate** + explicit "state in the README exactly what you verified by playing (not 'should work')". |
| 11 | Deliverables | Keep; HONEST_SELF_ASSESSMENT must now answer "what did you actually play-test, and what broke?" |

---

## C. Scoring/metrics additions (judge side, so the prompt can be held honest)

1. **New tracked metric M-6 — "is it a game"** (fun/goal/agency/challenge/readability),
   scored by the jury from the artifact. Formalize in the rubric as a **gate criterion
   pair**: gameplay-loop must have a *visible goal*, a *real obstacle/fail state*, and at
   least one *decision with tradeoffs* (rubric G2/M5/F6 anchors). A "simulation that runs
   correctly but is not a game" cannot score above the low band on G/F/M, no matter how
   good T/V are. (This makes the R014 "enjoyment 0" failure *scoreable* instead of
   anecdotal.)
2. **Cluster tracking:** register **C19 (grow/sprout/network-life)** and
   **C20 (infrastructure/4X/energy-grid)** in `benchmark/06` §6.5 as *judge-side
   observations* (soft-note only, per the V0 cluster logic) — with the explicit note that
   the prompt deliberately does NOT name them.
3. **Reliability measurement:** keep defect taxonomy; the S4a runtime-soak/experience
   endurance split (v2) gives the "is it actually playable for an hour" signal that the
   R013/R014 bug wave needs.

---

## D. New prompt draft (v19 CORE) — the changed sections only

> Full draft assembled from v18 + edits below (only the delta shown here; unchanged
> sections are elided as "[keep v18 §…]").

**§ After the WHY_INTERACTIVE question, before the families:**

> Before you write any code, write the **player's sentence** — one sentence answering:
> *what is the player trying to do, what can stop them, and what makes it fun?* If the
> sentence is about systems that run rather than choices a person makes, you don't have
> a game yet. **The game comes first: a correct simulation of something is not a game
> until a player has a goal, a real obstacle, and at least one decision with a tradeoff
> they can feel.** Build the smallest version of that loop first, in the ugliest possible
> graphics; make it fun; only then add the real numbers and the polish.

**§ Materials line (replacing the recipe):**

> Make it look considered. Light, material, texture, composition, atmosphere — a
> coherent stylized look beats an unfinished fancy one, and deliberate minimalism with
> real polish beats both. The specific technique is your call; if your stack supports
> physically-based materials, they are one way among many, and only worth it if you can
> finish them end-to-end on a fresh load.

**§ Convergence note (append):**

> These notes exist because this benchmark has watched a lot of rounds, not because the
> listed things are bad — a genuinely great game in any of these families can still win.
> They are here to make you look twice at your first instinct, then trust your judgment.

**§ Engineering block (moved below game-first; invariant 7 added):**

> [v18 block verbatim: domain notes, mini-contract, six invariants]
> 7. **The simulation serves a game.** Every system you build must map to something the
>    player decides, risks, or feels. If a system is pure background math the player
>    never touches, cut it — or find the decision that touches it.

**§ Hard rules — add:**

> **Play your own game.** Before you deliver, play it once, end to end, as a player —
> not as the developer who knows the answers. If you cannot play it, or you do not enjoy
> the run you just played, do not deliver it; fix it first. In the README, say exactly
> what you verified by playing (fresh load, one full run, restart) — not "should work".

---

## E. Experiment design (how to validate v19)

Per the benchmark's own discipline (R010/R011/R013), run a **controlled 3-arm
comparison** on the visually-capable workhorse pool:

```
ARM A: v17 (live today)
ARM B: v18 (held engineering block)
ARM C: v19 CORE (this blueprint)
same model set (e.g., claude-opus-5-*, glm-5.3-max, gpt-5.5-high, gemini-3.x-flash,
grok-4.6) — balanced across arms; ≥3 sessions per arm
```

Measure (pre-registered):

| Metric | How |
|---|---|
| M-1 ambition | stack-mentions (3D/WebGL/WebGPU) + jury visual |
| M-4 reliability | launch/blank/audio/controls defect rate (defect taxonomy) |
| **M-6 "is it a game"** | jury: goal/obstacle/decision present? (new) |
| fun/jury pairwise | human pairwise quality (benchmark/01) |
| convergence | concept-cluster counts (C14/16/18/19/20) + cluster entropy |
| code-quality | rubric T7 + engineering markers (seeded sim, self-test) |
| wall time / tool calls | efficiency |

**Success criteria:** v19 ≥ v18 on M-6 and fun WITHOUT losing M-1 or T7; v19 ≥ v17 on
reliability. If v19 loses M-1 → the craft-tip de-recipe went too far (restore recipe as
an *optional appendix*). If v19 loses M-6 → the game-first gate needs teeth (move it
into the hard rules). Either failure is informative.

---

## F. After approval — the concrete commits

1. `challenge/BATTLE_PROMPT_v19_CORE.md` — full assembled prompt (v18 base + §D edits).
2. `challenge/BATTLE_PROMPT.md` — remains v17 until the 3-arm experiment resolves.
3. `benchmark/06-anti-bias-anti-gaming.md` — register C19/C20 (judge-side notes).
4. Rubric/`02` — formalize M-6 gate wording (G2/M5/F6 anchors) if approved.
5. `README.md` battle-log row: R015 plan (3-arm v17/v18/v19).
