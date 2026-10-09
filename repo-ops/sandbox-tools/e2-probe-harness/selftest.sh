#!/usr/bin/env bash
# Self-test for the E2 probe harness — proves the harness detects failures, not just successes.
#
#   ./selftest.sh
#
# Exit 0 = harness verified. 1 = a case behaved wrongly. 3 = cannot self-test (no esbuild, offline).
#
# Cases:
#   1. good probe            -> exit 0 (all checks pass)
#   2. failing probe         -> exit 1 (a reported false check is caught)
#   3. silent probe          -> exit 2 (no machine-readable report = no evidence)
#   4. missing entry         -> exit 2
#   5. --json mode           -> "executed": true
#   6. non-headless import   -> exit 2 (bundling fails loudly instead of silently passing)
set -u
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

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

cd "$WORK"
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

node run-probe.mjs example/silent-probe.ts >out3.txt 2>&1; expect "probe with no JSON report exits 2" 2 $?
node run-probe.mjs example/nope.ts >out4.txt 2>&1; expect "missing entry exits 2" 2 $?
node run-probe.mjs example/dom-probe.ts >out5.txt 2>&1; expect "non-headless import fails bundling" 2 $?

node run-probe.mjs --json example/src/game/probe.ts >out6.txt 2>&1
grep -q '"executed": true' out6.txt && note "[PASS] --json reports executed=true" || { note "[FAIL] --json did not report executed=true"; fail=1; }
grep -q '"checks":' out6.txt && note "[PASS] --json reports check counts" || { note "[FAIL] --json lacked check counts"; fail=1; }

if [ "$fail" = 0 ]; then note "== harness verified: 2 pass paths, 4 failure paths, json mode =="; exit 0; fi
note "== harness self-test FAILED =="
exit 1
