# NEXUS Agent Arena — literature radar

Curated briefs on the scientific literature most relevant to this benchmark, written so
contributors can work from the repo without re-fetching papers. Each brief records:
verification (live-fetched on the date shown), citation facts, key numbers, the paper's
limitations, and a mapping to concrete NEXUS files/actions.

| # | Paper (arXiv) | Why it matters for NEXUS |
|---|---------------|--------------------------|
| [01](01-rlhev-agentic-game-dev-trajectory-engine.md) | RLHEV — Agentic Game Development as a Verifiable Trajectory Data Engine for Scaling World Models (2608.25518) | Game engine = executable verifier (collision/physics/navigability) + human acceptance signal. Grounds NEXUS's deterministic+behavioral verifier plane and its future Simulation-Fidelity track. |
| [02](02-gameenginebench-cpp-runtime.md) | GameEngineBench — Evaluating Coding Agents on Real C++ Runtime Environments (2607.03525) | Real-engine scoped tasks (110, UE5/C++, best 55.5% pass@1). Grounds NEXUS's Fixed-Generation track and reproducibility discipline (pin exact engine/toolchain versions). |
| [03](03-gamexpert-bench-lifecycle.md) | GameXpert-Bench — How Far Are Coding Agents from Expert Game Development? (2608.21833) | Lifecycle tracks GameGen/GameFix/GameOpt; agents are strong at playable foundations but weak at defect discovery + regression preservation. Direct blueprint for NEXUS Repair and Optimization tracks. |
| [04](04-harness-of-harness-multiday.md) | Harness-of-Harness — Multi-Day Autonomous Software Development with Continual Improvement (2609.01481) | Iterative planning-coding-testing loops, verifiable increments, separate implementation-time vs independent evaluation. Informs NEXUS's iterated-build rules and long-horizon regime. |
| [05](05-synthesis-nexus-actions.md) | Synthesis → NEXUS actions | What NEXUS adopts now vs next epoch, mapped to files in this repository. |

The four primary papers were re-fetched and verified from arXiv.org on **2026-09-03**
(the uploaded `gameBENCHpapersdoc1.txt` records match the primary pages). PDFs are not
vendored into the repo; the canonical sources are linked from each brief
(arXiv abs/PDF/HTML, Hugging Face papers pages, project pages, GitHub repos).

## How a brief gets added

1. Fetch the abstract page (arXiv) and, when available, the project page/paper HTML.
2. Copy the format of `01-rlhev-*.md`: verified facts → summary → method/scale →
   results → critique → NEXUS mapping with explicit `ADOPTED` / `NEXT-EPOCH` /
   `CONSIDERED` status per action.
3. Keep numbers verbatim from the source and note the source URL next to each figure.
4. When NEXUS adopts an action, move its status to `ADOPTED` and point at the file
   that implements it.
