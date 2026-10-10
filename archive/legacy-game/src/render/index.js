// ============================================================================
//  render/index.js — renderer factory with graceful fallback
//  preference: 'auto' (try WebGPU, fall back to Canvas2D) | 'webgpu' | 'canvas2d'
//  Returns { renderer, kind }. renderer has: resize(w,h), render(state), dispose().
// ============================================================================

import { WebGPURenderer } from './webgpu.js';
import { Canvas2DRenderer } from './canvas2d.js';

export async function createRenderer(canvas, preference = 'auto') {
  if (preference === 'canvas2d') {
    const r = new Canvas2DRenderer(canvas);
    return { renderer: r, kind: 'canvas2d' };
  }
  if (preference === 'auto' || preference === 'webgpu') {
    try {
      const r = new WebGPURenderer(canvas);
      await r.init();
      if (r.ok) return { renderer: r, kind: 'webgpu' };
      throw new Error('webgpu init false');
    } catch (e) {
      console.warn('[render] WebGPU unavailable, using Canvas2D:', e.message);
      const r = new Canvas2DRenderer(canvas);
      return { renderer: r, kind: 'canvas2d' };
    }
  }
  const r = new Canvas2DRenderer(canvas);
  return { renderer: r, kind: 'canvas2d' };
}
