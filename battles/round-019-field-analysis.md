# Round 019 (v22 single-prompt field test) — de-identified analysis of log 18

**Source:** `../logs/game-log-18.txt` (15 battles, about 30 sessions, 15 operator verdicts, 27 809 lines). The raw capture is the only place the session-to-model relations live. **This analysis deliberately carries no model names, no game titles and no battle-to-model mapping**, at the operator's request: the shareable backup is the operator's dash ratings, not the relations.
**Prompt under test:** `challenge/BATTLE_PROMPT_v22.md`, pasted at the head of the log, with one field-edited line (§3.1).
**Recorded:** 2026-10-12. **Re-recorded de-identified** the same day; the first draft is superseded.
**Status:** analysis complete. Nothing promoted. Live prompt is still v17.

**Coding.** Sessions are coded `S01`–`S30` in order of appearance. The code is not a key; the raw log is.

---

## 0. Round at a glance

| Measure | Value |
|---|---|
| Battles | 15 (two sessions each, one verdict per battle) |
| Sessions | about 30 |
| Sessions that reached a delivery marker | about 25 |
| Sessions with no delivery | about 5: three "first slot" sessions that failed or stalled, one build stuck on a repeated error, and one session with no visible delivery |
| Battles judged negative overall | 9 of 15 (5 of them explicitly "both bad") |
| Battles with a positive verdict | 3 of 15 |
| Sessions with an executed probe in the capture | 8 of about 30 (§5) |
| Engine use | Three.js in a minority of sessions; **Blender 1 mention, Godot 0** (fourth round with no engine use) |
| Sandbox | E2 (package manager and build; no shell, no browser) in most disclosures |

---

## 1. What the operator praised, and why (no names)

Three verdicts were positive. Each one names a mechanism.

1. **A 3D stealth game with real light and shadows** — "very well designed 3D and light with shadows; a little boring but creative." The probe ran in the build (40 of 40 checks), and the shadow pass and light were real. The remaining criticism was pacing, not visuals.
2. **A rhythm-route duet game** — "novel and strange, can be won, has both 2D and 3D options." The probe ran in the build (19 of 19). One of the two sessions in the battle did not finish.
3. **A curling-like sport game** — "working start to finish, and playing with an opponent playing itself, which is great." A loop that closes, with an opponent. The battle's other game was judged to have "1 level only, nonsense platforms."

Lesson: **closure and a real loop beat breadth and novelty.** This matches the ship-complete rule and the R012 and R018 lessons.

---

## 2. Operator verdicts by mechanism (paraphrased, no names)

