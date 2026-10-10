// ============================================================================
//  main.js — bootstrap & main loop
//  Wires simulation (verified CPU solver) + WebGPU/Canvas2D renderer + input +
//  audio + game state machine. Shows a living fluid demo behind the title.
// ============================================================================

import { SIM } from './config.js';
import { calibrateRho0, FluidCore } from './sim/fluidCore.js';
import { createRenderer } from './render/index.js';
import { Canvas2DRenderer } from './render/canvas2d.js';
import { Input } from './core/input.js';
import { Audio } from './audio/audio.js';
import { Game, STATE } from './game/game.js';
import { loadSave, writeSave } from './storage.js';
import { LEVELS, WORLD } from './game/levels.js';
import { UI } from './ui/ui.js';

// 1) calibrate rest density once (shared by CPU sim + GPU mirror)
SIM.rho0 = calibrateRho0(0.6);

const canvas = document.getElementById('game');
const ui = new UI();

let save = loadSave();
const audio = new Audio();
audio.setMuted(save.settings.muted);

const input = new Input(canvas, {
  onPause: () => { if (game.state === STATE.PLAYING || game.state === STATE.PAUSED) game.togglePause(); },
  onRestart: () => { if (game.state === STATE.PLAYING || game.state === STATE.PAUSED) game.restart(); },
  onMute: () => toggleMute(),
  onToggleGraphics: () => cycleGraphics(),
  onAnyKey: () => { audio.init(); audio.resume(); },
});

let renderer = null;
let rendererKind = 'canvas2d';

const game = new Game({
  audio, input, save,
  onState: (g) => ui.onState(g),
});

ui.bind(game, { audio, toggleMute, toggleReduce, cycleGraphics });

// ---- demo fluid behind the title -------------------------------------------
let demoSim = null;
function ensureDemo() {
  if (demoSim) return;
  demoSim = new FluidCore(2200, WORLD, { rho0: SIM.rho0, seed: 4242 });
  demoSim.obstacles = [
    { type: 'circle', x: 430, y: 470, r: 70 },
    { type: 'circle', x: 860, y: 540, r: 90 },
  ];
  demoSim.fillRect(120, 540, 1160, 700, 0, 0.15, 4242);
}
let demoT = 0;

async function boot() {
  const pref = save.settings.graphics === 'canvas2d' ? 'canvas2d' : (save.settings.graphics === 'webgpu' ? 'webgpu' : 'auto');
  const { renderer: r, kind } = await createRenderer(canvas, pref);
  renderer = r; rendererKind = kind;
  renderer.resize(WORLD.w, WORLD.h);
  input.setWorldSize(WORLD.w, WORLD.h);
  if (kind === 'canvas2d' && pref === 'auto') ui.toast('WebGPU unavailable — using Canvas2D fallback');
  else if (kind === 'webgpu') ui.toast('WebGPU renderer active');
  game.setState(STATE.TITLE);
  requestAnimationFrame(loop);
}

async function switchRenderer(pref) {
  try { renderer?.dispose?.(); } catch {}
  const { renderer: r, kind } = await createRenderer(canvas, pref);
  renderer = r; rendererKind = kind;
  renderer.resize(WORLD.w, WORLD.h);
  ui.toast(`Graphics: ${kind === 'webgpu' ? 'WebGPU' : 'Canvas2D'}`);
}

function cycleGraphics() {
  const order = ['auto', 'webgpu', 'canvas2d'];
  const cur = save.settings.graphics === 'auto' ? 'auto' : (rendererKind === 'webgpu' ? 'webgpu' : 'canvas2d');
  const next = order[(order.indexOf(cur) + 1) % order.length];
  save.settings.graphics = next; writeSave(save);
  switchRenderer(next === 'auto' ? 'auto' : next);
}

function toggleMute() {
  audio.init(); audio.resume();
  save.settings.muted = !save.settings.muted;
  audio.setMuted(save.settings.muted);
  writeSave(save);
  ui.setMuted(save.settings.muted);
  audio.click();
}
function toggleReduce() {
  save.settings.reducedMotion = !save.settings.reducedMotion;
  writeSave(save);
  ui.setReduced(save.settings.reducedMotion);
}

// ---- main loop --------------------------------------------------------------
let last = performance.now();
let elapsed = 0;
let hidden = false;
document.addEventListener('visibilitychange', () => {
  hidden = document.hidden;
  if (hidden && game.state === STATE.PLAYING) game.togglePause();
});

function loop(now) {
  let dt = (now - last) / 1000;
  last = now;
  if (!Number.isFinite(dt) || dt < 0) dt = 0;
  if (dt > 0.05) dt = 0.05; // clamp after stalls
  elapsed += dt;

  if (game.state === STATE.PLAYING) {
    game.update(dt);
  } else if (game.state === STATE.TITLE) {
    ensureDemo();
    demoT += dt;
    demoSim.updateTilt(Math.sin(demoT * 0.5) * 0.35, dt);
    // gentle push from a wandering focus for life
    demoSim.pointer.active = true;
    demoSim.pointer.x = WORLD.w * (0.5 + 0.4 * Math.sin(demoT * 0.7));
    demoSim.pointer.y = WORLD.h * (0.7 + 0.15 * Math.cos(demoT * 0.9));
    demoSim.pointer.mode = 0;
    const fixed = SIM.dt; let acc = dt; let s = 0;
    while (acc >= fixed && s < SIM.maxSubstepsPerFrame) { demoSim.step(fixed); acc -= fixed; s++; }
  }

  // render
  const st = (game.state === STATE.TITLE)
    ? { sim: demoSim, level: null, palette: 'molten', time: elapsed, reducedMotion: save.settings.reducedMotion, pointer: demoSim?.pointer }
    : { sim: game.sim, level: game.level, palette: game.palette, time: elapsed, reducedMotion: save.settings.reducedMotion, pointer: input.pointer };

  if (renderer && (game.state !== STATE.TITLE || demoSim)) {
    if (renderer.ok === false) {
      // WebGPU reported a device error — drop to Canvas2D fallback immediately
      renderer = new Canvas2DRenderer(canvas);
      renderer.resize(WORLD.w, WORLD.h);
      rendererKind = 'canvas2d';
      ui.toast('Graphics fallback → Canvas2D');
    }
    try { renderer.render(st); }
    catch (e) { console.warn('[render] frame error, falling back to Canvas2D', e); renderer = new Canvas2DRenderer(canvas); renderer.resize(WORLD.w, WORLD.h); rendererKind = 'canvas2d'; }
  }

  ui.updateHud(game.hud());
  updateFocus();
  requestAnimationFrame(loop);
}

const focusEl = document.getElementById('focus');
function updateFocus() {
  if (!focusEl) return;
  const playing = game.state === STATE.PLAYING;
  if (playing && game.sim) {
    const r = canvas.getBoundingClientRect();
    const sx = r.width / WORLD.w, sy = r.height / WORLD.h;
    focusEl.style.left = (input.pointer.x * sx) + 'px';
    focusEl.style.top = (input.pointer.y * sy) + 'px';
    focusEl.classList.toggle('hidden', false);
    focusEl.classList.toggle('pull', input.pointer.mode === 1);
  } else {
    focusEl.classList.add('hidden');
  }
}

boot();
