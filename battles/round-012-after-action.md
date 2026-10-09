# Battle Round 012 — After-Action Record (v16's first field test)

**Status:** full battle round under **v16** (the prompt built from the operator's five Q&A decisions).
**Source log:** `logs/game-log-12.txt` (12 sessions, 6 battles)
**Operator:** specimba
**Recorded by benchmark:** 2026-08-24 (Ankara)

---

## 1. Headline — v16 produced the best round in benchmark history, and the knobs visibly worked

By the operator's own verdicts, this round contains more "great creation" verdicts than Rounds 001–011 combined:

- **deepseek-v4-flash-low → PRISMA**: *"perfect ball control game 3d with no flaws"* — **the first "no flaws" verdict in 12 rounds.** A materials-gallery ball game (obsidian, glass, gold, liquid surfaces — the operator's Material Lab precedent *turned into a game concept*). And the mechanism is visible in the log: **the agent caught and fixed four of its own bugs mid-session** (inverted input sign, applyForce torque, raycast ground-detection, time-parsing) — the self-QA checklist (the M-4 knob) doing exactly what it was built to do.
- **claude-opus-4-6 → IMPACT**: momentum arena combat with **the benchmark's first opponent AI** — *"very good complete game in simple light dots but made inside great physics… this proves the simple but real games still have great chance with perfect creativity and implementation"* — the operator's own Fall Guys / Gang Beasts comparison.
- **kimi-k3 → PERIHELION**: orbital-harvest WebGL game with real fail states, telegraphed flares, receipts, design notebook, full deliverable compliance — *"countable as game, lightnings pretty well designed, controls feels okay."*
- **qwen3.8-flash-next → 3D glass-making with molten effects**: *"the most sophisticated way we faced before… graphically acceptable"* / *"much more complex and successful."*
- **glm-5.2-max**: *"significant leap in creation finally."*

## 2. Validation metrics (v16 vs. R011)

| Metric | R011 | R012 under v16 | Verdict |
|---|---|---|---|
| **M-1 ambition** | v15.1 arm: 62 stack-mentions | 3D across nearly every session (PRISMA, glass-3D, crystal-3D, PERIHELION WebGL, repairing-3D); 25 stack-mentions; visual-quality verdicts for the first time | ✅ **PASS** |
| **M-2 C14 (sonar/radio/frequency)** | borderline fail (terms returned) | **Zero sonar/radio/frequency games** — the soft C14 steer worked | ✅ **PASS** |
| **M-3 craft-default** | pass (guards were still partly active via v13 arm) | **C16 returned**: glass-craft ×3 instances (qwen3.8 glass-making + glass-blowing, qwen3.7 repairing-craft) | ❌ **FAIL — the accepted trade-off** (bans were retired by operator decision #4; see §4) |
| **M-4 reliability** | FAIL (buggy everywhere) | **Dramatic improvement**: first "no flaws" verdict; visible self-debugging; only gemini's not-starting + qwen's fixable bugs | ✅ **PASS** |
| **M-5 fail-state/story** | partial | Real fail states named and shipped (PERIHELION: star/comet/flare/adrift; PRISMA win states; IMPACT knock-off) | ✅ **PASS** |

**4 of 5 pass — and the single failure is the convergence trade-off the operator accepted with eyes open when retiring the bans.** Note also: **image generation was used zero times** — the entire quality leap came from the *materials + light* teaching (MeshPhysicalMaterial ×6, clearcoat ×9, iridescence ×7, transmission ×7 in the log) and the self-QA list. The visual ceiling moved **without** generated imagery; the assets lever is still unspent.

## 3. The convergence question — the operator's "ship" theory, tested honestly

Operator: *"why they are making gravitational space things? due to that 'ship' wording?"* and *"that should be our prompt fault not that 3T parameter model's fault."*

**C18 registered: spaceship + gravity/orbital** — deepseek-v4-pro + gemini-3.1-pro (battle 1, both), gemini-3.1-pro again (battle 2, "ship and map selection"), kimi-k3 PERIHELION (orbital). Three models, ≥4 instances, one round.

On the "ship" priming theory, both ways:
- **For:** v16 contains "ship" 4–5× ("routinely ship WebGL/WebGPU…", "before you ship", "Ship a complete, polished, modern game"); spaceship games followed.
- **Against:** the gravity/space cluster **predates v16** — R010 LEAN arm (satellite + gravity/black-hole), R011 (korrine's blackhole shooter ×3) — and "Ship a modest complete game" has appeared in every version since **v8** without producing a spaceship epidemic. C17 proved the deeper mechanism: a brand-new cluster ("who is the killer") emerged with **zero** priming.
- **Verdict: unproven, plausible-but-weak.** Gravity/space is most likely the *current default attractor* of the shared prior (the corner the field drifts to now that craft and sound are steered), not a word-level prime. BUT the fix costs four words — replacing "ship/Ship" with "deliver/submit" — so it is a legitimate **free A/B test** for R013. Offered, not pushed.

**The precise mechanism, now fully mapped across 12 rounds:** soft steers **work for named clusters** (the C14 steer held this round — zero sonar games) but **cannot stop unnamed future clusters** (C18 arrived uninvited, exactly like C17 did under full guards). The convergence is generated by the models' shared prior; the prompt can steer known corners, not unknown ones. That is not a prompt defect and not a 3T-model defect — it is a property of open-ended briefs sampling a shared training distribution.

## 4. What this round settles

1. **The operator's five decisions were correct.** Materials+light teaching, sandbox parity, self-QA, menu-as-inspiration, soft steers: 4/5 metrics pass, historic-best quality, the first "no flaws" and first opponent-AI games. The regime deep-dive's predicted quality levers (minus image-gen, which wasn't even needed) landed.
2. **The residual is convergence, and it is the part prompt-tuning cannot finish.** C16 glass returned the moment bans were retired (predicted); C18 gravity/space arrived unprimed (C17's mechanism again). The remaining menu: (a) add a gravity/space soft steer — works for this round, then the next corner opens (the C11→C18 pattern); (b) accept convergence and score novelty **judge-side**; (c) seeded directions (Track C — declined for now, still on the shelf).
3. **Simple-but-real won a battle.** IMPACT (light dots + real physics + opponent AI) taking a battle against a 3D materials game is the operator's own thesis validated: mechanics quality and creativity beat visual complexity when both are present.

## 5. Files changed this pass

| Path | Change |
|---|---|
| `battles/round-012-after-action.md` | (this file) |
| `benchmark/06-anti-bias-anti-gaming.md` | **C18 registered** (spaceship + gravity/orbital); post-R012 note (soft steers hold for named clusters; new clusters still arrive; "ship"-theory analysis) |
| `expert_team/CONSENSUS.md` | Round 012 expert-swarm analysis (all five roles) |
| `README.md` | Round 012 row + Round 013 plan (pending operator Q&A) |
| `logs/game-log-12.txt` | brought in from master |

## 6. Queued for operator decision (Q&A follows)

1. **The "ship" micro-test** — free A/B: v16.1 with "ship" → "deliver."
2. **C16 glass recurrence stance** — accept (the trade-off you signed), or add a craft soft-steer like the C14 one (works, but the next corner opens).
3. **C18 gravity/space steer** — add one (same form as the C14 note), or leave the prompt untouched and handle convergence judge-side.
4. **Promote v16 to the live prompt** — it has now won a real battle round; the live `challenge/BATTLE_PROMPT.md` is still v13.
