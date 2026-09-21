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

---

## Sandbox tools (verified, for the battle workspaces)

| Tool | Class | What it does | Verified |
|---|---|---|---|
| [`sandbox-tools/blender-headless/`](sandbox-tools/blender-headless/README.md) | E1 (shell) | Blender 4.2 as a Python module with stub `.so`s for minimal hosts; seeded generator → glTF → Khronos validator → Cycles **CPU** QA stills | 2026-09-06 (analyst sandbox, rebuild-from-scratch) |
| [`sandbox-tools/e2-probe-harness/`](sandbox-tools/e2-probe-harness/README.md) | E2/E3 (npm-only) | Makes a TypeScript autopilot probe **executable** with `esbuild` (ships inside Vite) on Node — no shell, no browser, no new runtime deps. Exit 0 pass / 1 failed check / 2 could-not-execute; `--json` summary for the README | 2026-09-21 (`./selftest.sh`: 2 pass paths, 4 failure paths, JSON mode) |

The E2 harness exists because 21 of 22 sessions in round 018 wrote a probe they could never run; the one session that hooked its build to execute the probe found a real balance defect and delivered the round's best-received game. Dropping `run-probe.mjs` into a battle workspace (`"probe": "node scripts/run-probe.mjs"`) is an operator decision — see `challenge/SANDBOX_CAPABILITIES_GUIDE.md` §4 (D2).
