# 03 — GameXpert-Bench: How Far Are Coding Agents from Expert Game Development?

**Status:** verified live (arXiv abs page fetched 2026-09-03; matches uploaded `gameBENCHpapersdoc1.txt`).

## Citation facts

| Field | Value |
|---|---|
| Title | GameXpert-Bench: How Far Are Coding Agents from Expert Game Development? |
| Authors | Kun Chen, Haorong Hong, Peizhong Gao, Jianfeng Lin, Tongxu Luo, Yuxuan Xie, Chenxu Liu, Jieling He, Zhongyuan Liu, Zeno Zeng (Tencent Hunyuan) |
| arXiv | [2608.21833](https://arxiv.org/abs/2608.21833) · cs.AI (+cs.CL) · submitted 2026-08-22 |
| DOI | https://doi.org/10.48550/arXiv.2608.21833 |
| Project page | https://kwen-chen.github.io/GameXpert-Bench/ |
| HF Papers | https://huggingface.co/papers/2608.21833 |

## What it is — the three lifecycle stages

From analysis of complete human-agent development trajectories, game development with a
coding agent spans three stages, operationalized as three complementary tracks:

| Track | What happens | Scale |
|---|---|---|
| **GameGen** | complete game creation from a single request in an empty workspace | 97 generation tasks across 11 genres |
| **GameFix** | diagnosis and repair when defects are reported — or left for the agent to discover | 100 repair tasks from 50 human-verified game levels, each with 19–27 injected bugs |
| **GameOpt** | cumulative optimization through request chains seeded by real development trajectories | 17 optimization chains × 6 turns = 102 requests (701 acceptance criteria per the NEXUS advisory review) |

Evaluation per track uses **live game interaction, deterministic behavioral tests, or
final-product criteria with regression checks** (Fail-to-Pass and Pass-to-Pass gates).

Headline result (abstract):

> "Across the three tracks, current agents are more reliable at producing playable
> foundations and implementing explicit requirements than at discovering defects,
> verifying runtime behavior, and preserving functionality across changes."

## Why this matters for NEXUS

This is the most directly actionable of the four papers. Its finding matches NEXUS's own
informal Round-012 observation (PRISMA excelled partly because the agent caught and
repaired four bugs itself):

- **Defect discovery, runtime verification, and regression preservation are the weak
  skills** — exactly the capabilities our Track A (open creative) cannot measure, because
  every agent picks its own scope. GameXpert proves the *track structure*, not just the
  tasks, is needed.
- **`NEXT-EPOCH` blueprint for NEXUS Track C — REPAIR (`benchmark/09`):** take strong
  prior games, inject reversible, known defects (inverted aim, broken pause, lost event
  subscription, wrong collision mask, stale save migration, pointer-capture failure,
  broken render fallback, perf leak, unreachable progression state), in two modes
  (REPORTED vs DISCOVERY), scored with FAIL_TO_PASS + PASS_TO_PASS. Our defect taxonomy
  (`benchmark/04`) is the defect generator seed.
- **`NEXT-EPOCH` blueprint for NEXUS Track D — OPTIMIZE:** request chains (improve
  onboarding → add opponent behavior → rebalance → mobile controls → visual feedback →
  late-run depth), every turn re-running ALL previous acceptance criteria (cumulative
  regression). Directly tests "can the agent improve software without destroying what it
  built".
- **Evaluation mix:** their "live interaction + deterministic behavioral tests + final
  criteria with regression checks" mirrors our S-archtype + P-probes + evidence gates —
  external validation that NEXUS's mixed protocol is the right shape.
- **Track separation doctrine:** never collapse these into one opaque agent score — an
  agent can be excellent at GameGen and poor at GameFix. NEXUS keeps the same separation
  for its five-track design (see `benchmark/09`).

## NEXUS actions

- **`ADOPTED (this revision)`** — lifecycle framing recorded as design: `benchmark/09`
  defines tracks A–E explicitly and keeps Track A's results from being read as a
  general "game-agent skill" score.
- **`CONSIDERED`** — 19–27 injected bugs per level and six-turn chains as concrete sizing
  targets for Track C/D task banks.
