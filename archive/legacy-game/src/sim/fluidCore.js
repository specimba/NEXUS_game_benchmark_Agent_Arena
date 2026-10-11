// ============================================================================
//  fluidCore.js — framework-agnostic 2D fluid solver
//  Method: Clavet, Beaudoin & Poulin (2005), "Particle-based Viscoelastic
//  Fluid Simulation" — double-density relaxation. This position-based scheme is
//  the workhorse behind most real-time 2D *fluid games*: it is stable at large
//  timesteps, needs no fragile pressure solve / Jacobian, and reads naturally
//  on the GPU (relaxation = a Jacobi accumulation pass). Per substep:
//     1. apply external accel. (gravity, pointer) -> v
//     2. viscosity impulses (pairwise, optional)
//     3. save x_prev; advect x += v*dt
//     4. (re)build uniform-grid neighbour list
//     5. double-density relaxation: for each i compute density rho, rho_near;
//        pressure P = k(rho-rho0), P_near = kNear*rho_near;
//        push neighbours apart by D = dt^2 (P(1-q)+Pnear(1-q)^2) * dir
//     6. resolve boundaries / obstacles on x
//     7. v = (x - x_prev)/dt ; clamp
//
//  Rest density rho0 is calibrated from the rest packing so the fluid neither
//  explodes nor collapses at t=0. CPU and GPU paths share these constants.
// ============================================================================

import { SIM } from '../config.js';

// Spawn/fill spacing as a fraction of the smoothing radius. Smaller = denser
// particle packing = more particles for the same region. Must stay consistent
// between fillRect() and calibrateRho0() so the rest density matches.
const FILL_FACTOR = 0.5;

