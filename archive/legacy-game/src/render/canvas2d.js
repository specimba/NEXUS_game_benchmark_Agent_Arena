// ============================================================================
//  canvas2d.js — Canvas2D fallback renderer (reliability backstop)
//  Always works, no GPU required. Draws atmospheric forge background, obstacles,
//  goal zone, and the fluid as additive radial-gradient sprites (glowing
//  metaball-ish liquid). Used when WebGPU is unavailable or errors at runtime.
// ============================================================================

const PALETTES = {
  molten: { core: [255, 196, 120], halo: [255, 110, 32], bg0: [12, 14, 22], bg1: [6, 7, 12] },
  coolant: { core: [200, 245, 255], halo: [40, 170, 220], bg0: [10, 18, 24], bg1: [5, 9, 14] },
};

function makeSprite(rgb, size, innerStop = 0.0, soft = 0.5) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  const [r, gg, b] = rgb;
  grd.addColorStop(0, `rgba(${r},${gg},${b},1)`);
  grd.addColorStop(0.35, `rgba(${r},${gg},${b},${soft})`);
  grd.addColorStop(1, `rgba(${r},${gg},${b},0)`);
  g.fillStyle = grd;
  g.fillRect(0, 0, size, size);
  return c;
}

export class Canvas2DRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.scale = 1;
    this.sprites = {};   // palette -> { halo, core }
    this.t = 0;
  }

  resize(worldW, worldH) {
    this.worldW = worldW; this.worldH = worldH;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.scale = dpr;
    this.canvas.width = Math.floor(worldW * dpr);
    this.canvas.height = Math.floor(worldH * dpr);
  }

  _spriteSet(palette) {
    if (!this.sprites[palette]) {
      const p = PALETTES[palette] || PALETTES.molten;
      this.sprites[palette] = {
        halo: makeSprite(p.halo, 64, 0, 0.5),
        core: makeSprite(p.core, 40, 0, 0.9),
      };
    }
    return this.sprites[palette];
  }

  render(state) {
    const { sim, level, palette = 'molten', reducedMotion = false } = state;
    const ctx = this.ctx, s = this.scale, W = this.worldW, H = this.worldH;
    const t = (this.t += 1 / 60);
    const pal = PALETTES[palette] || PALETTES.molten;
    ctx.setTransform(s, 0, 0, s, 0, 0);

    // --- background ---
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, `rgb(${pal.bg0.join(',')})`);
    bg.addColorStop(1, `rgb(${pal.bg1.join(',')})`);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    // forge glow at bottom
    const glow = ctx.createRadialGradient(W * 0.5, H + 120, 40, W * 0.5, H + 120, H * 0.9);
    glow.addColorStop(0, `rgba(${pal.halo[0]},${pal.halo[1]},${pal.halo[2]},0.10)`);
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
    // subtle vignette
    const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.75);
    vig.addColorStop(0, 'rgba(0,0,0,0)'); vig.addColorStop(1, 'rgba(0,0,0,0.45)');
    ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);

    // --- goal zone ---
    if (level?.goal) drawGoal(ctx, level.goal, pal, t, reducedMotion);

    // --- obstacles ---
    if (level?.obstacles) {
      for (const o of level.obstacles) drawObstacle(ctx, o);
    }

    // --- fluid (additive sprites) ---
    if (sim) {
      const sp = this._spriteSet(palette);
      const halo = sp.halo, core = sp.core;
      ctx.globalCompositeOperation = 'lighter';
      const hr = 26, cr = 9;
      for (let i = 0; i < sim.count; i++) {
        const x = sim.px[i], y = sim.py[i];
        ctx.drawImage(halo, x - hr, y - hr, hr * 2, hr * 2);
      }
      for (let i = 0; i < sim.count; i++) {
        const x = sim.px[i], y = sim.py[i];
        ctx.drawImage(core, x - cr, y - cr, cr * 2, cr * 2);
      }
      ctx.globalCompositeOperation = 'source-over';
    }

    // --- pointer tool ---
    if (state.pointer?.active) drawTool(ctx, state.pointer, state.pointer.mode === 1);
  }

  dispose() {}
}

function drawGoal(ctx, g, pal, t, reducedMotion) {
  ctx.save();
  const pulse = reducedMotion ? 0 : (Math.sin(t * 2) * 0.5 + 0.5);
  ctx.fillStyle = `rgba(${pal.core[0]},${pal.core[1]},${pal.core[2]},${0.05 + pulse * 0.05})`;
  ctx.fillRect(g.x, g.y, g.w, g.h);
  ctx.strokeStyle = `rgba(${pal.core[0]},${pal.core[1]},${pal.core[2]},${0.5 + pulse * 0.3})`;
  ctx.lineWidth = 3; ctx.setLineDash([14, 10]);
  ctx.strokeRect(g.x, g.y, g.w, g.h);
  ctx.setLineDash([]);
  ctx.fillStyle = `rgba(${pal.core[0]},${pal.core[1]},${pal.core[2]},0.85)`;
  ctx.font = '600 22px system-ui, sans-serif';
  ctx.fillText('GOAL', g.x + 12, g.y + 28);
  ctx.restore();
}

function drawObstacle(ctx, o) {
  ctx.save();
  if (o.type === 'circle') {
    ctx.fillStyle = 'rgba(28,32,44,0.96)';
    ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(120,140,170,0.5)'; ctx.lineWidth = 3; ctx.stroke();
  } else {
    ctx.fillStyle = 'rgba(28,32,44,0.96)';
    ctx.fillRect(o.x - o.hw, o.y - o.hh, o.hw * 2, o.hh * 2);
    ctx.strokeStyle = 'rgba(120,140,170,0.5)'; ctx.lineWidth = 3;
    ctx.strokeRect(o.x - o.hw, o.y - o.hh, o.hw * 2, o.hh * 2);
  }
  ctx.restore();
}

function drawTool(ctx, p, pull) {
  ctx.save();
  const col = pull ? 'rgba(120,220,255,0.9)' : 'rgba(255,170,90,0.9)';
  ctx.strokeStyle = col; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(p.x, p.y, 26, 0, Math.PI * 2); ctx.stroke();
  ctx.globalAlpha = 0.25; ctx.fillStyle = col;
  ctx.beginPath(); ctx.arc(p.x, p.y, 26, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}
