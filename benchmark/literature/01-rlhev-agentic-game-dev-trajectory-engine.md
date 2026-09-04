# 01 — RLHEV: Agentic Game Development as a Verifiable Trajectory Data Engine for Scaling World Models

**Status:** verified live (arXiv abs page fetched 2026-09-03; matches uploaded `gameBENCHpapersdoc1.txt`).

## Citation facts

| Field | Value |
|---|---|
| Title | Agentic Game Development as a Verifiable Trajectory Data Engine for Scaling World Models |
| Authors | Pengfei Zhou, Hexin Wang, Zhengfeiyang Zhang, Yixing Ma, Zhenglin Wan, Kaipeng Zhang, Wangbo Zhao, Yang You (National University of Singapore) |
| arXiv | [2608.25518](https://arxiv.org/abs/2608.25518) · cs.AI · submitted 2026-08-26 |
| DOI | https://doi.org/10.48550/arXiv.2608.25518 |
| HF Papers | https://huggingface.co/papers/2608.25518 (#1 paper of the day, Aug 26) |
| PDF/HTML | https://arxiv.org/pdf/2608.25518 · https://arxiv.org/html/2608.25518v1 |

## Core claim

Scaling spatial world models by training on more crawled video + more compute is
inefficient. Scaling also needs a **recursive data engine with grounded reward signals**.
Games provide that: a scene encoded by a game engine is an *executable world
specification*, so the engine can cheaply check collision, physics, navigability and
bounded playability — dense, grounded signals — while the developer provides the global
signal by accepting or rejecting the scene.

The paper proposes **Reinforcement Learning with Human-Engine Verification (RLHEV)**:
RL post-training that combines (a) dense engine verification signals and (b) implicit
human acceptance feedback from the development process. Game development also supplies
real-world long-horizon trajectory data for post-training.

## Why this matters for NEXUS

RLHEV is a *training-paradigm* paper, not a benchmark paper, but its evidence
architecture is the cleanest statement of NEXUS's two-plane evaluation doctrine:

```
GAME ARTIFACT
   ├── deterministic engine/behavioral verifier  (machine-checkable facts)
   └── human acceptance                           (authorship, fun, coherence)
```

Mapping to this repo:

- **`ADOPTED (already in repo).** The jury must not be responsible for discovering every
  machine-checkable fact. `benchmark/03` S1/S2/S4a/S6 probes (launch, restart, 60-min
  soak, boundaries) + the P-probes are our "engine verifier plane"; the jury owns
  authorship/quality (`benchmark/01`, rubric A/G/V criteria).
- **`ADOPTED (this revision).** Machine-gated evidence: `benchmark/contracts/RUBRIC_v2.json`
  + `benchmark/ops/validate_evidence.py` make "which facts are scoreable" explicit and
  drift-guarded, the same role engine checks play in RLHEV.
- **`NEXT-EPOCH` — Simulation-Fidelity track (Track E in `benchmark/09`).** For games
  claiming physics/fluid/procedural/stochastic systems: fixed initial state + fixed input
  sequence, N repeated rollouts, engine invariants, then evaluate the *distribution*
  (see 05-synthesis + PAWBench discussion below).

## Critique to keep on file

HF community comment (user O96a, ~2026-08-31) is the strongest one-paragraph challenge:

> "Crash-free is a low bar. A game that compiles and runs isn't coherent past level one,
> and RL on a 'didn't crash' reward will happily optimize for bland, safe scenes — the
> agent finds the path of least resistance, not the path of most meaning. The real
> question is whether this signal buys spatial consistency or just trades CLIP fuzz for
> crash-fuzz. I'd want to see the generated trajectories hold up under a human playthrough,
> not just a runtime check."

NEXUS answer, already structural: every machine gate is a *ceiling/penalty*, never a
quality score. Gates cannot raise a score; only human-perceived evidence can (V0/V8/G6/M8
etc. require live play evidence ≥ threshold). We do not trade CLIP fuzz for crash-fuzz —
we keep both planes and never let the verifier plane substitute for the jury plane.
Cite this explicitly whenever someone proposes an automated-only game benchmark.
