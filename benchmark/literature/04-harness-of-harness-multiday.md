# 04 — Harness-of-Harness: Multi-Day Autonomous Software Development with Continual Improvement

**Status:** verified live (arXiv abs page fetched 2026-09-03; matches uploaded `gameBENCHpapersdoc1.txt`).

## Citation facts

| Field | Value |
|---|---|
| Title | Harness-of-Harness: Multi-Day Autonomous Software Development with Continual Improvement |
| Authors | Haoyang Yan, Min-le Su, Hangfan Zhang, Zhanhao Li, Chen Zhang, Shao Zhang, Yang Chen, Lei Bai, Shuyue Hu |
| arXiv | [2609.01481](https://arxiv.org/abs/2609.01481) · cs.AI · submitted 2026-09-01 (v1) |
| DOI | https://doi.org/10.48550/arXiv.2609.01481 |
| GitHub | https://github.com/Flesymeb/HarnessOfHarness |
| Project page | https://flesymeb.github.io/HarnessOfHarness/ · License: CC BY 4.0 |

## What it is

A framework (**HoH**) that makes coding agents **continually improve software during
autonomous, multi-day development**. HoH wraps existing coding-agent harnesses and
organizes their executions into iterative **planning-coding-testing loops**. To sustain
improvement across loops it:

- balances **repair with capability growth**;
- scopes development into **small, verifiable increments**;
- **separates implementation-time testing from independent evaluation**;
- constrains **verifiable outputs** rather than prescribing agent workflows;
- progressively exposes deliverables, role-specific tools and skills;
- encourages **reuse rather than recreation**; maintains versioned project histories.

Results:

- On **GameCraft-Bench, FrontierSWE, and ProgramBench**, three harness-model pairs
  (Codex + GPT-5.5, OpenCode + DeepSeek-V4-Pro, Pi + MiniMax-M3) consistently beat the
  standalone harnesses: **average relative gain 52.25%, max 82.86% after three iterations**.
- In a multi-day deployment with **>70 iterations**, HoH autonomously developed a
  **first-person-shooter game** with a coherent storyline, fully implemented core
  mechanics, a human-playable experience, polished visuals, and integrated audio.

## Why this matters for NEXUS

1. **Independent evaluation is a design principle, not an afterthought.** HoH's
   "separate implementation-time testing from independent evaluation" is exactly NEXUS's
   containment rule: dev-side self-QA vs the external frozen-build jury
   (`challenge/DEVELOPER_SELF_QA.md` vs `benchmark/01`). The paper independently reports
   large gains from this structure — evidence for keeping the wall.
2. **One-shot vs iterated is a real regime difference.** NEXUS's rubric §2.8 already
   separates the strict one-shot battle from a disclosed iterated shelf. HoH shows that
   *harness structure over many iterations* is where large gains come from — so calling a
   multi-day iterative run a "one-shot creation" would be a category error. `benchmark/09`
   makes this a labeled **comparison regime** (SYSTEM_BATTLE / MODEL_CONTROL /
   HARNESS_CONTROL) rather than an implicit assumption.
3. **Multi-day horizons are a next-epoch regime.** A 60-minute battle and a 70-iteration
   multi-day build answer different questions. If NEXUS adds a long-horizon track, HoH's
   recipe (verifiable increments, capability growth vs repair balance, versioned
   histories, reuse over recreation) is the harness-side specification to borrow — and its
   FPS result is the quality bar claim to sanity-check against.
4. **Careful with their headline numbers.** Gains are relative to a *standalone harness*
   baseline of the same model pair, on benchmarks whose scoring is mostly task-pass
   based; "average relative gain 52.25%" is not a claim about human-judged product
   quality. NEXUS product-quality comparisons stay jury-based.

## NEXUS actions

- **`ADOPTED (this revision)`** — regime labels + long-horizon considerations recorded in
  `benchmark/09`; iterated-track honesty rules already in rubric §2.8 stay in force.
- **`CONSIDERED`** — long-horizon (multi-hour/multi-day) experimental regime spec,
  harness-side only, evaluated with NEXUS's external evidence receipts.
