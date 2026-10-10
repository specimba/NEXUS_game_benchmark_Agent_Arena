#!/usr/bin/env bash
# Self-test for the E2 probe harness — proves the harness detects failures, not just successes.
#
#   ./selftest.sh
#
# Exit 0 = harness verified. 1 = a case behaved wrongly. 3 = cannot self-test (no esbuild, offline).
#
# Cases:
#   1.  good probe                    -> exit 0 (all checks pass)
#   2.  failing probe                 -> exit 1 (a reported false check is caught)
#   3.  aggregate mismatch            -> exit 1 (fails:1 is honored even when results[] pass)
#   4.  silent probe                  -> exit 2 (no machine-readable report = no evidence)
#   5.  missing entry                 -> exit 2
#   6.  non-headless import           -> exit 2 (bundling fails loudly instead of silently passing)
#   7.  pass report then throw        -> exit 2 (a throwing execution invalidates the report)
#   8.  result entry without ok       -> exit 2 (a malformed report is never a pass)
#   9.  hanging probe + --timeout     -> exit 2 (bounded runtime; no infinite hang)
#   10. late async log after report   -> exit 0 (only the report line is parsed)
#   11. --json on silent probe        -> exit 2 + verdict could-not-report (JSON keeps the contract)
#   12. --json on failing probe       -> exit 1 + "exit": 1 (JSON reports the harness verdict)
#   13. relative --modules=<dir>      -> exit 0 (relative search roots are resolved)
set -u
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORK="$(mktemp -d)"
ISO="$(mktemp -d)"
trap 'rm -rf "$WORK" "$ISO"' EXIT

fail=0
note() { printf '%s\n' "$*"; }
expect() { # expect <label> <expected-exit> <actual-exit> [extra]
  if [ "$2" = "$3" ]; then note "[PASS] $1 (exit $3)"; else note "[FAIL] $1 — expected exit $2, got $3 ${4:-}"; fail=1; fi
}

note "== E2 probe harness self-test =="
note "work dir: $WORK"

cp "$HERE/run-probe.mjs" "$WORK/"
mkdir -p "$WORK/example/src/game"
cp "$HERE/example/src/game/sim.ts" "$HERE/example/src/game/probe.ts" "$WORK/example/src/game/"
cp "$HERE/example/failing-probe.ts" "$HERE/example/silent-probe.ts" "$WORK/example/"
cat > "$WORK/example/dom-probe.ts" <<'EOF'
// Imports a missing alias on purpose: bundling must fail loudly (exit 2), never pass silently.
import { thing } from '@/does/not/exist';
console.log(JSON.stringify({ check: 'dom', results: [{ name: 'never runs', ok: true }] }));
void thing;
EOF
cat > "$WORK/example/late-throw-probe.ts" <<'EOF'
// Prints a fully passing report, then throws: execution was not clean, so the verdict
// must NOT be a pass.
console.log(JSON.stringify({ check: 'late-throw', results: [{ name: 'passes first', ok: true }] }));
await new Promise((r) => setTimeout(r, 5));
throw new Error('late top-level throw after the report');
EOF
cat > "$WORK/example/agg-mismatch-probe.ts" <<'EOF'
// Detailed results all pass but the aggregate counter says 1 failure: the aggregate
// must be honored alongside the detailed results.
console.log(JSON.stringify({ check: 'agg', results: [{ name: 'listed pass', ok: true }], fails: 1 }));
EOF
cat > "$WORK/example/bad-entry-probe.ts" <<'EOF'
// A result entry without a boolean ok is malformed: never a pass.
console.log(JSON.stringify({ check: 'bad-entry', results: [{ name: 'no boolean verdict here' }] }));
EOF
cat > "$WORK/example/hanging-probe.ts" <<'EOF'
// Keeps the event loop alive forever and never reports: the harness must time out, not hang.
setInterval(() => {}, 1000);
EOF
cat > "$WORK/example/late-log-probe.ts" <<'EOF'
// Reports first, then schedules async noise after the report line. The harness must parse
// only the report line and still pass.
console.log(JSON.stringify({ check: 'late-log', results: [{ name: 'reported before noise', ok: true }] }));
setTimeout(() => console.log('late async noise after the report'), 5);
EOF

