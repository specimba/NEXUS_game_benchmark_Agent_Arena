# Install the NEXUS benchmark CI as a GitHub status check

The automation token that pushes this branch is **refused by GitHub when a push
creates/updates files under `.github/workflows/`** (the token has no `workflows`
permission — GitHub's own protection, message: *"refusing to allow a GitHub App to
create or update workflow … without `workflows` permission"*). So the workflow ships
here, outside `.github/`, ready to be installed by someone with full repo rights.

## Install (2 minutes, GitHub web UI)

1. Open [`benchmark-ci.yml`](benchmark-ci.yml) in this folder (view raw).
2. In the repo, create `.github/workflows/benchmark-ci.yml` with that exact content —
   e.g. the web "Add file → Upload files" flow used for the log uploads, then commit
   directly to `master` (or via PR).
3. The workflow `benchmark-ci` now runs on every push/PR (Python 3.11, stdlib only;
   no action dependencies beyond checkout/setup-python).
4. In **Settings → Rulesets**: enable **Require status checks to pass** and add
   `benchmark-ci` to the required checks (it pairs with the branch ruleset currently
   being configured). Note: only after the file lands in `master`/default branch will
   the check appear in the ruleset's picker.

## What the check guards

| Step | Command | Fails on |
|---|---|---|
| Compile | `python -m py_compile …` (all ops/tests/demo scripts) | syntax errors |
| Consistency gate | `python benchmark/ops/consistency_check.py` | drift between rubric contract ↔ aggregator ↔ rubric doc ↔ evidence schema ↔ runbooks |
| Regression suite | `python benchmark/tests/run_all.py` | demo byte-drift, aggregator math, validator negatives, receipts-only decision |
| Evidence validation | `python benchmark/ops/validate_evidence.py benchmark/examples/synthetic` | evidence-contract violations |

Everything runs locally the same way (see each tool's `--help`/docstring).

## Alternative if you prefer not to install CI

The ruleset can skip "Require status checks" — the same guarantees are available as
pre-merge commands (documented in `benchmark/README.md`, "Anti-drift guard").
