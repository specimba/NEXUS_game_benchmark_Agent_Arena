# BATTLE — Unknown-LLM Round · Paste-Ready Launch Kit

This is the single file to open when you're ready to run a new round on arena.ai. It packages the launch procedure, the per-run scoresheet, and the paste-ready contestant prompt in one place. Everything else in the repo is supporting material.

**Prompt version:** BATTLE_PROMPT **v17** — **now the live prompt** (promoted after v16 won Round 012, the best round in benchmark history). v17 = v16 + the operator's three R013 decisions: (1) **"ship"-wording micro-test** — every "ship/Ship" replaced with "deliver/built" (zero ship-words; tests the operator's priming theory on the C18 cluster); (2) **C18 soft steer** (gravity-well piloting) + (3) **C16 soft steer** (tangible-craft work) — same soft-note form as the C14 line that held in R012 (zero sonar games). *Known confound, logged: the steer and the wording-change both target C18, so R013 answers "can we move the cluster," not "which lever did it."*
**What v16 validated (R012):** 4/5 metrics — first "no flaws" game ever (PRISMA, self-debugged 4 bugs), first opponent AI (IMPACT), materials recipe adopted everywhere, **image-gen used 0 times** (that lever is deliberately left unpushed per operator decision). Convergence is terminal-diagnosis: steers hold for named clusters; unnamed clusters arrive under any regime; novelty is scored judge-side.
**Rubric version:** 02-scoring-rubric §2.0–§2.10
**Anti-gaming version:** 06-anti-bias-anti-gaming §6.1–§6.8 (C11–C16; **C16 craft/sim category-attractor + post-Round-009 meta-finding**: convergence is two-layered — instance-attractors are prompt-fixable, category-attractors only partly so, model-bounded collapse is NOT prompt-fixable. Next phase = controlled pool-level experiments.)
**Ready:** yes — see `battles/round-009-after-action.md` for the C16 deep-dive and the controlled-experiments recommendation, and `battles/v12-merge-design.md` for the v12 base v13 builds on.

---

## Part 1 — Operator runbook (do this)

### 1.1 Pre-flight (5 min)
- [ ] Confirm you can access two blind arena.ai battle slots (or two isolated agent sessions on a comparable platform).
- [ ] Pick a wall-clock budget for both agents (recommended: **90 min** for Battle 2 — enough to iterate + polish, short enough to be honestly one-shot).
- [ ] Pick a hardware/browser profile for evaluation (recommended: your daily driver desktop + one mobile).
- [ ] Note the current UTC time. This is the round start.

### 1.2 Provision the workspace
```bash
python challenge/launch_challenge.py setup \
    --out runs/round-002-formal \
    --agents 2 \
    --budget-min 90

python challenge/launch_challenge.py single-prompt \
    --out runs/round-002-formal
```

This creates two isolated agent workspaces containing only the identical brief + spec + self-QA (no `benchmark/` — see §6.4 Enforcement rules), records the SHA-256 of the brief in `manifest.json`, and emits a paste-ready `SINGLE_PROMPT.md` for the no-repo delivery channel.

