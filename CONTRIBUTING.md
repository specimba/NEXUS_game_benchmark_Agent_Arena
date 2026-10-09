# Contributing

Thank you for your interest in contributing to the **NEXUS game benchmark Agent Arena**!

## Development Setup

```bash
git clone <repo-url>
cd NEXUS_game_benchmark_Agent_Arena
python3 --version  # requires Python 3.11+
```

The benchmark control plane is Python 3.11 stdlib only — no external dependencies required.

## Running the Gates

```bash
# Compile all Python tooling
python -m py_compile \
  benchmark/ops/aggregate_scores.py \
  benchmark/ops/decision_block.py \
  benchmark/ops/consistency_check.py \
  benchmark/ops/validate_evidence.py \
  benchmark/tests/run_all.py \
  benchmark/examples/synthetic/run_head_to_head.py

# Control-plane consistency gate
python benchmark/ops/consistency_check.py

# Full regression suite
python benchmark/tests/run_all.py

# Evidence contract validation
python benchmark/ops/validate_evidence.py benchmark/examples/synthetic
```

## Pull Request Guidelines

1. Keep changes focused — one logical change per PR
2. All gates must pass before merge
3. Update relevant documentation when changing behavior
4. Never embed evaluator/score data inside game code (containment rule)

## Code Style

- Python: PEP 8 compliant
- Markdown: consistent heading structure, link style, and code block language tags
- JSON: 2-space indentation, trailing newline

## Questions?

Open a discussion — we're happy to help.