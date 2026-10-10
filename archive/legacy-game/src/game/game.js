// ============================================================================
//  game.js — game state machine, level orchestration, scoring, progression
//  States: title -> howto -> playing <-> paused -> win | lose -> (next/retry)
//  Owns the simulation instance for the active level and is the single source
//  of truth for HUD/objective state. Rendering reads the live sim each frame.
// ============================================================================

import { FluidCore } from '../sim/fluidCore.js';
import { SIM } from '../config.js';
import { LEVELS, WORLD } from './levels.js';
import { writeSave } from '../storage.js';

export const STATE = { TITLE: 'title', HOWTO: 'howto', PLAYING: 'playing', PAUSED: 'paused', WIN: 'win', LOSE: 'lose' };

export class Game {
  constructor({ audio, input, save, onState } = {}) {
    this.audio = audio;
    this.input = input;
    this.save = save;
    this.onState = onState || (() => {});
    this.state = STATE.TITLE;
    this.levelIndex = 0;
    this.sim = null;
    this.level = null;
    this.timeLeft = 0;
    this.acc = 0;
    this.holdTimer = 0;
    this.result = null;     // { stars, timeUsed, cleared }
    this.palette = 'molten';
    this.reducedMotion = save?.settings?.reducedMotion || false;
    this._lastWinSound = false;
  }

  get levelCount() { return LEVELS.length; }
  get levelIds() { return LEVELS.map((l) => l.id); }

  _emit() { this.onState(this); }

  // ---- lifecycle -----------------------------------------------------------
  startLevel(index) {
    this.levelIndex = Math.max(0, Math.min(LEVELS.length - 1, index));
    const lvl = LEVELS[this.levelIndex];
    this.level = lvl;
    this.palette = lvl.palette;

    const sim = new FluidCore(lvl.particles, WORLD, { rho0: SIM.rho0, seed: 1000 + lvl.id });
    sim.obstacles = (lvl.obstacles || []).map((o) => ({ ...o }));
    for (const s of lvl.spawn) sim.fillRect(s.x0, s.y0, s.x1, s.y1, s.kind || 0, 0.15);
    this.sim = sim;

    this.timeLeft = lvl.timeLimit;
    this.holdTimer = 0;
    this.acc = 0;
    this.result = null;
    this._lastWinSound = false;
    this.setState(STATE.PLAYING);
  }

  setState(s) { if (this.state !== s) { this.state = s; this._emit(); } }

  togglePause() {
    if (this.state === STATE.PLAYING) { this.setState(STATE.PAUSED); }
    else if (this.state === STATE.PAUSED) { this.setState(STATE.PLAYING); }
  }

  restart() { this.audio?.click(); this.startLevel(this.levelIndex); }

  nextLevel() {
    this.audio?.click();
    if (this.levelIndex < LEVELS.length - 1) this.startLevel(this.levelIndex + 1);
    else this.setState(STATE.TITLE);
  }

  gotoTitle() { this.audio?.click(); this.setState(STATE.TITLE); }
  gotoHowto() { this.audio?.click(); this.setState(STATE.HOWTO); }
  beginFromTitle() { this.audio?.click(); this.startLevel(Math.min(this.save.highestUnlocked - 1, LEVELS.length - 1)); }

  // ---- per-frame update ----------------------------------------------------
  update(frameDt) {
    if (this.state !== STATE.PLAYING) return;
    const dt = Math.min(frameDt, 0.05); // clamp to avoid huge steps after stalls

    // input -> sim
    const inp = this.input;
    const sim = this.sim;
    sim.pointer.active = inp.pointer.active;
    sim.pointer.x = inp.pointer.x; sim.pointer.y = inp.pointer.y;
    sim.pointer.mode = inp.pointer.mode;
    const targetTilt = inp.tilt * SIM.tiltMax;
    sim.updateTilt(targetTilt, dt);

    // fixed-step physics
    this.acc += dt;
    let steps = 0;
    const fixed = SIM.dt;
    while (this.acc >= fixed && steps < SIM.maxSubstepsPerFrame) {
      sim.step(fixed);
      this.acc -= fixed;
      steps++;
    }
    if (steps === 0) { /* keep in sync lightly */ }

    // timer
    this.timeLeft -= dt;
    if (this.timeLeft <= 0) { this.timeLeft = 0; this._lose(); return; }

    // objective: mass currently in goal zone
    const frac = sim.massInZone(this.level.goal);
    if (frac >= this.level.target) {
      this.holdTimer += dt;
      if (this.holdTimer >= this.level.hold) this._win();
    } else {
      this.holdTimer = Math.max(0, this.holdTimer - dt * 1.5); // decay if broken
    }
  }

  _win() {
    const lvl = this.level;
    const timeUsed = lvl.timeLimit - this.timeLeft;
    let stars = 1;
    if (this.timeLeft >= (lvl.starTimes?.[0] ?? 0)) stars = 3;
    else if (this.timeLeft >= (lvl.starTimes?.[1] ?? 0)) stars = 2;
    else stars = 1;

    // persist best
    const id = lvl.id;
    const prev = this.save.levels[id] || { stars: 0, bestTime: Infinity, cleared: false };
    this.save.levels[id] = {
      stars: Math.max(prev.stars, stars),
      bestTime: Math.min(prev.bestTime ?? Infinity, timeUsed),
      cleared: true,
    };
    if (this.levelIndex + 1 < LEVELS.length) {
      this.save.highestUnlocked = Math.max(this.save.highestUnlocked, this.levelIndex + 2);
    }
    writeSave(this.save);

    this.result = { stars, timeUsed, cleared: true };
    this.setState(STATE.WIN);
    if (!this._lastWinSound) { this.audio?.win(); this._lastWinSound = true; }
  }

  _lose() {
    this.result = { stars: 0, timeUsed: this.level.timeLimit, cleared: false };
    this.setState(STATE.LOSE);
    this.audio?.lose();
  }

  // ---- HUD snapshot for UI ------------------------------------------------
  hud() {
    if (!this.sim || !this.level) return null;
    const frac = this.sim.massInZone(this.level.goal);
    return {
      state: this.state,
      levelId: this.level.id,
      levelName: this.level.name,
      levelIndex: this.levelIndex,
      levelCount: LEVELS.length,
      timeLeft: this.timeLeft,
      timeLimit: this.level.timeLimit,
      target: this.level.target,
      progress: frac,
      hold: this.level.hold,
      holdProgress: Math.min(1, this.holdTimer / this.level.hold),
      tilt: this.sim.tilt,
      palette: this.palette,
      result: this.result,
      hint: this.level.hint,
      stars: this.result?.stars ?? 0,
    };
  }
}
