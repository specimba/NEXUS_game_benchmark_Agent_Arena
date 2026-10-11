# 11 — Pre-test questions for the battle prompt (self-questioning, 2026-10-12)

**Purpose.** Before the next battle, answer these questions about our own battle prompt and strategy. Each one has three parts: why it matters (the evidence), what would settle it (the test), and my current answer from the evidence so far. Where the answer is "not known," the question is a pre-test: run it first, then decide.

**Marking.** `[core]` must be answered before the next battle (15 questions). `[optional]` improves the next prompt but does not block it (8 questions).

**Evidence base.** Round 019 field log (de-identified analysis in `battles/round-019-field-analysis.md`); the research note `benchmark/10-field-research-2026-10.md`; the v23 proposals in `battles/log18-v23-revision-notes.md`.

---

## A. The brief: is it clear enough to build from?

**A1 [core] — Can a stranger tell what the player does from the first screen?**
- *Why:* three battles were judged "not easy to understand" and one "not understood how to play" (round 019).
- *Test:* show the title screen to two people who have not read the README; ask them to say the verb and the goal in their own words.
- *Current answer:* **no.** Nothing in v22 asks for an on-screen verb and goal. Proposed fix: §2.3 in the v23 notes.

**A2 [core] — Does the brief say what a finished game must do, not only what to build?**
- *Why:* the best-closed games in the round were those with a loop that ends; the weakest had systems without a closing condition.
- *Test:* count how many sessions could name their win and loss states in one sentence each, from the README alone.
- *Current answer:* **partly.** Q2 asks for the player's sentence, and §5 requires a fail state and an ending. The "one sentence each" test was not run.

**A3 [optional] — Does the brief make the first minute enjoyable, not only legible?**
- *Why:* one session praised for "enjoyable mechanics" had "very simple graphics"; the operator's complaint was the graphics, not the play. The fun contract is in v22 (§0) but not measured.
- *Test:* a first-minute check in the probe: does a naive policy get a pleasant, visible result within 60 seconds?
- *Current answer:* **not known.** Pre-test it on the next battle.

---

## B. Scope and ambition: is the brief pushing the right way?

**B1 [core] — Does the "push your environment as far as it goes" line produce overscope?**
- *Why:* two of the round's unfinished builds stalled on errors while trying larger systems. The ambition line and the ship-complete rule pull in opposite directions.
- *Test:* count sessions that reached a delivery marker, grouped by stated scope (small loop vs large system).
- *Current answer:* **probably yes, under pressure.** Add the fallback rule (v23 §2.1) to make the ambition line safe.

**B2 [core] — When a build fails twice, what is the agent told to do?**
- *Why:* repeated errors were the most common cause of unfinished sessions. v22 has no fallback rule.
- *Test:* in a dry run, plant a build error at minute 40 and see whether the session reverts to the last green build.
- *Current answer:* **no rule exists.** Proposed in v23 §2.1. Research support: RSIGame (best-checkpoint), RGC (A/B against the retained version).

**B3 [optional] — Should the brief ask for a family the field has not used?**
- *Why:* round 019 showed convergence in flight, salvage, music and curling clusters. Banning families makes the field relocate (C15). A verb check may help more.
- *Test:* the verb-check A/B in v23 §6.
- *Current answer:* **not known.** Keep the README rule (no rejected-family lists); run the verb check as a held test.

---

## C. Verification: does the probe test what the brief requires?

**C1 [core] — Does the probe test behaviour, or only rules?**
- *Why:* one probe passed 23 of 23 checks, and the operator found no engagement loop. WorldBench found code-only judging credits removed features.
- *Test:* for each declared behaviour (3–6 per brief), check whether the probe changes state or pixels when the behaviour happens. Count how many declared behaviours have a real check.
- *Current answer:* **no.** v22 asks for a probe but does not require one check per declared behaviour. Proposed: v23 §2.2.

