/**
 * Demo sim for the E2 probe harness — pure, seeded, fixed-step, no DOM / wall clock / Math.random.
 * A tiny landing problem: reach the pad at x=40 with a gentle closing speed, before nightfall (20 s).
 */
export type State = {
  x: number; vx: number; t: number; fuel: number; won: boolean; dead: boolean; cause: string | null;
};

export const PAD_X = 40;
export const MAX_TOUCHDOWN_VX = 12;
export const DEADLINE_S = 20;
export const FUEL_START = 100;
const ACCEL = 20; // m/s^2 at full thrust
const BURN = 4;   // fuel units / s at full thrust

export const makeSim = (_seed: number): State => ({
  x: 0, vx: 0, t: 0, fuel: FUEL_START, won: false, dead: false, cause: null,
});

/** One fixed step. Randomness would arrive as a seeded rng; time arrives as dt. */
export function step(s: State, input: { thrust: number }, dt: number): State {
  if (s.won || s.dead) return s;
  const th = Math.min(1, Math.max(0, input.thrust));
  s.vx += th * ACCEL * dt;
  s.x += s.vx * dt;
  s.fuel = Math.max(0, s.fuel - th * BURN * dt);
  s.t += dt;
  if (s.x >= PAD_X) {
    if (s.vx <= MAX_TOUCHDOWN_VX) s.won = true;
    else { s.dead = true; s.cause = 'overshoot'; }
  } else if (s.fuel <= 0) { s.dead = true; s.cause = 'out-of-fuel'; }
  else if (s.t >= DEADLINE_S) { s.dead = true; s.cause = 'out-of-time'; }
  return s;
}
