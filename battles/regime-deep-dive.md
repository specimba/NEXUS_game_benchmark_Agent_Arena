# Regime Deep Dive — Are we sure about restrictions and obligatory things?

> **Addendum 2026-09-04 — the in-regime ceiling moved.** This document's Fact 1
> ("visual quality comes from imagery… procedural-only code art has a hard ceiling")
> and the §6 decision to keep Track A one-shot as "the regime" were written against a
> pre-Astra evidence set. On 2026-09-04, arena.ai's own Peter Gostev shipped
> **Van Gogh Town** — GPT-6-Astra (Max) turning six Van Gogh paintings into one
> continuous walkable Three.js town, **zero iterations**, in what is almost certainly
> the same single-session sandbox regime as our Track A agents (20.5K views, hosted
> live; deep-dive in [`van-gogh-town-deep-dive.md`](van-gogh-town-deep-dive.md)). The
> revised reading: **the ceiling is model-tier-dependent, and the Max tier just moved it
> inside our regime.** Track A stays the regime (operator decision §6 stands), but
> "procedural/code art has a hard ceiling" is no longer a safe prior for Max-tier
> models, and R015's pool should include GPT-6-Astra Max if reachable. Whether its
> painterly look is pure code/shader craft or internally generated imagery is not yet
> public; either way, the *connected-geography, presence-first* prompt structure it used
> is a v20 candidate arm (structure only, never named content anchors — convergence
> doctrine unchanged).

**Trigger:** operator question after Round 011: *"I see many thoughts from models talking to themselves, 'No crane game, no blacksmith, no glass blowing'… Are we sure about restrictions and obligatory things? How do we improve our approaches and their creativity for successful real creation, or not actually?"* — plus the operator's evidence set: the OpenAI GPT-5.6/Codex showcase games (Phantasy Codex Adventure, MiniTown, Tiny Rails, Glass Towers) and Pliny's FABLE-SHOWCASE, GL4SS, NATURALIS-HISTORIA.
**Status:** analysis for operator decision. Every recommendation below is deferred to the Q&A — nothing is applied.

---

## 1. The evidence, one table

| Source | Prompt | Visuals from | Passes | Agents | Result quality | Convergence |
|---|---|---|---|---|---|---|
| **Phantasy Codex** (OpenAI showcase) | SPECIFIC — "top-down action RPG inspired by Game Boy Color games such as Final Fantasy Adventure and Sword of Mana" | **ImageGen** (all artwork) | 6 iterations | Codex multi-agent ("set_goal," playtest loops) | near-commercial | n/a — direction given |
| **MiniTown** | SPECIFIC — cozy god-game city sim, zones/roads/day-night spelled out | **ImageGen** (concepts first, then assets) | 6 | Codex | near-commercial | n/a |
| **Tiny Rails** | 4 sentences — but "use set_goal and **multiple agents**… **keep iterating** until polished" | ImageGen | **10** | multi-agent + subagent critique | near-commercial | n/a |
| **Glass Towers** | SPECIFIC — minimalist 3D glass balancing, named stack | shaders + WebGPU + refined assets | 6 | GPT-5.6-Ultra polish passes | near-commercial | n/a |
| **FABLE-SHOWCASE** (Pliny) | 4 sentences, permissive | procedural | 1 per demo | **~275 parallel + enhance/QA pipeline** | modern | 57 distinct demos |
| **GL4SS** (Pliny) | — | **image+video gen APIs** | many | — | spectacular (not a game) | n/a |
| **NATURALIS-HISTORIA** (Pliny) | — | **1,065 generated illustrations** | — | — | spectacular (not even interactive) | n/a |
| **Our bench R011, v13** (8 sessions) | open-ended + ALL guards | procedural only | 1 | 1 | text games, "no graphical," one novel (train-routing) | **C17 "who-is-the-killer" ×2** |
| **Our bench R011, v15.1** (6 sessions) | open-ended ambition-first, NO guards | procedural only | 1 | 1 | WebGPU 3D one-shot (buggy), 62 stack-mentions | blackhole ×3rd, ray-refraction echo |

## 2. Five facts the evidence establishes

