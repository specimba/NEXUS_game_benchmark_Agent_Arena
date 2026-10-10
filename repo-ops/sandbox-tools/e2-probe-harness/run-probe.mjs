#!/usr/bin/env node
/**
 * E2 probe harness — make a headless autopilot probe *executable* inside an npm-only sandbox.
 *
 * Why this exists (evidence: log 17, session B11 / claude-opus-5): battle sandboxes are
 * E2/E3-class — `npm install` and `npm run build` work, but there is no arbitrary shell and
 * no browser. Agents therefore ship probes they never ran; a probe that was never executed is
 * a claim, not evidence. The one session that made its probe runnable (by hooking the build
 * pipeline) found a real balance defect (a 1/24 win rate) and was the log's top-rated game.
 *
 * This harness runs a TypeScript probe on Node using only what a Vite project already ships
 * (esbuild), with no browser and no new runtime dependencies.
 *
 * Usage (from the game project root):
 *   node scripts/run-probe.mjs                        # entry defaults to src/game/probe.ts
 *   node scripts/run-probe.mjs src/game/probe.ts      # explicit entry
 *   node scripts/run-probe.mjs --alias=@=src          # resolve tsconfig/vite path aliases
 *   node scripts/run-probe.mjs --modules=<dir>        # extra node_modules search roots (relative paths ok)
 *   node scripts/run-probe.mjs --timeout=30000        # max probe runtime in ms (default 60000)
 *   node scripts/run-probe.mjs --json                 # machine-readable summary
 *
 * Probe contract (one line of JSON on stdout):
 *   {"check": "<name>", "results": [{"name": "...", "ok": true|false, "detail": "..."}]}
 * Aggregate forms are accepted too: {"ok": true} or {"pass": true} or {"fails": 0}.
 * Every results[] entry must carry a boolean `ok`. Human-readable logs are printed as usual;
 * only the report line decides the verdict — output printed after the report cannot corrupt it.
 *
 * Exit codes:
 *   0 = executed, reported, and all checks passed
 *   1 = executed and reported, but at least one check failed (detailed or aggregate)
 *   2 = the harness could not produce a trusted verdict: bundling failed, entry missing,
 *       esbuild missing, probe timed out, crashed, threw, printed no report, or printed a
 *       malformed report. Exit 2 is information, never a pass.
 *
 * What this proves: sim rules, reachability of win/fail, determinism, restart, loop closure.
 * What this cannot prove: pixels, audio, feel, pacing on a real machine. Say so in the README.
 */
