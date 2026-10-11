# Battle logs — raw operator session captures

This folder holds the raw session logs uploaded by the operator: the verbatim battle
captures whose operator comments drive every prompt revision and benchmark change in this
repository. They are evidence artifacts — **never edited after upload** (the per-round
analyses in [`../battles/`](../battles/) quote them by line number).

Renamed from the original `ARENAaiAGENTandGAMEbenchNEXUSfreecreationlogsN.txt` uploads to
`game-log-NN.txt` on 2026-10-10; every reference in the repository was updated in the same
change.

| File | Round(s) | What it captures |
|---|---|---|
| `game-log-04.txt` … `game-log-07.txt` | early rounds (R002–R006 era) | raw session captures from the informal rounds; the after-actions for those rounds cite local `.experiments/` captures, these are the corresponding uploaded logs |
| `game-log-08.txt` | R006–R007 | source of [`round-007-after-action.md`](../battles/round-007-after-action.md) — v9 prompt, 8 model sessions, 2 battles |
| `game-log-09.txt` | R009 | source of [`round-009-after-action.md`](../battles/round-009-after-action.md) — 6 model sessions |
| `game-log-10.txt` | R010 | source of [`round-010-after-action.md`](../battles/round-010-after-action.md) + [`v15-stability-review.md`](../battles/v15-stability-review.md) — controlled A/B, v13 cautious vs LEAN |
| `game-log-11.txt` | R011 | source of [`round-011-after-action.md`](../battles/round-011-after-action.md) — 14 sessions (8 under v13, 6 under v15.1) |
| `game-log-12.txt` | R012 | source of [`round-012-after-action.md`](../battles/round-012-after-action.md) — 12 sessions / 6 battles; the best round in benchmark history |
| `game-log-13.txt` | R013–R014 | v17 live (steers + ship micro-test) + the v18 Claude-of-Tanks engineering block |
| `game-log-13-gpt-advisory.txt` | R013 | GPT-specific advisory notes for round 013 (referenced by [`../benchmark/09-agent-arena-v2-design.md`](../benchmark/09-agent-arena-v2-design.md)) |
| `game-log-14.txt` | R015 | source of [`round-015-v19core-field-analysis.md`](../battles/round-015-v19core-field-analysis.md) — v19 CORE, 12 sessions / 6 battles |
| `game-log-15.txt` | R016 | v20 first field test — 11 sessions, 6 operator comments |
| `game-log-16.txt` | R017 | v20 second field test (Option A/B format), 6 operator comments |
| `game-log-17.txt` | R018 | v21 single-prompt field test — 22 sessions / 11 battles / 11 operator comments (12,205 lines). Sources [`round-018-v21-field-analysis.md`](../battles/round-018-v21-field-analysis.md), [`log17-approach-distillation.md`](../battles/log17-approach-distillation.md), [`log17-v22-revision-notes.md`](../battles/log17-v22-revision-notes.md) |
| `game-log-18.txt` | R019 | v22 single-prompt field test — ~30 sessions / 15 battles / 15 operator comments (27,809 lines, 1.1 MB). Imported 2026-10-12 from the operator's upload (`ARENAaiAGENTandGAMEbenchNEXUSfreecreationlogs18.txt`, first committed to `master` then moved here). Pasted prompt matches `BATTLE_PROMPT_v22.md` except one esbuild line (see analysis §3.1). Source: [`round-019-field-analysis.md`](../battles/round-019-field-analysis.md); revision proposals (held): [`log18-v23-revision-notes.md`](../battles/log18-v23-revision-notes.md) |

Related:

- After-action records and deep reads: [`../battles/`](../battles/)
- Prompt lineage across all rounds: [`../benchmark/prompt-lineage-deep-analysis.md`](../benchmark/prompt-lineage-deep-analysis.md)
- Literature capture from the same upload batch: [`../benchmark/literature/game-bench-papers-doc1.txt`](../benchmark/literature/game-bench-papers-doc1.txt)
