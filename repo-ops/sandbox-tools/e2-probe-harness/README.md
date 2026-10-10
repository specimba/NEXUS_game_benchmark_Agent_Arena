# E2 probe harness — running an autopilot probe in a browser-less, shell-less sandbox

**Status: verified** (2026-10-10, Debian 12 x86_64, node v22.22.3, npm 10.9.8 — `./selftest.sh` → 3 pass paths, 10 failure paths, JSON + timeout + relative-modules all green).
**Provenance:** distilled from round 018 (log 17, session B11 / `claude-opus-5`), the *only* session of 22 that managed to execute its own probe. It made the probe runnable by hooking the build pipeline; the executed probe immediately found a real balance defect (a 1/24 win rate from over-equipped rivals). That session produced the operator's *"very interesting…"* pick of the round. 20 of 22 sessions shipped probes they never ran (the 22nd session, B10, was truncated in the log capture with no probe evidence).

---

## 1. The problem this solves

Battle agents run **E2/E3-class** sandboxes:

| Capability | Battle class (E2/E3) | Analyst class (E1) |
|---|---|---|
| `npm install` / `npm run build` | yes | yes |
| arbitrary shell, `python`, `pip`, `bpy` (Blender) | **no** | yes |
| browser / preview (see your own canvas) | **no** | no |
| image generation + **viewing** the result | usually yes (varies per session — log 17: one session explicitly had generation but *no viewing*) | yes |

So the agent can write a headless probe (v21/v22 §4) and **cannot run it**. "The probe passes" then becomes an unverifiable claim — which is exactly the failure mode the benchmark's honesty rule exists to prevent.

The fix: **the build step can be a test runner.** If `npm` runs at all, `esbuild` can be installed (`npm i -D esbuild`; Vite 7 brings it along, Vite 8 does not), and Node is what executes the build.

## 1b. Relationship to the battle prompt (v22)

From v22 the prompt itself carries a 12-line version of this runner plus the probe's output
contract (`export const fails = …` and one JSON line on stdout), because the prompt must be
the **one and only file** an agent receives — no companion tools, no repo access. Both forms
were executed before shipping:

```jsonc
// package.json — the two ways to trigger it
"probe":   "node scripts/probe.mjs",                          // if npm scripts run
"prebuild": "node scripts/probe.mjs",                         // if only the build runs: a failed
"build":    "node scripts/probe.mjs && vite build"            // check then fails the build loudly
```

This harness remains the fuller tool for the **analyst/workspace** side (JSON summary,
path-alias support, browser-global stubs, exit-code semantics documented, self-test), and is
the artifact to drop into battle workspaces if the operator approves D2. The prompt version is
deliberately minimal so that it costs the agent nothing to read.

**Two variants, one route — do not mix their contracts.**

| | prompt inline runner (v22 §1, `scripts/probe.mjs`) | this harness (`run-probe.mjs`) |
|---|---|---|
| verdict source | the probe's `export const fails = …` (module export) | one JSON report line on stdout (`{"check", "results", "fails"}`) |
| exit codes | 0 pass · 1 any fail (or export missing) · 2 bundling failure | 0 pass · 1 any detailed **or aggregate** fail · 2 could-not-trust (below) |
| trust rules | minimal — built for zero reading cost | strict: threw, timeout, crash, missing/malformed report, or a result entry without a boolean `ok` all exit 2 |

Both treat exit 2 as *information, never a pass*. A probe written for the prompt contract
(exports `fails` **and** prints the JSON line) runs correctly under both.

## 2. Usage (copy into the game project)

```bash
# 1. put the harness in the project
mkdir -p scripts && cp run-probe.mjs scripts/

# 2. add two npm scripts (package.json)
#    "probe":  "node scripts/run-probe.mjs",
#    "verify": "node scripts/run-probe.mjs && npm run build"

# 3. write the probe at src/game/probe.ts (pure sim imports only), then run it
npm run probe
```

Node is what actually runs the harness. In an E2 workspace, `npm run build` and `npm run probe` are the only execution surfaces available — that is enough.

Probe output contract — **one JSON line on stdout** is what decides the exit code:

```ts
console.log(JSON.stringify({ check: 'autopilot', results, fails: results.filter(r => !r.ok).length }));
```

Exit codes: `0` executed, reported, all checks pass · `1` executed and reported, but a detailed or aggregate check failed · `2` the harness could not produce a trusted verdict — bundling failed, entry missing, esbuild missing, the probe timed out, crashed, threw, printed no report, or printed a malformed report (**never** treat 2 as a pass). Only the report line itself is parsed, so output printed after the report cannot corrupt the verdict.

Flags: `--json` (machine-readable summary — its `exit` field carries the harness verdict, `child_exit` the probe's own status) · `--alias=@=src` (tsconfig/Vite path aliases) · `--modules=<dir>` (extra node_modules search roots; relative paths are resolved) · `--timeout=<ms>` (probe runtime bound, default 60000) · `PROBE_ESBUILD` env var.

## 3. What to probe (the checks that caught real defects in the field)

From log 17–18's probes and the operator's verdicts, the highest-value assertions are:

1. **win reachable** by a naive policy (the game must be winnable by a first-time player, not by the author);
2. **fail reachable — and by more than one cause** (greed fails, timidity fails; a single loss path means the loss state is a wall, not a design);
3. **greed fails** (the tradeoff is real; a policy that always maxes the resource must lose);
4. **no dead state** — some input always makes progress;
5. **deterministic under identical input** (seeded, fixed-step — the invariant that makes all of the above reproducible);
6. **restart resets everything**;
7. **per-level reachability** — not just level 1 and the finale. Log 17, B7: an opus build passed "win reachable" yet was **unwinnable at level 2** once the wolf appeared (operator: *"mechanical failure… cannot be possible to control sheeps without giving to wolf"*). Level-2 solvability must be asserted level by level.

## 4. What this cannot do (write this in the README, honestly)

- It does **not** render a frame: no pixels, no shader output, no layout, no camera framing. Art direction stays blind-by-construction.
- It does **not** hear audio.
- It does **not** measure feel, pacing, or fun. A probe pass is a floor, never a verdict.
- It does **not** run the shipped bundle: the probe replays **sim rules**. If the UI layer (React/Vite) can enter states the sim cannot, the probe cannot see that class of defect.

So the honest README sentence is: *"I executed the probe (output below) → sim truth; I could not see or hear the build → visuals/audio are verified by construction only."* Never "should work".

## 5. Layout

```
run-probe.mjs              the harness (single file, no runtime deps beyond esbuild)
selftest.sh                verifies the harness catches failures (run this after any edit)
example/src/game/sim.ts    demo sim: pure, fixed-step, no DOM — the shape that makes probing possible
example/src/game/probe.ts  demo probe: win / greed-fails / timidity-fails / determinism / restart
example/failing-probe.ts   fixture: honest FAIL report → harness must exit 1
example/silent-probe.ts    fixture: human logs only → harness must exit 2
```

## 6. Why the harness is this small

It never imports the game's UI layer, never spawns a browser, never installs anything itself; it needs `esbuild` resolvable from the project (`npm i -D esbuild` if it is missing). It bundles one entry with `esbuild` (`platform: node`), stubs the handful of browser globals a guarded probe may touch, executes the bundle, and reads the JSON line. When bundling fails because the probe reaches into DOM/canvas/audio, that is *correct behaviour*: the harness reports exit 2 instead of pretending — and it is a signal that the simulation is not yet separable from the renderer (prompt invariants 2 & 3).
