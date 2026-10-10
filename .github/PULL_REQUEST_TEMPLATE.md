# Summary

<!-- One or two sentences: what does this PR change and why? Link the round/analysis that motivates it. -->

## Type of change

- [ ] Prompt revision (challenge/BATTLE_PROMPT_*)
- [ ] Benchmark control plane (contracts, aggregator, schema, gates)
- [ ] Tooling (launcher, probe harness, sandbox tools)
- [ ] Documentation / registry / taxonomy
- [ ] Repository infrastructure (CI, templates, workflows)

## Evidence

<!-- This repository is evidence-driven. Cite the log lines, battle records, or local
     gate output behind the change — "measured, not assumed". -->

## Local gates (run before requesting review)

- [ ] `python3 -m py_compile` on any changed Python
- [ ] `python3 benchmark/ops/consistency_check.py` → ALL CONSISTENCY CHECKS PASS
- [ ] `python3 benchmark/tests/run_all.py` → ALL TESTS PASS
- [ ] `repo-ops/sandbox-tools/e2-probe-harness/selftest.sh` (if the harness changed)
- [ ] Launcher flows re-verified (if `challenge/launch_challenge.py` changed)

## Containment

- [ ] No rubric constants, weights, ceilings, or evaluator strings added to anything an
      agent receives (brief, spec, self-QA, sandbox tooling)
