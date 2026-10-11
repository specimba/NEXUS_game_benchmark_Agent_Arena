// ============================================================================
//  webgpu.js — WebGPU screen-space fluid renderer (primary path)
//  Pass 1: instanced additive gaussian sprites -> offscreen "thickness" texture
//          (R=thickness, G=thickness*speed, B=thickness*kind).
//  Pass 2: full-screen composite -> reconstruct surface normal from thickness
//          gradient, shade with diffuse + specular + fresnel + foam, over a
//          procedural forge background (gradient, ember glow, caustics, vignette).
//  Any failure during init or a frame sets this.ok=false so main() can fall
//  back to the Canvas2D renderer (no blank screen).
// ============================================================================

const MAX_PARTICLES = 6000;
const SIM_SPEED_SCALE = 0.004; // world px/s -> 0..2 range for foam

const PALETTE_RGB = {
  molten: { mol: [1.0, 0.46, 0.12], coo: [0.2, 0.78, 0.95], bg0: [0.05, 0.06, 0.1], bg1: [0.02, 0.025, 0.04] },
  coolant: { mol: [1.0, 0.46, 0.12], coo: [0.2, 0.78, 0.95], bg0: [0.04, 0.08, 0.1], bg1: [0.02, 0.035, 0.05] },
};

const WGSL_THICK = /* wgsl */`
struct Params {
  a : vec4<f32>,   // worldW, worldH, screenW, screenH
  b : vec4<f32>,   // radius, _, _, _
};
@group(0) @binding(0) var<storage, read> particles : array<vec4<f32>>;
@group(0) @binding(1) var<uniform> P : Params;

struct VSOut {
  @builtin(position) pos : vec4<f32>,
  @location(0) uv : vec2<f32>,
  @location(1) kind : f32,
  @location(2) speed : f32,
};

@vertex fn vs(@builtin(vertex_index) vi : u32, @builtin(instance_index) ii : u32) -> VSOut {
  var corners = array<vec2<f32>, 6>(
    vec2<f32>(-1.0,-1.0), vec2<f32>(1.0,-1.0), vec2<f32>(-1.0,1.0),
    vec2<f32>(-1.0,1.0), vec2<f32>(1.0,-1.0), vec2<f32>(1.0,1.0));
  let c = corners[vi];
  let p = particles[ii];
  let world = p.xy;
  let clip = vec2<f32>(world.x / (P.a.x * 0.5) - 1.0, 1.0 - world.y / (P.a.y * 0.5));
  let off = c * vec2<f32>(P.b.x / P.a.x * 2.0, P.b.x / P.a.y * 2.0);
  var o : VSOut;
  o.pos = vec4<f32>(clip + off, 0.0, 1.0);
  o.uv = c;
  o.kind = p.z;
  o.speed = p.w;
  return o;
}

@fragment fn fs(in : VSOut) -> @location(0) vec4<f32> {
  let r2 = dot(in.uv, in.uv);
  if (r2 > 1.0) { discard; }
  let g = exp(-r2 * 3.2);
  // additive: R=thickness, G=thickness*speed, B=thickness*kind
  return vec4<f32>(g, g * in.speed, g * in.kind, g);
}
`;

