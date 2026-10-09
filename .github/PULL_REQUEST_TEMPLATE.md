# Pull Request

## Summary

Briefly describe what this PR does and why.

## Type of change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Refactor / chore

## Checklist

- [ ] Code compiles and passes local tests (`python benchmark/tests/run_all.py`)
- [ ] Consistency gate passes (`python benchmark/ops/consistency_check.py`)
- [ ] Evidence contract validated on synthetic bundle
- [ ] Relevant documentation updated
- [ ] No benchmark/evaluator leakage into game code (containment rule)

## Related issues

Closes #