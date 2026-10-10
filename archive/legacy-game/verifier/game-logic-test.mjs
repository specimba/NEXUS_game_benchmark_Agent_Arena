// ============================================================================
//  game-logic-test.mjs — headless verification of the game state machine
//  Drives a real FluidCore + real Game (no DOM). Verifies win/lose transitions,
//  timer, restart, pause, and level-start determinism.
// ============================================================================

import { Game, STATE } from '../src/game/game.js';
import { SIM } from '../src/config.js';
import { calibrateRho0 } from '../src/sim/fluidCore.js';
import { LEVELS, WORLD } from '../src/game/levels.js';

SIM.rho0 = calibrateRho0(0.6);

let failures = 0;
const check = (n, c, d = '') => { console.log(`${c ? 'PASS' : 'FAIL'}  ${n}${d ? '  — ' + d : ''}`); if (!c) failures++; };

const fakeAudio = { click(){}, win(){}, lose(){}, init(){}, resume(){}, setMuted(){} };
function fakeInput() {
  return { pointer: { x: 0, y: 0, active: false, mode: 0 }, tilt: 0, keys: new Set(), update(){}, setWorldSize(){} };
}
function fakeSave() {
  return { version: 1, levels: {}, settings: { muted: false, reducedMotion: false, graphics: 'auto' }, highestUnlocked: 1 };
}

console.log('============ GAME LOGIC VERIFICATION ============');

// --- startLevel sanity -------------------------------------------------------
{
  const g = new Game({ audio: fakeAudio, input: fakeInput(), save: fakeSave() });
  g.startLevel(0);
  check('startLevel -> PLAYING', g.state === STATE.PLAYING);
  check('sim created with sane particle count', g.sim && g.sim.count > 800 && g.sim.count <= LEVELS[0].particles,
        `count=${g.sim.count} (capacity ${LEVELS[0].particles})`);
  check('timer initialized to level time limit', Math.abs(g.timeLeft - LEVELS[0].timeLimit) < 1e-6);
  check('objective target sane (0<t<1)', g.level.target > 0 && g.level.target < 1);
}

// --- pause toggles -----------------------------------------------------------
{
  const g = new Game({ audio: fakeAudio, input: fakeInput(), save: fakeSave() });
  g.startLevel(1);
  g.togglePause();
  check('togglePause -> PAUSED', g.state === STATE.PAUSED);
  g.togglePause();
  check('togglePause -> PLAYING', g.state === STATE.PLAYING);
}

// --- lose on timeout ---------------------------------------------------------
{
  const g = new Game({ audio: fakeAudio, input: fakeInput(), save: fakeSave() });
  g.startLevel(2);
  g.timeLeft = 0.05;
  g.update(0.1); // dt exceeds remaining time
  check('timeout -> LOSE', g.state === STATE.LOSE, `state=${g.state}`);
  check('lose result has cleared=false', g.result && g.result.cleared === false);
}

// --- win when fluid is in the goal zone --------------------------------------
{
  const g = new Game({ audio: fakeAudio, input: fakeInput(), save: fakeSave() });
  g.startLevel(0);
  // make the whole world the goal so all fluid counts as delivered
  g.level.goal = { x: 0, y: 0, w: WORLD.w, h: WORLD.h };
  g.level.hold = 0.2;
  let won = false;
  for (let i = 0; i < 60; i++) { g.update(1 / 60); if (g.state === STATE.WIN) { won = true; break; } }
  check('sustained delivery -> WIN', won, `state=${g.state}`);
  check('win result cleared + stars>=1', g.result && g.result.cleared && g.result.stars >= 1, `stars=${g.result?.stars}`);
  check('win persisted to save (level 1 cleared)', g.save.levels[1] && g.save.levels[1].cleared === true);
  check('next level unlocked', g.save.highestUnlocked >= 2, `unlocked=${g.save.highestUnlocked}`);
}

// --- restart resets timer/state ----------------------------------------------
{
  const g = new Game({ audio: fakeAudio, input: fakeInput(), save: fakeSave() });
  g.startLevel(3);
  for (let i = 0; i < 30; i++) g.update(1 / 60);
  const t1 = g.timeLeft;
  g.restart();
  check('restart -> PLAYING', g.state === STATE.PLAYING);
  check('restart resets timer', Math.abs(g.timeLeft - LEVELS[3].timeLimit) < 1e-6, `t=${g.timeLeft.toFixed(1)} (was ${t1.toFixed(1)})`);
  check('restart resets hold timer', g.holdTimer === 0);
}

// --- level-start determinism (same seed -> identical start) ------------------
{
  const g1 = new Game({ audio: fakeAudio, input: fakeInput(), save: fakeSave() });
  const g2 = new Game({ audio: fakeAudio, input: fakeInput(), save: fakeSave() });
  g1.startLevel(4); g2.startLevel(4);
  let diff = 0;
  for (let i = 0; i < g1.sim.count; i++) diff += Math.abs(g1.sim.px[i] - g2.sim.px[i]) + Math.abs(g1.sim.py[i] - g2.sim.py[i]);
  check('identical level start (deterministic)', diff < 1e-6, `Σdiff=${diff.toExponential(2)}`);
}

// --- update advances physics without throwing --------------------------------
{
  const g = new Game({ audio: fakeAudio, input: fakeInput(), save: fakeSave() });
  g.startLevel(0);
  const before = g.sim.px[0];
  for (let i = 0; i < 120; i++) g.update(1 / 60);
  const moved = Math.abs(g.sim.px[0] - before) + Math.abs(g.sim.py[0] - before);
  check('update() advances simulation', moved > 0.5, `displacement=${moved.toFixed(2)}`);
  check('no NaN after 120 frames', Number.isFinite(g.sim.px[0]) && Number.isFinite(g.sim.py[0]));
}

console.log('======================================================');
console.log(failures === 0 ? 'ALL GAME-LOGIC CHECKS PASSED' : `${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
