# Battle Round 010 — After-Action Record (controlled experiment: v13 vs LEAN)

**Status:** controlled experiment, not a scored battle round. The decisive test of the [`fable-showcase-deep-dive.md`](fable-showcase-deep-dive.md) hypothesis.
**Source log:** `logs/game-log-10.txt`
**Operator:** specimba
**Recorded by benchmark:** 2026-08-24 (Ankara)
**Planned:** Grok 4.6 + DeepSeek V4 Vision × {v13 cautious, LEAN}, 4 battles / 8 outputs.
**Actual:** DeepSeek V4 Vision **failed to start** (couldn't begin work, "retried many times and then reported to arena.ai team") → **dropped, swapped for Claude Sonnet 5-high.** Ran ~10 outputs across the v13 and LEAN conditions.

---

## 1. Headline — a hybrid result, not a clean win

Round 010 splits the two persistent failures cleanly and proves **both** the elicitation hypothesis *and* the value of the convergence apparatus — they aren't opposites, they're two different levers:

1. **OVER-CAUTION SUPPRESSES AMBITION — CONFIRMED.** The LEAN condition produced ~13× more 3D/WebGL/Three.js work than v13 (26 vs 2 stack mentions) and the benchmark's **first real WebGPU 3D game** (operator: *"finally somebody made 3d game… first real webgpu game"*). v13 herded even a visually-capable frontier model (Grok 4.6) into static-image visual novels. The FABLE deep-dive was right about this.
2. **THE CONVERGENCE APPARATUS IS LOAD-BEARING — ALSO CONFIRMED (and this corrects the deep-dive).** Strip v13's §4.4 sensory-modality trap + sonar/frequency avoid-list (LEAN has neither), and Grok 4.6 **immediately chose a "radio operator on a dying satellite… signal's frequency warbles… decode signals" game** — the C14 cluster, verbatim, first try. LEAN also re-surfaced underwater/dive/abyss + gravity/black-hole concepts echoing prior rounds. Operator's final verdict: *"how these are so similar to previous rounds that should be related with prompt."* The traps were doing real work; the deep-dive's claim that the apparatus was "a misdiagnosis" was **wrong**.
3. **MODEL MATTERS (Axis C).** Grok 4.6 ≫ Sonnet 5-high on visual ambition (Grok: "first significant realistic images," visual novels, the WebGPU 3D game; Sonnet: "lower visual attractiveness," simple 2D gravity shooters, one crash). DeepSeek V4 Vision didn't run at all. So it is **not** "only a model problem" (LEAN proved elicitation unlocks ambition), **and** it is **not** "only a prompt problem" (Grok ≫ Sonnet regardless of prompt).

**Net:** the answer is neither pure-LEAN nor pure-v13. It is a **hybrid** — ambition-first tone (short, permissive, "use WebGPU/shaders, be modern") **plus** the retained convergence guards (the sonar/frequency avoid-list + the craft-category note). Keep the convergence *content*; change the *tone* from cautious-prescriptive to permissive-ambitious.

## 2. Lineup and what actually ran

| Condition | Sessions | Games (operator-summary) |
|---|---|---|
| **v13 cautious** (full 29 KB) | Grok ×3, Sonnet ×2 (+1 failed DeepSeek) | Grok: visual novels — realistic anime/JRPG-style, **static images** (*"can make great anime like JRPG… undertale… danganronpa"*). Sonnet: visual-novel + resource-management, *"lower visual attractiveness."* |
| **LEAN** (~permissive, no apparatus) | Grok ×3, Sonnet ×3 (1 pair = replay) | Grok: **radio-operator/signal/frequency/decode 3D WebGPU** (*"first real webgpu 3d game"*), a bugged run, then a **submarine/cinder** abstract. Sonnet: 2D gravity shooter, a null run, a **2D black-hole-gravity** that crashed. |

Operator comments (verbatim, in order): R1 *"grok 4.6 made first significant realistic images and first visual novel like game"* · R2 *"they both nearly making visual novel… sonnet… a little bit more strategy with resource management"* · R3 *"again same type creations visual novel… grok… whole visuals are static images… sonnet tried gamification about resource management"* · R4 *"finally somebody made 3d game… first real webgpu game… sonnet created very simple 2d shooter ship thing but gravitational"* · R5 *"grok bugged out… this run will be replay"* · R6 *"grok made nearly same thing as like submarine session but with cinder… sonnet5 created 2D blackhole like gravity thing and crashed… how these are so similar with previous rounds that should be related with prompt."*

## 3. The three axes — measured

**Axis A — prompt effect (PRIMARY). CONFIRMED, ambition-direction.**
LEAN ≫ v13 on visual ambition: 3D/WebGL/Three.js stack mentions **26 vs 2**; first WebGPU 3D game under LEAN; v13 produced static-image visual novels. The over-caution hypothesis holds: v13's 29 KB of caveats suppresses the 3D/shader ambition the model is capable of.

**Axis "convergence" — the apparatus is load-bearing.**
LEAN re-introduced convergence: signal(8)/decode(7)/radio(2)/frequency(2) = **C14 back**; dive/abyss/underwater/submarine + gravity/black-hole = prior-round concepts back. v13's §4.4 + avoid-lists were actively suppressing these. **Stripping the apparatus is not free** — you buy ambition with convergence.

**Axis B — per-model collapse.**
Partial. Grok under v13 repeated visual-novels across runs (R1/R2/R3). Under LEAN, Grok spread more (radio-satellite → submarine-cinder). So v13 may *also* herd a model toward one safe corner (visual-novel), while LEAN lets it roam — but roaming landed it back on prior convergences. Neither prompt fully breaks per-model tendency.

**Axis C — model effect.**
Grok 4.6 ≫ Sonnet 5-high on visuals across both conditions. Grok is the visually-capable frontier model here; Sonnet is not (on this task). DeepSeek V4 Vision failed to launch (a reliability/availability note, not a quality verdict).

## 4. Decision-matrix read → the hybrid

| Result | Fires? |
|---|---|
| v14/LEAN ≫ v13 on ambition, both models | **Ambition: YES.** LEAN clearly unleashed 3D/WebGPU. |
| v13 ≈ LEAN (no difference) | No — they differ sharply. |
| LEAN wins one model only | No — ambition gain held for Grok; Sonnet was weak under both (model ceiling, not prompt). |
| LEAN = ambitious BUT convergence returns | **YES — this is the dominant finding.** C14 + prior concepts came back under LEAN. |

→ **The fix is neither pure-LEAN nor pure-v13. It is v15 = ambition-first + convergence-aware** (see §6).

## 5. What this revises in the record

- **`fable-showcase-deep-dive.md` was half-right.** Its core claim — *over-caution suppresses ambition* — is **CONFIRMED** (LEAN → first WebGPU 3D). Its stronger claim — *the convergence apparatus (C11–C16, traps, avoid-lists) is a misdiagnosis* — is **REFUTED**: Round 010 proves the apparatus is load-bearing (C14 returned the moment it was removed). A forward-pointer is added there.
- **Round-009's L1/L2/L3 stands, refined.** L1 (instance-attractors, prompt-fixable) and the apparatus's value are reaffirmed. The "model-bounded" caveat is real (Grok ≫ Sonnet) but conditional — a capable-enough model under an ambition-first prompt clears the visual bar.
- **C14 (sonar/radio/frequency) gets a re-validation entry:** it is the cluster that returns fastest when the guard is removed — evidence the guard is necessary, not optional.

## 6. The v15 direction (ambition-first + convergence-aware)

Take LEAN's **tone and length** (short, permissive, *"that capability is in your hands — use it,"* reach for WebGPU/shaders/3D) and graft on a **compact convergence-guard block** carried over from v13 — *only* the parts Round 010 proved are load-bearing:
- the **sonar / radio / frequency / signal / radar avoid-list** (C14 guard), and
- the **craft-category one-liner** (C16 guard — "physical-material is one family of seven, not the default").

**Drop** the parts that suppress ambition without convergence value: the long MDA/Swink/Vlambeer craft lectures, the multi-paragraph trap essays, the meta-commentary. Target ~3–4 KB — LEAN-sized in tone, v13-guarded where it counts. Draft to follow as `challenge/BATTLE_PROMPT_v15_HYBRID.md` (not the live prompt until tested).

## 7. Falsifiable prediction for the v15 test

Run v15 head-to-head with v13 on **Grok 4.6** (the one visually-capable model confirmed). Success = v15 keeps LEAN's ambition (WebGPU/3D, "2026 look") **AND** suppresses C14 (no radio/signal) and C16 (no craft-default) the way v13 did. If v15 gets ambition but loses the guards → the guard block needs tightening; if v15 keeps guards but loses ambition → the tone isn't permissive enough. Either failure is informative and points to a specific knob.

## 8. Files changed this pass

| Path | Change |
|------|--------|
| `battles/round-010-after-action.md` | (this file) — the experiment read + hybrid conclusion |
| `benchmark/06-anti-bias-anti-gaming.md` | §6.5 note: Round 010 proved the convergence apparatus load-bearing (C14 re-introduced under LEAN) — corrects the FABLE deep-dive's "misdiagnosis" over-claim |
| `battles/fable-showcase-deep-dive.md` | forward-pointer: ambition-claim CONFIRMED, apparatus-"misdiagnosis"-claim REFUTED by Round 010 |
| `challenge/BATTLE_PROMPT_v15_HYBRID.md` | ambition-first + convergence-aware draft (LEAN tone + C14/C16 guards), for the next test |
| `README.md` | Round 010 actual + Round 011 plan (v15 head-to-head on Grok 4.6) |
| `logs/game-log-10.txt` | brought into the branch from the operator's `01a01d22` upload |

## 9. Bottom line for the operator

You were right that it isn't "just a model problem" — LEAN proved the cautious prompt was capping ambition (first WebGPU 3D game, ever). But stripping the convergence guards was throwing the baby out with the bathwater: C14 (radio/signal) came straight back, and you caught it (*"so similar to previous rounds… related to prompt"*). The winning move is the synthesis nobody had evidence for until this round: **a short, ambitious, permissive prompt that still carries the two convergence guards (sonar/frequency avoid-list + craft-category note).** That's v15. And Grok 4.6 is your visually-capable workhorse — Sonnet 5 and DeepSeek V4 Vision are not (one weak, one didn't run).
