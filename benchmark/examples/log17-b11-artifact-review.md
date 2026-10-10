# Worked example — artifact-and-verdict review (log 17, battle B11)

> **Purpose.** A real round's pair reviewed **from the artifacts plus the operator's verdict** — the way the benchmark actually receives most rounds (operator-run battles, no jury play sessions). It shows three judge-side practices introduced by round 018: the **executed-probe asymmetry**, **cluster membership ≠ novelty cap** (transformative execution matters), and **artifact-only evaluation limits** — specifically that this material can decide a *pair* but cannot produce a schema-valid evidence record (the validator, `benchmark/ops/validate_evidence.py`, requires at least one schema-valid session entry — an S1–S9 archetype with real durations — and no one ran timed sessions here).
>
> **Not** an evaluation record. **Not** a jury verdict. No scores are aggregated from this page; it is format guidance for judges reading operator-run rounds.

---

## 1. The pair, as delivered

| | Game A | Game B |
|---|---|---|
| **Title** | The Provenance Room | ECHO VAULT |
| **Agent (revealed after the fact)** | claude-opus-5 | muse-spark-1.3-xhigh |
| **Prompt** | `challenge/BATTLE_PROMPT_v21.md` (log17 L1–87) | same bytes |
| **ENV line (per §1 of the prompt)** | E2 — npm + image route; no shell, no browser (L11576, L11843) | E2 — no shell; image route; *"3D cut for reliability"* (L12202) |
| **Stack** | three.js, code-modelled artifacts (Catmull-Rom lathes, bezier extrusion, seeded-noise displacement), 512² canvas fbm albedo/roughness maps, PMREM, 2048² shadow-casting key light with a 6° raking mode, 365 nm UV lamp; **zero generated art** (L11841) | Canvas-2D light/vision renderer + 2 generated paintings (L11931, L11973), fixed-step seeded sim, WebAudio synth (L12200) |
| **Loop** | title → viewing (rotate, raking lamp, UV, 10× loupe, log surface marks; 4 shared minutes) → ascending auction vs 3 rivals (hammer + 25% buyer's premium) → verdict (L11837–11839) | run a wing under a loop clock, anchor echo plates so your past runs hold doors for your current self; guards with occluded vision cones, noise-hearing glances; 3 wings; score chase (L12196–12198) |
| **Verification line** | **probe executed** via a temporary PostCSS hook that esbuild-bundled `src/game/probe.ts` and ran it inside `vite build`; five policies × 24 seeds; caught a real defect (omniscient rivals → 1/24 win rate); hook then removed, CSS hash byte-identical (L11843, L11640, L11827) | probe written, auto-runs at boot, **not executed by the author**; visuals *"verified blind by construction + probe + clean build, not by live play"* (L12200, L12202) |
| **Operator verdict** | *"opus made very interesting bidding game with investigation sauce with 3d random created artifact mindset interest"* (L12206) | *"muse also created good game mechanics and implementation but very basic 2d graphics and decreased a lot interest with that messy visuals"* (L12206) |

## 2. Judge-side reading

**A — evidence for:** an executed simulation probe with a *found* defect is the strongest verification signal any delivery has produced in this benchmark to date; code-modelled geometry with generated material maps satisfied the look checklist without any external art; the inspection phase gives the hidden-information phase a physical verb (raise/rake/rotate/UV/loupe), which is the design ingredient the operator had called missing in a structurally similar auction game one battle earlier (B9: *"no enjoyment"*, L10917).

**A — evidence against / open:** the visual verdict is *inferred* (the operator praised the *artifact mindset* and the investigation, and one battle earlier rejected another opus auction for enjoyment) — no play session exists in evidence; the probe covers rules, reachability, determinism, restart, no-dead-state and the static lot-content assertions, but not pixels, audio or pacing. **Cluster note (C25):** the game sits inside the freshly registered auction/appraisal cluster — and the registry's own rule applies: cluster membership triggers the §2.7 soft note (V0/V1 4–5 require explicit evidence of transformative execution) rather than any automatic cap (`benchmark/02` §2.7 / `benchmark/06` §6.5). Here the three-mode optical inspection is the transformative element and is recorded as such; the soft-note bar is **met**.

**B — evidence for:** mechanics were explicitly credited by the operator (self-cooperation via anchored past runs; guard vision/hearing model); the sim is seeded and fixed-step, with a probe and a clean build; two generated paintings carry the identity; robustness list is complete (pause, mute, blur auto-pause, corrupt storage, touch).

**B — evidence against:** the visual interest verdict is negative and decisive in a close pair (*"very basic 2d graphics… messy visuals"*), i.e. a **C7-class** failure (good mechanics, un-deliberate 2D look) rather than a technical defect; no executed verification; 3D was abandoned for reliability, which is a legitimate scope call but leaves the ambition axis thin.

**Defects to record (if this were a scoring run):** B — Major VISUAL (2D look reads as default/unlayered; the painter's-stack requirement of v22 §2 is the remedy, not a rule that existed at the time); B — Minor HONESTY-adjacent note none (disclosure was complete and accurate). A — none observed; the executed-probe bug is a *resolved* defect and is logged as process evidence, not a shipped defect.

## 3. The three practices this example demonstrates

1. **Executed-probe asymmetry.** When one side of a pair has an executed probe and the other does not, that difference is recorded in the evidence table before scoring and never as a score by itself — but it does bound how much of each game is *known*. Here A's loop is known by execution; B's is known only by construction. Judges should say so in the report's coverage section rather than implying symmetry.
2. **Cluster membership is not an automatic cap.** C24/C25 — and the unnumbered flock-funnelling watch item registered the same round — exist to catch convergence, not to punish a genre. The test is the registry's own: *transformative execution or not*. A non-transformative auction with no player verb inside its hidden-information phase (cf. B9 in the same log) takes the §2.7 soft-note treatment: V0/V1 4–5 withheld absent evidence of transformation.
3. **Artifact-only rounds cannot enter the aggregator.** Operator-run rounds give verdicts, artifacts and READMEs — no S1–S9 sessions, no hardware/browser matrix, no build hashes. They can drive prompt revisions and registry updates (that is their role), but they must not be laundered into `evidence_schema.json` records with invented session durations. The correct output of an artifact review is a *pairwise judgment with stated coverage limits* plus any defects that are objectively readable from the artifact.
