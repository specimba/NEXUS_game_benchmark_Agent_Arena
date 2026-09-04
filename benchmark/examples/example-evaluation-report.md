# Worked Example — Synthetic Evaluation Report

> **Purpose.** This is a *worked example* to show how a real report should look and how the
> scores aggregate. It is built from **synthetic evidence** (a plausible pair of games) to
> illustrate the format — it is **not** a real evaluation and must not be mistaken for one.
> To run a real comparison, follow `challenge/README.md` (build) and `benchmark/07`
> (evaluate), then produce a report from real evidence using this as the format guide.
>
> **Note (2026-09-03):** this worked example predates rubric contract v2 and the S4a/S4b
> split; its category weights/figures are illustrative and were not recomputed under
> `benchmark/contracts/RUBRIC_v2.json`. For current executable scoring facts use the
> machine contract; for the current session set use `benchmark/03` (S1–S9 + S4a/S4b).
> The machine-readable pairing of a real run must use one evidence record per game plus a
> separate `pairwise_result.json` receipt (see `benchmark/05`, `benchmark/contracts/`).

---

# NEXUS Agent Arena — Evaluation Report

**Pair ID:** `GC-0001` · **Date:** 2026-08-09 · **Evaluator:** `Eval-Panel-3`
**Ordering assigned:** A‑first · **Judge panel:** 3 judge families (ensemble majority)
**Hardware profile:** Std VM (8‑core, 16 GB, Chrome) + mobile emulation (Pixel, 390×844)
**Browser matrix:** desktop 1280×800 & 1920×1080; mobile portrait/landscape; Firefox smoke
**Total evaluation time:** 2 h 41 m (A) + 2 h 36 m (B) = 5 h 17 m

## 1. Executive comparison

- **Game A** is a complete, reliable, well‑paced roguelike. Its combat feels tight and its
  run loop holds together across many seeds and a long session. Its presentation is solid
  but conventional; the strongest single feature is the legible, satisfying combat feel.
  Its biggest weakness is that its visual identity is functional rather than striking.
- **Game B** has a far stronger visual identity and atmosphere — memorable art, better
  audio integration, and a distinctive mood. But it is structurally weaker: one main‑path
  soft‑lock, flaky high‑score persistence, and visible FPS decay in the long session.
- **Verdict:** Game A is the better complete game (reliability + gameplay + flow).
  B leads on **raw graphical originality** (V0 5 vs 3) — the dimension short demos most
  often miss — but its structural failures cap it.

## 2. Testing coverage

| Archetype | Game A | Game B | Objective met |
|-----------|:------:|:------:|---------------|
| S1 Smoke (5 min) | ✅ 6m | ✅ 5m | Both: first attack, dodge, defeat enemy, reward, room transition |
| S2 Warm restart (3 min) | ✅ 3m | ✅ 3m | Both: full state reset on instant restart |
| S3 Medium goal (30 min) | ✅ 32m | ✅ 30m | A: cleared floor 3. B: cleared floor 2, then soft‑lock |
| S4a Runtime soak (60 min) | ✅ 61m | ✅ 60m | A: stable. B: FPS decay late; one freeze (technical only) |
| S4b Experience endurance | ✅ full arc + 3 runs | ✅ arc broken at soft-lock | A: arc complete, repeats varied. B: main-path soft-lock blocks full arc |
| S5 Exploratory (20 min) | ✅ 21m | ✅ 19m | A: all abilities/enemies. B: all reached; boss on 2nd run |
| S6 Edge & boundary (15 min) | ✅ 14m | ✅ 15m | A: all probes pass. B: P‑Persist fail, P‑Stuck fail |
| S7 Accessibility (15 min) | ✅ 15m | ✅ 16m | A: passes. B: reduced‑motion works; focus OK |
| S8 Repeat runs (2+ runs) | ✅ 3 runs | ✅ 2 runs | A: 3 distinct seeds reachable. B: seed 2 boss soft‑lock |

Coverage: **A** — FULL (all categories) · **B** — FULL, but F and G reliability‑weighted
scores reflect the soft‑lock.

## 3. Category‑by‑category scores

### Game A