**C2 [core] — Who writes the probe?**
- *Why:* when the agent writes its own probe, the probe can test what the agent built rather than what the brief required. GameASG-Bench fixes the interface before generation.
- *Test:* ask two agents for the same brief; have a third write a probe from the brief alone; run both builds against it.
- *Current answer:* **the agent writes it.** Option: the operator supplies a fixed behaviour list in the brief, and the agent must satisfy each one. Pre-test on the next battle.

**C3 [core] — Is an executed probe enough to call a build "verified"?**
- *Why:* in round 019 about a quarter of the sessions executed a probe; some executed probes were praised and some were not.
- *Test:* compare operator verdicts for executed-probe sessions with and without play checks.
- *Current answer:* **no.** The probe's coverage matters more than its execution. Add play checks (v23 §2.2).

**C4 [optional] — Should the battle require a screenshot review?**
- *Why:* GameDevBench measured a lift from visual feedback. Our agents disclose "cannot view images" in some sessions.
- *Test:* A/B with and without a screenshot step, on sessions that can view images.
- *Current answer:* **probably helpful, not mandatory.** Proposed as an optional step with a fallback (v23 §2.6).

---

## D. Fairness and comparability: are the battles comparable?

**D1 [core] — Are effort or reasoning settings recorded?**
- *Why:* effort changes cost and output by large factors in public tests. A battle without the setting is not comparable.
- *Test:* check that every ENV line in the next round records the setting.
- *Current answer:* **no.** v22 does not require it. Proposed: v23 §2.8.

**D2 [core] — Are the prompts byte-identical for every side?**
- *Why:* round 019's pasted prompt differed from the repo in one line, and the difference is not recorded in the repo.
- *Test:* hash the pasted prompt against the repo file before each round.
- *Current answer:* **no.** One line differs. Decision needed (v23 §4).

**D3 [core] — Do we know which model made which game before judging?**
- *Why:* the operator asked that battle-to-model relations not be shared. Judgements should not depend on who the model is.
- *Test:* the judge sees only the dash rating and the build, not the model name, until after the verdict.
- *Current answer:* **the analysis documents named models in the first draft.** Withdrawn; this round's files are de-identified.

**D4 [optional] — Are the families we judge comparable?**
- *Why:* a family-level judgement (flight, salvage, music) is fairer than a model-level one when the field converges.
- *Test:* tag each shipped game by family and by verb; compare verdict rates by family.
- *Current answer:* **partly.** The round-019 family table is a start.

---

## E. Measurement: are we measuring what matters?

**E1 [core] — What is the minimum evidence that a game is "closed"?**
- *Why:* the operator's best verdicts praised closure and an ending; the worst were unfinished or single-level.
- *Test:* define closure as: start, a fail state, an ending, restart without refresh, and one run that ends with a result. Check each shipped game against this list.
- *Current answer:* **the list exists in v22 §5** but is not measured. Add it to the battle record.

**E2 [optional] — Can the judge reproduce the operator's verdict from the evidence?**
- *Why:* the operator's verdicts are the round's real scores. If an automated judge can predict them, the benchmark scales.
- *Test:* have the judge rate each shipped game blind; compare with the operator's dash rating.
- *Current answer:* **not tested.** Research direction: WorldBench-style exploration and reading; RGC's Reviewer (A/B and recorded preference).

**E3 [optional] — Does playtime predict the operator's judgement?**
- *Why:* RGC reports that longer proxy playtime alone does not establish human interest.
- *Test:* record a simple playtime proxy (a scripted run length) and compare with the dash rating.
- *Current answer:* **not known.** Do not use playtime as a score without this check.

---

## F. Research and the next model generation

**F1 [core] — Which of the latest papers changes a rule, not just a note?**
- *Why:* the research note has many papers. Only a few change the prompt.
- *Test:* for each paper, write one changed rule or one measurement. If neither, drop it.
- *Current answer:* **four do**: RSIGame (best-checkpoint fix loop), RGC (retained-version A/B, play policies), GameASG-Bench (declared interface), WorldBench (state or pixel checks, not code presence). GameDevBench changes an optional step. Others are background.