const WGSL_COMPOSITE = /* wgsl */`
struct CP {
  screenW : f32, screenH : f32, time : f32, reduced : f32,
  thresh : f32, molR : f32, molG : f32, molB : f32,
  cooR : f32, cooG : f32, cooB : f32,
  bg0R : f32, bg0G : f32, bg0B : f32, bg1R : f32, bg1G : f32, bg1B : f32,
};
@group(0) @binding(0) var tex : texture_2d<f32>;
@group(0) @binding(1) var samp : sampler;
@group(0) @binding(2) var<uniform> C : CP;

struct VOut { @builtin(position) pos : vec4<f32>, @location(0) uv : vec2<f32> };

@vertex fn vs(@builtin(vertex_index) vi : u32) -> VOut {
  var p = array<vec2<f32>, 3>(vec2<f32>(-1.0,-1.0), vec2<f32>(3.0,-1.0), vec2<f32>(-1.0,3.0));
  var o : VOut;
  let q = p[vi];
  o.pos = vec4<f32>(q, 0.0, 1.0);
  o.uv = vec2<f32>(q.x * 0.5 + 0.5, 1.0 - (q.y * 0.5 + 0.5));
  return o;
}

fn hash21(p : vec2<f32>) -> f32 {
  var q = fract(p * vec2<f32>(123.34, 345.45));
  q += dot(q, q + 34.345);
  return fract(q.x * q.y);
}
fn noise(p : vec2<f32>) -> f32 {
  let i = floor(p); let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);
  let a = hash21(i);
  let b = hash21(i + vec2<f32>(1.0,0.0));
  let c = hash21(i + vec2<f32>(0.0,1.0));
  let d = hash21(i + vec2<f32>(1.0,1.0));
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}

@fragment fn fs(in : VOut) -> @location(0) vec4<f32> {
  let texel = vec2<f32>(1.0 / C.screenW, 1.0 / C.screenH);
  let tC = textureSample(tex, samp, in.uv);
  let tL = textureSample(tex, samp, in.uv - vec2<f32>(texel.x, 0.0)).r;
  let tR = textureSample(tex, samp, in.uv + vec2<f32>(texel.x, 0.0)).r;
  let tT = textureSample(tex, samp, in.uv - vec2<f32>(0.0, texel.y)).r;
  let tB = textureSample(tex, samp, in.uv + vec2<f32>(0.0, texel.y)).r;

  // background (procedural forge)
  let uv = in.uv;
  let bg = mix(vec3<f32>(C.bg0R,C.bg0G,C.bg0B), vec3<f32>(C.bg1R,C.bg1G,C.bg1B), uv.y);
  let ember = exp(-abs(uv.y - 1.05) * 6.0) * vec3<f32>(1.0, 0.45, 0.2) * 0.12;
  var bgc = bg + ember;
  // caustics
  if (C.reduced < 0.5) {
    let n = noise(uv * 9.0 + vec2<f32>(C.time * 0.05, -C.time * 0.03));
    let n2 = noise(uv * 16.0 - vec2<f32>(C.time * 0.04, 0.0));
    bgc += vec3<f32>(0.04, 0.06, 0.09) * (n * n2);
  }
  // vignette
  let d = distance(uv, vec2<f32>(0.5, 0.5));
  bgc *= 1.0 - smoothstep(0.55, 0.95, d) * 0.5;

  let surface = smoothstep(C.thresh - 0.18, C.thresh + 0.12, tC.r);
  if (surface <= 0.001) { return vec4<f32>(bgc, 1.0); }

  // surface normal from thickness gradient
  let grad = vec2<f32>(tR - tL, tB - tT);
  let n = normalize(vec3<f32>(-grad.x * 60.0, -grad.y * 60.0, 1.0));

  // fluid base color (mix molten/coolant by kind fraction)
  let kindFrac = clamp(tC.b / max(tC.r, 0.0001), 0.0, 1.0);
  let base = mix(vec3<f32>(C.molR,C.molG,C.molB), vec3<f32>(C.cooR,C.cooG,C.cooB), kindFrac);

  let L = normalize(vec3<f32>(0.45, 0.8, 0.55));
  let diff = max(dot(n, L), 0.0);
  let V = vec3<f32>(0.0, 0.0, 1.0);
  let Hh = normalize(L + V);
  let spec = pow(max(dot(n, Hh), 0.0), 48.0);
  let fres = pow(1.0 - max(n.z, 0.0), 3.0);

  // foam: high local speed or thin surface edge
  let speed = tC.g / max(tC.r, 0.0001);
  let foam = clamp(smoothstep(0.6, 1.4, speed) + smoothstep(0.18, 0.02, abs(tC.r - C.thresh)) * 0.7, 0.0, 1.0);

  var col = base * (0.35 + 0.75 * diff);
  col += vec3<f32>(1.0, 0.95, 0.85) * spec * 0.8;
  col += base * fres * 0.5;
  col = mix(col, vec3<f32>(0.92, 0.96, 1.0), foam * 0.6);
  // subtle inner depth tint
  col *= mix(0.85, 1.05, smoothstep(0.0, 1.2, tC.r));

  let finalc = mix(bgc, col, surface);
  return vec4<f32>(finalc, 1.0);
}
`;