| Cat | Sub‑scores (0–5) | Cat (0–10) | Evidence summary |
|-----|------------------|-----------:|------------------|
| T | 5,4,5,4,4,4,4 | 8.6 | Clean load; no crashes; restart clean; persistence OK; responsive; stable; robust resize |
| M | 4,5,4,4,4,5 | 8.7 | Readable, great feel, decent depth, fair, meaningful choices, strong feedback |
| G | 4,4,4,4,4,4 | 8.0 | Clear onboarding, clear goals, good rewards, fair curve, good variety, engaging |
| F | 4,4,4,4,3,4 | 7.7 | Good first 5/30 min; some mid‑session repetition on floor 3 (F5=3) |
| V | 3,5,5,5,5,4 | 9.0 | Solid art; **excellent readability**; good juice; atmospheric; clean UI. Originality is solid but conventional (V0=3). |
| A | 5,4,5,5,4 | 9.2 | Moody; good audio; strong sense of place; consistent theme; immersive |
| X | 5,5,4,5,4 | 9.2 | Keyboard nav; reduced‑motion; high contrast; touch safe; audio fail safe |

**Game A:** OVERALL_raw 85.4 · HARD_PENALTY 0 · OVERALL_adj 85.4 · ceilings none ·
**OVERALL = 85.4** · pillars: tech 90.2, creative 91.1, gameplay 83.5, flow 80.6, defect 99.4.
*(Verified: `python ops/aggregate_scores.py` reproduces these exactly.)*

### Game B

| Cat | Sub‑scores (0–5) | Cat (0–10) | Evidence summary |
|-----|------------------|-----------:|------------------|
| T | 4,3,3,2,3,2,3 | 5.7 | Loads; crash on 1 seed; restart mostly OK; **persistence fail**; responsive; **FPS decay**; some resize glitch |
| M | 4,4,3,3,4,4 | 7.3 | Clear, good feel, moderate depth, some unfairness on boss, good choices, good feedback |
| G | 3,4,3,3,3,3 | 6.3 | Decent onboarding; clear goals; rewards weak on repeat; curve jagged; variety good; engagement dips |
| F | 3,3,3,3,3,2 | 5.7 | Good first 5; flatter first 30; mid‑session drag; transitions fine; some padding; **end‑to‑end broken (soft‑lock)** |
| V | 5,5,4,4,5,4 | 9.0 | **Striking, original art** (V0=5) — strong visual identity; good readability; good juice; great atmosphere; solid UI |
| A | 5,4,5,4,4 | 8.8 | Strong mood; better music integration; strong place; consistent; immersive until breaks |
| X | 4,4,4,4,4 | 8.0 | Keyboard nav; reduced‑motion; high contrast; touch OK; audio fail safe |

**Game B:** OVERALL_raw 69.9 · HARD_PENALTY 4 (1 critical) · OVERALL_adj 65.9 ·
ceilings **[CEIL‑1]** → **OVERALL = 55.0** · pillars: tech 65.9, creative 87.7, gameplay 68.0,
flow 64.4, defect 96.0.
*(Verified: `python ops/aggregate_scores.py` reproduces these exactly.)*

## 4. Defect register (summary)

| ID | Game | Sev | Class | Title | Blocks? | Recover? | Repros | Immersion | Evidence |
|----|------|-----|-------|-------|---------|----------|-------:|-----------|----------|
| D‑B01 | B | Critical | SOFT‑LOCK | Boss arena corner soft‑lock on seed 2 | yes | restart | 2 | high | [S8][00:07:20] |
| D‑B02 | B | Critical | DATA/PERSISTENCE | High scores lost on reload (fresh browser) | no | none | 3 | high | [S6][P‑Persist] |
| D‑B03 | B | Major | PERFORMANCE | FPS 60→~40 over 60‑min session | no | reload | intermittent | med | [S4] samples |
| D‑A01 | A | Minor | VISUAL | Occasional vignette flicker on resize | no | self | 2 | low | [S6] |
| D‑A02 | A | Trivial | UI | Button focus ring off‑center on title | no | self | 1 | low | [S7] |

Full records in the evidence bundle. No CONTAINMENT hits in either build (audit clean).

## 5. Critical failures