import { createRequire } from 'node:module';
import { mkdtempSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const argv = process.argv.slice(2);
const jsonOnly = argv.includes('--json');
const aliasSpecs = argv.filter((a) => a.startsWith('--alias=')).map((a) => a.slice('--alias='.length));
// Resolve --modules roots up-front: createRequire needs absolute paths, and a relative
// search dir must work the same way an absolute one does.
const searchDirs = argv.filter((a) => a.startsWith('--modules=')).map((a) => resolve(a.slice('--modules='.length)));
const timeoutSpec = argv.find((a) => a.startsWith('--timeout='));
const timeoutMs = timeoutSpec ? Math.max(100, Number(timeoutSpec.slice('--timeout='.length)) || 60000) : 60000;
const entry = argv.find((a) => !a.startsWith('--')) ?? 'src/game/probe.ts';
const alias = Object.fromEntries(aliasSpecs.map((spec) => {
  const [k, v] = spec.split('=');
  return [k, resolve(v)];
}));

function loadEsbuild() {
  const attempts = [];
  const roots = [process.cwd(), import.meta.dirname, ...searchDirs];
  for (const root of roots) {
    try {
      const req = createRequire(join(root, 'noop.js'));
      return { esbuild: req('esbuild'), how: `node_modules near ${root}` };
    } catch (e) { attempts.push(`require('esbuild') from ${root}`); }
    try {
      const req = createRequire(join(root, 'noop.js'));
      const vitePkg = req.resolve('vite/package.json');
      const req2 = createRequire(vitePkg);
      return { esbuild: req2('esbuild'), how: 'esbuild vendored inside vite' };
    } catch (e) { attempts.push(`vite/node_modules/esbuild from ${root}`); }
  }
  if (process.env.PROBE_ESBUILD) {
    try {
      const req = createRequire(join(process.cwd(), 'noop.js'));
      return { esbuild: req(process.env.PROBE_ESBUILD), how: `PROBE_ESBUILD=${process.env.PROBE_ESBUILD}` };
    } catch (e) { attempts.push('PROBE_ESBUILD env var'); }
  }
  return { esbuild: null, how: null, attempts };
}

const { esbuild, how, attempts } = loadEsbuild();

// One machine-readable summary object; emitted verbatim in --json mode on every exit path.
const summary = {
  entry,
  esbuild: how,
  executed: false,
  verdict: 'could-not-report',
  reason: null,
  probes: [],
  checks: 0,
  failed: 0,
  malformed: 0,
  aggregate_fails: null,
  threw: null,
  child_exit: null,
  child_signal: null,
  timeout_ms: timeoutMs,
  exit: 2,
};

let cleanup = () => {};
function finish(code) {
  summary.exit = code;
  cleanup();
  if (jsonOnly) process.stdout.write(JSON.stringify(summary, null, 2) + '\n');
  process.exit(code);
}

if (!esbuild) {
  summary.reason = 'esbuild-not-found';
  if (!jsonOnly) {
    console.error('[probe-harness] esbuild not found — cannot execute the probe.');
    console.error('  Tried: ' + attempts.join(' | '));
    console.error('  Fix: `npm i -D esbuild` (Vite 7 projects already have it; Vite 8 does not), or run inside the project.');
  }
  finish(2);
}

if (!existsSync(entry)) {
  summary.reason = 'entry-missing';
  if (!jsonOnly) console.error(`[probe-harness] probe entry not found: ${entry}`);
  finish(2);
}

const outdir = mkdtempSync(join(tmpdir(), 'e2-probe-'));
cleanup = () => rmSync(outdir, { recursive: true, force: true });
const outfile = join(outdir, 'probe.bundle.mjs');

try {
  await esbuild.build({
    entryPoints: [entry],
    outfile,
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node18',
    logLevel: 'warning',
    define: { 'import.meta.env.DEV': 'true', 'import.meta.env.PROD': 'false' },
    ...(Object.keys(alias).length ? { alias } : {}),
  });
} catch (err) {
  summary.reason = 'bundling-failed';
  if (!jsonOnly) {
    console.error('[probe-harness] bundling failed — the probe, or something it imports, is not headless.');
    console.error('  Fix: keep the simulation pure (invariants 2 & 3: zero top-level side effects, seeded');
    console.error('  randomness) and keep DOM/canvas/audio behind injected interfaces.');
    console.error(String(err?.message ?? err));
  }
  finish(2);
}

// Minimal browser-surface stubs: a probe that touches a guarded global should degrade, not crash.
writeFileSync(join(outdir, 'stub.mjs'), `
const noop = () => {};
globalThis.window ??= globalThis;
globalThis.document ??= { createElement: () => ({ getContext: () => null, style: {} }), addEventListener: noop, body: { appendChild: noop } };
globalThis.localStorage ??= { getItem: () => null, setItem: noop, removeItem: noop, clear: noop };
globalThis.requestAnimationFrame ??= (cb) => setTimeout(() => cb(Date.now()), 0);
globalThis.cancelAnimationFrame ??= (id) => clearTimeout(id);
globalThis.AudioContext ??= class { constructor() { throw new Error('audio unavailable in probe'); } };
globalThis.performance ??= { now: () => 0 };
`);

const runner = join(outdir, 'runner.mjs');
writeFileSync(runner, `
import './stub.mjs';
const lines = [];
const realLog = console.log;
console.log = (...a) => { lines.push(a.map(String).join(' ')); realLog(...a); };
let threw = null;
try { await import(${JSON.stringify(pathToFileURL(outfile).href)}); }
catch (e) { threw = String(e?.stack ?? e); realLog('[probe-harness] probe threw:', threw); }
const verdicts = [];
for (const l of lines) {
  const t = l.trim();
  if (!t.startsWith('{')) continue;
  try {
    const o = JSON.parse(t);
    if (o && typeof o === 'object' && ('results' in o || 'ok' in o || 'pass' in o || 'fails' in o)) verdicts.push(o);
  } catch {}
}
process.stdout.write('__PROBE_REPORT__' + JSON.stringify({ verdicts, threw }) + '\\n');
`);

const run = spawnSync(process.execPath, [runner], {
  encoding: 'utf8',
  cwd: process.cwd(),
  timeout: timeoutMs, // a probe that loops forever must not hang the harness or the build hook
  maxBuffer: 64 * 1024 * 1024, // verbose probes must not be truncated into a fake "no report"
});
summary.child_exit = run.status;
summary.child_signal = run.signal ?? null;

// Parse ONLY the report marker's own line. A probe may schedule late async logs after the
// report; feeding those into JSON.parse would corrupt a perfectly valid verdict.
const stdout = run.stdout ?? '';
const markerAt = stdout.indexOf('__PROBE_REPORT__');
const reportLine = markerAt >= 0
  ? stdout.slice(markerAt + '__PROBE_REPORT__'.length).split('\n')[0].trim()
  : '';
let parsed = null;
if (reportLine) { try { parsed = JSON.parse(reportLine); } catch { parsed = null; } }

const verdicts = parsed && Array.isArray(parsed.verdicts) ? parsed.verdicts : [];
const results = verdicts.flatMap((v) => (Array.isArray(v?.results) ? v.results : []));
const malformed = results.filter((r) => !(r && typeof r === 'object' && typeof r.ok === 'boolean'));
const failed = results.filter((r) => r && r.ok === false);
let aggregateFails = null;
for (const v of verdicts) {
  if (typeof v.fails === 'number') aggregateFails = (aggregateFails ?? 0) + v.fails;
  else if (typeof v.ok === 'boolean') aggregateFails = (aggregateFails ?? 0) + (v.ok ? 0 : 1);
  else if (typeof v.pass === 'boolean') aggregateFails = (aggregateFails ?? 0) + (v.pass ? 0 : 1);
}
const found = parsed !== null && verdicts.length > 0;

summary.executed = found;
summary.probes = verdicts.map((v) => v?.check ?? '(unnamed)');
summary.checks = results.length;
summary.failed = failed.length;
summary.malformed = malformed.length;
summary.aggregate_fails = aggregateFails;
summary.threw = typeof parsed?.threw === 'string' && parsed.threw ? parsed.threw : null;

// Trust ladder: execution must be clean before the report is believed.
if (run.error || run.status === null) {
  summary.reason = run.signal
    ? `probe did not finish — killed with signal ${run.signal} (hit the ${timeoutMs} ms timeout; raise it with --timeout=<ms> if the probe legitimately needs longer)`
    : `probe could not run to completion: ${run.error?.message ?? 'unknown spawn error'}`;
  if (!jsonOnly) console.error(`[probe-harness] ${summary.reason}`);
  finish(2);
}
if (run.status !== 0) {
  summary.reason = `probe execution crashed with exit ${run.status} after the report stage — the verdict is not trusted`;
  if (!jsonOnly) {
    console.error(`[probe-harness] ${summary.reason}.`);
    console.error('  A probe must exit cleanly: keep timers finite and never call process.exit() inside it.');
  }
  finish(2);
}
if (!found) {
  summary.reason = 'no machine-readable report';
  if (!jsonOnly) {
    console.error('[probe-harness] the probe produced no machine-readable report.');
    console.error('  A probe that cannot report cannot be evidence. Print one JSON summary line, e.g.');
    console.error('  console.log(JSON.stringify({ check: "autopilot", results, fails }));');
  }
  finish(2);
}
if (summary.threw) {
  summary.reason = 'probe threw during execution — the report is not trusted';
  if (!jsonOnly) {
    console.error('[probe-harness] the probe threw during execution; its report is rejected.');
    console.error('  First lines: ' + summary.threw.split('\n').slice(0, 3).join(' | '));
  }
  finish(2);
}
if (malformed.length) {
  summary.reason = `${malformed.length} result entr${malformed.length === 1 ? 'y lacks' : 'ies lack'} a boolean "ok" — the report is malformed`;
  if (!jsonOnly) {
    console.error(`[probe-harness] malformed report: ${summary.reason}.`);
    for (const r of malformed.slice(0, 5)) console.error(`  offending entry: ${JSON.stringify(r)}`);
  }
  finish(2);
}
if (results.length === 0 && aggregateFails === null) {
  summary.reason = 'report contained no decodable checks (no results[] and no aggregate ok/pass/fails)';
  if (!jsonOnly) console.error(`[probe-harness] ${summary.reason}.`);
  finish(2);
}

// Detailed results AND aggregate counters are both authoritative: any failure fails the probe.
const pass = failed.length === 0 && (aggregateFails ?? 0) === 0;
summary.verdict = pass ? 'pass' : 'fail';

if (!jsonOnly) {
  console.log(`\n[probe-harness] ${entry} executed via ${how} — ${results.length} checks, ${failed.length} failed`);
  for (const r of results) console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok ? '' : `  — ${r.detail ?? ''}`}`);
  if (!results.length && aggregateFails !== null) console.log(`  (aggregate) ${aggregateFails ? 'FAIL' : 'PASS'}`);
  if (results.length && (aggregateFails ?? 0) > 0) console.log(`  (aggregate) ${aggregateFails} additional failure(s) reported by the probe`);
}

finish(pass ? 0 : 1);