// --- seeded PRNG (mulberry32) for reproducible procedural fills --------------
export function makeRNG(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class FluidCore {
  constructor(count, world, opts = {}) {
    this.count = count;
    this.w = world.w;
    this.h = world.h;
    this.H = SIM.smoothingRadius;

    this.px = new Float32Array(count);
    this.py = new Float32Array(count);
    this.vx = new Float32Array(count);
    this.vy = new Float32Array(count);
    this.ox = new Float32Array(count); // previous positions
    this.oy = new Float32Array(count);
    this.dx = new Float32Array(count); // relaxation displacement accumulator
    this.dy = new Float32Array(count);
    this.rho = new Float32Array(count);
    this.rhoNear = new Float32Array(count);
    this.press = new Float32Array(count);
    this.kind = new Uint8Array(count);

    // tunables (instance-level; GPU mirrors these)
    this.k = opts.k ?? SIM.k;
    this.kNear = opts.kNear ?? SIM.kNear;
    this.rho0 = opts.rho0 ?? SIM.rho0;
    this.sigma = opts.sigma ?? SIM.sigma;     // linear viscosity
    this.beta = opts.beta ?? SIM.beta;        // quadratic viscosity
    this.maxSpeed = SIM.maxSpeed;

    // uniform grid
    this.cellSize = this.H;
    this.gridW = Math.max(1, Math.ceil(this.w / this.cellSize));
    this.gridH = Math.max(1, Math.ceil(this.h / this.cellSize));
    this.cellCount = this.gridW * this.gridH;
    this.head = new Int32Array(this.cellCount).fill(-1);
    this.next = new Int32Array(count).fill(-1);

    this.gravityX = 0;
    this.gravityY = SIM.gravityMag;
    this.tilt = 0;

    this.obstacles = opts.obstacles ? opts.obstacles.slice() : [];
    this.pointer = { active: false, x: 0, y: 0, mode: 0, radius: SIM.pointerRadius, strength: SIM.pointerStrength };
    this.burstTimer = 0;
    this.rng = makeRNG(opts.seed ?? 0x9e3779b9);
  }

  cellIndex(x, y) {
    let cx = (x / this.cellSize) | 0, cy = (y / this.cellSize) | 0;
    if (cx < 0) cx = 0; else if (cx >= this.gridW) cx = this.gridW - 1;
    if (cy < 0) cy = 0; else if (cy >= this.gridH) cy = this.gridH - 1;
    return cy * this.gridW + cx;
  }
  clearGrid() { this.head.fill(-1); }
  buildGrid() {
    this.clearGrid();
    const { px, py, next, head, count } = this;
    for (let i = 0; i < count; i++) {
      const c = this.cellIndex(px[i], py[i]);
      next[i] = head[c]; head[c] = i;
    }
  }
  forEachNeighbour(i, cb) {
    const { px, py, head, next, gridW, gridH, cellSize } = this;
    const cx = Math.min(gridW - 1, Math.max(0, (px[i] / cellSize) | 0));
    const cy = Math.min(gridH - 1, Math.max(0, (py[i] / cellSize) | 0));
    for (let oy = -1; oy <= 1; oy++) {
      const ny = cy + oy; if (ny < 0 || ny >= gridH) continue;
      for (let ox = -1; ox <= 1; ox++) {
        const nx = cx + ox; if (nx < 0 || nx >= gridW) continue;
        let j = head[ny * gridW + nx];
        while (j !== -1) { cb(j); j = next[j]; }
      }
    }
  }

  // ---- main step -----------------------------------------------------------
  step(dt) {
    this.applyExternal(dt);
    this.viscosity(dt);
    // advect
    const { px, py, vx, vy, ox, oy, count } = this;
    for (let i = 0; i < count; i++) {
      ox[i] = px[i]; oy[i] = py[i];
      px[i] += vx[i] * dt;
      py[i] += vy[i] * dt;
    }
    this.buildGrid();
    this.relax(dt);
    this.resolveBoundaries();
    // recompute velocity
    const invDt = 1 / dt, maxV = this.maxSpeed, maxV2 = maxV * maxV;
    for (let i = 0; i < count; i++) {
      let nvx = (px[i] - ox[i]) * invDt;
      let nvy = (py[i] - oy[i]) * invDt;
      const sp2 = nvx * nvx + nvy * nvy;
      if (sp2 > maxV2) { const s = maxV / Math.sqrt(sp2); nvx *= s; nvy *= s; }
      vx[i] = nvx; vy[i] = nvy;
    }
  }

  applyExternal(dt) {
    const { px, py, vx, vy, count } = this;
    const gx = this.gravityX, gy = this.gravityY;
    const p = this.pointer, pr2 = p.radius * p.radius;
    for (let i = 0; i < count; i++) {
      let fx = gx, fy = gy;
      if (p.active) {
        const dx = px[i] - p.x, dy = py[i] - p.y, d2 = dx * dx + dy * dy;
        if (d2 < pr2) {
          const d = Math.sqrt(d2) + 1e-4, fall = 1 - d / p.radius;
          const sign = p.mode === 1 ? -1 : 1;
          const f = sign * p.strength * fall;
          fx += (dx / d) * f; fy += (dy / d) * f;
        }
      }
      vx[i] += fx * dt; vy[i] += fy * dt;
    }
  }

  viscosity(dt) {
    if (this.sigma <= 0 && this.beta <= 0) return;
    const { px, py, vx, vy, count } = this;
    const h = this.H, s = this.sigma, b = this.beta;
    for (let i = 0; i < count; i++) {
      const xi = px[i], yi = py[i];
      this.forEachNeighbour(i, (j) => {
        if (j <= i) return; // each pair once
        const dx = px[j] - xi, dy = py[j] - yi;
        const r2 = dx * dx + dy * dy;
        if (r2 >= h * h || r2 < 1e-12) return;
        const r = Math.sqrt(r2);
        const q = r / h;
        const nx = dx / r, ny = dy / r;
        const u = (vx[i] - vx[j]) * nx + (vy[i] - vy[j]) * ny; // inward radial vel
        if (u <= 0) return;
        const imp = dt * (1 - q) * (s * u + b * u * u);
        const ix = imp * nx, iy = imp * ny;
        vx[i] -= ix * 0.5; vy[i] -= iy * 0.5;
        vx[j] += ix * 0.5; vy[j] += iy * 0.5;
      });
    }
  }

  relax(dt) {
    const { px, py, dx, dy, rho, rhoNear, press, count } = this;
    const h = this.H, k = this.k, kNear = this.kNear, rho0 = this.rho0;
    const dt2 = dt * dt;
    dx.fill(0); dy.fill(0);
    for (let i = 0; i < count; i++) {
      const xi = px[i], yi = py[i];
      let density = 0, densityNear = 0;
      // first pass: densities
      this.forEachNeighbour(i, (j) => {
        if (j === i) return;
        const dxj = px[j] - xi, dyj = py[j] - yi;
        const r2 = dxj * dxj + dyj * dyj;
        if (r2 >= h * h) return;
        const r = Math.sqrt(r2);
        const q = 1 - r / h;
        density += q * q;
        densityNear += q * q * q;
      });
      rho[i] = density; rhoNear[i] = densityNear;
      const P = k * (density - rho0);
      const Pnear = kNear * densityNear;
      press[i] = P;
      let dxi = 0, dyi = 0;
      // second pass: apply displacements
      this.forEachNeighbour(i, (j) => {
        if (j === i) return;
        const dxj = px[j] - xi, dyj = py[j] - yi;
        const r2 = dxj * dxj + dyj * dyj;
        if (r2 >= h * h || r2 < 1e-12) return;
        const r = Math.sqrt(r2);
        const q = 1 - r / h;
        const mag = dt2 * (P * q + Pnear * q * q);
        const nx = dxj / r, ny = dyj / r;
        // push neighbour away from i by mag/2, i moves by -mag/2
        const Dx = nx * mag * 0.5, Dy = ny * mag * 0.5;
        dx[j] += Dx; dy[j] += Dy;
        dxi -= Dx; dyi -= Dy;
      });
      dx[i] += dxi; dy[i] += dyi;
    }
    // apply accumulated displacements
    for (let i = 0; i < count; i++) { px[i] += dx[i]; py[i] += dy[i]; }
  }

  resolveBoundaries() {
    const { px, py, vx, vy, count } = this;
    const eps = SIM.boundaryEpsilon, damp = SIM.boundaryDamping;
    const w = this.w, h = this.h;
    for (let i = 0; i < count; i++) {
      if (px[i] < eps) { px[i] = eps; }
      else if (px[i] > w - eps) { px[i] = w - eps; }
      if (py[i] < eps) { py[i] = eps; }
      else if (py[i] > h - eps) { py[i] = h - eps; }
    }
    this.resolveObstacles();
  }

  resolveObstacles() {
    const obs = this.obstacles;
    if (!obs.length) return;
    const eps = SIM.boundaryEpsilon;
    const { px, py, count } = this;
    for (let i = 0; i < count; i++) {
      let x = px[i], y = py[i];
      for (let o = 0; o < obs.length; o++) {
        const ob = obs[o];
        if (ob.type === 'circle') {
          const dx = x - ob.x, dy = y - ob.y, d2 = dx * dx + dy * dy, rr = ob.r + eps;
          if (d2 < rr * rr) { const d = Math.sqrt(d2) + 1e-9, nx = dx / d, ny = dy / d; x = ob.x + nx * rr; }
        } else {
          const minx = ob.x - ob.hw, maxx = ob.x + ob.hw, miny = ob.y - ob.hh, maxy = ob.y + ob.hh;
          if (x > minx && x < maxx && y > miny && y < maxy) {
            const dl = x - minx, dr = maxx - x, dtp = y - miny, db = maxy - y;
            const m = Math.min(dl, dr, dtp, db);
            if (m === dl) x = minx - eps; else if (m === dr) x = maxx + eps;
            else if (m === dtp) y = miny - eps; else y = maxy + eps;
          }
        }
      }
      px[i] = x; py[i] = y;
    }
  }

  updateTilt(targetTilt, dt) {
    const maxStep = SIM.tiltSpeed * dt;
    let diff = targetTilt - this.tilt;
    if (diff > maxStep) diff = maxStep; else if (diff < -maxStep) diff = -maxStep;
    this.tilt += diff;
    this.gravityX = Math.sin(this.tilt) * SIM.gravityMag;
    this.gravityY = Math.cos(this.tilt) * SIM.gravityMag;
  }

  kineticEnergy() {
    let e = 0;
    for (let i = 0; i < this.count; i++) e += this.vx[i] * this.vx[i] + this.vy[i] * this.vy[i];
    return 0.5 * e;
  }

  // fraction of mass in an axis-aligned zone
  massInZone(zone) {
    let n = 0;
    for (let i = 0; i < this.count; i++) {
      if (this.px[i] >= zone.x && this.px[i] <= zone.x + zone.w &&
          this.py[i] >= zone.y && this.py[i] <= zone.y + zone.h) n++;
    }
    return n / this.count;
  }

  fillRect(x0, y0, x1, y1, kind = 0, jitter = 0.2, seed) {
    const spacing = this.H * FILL_FACTOR;
    const rng = seed !== undefined ? makeRNG(seed) : this.rng;
    let placed = 0;
    for (let y = y0; y < y1 && placed < this.count; y += spacing) {
      for (let x = x0; x < x1 && placed < this.count; x += spacing) {
        const i = placed++;
        this.px[i] = x + (rng() - 0.5) * spacing * jitter;
        this.py[i] = y + (rng() - 0.5) * spacing * jitter;
        this.vx[i] = 0; this.vy[i] = 0;
        this.kind[i] = kind;
      }
    }
    this.count = placed;
    return placed;
  }
}

// Calibrate rest density rho0 from the regular rest packing: rho0 = sum (1-q)^2
// over neighbours at the initial spacing (so the fluid starts at equilibrium).
export function calibrateRho0(spacingFactor = 0.6, samples = 600) {
  const sim = new FluidCore(samples, { w: 3000, h: 3000 });
  sim.fillRect(200, 200, 200 + 260, 200 + 260, 0, 0, 12345);
  sim.buildGrid();
  const h = sim.H;
  const q2 = (xi, yi, xj, yj) => {
    const r = Math.hypot(xj - xi, yj - yi);
    return r < h ? (1 - r / h) * (1 - r / h) : 0;
  };
  let total = 0;
  for (let i = 0; i < sim.count; i++) {
    let d = 0;
    const xi = sim.px[i], yi = sim.py[i];
    sim.forEachNeighbour(i, (j) => { if (j !== i) d += q2(xi, yi, sim.px[j], sim.py[j]); });
    total += d;
  }
  return total / sim.count;
}

export const H = SIM.smoothingRadius;
