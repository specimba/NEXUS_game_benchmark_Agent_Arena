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
 *   node scripts/run-probe.mjs --json                 # machine-readable summary
 *
 * Probe contract (one line of JSON on stdout):
 *   {"check": "<name>", "results": [{"name": "...", "ok": true|false, "detail": "..."}]}
 * Aggregate forms are accepted too: {"ok": true} or {"pass": true} or {"fails": 0}.
 * Human-readable logs are printed as usual; the JSON line decides the exit code.
 *
 * Exit codes: 0 = executed and all checks passed. 1 = a check failed. 2 = the probe could not
 * be bundled / executed / reported (that is information, never a pass).
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
const searchDirs = argv.filter((a) => a.startsWith('--modules=')).map((a) => a.slice('--modules='.length));
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
if (!esbuild) {
  console.error('[probe-harness] esbuild not found — cannot execute the probe.');
  console.error('  Tried: ' + attempts.join(' | '));
  console.error('  Fix: `npm i -D esbuild` (Vite 7 projects already have it; Vite 8 does not), or run inside the project.');
  process.exit(2);
}

if (!existsSync(entry)) {
  console.error(`[probe-harness] probe entry not found: ${entry}`);
  process.exit(2);
}

const outdir = mkdtempSync(join(tmpdir(), 'e2-probe-'));
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
  console.error('[probe-harness] bundling failed — the probe, or something it imports, is not headless.');
  console.error('  Fix: keep the simulation pure (invariants 2 & 3: zero top-level side effects, seeded');
  console.error('  randomness) and keep DOM/canvas/audio behind injected interfaces.');
  console.error(String(err?.message ?? err));
  process.exit(2);
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

const run = spawnSync(process.execPath, [runner], { encoding: 'utf8', cwd: process.cwd() });
const marker = (run.stdout ?? '').split('__PROBE_REPORT__')[1];
let parsed = null;
if (marker) { try { parsed = JSON.parse(marker.trim()); } catch { parsed = null; } }

const verdicts = parsed?.verdicts ?? [];
const results = verdicts.flatMap((v) => (Array.isArray(v.results) ? v.results : []));
const failed = results.filter((r) => r && r.ok === false);
let aggregateFails = null;
for (const v of verdicts) {
  if (typeof v.fails === 'number') aggregateFails = (aggregateFails ?? 0) + v.fails;
  else if (typeof v.ok === 'boolean') aggregateFails = (aggregateFails ?? 0) + (v.ok ? 0 : 1);
  else if (typeof v.pass === 'boolean') aggregateFails = (aggregateFails ?? 0) + (v.pass ? 0 : 1);
}
const found = parsed !== null && verdicts.length > 0;

if (jsonOnly) {
  process.stdout.write(JSON.stringify({
    entry,
    esbuild: how,
    executed: found,
    probes: verdicts.map((v) => v.check ?? '(unnamed)'),
    checks: results.length,
    failed: failed.length,
    aggregate_fails: aggregateFails,
    threw: parsed?.threw ?? null,
    exit: run.status,
  }, null, 2) + '\n');
} else if (!found) {
  console.error('[probe-harness] the probe produced no machine-readable report.');
  console.error('  A probe that cannot report cannot be evidence. Print one JSON summary line, e.g.');
  console.error('  console.log(JSON.stringify({ check: "autopilot", results, fails }));');
  process.exit(2);
} else {
  console.log(`\n[probe-harness] ${entry} executed via ${how} — ${results.length} checks, ${failed.length} failed`);
  for (const r of results) console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok ? '' : `  — ${r.detail ?? ''}`}`);
  if (!results.length && aggregateFails !== null) console.log(`  (aggregate) ${aggregateFails ? 'FAIL' : 'PASS'}`);
}

const ok = found && (results.length ? failed.length === 0 : aggregateFails === 0);
rmSync(outdir, { recursive: true, force: true });
process.exit(ok ? 0 : 1);
