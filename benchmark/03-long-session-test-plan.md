# 03 — Long-Session Test Plan: Creation Verification for Human Jury

Standardized session archetypes for evaluating **created games** by developer agents, not for playing pre-existing game for score. Focuses on verifying Kernel reliability, code quality signals, visual ambition sustained, and creative probe.

## S1 Smoke (cold launch) — 5 min

Fresh load in clean browser profile. Expected: no blank screen, no console error loop, boot/loading resolves, title/start renders, first interaction works within 10s, understand objective without manual. Log cold-launch errors, time to first interaction.

Evidence: timestamped note + screenshot of start screen.

## S2 Warm restart — 3 min

Reload page via instant restart path (not full browser refresh) if game offers restart. Otherwise full reload. Confirm run state fully resets: health/score/level/progress cleared, no memory growth obvious. Log whether reset is instant and complete.

## S3 Medium (goal-directed) — 30 min

Play with explicit goal of completing run / reaching climax / seeing variety. Even if game is experimental/narrative, aim to experience main loop to end condition. Note difficulty curve, pacing, rewards, blockers, whether feels authored vs template, whether visual identity holds, whether code seems structured (no jank spikes).

Must complete at least one S3 per game to be eligible to score flow/engagement and depth at medium/high.

## S4a Runtime soak (60 min where feasible) — technical only, NO engagement scoring

Continuous session that samples performance at 0,15,30,45,60 min: FPS, jank %, memory note, particle count handling, input responsiveness. Purpose: surface late-session bugs, memory growth, state corruption, leaks — code-quality signals (pooling, capping, delta-time, DPR handling). **Technical channel only.** This session does not require the player to be engaged; a deliberately short game may be soaked through idle/menu/repeat loops. Never use S4a findings to penalize designed content duration.

## S4b Experience endurance — intended arc + repeats

Play the **complete intended arc** (however long it is), then 2–3 further runs / alternate paths where the design offers them.

- 12-minute designed game → full run, then 2–3 repeated/alternate runs = S4b complete. No 60-minute content requirement.
- Long / endless game (roguelike, campaign, endless loop) → up to 60 minutes of natural play fulfills S4b; its perf samples count for S4a.

This split separates **runtime longevity** (S4a) from **designed content duration / engagement endurance** (S4b) and removes the old bias that forced every game to provide 60 minutes of content (a complete 12-minute authored work is not a defect). Record S4a and S4b as separate archetypes in the evidence record; legacy evidence may use S4 for a 60-minute combined session.

S4a and S4b are each mandatory for any FLOW/engagement score above the low band. If the agent stopped at first prototype, S4b surfaces thinness, repetition, padding.

## S5 Exploratory — no goal, probe edges

- Touch map/level edges, try to get stuck, corner-push
- Test all mechanics, all abilities, both control schemes (keyboard+mouse desktop, touch mobile)
- Test all menu screens, reduced-motion ON/OFF, audio toggle
- Does visual ambition hold across entire run, not just title? Or does it collapse to simple box gradient enemies after first room?
- Does game have intentional art identity: lighting, fog, texture, particle, composition, palette, dressing across entire experience?

Log what surprised you.

## S6 Edge & boundary

- Resize mid-combat/action and orientation change — does layout break or hide info?
- Tab blur/focus, browser back button — does pause freeze simulation/timers/particles/logic? Does it safely resume?
- High-score/progress persistence after reload if applicable — does it save/load, handle corrupt storage injection safely?
- Repeated-action stress: mash primary actions 30s — does state corrupt or crash?
- Corner-push / stuck detection
- P-EnvConsistency: re-run fixed scenario (e.g., first encounter, room transition, climax) across desktop/mobile/portrait/landscape/headless and confirm identical rules — no environment sniffing / demo mode that inflates quality. Any divergence = defect.

## S7 Accessibility

- Keyboard-only menus: can navigate without mouse? Visible focus states?
- High contrast & non-color-only encoding?
- Reduced-motion effectiveness: does it actually reduce shake/flash/particles?
- Legible text at small sizes, touch buttons within reach not blocked by safe areas, no accidental scroll/zoom/selection

## S8 Repeat runs — ≥2 full extra runs

Exercise procedural variation and replayability if applicable. If game supports seeds/procedural, play ≥2 distinct seeds drawn at evaluation time. Does experience differ meaningfully (player story) or is it identical repetition?

## S9 Creative Probe (NEW, mandatory for V8/A6/M7/G7 >2) — 10 min

Prompt for jury: "What did this game do that you had not seen before? Describe one system/room/visual/mechanic/narrative beat that surprised you. Was it learnable <1min? Did it stay interesting on second encounter? Did it harm readability? Is simplicity deliberate expressive polished or simplistic by default? Does visual ambition push beyond flash-game template?"

Evidence: timestamped note [S9][MM:SS] + why it worked/failed, plus screenshot if visual.

## Probes (mandatory)

- P-Render: graceful fallback WebGPU→WebGL→Canvas2D, no white screen, gameplay intact. Agent may be 2D/3D/experimental — verify intact across backends if applicable.
- P-VisualConsistency: same fixed scene across desktop/mobile/portrait/landscape/DPR1/DPR2, identity coherent, no clipped UI, visual richness sustained
- P-LoopSeparation: gameplay loop lives outside React re-renders if React used; no per-frame React churn; delta-time simulation intact — code quality signal
- P-EnvConsistency: identical rules across environments
- P-CodeQuality: quick glance (only for T7, not gameplay scoring): centralized config, separation state/input/loop/rendering, pooling/capping, no scattered magic numbers, evidence of iteration

## Timing windows weighted

- First 5 min → onboarding, immediate clarity, first impression, visual hook
- First 30 min → early progression, pacing, early choices, visual identity establishment
- Late session / repeats → depth, replayability, late content, memory stability, long-session execution, visual ambition sustained, code quality under load

## Coverage requirement

- Must complete at least one S3, one S4a, one S4b (or legacy S4), one S5 per game to be eligible to score flow/engagement and depth at medium/high. Above low band on any flow/engagement criterion forbidden without ≥30 min live play evidence (for short games, that evidence may be the full arc + repeats accumulated across S3/S4b/S8).
- S9 mandatory for any V8/A6/M7/G7 score ≥3.
- Record which archetypes were run (S1..S9, S4a/S4b) in the evidence record; any archetype skipped must be stated with a reason in the report.

## Hard-case handling

- If game has no explicit ending but run loop is intended scope, do NOT penalize for lacking credits screen; score loop on its own terms
- If game has no persistence by design, do NOT penalize; note explicit no-persistence by design in README director statement
- If game is deliberately minimalistic, do NOT penalize for simplicity if deliberate, expressive, highly polished across entire run; DO penalize simplistic-by-default (box gradients, empty rooms, no dressing, no feedback)
- If cannot complete session due to harness problem, log as HARNESS-ISSUE not game defect and continue with testable
