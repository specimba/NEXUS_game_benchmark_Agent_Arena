# 04 — Defect Taxonomy: One-Shot Game Creation

Shared vocabulary for issues found in games **created** by developer agents. Every defect is single record even if appears multiple sessions. Focuses on technical reliability, code quality signals, and human-perceived quality impact — not on scoring within a pre-existing game.

## 4.1 Severity (for created games)

| Severity | Definition | Score channel |
|---|---|---|
| **Blocker** | Progress cannot proceed along main path of created game; only full restart recovers or not at all. Unreachable win/lose, controls unusable, loop cannot proceed. Reveals poor code quality / long-session failure. | HARD_PENALTY + ceilings |
| **Critical** | Crash, freeze requiring reload, save/progress loss if applicable, major mechanic broken, accessibility path broken, memory leak causing crash at 45-60min. | HARD_PENALTY |
| **Major** | Secondary feature broken or unusable without workaround; significant immersion break; performance problem meaningfully degrading play; visual ambition collapse (e.g., simple box gradient enemies after polished title) | category scores (T/M/G/F/V/A/X) |
| **Minor** | Cosmetic glitch, occasional jank, minor readability issue, small UI misalignment, particle burst, z-order flicker | category scores + DEFECT_SEVERITY 0.5 |
| **Trivial** | Nitpick, negligible impact | DEFECT_SEVERITY 0.1 |

## 4.2 Classes

