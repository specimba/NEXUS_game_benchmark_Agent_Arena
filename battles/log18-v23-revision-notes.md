# Log 18 revision notes — v23 proposals (2026-10-12, HELD)

**Source:** `../logs/game-log-18.txt` — R019, the v22 single-prompt field test: ~30 sessions, 15 battles, 15 operator comments.
**Evidence:** `round-019-field-analysis.md` (battle map §0, comment reads §2, convergence §3, verification ledger §5).
**Products:** this file only. **No prompt is changed here.** `challenge/BATTLE_PROMPT.md` stays v17; `challenge/BATTLE_PROMPT_v22.md` stays as the repo copy. Promotion needs the operator's word (open question §7 of the analysis).

---

## 0. What the round says about new frontier models — read this first

The operator named the newest models (opus 5.5 max, gpt 6 sol, mimo, meta muse, minimax, glm, gemma, qwen). The results do **not** show that newness predicts quality:

- The most-praised game came from **glm** ("working start to finish… which is great").
- The newest flagship, **opus 5.5 max**, produced a build that was **"bugged x3, retried but not fixed"** and never delivered.
- **gpt 6 sol** delivered two games judged "not a real game sense" and "simple but enjoyable mechanics, very simple graphics".
- The best visual verdict (**opus three-roof stealth**) came from an opus model the operator did not describe as the newest.

**Implication.** The levers that moved the operator's verdicts are *process* levers: a fallback when the build fails, a probe that measures play rather than rules, and a first-screen legibility gate. Model-specific prompts would break the fairness contract (`challenge/README.md`: identical bytes for both sides), so **no clause below names a model or a version.** The model-specific information lives in the round file, not in the prompt.

---

## 1. Keep these (do not touch in v23)

| Mechanism | Evidence in log 18 |
|---|---|
| **Four answers + rejection tests (§0 Q1–Q4)** | Present in almost every session; the operator's complaints were about legibility and loops, not about the concept gate |
| **Ship-complete rule** | The round's two best closures (glm THE ICE REMEMBERS, AFTERBEAT) shipped a closed loop; "closed small loop beats open big one" is what the operator praised at L27810 |
| **Probe as prebuild / postcss / build chain** | Executed probes appear in 8 sessions; the build-time route is the one that actually ran |
| **Visual clause (real light, shadow, tone mapping)** | The round's strongest visual verdict (L11840) cited "light with shadows" |
| **TRACK / ENV / PREMISE_NOTE lines** | Present in most README-bearing sessions; the disclosures were honest ("could not execute here") |
| **Audio clause** | No audio complaint in the round |

---

## 2. Proposed changes (each one maps to an operator comment)

### 2.1 Fallback rule — the fix loop (comments L1500, L9490; analysis §3.5)

Add to §5 (hard rules), after the existing *Ship complete* line:

> **If a build fails twice in a row, stop fixing forward.** Revert to the last build that ran, cut the failing feature, and ship that. Write one README line: what failed, what you cut. A reduced build that runs beats an ambitious build that does not. Do not deliver a build you have not run.

*Why:* four unfinished or unfixed builds in R019 (UNDERTOW-A, opus 5.5 max, B8-A, B14-A) each stopped on a build error and did not fall back. *Counter-evidence:* the Mendelian flowers session hit 0/300 wins and rebalanced — the fix loop worked there, so the rule must not forbid fixing; it caps retries.

### 2.2 The probe measures play, not only rules (comment L10143; analysis §3.4)

Add to §4 (build like an engineer), in the probe bullet:

> Your probe must assert at least three *play* properties, not only rules: (a) **a decision in minute ten changes the outcome** (run two policies that differ in that decision and show different results); (b) **the first control is reachable on the first screen** (the probe presses the on-screen control and sees a state change); (c) **a second run differs** (a new seed, unlock, or score target — the reason to play again).

*Why:* the opus observatory passed 23/23 rule checks and the operator said "not successfully implemented… no gamification or interesting continuous playable thing." The rules were right; the play was absent.

### 2.3 First-screen legibility gate (comments L1500-era "no game sense", L2876, L7675, L16231; analysis §2 #4, #11)

Add to §0 as a fifth answer, or to §5 hard rule 3 — prefer §5 so it is a deliverable check, not a notebook one:

> **On the first screen, in ≤12 words, the game states the verb and the goal** — as on-screen text, not only in the README. Test: a stranger who has never read the README should be able to say what they are supposed to do after one look. If not, add the sentence to the title screen before you add anything else.

*Why:* THE PODIUM ("not understood how to play"), The Other Hand and HEARSAY ("not easy to understand for the player") were original and judged illegible.

### 2.4 Reason to return — measurable, not only a sentence (comments L8956, L10143; analysis §2 #5)