| # | Verdict (paraphrase) | What it means | Follow-up |
|---|---|---|---|
| 1 | One session in a battle stalled after three retries; the other was "aesthetic, no game sense" | Two failures: a stall and a game without a decision | Fallback rule: after two failed builds, ship the last green build (v23 notes §2.1) |
| 2 | Shallow 2D graphics, but "interestingly enjoyable game mechanics" in the other session | Mechanics praised over graphics | Fun-at-minute-one passed; the graphics floor did not |
| 3 | "Both bullshit flying 2D things again" | **Flight/glide family returned** (three flight games in two battles) | Fatigue regression. Rotation rule, not a banned list (v23 notes §2.5) |
| 4 | "Very strange, very original, but not understood how to play" | Legibility failure in an original concept | First-screen legibility gate (v23 notes §2.3) |
| 5 | "Not a real game sense; no gamification layer" | No reason to return | Measurable return hook (v23 notes §2.4) |
| 6 | One session "bugged x3, retried but not fixed" (no delivery) | Fix loop failed, whatever the model | Fallback rule (§2.1) |
| 7 | Probe green (23 of 23), operator: "not successfully implemented… no gamification" | **The probe measured rules, not play** | Probes must assert play properties (v23 notes §2.2) |
| 8 | Failed first slot; the second "total bullshit" | Salvage/retrieval family, third in the round | Family convergence (§3) |
| 9 | Praised 3D with real light and shadows (see §1) | Visual credit when light is real | Keep the visual clause |
| 10 | Both "not novel", "faced before" | Genre familiarity: both games read as known genres | New class GENRE-FAMILIARITY (§6) |
| 11 | Both "original but implementation problematic; not easy to understand" | Legibility again, in two of the most original concepts | Same as #4 |
| 12 | "Two strange, two nonsense games; a very basic approach again" | First-minute read; first balance was 0 of 300 wins before the probe caught it | Probe caught it; the fix loop worked here (counter-example to #6) |
| 13 | "Okay for originality; game side lots of missing parts" | Completeness is failing quietly | Count menus, screens and states the probe covers |
| 14 | One session did not finish; the other "novel and strange, can be won" | Clean pairing | Keep the 2D and 3D option pattern |
| 15 | Praised (§1); the other "1 level only" | Closure beats breadth | Keep |

---

## 3. Convergence (families, not models)

| Family | Sessions (count) | Note |
|---|---|---|
| Flight / glide / kite | 3 | Same complaint shape as the R018 kite/wind cluster |
| Salvage / retrieval / tug | 3 | Two judged bad |
| Music / rhythm / performance | 4 | Conducting, rhythm, LP listening, puppet booth |
| Sport / curling | 2 | New cluster |
| Celestial / observatory / star | 2 | Light and sky |
| Fire / ember / forge | 2 | Lower than R015–R016, but brainstorm lists still name "wildfire" |
| Stealth / turn-based | 1 | Praised |
| Narrative / social | 2 | Text-led; "not easy to understand" |
| Breeding / genetics | 1 | First balance 0 of 300 |

**Umbrella enumeration.** In two battles, agents listed the families they rejected in their own notebooks ("wildfire, energy grid, mycelium, lighthouse…"). The list names the families and seeds the next choice (the C15 law again). Recommendation: no banned-family list. Use a verb check and keep rejected families out of the README (v23 notes §2.5).

---

## 4. Engine and sandbox

- **Engines.** Three.js was the 3D route in the sessions that built 3D. One session used canvas only. Blender was mentioned once in the whole log; Godot never. Fourth round in a row with no engine use.
- **Sandbox.** E2 (npm and build; no shell, no browser) in most disclosures. Sessions wrote their own Node probes and ran them inside the build, which is the v22 route working as written.
- **Vision.** Agents inspected some generated images and disclosed "cannot view images" in three sessions. Operator visual praise was the round's most consistent positive signal.

---

## 5. Verification ledger

| Verification | Sessions |
|---|---|
| Probe executed in the capture | 8 of about 30 |
| Probe written, not executed (disclosed) | about 8 |
| Probe claimed, execution unclear | about 6 |
| No probe | about 8 |

**Executed-probe sessions:** 8. Operator outcomes among them: 2 positive, 6 negative. **An executed probe does not predict an operator-praised game.** The difference is whether the probe measured play (decision, control, return) or only rules.

---

## 6. Defect classes for the taxonomy

1. **FIX-LOOP-STALL** — a build error repeats three or more times with no revert to the last green build. Process/reliability.
2. **PROBE-GREEN-PLAY-RED** — the probe passes every rule and the game still fails play. Verification gap.
3. **FIRST-SCREEN-ILLEGIBLE** — the verb or goal is not on screen. Onboarding.
4. **UMBRELLA-ENUMERATION** — rejected families listed in notebooks, seeding the next choice. Process.
5. **GENRE-FAMILIARITY** — the novelty test passes on paper while the game reads as a known genre. Novelty; extends the R018 NOVELTY-COLLISION class from named clones to genre-level familiarity.

---

## 7. Open items for the operator

1. **Corrections.** The first draft attached model names to specific battles. Those per-battle attributions were not reliable and are withdrawn. This version carries no model attributions and no battle-to-model relations, as the operator asked.
2. **The raw log** (`logs/game-log-18.txt`) contains the operator's verdict lines, which name models. It is the operator's upload and was never edited. Options: keep it as is; redact the verdict lines in the committed copy; or move it out of git under the existing ignored `.experiments/` folder, keeping a local copy. **Decision needed before anything else is published.**
3. **Dash ratings.** The shareable backup is the operator's dash ratings (three dashes = three stars, two = two stars, and so on). These are not in the repo yet. Send them and they will be added as the backup, with no battle or model links.
4. **Esbuild line** (§3.1 in the first draft): adopt the field wording or revert to the repo's.
5. **Promotion.** Nothing promoted. Live prompt is still v17.