**F2 [core] — How do the newest models change the brief?**
- *Why:* the operator asked for improvements "for new frontier models." Public releases in late September 2026 include several new Opus, GPT-6, DeepSeek and MiMo models. Naming them in the prompt would break the fairness contract and age fast.
- *Test:* keep the brief model-neutral. Put model-specific information (effort setting, release notes, known strengths) in the research note and in the ENV line.
- *Current answer:* **the brief stays neutral.** The newest models change the research note and the effort setting in the record, not the prompt.

**F3 [optional] — Do DeepSeek V4.1 Flash or MiMo V2.6 build playable 3D games?**
- *Why:* the operator asked. The sources checked give benchmark and price facts; no game-creation test was found.
- *Test:* a small field test: the same brief, the same effort setting, one run each, judged on the same rubric.
- *Current answer:* **not known.** Pre-test on the next round as a fixed-pool slot.

**F4 [optional] — Is a longer or a shorter brief better for the newest models?**
- *Why:* the v22 brief is long. Shorter briefs may suit models that follow instructions well; longer briefs may hold the process better.
- *Test:* a two-arm A/B on identical slots (v22 vs a short v23 draft).
- *Current answer:* **not known.** Do not change length without this test.

---

## G. Operator protocol: what the operator needs

**G1 [core] — What does the operator need to see to decide?**
- *Why:* round 019's analysis took many hours of reading. The operator's dash ratings are the stable signal.
- *Test:* produce one page per round: session codes, dash rating, the closure checklist (E1), and the probe coverage (C1). No model names.
- *Current answer:* **the round file is long.** Add a one-page summary as the first section.

**G2 [core] — What is the operator's sharing constraint?**
- *Why:* the operator said battle-to-model relations should not be shared; the dash backup can be.
- *Test:* check each committed file for model-to-battle relations before pushing.
- *Current answer:* **one earlier commit on this branch broke the constraint** (the first draft). The files are now de-identified. The raw log still contains verdict lines naming models; decision needed (round 019 analysis §7).

---

## Quick scorecard

| Area | Core questions | Answered "yes" | Answered "no / not known" |
|---|---|---|---|
| A. Brief | A1, A2 | 0 | 2 (A1 no; A2 partly) |
| B. Scope | B1, B2 | 0 | 2 |
| C. Verification | C1, C2, C3 | 0 | 3 |
| D. Fairness | D1, D2, D3 | 0 | 3 |
| E. Measurement | E1 | 0 | 1 (the list exists, not measured) |
| F. Research | F1, F2 | 2 | 0 |
| G. Operator | G1, G2 | 0 | 2 |

**Reading:** the research side is in good shape. The prompt and the measurement side are not yet. Most "no" answers have a proposed fix in the v23 notes, which is held until the operator decides.


---

## H. Operator answers and read-through corrections (2026-10-12)

Asked directly to the operator in conversation. Answers are recorded as given; where the v22 text disagrees with an answer, the disagreement is stated here and the prompt check decides the fact.

| Q | Operator answer | v22 text check | Status |
|---|---|---|---|
| A1 first-screen verb | "Yes, the brief requires it" | Not required in those words. v22 asks for a one-sentence player goal (Q2) and says the first minute must be legible within ~60 s. No on-screen verb and goal, no word limit. | **Partly. Disagrees with the operator's answer; the prompt is the source.** Fix: v23 §2.3 |
| B1 scope overreach | "No, the ship-complete rule balances it" | Ship-complete rule exists. | **Unknown.** My earlier "probably yes" rested on fix-loop stalls, not on scope evidence. Withdrawn. |
| B2 two build failures | "Revert to last green build" | **No fallback rule in v22.** No "revert", "last green", or retry cap. | **Not in the prompt.** The operator's answer is the behaviour we want; v23 §2.1 proposes it. |
| C1 probe scope | "Both" (rules and behaviour) | v22 asks for asserts that a naive player's run reaches the first goal, but does not require one check per declared behaviour. | **Partly.** Fix: v23 §2.2. |
| C2 who writes the probe | "There are no revisions in battles; they are one-shot. Good creations could get revisions or continuous development, which is not feasible in Arena battle mode." | v22 has `TRACK: iterated (N passes)` as an option, so some iteration is allowed but not defined. | **Operator constraint, recorded.** This limits what the research can transfer; see H2. |
| D1 effort recorded | "Yes" | The ENV line records class, what was attempted, and what executed. **It does not record effort or reasoning setting.** | **No, in the brief.** If the operator records it in session metadata, that is outside the README. Operator to confirm. |

