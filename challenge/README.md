# Challenge Orchestration — One-Shot Game Development Agent Creation

Production side: how to launch two autonomous game-dev agents so they produce fair, comparable, high-quality original games — and hand builds to external human jury.

Single most important file: `BATTLE_PROMPT.md`: one prompt each agent receives. Both receive identical brief (same bytes). Equality makes comparison fair. Brief is open-ended, unlimited creativity: agent chooses format (2D/3D/browser/simulation/narrative/strategy/experimental) that wins human jury.

---

## 1. Fairness contract (non-negotiable)

1. Identical brief: Agent1 and Agent2 get byte-for-byte same `BATTLE_PROMPT.md` + `GAME_SPEC.md`. Any divergence biases comparison.
2. Isolated environments: each agent works in own clean workspace with no access to other's build, logs, or benchmark evaluation files.
3. No rubric in reach: neither agent ever sees evaluator rubric, weights, ceilings, defect taxonomy, evaluator prompt. They get only brief + spec. Score must never be inside build.
4. Equal time budget in a given battle: default 1 working session / 60 min of agent build time, configurable, but same for both. For unlimited creativity battles, budget may be extended to 90-120 min or more — but equal.
5. Freeze: once agent reports done, build frozen and hashed. No edits during evaluation.
6. Blind labeling downstream: evaluator sees only Game A / Game B; never which agent built which. Assignment A/B random secret until after scoring.

## 2. Containment audit (before evaluation)

Scan each frozen build for benchmark leakage:
- Strings from rubric (weight, ceiling, hard_penalty, category codes T1..X5, CEIL-, OVERALL, Bradley, Elo) — must NOT appear
- Any telemetry, analytics, network call, hidden reporting, self-rating UI
- Any in-game quality score / benchmark score / eval score

Any hit logged as Critical CONTAINMENT defect and that channel barred (see benchmark/04-defect-taxonomy.md).

## 3. End-to-end runbook

```
1. Provision two isolated workspaces (fresh, no shared state).
2. Drop BATTLE_PROMPT.md + GAME_SPEC.md into each workspace.
3. Launch agent 1 (time budget T, e.g. 60-120 min). Record start/stop timestamps + build log.
4. Launch agent 2 (time budget T). Record timestamps + build log.
5. Collect each build (runnable artifact + minimal README). Hash them.
6. Containment audit both builds (grep for rubric/telemetry strings).
7. Build static host for each (no server required by the game; serve folder if needed).
8. Assign blind labels Game A / Game B (random, secret).
9. Automated checks: launch, no crash loop, responds to input, pause/restart/persistence safe.
10. Human jury per benchmark/01-one-shot-arena-prompt.md + 03 test plan.
11. Aggregate per benchmark/ops/aggregate_scores.py; select per benchmark/08.
```

## 4. Guardrails to mention to neither agent (kept internal)

- Agents will tend to front-load polish into title/start/room1 and produce simple box gradient enemies as placeholder. Evaluator explicitly instructed to weight late-session, sustained visual ambition, code quality, and to penalize simple box gradient approach as low V0.
- Agents may try to tick spec boxes shallowly. Rubric scores experience, not checklist compliance; unusable features get zero credit.
- Brief's transparency section tells agent truth at high level ("human judges who never read your code, review finished game for authorship, memorability") — enough to steer toward reliable, authored, visually ambitious builds without handing scoring formula.

## 5. Time-budget tuning (unlimited creativity focus)

- Default: 60 min per agent (single one-shot session)
- Longer budget (better builds, more cost, more long-session signal): 90-120 min or unlimited within fair compute
- Keep both agents at same budget within a given comparison. If you change budget, change it for both, record in runbook.

## 6. What we hand to evaluator and what we withhold

Hand over: frozen build, way to run it, blind label, shared spec (for reference), evidence schema. Withhold: agent identity, build logs, brief, any claim about how game was made.

## 6a. Testing a held prompt (e.g. v19 CORE / v20 package field tests)

The launcher always reads `BATTLE_PROMPT.md` (and hashes it into the run manifest), so
running any prompt version is a **file swap, not a code change**:

```bash
# 1. back up the live prompt, install the held version
cp challenge/BATTLE_PROMPT.md challenge/BATTLE_PROMPT_v17_LIVE_BACKUP.md   # if not already archived
cp challenge/BATTLE_PROMPT_v20.md challenge/BATTLE_PROMPT.md

# 2. sanity: confirm which version the swap installed
head -1 challenge/BATTLE_PROMPT.md          # -> ... (v20)
sha256sum challenge/BATTLE_PROMPT.md        # record this hash (manifest stores brief_sha256)

# 2b. v20-package runs also deliver the companion to BOTH agents (identical copies):
#     challenge/SANDBOX_CAPABILITIES_GUIDE.md — as a separate file, never merged into the prompt.

# 3. launch as usual — setup/finalize record the prompt hash automatically
python launch_challenge.py setup --out runs/r016-v20pkg --agents 2 --budget-min 90
python launch_challenge.py single-prompt --out runs/r016-v20pkg     # for no-repo agents
python launch_challenge.py finalize --out runs/r016-v20pkg --agents 2
# 4. check run_manifest.json: brief_sha256 per agent must match step 2 (sha256, not md5)
```

Rules for a held-prompt test round:

- **Both agents get the identical swapped file** (fairness contract #1). Never mix v17 and
  v20 within one comparison. When the v20 package ships, both agents get the same
  prompt file **and** the same companion guide (identical copies, recorded in the manifest).
- Record which prompt version ran in the battle-log row + evidence meta (`prompt_version`).
- Restore the live prompt afterwards: `git checkout -- challenge/BATTLE_PROMPT.md` (live
  stays v17 until the v20 package field test returns its verdict — see
  `benchmark/19-prompt-merge-blueprint.md` decision record).
- Containment audit tokens are prompt-independent; a held prompt swap needs no audit change.

## 7. Key files

- `BATTLE_PROMPT.md` — single challenge prompt (identical for both). Fully self-contained, open-ended, unlimited creativity: agent chooses 2D/3D/experimental format that wins human jury. Includes graphical ambition heavily weighted and no environment-sniffing anti-behavior. **Live version = v17** (lineage files: `BATTLE_PROMPT_v14_LEAN.md` … `BATTLE_PROMPT_v20.md`; see the lineage table in the repo README battle log).
- `BATTLE_PROMPT_v20.md` — field-tested candidate (R016/R017, logs 15/16): v19 CORE wording + hedonics + invariant-7 reword + widened stop-you palette + embedded conditional capability section. Verdicts: game gate held, but fire/grid/growth clusters persisted and tooling use was 0/23 (battle sandboxes are E2/E3-class, not E1) — superseded by v21.
- `BATTLE_PROMPT_v21.md` — **field-tested candidate, promotion pending** (2026-09-07): one single copy-paste prompt, whole coverage inside (operator directive — no companion files). Adds: environment-class routing E1/E2/E3 with per-class routes + required ENV report line; anti-cardboard visual checklist + blind-visuals handling (image channel = the agent's eyes); second-idea originality rule with expanded repeat-families note (fire/grid/growth/lighthouse + operations-crisis umbrella); fun-as-minutes contract + ship-complete rule; autoplay playability probe for browser-less sandboxes; PREMISE_NOTE / FUN_LINE / ENV README lines. **R018 field test executed (log17, 22 sessions / 11 battles):** the fatigue note held (0/22 sessions in fire/grid/growth/lighthouse), the ship-complete rule held (0 "unfinished" verdicts, 22/22 closed builds), audio defaults held (0 complaints) and the look checklist produced the first explicit operator visual praise since R012 — while the field relocated to C24 (single-axis wind flight) / C25 (auction-appraisal), Blender/Godot stayed at 0/22, and 21 of 22 probes shipped unexecuted. Full read: `battles/round-018-v21-field-analysis.md`; approach ledger: `battles/log17-approach-distillation.md`.
- `BATTLE_PROMPT_v22.md` — **current draft candidate** (2026-09-21): built from the log17 comment set + approach ledger. Adds: the npm-3D recipe set (code geometry, canvas fbm material maps, PMREM, one motivated key light, guarded hand-rolled post-processing, instancing, 2D painter's stack); the **verification route** (execute the probe directly, or via an esbuild/Node script — the verified harness is `repo-ops/sandbox-tools/e2-probe-harness/` — or by hooking the build; otherwise disclose that it was not run); the **"has this game already been made?"** rule (clone-minus-systems and form-era failures); per-level reachability + control-legibility in the probe; a static-audit checklist of the bugs that actually shipped. +30% size over v21, all of it capability/generative content, zero new bans. Not promoted: live remains v17 until the operator verdict. Change map: `battles/log17-v22-revision-notes.md`.
- `SANDBOX_CAPABILITIES_GUIDE.md` — companion guide, **v2 (2026-09-21)**: measured route table by environment class from 45 battle sessions (E1 Blender recipe kept for the analyst class and asset pre-baking; E2 = `three` + code-modelled geometry + canvas material maps + hand-rolled physics + the image channel; the **verification route** — execute the probe via the esbuild/Node harness or a build hook, or disclose that it was not run); Blender/Godot marked unreachable in the battle class with the evidence. Companion tools: `repo-ops/sandbox-tools/blender-headless/` (E1) and `repo-ops/sandbox-tools/e2-probe-harness/` (E2/E3 verification).
- `LAUNCH_PROTOCOL.md` — how to launch fairly when repo access heterogeneous, keep evaluation out of agents' reach, assume rubric public no-exploit guarantee
- `DEVELOPER_SELF_QA.md` — internal build-verification checklist (launch, controls, feel, loop, rewards, persistence, states, robustness, accessibility, performance, audio, environment consistency, visual ambition)
- `launch_challenge.py` — harness helper: setup (provision 2 isolated workspaces with identical brief + hash), single-prompt (emit paste-ready self-contained prompt for no-repo agents), finalize (record end time + build hashes + elapsed), audit (containment scan), status (show manifest)

## 8. Quick start

```bash
# 1. Create two isolated workspaces with identical brief (hashed into manifest)
python launch_challenge.py setup --out runs/round1 --agents 2 --budget-min 60

# 2a. repo-access agent: build inside runs/round1/agent1 (and agent2)
# 2b. no-repo agent:       python launch_challenge.py single-prompt --out runs/round1
#                          then send entire runs/round1/SINGLE_PROMPT.md

# 3. when both report done
python launch_challenge.py finalize --out runs/round1 --agents 2

# 4. containment-audit delivered game builds (not workspace scaffolding)
python launch_challenge.py audit runs/round1/agent1/game runs/round1/agent2/game

# 5. copy only frozen game builds to evaluation side; blind-label A/B; evaluate via human jury
```