### 1.3 Launch (in parallel)
- **Agent A** (arena.ai battle slot 1): paste `SINGLE_PROMPT.md` contents (Part 2 of this file is a duplicate for convenience — either is fine, they're byte-identical).
- **Agent B** (arena.ai battle slot 2): same paste.
- **Do not disclose** any information to either agent beyond the brief. Do not answer clarifying questions with new content. If asked, reply *"Everything you need is in the brief. Make your best call."*
- **Count ships.** For each agent, note in `runs/round-002-formal/notes.txt` how many times they deliver a "here is the final game" style message. **1 = strict-one-shot. > 1 = iterated track.**

### 1.4 Freeze
When each agent reports done (or the 90-min budget is up):
```bash
python challenge/launch_challenge.py finalize \
    --out runs/round-002-formal \
    --agents 2 \
    --ship-count agent1=<N>,agent2=<M>
```

If the agent produced files but you cannot pull them into the workspace directly (arena.ai often keeps builds inside its own sandbox), copy the final HTML/folder into `runs/round-002-formal/agent1/game/` and `agent2/game/` manually before running finalize.

### 1.5 Fingerprint & audit
```bash
python challenge/launch_challenge.py fingerprint \
    runs/round-002-formal/agent1/game \
    runs/round-002-formal/agent2/game

python challenge/launch_challenge.py audit \
    runs/round-002-formal/agent1/game \
    runs/round-002-formal/agent2/game
```

- `fingerprint` writes `fingerprint.json` (stack, deps, asset-count hint). This is the ground truth for §6.6 model attribution — arena UI labels are never trusted.
- `audit` scans for benchmark/rubric/telemetry tokens leaking into the game. Any hit = Critical CONTAINMENT defect.

### 1.6 Blind-label assignment (physical coin flip is fine)
Flip a coin — heads: agent1 → Game A, agent2 → Game B. Tails: swap. Record in `runs/round-002-formal/labels.txt`. **Do not share this mapping with the evaluator until after scoring.**

### 1.7 Score (deploy prompt)
Open `benchmark/deploy/01-deploy-prompt.txt` and follow it to the letter. Score Game A completely, lock it, THEN score Game B, THEN pairwise. Fill out `benchmark/05-reporting-template.md`. Emit evidence per `benchmark/ops/evidence_schema.json`.

### 1.8 Decide
```bash
python benchmark/ops/aggregate_scores.py --evidence runs/round-002-formal/evidence.json
python benchmark/ops/decision_block.py    --evidence runs/round-002-formal/evidence.json
```

### 1.9 Attribute & archive
- Open `manifest.json` — read `fingerprint.json`, resolve model identity, write `identity.json` (arena UI label + fingerprint verdict + any ATTRIBUTION anomaly).
- Merge into `battles/round-002-formal-after-action.md` AFTER the OVERALL is locked. Never before.
- Add a row to the README `## Battle log` section.

---

## Part 2 — Contestant prompt (byte-identical to `challenge/BATTLE_PROMPT.md`)

The paste target below is exactly the v17 prompt. It is intentionally the *only* thing the agent sees. Do not add framing, warnings, hints, or answers to clarifying questions.

> **BEGIN PASTE — copy from the next line all the way through the END PASTE marker, inclusive of headings and blank lines. Do not paraphrase.**

```
[Copy the entire current contents of challenge/BATTLE_PROMPT.md into your agent chat. This
file intentionally does NOT re-embed those bytes here to avoid drift — the launch_challenge.py
single-prompt subcommand emits the same bytes into runs/<round>/SINGLE_PROMPT.md, which is
the canonical paste target for the run.]
```

> **END PASTE.**

To get the actual bytes:
```bash
cat challenge/BATTLE_PROMPT.md          # single-file view
# OR
cat runs/round-002-formal/SINGLE_PROMPT.md   # after step 1.2 above
```

Both are hashed into `manifest.json` at setup time — if the two agents receive different bytes, the round is invalid.

---

## Part 3 — Per-run scoresheet (fill during evaluation)

Copy this block into your evaluator notes and fill it in as you play. Do not compute OVERALL by hand — let `aggregate_scores.py` do it. This scoresheet is a discipline aid, not the source of truth.

```
ROUND:              002-formal
DATE (UTC start):
DATE (UTC end):
BUDGET (min):       90
HARDWARE PROFILE:
BROWSER MATRIX:

===== GAME A =====
Track (from manifest):        strict-one-shot | iterated
Ship count:                   __
Concept (one sentence):
Rendering stack (fingerprint): canvas2d | webgl | webgpu | three.js | dom-css | text | other:
Cliché cluster (§6.5) hit?    none | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 | C9 | C10 | C11 | C12 | C13 | C14 | C15 | C16 | C17 | C18

Category (mean of sub × 2, 0–10):
  T Technical / Code Quality             __ / 10
  M Core Mechanics & Code Craft          __ / 10
  G Gameplay & Human-Perceived Quality   __ / 10
  F Game Flow & Coherence                __ / 10
  V Visual & Presentation                __ / 10   (V0 __ · V8 __ · V9 __)
  A Atmosphere & World Invention         __ / 10
  X Accessibility & Inclusion            __ / 10

Ceilings triggered (list all that apply):
  [ ] CEIL-1  main-path crash / soft-lock
  [ ] CEIL-2  primary loop unreachable
  [ ] CEIL-3  core controls broken (incl. mouse)
  [ ] CEIL-4  persistence fails on fresh browser
  [ ] CEIL-5  first level unbeatable in ~5 min
  [ ] CEIL-6  constant unmuteable audio drone
  [ ] CEIL-7  menu ↔ gameplay state leak
  [ ] CEIL-8  ambition-theater 3D
  [ ] CEIL-9  persistent visual occlusion (unrecovered whiteout / full-screen flash)

Defects logged (count by severity):
  Blocker: __   Critical: __   Major: __   Minor: __   Trivial: __

Strongest beat (SUBJ, cite timestamp):
Weakest moment (OBS, cite timestamp):

===== GAME B =====
[repeat the entire A block]

===== PAIRWISE (open ONLY after both games independently locked) =====
Preferred game:                        A | B | Tie
Reason (2–4 sentences, evidence-cited):
Confidence (LOW | MED | HIGH):
Would you show this to someone?        A | B | Neither | Both
Convergent-cliché present in loser?    yes | no
Convergent-cliché present in winner?   yes | no
Track mismatch?                        (if one is iterated, note here)

===== FINAL =====
DECISION:      [Game A wins | Game B wins | Tie]
OVERALL:       A = __ | B = __ (margin __)
Confidence:    LOW | MED | HIGH
Rationale (from decision_block.py):
```

---

## Part 4 — Post-round handoff

After the round is locked and attributed, produce:

1. **`battles/round-NNN-after-action.md`** — same shape as the prior round records in `battles/`. Include the prompt version under test, the model attribution (resolved from `fingerprint.json`, never the arena UI label — see §6.6), any fingerprint mismatch, which cliché cluster(s) (§6.5, C1–C14) were hit, the defects logged against the taxonomy, and one paragraph on which failure modes the current prompt caught vs missed.

2. **Cliché-cluster registry update** — if the round shows a NEW convergent theme not in §6.5 (C1–C14), add it to that table with `Observed models` and `Round(s)` filled in. Requires ≥2 independent same-round observations from different models (or a direct operator request across consecutive rounds — see C14).

3. **Next-prompt hypothesis** — if the current prompt failed to prevent a convergence or shipped a new defect class, draft the *narrow, targeted* change (one section / one ceiling / one self-QA line) with an explicit anti-recurrence guardrail and a falsifiable prediction for the next round. Follow the R005 §5 / R006 §5 anti-spiral discipline — do not rewrite the prompt.

4. **`README.md` battle-log row** — add a row to the `## Battle log` table (date, summary, link to the after-action file).

See `battles/round-007-after-action.md` for a worked example of all four steps.

---

## Part 5 — Known-good preconditions (sanity check before you start)

Run this from repo root:

```bash
python3 -m py_compile challenge/launch_challenge.py benchmark/ops/aggregate_scores.py benchmark/ops/decision_block.py && echo "harness OK"

grep -q "(v17)" challenge/BATTLE_PROMPT.md && echo "prompt: v17 live (v16 + C18/C16 soft steers + ship-wording micro-test)"
diff -q challenge/BATTLE_PROMPT.md challenge/BATTLE_PROMPT_v17.md >/dev/null && echo "prompt: live file == v17 file (promotion verified)"
BYTES=$(wc -c < challenge/BATTLE_PROMPT.md); [ "$BYTES" -lt 6000 ] && echo "prompt: size OK ($BYTES bytes — lean regime)"
! grep -qiE "ship" challenge/BATTLE_PROMPT.md && echo "prompt: ZERO 'ship' words — micro-test armed (operator priming theory, R013)"
grep -q "why does this experience need to exist in interactive form" challenge/BATTLE_PROMPT.md && echo "prompt: WHY_INTERACTIVE north star present"
grep -q "seven families, all coequal" challenge/BATTLE_PROMPT.md && echo "prompt: 7-family menu present (inspiration-framed)"
grep -q "sonar / radio / frequency tuning" challenge/BATTLE_PROMPT.md && echo "prompt: C14 soft steer present (held in R012 — zero sonar games)"
grep -q "gravity-well piloting" challenge/BATTLE_PROMPT.md && echo "prompt: C18 soft steer present (new in v17)"
grep -q "tangible-craft work" challenge/BATTLE_PROMPT.md && echo "prompt: C16 soft steer present (new in v17)"
grep -q "MeshPhysicalMaterial" challenge/BATTLE_PROMPT.md && echo "prompt: materials+light recipe present (the R012 quality lever)"
grep -q "Run this list once before you deliver" challenge/BATTLE_PROMPT.md && echo "prompt: pre-delivery self-QA list present (the M-4 knob — R012's 'no flaws')"
grep -q "real resistance" challenge/BATTLE_PROMPT.md && echo "prompt: resistance/fail-state clause present"
grep -q "equally to every agent" challenge/BATTLE_PROMPT.md && echo "prompt: sandbox-parity asset gate + receipts present"
grep -q "TRACK: strict-one-shot" challenge/BATTLE_PROMPT.md && echo "prompt: track disclosure present"
grep -qE "M8 |Depth after wow" benchmark/02-scoring-rubric.md && echo "rubric: M8 present"
grep -q "CEIL-9" benchmark/02-scoring-rubric.md && echo "rubric: CEIL-9 present"
grep -q "2.10 Creative-v0" benchmark/02-scoring-rubric.md && echo "rubric: Creative-v0 mapping present"
grep -q "JUDGE-SIDE ONLY" benchmark/06-anti-bias-anti-gaming.md && echo "anti-gaming: registry judge-side-only"
grep -q "| C16 |" benchmark/06-anti-bias-anti-gaming.md && echo "anti-gaming: C16 recorded (R009)"
grep -q "| C17 |" benchmark/06-anti-bias-anti-gaming.md && echo "anti-gaming: C17 recorded (R011)"
grep -q "| C18 |" benchmark/06-anti-bias-anti-gaming.md && echo "anti-gaming: C18 recorded (R012)"
grep -q "track" challenge/launch_challenge.py && echo "harness: track routing present"
```

Expected output: twenty-three OK lines. If any are missing, do not start — inspect `battles/round-012-after-action.md` for what changed and re-verify.

---

*This kit is the operator's single source of truth for launching Battle 2. Everything else in the repository supports it.*
