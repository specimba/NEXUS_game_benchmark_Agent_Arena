// ============================================================================
//  audio.js — WebAudio, fully event-driven, finite envelopes, master mute
//  No looping drone, no autoplay-before-gesture. Created lazily on first user
//  gesture (browser autoplay policy). Any init failure is swallowed so audio
//  never blocks gameplay (benchmark audio hygiene).
// ============================================================================

export class Audio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this.ready = false;
  }

  // call from a user gesture
  init() {
    if (this.ready) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.6;
      this.master.connect(this.ctx.destination);
      this.ready = true;
    } catch (e) {
      console.warn('[audio] init failed, continuing silent:', e);
      this.ready = false;
    }
  }

  resume() { try { this.ctx?.resume?.(); } catch {} }

  setMuted(m) {
    this.muted = m;
    if (this.master) this.master.gain.value = m ? 0 : 0.6;
  }

  // generic finite-envelope tone
  _tone({ freq = 440, type = 'sine', dur = 0.18, gain = 0.3, slide = 0, attack = 0.005 }) {
    if (!this.ready || this.muted) return;
    try {
      const t = this.ctx.currentTime;
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, t);
      if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(gain, t + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(this.master);
      o.start(t); o.stop(t + dur + 0.02);
    } catch {}
  }

  // short filtered noise burst (splash / impact)
  _noise({ dur = 0.25, gain = 0.25, freq = 800 }) {
    if (!this.ready || this.muted) return;
    try {
      const t = this.ctx.currentTime;
      const n = Math.floor(this.ctx.sampleRate * dur);
      const buf = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      const src = this.ctx.createBufferSource(); src.buffer = buf;
      const bp = this.ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = 0.8;
      const g = this.ctx.createGain(); g.gain.value = gain;
      src.connect(bp); bp.connect(g); g.connect(this.master);
      src.start(t);
    } catch {}
  }

  // --- named game events ---
  splash() { this._noise({ dur: 0.3, gain: 0.18, freq: 600 }); }
  push() { this._tone({ freq: 180, type: 'sine', dur: 0.08, gain: 0.12, slide: -60 }); }
  win() { [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => this._tone({ freq: f, type: 'triangle', dur: 0.3, gain: 0.3 }), i * 110)); }
  lose() { this._tone({ freq: 320, type: 'sawtooth', dur: 0.5, gain: 0.22, slide: -180 }); }
  click() { this._tone({ freq: 660, type: 'square', dur: 0.05, gain: 0.12 }); }
  star() { this._tone({ freq: 880, type: 'triangle', dur: 0.16, gain: 0.22, slide: 220 }); }
  tick() { this._tone({ freq: 1200, type: 'sine', dur: 0.04, gain: 0.08 }); }
}
