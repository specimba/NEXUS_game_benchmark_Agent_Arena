# 02 — Formal Scoring Rubric: One-Shot Game Development Agent Creation

Transparent, evidence-gated, multi-criteria rubric for **creator agents**, not player agents.
Every category weighted mean of explicit sub-criteria (0–5 behavioral anchors), auditable back to observed behavior.
No hidden bonuses. No score for features not experienced. No double-counting defects.
Rewards code quality, creative originality, long-session execution, design judgment, visual ambition, human-perceived quality.

## 2.1 Scoring language

Each sub-criterion 0–5:

| Score | Anchor |
|------:|--------|
| 0 | Absent, broken, or not experienced (treat as absent) |
| 1 | Poor — present but harms experience / structure |
| 2 | Below average — clearly weak or unreliable |
| 3 | Adequate — functional, meets minimum, unremarkable |
| 4 | Good — above average, well executed |
| 5 | Excellent — among best, memorable positive, would discuss after playing |

Evidence rule: sub-score ≥3 must have timestamped note / capture / reproduction steps / code pointer (for code quality). Sub-score 0–1 must state whether absent/broken or not experienced. Any sub-score cannot be supported is downgraded to insufficient evidence and treated as not scored (excluded from mean, category marked PARTIAL-COVERAGE).

Subjectivity rule: SUBJ tag = taste-dependent; must pair emotional rating with behavioral observation (SUBJ score + OBS evidence). Weight lower and reported with dispersion.

## 2.2 Categories, weights, and sub-criteria

Category score = `round(mean(sub_criteria) × 2, 1)` → 0–10
Weights sum 100: designed to heavily weight visual ambition and human-perceived quality over safe generic implementation.

### T — Technical / Code Quality · weight 16%
| # | Sub-criterion | SUBJ |
|---|---------------|------|
| T1 | Cold launch & fresh-load reliability (no crash/blank/console-loop) | |
| T2 | Crash / freeze / runtime-error frequency during normal play | |
| T3 | Restart & state reset integrity (instant restart, run state fully reset) | |
| T4 | Persistence reliability if applicable (save/load, corrupt-storage handled) or explicit no-persistence by design | |
| T5 | Input responsiveness & frame-rate independence (buffering, focus/visibility safety, no scroll/zoom leak) | |
| T6 | Performance consistency over time (FPS stability, jank, memory growth, pooling, capping, DPR handling) | |
| T7 | Code structure & maintainability (separation state/input/loop/rendering/collision/audio, centralized tunables, no scattered magic numbers, evidence of iteration/refactor) | |

### M — Core Mechanics & Code Craft · weight 17%
| # | Sub-criterion | SUBJ |
|---|---------------|------|
| M1 | Clarity of rules & learnability of core loop (<1 min) | |
| M2 | Game feel & responsiveness (hit-stop, shake, buffering, timing, feedback) | SUBJ |
| M3 | Mechanical depth & variety (emergence, viable approaches, not one-trick) | |
| M4 | Balance & fairness — **first level/wave beatable by a real human in ~5 min honest play**; no unfair kills; timing windows fair; scaling sane. Score 0-1 if onboarding challenge is unbeatable or "clever-but-impossible"; capped at 2 if difficulty spikes with no telegraph. An early cliff at level 2/3 that blocks ALL further honest progress scores 0–1 the same as an unbeatable level 1 (CEIL-5). | |
| M5 | Meaningful player choice & agency (risk/reward, tactical decisions) | |
| M6 | Feedback quality (telegraphs, numbers, hit/miss/crit, sound/visual); **death readability** — player understands what killed them and wants to retry | |
| M7 | Creative mechanical twist (original system not in brief that preserves readability but adds depth) | SUBJ |
| M8 | **Depth after the wow / sustained interest at minute 5**. After the first-impression beat, is there another beat? A scaling curve, a new mechanic, a new environment, a second layer? 0=exhausted in 90s / screensaver, 1=one-trick repeats, 2=modest scaling only, 3=one new beat lands, 4=multiple beats sustain 15+min, 5=game keeps opening up. SUBJ but must cite specific beat timestamps. | SUBJ |