export class WebGPURenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ok = false;
    this.device = null;
  }

  async init() {
    if (!navigator.gpu) throw new Error('no webgpu');
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) throw new Error('no adapter');
    const device = await adapter.requestDevice();
    this.device = device;
    device.addEventListener?.('uncapturederror', (ev) => {
      console.warn('[webgpu] uncaptured error, disabling renderer:', ev.error?.message);
      this.ok = false;
    });
    const context = canvas.getContext('webgpu');
    const format = navigator.gpu.getPreferredCanvasFormat();
    context.configure({ device, format, alphaMode: 'opaque' });
    this.context = context; this.format = format;

    // offscreen thickness texture
    this.particleBuf = device.createBuffer({ size: MAX_PARTICLES * 4 * 4, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST });
    this.paramsBuf = device.createBuffer({ size: 64, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
    this.compBuf = device.createBuffer({ size: 96, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });

    this.thickMod = device.createShaderModule({ code: WGSL_THICK });
    this.compMod = device.createShaderModule({ code: WGSL_COMPOSITE });

    this.sampler = device.createSampler({ magFilter: 'linear', minFilter: 'linear' });

    const thickBGL = device.createBindGroupLayout({
      entries: [
        { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } },
        { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } },
      ],
    });
    this.thickPipeline = device.createRenderPipeline({
      layout: device.createPipelineLayout({ bindGroupLayouts: [thickBGL] }),
      vertex: { module: this.thickMod, entryPoint: 'vs' },
      fragment: { module: this.thickMod, entryPoint: 'fs', targets: [{ format: 'rgba16float', blend: {
        color: { srcFactor: 'one', dstFactor: 'one', operation: 'add' },
        alpha: { srcFactor: 'one', dstFactor: 'one', operation: 'add' },
      } }] },
      primitive: { topology: 'triangle-list' },
    });
    this.thickBind = device.createBindGroup({
      layout: thickBGL,
      entries: [ { binding: 0, resource: { buffer: this.particleBuf } }, { binding: 1, resource: { buffer: this.paramsBuf } } ],
    });

    this.offTex = null; this.offView = null;
    this.compBGL = device.createBindGroupLayout({
      entries: [
        { binding: 0, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } },
        { binding: 1, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'filtering' } },
        { binding: 2, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
      ],
    });
    this.compPipeline = device.createRenderPipeline({
      layout: device.createPipelineLayout({ bindGroupLayouts: [this.compBGL] }),
      vertex: { module: this.compMod, entryPoint: 'vs' },
      fragment: { module: this.compMod, entryPoint: 'fs', targets: [{ format }] },
      primitive: { topology: 'triangle-list' },
    });

    this.posData = new Float32Array(MAX_PARTICLES * 4);
    this.ok = true;
  }

  resize(worldW, worldH) {
    this.worldW = worldW; this.worldH = worldH;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.floor(worldW * dpr));
    const h = Math.max(1, Math.floor(worldH * dpr));
    this.canvas.width = w; this.canvas.height = h;
    this.screenW = w; this.screenH = h;
    if (this.device) {
      this.offTex = this.device.createTexture({
        size: [w, h], format: 'rgba16float', usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
      });
      this.offView = this.offTex.createView();
      this._sizeBuf = new Float32Array([w, h]);
    }
  }

  render(state) {
    if (!this.ok || !this.offView) return;
    const { sim, level, palette = 'molten', time = 0, reducedMotion = false } = state;
    const device = this.device;
    // upload particles
    const n = Math.min(sim.count, MAX_PARTICLES);
    const spd = SIM_SPEED_SCALE;
    for (let i = 0; i < n; i++) {
      const o = i * 4;
      this.posData[o] = sim.px[i];
      this.posData[o + 1] = sim.py[i];
      this.posData[o + 2] = sim.kind[i];
      this.posData[o + 3] = Math.min(2.0, Math.hypot(sim.vx[i], sim.vy[i]) * spd);
    }
    device.queue.writeBuffer(this.particleBuf, 0, this.posData, 0, n * 4);

    const pal = PALETTE_RGB[palette] || PALETTE_RGB.molten;
    // thickness params
    device.queue.writeBuffer(this.paramsBuf, 0, new Float32Array([
      this.worldW, this.worldH, this.screenW, this.screenH, 24.0, 0, 0, 0,
    ]));
    device.queue.writeBuffer(this.compBuf, 0, new Float32Array([
      this.screenW, this.screenH, time, reducedMotion ? 1 : 0,
      0.55, // threshold
      pal.mol[0], pal.mol[1], pal.mol[2],
      pal.coo[0], pal.coo[1], pal.coo[2],
      pal.bg0[0], pal.bg0[1], pal.bg0[2],
      pal.bg1[0], pal.bg1[1], pal.bg1[2],
    ]));

    const enc = device.createCommandEncoder();
    // pass 1: thickness
    const p1 = enc.beginRenderPass({ colorAttachments: [{ view: this.offView, clearValue: { r: 0, g: 0, b: 0, a: 0 }, loadOp: 'clear', storeOp: 'store' }] });
    p1.setPipeline(this.thickPipeline);
    p1.setBindGroup(0, this.thickBind);
    p1.draw(6, n);
    p1.end();
    // pass 2: composite
    const compBind = device.createBindGroup({
      layout: this.compBGL,
      entries: [ { binding: 0, resource: this.offView }, { binding: 1, resource: this.sampler }, { binding: 2, resource: { buffer: this.compBuf } } ],
    });
    const p2 = enc.beginRenderPass({ colorAttachments: [{ view: this.context.getCurrentTexture().createView(), clearValue: { r: 0, g: 0, b: 0, a: 1 }, loadOp: 'clear', storeOp: 'store' }] });
    p2.setPipeline(this.compPipeline);
    p2.setBindGroup(0, compBind);
    p2.draw(3, 1);
    p2.end();
    device.queue.submit([enc.finish()]);
  }

  dispose() { try { this.context?.unconfigure?.(); } catch {} }
}

