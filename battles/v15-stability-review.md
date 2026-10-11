# v15 Stability & Reliability Review — Change Log & Validation Gate

**Directive:** operator planning directive (2026-08-24). This cycle is a structured engineering pass: the Round-010 A/B data is the **authoritative specification**; every modification must trace to a failure mode observed in that data and carry a measurable expected shift; no shallow/sweeping changes; **no deployment before validation**.
**Artifact under review:** `challenge/BATTLE_PROMPT_v15_HYBRID.md` (rev-1 draft).
**Status — OPERATOR APPROVAL RECEIVED (2026-08-24):** **APPLY CH-1, CH-2, CH-5, CH-6, CH-7 + carried. DROP CH-3, CH-4** (the two convergence guards). NC-1…NC-5 stand as logged (no action). **v15.1 (operator-approved composition) has been applied to the draft** = rev-1 − CH-3 − CH-4 + CH-7. Live prompt remains **v13** until R011 validation passes and the operator signs off. Validation: **operator's original 4-battle / 8-output A/B format, random battle models, operator-approved thresholds** (see §6).

---

## 0. APPROVAL CHECKLIST — DECIDED (operator reply, 2026-08-24: "CH-1, CH-2, CH-5, CH-6, CH-7, carried — focus on these")

| # | Proposed change (one line) | Origin (test case) | Verdict |
|---|---|---|---|
| CH-1 | Ambition-first opening + tone ("capability is in your hands — use it… 2026, not 2013") | FM-1 (v13-Grok 2 vs LEAN-Grok 23 3D-stack mentions) | ✅ **APPLIED** |
| CH-2 | Permissive concept freedom ("any genre… your call") | FM-1 | ✅ **APPLIED** |
| CH-3 | Compact guard: sound/signal family cross-out | FM-2 (grok-4797: 7 C14 hits, first LEAN try) | ❌ **DROPPED by operator** |
| CH-4 | Compact guard: tangible-craft one-liner | C16/R009 | ❌ **DROPPED by operator** |
| CH-5 | The 7 hard reliability gates | FM-4 + R001/R007/R009 | ✅ **APPLIED** |
| CH-6 | Ambition-theater warning ("broken ambitious build scores worse") | FM-7 (R009 black-beside-HUD; R010 laggy 3D) | ✅ **APPLIED** |
| CH-7 | Gate-2 "real resistance / fail state / story" clause | FM-6 ("randomly clicked and whole crew survived to end"; "no story at all") | ✅ **APPLIED** |
| carried | WHY_INTERACTIVE · TRACK disclosure · README paragraphs | Creative-v0 / R003 / R005 | ✅ **APPLIED** |
| NC-1…NC-5 | The no-change decisions (§4) | §1 evidence | ⬜ stand as logged |

---

## 1. Failure-mode extraction (the specification, from test data)

Source: `../logs/game-log-10.txt` (Round-010 controlled A/B: v13 cautious vs LEAN, Grok 4.6 ×3+3 / Sonnet 5 ×2+3; DeepSeek V4 Vision failed to start and was dropped). Prior-round data cited where the operator's experiment history is the evidence base.

| FM | Failure mode | Evidence (verbatim / measured) | Condition | Gap area |
|---|---|---|---|---|
| **FM-1** | Ambition suppression — cautious prompt suppresses 3D/shader ambition on a capable model | 3D/WebGL/Three.js stack mentions: **v13-Grok 2 vs LEAN-Grok 23** (same model, n=3 each); *"whole visuals are static images"*; v13 output = static-image visual novels | v13 | creative quality |
| **FM-2** | C14 regression — sound/signal family returns when guard removed | grok-4797: *"radio operator on a dying satellite… weight of every signal you choose to decode… signal's frequency warbles"* — **7 C14-term hits** in one session, first LEAN try | LEAN | creative quality |
| **FM-3** | Prior-concept regression — underwater/dive + gravity/black-hole echo earlier rounds | *"grok made nearly same thing as like submarine session… sonnet5 created 2D blackhole like gravity thing"*; operator: *"how these are so similar to previous rounds that should be related with prompt"* | LEAN | creative quality |
| **FM-4** | Reliability incidents — bugged runs, crashes, lag, total launch failure | 4 verbatim incidents: *"bugged out on this run"* (grok), *"crashed out"* (sonnet), *"laggy in some interaction points"* (grok 3D), *"not able to start work retried many times"* (DeepSeek — 100% failure) | both | task performance |
| **FM-5** | Model-capability gap — Sonnet 5 visually weak under both prompts | *"lower visual attractiveness"*, *"very simple 2d shooter ship thing… not counted any high score deserved thing"* | both | task performance (pool-level) |
| **FM-6** | No real resistance / fail state; narrative forms with no story | *"I randomly clicked and whole crew survived to end which makes both flawed"* (sonnet resource-mgmt), *"visual novel in very narrow story or maybe there is no story at all"* | v13 | creative quality |
| **FM-7** | Ambition-theater — ambitious builds shipping broken (carried evidence) | R009: *"game completely black beside HUD"*; R010: the laggy 3D build | LEAN/R009 | task performance |