The Q2 "player's sentence" already names what makes the game fun. Add to Q2's rejection test:

> (d) **It names what brings the player back** after one full run — a changed next run, an unlock, a rival, a better score to chase — and the probe checks that the second run can differ.

*Why:* gpt-6-sol's game was judged to have "no gamification layer"; the opus observatory had no "continuous playable thing". The v22 "fun is a contract with minutes" clause names minute ten but nothing measures it.

### 2.5 Family rotation — not a banned list (comments L3914, L11151; analysis §3.3)

Do **not** add a list of banned families. R019 shows the cost: the umbrella language made agents enumerate the families they reject ("wildfire, energy-grid, root/mycelium, lighthouse"), which names them and seeds the next choice (analysis §3.3, the C15 law again). Instead:

- In §3 (Originality), add: "**Do not list the families you rejected in the README** — the README is for judges. Your notebook may keep the list."
- Add a *family check* to Q4 only: "Name your game's core verb (one word: *tend, tow, carve, time, wind, weave…*). If your verb is the same as the verb of a famous shipped game in your family, change the verb, not the family."

*Why:* the round's shipped families were flight ×3, salvage ×3, music/performance ×4, curling ×2 — convergence happened without any banned list, and the umbrella enumeration was visible in the notebooks. A verb check targets the convergence mechanism directly.

**Held risk:** a verb check may create a new verb attractor. Test it in the A/B (§6) before promotion.

### 2.6 Continuity with the operator's visual praise (comment L11840)

No new clause. The round's strongest visual verdict came from a session that already followed §2 of v22. Keep the visual checklist as written.

---

## 3. Do not add (considered and rejected)

- **Model-specific instructions.** Breaks the fairness contract. The round shows the model name is not a reliable predictor anyway (§0).
- **A "frontier" or "newest model" paragraph.** Same reason, plus no evidence it helps.
- **More engine language (Blender/Godot).** Fourth round with zero engine use; the E2 route (`three` + procedural + probe) is what sessions can execute. The v22 route text already says this.
- **A longer prompt.** v22 is already the longest in the lineage. The changes above are edits and one new probe requirement, not new sections.

---

## 4. The v22 wording sync (analysis §3.1)

The field paste changed one line in the v22 *verification route*. The repo says `npm i -D esbuild` (with the Vite 7 / Vite 8 caveat); the field copy says `esbuild` is already installed inside Vite. **Action:** either (a) adopt the field wording as v22.1 in `challenge/BATTLE_PROMPT_v22.md`, or (b) keep the repo wording and note the field divergence. Recommended: (a) — the field wording is the one the agents followed, and it is simpler — but the operator decides (§7 of the analysis, Q3).

---

## 5. Benchmark-side changes (held, not applied)

| Where | Change |
|---|---|
| `benchmark/04-defect-taxonomy.md` | Add: **FIX-LOOP-STALL**, **PROBE-GREEN-PLAY-RED**, **FIRST-SCREEN-ILLEGIBLE**, **UMBRELLA-ENUMERATION**, **GENRE-FAMILIARITY** (definitions in analysis §6) |
| `benchmark/02-scoring-rubric.md` | Add a *first-screen legibility* item and a *continuous play* item under human-perceived quality; both are judge-side and do not replace the probe |
| `benchmark/06-anti-bias-anti-gaming.md` | Add the R019 family-convergence table as the reference for family-fatigue judgment (C15 law: the field relocates; judge the family, not the prompt) |
| `battles/log17-approach-distillation.md` | Append the R019 approaches (flight ×3, salvage ×3, curling ×2, music ×4) as the next distillation ledger — not done here (time) |

---

## 6. Test before promotion (proposed, not run)

A 2-arm fixed-pool probe, same as the R016 plan, so the changes can be attributed:

- **Arm A:** v22 (repo wording).
- **Arm B:** v22 + §2.1–2.5 (v23 draft).
- **Pool:** the same sessions per battle, mixed frontier and non-frontier models, identical bytes per arm.
- **Measures:** delivery rate (any delivery marker), executed-probe rate, operator first-screen legibility verdict, operator "closed / not closed" verdict, operator "would play again".
- **Stop rule:** if B does not beat A on delivery rate **and** legibility, do not promote; keep v22.

---

## 7. Decisions needed from the operator

1. **Promote?** Keep v17 live, promote v22 (with or without the field wording), or promote v23 after the A/B. (Nothing has been promoted; the live prompt is still v17.)
2. **The field wording** of the esbuild line — adopt (§4a) or revert (§4b).
3. **Battle 4 clarification** — was "opus 5.5 max just blasted the arena" a second session in that battle, or a reference to another round? (analysis §7 Q1)
4. **Verb check (§2.5)** — accept as a held A/B item, or drop it and keep only the README-no-enumeration rule?