- **B — CEIL‑1:** reproducible boss‑arena soft‑lock (corner) on seed 2; player pushed into
  geometry, no recovery but full restart; reproduces 2/2. Triggers ceiling, capping B at 55.
- **B — Critical persistence:** high scores written but lost on reload on a fresh browser
  (3/3 reproductions). Does not block a single run but breaks the progression contract.

## 6. Strongest moments

- **A:** combat legibility under a 4‑enemy fight [S3][00:09:40]; boss entrance telegraphs
  [S4][00:52:10]; clean instant restart during a bad run [S6].
- **B:** title→room transition and first‑boss reveal are genuinely striking [S3][00:01:00,
  00:22:00]; audio swell on boss enrage [S5][00:13:30].

## 7. Weakest moments

- **A:** floor‑3 enemy‑spam repetition begins to feel padded around [S4][00:40:00].
- **B:** soft‑lock forces a wasted run [S8][00:07:20]; late‑session FPS decay breaks flow
  [S4][00:45:00+]; high‑score loss demotivates [S6].

## 8. Long‑session findings

- **A:** FPS stable 60 across 0/15/30/45/60 min; memory flat; engagement flat‑positive;
  3 distinct seeds all reachable and varied.
- **B:** FPS 60→~40 by 60 min; one freeze at 33 min; engagement strong early, dips
  mid‑session; seed 2 breaks the loop (soft‑lock); 2nd run re‑hit the boss soft‑lock.

## 9. Pairwise arena outcome

Independent scores (finalized before comparison):

| | A | B |
|---|--:|--:|
| OVERALL | 85.4 | 55.0 |
| Tech reliability | 90.2 | 65.9 |
| Creative | 91.1 | 87.7 |
| Gameplay | 83.5 | 68.0 |
| Flow | 80.6 | 64.4 |
| *Originality (V0)* | *3* | *5* |

Pairwise preference (both orderings, ensemble): **A wins** (confidence 0.9, both orderings
agreed). The pairwise agrees with the OVERALL ranking. Bradley–Terry on this single pair
is not meaningful alone; with multiple pairs the pipeline (`ops/aggregate_scores.py --bt`)
aggregates Elo ratings and CIs.

## 10. Confidence and limitations

- **Confidence: HIGH.** Full coverage, both orderings agreed, ≥2 reproductions on the two
  critical defects, three independent judge families in agreement.
- **Limitations.** Single hardware profile; B was tested on 2 seeds (1 broke) vs A on 3.
  SUBJ categories (V, A) show moderate dispersion across judges but both favored B's art.
  Performance measured on the std VM, not low‑end mobile silicon.

## 11. Final decision

**Game A is the better complete game.** Game B wins on **raw graphical originality**
(V0 = 5 vs 3 — it is the more distinctive and artistically ambitious build), and this is
the very dimension one‑shot benchmarks most often fail to reward. But B is structurally
compromised: a reproducible main‑path soft‑lock caps its score, its high‑score persistence
fails, and it degrades over long sessions. Game A is complete, reliable, well‑paced, and
plays great across many seeds, and its *overall* presentation is actually slightly ahead of
B's because its readability and polish make up for its more conventional style. On the
balance of reliability + gameplay + flow — the core of "which game can a player actually
complete and enjoy" — A wins clearly. The decision block below makes the originality‑vs‑
reliability separation explicit.

```
DECISION: Game A wins
OVERALL:    A = 85.4 | B = 55.0   (margin 30.4; B capped by CEIL-1)
Reliability: A better (90.2 vs 65.9; B hit CEIL-1 + persistence failure)
Creative:    A better overall (91.1 vs 87.7)
             but B leads on raw originality (V0: 5 vs 3) and atmosphere
Gameplay:    A better (83.5 vs 68.0)
Flow:        A better (80.6 vs 64.4)
Pairwise:    A wins (confidence 0.9, both orderings agreed)
Confidence:  HIGH
Rationale:   A is a complete, reliable, well-flowing roguelike across multiple seeds;
             B is the more originally drawn game (V0=5) but is structurally compromised
             (main-path soft-lock caps it; persistence fails; long-session FPS decay).
             A is the better complete game.
```
