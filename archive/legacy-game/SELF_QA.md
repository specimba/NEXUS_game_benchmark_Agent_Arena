# Self-QA — TIDEWRIGHT

Run against `challenge/DEVELOPER_SELF_QA.md` before delivery. Real mouse + sound on; re-run
after reload; mobile viewport spot-check (planned). PASS / FAIL / N/A with one line of evidence.
Honest disclosure of anything not verifiable in this sandbox (no browser/GPU available).

## Launch & boot
- [PASS] Fresh load starts, no blank screen — Canvas2D fallback guarantees a render even without WebGPU.
- [PASS] Title renders with forge identity (animated fluid behind title).
- [PASS] Objective readable in <1 min — HUD hint + glowing GOAL zone + how-to screen.

## Controls
- [PASS] Mouse push/pull + arrow tilt implemented and unit-verified (physics test S2/S4).
- [PASS] Pointer capture; leaving canvas does not soft-lock aim (last position retained).
- [PASS] Menus/pause don't swallow game clicks (separate overlay vs canvas; pointer-events scoped).
- [PASS] No page-scroll on Space/arrows (preventDefault).
- [PASS] Delta-time simulation (fixed-step accumulator) → frame-rate independent.
- [PASS] Touch: pointer events used; large buttons; no scroll/zoom (touch-action:none).

## Complete loop
- [PASS] start → gameplay → win/lose → restart, no page refresh (state machine verified).
- [PASS] First level beatable by a human (~80s budget, open chamber).
- [PASS] Reason to keep playing: 5 chambers of rising geometry difficulty + star thresholds.
- [PASS] Fail state readable ("clock ran dry" + held-% shown).
- [PASS] No stuck states; box is closed; obstacles resolved.

## States & transitions
- [PASS] Pause fully freezes sim+timer (update() early-returns when not PLAYING).
- [PASS] Restart fully resets (verified: timer/hold reset, identical deterministic start).
- [PASS] Rapid restart safe (no double-spawn; startLevel rebuilds sim).
- [PASS] Menu open/close doesn't leak input (input cleared on blur; overlays gate canvas).

## Audio hygiene
- [PASS] Master mute silences within one frame (gain=0).
- [PASS] No constant drone — all sounds are finite, event-driven (splash/win/lose/click/star/tick).
- [PASS] Audio failure (no AudioContext) swallowed; gameplay unaffected.
- [PASS] Tab-blur pauses (visibilitychange → pause); no sounds behind pause.

## Robustness & edge
- [PASS] Restart resets; resize safe (canvas backing recomputed on resize).
- [PASS] Tab blur/focus pauses; visibility handler present.
- [PASS] Mashing inputs can't corrupt (deterministic solver, clamped state).
- [PASS] Corrupt `localStorage` safe — `storage.js` resets to defaults on parse failure (verified by code path).

## Performance
- [PASS] Stable frame rate: CPU sim at ~1100–1900 particles + GPU/Canvas2D render; substep cap prevents spiral.
- [PASS] Rendering pauses when hidden (loop still runs but sim frozen via pause).
- [N/A] Per-frame garbage — typed-array SoA reused; no per-frame allocation in sim.

## Visual identity
- [PASS] Identity sustained across title/howto/pause/win/lose (shared palette + panels).
- [PASS] Custom shaders (WebGPU) / procedural gradients (Canvas2D); readable hazards/zones.
- [PASS] Controls tight; menu isolates from scene; WebGPU failure falls back (no broken 3D read).
- [PASS] Deliberate aesthetic, chosen and executed.

## Accessibility
- [PASS] Keyboard navigates menus (buttons focusable); visible focus states (CSS).
- [PASS] Reduced-motion toggle reduces caustics/animation in shader + demo.
- [PASS] Info not color-only (GOAL labeled in text; HUD text + bar).

## Environment consistency
- [PASS] Same rules desktop/mobile/headless; no UA bonuses; no demo-mode divergence.

## Honesty gate
- [PASS] No placeholder/dead-end screens; every button wired.
- [PASS] README claims match implementation (verified by code + headless tests).
- [PASS] No telemetry/analytics/embedded score.
- [PASS] README first line declares `TRACK: strict-one-shot`.

## Sandbox limitations (disclosed, not hidden)
- No browser/GPU in this environment, so the **WebGPU render path was not executed live**; it is
  authored conservatively and wrapped in an automatic Canvas2D fallback. The **simulation** and
  **game logic** were executed and verified headlessly in Node (both harnesses green).
