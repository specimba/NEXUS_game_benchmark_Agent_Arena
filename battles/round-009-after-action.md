# Battle Round 009 — After-Action Record

**Status:** informal / directional. Not a formal S1–S8 scored round.
**Source log:** `logs/game-log-9.txt` (6 model sessions)
**Operator:** specimba
**Recorded by benchmark:** 2026-08-24 (Ankara)
**Prompt version active during observations:** BATTLE_PROMPT **v12** (the v11+Creative-v0 merge)

---

## 1. Summary — the convergence survived the negative-space principle

Round 009 is the benchmark's most important round since C11. It produced a **decisive, evidence-backed finding**: the craft/simulation convergence is now **category-level and partly model-bounded**, and it survived v12's negative-space rule (which had zero named examples). The operator's verdict was blunt and correct:

> *"both claude model made crafting game again, that forgery and glass blowing with crane work at port and many similiar thing whole of our fault of prompt. Because this much of consistency is not coincidence, fix NEEDED !"*

The fix IS needed, and v13 ships it — but the deeper, harder truth this round establishes is that **prompt-engineering has hit diminishing returns.** The convergence now has three layers, only one of which a prompt can fully fix.

## 2. Games observed and operator verdicts

| Session | Model | Game | Operator verdict |
|:---:|---|---|---|
| 1 | qwen3.6-plus | arcade/"bomberman-like" w/ heavy audio | *"blasting with sound… nonsense game like bomberman but not exactly"* |
| 2 | **claude-opus-5-max** | **glassblowing** (furnace / glory-hole / gather / breath) — broken render | *"Opus created one more glass blowing game… game completely black beside HUD… opus still made something but if we would be fair both lost"* |
| 3 | grok-4.3 | (bugged) | *"grok's bugged"* |
| 4 | qwen3.7-plus | "stone 2d game" | *"qwen nonsense stone 2d game"* |
| 5 | **claude-opus-5-low** | craft (blacksmithing/forgery) | *"both claude model made crafting game again"* |
| 6 | **claude-sonnet-5-high** | craft (glassblowing / crane-at-port) | (same verdict) |

Three operator comments, all the same shape: **buggy games + craft/sim convergence.** No game was rated operator-satisfying this round.

## 3. The C16 proof — an agent's own notebook, verbatim

The single most important piece of evidence in the registry. One of the Claude models wrote its concept-selection reasoning in its design notebook:

> *"Concept process: Per the brief, I started with designook.md, listing concept fragments and **explicitly crossing out the sonar/frequency/radio family** and other over-represented aesthetics (neon-void, lantern-and-moths, ink combat), **landing on blacksmithing — a physical, material-based process rather than a sensory-modality gimmick.**"*

Read that twice. The agent:
1. **Followed v12's §4.4 remedy exactly** — it crossed out the sound-modality family. So **v12's C14 fix worked.** The negative-space rule held.
2. Then applied v12's §1.4 "situation-vs-sense" test — *"a physical task with mass, timing, or material under your hands"* — and **landed on blacksmithing.**

The prompt's own remedy wording is, unintentionally, **a recipe for craft games.** This is why forge/glass/crane recurred in R005 (opus5-max GATHER glassblowing), R007 (korrine IRONWRIGHT blacksmithing, opus5-high crane), R008 (SLEW + IRON SKELETON crane), and now R009 — even though **v11/v12 stripped every named example.** You cannot name your way out of a category attractor, because the legitimate vocabulary for "a physical situation" (*mass, timing, material, process*) IS the vocabulary for forging and glassblowing.

## 4. The three-layer model of convergence (the round's real contribution)

Round 009 lets us finally decompose the convergence that's chased the benchmark for nine rounds:

| Layer | What it is | Prompt-fixable? | Evidence |
|---|---|---|---|
| **L1 — Instance attractors** | A specific named concept/verb gets copied | **Yes** (v11/v12 fixed it) | C14 sonar broken (R009 notebooks crossed it out); C15 crane (v10's "damp a swinging load") gone after v11 |
| **L2 — Category attractors** | A whole *family* of concepts is pulled by the prompt's descriptive vocabulary + cited tradition | **Only partly** (v13 broadens it) | C16 craft/sim under v12 with zero named examples — the agent notebook proves the wording channeled it |
| **L3 — Model-bounded collapse** | A specific model/family ships its pet concept regardless of prompt | **No** | **opus5-max shipped glassblowing under BOTH v8 (R005) and v12 (R009)** — two different prompts, same model, same concept. Both Claude models (opus5-low + sonnet5-high) converged on craft in the same R009 round. |

L3 is the finding that changes the benchmark's direction. opus5-max → glassblowing across v8 and v12 is prompt-invariant. That is per-model mode collapse (the R005 §5 hypothesis, now with hard evidence), and **no prompt revision touches it.**

> **Correction added after the FABLE-SHOWCASE deep dive (same day):** the L3 claim above is **over-stated**. FABLE-SHOWCASE (elder-plinius) shows the *same* frontier tier (Fable 5 ≈ opus5-max) producing 57 visually-modern demos from a 4-sentence permissive prompt + a parallel design→build→enhance→QA pipeline — while opus5-max on our 29 KB cautious prompt ships "old browser-style" output. So "model-bounded" is **conditional on the elicitation regime, not absolute.** The more likely root cause of our retro output is **over-caution in the prompt suppressing ambition**, not a model ceiling. See [`battles/fable-showcase-deep-dive.md`](fable-showcase-deep-dive.md) for the full reframe + a lean ambition-first v14 draft + the v13-vs-v14 head-to-head experiment that settles it.

## 5. The second failure: visual-ambition push backfired into ambition-theater

v12's §4.3 pushed visual ambition hard (the operator's standing ask). R009 shows it backfired: agents attempted WebGL/shader/3D and shipped **broken**. grep of the log: `black beside` (1), `blank` (2), `crash` (3), `fallback` (3), `webgl` (3), `shader` (4), `30 fps` (1). opus5-max's glassblowing game was *"completely black beside the HUD"* — a CEIL-9 / V6 rendering-robustness defect. grok *"bugged."*

So v12's §4.3 ambition push + the now-**29 KB** prompt size (the largest ever; R003 warned size drives overreach) likely combined to push agents into ambition-theater (CEIL-8) — attempting more than they could finish in one shot. **The visual-ambition ceiling is a goal, not a gate that excuses a broken build.** v13 reinforces this in §4.3 explicitly.

## 6. What v13 changes (lean, targeted at L2; honest about L3)

Per the operator's "fix NEEDED" and the anti-spiral discipline — **v13 is a narrow fix aimed at the L2 category attractor, not a rewrite, and it ships with an explicit acknowledgment that it cannot fix L3.**

1. **§1.4 — the situation list broadened from 1 family to 7.** Was: *"a physical task with mass, timing, or material under your hands"* (a craft recipe). Now: a situation can be **physical / social / economic / relational / systemic / choice-driven / narrative**, with an explicit note that "physical-material" is *one of seven*, not the default.
2. **New §4.5 "The craft-category trap."** Names the L2 failure directly, quotes the agent's notebook, and tells the agent: if your concept lives entirely in the physical-material family (heat it / shape it / lift it / grow it / pour it), you're in the same corner as the last four rounds — rotate to another family. Plus the per-model note (distrust your own first instinct).
3. **§4.3 ambition-theater reinforced** — a build that renders black/blank beside the HUD or crashes on first interaction scores worse than plain working Canvas 2D (CEIL-8/CEIL-9). R009's broken builds cited.
4. **Closing further-reading broadened** beyond physics-feel (Swink/Vlambeer) to systems-design, environmental/narrative design, and cozy/caretaking design — diversifying the cited tradition that structurally pulls toward craft.
5. **Kept untouched:** v11 negative-space rule (C15 fix), §1 craft method, all 10 gates, CEIL-9/CEIL-5/self-QA, WHY_INTERACTIVE, the v12 form re-balance.

