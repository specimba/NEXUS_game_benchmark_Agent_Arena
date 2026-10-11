# Log 18 revision notes — v23 proposals (2026-10-12, HELD, de-identified)

**Source:** round 019 (v22 single-prompt field test), analysed in `round-019-field-analysis.md` (no model names, no battle mapping).
**Research:** `benchmark/10-field-research-2026-10.md` (papers from May to October 2026; model facts; showcases).
**Products:** this file only. No prompt is changed here. `challenge/BATTLE_PROMPT.md` stays v17; `challenge/BATTLE_PROMPT_v22.md` stays as the repo copy.
**Promotion** needs the operator's word.

---

## 0. The model question, answered without model attributions

The operator asked how the newest frontier models should change the prompt. The evidence says: **not by naming them.**

- The round's data shows that release date and model name did not predict the operator's verdicts. The best-received games and the worst-received games both came from families of model the operator named as new.
- Public benchmarks agree that the newest models are close to each other on coding, and differ mainly on specific tasks and cost. Effort settings change results a lot (§4 of the research note). Any prompt that names a model will age in weeks.
- The fairness contract (`challenge/README.md`) needs identical bytes for every side. A model clause would break it.

**Therefore:** every change below is process-level and applies to any model. Model names belong in the research note, not the prompt. Model-specific effort settings belong in the battle record (ENV line), not in the brief.

---

## 1. Keep these (do not touch in v23)

| Mechanism | Evidence in round 019 |
|---|---|
| Four answers with rejection tests (§0 Q1–Q4) | Present in almost every session; complaints were about legibility and loops, not the concept gate |
| Ship-complete rule | The round's two best closures shipped a closed loop |
| Probe run from the build (prebuild, postcss, build chain) | The build-time route is the one that executed |
| Visual clause (real light, shadow, tone mapping) | The round's strongest visual verdict cited light and shadow |
| TRACK / ENV / PREMISE_NOTE lines | Present in most README-bearing sessions; disclosures were honest |
| Audio clause | No audio complaint |

---

## 2. Proposed changes

Each change maps to a round-019 finding and, where relevant, to a paper in the research note.

### 2.1 Fallback rule: keep the last green build (round 019 §2 items 1 and 6; RSIGame; RGC)

Add to §5 (hard rules), after *Ship complete*:

> **If a build fails twice in a row, stop fixing forward.** Go back to the last build that ran, cut the failing feature, and ship that. Write one README line: what failed, what you cut. A reduced build that runs beats an ambitious build that does not run. Do not deliver a build you have not run.

*Counter-evidence to respect:* one session in round 019 rebalanced a 0-of-300 result and shipped. The rule caps retries; it does not forbid fixing.

*Research link:* RSIGame keeps a best checkpoint and detects regression across the development loop. RGC compares each candidate with the retained version (A/B). The rule above is the minimal form of both.

### 2.2 Probes test declared behaviour and play, not only rules (round 019 §2 item 7; WorldBench; GameASG-Bench)

Replace the probe bullet in §4 with:

> Before you build, write down **the behaviours a player must be able to do** (three to six, each one sentence: a verb, a state change, a time limit). Your probe must test each of them **by changing state or pixels, not by reading code**. Include at least three *play* checks: (a) a decision made in minute ten changes the outcome (two policies that differ in that decision give different results); (b) the first control works from the first screen (the probe presses it and sees a state change); (c) a second run differs (new seed, unlock or score target).

*Why:* one probe passed every rule check and the game still failed play. WorldBench found that code-only judging credits removed features (four of five) because the code stays in the file. GameASG-Bench fixes the test interface before generation, so the agent cannot pass a probe it wrote to fit its own build.

### 2.3 First-screen legibility gate (round 019 §2 items 4, 11)

Add to §5 hard rule 3:

> **On the first screen, in twelve words or fewer, the game states the verb and the goal** as on-screen text. Test: someone who has never read the README should say what to do after one look. If not, fix the title screen before you add anything else.

### 2.4 Reason to return, measured (round 019 §2 item 5; GameASG-Bench)

Add to Q2's rejection test:

> (d) **It names what brings the player back** after one full run (a changed next run, an unlock, a rival, a score to chase), and the probe checks that the second run can differ.

### 2.5 Family rotation without a banned list (round 019 §3)

Do **not** add banned families. Round 019 showed the cost: agents listed rejected families in their notebooks, which named them and seeded the next choice.

- §3 (Originality), add: "Do not list the families you rejected in the README. The README is for judges. Your notebook may keep the list."
- Q4 gets a verb check: "Name your core verb in one word (tend, tow, carve, time, wind, weave…). If your verb is the verb of a famous shipped game in your family, change the verb, not the family."

**Held risk:** a verb check may create a new verb attractor. Test it in the A/B before promotion.

