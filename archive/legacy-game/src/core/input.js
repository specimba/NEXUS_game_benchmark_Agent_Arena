// ============================================================================
//  input.js — unified pointer + keyboard + touch, with focus & pause hygiene
//  - Maps LMB = push, RMB / Shift+LMB = pull
//  - Left/Right (or A/D) tilt gravity; Space pause; R restart; M mute
//  - Exposes a small state object the game reads each frame; events for menu
// ============================================================================

export class Input {
  constructor(canvas, handlers = {}) {
    this.canvas = canvas;
    this.handlers = handlers;       // { onPause, onRestart, onMute, onToggleGraphics, onAnyKey }
    this.pointer = { x: 0, y: 0, active: false, mode: 0 }; // mode 0 push, 1 pull
    this.tilt = 0;                 // -1..1 target tilt from keys
    this.keys = new Set();
    this._bind();
  }

  // convert client coords (CSS px) to world pixels
  _toLocal(e) {
    const r = this.canvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (this._worldW / r.width),
      y: (e.clientY - r.top) * (this._worldH / r.height),
    };
  }

  setWorldSize(w, h) { this._worldW = w; this._worldH = h; }

  _bind() {
    const c = this.canvas;
    c.addEventListener('contextmenu', (e) => e.preventDefault());
    c.addEventListener('pointerdown', (e) => {
      const p = this._toLocal(e);
      this.pointer.x = p.x; this.pointer.y = p.y; this.pointer.active = true;
      this.pointer.mode = (e.button === 2 || e.shiftKey) ? 1 : 0;
      c.setPointerCapture?.(e.pointerId);
      this.handlers.onAnyKey?.();
    });
    c.addEventListener('pointermove', (e) => {
      const p = this._toLocal(e);
      this.pointer.x = p.x; this.pointer.y = p.y;
    });
    const release = (e) => { this.pointer.active = false; try { c.releasePointerCapture?.(e.pointerId); } catch {} };
    c.addEventListener('pointerup', release);
    c.addEventListener('pointercancel', release);
    c.addEventListener('pointerleave', () => { /* keep last pos; don't soft-lock aim */ });

    window.addEventListener('keydown', (e) => {
      if (e.repeat && e.code === 'Space') e.preventDefault();
      this.keys.add(e.code);
      this.handlers.onAnyKey?.();
      switch (e.code) {
        case 'Space': e.preventDefault(); this.handlers.onPause?.(); break;
        case 'KeyR': this.handlers.onRestart?.(); break;
        case 'KeyM': this.handlers.onMute?.(); break;
        case 'KeyG': this.handlers.onToggleGraphics?.(); break;
      }
      // prevent page scroll on arrows / space
      if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space'].includes(e.code)) e.preventDefault();
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    window.addEventListener('blur', () => { this.keys.clear(); this.pointer.active = false; });
  }

  // call each frame to update tilt target from held keys
  update() {
    let t = 0;
    if (this.keys.has('ArrowLeft') || this.keys.has('KeyA')) t -= 1;
    if (this.keys.has('ArrowRight') || this.keys.has('KeyD')) t += 1;
    // smooth toward target handled by game; here just store target
    this.tilt = t;
  }
}