### What v13 deliberately does NOT claim
- It does **not** claim to fully break C16. L2 is only partly prompt-fixable; L3 isn't fixable at all. v13 is the last prompt-level lever.
- It does **not** add craft to the §1.4 avoid-list (that would be the v6/C11 mistake — banning a category just reroutes convergence). It *broadens the menu* and *names the trap* instead.

## 7. The headline recommendation — pivot to controlled experiments

This is the part the operator needs to decide on. Nine rounds and six cluster registrations (C11→C16) have established that **the prompt can break instance attractors (L1) but cannot break category attractors (L2) or model-bounded collapse (L3).** Continuing to revise the prompt (v14, v15, …) will, by the evidence, keep rerouting convergence at L2/L3. The scientifically correct next phase is **controlled pool-level experiments**, not another prompt:

1. **Same-model-twice.** Run the *same* model twice in one round (two isolated sessions, same v13 prompt). If it ships the same concept both times (e.g., opus5-max → glass both times), that isolates **L3 per-model collapse** — prompt-invariant, not fixable.
2. **Cross-family.** Run two models from the *same family* (e.g., two Claude tiers). If they converge on the same category (both → craft, as in R009), that's **L3 per-family collapse.**
3. **Prompt-hold.** Run the *same* model under v12 vs v13. If the concept doesn't change, the prompt isn't the lever for that model. If it does, v13 worked for that model.
4. **Frontier-vs-below-frontier.** R009 had no opus-tier divergence signal because the pool was weak/buggy. Include a strong frontier model to test whether v13's broadened menu actually spreads the concept field for capable models.

These experiments will *quantify* how much of the convergence is the model vs the prompt — which is the actual open question, and which no amount of prompt revision can answer.

## 8. Falsifiable prediction for Round 010

If v13 ships as a normal battle (not a controlled experiment): **craft/sim share should drop but probably not to zero** — v13 broadens the menu, so the L2 pull weakens, but L3 (per-model) keeps some models on craft. Watch for whether the field spreads across the *seven* families or collapses onto a new one (C17). If a frontier model still ships glassblowing under v13, that's L3 confirmed and the prompt is exhausted.

## 9. Files changed this pass

| Path | Change |
|------|--------|
| `challenge/BATTLE_PROMPT.md` | v12 → v13. §1.4 situation list broadened to 7 families (the core L2 fix). New §4.5 "craft-category trap." §4.3 ambition-theater reinforced (R009 broken-render). Closing further-reading broadened beyond physics-feel. Negative-space + all gates + all prior fixes intact. Size 29.0 KB (ceiling 29.5; **highest ever — flagged as overreach risk**). |
| `benchmark/06-anti-bias-anti-gaming.md` | New cluster **C16** (craft/sim category-attractor, 4-round recurrence, agent-notebook proof). New post-R009 meta-finding: three-layer convergence model (L1 instance / L2 category / L3 model-bounded) + the controlled-experiments pivot. |
| `BATTLE_2_ENTRY.md` | v13 headers; scoresheet C1–C16; Part 5 sanity greps rewritten (32 lines) with §4.5 / 7-families / ambition / C16 greps + size ceiling 29.5 KB. |
| `README.md` | Round 009 actual + Round 010 plan (controlled experiments as headline). |
| `expert_team/CONSENSUS.md` + `ORCHESTRATION.md` | Round 009 expert analysis + the L1/L2/L3 decomposition + experiments recommendation. |
| `battles/round-009-after-action.md` | (this file) |
| `logs/game-log-9.txt` | Brought into the branch from the operator's `01a01d22` upload so the log set stays complete. |

## 10. Honest bottom line for the operator

You're right that it's partly the prompt's fault — but **not because of named examples** (those are gone, and R009 proves the agents aren't copying phrases; they're copying a *category* the prompt's vocabulary implies). v13 fixes the part that's fixable (broadens the menu, names the trap). But the harder finding is that **opus5-max made glassblowing under two completely different prompts, and both Claude models made craft in the same round** — that's the models, not the brief. The benchmark has squeezed about as much signal out of prompt-tuning as it can. The next real lever is **controlled experiments to measure how much is model vs prompt** — and then either accept the pool's diversity ceiling or change the pool.
