// ============================================================================
//  ui.js — DOM overlay + HUD controller
//  Pure presentation: reacts to game state, wires buttons to game methods,
//  reflects save (stars / unlock), shows toasts. No simulation logic here.
// ============================================================================

import { LEVELS } from '../game/levels.js';
import { STATE } from '../game/game.js';

const $ = (id) => document.getElementById(id);

export class UI {
  constructor() {
    this.el = {
      hud: $('hud'), title: $('title'), howto: $('howto'), pause: $('pause'), win: $('win'), lose: $('lose'),
      hudLevel: $('hud-level'), hudName: $('hud-name'), hudTimer: $('hud-timer'),
      hudFill: $('hud-fill'), hudTarget: $('hud-target'), hudHold: $('hud-hold'),
      hudHint: $('hud-hint'), hudTiltFill: $('hud-tilt-fill'),
      levelGrid: $('level-grid'),
      winStars: $('win-stars'), winStats: $('win-stats'),
      loseStats: $('lose-stats'),
      toast: $('toast'),
      btnPause: $('btn-pause'), btnRestart: $('btn-restart'), btnMute: $('btn-mute'), btnGfx: $('btn-gfx'),
    };
    this.game = null; this.helpers = {};
    this._toastTimer = null;
  }

  bind(game, helpers) {
    this.game = game; this.helpers = helpers;
    const h = helpers;
    $('btn-play').onclick = () => { h.audio?.init?.(); game.beginFromTitle(); };
    $('btn-howto').onclick = () => game.gotoHowto();
    $('btn-howto-back').onclick = () => game.setState(STATE.TITLE);
    $('btn-pause').onclick = () => game.togglePause();
    $('btn-restart').onclick = () => { if (game.state === STATE.PLAYING || game.state === STATE.PAUSED) game.restart(); };
    this.el.btnMute.onclick = () => h.toggleMute?.();
    this.el.btnGfx.onclick = () => h.cycleGraphics?.();
    $('btn-resume').onclick = () => game.togglePause();
    $('btn-pause-restart').onclick = () => game.restart();
    $('btn-pause-title').onclick = () => game.gotoTitle();
    $('btn-pause-mute').onclick = () => { h.toggleMute?.(); this._syncSettings(); };
    $('btn-pause-reduce').onclick = () => { h.toggleReduce?.(); this._syncSettings(); };
    $('btn-pause-gfx').onclick = () => { h.cycleGraphics?.(); this._syncSettings(); };
    $('btn-next').onclick = () => game.nextLevel();
    $('btn-win-replay').onclick = () => game.restart();
    $('btn-win-title').onclick = () => game.gotoTitle();
    $('btn-retry').onclick = () => game.restart();
    $('btn-lose-title').onclick = () => game.gotoTitle();
    this._syncSettings();
    this.buildLevelGrid();
  }

  _syncSettings() {
    const s = this.game?.save?.settings || {};
    this.setMuted(!!s.muted);
    this.setReduced(!!s.reducedMotion);
    const gfx = s.graphics || 'auto';
    if (this.el.btnGfx) this.el.btnGfx.textContent = '◈';
    $('btn-pause-gfx').textContent = 'Graphics: ' + (gfx === 'auto' ? 'Auto' : (gfx === 'webgpu' ? 'WebGPU' : 'Canvas'));
  }

  setMuted(m) {
    this.el.btnMute.textContent = m ? '🔇' : '♪';
    $('btn-pause-mute').textContent = 'Sound: ' + (m ? 'Off' : 'On');
  }
  setReduced(r) {
    $('btn-pause-reduce').textContent = 'Motion: ' + (r ? 'Reduced' : 'Normal');
  }

  buildLevelGrid() {
    const grid = this.el.levelGrid;
    grid.innerHTML = '';
    const unlocked = this.game?.save?.highestUnlocked || 1;
    LEVELS.forEach((lvl, i) => {
      const rec = this.game?.save?.levels?.[lvl.id];
      const locked = lvl.id > unlocked;
      const b = document.createElement('button');
      b.className = 'level-cell' + (locked ? ' locked' : '');
      const stars = rec?.stars || 0;
      b.innerHTML = `<div class="lc-id">${locked ? '🔒' : lvl.id}</div><div class="lc-name">${lvl.name}</div>` +
        `<div class="lc-stars">${locked ? '' : '★★★'.slice(0, stars).padEnd(3, '·')}</div>`;
      if (!locked) b.onclick = () => { this.helpers.audio?.init?.(); this.game.startLevel(i); };
      grid.appendChild(b);
    });
  }

  onState(g) {
    const show = (e, on) => e && e.classList.toggle('hidden', !on);
    const s = g.state;
    show(this.el.title, s === STATE.TITLE);
    show(this.el.howto, s === STATE.HOWTO);
    show(this.el.hud, s === STATE.PLAYING || s === STATE.PAUSED || s === STATE.WIN || s === STATE.LOSE);
    show(this.el.pause, s === STATE.PAUSED);
    show(this.el.win, s === STATE.WIN);
    show(this.el.lose, s === STATE.LOSE);
    if (s === STATE.TITLE) this.buildLevelGrid();
    if (s === STATE.WIN) this._fillWin(g);
    if (s === STATE.LOSE) this._fillLose(g);
  }

  _fillWin(g) {
    const r = g.result || { stars: 0, timeUsed: 0 };
    this.el.winStars.textContent = '★★★'.slice(0, r.stars).padEnd(3, '☆');
    this.el.winStats.innerHTML = `Time used <b>${r.timeUsed.toFixed(1)}s</b> · Chamber <b>${g.level.id}/${LEVELS.length}</b>`;
  }
  _fillLose(g) {
    this.el.loseStats.textContent = `You held ${(g.hud()?.progress * 100 || 0).toFixed(0)}% — needed ${(g.level.target * 100).toFixed(0)}%. Try tilting with ← →.`;
  }

  updateHud(hud) {
    if (!hud) return;
    this.el.hudLevel.textContent = `Level ${hud.levelId}`;
    this.el.hudName.textContent = hud.levelName;
    this.el.hudTimer.textContent = Math.ceil(hud.timeLeft);
    this.el.hudTimer.classList.toggle('danger', hud.timeLeft <= 10);
    const frac = Math.min(1, hud.progress / hud.target);
    this.el.hudFill.style.width = (frac * 100).toFixed(1) + '%';
    this.el.hudTarget.style.left = '100%';
    this.el.hudHint.textContent = hud.hint || '';
    const holding = hud.progress >= hud.target;
    this.el.hudHold.classList.toggle('hidden', !holding);
    // tilt indicator (-1..1 -> 0..100)
    const tiltPct = (hud.tilt / 0.5) * 50 + 50;
    this.el.hudTiltFill.style.left = '50%';
    this.el.hudTiltFill.style.width = Math.abs(tiltPct - 50) + '%';
    this.el.hudTiltFill.style.transform = tiltPct >= 50 ? 'none' : 'translateX(-100%)';
  }

  toast(msg) {
    const t = this.el.toast;
    t.textContent = msg;
    t.classList.remove('hidden');
    t.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => { t.classList.remove('show'); t.classList.add('hidden'); }, 2600);
  }
}
