# Deep Dive — Van Gogh Town (GPT-6-Astra Max): the in-regime ceiling just moved

**Source:** [X post by Peter Gostev (@petergostev), 2026-09-04](https://x.com/petergostev/status/2095776685807346105) · hosted: https://van-goghs-town.surge.sh
**Recorded by benchmark:** 2026-09-04 (Ankara) · **Verification:** live site fetched 2026-09-04 (title "A town made of paint — Stand inside the painting", all six destinations present); X post + key replies fetched same day. Video in the post; full prompt truncated in the thread (partial text captured below).

---

## 1. What it is

**GPT-6-Astra (Max)** turned **six Van Gogh paintings into one continuous, walkable
Three.js town** — in a single agent pass. Author's thread replies:

> "Zero iterations, I didn't even realise straight away how extensive it was."

The live site confirms the shape:

| Stop | Painting |
|---|---|
| 01 | The Bedroom (Arles · 1888) — *wake inside it* |
| 02 | Café Terrace at Night (Place du Forum · 1888) — *step out the door onto it* |
| 03 | Starry Night Over the Rhône (Arles · 1888) — *walk down to it* |
| 04 | Wheatfield with Crows (Auvers-sur-Oise · 1890) |
| 05 | Sunflowers (Arles · 1888) |
| 06 | The whole living town — "a continuous, painted geography" |

Plus: **time-of-day/light states** ("the same hour, a different breath", "each painting
keeps its own colour"), **living brushstroke quality control** (Light/Balanced/Rich —
"the distant strokes grow broader", "the paintings keep their shape"), and a **save-
photograph** mode. Partial prompt text (from the thread, truncated at "Show more"):

> "Create a maximum-ambition Three.js world in which Van Gogh's most famous paintings
> are connected into one continuous living town the viewer can walk through: wake inside
> The Bedroom, step out the door onto the Cafe Terrace at Night, walk down to the
> Starry Night Over the Rhone …"

## 2. Why this is a benchmark event, not just a nice demo

1. **Peter Gostev is arena.ai's AI-capability lead — this was almost certainly built in
   the SAME production regime as our Track A agents** (one session, one agent, no
   repo multi-agent orchestration, hosted on surge.sh from the sandbox). The
   regime-deep-dive's 2026-08 finding — *"the visual-quality ceiling is the production
   regime (no imagery, no iteration, single agent), not the model or prompt"* — was
   drawn from a pre-Astra evidence set. This sighting **revises it**: a Max-tier
   frontier model inside the single-session regime delivered a 20.5K-view, emotionally
   described ("pretty magical", "first time I've felt anything at all playing one of
   these") continuous painted world with **zero iterations**. The binding variable was
   the **model class**, and the model class just moved. Addendum filed in
   `battles/regime-deep-dive.md`.
2. **Top commenter @johnroodepic names the actual capability**: *"the model didn't
   render six paintings. it invented the missing geography between them and kept the
   style coherent enough to walk through. that's worldbuilding, not image
   generation."* — i.e., coherent *interpolation between authored set-pieces* + a
   walkable frame. That is a creative-construction skill our rubric's V0/V8/A6 and the
   S9 creative probe are designed to catch — this is the calibration bar for
   "surprise/inversion that would make a judge talk after playing".
3. **Prompt anatomy — what the winning prompt actually does** (as far as visible):
   - **"maximum-ambition"** — an explicit ceiling-raising frame (our v19 CORE still says
     "Push the sandbox as far as it goes… use it" — same spirit; this demo proves the
     ceiling is reachable in-regime, so that framing is not empty).
   - **Spatial-journey continuity**: wake *inside* A → step *out the door onto* B →
     walk *down to* C. The structure is *connected geography with experiential verbs*
     ("wake inside", "step out onto"), not a feature list and not a technique list.
   - **Canonical cultural anchors as the asset source**: six famous paintings = the
     content IS the texture library, drawn from the model's own knowledge. No external
     assets needed — which is exactly our offline/self-contained constraint.
   - No materials-recipe vocabulary (no MeshPhysicalMaterial/clearcoat… visible in the
     excerpt) — the painterly look came from *style coherence of the content*, not from
     material-property instructions.
4. **Reliability caveats from the thread itself — our gates stay justified:**
   - @chenerTR: *"Opened the website but everything is red"* → even this showcase has a
     device/render failure path → CEIL-8/CEIL-9 ("finish it on a fresh load", graceful
     fallback) remain exactly right.
   - @alphashark: *"Three.js's biggest cost at this scale… keeping 6 texture atlases in
     GPU memory without the mobile tab dying… baking the paintings into a single atlas
     with a UV remap would've cut draw calls from ~6 down to 1"* → the T6/V7
     cross-device performance criteria remain non-trivial even for a showcase.
   - @Distractosphere: *"how about GPT-6-Astra(low) nobody talking about it"* → the magic
     is tier-dependent; matches our standing finding that low/flash tiers produce
     materially weaker builds. Pool composition matters as much as the prompt.

## 3. What transfers to NEXUS — and what does not

**Transfers (do not touch the live prompt yet — log for the v20 conversation):**

1. **The "connected geography / experiential journey" pattern as an ambition structure.**
   Not "make a town of paintings" (content = instant C-cluster if two agents get the same
   anchors) — but the *frame*: a world made of distinct, authored set-pieces that the
   player moves **through**, each with its own coherent mood, connected by invented
   geography the agent must make convincing. This is a *structure*, not an instance; a
   v20 candidate arm, held prompt, not live.
2. **"The viewer can walk through" = presence as first-class.** Our briefs allow any
   camera; the demo's emotional hit ("Stand inside the painting") came from
   first-person presence inside a *known* world. Worth one calibration note for judges:
   a walkable art-world can out-emote a mechanics game — A1/G6/V0 anchors cover it; no
   rubric change needed.
3. **Style-coherence of the whole, not polish of the hero screen** — the town holds its
   painted style across six distinct sources and the spaces *between* them. That is
   exactly our V0/V1 "sustained across entire run" anchor, at a level we have never seen
   in a battle build. When a battle entry approaches this, V0=5 + V8/A6 discussion is the
   correct judge-side response.

**Does NOT transfer:**

- The prompt's **named anchors** (six specific paintings) — under our fairness model both
  agents get the identical brief, and identical canonical anchors would manufacture the
  convergence we've spent 19 clusters avoiding. Single-agent showcases can afford
  specificity; head-to-head battles cannot. The negative-space/no-examples doctrine
  stands.
- "Zero iterations" as a *requirement* — it is a property of the model, not something a
  prompt can enforce; our iterated-track disclosure rules stay.

## 4. Metric mapping (for when a battle build approaches this class)

| NEXUS lens | Expected read |
|---|---|
| M-1 ambition / visual | Would be the top of the historical distribution; V0 4-5 territory with "sustained across entire run" evidence |
| V9 (working heavy-tech) | 3D + shader-y brushwork that runs = the "how did this run in a browser?" anchor; but CEIL-8/9 apply if any device path breaks (see chenerTR) |
| V8 / A6 / S9 | "invented the missing geography between the paintings" = exactly the surprise/world-invention the creative probe hunts for |
| A1 / G6 | "First time I've felt anything at all" = the emotional-coherence ceiling judges should know is reachable |
| T6 / V7 / T5 | texture-atlas/GPU-memory critique + "everything is red" = cross-device robustness is the part showcases most often leave on the table |

## 5. NEXUS actions (this pass)

- **`ADOPTED`** — this deep-dive filed; dated addendum appended to
  `battles/regime-deep-dive.md` (Fact 1 / ceiling claim revised: in-regime ceiling is
  model-tier-dependent and moved with GPT-6-Astra Max).
- **`R015 POOL NOTE`** — if GPT-6-Astra Max is reachable in the arena sandbox, it belongs
  in the v19 CORE field-test pool (and any v17/v18/v19 controlled comparison) as the
  current visual frontier reference; the tweet implies the (Max) tier is where the
  capability lives.
- **`v20 CANDIDATE (held, not live)`** — an "experiential connected-geography" ambition
  structure arm, without named content anchors. Requires its own controlled run before
  any promotion; do NOT add content examples to the live brief (convergence doctrine).
- **`JUDGE CALIBRATION`** — share this sighting with the jury as an external quality
  reference for V0/V8/A1/G6 anchors: it is what "near-commercial + authored point of
  view" looks like in 2026 Q3.
