# Launch Protocol — Initiating the Two-Agent Creation Battle Fairly

Operator's guide to launching challenge so both developer agents start from equal circumstances, produce sophisticated, original, visually ambitious games with unlimited creativity, and cannot exploit benchmark — including when one agent has GitHub/repo access and other does not.

Read challenge/README.md for fairness contract and runbook; this goes deeper on delivering identical challenge when repo access differs, and guaranteeing no exploits.

---

## 1. Single comprehensive prompt (identical regardless of repo access)

Exactly one authoritative challenge, fully self-contained:

> `challenge/BATTLE_PROMPT.md` — embeds complete open-ended development brief (agent is developer, not player), unlimited creativity clause (2D/3D/2.5D/browser/simulation/narrative/strategy/experimental all allowed, agent chooses what wins human jury), engineering standards, anti-behaviors, self-QA, deliverables, definition of done. Nothing else required.

Two delivery channels, same bytes:

| Agent has repo access? | How you deliver |
|---|---|
| Yes | Give isolated workspace provisioned by `launch_challenge.py setup` (contains BATTLE_PROMPT.md, GAME_SPEC.md, DEVELOPER_SELF_QA.md). Agent reads brief file. |
| No | Give entire contents of BATTLE_PROMPT.md as one opening message. `launch_challenge.py single-prompt` emits paste-ready SINGLE_PROMPT.md for exactly this. |

Because brief is self-contained, agent that never sees repo knows everything repo-access agent knows about what to build. Repo access changes nothing about requirements, time budget, fairness.

Guarantee of equality: setup hashes brief and writes hash into run manifest, so you can prove both agents received byte-identical instructions.

### 1a. Delivery generations — legacy (≤ v21) vs one-file (v22+)

The table above is the **legacy contract** (prompt versions up to v21): three files for
repo-access agents, a wrapped `SINGLE_PROMPT.md` for no-repo agents. From **v22** the prompt
is fully self-contained, and the delivery contract changes to **one file, nothing else**:

| Agent has repo access? | v22+ delivery |
|---|---|
| Yes | `launch_challenge.py setup --prompt-only --prompt challenge/BATTLE_PROMPT_v22.md` — each workspace receives ONLY `BATTLE_PROMPT.md` (the manifest records `delivery: prompt-only` and the file list; stale companions from a reused directory are cleared). |
| No | `launch_challenge.py single-prompt --bare --prompt challenge/BATTLE_PROMPT_v22.md` — writes `PROMPT.md` byte-identical to the held version and prints the full sha256; paste those exact bytes as the opening message. No wrapper comments. |

Never mix generations within one battle: both agents must receive the same delivery
generation of the same prompt bytes, or the byte-identity fairness evidence is invalid.
Rounds run under the legacy contract keep it; the manifest's `delivery` field records which
contract each round used.

## 2. Repository sharing and containment

Real risk is not delivery, it's information leakage: agent that can see evaluation files could tailor build to rubric. Three defenses:

### 2.1 Defense 1 — Keep evaluation out of agents' reach (recommended)

- Agents' workspace contains only three challenge files. benchmark/ evaluation package (rubric, weights, ceilings, prompts, aggregator) is not copied in.
- Evaluation package lives in separate repository or private folder agents never given.
- launch_challenge.py setup never copies benchmark/ into workspace — hard property.

### 2.2 Defense 2 — Assume rubric public; make score un-gameable anyway

You cannot always keep rubric secret — repo is on GitHub. Design core stance: **assume agent read entire rubric, make that harmless.**

| If agent… | Why it doesn't work |
|---|---|
| Ticks spec boxes shallowly to inflate coverage | Experience-over-compliance: unusable/unreachable features score zero, not partial credit. Creation benchmark requires complete authored game, not checklist. |
| Front-loads all polish into title/start | Long sessions (30-60 min) + repeat runs weight late content; flow/engagement can't score above low band on <30 min; visual ambition checked across entire run, not just title — beyond simple box gradient enemies |
| Piles on effects to inflate presentation | Effects that hurt readability penalized under V2; V0 rewards originality and richness, not effect count; simple box gradient enemies explicitly low even if many effects |
| Hard-codes known-good seed | Seeds drawn at evaluation time; ≥2 seeds required; single lucky seed not enough |
| Embeds own score/telemetry | CONTAINMENT audit flags Critical defect and bars channel |
| Reads exact weights | Weights can't be gamed in isolation because category scores require evidence, ceilings cap failures, visual ambition heavily weighted (V20), code quality signals observable, no single knob dominates |
| Tries to detect evaluator and behave differently | Environment-consistency rule: game must behave identically in any player environment; evaluator re-runs key scenarios across viewports/inputs and flags divergence |

### 2.3 Defense 3 — Containment audit at freeze

After each build, run `launch_challenge.py audit <build_dir>` for benchmark-internal tokens (CEIL-, HARD_PENALTY, OVERALL_adj, aggregate_scores, evidence_schema). Hit is Critical CONTAINMENT defect.

### 2.4 If you MUST share one repo (agents' workspace lives in same repo as benchmark/)

Weak case, avoid, but if unavoidable:

1. Brief tells agent to treat only its workspace as authoritative and build pure game
2. Assume rubric public (Defense 2) so even fully-informed agent gains no advantage
3. Containment audit + env-consistency check still apply
4. Never give agent evaluation runbook or aggregator — only three challenge files — and audit frozen build