### H1. Corrections to the earlier answers

- **A1** changes from "no" to "partly". The brief has a legibility rule, but not an on-screen verb and goal.
- **B1** changes from "probably yes" to "unknown". The evidence was weak.
- **D1** stays "no" for the brief. The operator's "yes" may refer to recording outside the brief.
- **B2** stays "no rule" in the brief. The operator's answer is the behaviour to write in.
- **Count:** 23 questions, 15 core, 8 optional.

### H2. What the full reading changes

I read the abstracts of six papers and the full introductions of RSIGame and Recursive Game Creator.

- **RSIGame (2609.39045):** the local loop explores the running game, diagnoses and ranks issues, and revises against an evolving checklist. The global loop keeps the best checkpoint and detects regression. Its reported gains come from repeated rounds under matched budgets. *For us:* the best-checkpoint rule (fallback) transfers to one session. The multi-round gains do not, unless `TRACK: iterated` is used.
- **Recursive Game Creator (2610.08621):** a separate Player writes reusable policies over exposed state. A Reviewer compares versions and keeps the better one. Three refinement rounds raised a GameCraft-Bench score from 72.70 to 77.89, and the GameASG-Bench strict success rate from 9.47% to 53.2% (25 of 47). Its code is not yet released. *For us:* the Player-policy idea (scripted play over state, not GUI clicks) transfers to the probe. The A/B revision loop needs more than one round.
- **GameASG-Bench (2609.21293):** declares the test interface before generation. Across nine agent stacks, the highest mean L2 pass rate is 93.2% but the highest strict success is 55.3% (26 of 47). For one model, full tool access and larger turn budgets raise strict success. Strict success is **not monotonic in reasoning effort.** *For us:* supports D1 (record effort, because it changes the result in both directions) and C2 (fix the interface before the build).
- **WorldBench (2610.10622):** the VLM-snapshot judge and the code judge disagree on 32% of required items. In a removal test, code-only judging credits 4 of 5 removed features; the probe that checks what runs cut kept points on removed features from 5.44 to 3.55 (of 7.11). *For us:* supports C1 and C3. Code presence is not evidence.
- **A2Z GameSpec-Bench (2609.39564):** the contract stays fixed across agents and rounds; test policies are generated against it; requirement-specific feedback gave +10.9% fidelity over self-revision after two rounds. *For us:* supports the targeted-revision rule (v23 §2.9). Also supports naming the requirement that failed.
- **GameDevBench (2602.11103):** the visual-feedback gain (41.1% to 52.0%) was measured for GPT-5.4, not for any newer model. Gameplay tasks scored 51.4% and 2D graphics 33.0%. *For us:* the screenshot step (v23 §2.6) is optional and its benefit is for one model only.

### H3. Constraint on the research (new)

Battles are one-shot, and the operator says revision loops are not feasible in Arena battle mode. So:

1. The multi-round gains in RSIGame and RGC **do not transfer as measured.** Do not claim them.
2. What transfers: the best-checkpoint fallback within one session (v23 §2.1), play-based probes written against a fixed behaviour list (v23 §2.2), and targeted self-checks (v23 §2.9).
3. The `TRACK: iterated (N passes)` option conflicts with "one-shot". Either remove the option from the v23 draft or define it. **Operator decision.**

### H4. Still open for the operator (not answered)

Core questions not yet answered: A2, C3, D2, D3, E1, F1, F2, G1, G2. The operator skipped the second batch (A2, C3, D2, D3, E1, F2). These remain open until the operator answers.