**Fact 1 — Visual quality comes from imagery, not from code.** Every visually impressive item in the operator's evidence set derives its look from generated imagery: ImageGen assets (3 of 4 showcase games), image/video APIs (GL4SS), 1,065 generated plates (NATURALIS-HISTORIA — *not even interactive*, yet more entertaining than our games). Procedural-only code art has a hard ceiling: it is programmer art. **Our "self-contained / offline / no external assets" rule — adopted for containment, fairness, and auditability — is the single binding constraint behind the standing "old-looking browser-style" complaint.** Eleven rounds of prompt revision could not fix this because it was never a prompt problem.

**Fact 2 — Polish comes from iteration, not from single passes.** All four showcase games took 6–10 explicit passes with playtest→refine→deploy loops; FABLE used a design→build→**enhance**→QA pipeline across ~275 runs. Our R011 delivered the proof on our own bench: GLM-5.3's full WebGPU 3D ship-and-boss game, built in one shot — the operator's own verdict: *"this can be evaluated to something real game in 1-2 day fixes."* The capability arrived (M-1 passed, 15×); the missing 10% is iteration, which our one-shot rule forbids by definition.

**Fact 3 — Specificity beats open-endedness for distinctiveness.** The showcase prompts did NOT say "make whatever you want." They said "a compact top-down action RPG inspired by Game Boy Color games such as Final Fantasy Adventure and Sword of Mana" — genre, reference games, mechanics list. The agent then executed with craft. Open-ended briefs make every model sample from the same shared prior → convergence. **We have spent 11 rounds fighting convergence with avoid-lists; the showcase's actual lever was a concrete creative direction.** The trade-off is real and must be named: if the operator supplies the direction, the benchmark stops measuring concept-creativity and starts measuring execution. That is a legitimate benchmark — it is a *different* benchmark.

**Fact 4 — Convergence is in the priors, not the prompt. You cannot ban your way out of it.** R011's C17 is the cleanest proof in 11 rounds: under v13 — with every guard we own (sensory-modality trap, craft-category trap, avoid-lists, 7-family menu) — two models independently shipped the same *brand-new* cluster ("who is the killer" text mystery) in the same round, because no guard can name a cluster that doesn't exist yet. The guards rename convergence (C11→C17, every round); they never removed it. And per the operator's own observation, the models now carry the avoid-lists as internal monologue — a permanent tax on their concept space ("no crane, no blacksmith, no glass blowing…") that buys, at best, a renamed cluster.

**Fact 5 — But the categorical menu is not worthless: it is a navigation aid for some models.** R011 line 1011: the round's *winner* (glm-5.2's train-routing puzzle, "first time in our bench") explicitly reasoned: *"I crossed out the sonar/signal/frequency family (§4.4) and the forge/glass/crane craft-sim family (§4.5), and picked from the social + choice families instead."* The 7-family menu steered one model out of its default corner into the round's most original game. So: bans = ineffective + costly; a **menu of families presented as inspiration** = occasionally decisive. The distinction is *prohibition vs. navigation*.

## 3. The honest answer to "Are we sure about restrictions and obligatory things?"

Restriction by restriction, judged only on evidence:

| Restriction | Purpose | Evidence verdict |
|---|---|---|
| **Reliability gates** (launch, loop, controls, pause, no-drone, honest) | measurement floor, fairness | **Keep.** Not the creativity problem — R011 shipped buggy games under *both* arms; the gates were simply violated under ambition pressure. The fix is scope discipline + self-QA, not fewer gates. |
| **Track disclosure / containment / blind labels** | measurement integrity | **Keep.** Untouched by any of this evidence. |
| **One-shot** | defines the construct (raw single-pass capability) | **The #2 quality limiter, by the showcase's own recipe (6–10 passes).** Keep as a *track*; it no longer deserves to be the *only* regime if the goal is "games a human would choose to play." |
| **No external assets / procedural-only / offline** | containment, auditability, fairness | **The #1 quality limiter.** Every high-quality example uses generated imagery. This rule is why our best looks like programmer art. Deciding what it trades against is the single biggest decision in front of the benchmark. |
| **Avoid-lists / traps (agent-facing)** | prevent convergence | **Drop.** Eleven rounds of evidence: they rename convergence (C11→C17), tax the concept space, and models now recite them as inner monologue. Handle convergence **judge-side** (novelty scoring, cluster registry, post-hoc). |
| **7-family category menu** | navigation aid | **Reframe, don't ban:** keep as *inspiration* ("a situation can be physical, social, economic, relational, systemic, choice-driven, or narrative"), drop the trap-essay framing. R011 line 1011 shows the menu earning its keep when read as a map, not a law. |
| **Open-ended creative freedom** | measures concept creativity | **The benchmark's identity decision.** It is what makes convergence unavoidable (shared priors) AND what makes the benchmark measure creativity at all. Do not abandon silently — decide. |

