/**
 * Headless autopilot probe — plays the real sim the way a naive first-time player would.
 * Contract: one line of JSON {check, results[], fails} on stdout. No DOM, no canvas, no timers.
 */
import { makeSim, step, PAD_X } from './sim';

const DT = 1 / 60;
const results: { name: string; ok: boolean; detail?: string }[] = [];
const check = (name: string, ok: boolean, detail?: string) => results.push({ name, ok, detail });
const play = (policy: (i: number) => number, maxSteps = 2000) => {
  const s = makeSim(1337);
  for (let i = 0; i < maxSteps && !s.won && !s.dead; i++) step(s, { thrust: policy(i) }, DT);
  return s;
};

const naive = play((i) => (i < 60 ? 0.5 : 0));                       // thrust 1 s, then coast
check('WIN reachable by a naive policy', naive.won, `x=${naive.x.toFixed(1)} vx=${naive.vx.toFixed(1)}`);

const greedy = play(() => 1);                                        // full thrust all the way
check('FAIL reachable — greed overshoots', greedy.dead && greedy.cause === 'overshoot', `cause=${greedy.cause} vx=${greedy.vx.toFixed(1)}`);

const timid = play(() => 0.005);                                     // trickle burn, never arrives
check('FAIL reachable — timidity runs out of time', timid.dead && timid.cause === 'out-of-time', `cause=${timid.cause} x=${timid.x.toFixed(1)}`);

const a = makeSim(99), b = makeSim(99);
for (let i = 0; i < 300; i++) { step(a, { thrust: 0.4 }, DT); step(b, { thrust: 0.4 }, DT); }
check('deterministic under identical input', a.x === b.x && a.fuel === b.fuel);
check('restart resets state', makeSim(99).x === 0 && makeSim(99).fuel === 100 && !makeSim(99).won);
check('no dead state: progress always possible', naive.x > 0 && PAD_X > 0);

console.log(JSON.stringify({ check: 'demo-probe', results, fails: results.filter((r) => !r.ok).length }));
