# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `.github/` directory with CI workflow, issue templates, PR template, CODEOWNERS, SECURITY.md
- `LICENSE` (MIT)
- `CONTRIBUTING.md`
- `logs/` directory with organized battle logs (17 sessions) and index
- Clean log file names: `game-log-04.txt` through `game-log-17.txt`, `game-log-13-gpt-advisory.txt`, `game-bench-papers.txt`
- Updated all cross-references to moved log files

### Changed
- Moved 17 large log files from repository root to `logs/`
- Updated `.gitignore` with editor/OS patterns

## [2026-10-09] - Round 018 (v21 field test)

### Added
- `challenge/BATTLE_PROMPT_v22.md` — one-file candidate prompt with inline probe runner
- `repo-ops/sandbox-tools/e2-probe-harness/` — verified probe runner (E2/E3 sandbox class)
- `battles/round-018-v21-field-analysis.md` — 22 sessions, 11 battles deep read
- `battles/log17-approach-distillation.md` — graphics A0–A15, mechanics B1–B12 ledger
- `battles/log17-v22-revision-notes.md` — v22 build notes
- `benchmark/examples/log17-b11-artifact-review.md` — worked example
- `benchmark/04-defect-taxonomy.md` — new classes: CONTROL-LEGIBILITY, LEVEL-N-SOLVABILITY, NOVELTY-COLLISION
- `benchmark/06-anti-bias-anti-gaming.md` — registry rows C24–C26
- `challenge/launch_challenge.py` — `--prompt-only`, `--prompt PATH`, `single-prompt --bare` modes

### Fixed
- Corrected esbuild dependency guidance for Vite 8 (explicit `npm i -D esbuild` required)

## [2026-09-22] - v22 prompt finalized

### Added
- v22 prompt finalized per operator directive: single self-contained file, inlined verification
- §0 four-answer gate with rejection tests
- `launch_challenge.py` verified: byte-identical `--bare` output, sha256 manifest

## [2026-09-06] - Round 015 (v19 CORE field test)

### Added
- `battles/round-015-v19core-field-analysis.md` — C21 (fire/ember) cluster discovery
- `benchmark/19-prompt-merge-blueprint.md` — merge plan for v18+v19
- Root cause: v19's all-stakes definition attracts crisis/hazard domains

## [2026-08-30] - Benchmark v10→v18 evolution

### Added
- Rounds 007–012 fold-backs, controlled experiments
- Registry C14–C18, live v17 prompt
- Evidence schema v2, contract-driven aggregator, decision block generator

## [2026-08-26] - TIDEWRIGHT (WebGPU fluid physics game)

### Added
- Verified solver + shader renderer + Canvas2D fallback
- Reference architecture: `src/`, `reference_arch/`

## [2026-08-23] - Rounds 002–005

### Added
- BATTLE_PROMPT v3→v8 iteration
- Judge-side infra hardened

## [2026-08-10] - One-Shot Game Development Agent Creation Benchmark redesign

### Added
- Unlimited creativity, developer-not-player framing
- `challenge/`, `benchmark/` structure established