**And the blunt answer to "How do we improve their creativity… or not actually?":** You cannot prompt a model out of its prior — 11 rounds and 17 clusters of evidence say so. What you *can* do, all proven by the operator's own evidence set: (1) **change the production regime** (assets, iteration, orchestration — the showcase recipe); (2) **supply specific creative direction** (kills convergence by construction, but changes what is measured); (3) **measure novelty judge-side** instead of banning themes agent-side; (4) **diversify directions across arms** (if the operator seeds each battle with a *different* specific direction, agents execute distinct visions — the showcase pattern, turned into a fairness-preserving benchmark design). Creativity itself is not promptable. The *conditions* for it are.

## 4. The fork in front of the benchmark (for the Q&A)

- **Track A — keep one-shot, procedural-only, open-ended.** Measures raw capability. Quality-capped near where R011 landed. Cheapest, cleanest, scientifically defensible.
- **Track B — showcase regime.** Allow generated assets + disclosed iteration + multi-agent. Measures "can this stack ship a game a human would choose" — the operator's actual standing complaint. Requires relaxing the offline/no-assets rule (or providing an imagegen capability in the harness).
- **Track C — seeded-direction battles.** Operator supplies a specific creative direction per battle (different direction per arm or per round — the showcase's specificity lever, used as a fairness mechanism). Kills convergence by construction; measures execution + craft, not concept selection.
- Any combination. The two-track infrastructure already exists in the rules (strict one-shot vs disclosed iterated).

## 5. What this deep dive deliberately does NOT do

- Does not apply the R011 pre-committed knobs (v15.2 self-QA / C14 guard) — knob-turning inside a framework the operator has put under review would be exactly the surface sweep they rejected. They are queued and documented in `round-011-after-action.md` §1.
- Does not rewrite any prompt, rule, or rubric. Every fork in §4 goes to the operator Q&A first.

## 6. Operator decisions — Q&A session, 2026-08-24 (post-deep-dive)

| Question | Decision | Consequence |
|---|---|---|
| 1. Identity | **Track A — one-shot stays the regime** | No showcase track, no seeded-direction track for now; the benchmark keeps measuring raw one-pass capability |
| 2. Assets | **"All of them accepted — they are in the same sandbox condition, so that doesn't matter"** + the operator's **GPT Image 2 → asset-conditioning → physical-materials** recipe (OpenAI Material Lab precedent; MeshPhysicalMaterial properties: clearcoat, iridescence, transmission, IOR, sheen, anisotropy, thickness, attenuation) | The procedural-only rule is **retired**. Fairness condition = **sandbox parity** (any visual source every agent equally has). Final builds still run offline with everything bundled; generated content disclosed via **receipts** in the README. The physical-materials recipe is taught in the prompt as the "where the modern look comes from" section |
| 3. Iteration | **Strict one-shot stays** | No in-battle passes; two-track disclosure policy unchanged |
| 4. Guards | **Menu as pure inspiration** | The 7-family list returns to the agent prompt framed as navigation (all coequal, no prohibition language); zero trap essays |
| 5. Queued knobs | **Apply both now** | Self-QA pre-ship checklist (M-4 fix) + one soft C14 steer (M-2 fix — the parenthetical honest note in the menu paragraph) re-enter the prompt |

**Built from these decisions:** `challenge/BATTLE_PROMPT_v16.md` (~4.5 KB) = v15.1 + the inspiration-framed family menu with the soft C14 note + the materials/light visual-craft section (GPT Image 2 recipe) + the sandbox-parity asset gate with receipts + the pre-ship self-QA list. **Not yet the live prompt** — per the deployment gate, promotion to `challenge/BATTLE_PROMPT.md` waits for the operator's go.