cd "$WORK" || exit 3
if [ ! -d node_modules/esbuild ]; then
  note "installing esbuild (needed to bundle TS probes; Vite 7 projects include it; Vite 8 projects do not)…"
  if ! npm install --ignore-scripts --no-audit --no-fund --silent esbuild >/dev/null 2>&1; then
    note "SKIP: could not install esbuild (offline?). Self-test inconclusive — not a pass."
    exit 3
  fi
fi

node run-probe.mjs example/src/game/probe.ts >out1.txt 2>&1; expect "good probe runs and passes" 0 $?
if grep -q "0 failed" out1.txt; then
  note "      summary: $(grep -o '[0-9]* checks, [0-9]* failed' out1.txt | head -1) · checks: $(grep -c '^  PASS' out1.txt)"
else
  note "[FAIL] good probe output lacked a summary line"; fail=1
fi

node run-probe.mjs example/failing-probe.ts >out2.txt 2>&1; expect "failing probe exits 1" 1 $?
grep -q "FAIL  greed fails" out2.txt && note "      failed check surfaced: yes" || { note "[FAIL] failing check not surfaced"; fail=1; }

node run-probe.mjs example/agg-mismatch-probe.ts >out3.txt 2>&1; expect "aggregate fails:1 overrides passing results" 1 $?
node run-probe.mjs example/silent-probe.ts >out4.txt 2>&1; expect "probe with no JSON report exits 2" 2 $?
node run-probe.mjs example/nope.ts >out5.txt 2>&1; expect "missing entry exits 2" 2 $?
node run-probe.mjs example/dom-probe.ts >out6.txt 2>&1; expect "non-headless import fails bundling" 2 $?
node run-probe.mjs example/late-throw-probe.ts >out7.txt 2>&1; expect "passing report then throw exits 2" 2 $?
node run-probe.mjs example/bad-entry-probe.ts >out8.txt 2>&1; expect "result entry without boolean ok exits 2" 2 $?

node run-probe.mjs --timeout=1500 example/hanging-probe.ts >out9.txt 2>&1; expect "hanging probe is bounded by --timeout" 2 $?
grep -qi "timeout" out9.txt && note "      timeout named in the message: yes" || { note "[FAIL] timeout message missing"; fail=1; }

node run-probe.mjs example/late-log-probe.ts >out10.txt 2>&1; expect "late async log after the report still passes" 0 $?

node run-probe.mjs --json example/src/game/probe.ts >out11.txt 2>&1
grep -q '"executed": true' out11.txt && note "[PASS] --json reports executed=true" || { note "[FAIL] --json did not report executed=true"; fail=1; }
grep -q '"checks":' out11.txt && note "[PASS] --json reports check counts" || { note "[FAIL] --json lacked check counts"; fail=1; }

node run-probe.mjs --json example/silent-probe.ts >out12.txt 2>&1; expect "--json silent probe keeps exit 2" 2 $?
grep -q '"verdict": "could-not-report"' out12.txt && note "[PASS] --json names the could-not-report verdict" || { note "[FAIL] --json verdict missing"; fail=1; }

node run-probe.mjs --json example/failing-probe.ts >out13.txt 2>&1; expect "--json failing probe keeps exit 1" 1 $?
grep -q '"exit": 1' out13.txt && note "[PASS] --json exit field carries the harness verdict" || { note "[FAIL] --json exit field wrong"; fail=1; }

# Relative --modules=<dir>: esbuild is reachable ONLY through the (relative) search root —
# neither the cwd nor any ancestor of it has node_modules.
mkdir -p "$ISO/proj" "$ISO/mods"
ln -s "$WORK/node_modules" "$ISO/mods/node_modules"
( cd "$ISO/proj" && node "$WORK/run-probe.mjs" --modules=../mods "$WORK/example/src/game/probe.ts" ) >out14.txt 2>&1
expect "relative --modules path resolves" 0 $?

if [ "$fail" = 0 ]; then note "== harness verified: 3 pass paths, 10 failure paths, json + timeout + relative-modules =="; exit 0; fi
note "== harness self-test FAILED =="
exit 1