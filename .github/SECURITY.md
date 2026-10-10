# Security Policy

## Supported versions

Only the default branch (`master`) receives security fixes.

## Reporting a vulnerability

Please do **not** open a public issue for security problems.

1. Report privately via GitHub's **Report a vulnerability** flow (Security tab →
   Advisories → "Report a vulnerability"), or contact the maintainer (@specimba) directly.
2. Include what is affected, how to reproduce it, and the potential impact.
3. Allow reasonable time for triage and fix before any public disclosure.

Security-relevant scope in this repository includes the challenge launcher
(`challenge/launch_challenge.py`), the probe harness (`repo-ops/sandbox-tools/e2-probe-harness/`),
the CI workflow, and anything that could leak evaluation material into agent workspaces
(the containment rule in the root README is itself a security property of the benchmark).