## 2. Audit of v15 rev-1 — traceability check

Every rev-1 element was checked against §1. Result: **all elements trace** (matrix below) **except FM-6, which rev-1 does not address** — the lean-derived gate list requires a complete *loop* but not *resistance*, and rev-1 dropped v13's §2 "resistance" clause. That is the one defect; it gets the single rev-2 fix (CH-7). Nothing in rev-1 was found to lack an evidence base.

## 3. Change log — v15 rev-1 → rev-2 (v15.1)

| CH | Change | Originating FM / test case | Expected metric shift | Validation |
|---|---|---|---|---|
| CH-1 | Ambition-first opening + tone (*"that capability is in your hands — use it… looks like 2026, not 2013"*) | FM-1 (2 vs 23 stack mentions) | M-1: 3D/WebGL/Three.js stack mentions per Grok session rises from v13 baseline (~0.7/session) into the LEAN range (~7.7/session); ≥1 actual 3D/WebGPU build per session-pair | R011 Arm-B vs R010 v13-Grok baseline |
| CH-2 | Permissive concept freedom (*"any genre… your call"*) | FM-1 | Concept spread across ≥3 distinct families per 3 sessions (vs v13's visual-novel monoculture) | Concept scan of R011 outputs |
| CH-3 | Compact guard: sound/signal family cross-out | FM-2 (7 C14 hits, first LEAN try) | M-2: C14-family concept hits = **0** (LEAN baseline: 1/3 Grok sessions C14-positive) | Concept scan (grep radio/signal/frequency/decode/sonar/radar) |
| CH-4 | Compact guard: tangible-craft one-liner (*"physical-material is one family of seven, not the answer"*) | C16/R009 (craft converged under v12 with zero named examples: both Claude models) | M-3: craft/sim-by-default share = 0 (chosen craft allowed, must be argued) | Concept scan |
| CH-5 | The 7 hard reliability gates (launch/loop/controls/pause/self-contained/robust/honest) | FM-4 + R001 (audio drone), R007 (CEIL-9 whiteout, level-2 cliff), R009 (black screen) | M-4: 0 crashed/bugged shipped runs; 100% clean launch on fresh load | R011 launch check per output |
| CH-6 | Ambition-theater warning (*"a broken ambitious build scores worse than a clean simple one — finish it"*) | FM-7 (R009 black-beside-HUD; R010 laggy 3D) | M-4b: 0 CEIL-8/CEIL-9 hits among ambitious builds | R011 render check |
| **CH-7 (NEW, rev-2)** | Gate 2 rewritten: **"Complete loop with real resistance — … something that can actually stop you (a fail state, a wall, a cost you can't undo)… If a player clicking randomly reaches the end unchanged, it isn't a game yet — and a narrative form must have an actual story to find."** | **FM-6** (*"randomly clicked and whole crew survived to end"*; *"no story at all"*) | M-5: every shipped build demonstrates a real fail/end state; narrative forms carry discoverable story | R011 fail-state verification (operator play-check) |
| carried | WHY_INTERACTIVE question; TRACK disclosure; README paragraphs (PILLARS/DIRECTOR/WHY/HONEST) | Creative-v0 (operator-introduced, R007+); R003 honesty; R005 craft-adoption evidence | unchanged behavior | regression check only |

## 4. Explicit no-change decisions (evidence-discipline record)

Per the directive — defaulting to the data, not judgment:

- **NC-1 — No underwater/gravity avoid item.** FM-3's underwater/gravity echoes appeared under LEAN (n small, 2 sessions) and were absent under v13; insufficient evidence to justify a third guard (and avoid-list growth is the documented C11 failure mode). **Watch-item:** if FM-3 recurs under v15.1 in R011, register it and add the guard in v15.2 with this entry as its origin.
- **NC-2 — No restriction on visual novels / static images.** The operator's R010 assessment of Grok's VNs was mixed (*"can make great anime like JRPG… but whole visuals are static images"*); CH-1 (ambition) is the evidence-backed lever for dynamism; banning a form contradicts the v13 §2 rebalance evidence. Watch-item only.
- **NC-3 — Sonnet visual gap (FM-5) is out of prompt scope.** Model-level under both conditions → pool decision, not a v15.1 change. Recommend: Grok 4.6 remains the primary test model; retry DeepSeek V4 Vision separately as an availability test.
- **NC-4 — Long craft lectures / trap essays NOT re-added.** R010 evidence: they are not the load-bearing part of the guards (CH-3/CH-4 compact lists are) and they are implicated in FM-1 (ambition suppression). Re-adding them would regress CH-1.
- **NC-5 — Self-QA checklist not re-added in v15.1.** No measurable R010 evidence that its absence caused FM-4 (the LEAN failures are ambition-outpacing-scope, FM-7, and one model crash). **Open question, logged:** if R011 M-4/M-4b miss target, re-add a minimal 5-line self-QA as v15.2 with FM-4 as origin.

## 5. v15.1 revision (operator-approved composition) — **APPLIED 2026-08-24**

`challenge/BATTLE_PROMPT_v15_HYBRID.md` = rev-1 with exactly two deltas, per the operator's approval:

```
1. REMOVED (CH-3 + CH-4 dropped by operator): the entire "Two defaults the whole
   field keeps falling into — cross them off your list" section (sound/signal
   family cross-out + tangible-craft one-liner). No convergence guards remain.

2. APPLIED (CH-7 approved): gate 2 rewritten —
   - 2. **Complete loop** without a page refresh: start → play → progress → end → restart.
   + 2. **Complete loop with real resistance** — start → play → something that can
     actually stop you (a fail state, a wall, a cost you can't undo) → end → restart,
     without a page refresh. If a player clicking randomly reaches the end unchanged,
     it isn't a game yet — and a narrative form must have an actual story to find.

   Header: (v15) → (v15.1). No other text changes.
```

CH-1, CH-2, CH-5, CH-6, and the carried elements were already present in rev-1 and stand unchanged.

## 6. Validation protocol (R011) — per operator's decisions (2026-08-24 Q&A)

- **Structure — the operator's original 4-battle / 8-output A/B format:** B1 + B3 = **v13** (cautious), B2 + B4 = **v15** (hybrid, as approved in §0). Each battle = a two-agent head-to-head, **both agents on the same prompt** (never mixed). 8 outputs total.
- **Models — random battle models** (operator decision): the two models per battle are drawn by the arena's random-battle mode, not hand-picked. **Record model identity per output post-hoc** (fingerprint-first, per anti-gaming §6.6 — identity never influences scoring). *Known confound, recorded not hidden:* random assignment does not balance model capability across the v13/v15 arms; FM-5-class draws (a visually-weak model) can depress M-1 for reasons the prompt cannot fix. The analysis therefore reports M-1 per model and flags such draws explicitly.
- **Metrics:** M-1 (3D/WebGL/Three.js stack mentions per session + ≥1 real 3D/WebGPU build per battle), M-2 (C14 concept hits = 0), M-3 (craft-by-default = 0), M-4 (0 bugged/crashed, 100% clean launch), M-4b (0 CEIL-8/9), M-5 (fail-state + story present).
- **Pass condition for deployment (operator-approved thresholds):** across all v15.1 outputs — M-2, M-3, M-4, M-4b, M-5 all pass (**zero tolerance: any C14 concept, any craft-default, any crash, any no-fail-state = automatic fail**), **and** M-1 reaches **≥50% of the LEAN baseline** (R010 LEAN-Grok: 23 mentions / 3 sessions ≈ 7.7 per session → threshold ≈ 3.8 per session, or ≥1 real 3D/WebGPU build per battle).
- **Implication of the operator's composition (guards dropped, thresholds kept):** v15.1 contains **no convergence guards** (CH-3/CH-4 dropped) while M-2/M-3 remain **zero-tolerance pass gates**. R011 therefore directly tests whether the ambition-first prompt *alone* keeps the field off C14/C16. The pre-committed knob stands: if M-2/M-3 fail, CH-3/CH-4 re-enter as v15.2 with this round as origin.
- **Failure → knob mapping (pre-committed, no ad-hoc revision):** M-1 fail → tone not permissive enough (CH-1 wording); M-2/M-3 fail → guard block re-added (CH-3/CH-4 wording); M-4/M-4b fail → NC-5 self-QA re-added; M-5 fail → CH-7 wording strengthened. Each maps to exactly one knob.

## 7. Deployment gate

**v15 does not become the live prompt until (a) the operator approves the change log in §0, (b) §6's pass condition is met on R011 data, and (c) the operator signs off.** The live prompt remains v13. On pass: promote to `challenge/BATTLE_PROMPT.md`, retire v13, log the promotion against the approved CH list. On any fail: apply only the pre-committed knob for the failed metric; no other edits; re-validate.
