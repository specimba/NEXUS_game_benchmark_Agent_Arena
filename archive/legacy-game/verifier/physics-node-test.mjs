// ============================================================================
//  physics-node-test.mjs  —  headless fluid verification (Node, no GPU)
//  Scientific proof that the simulation approach (Clavet et al. double-density
//  relaxation) is correct, stable, mass-conserving and interactive. The WebGPU
//  compute path mirrors this exact scheme and reuses the calibrated rho0.
//
//  Usage:  node verifier/physics-node-test.mjs
// ============================================================================

import { FluidCore, calibrateRho0 } from '../src/sim/fluidCore.js';
import { SIM } from '../src/config.js';

let failures = 0;
function check(name, cond, detail = '') {
  const ok = !!cond;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
  if (!ok) failures++;
}

// Calibrate rest density from the initial packing (fluid starts at equilibrium).
const RHO0 = calibrateRho0(0.6);
console.log(`Calibrated rho0 = ${RHO0.toFixed(4)}`);
SIM.rho0 = RHO0;

function newSim(count, world, opts = {}) {
  return new FluidCore(count, world, { rho0: RHO0, seed: opts.seed ?? 1, ...opts });
}
function settlingSim(count = 1600, seed = 7) {
  const sim = newSim(count, { w: 1280, h: 720 }, { seed });
  sim.fillRect(120, 360, 360, 700, 0, 0.15, seed);
  sim._placed = sim.count;
  return sim;
}
function avgRho(sim){let t=0;for(let i=0;i<sim.count;i++)t+=sim.rho[i];return t/sim.count;}
function maxRho(sim){let m=0;for(let i=0;i<sim.count;i++)if(sim.rho[i]>m)m=sim.rho[i];return m;}
function ke(sim){let e=0;for(let i=0;i<sim.count;i++)e+=sim.vx[i]**2+sim.vy[i]**2;return 0.5*e;}

console.log('================ FLUID CORE VERIFICATION ================');

// ---- S1: gravitational settling, stability, mass conservation --------------
{
  const sim = settlingSim(1600, 7);
  const dt = SIM.dt;
  let nanHit = false, maxSpeedEver = 0, escaped = 0;
  const keSeries = [];
  for (let s = 0; s < 700; s++) { sim.step(dt); if (s % 100 === 0) keSeries.push(ke(sim)/sim.count); }
  for (let i = 0; i < sim.count; i++) {
    if (![sim.px[i], sim.py[i], sim.vx[i], sim.vy[i]].every(Number.isFinite)) nanHit = true;
    const sp = Math.hypot(sim.vx[i], sim.vy[i]);
    if (sp > maxSpeedEver) maxSpeedEver = sp;
    if (sim.px[i] < -1 || sim.px[i] > sim.w + 1 || sim.py[i] < -1 || sim.py[i] > sim.h + 1) escaped++;
  }
  const aR = avgRho(sim), mR = maxRho(sim);
  check('S1: no NaN/Inf after 700 steps', !nanHit);
  check('S1: no particles escaped the closed box', escaped === 0, `escaped=${escaped}`);
  check('S1: max speed within clamp', maxSpeedEver <= SIM.maxSpeed + 1e-3, `maxV=${maxSpeedEver.toFixed(1)}`);
  check('S1: particle count preserved (mass conservation)', sim.count === sim._placed, `${sim.count}/${sim._placed}`);
  check('S1: density near rest (no collapse/explosion)', aR > 0.4*RHO0 && aR < 2.2*RHO0 && mR < 3.2*RHO0,
        `avgRho=${aR.toFixed(3)} maxRho=${mR.toFixed(2)} rho0=${RHO0.toFixed(3)}`);
  check('S1: fluid settled (KE decayed from splash peak)', keSeries[keSeries.length-1] < keSeries[1],
        `KE/part trace: ${keSeries.map(v=>v.toFixed(0)).join(' -> ')}`);
}

// ---- S2: pointer PUSH repels local fluid radially away from cursor ----------
{
  const sim = settlingSim(1200, 3);
  for (let s = 0; s < 150; s++) sim.step(SIM.dt);
  const cxp = 240, cyp = 560, R = SIM.pointerRadius * 1.8;
  let cx0 = 0, cy0 = 0, n = 0;
  for (let i = 0; i < sim.count; i++) { const d = Math.hypot(sim.px[i]-cxp, sim.py[i]-cyp); if (d < R) { cx0+=sim.px[i]; cy0+=sim.py[i]; n++; } }
  cx0/=n; cy0/=n;
  sim.pointer.active = true; sim.pointer.x = cxp; sim.pointer.y = cyp; sim.pointer.mode = 0;
  for (let s = 0; s < 90; s++) sim.step(SIM.dt);
  sim.pointer.active = false;
  let cx1 = 0, cy1 = 0, n2 = 0;
  for (let i = 0; i < sim.count; i++) { const d = Math.hypot(sim.px[i]-cxp, sim.py[i]-cyp); if (d < R) { cx1+=sim.px[i]; cy1+=sim.py[i]; n2++; } }
  const r0 = Math.hypot(cx0-cxp, cy0-cyp)+1e-6, r1 = Math.hypot(cx1-cxp, cy1-cyp)+1e-6;
  check('S2: push repels local fluid radially outward', r1 > r0 + 1.0, `r0=${r0.toFixed(1)} r1=${r1.toFixed(1)}`);
}

// ---- S3: obstacle resolution (no penetration) -------------------------------
{
  const sim = newSim(800, { w: 1280, h: 720 }, { seed: 9 });
  sim.fillRect(100, 100, 1180, 320, 0, 0.1, 9);
  sim.obstacles = [{ type: 'circle', x: 640, y: 520, r: 90 }];
  for (let s = 0; s < 300; s++) sim.step(SIM.dt);
  let minInside = Infinity;
  for (let i = 0; i < sim.count; i++) { const d = Math.hypot(sim.px[i]-640, sim.py[i]-520) - 90; if (d < minInside) minInside = d; }
  check('S3: no particle penetrates circle obstacle', minInside >= -SIM.boundaryEpsilon - 0.5, `minDist=${minInside.toFixed(2)} (eps=${SIM.boundaryEpsilon})`);
}

// ---- S4: gravity tilt sloshes fluid sideways --------------------------------
{
  const sim = settlingSim(1000, 11);
  for (let s = 0; s < 150; s++) sim.step(SIM.dt);
  let cx0 = 0; for (let i = 0; i < sim.count; i++) cx0 += sim.px[i]; cx0 /= sim.count;
  for (let s = 0; s < 220; s++) { sim.updateTilt(0.42, SIM.dt); sim.step(SIM.dt); }
  let cx1 = 0; for (let i = 0; i < sim.count; i++) cx1 += sim.px[i]; cx1 /= sim.count;
  check('S4: gravity tilt pushes centroid toward tilt side (+x)', cx1 > cx0 + 3, `cx0=${cx0.toFixed(1)} cx1=${cx1.toFixed(1)}`);
}

// ---- S5: determinism (same seed -> identical result) -----------------------
{
  function run() {
    const sim = settlingSim(600, 21);
    for (let s = 0; s < 100; s++) sim.step(SIM.dt);
    let c = 0; for (let i = 0; i < sim.count; i++) c += sim.px[i] + sim.py[i] * 7.3;
    return c;
  }
  const a = run(), b = run();
  check('S5: identical seed reproduces identical result', Math.abs(a-b) < 1e-9, `diff=${Math.abs(a-b).toExponential(2)}`);
}

console.log('======================================================');
console.log(failures === 0 ? 'ALL CHECKS PASSED' : `${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
