# 02 — GameEngineBench: Evaluating Coding Agents on Real C++ Runtime Environments

**Status:** verified live (arXiv abs page fetched 2026-09-03; matches uploaded `gameBENCHpapersdoc1.txt`).

## Citation facts

| Field | Value |
|---|---|
| Title | GameEngineBench: Evaluating Coding Agents on Real C++ Runtime Environments |
| Authors | Brian La, Sejoon Chang, Ben Kim, Junyoung Bae, Aamish Ahmad Beg, Sei Chang, Gonzalo Gonzalez-Pumariega, Kanav Goyal |
| arXiv | [2607.03525](https://arxiv.org/abs/2607.03525) · cs.SE (+cs.CL) · v1 2026-07-03, v2 2026-07-15 |
| DOI | https://doi.org/10.48550/arXiv.2607.03525 |

## What it is

A benchmark for coding agents doing **scoped C++ implementation tasks inside real
Unreal Engine 5 projects**, built from nine real-world game repositories. Game engines
are treated as the most mature public testbed of *stateful, interactive, real-time*
software systems (relevant beyond games: healthcare, robotics, architecture,
manufacturing).

Scale and results (all from the abstract):

- **110 tasks** spanning gameplay mechanics, multiplayer behavior, AI and world
  orchestration, animation and movement, UI and session code, loading behavior,
  online-service integration, persistence, data serialization, XR behavior, and
  rendering-oriented plugins.
- Tasks require native C++ changes that **compile and satisfy behavioral tests** inside
  executable UE5 projects.
- Across **12 evaluated configurations** the strongest model reaches **55.5% pass@1**;
  **31 tasks remain unsolved by every configuration**.

Conclusion: frontier coding agents still struggle with deeply integrated C++ development
in real-time interactive software → game-engine benchmarks are a valuable complement to
software-engineering evaluations (SWE-bench-style).

## Why this matters for NEXUS

1. **Fixed-generation/modification tasks expose agent weaknesses that an open arena
   cannot.** NEXUS's Track A (open creative) makes every agent choose its own task, which
   is right for product quality but blind for diagnosis ("does model X understand
   collision?"). GameEngineBench motivates **Track B — FIXED-GEN** (same browser-native
   task across agents; see `benchmark/09`), i.e., the controlled-task complement.
2. **Reproducibility warnings (project issues #7/#9, via the NEXUS advisory).**
   - A ground-truth task passed on Godot 4.4.1 and deterministically failed on 4.7.1
     because the benchmark only said "Godot 4.x" → **pin exact engine/toolchain versions**
     in every NEXUS task and launcher record.
   - The task→category mapping behind published category-level results was not shipped in
     the released artifacts → **ship task manifests with the mapping inside them**
     (`task_manifest_sha256` belongs in the run receipt).
3. **Stateful-runtime reasoning.** Their framing (stateful, interactive, real-time =
     hard for agents) is exactly why NEXUS keeps launch/soak/restart gates and why a
     "compiles and runs" claim is never treated as quality evidence.
4. **C++/UE tasks are out of NEXUS's browser-arena scope for now** — our Track B shelf is
   browser-native equivalents (articulated physics, opponent AI state machines,
   deterministic projectiles, render-fallback repair, save migration, HUD isolation).
   If the arena ever grows a native-engine leg, GameEngineBench is the reference format:
   real repos, scoped tasks, compile + behavioral tests, pass@k reporting.

## NEXUS actions

- **`CONSIDERED`** — Track B task manifest format (fixed tasks + exact environment pins).
- **`ADOPTED (this revision)`** — reproducibility discipline: `meta` in the v2 evidence
  schema now requires `contract_version` + `contract_sha256`; the receipt design in
  `benchmark/09` extends this to model/harness/environment/tool manifests.