| Class | Covers for created games |
|---|---|
| CRASH | Hard crash, tab dies, infinite error loop on load, blank screen on load of created game |
| FREEZE/HANG | Unresponsive loop, infinite load, animation loops forever without progress |
| SOFT-LOCK | Player/entity/state cannot proceed in created game; no recovery but reload/restart |
| PROGRESSION | Unreachable next area/finish, exit missing, objective impossible, dead end despite README claim |
| LOGIC/STATE | Wrong state transitions, stuck states, invalid data, counters wrong, actions leak across menus, **menu ↔ gameplay leak (clicks pass through open menu, closing menu traps input state, pause menu double-fires actions)** — code quality signal. See CEIL-7. |
| PHYSICS/COLLISION | If applicable: wrong hitboxes, pass-through, stuck on geometry, off-map |
| INPUT | Key/binding broken, buffer issues, double-fire, touch target failures, browser default not prevented, scroll/zoom leak. **Accidentally inverted axis** (up/down or aim flipped) — Minor unless it inverts a core control. **Mouse-specific:** LMB/RMB not reaching game state (swallowed by overlay canvas), cursor exit soft-lock, aim-vector lost outside canvas, pointer capture not restored on re-entry. See CEIL-3. |
| UI/USABILITY | Broken button, unreachable menu, HUD obscures, focus lost, text overflow, no onboarding |
| VISUAL | Glitch, z-order, flicker, particles burst, readability failure, clipping, simple box gradient enemies as final (visual ambition failure) — explicitly low V0. **Unrecovered full-screen effect** — flash / bloom / whiteout / additive blowout that does not decay, leaving the playfield unreadable while the simulation continues (Major → Critical if it persists and blocks honest play; CEIL-9). |
| AUDIO | Missing/failing sound, audio-on-load error, no fallback, toggle broken, **constant drone / streaming bass loop that cannot be silenced** (Major → Critical if user cannot mute; CEIL-6 if unmuteable), **unmanaged WebAudio nodes leaking**, no tab-blur ducking, mute not silencing within one frame |
| PERFORMANCE | FPS drops, jank, memory growth, input latency, layout thrash, DPR/resolution issue, no pooling/capping |
| BALANCE | If applicable: unfair kill, unreadable attack, difficulty cliff, trivialization, exploit, grind, no curve, **first level unbeatable by a real human in ~5 min honest play OR an early level-2/3 cliff that blocks ALL further honest progress** (CEIL-5, broadened Round 007), **death state unreadable (player can't tell what killed them)** |
| CONTROL-LEGIBILITY | Round 018. The game runs, the concept is intact, and the player still cannot act: camera framing loses the hero, near-plane clipping hides a long object, mouse-to-world mapping is mis-calibrated, an axis is inverted, targets are unreachable at the default camera, or the response to input is too slow to control a moving element. Often invisible to the author of a browser-less sandbox (log 17: two 3D flight builds shipped unplayable — *"nothing playable… I did not able to control it"*, *"game vision is bugged and cannot playable"*). Severity Blocker when the core verb is uncontrollable; record framing, mapping, latency and default-camera evidence separately. Presumptively present in 3D builds with no executed control probe. |
| LEVEL-N-SOLVABILITY | Round 018. A mid-run level is unwinnable with the tools the player has at that point, even though the game's own probe asserted "win reachable" for the naive/final case. Observed: an opus 3D sheepdog where *"when level 2 with wolf it cannot be possible to control sheeps without giving to wolf"* — the flock mechanic stops working the moment the wolf introduces a second objective. **Proof obligation:** reachability must be asserted per level, using only mechanics unlocked by that level, or the level is recorded as unverified. Severity Major→Blocker (blocks all further honest progress); pairs with CEIL-5. |
| DEPTH | Beautiful first 30 seconds but no beat after wow — game exhausts in 90s, screensaver, one-trick repeats, no scaling, no second-layer mechanic, no reason to still be there at minute 5. Rated against M8. Severity Major (single-run interest collapse) → Critical (nothing beyond core verb) |
| DATA/PERSISTENCE | If applicable: progress/high-scores lost/corrupt, save/load wrong, reset not clean; or explicit no-persistence by design not documented |
| CONTENT-MISSING | Placeholder screen, "under construction", empty room, promised feature absent despite README |
| RESPONSIVE/LAYOUT | Break on resize/orientation, controls off-screen, safe-area overlap |
| ACCESSIBILITY | Reduced-motion ineffective, color-only info, no focus states, no keyboard nav |
| CODE-QUALITY | No centralization, scattered magic numbers, no separation state/input/loop/rendering, no pooling, evidence of no iteration/refactor, console error spam — long-session execution signal |
| CONTAINMENT* | Embedded score/telemetry/eval logic found inside game |
| AMBITION-THEATER | Shipped 3D / WebGL / WebGPU / heavy-physics that structurally does not work: controls broken, marble won't launch, camera divorces from physics, menu collapses inside scene, sub-30 FPS on average hardware. V9=0, CEIL-8 (55). |
| HONESTY | README claims features that don't exist / don't work; multi-turn iteration shipped as one-shot without disclosure; "cinematic autoplay" that masks thin gameplay; environment-sniffing / demo-mode. Critical when misrepresentation is material. |
| CLICHÉ-CLUSTER | Concept lands squarely in the §6.5 convergence registry with no transformative execution. Not a defect against a category, but triggers V0/V1 cap in §2.7. Recorded for round history. |
| NOVELTY-COLLISION | Round 018. The concept is not merely a registry cliché — a **shipped commercial game already executes it better**, and the delivery keeps the theme while dropping the systems. Three instances in one log, named by the operator: *Ghost Master* (2003) for a haunted-realty strategy game, a *Club-Penguin*-era flash mortar duel for a competent canvas ballistics game, and a *Dave the Diver* clone that kept only the diver and the shop. Distinct from CLICHÉ-CLUSTER (which tracks convergence within our rounds): record the named reference, whether the delivery adds any mechanic/perspective the reference lacks ("systems test"), and whether the *form-era* reads as pre-2015. Triggers the V0/V1 novelty cap; never a technical defect. |
| ATTRIBUTION | Model self-identifies as a different model (e.g. Qwen claiming to be Claude); blind label contradicts build fingerprint. Not a defect against the *game* — logged separately in `identity.json` per §6.6, never enters scoring. |

*CONTAINMENT special: finding benchmark score/telemetry logic inside game is itself defect (Critical) and barred from using any in-game score channel.

## 4.3 Canonical defect record

```json
{
  "game": "A" | "B",
  "id": "D-0001",
  "title": "Concise title",
  "severity": "Blocker|Critical|Major|Minor|Trivial",
  "class": "CRASH|FREEZE/HANG|...|CODE-QUALITY|CONTAINMENT",
  "description": "What happened in observable terms in created game.",
  "reproduction": ["step 1", "step 2", "step 3"],
  "frequency": "Once|Intermittent|Frequent|Always",
  "reproductions_confirmed": 2,
  "context": {
    "session": "S3",
    "timestamp": "00:12:44",
    "level": 2,
    "input": "keyboard",
    "reduced_motion": false,
    "seed": "abc123" | null
  },
  "blocks_progress": true | false,
  "recoverable": "restart|reload|self_resolved|none",
  "immersion_damage": "low|medium|high",
  "polish_only": true | false,
  "evidence": ["shot_0123.png", "note [S3][00:12:44] ..."],
  "score_channel": "HARD_PENALTY|CATEGORY|DEFECT_SEVERITY",
  "assigned_to_categories": ["M","G"],
  "resolved_as_harness": false
}
```

## 4.4 Logging rules

1. One record per defect regardless of screens/sessions touched. Frequency captures recurrence.
2. No double-count: impact flows into exactly one score channel; category panel reflects it, never subtracted again in HARD_PENALTY unless Blocker/Critical.
3. Severity from impact not class. Visual defect blocking reading attack is Major not Minor. Justify severity with blocks_progress, recoverable, immersion_damage.
4. Reproduce before Blocker/Critical: must be reproduced ≥2× or objectively guaranteed by observed behavior unless hard crash.
5. Harness issues (environmental not game) get resolved_as_harness true and excluded from scores.
6. Code-quality defects: need observable signal (console error loop, memory growth at 60min, no pooling) + brief code pointer (file:line pattern) — not just claim.

## 4.5 Defect severity score

`DEFECT_SEVERITY_SCORE = max(0, 100 − HARD_PENALTY − (minor×0.5) − (trivial×0.1))` Higher = fewer/less severe defects. Reported separately from creative quality.
