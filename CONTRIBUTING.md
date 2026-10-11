# Contributing to the NEXUS game benchmark Agent Arena

This repository is an evidence-driven benchmark: every prompt revision, registry entry and
tooling change traces back to measured behaviour in a battle round (the operator session
logs in [`logs/`](logs/) and the after-action records in [`battles/`](battles/)).
Contributions follow the same rule — **measured, not assumed**.

## Repository layout

| Path | What lives there |
|---|---|
| [`challenge/`](challenge/README.md) | production side: battle prompts (v14…v22), launcher, launch protocol, fairness contract |
| [`benchmark/`](benchmark/README.md) | evaluation side: rubric, defect taxonomy, anti-bias registry, evidence schema + aggregator, tests |
| [`battles/`](battles/) | after-action records and deep reads, one per round |
| [`logs/`](logs/README.md) | raw operator session captures (evidence artifacts — never edited after upload) |
| [`repo-ops/`](repo-ops/README.md) | CI install guide + verified sandbox tools (E1 Blender headless, E2 probe harness) |
| [`reference_arch/`](reference_arch/README.md), [`expert_team/`](expert_team/) | reference rendering fallbacks and pipeline consensus docs |
| [`archive/`](archive/README.md) | preserved historical artifacts (legacy game builds, old launch kits) |

## Running the gates

Python 3.11+, stdlib only — there is nothing to install for the control plane.

```bash
# 1. control-plane consistency (contract <-> aggregator <-> rubric doc <-> schema <-> runbooks)
python3 benchmark/ops/consistency_check.py

# 2. full regression suite (consistency + demo byte-stability + aggregator math + validator negatives)
python3 benchmark/tests/run_all.py

# 3. evidence contract on the synthetic v2 bundle
python3 benchmark/ops/validate_evidence.py benchmark/examples/synthetic

# 4. probe harness self-test (Node + npm; installs esbuild into a temp dir on first run)
repo-ops/sandbox-tools/e2-probe-harness/selftest.sh
```

The `benchmark-ci` GitHub Action runs gates 1–3 on every push and PR once the
workflow is installed (`.github/workflows/` pushes require the `workflows` token
permission; the ready-to-install file is staged at `repo-ops/benchmark-ci.yml` —
see `repo-ops/README.md` for the 2-minute install).

## Ground rules for changes

1. **Evidence first.** A factual claim about a round needs a log line or an artifact
   citation. Counts are re-derived from the enumeration, not copied between documents.
2. **Containment is a hard rule.** Nothing evaluator-side (rubric constants, weights,
   ceilings, defect codes, aggregator strings) may enter anything an agent receives:
   battle prompts, specs, self-QA lists, or workspace tooling. `launch_challenge.py audit`
   enforces this on frozen builds.
3. **Prompt files are artifacts.** A held prompt (`challenge/BATTLE_PROMPT_vNN.md`) is a
   frozen field-test artifact once its hash is recorded in analyses; fixing one means a new
   version, not a silent edit.
4. **The live prompt changes only by operator decision.** Drafts live next to it
   (`BATTLE_PROMPT_v22.md`); nothing is promoted in-repo without the operator's verdict.
5. **Raw logs are immutable.** Corrections happen in the analyses that cite them.

## Style

- Markdown: keep the existing voice of each document (they are operator-facing records).
- Python: stdlib only, type hints on new functions, `python3 -m py_compile` clean.
- Node/ESM for harness tooling; no new runtime dependencies beyond `esbuild`.

## Security

See [`.github/SECURITY.md`](.github/SECURITY.md) — vulnerabilities are reported privately,
and the containment rule is treated as a security property.
