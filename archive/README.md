# Archive — preserved artifacts from the benchmark's history

Files kept for provenance. Nothing here is part of the active benchmark package; the live
entry points are in the repository root README. Archived code is excluded from SonarCloud
analysis (`sonar.exclusions=archive/**` in `sonar-project.properties`) — it is preserved
byte-faithful, not maintained.

## `legacy-game/` — TIDEWRIGHT and its era documents

The complete browser game **TIDEWRIGHT — The Fluid Forge** (a WebGPU-driven 2D fluid
simulation, Position-Based / double-density relaxation after Clavet et al. 2005) together
with the documents it shipped with: its `GAME_README.md` (declares `TRACK: strict-one-shot`),
`SELF_QA.md`, `design_notebook.md`, and its two Node verification harnesses under
`verifier/` (physics + game logic). Per the C11 registry row in
[`../benchmark/06-anti-bias-anti-gaming.md`](../benchmark/06-anti-bias-anti-gaming.md) the
build belongs to the Round-003 era (claude-opus-4-8, TIDEWRIGHT / FERROFLUX); the
`expert_team/` consensus documents in this repository were written for its render pipeline.

Also preserved: `BATTLE_2_ENTRY.md` — the v17-era paste-ready launch kit (launch procedure,
per-run scoresheet and contestant prompt in one file), kept as a historical delivery format.

Paths inside `legacy-game/` are self-contained (the game runs from its own `index.html`);
documents outside the archive that listed these files at the repository root predate the
2026-10-10 tidy-up and describe the same content at its new location.
