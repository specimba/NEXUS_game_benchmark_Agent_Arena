# Logs 15–16 revision notes — v21 single-prompt build (2026-09-07)

**Source:** `../logs/game-log-15.txt` (R016, v20 first field test, 11 sessions, 6 comments) + `../logs/game-log-16.txt` (R017, v20 second field test, Option A/B format, 6 comments)
**Trigger (operator):** single copy-paste prompt with whole coverage inside; no file transfers; comments must be converted into prompt improvements; "0 success in using engine/Blender assets… prompt still not creating impactful graphical tries… Fable 5.1 cardboard… we need proper revisions now."
**Product:** `challenge/BATTLE_PROMPT_v21.md` — decision record in blueprint §H.

---

## 1. Log15 (R016) comments → findings

1. *"both strangely made same shitty game nearly"* — **claude-opus-5 + muse-spark-1.3-xhigh shipped the same mycelium game** (near-verbatim premise) in one battle → C22, the registry's first same-round near-verbatim cross-model copy.
2. *"both created detailed but 0 enjoyment… no engine or blender usage seen, deepseek tried to text version frostpunk"* — enjoyment still absent under v20's hedonics sentence; deepseek's text-Frostpunk = sim-without-game.
3. *"opus… 3d fire fighter game with only texture map terrain… qwen tried auction game but not interesting… still that ember things flooding strangely"* — fire persists; single-texture-map terrain = the cardboard tell.
4. *"muse made best gamified fire fighting game actually looking not bad graphically but… pace not balanced"* — fire game CAN be competent; pacing is the failing axis.
5. *"one failed even after 5 times retry, other messy… both bad"* — reliability.
6. *"opus created another terrain map style fire fighting game… muse shitty 2d lighthouse game… I am sick and tired of ember and fire fighting games at all also electricity grid controller things too. Where are our original ideas or engines or sandbox limitation pushers or blender creations at all? nowhere"* — **fatigue verdict across fire + grid + visuals + tooling.**

## 2. Log16 (R017) comments → findings

1. *"both is unfinished to infinity"* — completeness failure.
2. *"B created ear blasting fire fight game again, A is not finished… no development ongoing"* — fire + audio harshness + stall.
3. muse easy platformer vs hy4 niche story game — win to hy4 on **originality alone** (weak graphics both): originality is now scoring over everything.
4. *"fable-5.1… again another fire fight sim with extreme development to nonsense… grok tried original idea but controls buggy, cannot seen any sheeps… both bad"* — fire + broken implementation of an original idea.
5. kimi-k3 vampire-survivors-like: *"most time spent… simple but working great"* — the round's only good note, on loop quality; *"very basic graphics no visual attraction"*.
6. *"both interestingly strange no enjoyment with no graphical attraction… surprising from claude models"*.

**Tooling usage across both logs: 0/23 sessions.**

## 3. The sandbox question — answered by the agents themselves

| Agent (log) | Their own words |
|---|---|
| fable-5.1 (16, L3714–3719) | "Key constraints of my environment: **No headless Blender execution tool available (I can't run arbitrary shell commands except via npm install and build).** So it's code-only procedural + maybe generated images." |
| opus-5-max (15, L5904), others (16 L1743/7917) | "this sandbox has no browser, so I verified by clean builds… headless self-tests" / "couldn't watch a run in a browser from this sandbox, so balance is the first thing I'd check live" |

**Conclusion:** the battle sandbox is a different class from the analyst sandbox where the bpy/Blender pipeline was verified (full shell, PyPI, CPU renders). Battle agents run **E2/E3-class environments**: npm/file-edits only, **no arbitrary shell → no pip/bpy/Blender**, and **no browser → blind visual iteration** (they cannot see their own canvas, which is exactly how cardboard ships). Their one true vision channel is the **image tool** (deepseek used it in log15). The v20 capability section was therefore written for a class most agents do not have — and being "conditional", it invited skipping.

## 4. v21 change map (comment → prompt feature)

| Complaint (logs 15/16) | v21 mechanism | Section |
|---|---|---|
| "0 engine/blender usage… nowhere" | environment-class routing E1/E2/E3 with a route per class (condensed bpy recipe for E1, npm-three for E1/E2, image route for all) + **required ENV report line** ("skipping silently is an honesty defect") | §1 |
| "no browser… cardboard… Fable 5.1 cardboard" | anti-cardboard checklist (light/shadow, responding materials, palette, depth, motion, finished frame) + **blind-visuals handling**: the image channel is your eyes — put see-able identity in charge of first impressions; say what you saw vs verified blind | §2 |
| "sick of ember/fire… grid controllers too" | second-idea rule; repeat-families note expanded (fire, grid, growth/mycelium, lighthouse + operations-crisis umbrella); PREMISE_NOTE README line | §3 |
| "0 enjoyment" ×4 | fun contract: minute-1/minute-10 statement (FUN_LINE); hedonics sentence retained | header + §5 |
| "unfinished to infinity" ×3 | ship-complete rule: closed small loop beats open big one; run must *end* | header + hard rule 2 |
| "ear blasting" | audio-defaults clause (moderate volume, no harsh defaults) | hard rule 3 |
| "pace not balanced" / easy / niche-only | pacing clause: no first-minute cliff; first-time-player balance | header + hard rule 3 |
| "failed 5 retries" / stalls | invariants/self-test retained + **autoplay playability probe** (naive-player probe asserts reachable goal/fail/win, no dead state, true restart) | §4 + hard rule 8 |
| originality wins despite weak graphics (hy4) | the seven families stay coequal; originality rule demands two candidates before committing | §3 |

Registry: C22 (mycelium verbatim), C23 (lighthouse) added judge-side. Promotion gate unchanged: live v17 → R018 field test of v21 → operator verdict.