### G — Gameplay & Human-Perceived Quality · weight 17%
| # | Sub-criterion | SUBJ |
|---|---------------|------|
| G1 | Onboarding & tutorial quality (understand goal in first minute, no manual) | |
| G2 | Clarity of goals & progression (know what to do, why, where) | |
| G3 | Reward structure & motivation (progression feels earned & impactful, visible) | |
| G4 | Challenge curve & pacing of difficulty | |
| G5 | Variety of encounters/activities (mix, types, events, climax) | |
| G6 | Fun & sustained engagement / replayability | SUBJ |
| G7 | Player story (at 30 min, can player tell story about their run that differs from another player's story? Emergent narrative) | SUBJ |

### F — Game Flow & Coherence · weight 12%
| # | Sub-criterion | SUBJ |
|---|---------------|------|
| F1 | Quality of first 5 minutes | |
| F2 | Quality of first 30 minutes | |
| F3 | Mid-session pacing & sustained interest | SUBJ |
| F4 | Transitions between activities (rooms/levels/states/menus) | |
| F5 | Absence of repetition, padding, dead time | |
| F6 | Coherence of end-to-end experience (beginning → complete run, feels authored) | |

> Flow gating: No F3/F6 score above 3 without ≥30 min live play evidence.

### V — Visual & Presentation (Ambition Weighted Heavily) · weight 20%
| # | Sub-criterion | SUBJ |
|---|---------------|------|
| V0 | **Graphical originality, visual richness & complexity** — how original and sophisticated/detailed visuals are. Rewards distinctive identity and real technical/artistic complexity (layered lighting, fog, textured surfaces, particle systems, camera composition, cohesive palette, dressing). Penalizes generic geometric shapes, plain colored rectangles, empty rooms, simple box gradient colored enemies, visual sameness, flash-game look. Must be sustained across whole game, not single hero screen. Anchor: 0=no visuals/placeholder, 1=primitive shapes/flat colors OR simplistic box gradient enemies, 2=competent but generic (including competent gothic clone with no personal touch OR simple box with gradients), 3=coherent but derivative, recognizable theme minimal detail, 4=genuinely original detailed consistent strong artistic identity with visible craft across entire run, 5=near-commercial + authored point of view, pushes limits beyond template. | SUBJ |
| V1 | Art direction & visual coherence (consistent palette, intentional direction) | SUBJ |
| V2 | Readability of gameplay entities under combat/action (attacks, hazards, player, rewards obvious) | |
| V3 | Animation & juice quality (squash-stretch, trails, afterimages, particles, feedback) | |
| V4 | Lighting, atmosphere, effects, depth (fog, vignette, layered) — without clutter | SUBJ |
| V5 | UI clarity & polish (menus, HUD, legibility, no broken buttons) | |
| V6 | Rendering robustness & graceful fallback (WebGPU→WebGL→Canvas2D, no white screen, no unrecovered full-screen flash/bloom/whiteout — see CEIL-9, gameplay intact) | |
| V7 | Visual consistency across environments (desktop/mobile/portrait/landscape/DPR1/DPR2, no clipped UI, identity coherent) | |
| V8 | **Surprise & inversion** — one coherent original mechanic/room/narrative/visual twist not in brief that remains learnable and enhances sustained engagement. 0=no surprise / random noise, 1-2=gimmick harms flow, 3=modest twist works, 4=memorable twist changes approach, 5=would talk about after playing — original integral | SUBJ |
| V9 | **Working-3D / heavy-tech bonus** — GPU-programmed rendering (WebGL / WebGPU / Three.js / shader-heavy Canvas2D / non-trivial physics or fluid sim) that *also* passes every gate: controls tight, framerate stable on average hardware, no scene/menu collapse. 0=no such ambition attempted, 3=attempted and partially works but has visible defects, 4=attempted and works cleanly across the run, 5=works and is genuinely a "how did this run in a browser?" moment. **Broken 3D/heavy tech does NOT score here — it is a category defect logged against T2/T5 and caps V9 at 0.** Deliberate polished 2D/text/minimalism scores neutral (V9=N/A, excluded from mean) rather than penalized. | |

> V0 explicitly penalizes simple box gradient colored enemies / flash-game approach. A deliberate minimalism that is expressive and highly polished can score 4-5 if intentional and coherent.

### A — Atmosphere & World Invention · weight 12%
| # | Sub-criterion | SUBJ |
|---|---------------|------|
| A1 | Mood & emotional impact | SUBJ |
| A2 | Audio & music quality (sounds fitting, music integrates with intensity, or convincing visual-only fallback) | |
| A3 | Environmental storytelling & sense of place | SUBJ |
| A4 | Thematic consistency (mechanics, visuals, terms, lore cohere) | |
| A5 | Ability to sustain immersion (no jolts/breaks destroying mood) | SUBJ |
| A6 | World invention & narrative voice (consistent voice beyond generic, original world you remember) | SUBJ |

### X — Accessibility & Inclusion · weight 6%
| # | Sub-criterion | SUBJ |
|---|---------------|------|
| X1 | Keyboard menu navigation & visible focus states | |
| X2 | Reduced-motion mode actually reduces shake/flash/particles | |
| X3 | High contrast & non-color-only encoding | |
| X4 | Touch/desktop responsiveness & safe areas / legibility at small sizes | |
| X5 | Audio failure does not block gameplay; sound toggle present | |

Weights: T16 M17 G17 F12 V20 A12 X6 = 100 (V heavily weighted to punish simple box gradient enemies, reward visual pushing limits).

## 2.3 Aggregation

```
CATEGORY_c = round(mean(sub_criteria_c) × 2, 1)  # 0-10, N/A sub-scores excluded
OVERALL_raw = Σ_c WEIGHT_c × CATEGORY_c  # 0-100
HARD_PENALTY = (blocker×6.0)+(critical×4.0)
HARD_PENALTY = min(30)
OVERALL_adj = max(0, OVERALL_raw − HARD_PENALTY)
Ceilings override OVERALL_adj (take min):
CEIL-1 55 main-path crash/soft-lock
CEIL-2 65 primary loop unreachable
CEIL-3 60 core controls broken >30%       (incl. mouse-aim broken, out-of-canvas soft-lock)
CEIL-4 70 persistence fails on fresh browser
CEIL-5 50 first level/wave unbeatable by real human in ~5 min, OR an early difficulty cliff (level 2/3) that blocks ALL further progress for an honest player  (M4=0 confirmed)
CEIL-6 65 constant audio drone / streaming loop that cannot be silenced
CEIL-7 60 menu ↔ gameplay state leak (clicks/keys fire through overlays or trap after close)
CEIL-8 55 ambition-theater 3D: shipped 3D/heavy-tech that structurally breaks controls or framerate
CEIL-9 55 persistent visual occlusion: full-screen effect (flash / bloom / whiteout / additive blowout) that fails to decay (~2 s) and renders the playfield unreadable for the rest of the run or until reload — functionally a soft-lock of the visual channel (Round 007: sonar game mine-explosion left screen white while sim continued)
Final OVERALL = min(OVERALL_adj, all applicable ceilings) rounded 0.1
```

## 2.4 Pillars (for reporting)

```
TECHNICAL_QUALITY = round(0.50×T +0.30×(100−normalized_hard_failures)+0.20×M,1)×10? Simplified:
TECHNICAL_RELIABILITY = 0.70×CATEGORY_T +0.30×(100−normalized_hard_failures)
CREATIVE_PRESENTATION = 0.45×CATEGORY_V +0.40×CATEGORY_A +0.15×CATEGORY_X ×10
GAMEPLAY = 0.50×M+0.50×G ×10
FLOW = 0.60×F+0.20×A+0.20×G ×10
CODE_QUALITY = T7 + M centralization + pooling evidence
VISUAL_AMBITION = V0×10, plus V8
HUMAN_JURY = G6 + F + V0 + A
DEFECT_SEVERITY = max(0,100−HARD_PENALTY−minor×0.5−trivial×0.1)
ORIGINALITY_BONUS = (V0+V8+A6+M7)/4 ×2 up to +3 tie-breaker, reported outside OVERALL, requires no CEIL and V8≥3 sustained evidence
```

Headline OVERALL is canonical comparison, but pillars answer "more technically reliable" vs "more creative" vs "visually pushing limits".

## 2.5 Defect severity & no-double-counting

Blocker = main-path soft-lock, unreachable finish, control unusable, loop cannot proceed — counts toward HARD_PENALTY and ceilings
Critical = crash, save loss, major mechanic broken, accessibility path broken — counts toward HARD_PENALTY
Major = secondary feature broken, needs workaround, significant immersion break — category scores only
Minor = cosmetic glitch, occasional jank, minor readability — category +0.5 DEFECT_SEVERITY
Trivial = nitpick — 0.1 DEFECT_SEVERITY

No-double-count: every defect logged once, counted once. Category scores already reflect experienced quality. HARD_PENALTY only for Blocker/Critical.

## 2.6 Transparency

Weights fixed public, no hidden bonuses, no credit unexperienced, report PARTIAL-COVERAGE when sub-criterion not experienced, report confidence, distinguish hard failures objective vs subjective SUBJ.

## 2.7 Visual ambition anchoring (explicit anti-flash-game)

- To score V0 ≥3, game must show intentional art identity sustained across entire run, not just hero screen, with at least two of: layered lighting, procedural texture, fog/vignette, particle system, camera composition, cohesive palette, dressing.
- To score V0 ≥4, must be clearly beyond simple box gradient colored enemies, empty rooms, generic UI — must have point of view and visible craft pushing limits.
- Simple box gradient enemies with no dressing: V0 max 1 regardless of functionality. This is intentional to push limits rather than simple shitty flash game approaches.
- Deliberate minimalism (e.g., precise monochrome with exquisite timing, or single mechanic with perfect feedback) can score 4-5 if expressive, highly polished, coherent — evidence: intentional constraint documented in README director statement, and polish observable across entire run.
- **Convergent-cliché note (post-Round-003 revision).** The §6.5 cluster registry is now judge-side only — the agent does NOT see it in v7 of the battle prompt. When a game lands in a registered cluster (C1–C10), the evaluator applies a **soft note**, not a hard cap: V0 / V1 sub-scores of 4–5 require *extra* explicit evidence that execution is transformative beyond the trope (not merely that the trope is polished). Sub-scores of 3 are unaffected. Rationale: v6 hard-capped agents that had never been warned, which was unfair; but the judge should still be aware when the tenth lantern-and-moths game of the week walks in. Cluster C11 ("novel-verb + procedural-canvas + WebAudio, no image assets") is a special case: it was CAUSED by v6 warnings, so judges should be extra generous about it in Round 003 evaluations and increasingly strict thereafter as v7 has time to break the pattern.

## 2.8 Long-session execution track (M — process signal)

The benchmark scores the *game*, not the log. But because this is a *one-shot* benchmark, whether the deliverable is actually the result of a single session matters for comparability. Two tracks:

### Primary Battle Track (strict one-shot)
The default. The build was produced in a single sustained development session — one delivery, no post-hoc iteration passes across multiple returned artifacts. All the OVERALL / OVERALL_adj / pillars in §2.3 refer to this track by default.

### Iterated Build Track (disclosed multi-turn)
Builds produced across multiple polish passes after the first delivered artifact. These are legitimate creative work but **do not compete for the primary battle result**. Scored on the same rubric with two adjustments:

- **Cannot win category-best on Long-Session Execution / M (mechanics craft)** — multi-turn iteration is a different skill and mixing them makes the score meaningless.
- **Cannot be the winner of a head-to-head battle** where the opposing entry is strict one-shot. Reported on the iterated shelf separately with a `TRACK=iterated` tag and turn count.

Track determined by:
1. **Self-disclosure** in the README (agents SHOULD disclose; failure to disclose known multi-turn iteration is a Critical HONESTY defect).
2. **Launch harness telemetry** — turn count / delivery count captured by `challenge/launch_challenge.py` where visible.
3. **Log-based estimate** — evaluator flag if the session log shows >1 "final deliverable" ship.

If track is uncertain, default to iterated; err toward not falsely crediting a strict-one-shot win.

## 2.9 Working-3D / heavy-tech bonus (V9) — explicit rules

V9 rewards ambition that lands. It does NOT penalize deliberate 2D/text/minimalism.

- Attempted 3D/WebGL/WebGPU/heavy-physics with **any** of {broken controls at CEIL-3, framerate <30 fps on average hardware, menu/scene collapse, camera divorces from physics} → V9=0 AND CEIL-8 triggers.
- Attempted and works cleanly through a full run → V9 in 3-4.
- Works, and is unmistakably a "how did this run in a browser?" moment → V9=5.
- Not attempted (deliberate 2D/text/minimalism, clearly chosen) → V9=N/A, excluded from V mean. Not a penalty.
- Attempted, works, but is a *technical* exercise with no gameplay value → V9 max 2 (ambition without integration).

This is intentional: prior rounds showed multiple agents ship broken 3D that would have scored higher as competent 2D. Codifying V9 makes that trade explicit.

## 2.10 Creative-v0 category mapping (v12 merge)

The v12 prompt merges the operator-proposed "2026 Creative Battle Prompt," which carried its own 12-category scoring lens (Creative Identity, First Impression, Playability, Interaction Quality, Visual Direction, Atmosphere, Discovery, Narrative, Depth, Technical Execution, Polish, Memorability). These are **NOT** added as new rubric categories — they map onto the existing T/M/G/F/V/A/X, and the rubric stays **judge-side only** (never embedded in the agent prompt, per §6.3 — embedding it invites checklist-compliance gaming). Mapping for evaluators:

| Creative-v0 category | Existing rubric home |
|---|---|
| Creative Identity | V8 (surprise/inversion) + A6 (world invention) + M7 (mechanical twist) |
| First Impression | F1 (first 5 min) + V0 |
| Playability | G1/G2 + T1/T5 |
| Interaction Quality | M2 (feel) + T5 (input) |
| Visual Direction | V0/V1/V4 |
| Atmosphere | A1/A3/A5 |
| Discovery | G5 (variety) + G7 (player story) + V8 + M8 (depth-after-wow) |
| Narrative | A6 + G7 |
| Depth | M8 + F2/F3 |
| Technical Execution | T (all) + V6/V9 |
| Polish | V5 + T3/T6 + F6 |
| Memorability | G6 (fun/sustained) + V8 + A6 |

**Discovery and Memorability become first-class evaluation priorities** (previously implicit): in the HUMAN_JURY pillar (§2.4), weigh the discovery cluster (G5/G7/V8/M8) and the memorability cluster (G6/V8/A6) explicitly. No new weights or sub-criteria are added — they already exist; the v12 merge only elevates attention to them, matching the operator's repeated emphasis on discovery, atmosphere, and memorability across Rounds 002–008.

## 2.11 Machine contract — single source of truth

The executable facts of this rubric (weights, criterion id sets, ceiling caps, penalty
constants) are mirrored verbatim in `benchmark/contracts/RUBRIC_v2.json`. **Markdown
describes; JSON computes.** The JSON is consumed by `benchmark/ops/aggregate_scores.py`
and `benchmark/ops/validate_evidence.py`. Never change one copy without the other:
`python benchmark/ops/consistency_check.py` and `python benchmark/tests/run_all.py` fail
on any drift between this doc, the contract, the aggregator, and the evidence schema
(this guard exists because the aggregator historically kept scoring with stale
weights/criteria/ceilings while this rubric moved on).

<!-- RUBRIC_CONTRACT_V2_BEGIN -->
{
  "contract_id": "NEXUS-ARENA-RUBRIC-2",
  "version": "2.0.0",
  "title": "NEXUS Agent Arena \u2014 machine-executable rubric contract",
  "description": "Single source of truth for the executable scoring semantics: category weights, sub-criterion id sets, ceiling caps and penalty constants. Human-readable semantics and behavioural anchors live in benchmark/02-scoring-rubric.md. Markdown describes; JSON computes. Any change here must be applied together with the embedded copy in benchmark/02-scoring-rubric.md, then verified by: python3 benchmark/ops/consistency_check.py and python3 benchmark/tests/run_all.py",
  "source_doc": "benchmark/02-scoring-rubric.md",
  "release_date": "2026-09-03",
  "weights_sum_check": 100,
  "weights": {
    "T": 16,
    "M": 17,
    "G": 17,
    "F": 12,
    "V": 20,
    "A": 12,
    "X": 6
  },
  "criteria": {
    "T": [
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7"
    ],
    "M": [
      "M1",
      "M2",
      "M3",
      "M4",
      "M5",
      "M6",
      "M7",
      "M8"
    ],
    "G": [
      "G1",
      "G2",
      "G3",
      "G4",
      "G5",
      "G6",
      "G7"
    ],
    "F": [
      "F1",
      "F2",
      "F3",
      "F4",
      "F5",
      "F6"
    ],
    "V": [
      "V0",
      "V1",
      "V2",
      "V3",
      "V4",
      "V5",
      "V6",
      "V7",
      "V8",
      "V9"
    ],
    "A": [
      "A1",
      "A2",
      "A3",
      "A4",
      "A5",
      "A6"
    ],
    "X": [
      "X1",
      "X2",
      "X3",
      "X4",
      "X5"
    ]
  },
  "sub_score_scale": {
    "min": 0,
    "max": 5
  },
  "ceilings": {
    "CEIL-1": 55,
    "CEIL-2": 65,
    "CEIL-3": 60,
    "CEIL-4": 70,
    "CEIL-5": 50,
    "CEIL-6": 65,
    "CEIL-7": 60,
    "CEIL-8": 55,
    "CEIL-9": 55
  },
  "ceiling_definitions": {
    "CEIL-1": "main-path crash / soft-lock",
    "CEIL-2": "primary completion loop unreachable",
    "CEIL-3": "core controls broken >30% (incl. mouse-aim broken, out-of-canvas soft-lock)",
    "CEIL-4": "persistence fails on fresh browser (when persistence claimed)",
    "CEIL-5": "first level/wave unbeatable by a real human in ~5 min, OR an early difficulty cliff that blocks ALL further honest progress",
    "CEIL-6": "constant audio drone / streaming loop that cannot be silenced",
    "CEIL-7": "menu <-> gameplay state leak (clicks/keys fire through overlays or trap after close)",
    "CEIL-8": "ambition-theater 3D: shipped 3D/heavy-tech that structurally breaks controls or framerate",
    "CEIL-9": "persistent visual occlusion: full-screen effect (flash/bloom/whiteout/additive blowout) that fails to decay (~2 s) and renders the playfield unreadable until reload"
  },
  "penalties": {
    "hard_by_severity": {
      "Blocker": 6.0,
      "Critical": 4.0
    },
    "hard_cap": 30.0,
    "defect_severity_by_severity": {
      "Minor": 0.5,
      "Trivial": 0.1
    }
  },
  "notes": {
    "aggregation": "CATEGORY_c = round(mean(sub_criteria_c) x 2, 1); OVERALL_raw = sum_c WEIGHT_c x CATEGORY_c / 10; OVERALL_adj = max(0, OVERALL_raw - min(hard_cap, blockers*6 + criticals*4)); OVERALL = min(OVERALL_adj, applicable ceilings). N/A criteria (documented in evidence not_applicable) are excluded from the mean.",
    "pairwise": "Per-game evidence records contain NO pairwise content. Pairwise verdicts live in a separate pairwise_result.json receipt (benchmark/contracts/pairwise_result.schema.json)."
  }
}
<!-- RUBRIC_CONTRACT_V2_END -->