### 2.6 Visual feedback step where the model can see images (GameDevBench)

Add to §4 (build like an engineer), as an optional step with a fallback:

> If you can view images, take one screenshot at the first screen, one mid-play, and one at the end state; name the one visual defect you fixed because of them. If you cannot view images, say so in the ENV line and rely on the probe's pixel checks.

*Why:* in GameDevBench, image and video feedback raised one agent's success rate from 41.1% to 52.0%. Our battles already disclose "cannot view images" honestly, so the step must not be mandatory.

### 2.7 Pin library versions and known breakage (3DCodeBench; round 019 field logs)

Add to §4, in the stack line:

> Pin the library versions you use (exact or major). List any known breakage you hit in the README (for example a build-tool tree-shake that drops CSS variables, a style rule that beats utility classes). Failures in this benchmark have been mostly API mismatches, not design errors.

### 2.8 Record the effort setting in the ENV line (Opus effort tests; GameASG-Bench)

Add to the ENV line format in §5 hard rule 7:

> ENV: class (E1/E2/E3), **effort or reasoning setting used**, and what was executed.

*Why:* effort changes cost and output by large factors (one creator's test: a medium run at under a minute and about $0.56 versus a max run at 22 minutes and $5.25). A comparison without the setting is not a comparison. The setting is recorded; the prompt does not choose it.

### 2.9 Targeted revision, not self-revision (A2Z GameSpec-Bench)

Add to §5 hard rule 8 (play your own game):

> When you revise after a failed check, name the requirement that failed and the change that addresses it. "Fix bugs" is not a revision note.

*Why:* in A2Z GameSpec-Bench, requirement-specific feedback improved fidelity by 10.9% relative over self-revision after two rounds.

---

## 3. Considered and rejected

- **Model-specific instructions or a "frontier" paragraph.** Breaks the fairness contract. Round 019 gave no evidence newness predicts quality.
- **More engine language (Blender, Godot).** Fourth round with zero engine use. The E2 route (Three.js, procedural, the probe) is what sessions can execute. GameCraft-Bench uses Godot, but its authors say the benchmark is 2D and headless; that does not match our E2 battles.
- **A longer prompt.** v22 is already long. Every change above is an edit or a single added requirement, not a new section.
- **Banned family list.** See §2.5.

---

## 4. The v22 wording sync

The field paste changed one line in the verification route. The repo says `npm i -D esbuild` (with the Vite 7 / Vite 8 caveat); the field copy says `esbuild` is already installed inside Vite. **Decision for the operator:** adopt the field wording as v22.1 in the repo, or keep the repo wording and record the divergence.

---

## 5. Benchmark-side changes (held, not applied)

| Where | Change |
|---|---|
| `benchmark/04-defect-taxonomy.md` | Add FIX-LOOP-STALL, PROBE-GREEN-PLAY-RED, FIRST-SCREEN-ILLEGIBLE, UMBRELLA-ENUMERATION, GENRE-FAMILIARITY |
| `benchmark/02-scoring-rubric.md` | Add a first-screen legibility item and a continuous-play item under human-perceived quality |
| `benchmark/06-anti-bias-anti-gaming.md` | Family-convergence reference for judging (judge the family, not the prompt: C15) |
| `battles/log17-approach-distillation.md` | Append round 019 approaches as a distillation ledger (not done) |
| Dash ratings backup | Add when the operator sends the dash ratings; no battle or model links |

---

## 6. Test before promotion (proposed, not run)

A two-arm fixed-pool probe, same as the R016 plan:

- **Arm A:** v22 (repo wording).
- **Arm B:** v22 with §2.1–2.9 applied (v23 draft).
- **Pool:** the same battle slots for both arms, mixing model families, identical bytes per arm.
- **Measures:** delivery rate (any delivery marker); executed-probe rate; the probe's behaviour coverage (declared behaviours with a state or pixel check); first-screen legibility (operator verdict); closed-or-not (operator verdict); would-play-again (operator verdict).
- **Stop rule:** if B does not beat A on delivery rate and legibility, keep v22.

---

## 7. Decisions needed from the operator

1. **Raw log.** `logs/game-log-18.txt` contains verdict lines that name models. Keep it, redact the committed copy, or move it to the ignored `.experiments/` folder while keeping a local copy? (The git history already holds an earlier commit with the names, so a redaction does not remove them from history. Rewriting history is a separate decision.)
2. **Dash ratings.** Send them to be added as the shareable backup.
3. **Promotion.** Keep v17 live, promote v22 (with or without the field wording), or promote v23 after the A/B.
4. **Esbuild wording.** Adopt the field wording (§4) or revert.
5. **Verb check (§2.5).** Accept as a held A/B item, or drop it and keep only the README rule.
