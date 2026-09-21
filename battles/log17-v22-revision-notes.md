# Log 17 revision notes — v22 build (2026-09-21)

**Source:** `ARENAaiAGENTandGAMEbenchNEXUSfreecreationlogs17.txt` — R018, the v21 single-prompt field test: 22 sessions, 11 battles, 11 operator comments.
**Trigger (operator):** *"Be grounded, and let's continue with logs. 17 new reviews and examples are being created to improve our prompts and the benchmark's capabilities. For example, we can see that they do not use the engines we expected and planned — Godot or Blender — but there are still good graphical or game-mechanic approaches we need to distill to better combine with old logs and knowledge."*
**Products:** `challenge/BATTLE_PROMPT_v22.md` (draft, not live) · `battles/round-018-v21-field-analysis.md` (evidence) · `battles/log17-approach-distillation.md` (the distill ledger) · `repo-ops/sandbox-tools/e2-probe-harness/` (verified capability) · registry + taxonomy + README updates.
**Live prompt:** unchanged — `challenge/BATTLE_PROMPT.md` stays v17 until the operator verdict. Nothing here is promoted.

---

## 1. What v21 got right (do not touch these in v22)

| Mechanism | Evidence in log 17 |
|---|---|
| **Fatigue note** (fire, grid, growth, lighthouse + the operations-crisis umbrella) | **0 of 22** sessions landed in any named family. Per the C15 law the field relocated (kite/wind, auctions), but operator fatigue — the binding constraint — was respected for a full round. |
| **Ship-complete rule** | **0** "unfinished / to infinity" comments (R016: 2 battles, R017: 2 battles). 22/22 sessions shipped a closed loop with an ending. |
| **Audio-defaults clause** | **0** audio complaints (R017: *"ear blasting"*). |
| **Anti-cardboard checklist + blind-visuals protocol** | First round with explicit visual praise in three battles; the 3D sessions that followed it (B9, B11, B7, B2) all shipped lights, shadows, tone mapping, fog, palette tokens; the two that ignored it (B3 gemini, B11 muse's 2D) were named for it. |
| **ENV report line** | 21 of 22 sessions declared their class (20×E2, 1×E3); 1 truncated. This finally replaced inference about sandbox class with per-session truth. |
| **PREMISE_NOTE / FUN_LINE** | Present in the winning sessions; B7's and B11's premise notes show real premise selection (B10 solar-pro4 documented discarding the sonar and lighthouse families as umbrella). |

---

## 2. Comment → feature map (v21 → v22)

| # | Operator comment (log line) | Finding | v22 feature |
|---|---|---|---|
| 1 | L1537 *"glm-5.2 created 3d game but nothing playable… I did not able to control it but that original 3d world approach easy win"* | Unplayable 3D still beats finished 2D; the defect is **control legibility**, invisible to a blind author | §4 probe asserts control sanity (hero in frame, axes not inverted, targets reachable); §5.3 control clause; §2 blind-protocol step (c) "write the values down" |
| 2 | L2841 *"good 3d puzzle game but basic 3d graphics… complete game with own mechanics"* | Closure + invention outrank fidelity; "not big physics" is not a defect | §2 keeps technique as floor, not win; no physics requirement added; judge-side note in analysis §2 |
| 3 | L4072 *"nonsense cardboard boxes graphical 3d 0 gameplay and controls meaningfulness… months older model won"* | Cardboard 3D signature; legibility beats geometry | §2 adds the explicit signature (*"coloured boxes with no light story"*); §1 npm-3D recipe makes light the first bullet |
| 4 | L4960 *"very interesting original game… visuals are really okay with that intelligent approach… deepseek's creation is very crippled basic version of dave the diver clone"* | Real-data approach earns visual credit; **clone-minus-systems** is a novelty failure | §1 "real data makes a look real"; §3 "has this game already been made?" + the systems test |
| 5 | L6521 *"interesting… if not old 2003 creation ghost master game made that creation flawlessly 23 years ago… game vision is bugged and cannot playable"* | Novelty is judged against the canon; a **vision bug** (camera/framing) is indistinguishable from an unplayable game | §3 form-era clause (2003–2015 reference); §4 camera/framing check + static-audit list (near-plane clipping, projection matrix, background clobber) |
| 6 | L7833 *"original simple text and image based game but the idea worked well, **played until end (10 minute)**"* | The round's only completed play-through was text + viewed portraits + a readable minute-one mystery — no engine, no 3D | §1 image route keeps identity-carrier role; §3 hedonics/legibility untouched; §2's 2D painter's stack added for anyone choosing canvas |
| 7 | L8444 *"mechanical failure when level 2 with wolf it cannot be possible to control sheeps without giving to wolf… Fable's creation is magnificent simple but working great… ready for steam release"* | **New defect class: level-N solvability.** A probe that asserts "win reachable" once can still ship an unwinnable level 2 | §4 probe now asserts **every level reachable with only the mechanics unlocked at that level**; §5.3 repeats it as a hard rule; taxonomy entry |
| 8 | L9850 *"nonsense meaningless game… very old flash browser game like club penguin mortar game which is outdated"* | 3D without meaning fails; **form-era failure** on the other side | §3 novelty line; §4 player's-sentence legality check retained; taxonomy NOVELTY-COLLISION |
| 9 | L10917 *"3d strange bidding game with no enjoyment"* | Genre with no player verb in its weak phase | §3 keeps "the recurring decision" as a requirement for the whole loop; distillation card B5 records the fix (an inspection verb) |
| 10 | L11490 *"muse made static table thing game with image creations at least it is game, other nonsense model is created bullshit"* | Image-led identity can carry a small game; the opposing session is **truncated in the log** (evidence gap) | §1 image route formalised (1–8 assets, inspect, regenerate); ops note in analysis §6 (EVIDENCE-GAP) |
| 11 | L12206 *"very interesting bidding game with investigation sauce with 3d random created artifact mindset interest… muse… very basic 2d graphics… messy visuals decreased a lot interest"* | The round's best build is **code-modelled 3D + generated material maps + executed probe**; "messy 2D" loses close pairs | §1 npm-3D recipe set (code geometry, canvas fbm maps, PMREM); §2 painter's-stack for 2D; §4 verification route promoted to a first-class route |

---

## 3. The two structural additions (beyond the comment map)

### 3.1 The engine question, answered by measurement (`battles/round-018…` §4)

- Blender: **0/22** for the third consecutive round; Godot, Unity, Babylon, Phaser, Pixi, PlayCanvas and every JS physics engine: **0 mentions in 12 205 lines**.
- The working engine = `three` (10/22 sessions) + code-modelled geometry + canvas-painted material maps + hand-written GLSL + hand-rolled physics + the image channel.
- v22 §1 therefore: demotes Blender to a one-line E1 note (kept for the analyst class and future pre-baked assets), makes npm-3D the headline route with the distilled recipe set, and **adds no Godot mention at all** — naming an unreachable option costs concept space (C15 law).
- Operator decision queued (**D2**): place `repo-ops/sandbox-tools/e2-probe-harness/` into every battle workspace as `scripts/run-probe.mjs` + `"probe": "node scripts/run-probe.mjs"`. This is the one capability that measurably changed an outcome in log 17 (see 3.2). Optional (**D2b**): pre-install a non-`three` engine to break the monoculture — held, because it risks a new attractor.

### 3.2 The probe-execution discovery

21 of 22 sessions wrote a probe and never ran it; the one session (B11 claude-opus-5) that hooked its build step to execute the probe found a real balance defect (rivals so rich the win rate was 1/24) and delivered the operator's best-received game of the log. v22 turns this into the **verification route** (three tiers: run directly → hook the build → ship and disclose) and grades honesty accordingly: an unrun probe is a claim.

---

## 4. Size and shape of v22 (honest)

| | v21 | v22 |
|---|---|---|
| bytes | 15 733 | 20 544 |
| structure | header · §1 routes · §2 look · §3 originality · §4 engineering · §5 hard rules + pre-delivery list + deliverables | same, with §1 gaining the verification route and the npm-3D recipe set, §2 the painter's stack + cardboard signature, §3 the novelty/form-era rule, §4 the probe execution + per-level reachability + static audit list, §5 three clauses sharpened |

Growth is +30%, and it is **all generative/capability content** — **zero new bans, zero new warnings**. If the operator wants the prompt size held at v21 level, the trimmable 4 KB are: the static-audit list (§4), the 2D painter's stack (§2), and the recipe bullets in §1 — each of which can move to judge-side notes without changing the contract. A `v22_LEAN` can be cut on request (the R010 v13-vs-LEAN experiment showed LEAN raises stack ambition but loses the guardrails; here the guardrails are already minimal).

---

## 5. Registry and taxonomy updates shipped with v22

| Artifact | Change |
|---|---|
| `benchmark/06` §6.5 | **C24** single-axis wind flight (kite/balloon/seed-glide — 4 sessions, 3 identities, 4 battles; 3 of 4 from the deepseek family); **C25** auction/valuation (3 sessions, 3 battles, Claude family ×3, opus-5 line ×2); **C26 provisional** flock funnelling (log16 grok-4.6 sheep + log17 opus-4-8-thinking Meadowfall, cross-round); post-R018 meta-note recording the fire/grid/growth/lighthouse HOLD and the relocation |
| `benchmark/04` §4.2 | **CONTROL-LEGIBILITY**, **LEVEL-N-SOLVABILITY**, **NOVELTY-COLLISION** |
| `repo-ops/sandbox-tools/e2-probe-harness/` | new verified tool (self-test green: 2 pass paths, 4 failure paths, JSON mode) |
| `challenge/SANDBOX_CAPABILITIES_GUIDE.md` | rewritten to v2: class-by-class measured route table; Blender/Godot marked unreachable in the battle class; probe execution documented as the verification route |
| `README.md` battle log | round 018 row promoted from *planned* to *executed* with the result read |

---

## 6. Promotion gate (unchanged)

v17 remains live. `challenge/BATTLE_PROMPT_v22.md` is a draft for operator review; on approval it becomes the R019 prompt — the field test would answer three falsifiable questions: (1) does the verification route raise the executed-probe count above ~50% of sessions; (2) does the "has this game already been made?" rule reduce clone/minus-systems deliveries without producing a new attractor; (3) where does the field relocate now that kite/wind and auctions are named — the watch item is which unnamed family arrives next (C15 law).
