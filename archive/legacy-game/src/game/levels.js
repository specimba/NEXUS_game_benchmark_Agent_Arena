// ============================================================================
//  levels.js — forge-chamber definitions (data only)
//  World space is 1280 x 720. The simulation box is the full world; obstacles
//  are circles / axis-aligned boxes. Each level: fluid spawn, static geometry,
//  a goal zone, a time limit, a target mass fraction to hold, and a tutorial
//  hint. Difficulty rises via geometry, not via unfair instant-fails.
// ============================================================================

export const WORLD = { w: 1280, h: 720 };

export const LEVELS = [
  {
    id: 1,
    name: 'First Pour',
    subtitle: 'Learn the focus',
    hint: 'Left-drag to PUSH fluid · Right-drag (or Shift) to PULL · Tilt with ← →',
    timeLimit: 80,
    target: 0.50,
    hold: 1.4,
    particles: 3400,
    spawn: [{ x0: 120, y0: 120, x1: 360, y1: 620, kind: 0 }],
    obstacles: [],
    goal: { x: 880, y: 470, w: 320, h: 230 },
    starTimes: [38, 22, 8], // remaining-time → 3 / 2 / 1 stars
    palette: 'molten',
  },
  {
    id: 2,
    name: 'The Sluice',
    subtitle: 'Lift it over the wall',
    hint: 'Tilt the world with ← → to slosh fluid across the central divide.',
    timeLimit: 95,
    target: 0.48,
    hold: 1.6,
    particles: 3600,
    spawn: [{ x0: 120, y0: 120, x1: 560, y1: 620, kind: 0 }],
    obstacles: [
      { type: 'box', x: 640, y: 360, hw: 26, hh: 230 }, // central divider with gap top/bottom
    ],
    goal: { x: 900, y: 470, w: 300, h: 230 },
    starTimes: [44, 26, 10],
    palette: 'molten',
  },
  {
    id: 3,
    name: 'Quench',
    subtitle: 'Fill the crucible without spilling',
    hint: 'The crucible is a basin — coax the fluid down into it and HOLD.',
    timeLimit: 100,
    target: 0.60,
    hold: 1.8,
    particles: 3800,
    spawn: [{ x0: 120, y0: 110, x1: 1160, y1: 250, kind: 0 }],
    obstacles: [
      { type: 'box', x: 470, y: 470, hw: 200, hh: 26 }, // basin left wall top
      { type: 'box', x: 810, y: 470, hw: 200, hh: 26 }, // basin right wall top
      { type: 'box', x: 640, y: 600, hw: 360, hh: 26 }, // basin floor
    ],
    goal: { x: 500, y: 500, w: 280, h: 180 },
    starTimes: [50, 30, 12],
    palette: 'coolant',
  },
  {
    id: 4,
    name: 'The Cistern',
    subtitle: 'Thread the channels',
    hint: 'Narrow gates need patience — push gently, then let gravity do the rest.',
    timeLimit: 115,
    target: 0.46,
    hold: 1.8,
    particles: 4000,
    spawn: [{ x0: 120, y0: 120, x1: 380, y1: 360, kind: 0 }],
    obstacles: [
      { type: 'box', x: 470, y: 250, hw: 24, hh: 250 },
      { type: 'box', x: 780, y: 470, hw: 24, hh: 250 },
      { type: 'circle', x: 625, y: 360, r: 70 },
    ],
    goal: { x: 980, y: 500, w: 260, h: 200 },
    starTimes: [55, 32, 14],
    palette: 'molten',
  },
  {
    id: 5,
    name: 'High Tide',
    subtitle: 'Master of the forge',
    hint: 'Everything you have learned. Route, tilt, and hold against the clock.',
    timeLimit: 130,
    target: 0.52,
    hold: 2.0,
    particles: 4400,
    spawn: [{ x0: 110, y0: 110, x1: 430, y1: 540, kind: 0 }],
    obstacles: [
      { type: 'box', x: 560, y: 200, hw: 22, hh: 200 },
      { type: 'box', x: 560, y: 560, hw: 22, hh: 160 },
      { type: 'circle', x: 820, y: 360, r: 64 },
      { type: 'box', x: 940, y: 430, hw: 150, hh: 22 },
    ],
    goal: { x: 1000, y: 520, w: 240, h: 180 },
    starTimes: [62, 36, 16],
    palette: 'coolant',
  },
];
