// ============================================================================
//  TIDEWRIGHT — central tunables
//  Every magic number the simulation, rendering, and game balance depend on
//  lives here. No scattered constants elsewhere.
// ============================================================================

export const SIM = {
  // --- SPH (Weakly-Compressible, Müller 2003) — 2D kernel constants ----------
  smoothingRadius: 18,      // h: interaction radius in world units (px)
  restDensity: 4.0,         // rho0
  stiffness: 220.0,         // k (gas constant). WCSPH stiffness; kept moderate for stability
  viscosity: 6.5,           // mu
  particleMass: 2.6,        // m
  boundaryDamping: 0.35,    // velocity retained along wall normal after bounce
  boundaryEpsilon: 1.2,     // push particles this far inside walls
  maxSpeed: 260,            // velocity clamp (world units / s) for stability
  // --- integration -----------------------------------------------------------
  dt: 1 / 60,               // fixed substep (s) — PBF is stable at frame rate
  maxSubstepsPerFrame: 3,   // cap substeps so a slow frame can't explode the sim
  // --- interaction -----------------------------------------------------------
  pointerRadius: 90,        // world-unit radius of the force tool
  pointerStrength: 5200,    // force magnitude
  gravityMag: 900,          // world units / s^2 (downward by default)
  tiltMax: 0.5,             // max gravity tilt from vertical (radians)
  tiltSpeed: 1.6,           // how fast tilt moves (rad/s)
  burstImpulse: 1400,       // radial impulse for the "burst" ability
  burstCooldown: 2.4,       // seconds
  burstRadius: 140,
  // --- Clavet et al. double-density relaxation -------------------------------
  k: 5000,                 // far pressure stiffness (incompressibility)
  kNear: 6000,             // near pressure stiffness (anti-clustering / surface)
  rho0: 0.70,              // rest density (calibrated at runtime to rest packing)
  sigma: 0.06,             // linear viscosity
  beta: 0.12,              // quadratic viscosity
};

// 2D normalization constants for the SPH kernels (Müller et al. 2003).
export const KERNEL = {
  poly6: 4.0 / Math.PI,        // density kernel scalar (divided by h^8 later)
  spikyGrad: -30.0 / Math.PI,  // pressure gradient scalar (divided by h^5 later)
  viscLap: 40.0 / Math.PI,     // viscosity laplacian scalar (divided by h^5 later)
};

export const RENDER = {
  // logical render resolution scale (relative to CSS pixels * DPR)
  resolutionScale: 1.0,
  // metaball surface threshold on accumulated thickness
  surfaceThreshold: 0.55,
  // fluid colors (forge palette): ember-orange "molten" vs teal "coolant"
  colorMolten: [1.0, 0.46, 0.12],
  colorCoolant: [0.20, 0.78, 0.95],
  // background gradient (deep slate / forge dark)
  bgTop: [0.035, 0.045, 0.07],
  bgBottom: [0.015, 0.02, 0.035],
  foamColor: [0.92, 0.96, 1.0],
  // light direction (view space-ish)
  lightDir: [0.45, 0.8, 0.55],
};

export const GAME = {
  worldWidth: 1280,
  worldHeight: 720,
  // stars thresholds: fraction of fluid mass in goal zone required to win
  goalHoldSeconds: 1.4,       // must hold the goal for this long to win
  defaultTimeLimit: 90,       // seconds; running out = fail
  maxObstacles: 48,           // hard cap shared by WGSL uniform + CPU sim
  maxLevels: 12,
  storageKey: 'tidewright.save.v1',
};

// Difficulty curve per level is defined in src/game/levels.js