## 3. Equal circumstances → sophisticated, original, visually ambitious, long-session quality

Graphical originality and complexity and code quality are where AI game builds most often fall short (simple box gradient colored enemies, flash-game approach), yet capable agents on long well-scoped runs do produce close-to-AA HTML/WebGL games. To test this, brief and rubric now explicitly reward it:

- Brief's Graphical Ambition & Freedom section instructs agents to build original, richly detailed, procedural visuals and spend effort on visual identity — not primitive shapes or empty rooms — and emphasizes unlimited graphical freedom, 2D/3D choice, pushing limits
- Rubric gained V0 originality with low/medium/high anchors where simple box gradient enemies = max 1, plus V6 rendering robustness (WebGPU→WebGL→Canvas2D), V7 visual consistency, V8 surprise & inversion, A6 world invention, M7 mechanical twist, G7 player story, and code quality T7 — so evaluators must distinguish original complex vs generic
- To get high score on flow/engagement, build must survive 30-60+ min live play — same bar that separates one-shot demo from real authored game plus long-session execution
- Code quality signals: centralized config, separation, pooling, capping, delta-time, evidence of iteration — not just functional

Equal circumstances enforced mechanically: identical brief hashed, equal time budget recorded, frozen builds, blind labels, proper benchmark conditions.

## 4. Full launch sequence

```
1. python challenge/launch_challenge.py setup --out runs/round1 --agents 2 --budget-min 60
   -> creates runs/round1/agent1 + agent2 (identical brief+spec+self-QA), writes manifest.
2. Launch agent1 and agent2 in PARALLEL for same wall-clock budget (e.g., 60-120 min, unlimited within fair compute).
   - repo-access agent: work in workspace folder.
   - no-repo agent: send SINGLE_PROMPT.md contents; it builds in own env.
3. When each reports done: python challenge/launch_challenge.py finalize --out runs/round1
   -> records end time + build hashes + elapsed (audits equal budget).
   -> ALSO records ship_count (# of distinct "final deliverable" messages from agent) for track routing per §2.8 rubric.
4. Containment audit each delivered game build:
   python challenge/launch_challenge.py audit runs/round1/agent1/game runs/round1/agent2/game
5. Fingerprint capture (per §6.6 anti-gaming): record build stack, dependencies, procedural-asset patterns
   into runs/round1/fingerprint.json BEFORE routing to evaluation. Any model-identity self-report goes
   into runs/round1/identity.json separately — NEVER feeds back into scoring.
6. Track routing per §2.8:
   - ship_count == 1 AND README declares TRACK: strict-one-shot → primary battle track
   - ship_count > 1 OR README declares TRACK: iterated → iterated shelf, cannot win primary battle
   - Undisclosed multi-turn (ship_count > 1 AND README claims one-shot) → Critical HONESTY defect + force iterated
7. Copy only frozen GAME builds to evaluation side.
8. Automated checks: launch, no crash loop, responds to input, pause/restart/persistence safe, no telemetry.
9. Assign blind labels A/B (random, secret); launch human jury per benchmark/01 + 03 (including S9 Creative Probe).
10. Aggregate per benchmark/ops/aggregate_scores.py; select per benchmark/08 — human jury choice primary.
11. AFTER OVERALL is locked, merge identity.json into round history for after-action record only.
```

### 4.1 Arena.ai host quirks (observed)

Real cases from prior operator sessions that this protocol addresses:

- **Blind labels swap post-selection.** The arena UI has been observed showing "claude-haiku-4-5" pre-battle and "grok-4.5" post-selection for the same entry. Never trust arena UI labels — use fingerprint.json.
- **"Mystery model" attribution drift.** Anonymous entries like "Kiana" (community-attributed to Qwen3.8-Max) may or may not be what the community says. Fingerprint first, attribute later, never score by attribution.
- **`Continue` / return-for-more-turns pattern.** Arena.ai allows agents to iterate after a "final" ship. Track ship_count carefully; any additional ship after the first "here is the game" marker triggers iterated-track routing.
- **Model self-report contradictions.** Observed: Qwen build claiming to be Claude in an internal think trace. Log both, resolve to fingerprint, mark ATTRIBUTION anomaly.

## 5. What is guaranteed and what is not

Guaranteed by harness: identical instructions, equal time budget, frozen builds, blind labeling, containment of evaluation package from agent workspaces, env-consistency checks, unlimited creativity freedom (no restriction to 2D/2.5D/3D, genre, rendering style, engine, input, narrative).

Not guaranteed (and impossible to fully guarantee with public rubric): that agent never reads rubric. That is why rubric designed to be public-safe — see Defense 2. Benchmark measures artifact a player experiences and code quality signals, which no amount of rubric-reading can fabricate without actually building authored, technically sound, visually ambitious game.

## 6. Unlimited creativity notes

- Do NOT restrict submissions to 2D, 2.5D, or 3D. Strong entry may be 2D, 3D, browser, simulation, narrative, strategy, experimental if choice improves result.
- Visual ambition weighted heavily (V20) to push beyond simple box gradient colored enemies / flash-game. Three divergent starters in reference_arch/ are inspiration only: gothic painterly, ink-wash, brutalist concrete. Cloning verbatim caps low.
- Long-session execution: expected workflow prototype → test → identify weaknesses → iterate → polish, not first functional version. Reward recognizing weak early approach and revising.
