# 10 — Field research, October 2026: frontier models, recursive game creation, and creation evidence

**Date of research:** 2026-10-12 (sandbox date; Europe/Istanbul)
**Scope:** (1) arXiv papers on AI game development from roughly May to early October 2026 (the last 5 months); (2) recursive, adaptive or feedback-driven game-creation systems; (3) the models the operator named, checked against public release sources; (4) creation evidence from those models, with emphasis on Three.js.
**Status:** research note only. Nothing here changes a live prompt. Proposals are in `battles/log18-v23-revision-notes.md`.

**How to read the evidence.** Three grades appear below:
- **Paper** — an arXiv or peer-review-style abstract/PDF, read in the search snippet. Results are the authors' claims unless a second source confirms them.
- **Vendor / aggregator** — a lab page, an API changelog, or an index site. Treat vendor benchmark numbers as vendor numbers.
- **Showcase** — a creator's post or a curated list. These are **not** measurements. They show what is possible, not how often it happens.

---

## 1. The models (verified release facts)

| Model (as the operator named it) | Verified release | Public facts | Grade |
|---|---|---|---|
| **Claude Opus 5.5** (run at effort "max") | Released 22 Sep 2026 | 1M context, 128K max output, $4/$20 per million tokens, thinking always on, five effort levels low→max, default **medium** | [1](https://emergent.sh/learn/what-is-claude-opus-5-5) [2](https://www.developersdigest.tech/blog/claude-opus-5-5-release-guide-2026) |
| **GPT-6 Astra** ("GPT Astra 6") | Released 3 Sep 2026 | Flagship; $10/$50 per million; ARC-AGI-3 reported at 99.9% under OpenAI's own harness, but ARC Prize compares only the lower internal figure (62.7%) | [3](https://www.datacamp.com/blog/gpt-6-astra) [4](https://finance.biggo.com/news/14792e0b-7c7f-44aa-b061-3454401f7052) |
| **GPT-6 Sol** | Released 22 Sep 2026 | $2/$10 per million; 1.05M context | [5](https://thenewstack.io/openai-gpt-6-sol-luna-release/) |
| **GPT-6.1 Sol** ("GPT 6.1 SOL") | Released 29 Sep 2026 (DevDay); API id `gpt-6.1-sol` | $2/$10; cached input $0.10; OpenAI says it nearly matches Astra on agentic coding at one-fifth of Astra's price. The Ultrafast variant was announced for "the coming days" | [6](https://www.unite.ai/openai-unveils-gpt-6-1-sol-at-devday-with-new-codex-and-chatgpt-tools/) [7](https://secufocus.com/en/news/gpt-6-1-sol/) |
| **DeepSeek V4.1 Flash** ("Deepseek v4.1 Flash") | Released 10 Sep 2026 | Smallest model in the new V4.1 family; native multimodal input; API name `deepseek-flash`; 1.0M context; MIT license per third-party listing | [8](https://api-docs.deepseek.com/updates/) [9](https://llm-stats.com/models/deepseek-v4.1-flash) |
| **MiMo V2.6 Pro** and **MiMo V2.6 Flash** ("MiMo v2.6 Pro and Flash") | Around 22 Sep 2026 | Pro: 1.02T total / 42B active (MoE); Flash: 309B / 15B active; 1M context; MIT; open weights. Xiaomi's table: DeepSWE v1.1 71.9 (Pro) / 67.9 (Flash), MiMo VisualCoding 72.3 (Pro), Terminal Bench 4.0 34.9 (Pro), ProgramBench 26.5 (Pro) | [10](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL) [11](https://cellcog.ai/blog/mimo-v2-6/) |

**Read-through for our benchmark.**

- **Effort is a first-class variable, and the operator never set it.** Opus 5.5's effort levels change output and cost a lot. One creator's test measured medium at 52 s and $0.56, and max at 22 min 22 s and $5.25 for the same brief. Max added features and polish. Medium was the default. [12](https://dev.to/jaehyun_cho_0dff271e0d2e5/claude-opus-55-effort-levels-tested-low-to-max-4p97) This is a single creator's test, not a benchmark. The lesson is still a design rule: **every battle record must state the effort setting**, or the comparison is not comparable.
- **Vendor and independent scores disagree.** For GPT-6 Astra, the ARC-AGI-3 headline (99.9%) is not the figure ARC Prize compares (62.7%) [4](https://finance.biggo.com/news/14792e0b-7c7f-44aa-b061-3454401f7052). Coding results are close to ties: Astra leads on Terminal Bench 4.0, but on the coding-agent index Fable 5.1 scores 70 to Astra's 67 [13](https://www.mindstudio.ai/blog/gpt-6-astra-benchmarks-analysis). "Newest" is not "best at game creation."
- **MiMo's coding numbers are close to frontier, not above it.** On Xiaomi's table, MiMo Pro is 71.9 on DeepSWE against Opus 5's 74.0 and GPT-5.6 Sol's 73.0 [10](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL). On ProgramBench it is 26.5 against 37.0 [10](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL). Its strength is the visual-coding score (72.3), which is relevant to the front-end and Three.js work we care about.

---

## 2. Papers, May to October 2026 (game development, agents, feedback loops)

Listed by relevance to our battle prompt. Dates are arXiv submission dates.

### 2.1 Recursive and feedback-driven game creation (the systems you heard about)

**A. RSIGame — Recursive Self-Improvement for agentic game development** (arXiv 2609.39045, 30 Sep 2026). [14](https://arxiv.org/abs/2609.39045)
- Two loops. A **local** explore–diagnose–improve loop broadly explores the playable game, prioritises issues, and revises with evidence; an **evolving checklist** accumulates testing guidance. A **global** loop tracks overall quality, **preserves the best checkpoint**, and detects saturation or regression.
- Experience is internalised into the generator through training. The authors report Qwen3.8-27B reaching 61.38 on Godot, above GPT-5.5 one-shot scores, with 11× fewer generation tokens.
- **Why it matters here:** the best-checkpoint rule is the same thing as our proposed fallback rule (§2.1 of the v23 notes). The evolving checklist is what our `design_notebook` already does informally. The training result does not apply to a battle run.

**B. Recursive Game Creator (RGC)** (arXiv 2610.08621, 6 Oct 2026). [15](https://arxiv.org/abs/2610.08621) [16](https://www.alphaxiv.org/abs/2610.08621)
- Four roles: **Designer** (turns user goals and reviewer feedback into a plan), **Builder** (makes the candidate), **Player** (writes a reusable policy that plays the game through its exposed state and legal actions, producing trajectories), **Reviewer** (compares the candidate with the retained version and records an A/B preference, tie, or unavailable).
- Reported results: 77.89 on GameCraft-Bench; strict task success 53.2% on GameASG-Bench (+34.1% over the same-model baseline); a user study showing longer playtime and higher ratings.
- The authors state that **longer proxy playtime alone does not establish human interest**. Good.
- **Why it matters here:** the Player role is the playtester we lack. Our agents cannot play their own games, so the Player should be part of the battle protocol. The Reviewer's **A/B against the retained version** is the right form of the "is this better than the last build?" question. Code for RGC is "coming soon" per the abstract, so it cannot be reproduced yet.

**C. GUI Agents for Continual Game Generation — Play2Code / PlaytestArena** (arXiv 2605.28258, 27 May 2026). [17](https://arxiv.org/html/2605.28258v1)
- A GUI agent loads each game in a browser and plays it through clicks and keys only, with no DOM or code access. A game agent and a GUI agent share memory across rounds.
- Reported: Play2Code reaches 66.8% rubric pass rate, +37.1 over single-pass and +14.6 over agentic-coding baselines. The authors found that GUI playtester feedback is more traceable than a human report, though idiosyncratic.
- **Why it matters here:** the "no DOM access" playtester is a direct recipe for the blind-visuals problem we keep recording. It is the closest published method to the probe we want.

**D. A2Z GameSpec-Bench** (arXiv 2609.39564, 30 Sep 2026). [18](https://arxiv.org/abs/2609.39564)
- 100 long-form Game Design Documents, each turned into a dependency-aware contract. Evaluation combines source inspection with agent-generated test policies for scenario replay and adaptive playtesting.
- Reported: requirement-specific feedback improves GDD fidelity by 10.9% (relative) over self-revision after two rounds.
- **Why it matters here:** the feedback should be specific to requirements, not "fix the bugs." Our revision loop is currently self-revision.

**E. GameASG-Bench** (arXiv 2609.21293, 18 Sep 2026). [19](https://arxiv.org/abs/2609.21293)
- Declares an **evaluation interface before generation**: legal starting scenarios, player-level actions, stable snapshots, rejection behaviour, invariants. 47 browser-native tasks across 12 genres, both 2D and 3D.
- Best mean L2 (browser runtime) check pass rate 93.2%, but best strict task success only 55.3% (26/47). For DeepSeek-V4-Flash, tool access and turn budget raised strict success, and reasoning effort was not monotonic.
- **Why it matters here:** this is the contract-first design. The probe is fixed by the benchmark, not written by the agent. Our v22 asks the agent to write its own probe, so it can pass a probe that tests what it built rather than what the brief required. Also: the same "effort is not monotonic" result as the Opus effort tests.

**F. WorldBench — Three.js voxel world generation judging** (arXiv 2610.10622, 7 Oct 2026). [20](https://arxiv.org/abs/2610.10622) [21](https://arxiv.org/html/2610.10622)
- A judge that **explores the running world** (controls the clock, orbits, navigates) **and reads the code**. The two views disagreed on 32% of required items, mostly code that no frame shows.
- A mutation test removed features by construction. **Code-only judging gave full credit to four of five removed features**, because their code remained in the file. The judge cut credit on removed features by about a third.
- Five frontier models evaluated: Claude Fable 5.1, GPT-6 Astra, Kimi K3, Grok 4.7, Gemini 3.1 Pro.
- **Why it matters here:** this is the strongest argument yet for our probe rule. "The code exists" is not evidence. Measured pixels or measured state changes are. It also gives us a Three.js-specific check list (clock, camera framing, pixel change under a motion burst).

**G. GameCraft-Bench** (arXiv 2606.17861, 16 Jun 2026; GitHub reports a later version). [22](https://arxiv.org/abs/2606.17861) [23](https://github.com/FreedomIntelligence/gamecraft-bench)
- 140 Godot tasks across 15 families. Agents must submit a complete Godot project plus replayable demonstration traces. The verifier replays the traces and scores observed play.
- v1 abstract: the strongest agent reaches only 41.46%, and most score below 40%. The GitHub README reports 65.70% overall for the strongest configuration. The numbers differ across versions, so cite the version.
- **Why it matters here:** submitting **replayable input traces** with the game is a cheap, auditable form of play evidence. We can ask the same of the battle package.

**H. GameDevBench** (arXiv 2602.11103; revised 30 Jun 2026). [24](https://arxiv.org/abs/2602.11103)
- 333 tasks from tutorials; best agent 53.8%. Multimodal (shader, sprite, animation) tasks are the hardest: 33.0% on 2D graphics versus 51.4% on gameplay tasks.
- Two simple feedback channels, image and video, raised GPT-5.4 from 41.1% to 52.0%.
- **Why it matters here:** visual feedback is a measured lift, not a nice-to-have. It supports adding a screenshot review step to the battle protocol, for models that can see images.

### 2.2 Adjacent (lower priority for the battle prompt)

- **SpeedrunBench** (arXiv 2610.08076, 6 Oct 2026): agents improving a route in an "autoresearch-like" loop; frontier agents near world records on simple platformers, slower on longer games. [25](https://arxiv.org/html/2610.08076v1) Relevant to iterative improvement; not to creation.
- **3DCodeBench** (arXiv 2606.01057, 31 May 2026): procedural 3D via code with Blender feedback. Failures mostly come from **API mismatches**, and successful renders still show floating or disconnected parts. Multi-turn refinement helps. [26](https://arxiv.org/abs/2606.01057)
- **Procedura** (arXiv 2608.26238, 26 Aug 2026): agentic 3D as typed, machine-checkable assemblies with a vision critic; the authors report it beats prior 3D-code agents on their judged quality. [27](https://arxiv.org/abs/2608.26238)

### 2.3 Not used (outside the window or off-topic)

MeepleLM (playtester for board games, Jan 2026 revision) is useful background, but outside the 5-month window. [28](https://arxiv.org/html/2601.07251v5)

---

## 3. Creation evidence from the named models (showcases, not measurements)

These are creator-reported. Use them to see what is possible; do not use them as success rates.

**Claude Opus 5.5**
- A curated list of Opus 5.5 games and 3D demos, with creator notes: a browser wuxia action game in Three.js built "over about a day"; an FPS in Three.js with a server; a browser universe simulator; a one-shot Marble Madness-style rewrite with six Three.js courses [29](https://github.com/coolbat/awesome-opus-5.5-usecase).
- A creator reports a 50-player browser battle royale in Three.js built with 24 sub-agents over 12 hours; a boss fight with procedurally generated models, textures and music, no Blender and no image generation [29](https://github.com/coolbat/awesome-opus-5.5-usecase).
- A Spider-Man-style browser demo (third iteration) that combined Blender, image generation and Three.js. The source calls it a prototype, not a released game [30](https://digg.com/tech/quscxw71).

**GPT-6 Astra**
- Creator-run comparisons and demos; one is an aquarium game built from a reference image with an explicit "not a standardized benchmark" caveat [31](https://github.com/magiccreator-ai/awesome-gpt-6-astra).
- A 3D game built in one shot in about 45 minutes, with the creator's claim that image generation supplied the visual target [32](https://decrypt.co/377514/openai-gpt-6-astra-review-shockingly-good) [33](https://aituts.com/gpt6-astra-game-demos/).
- A Three.js reconstruction of a whole city in about 24 minutes, with a day/night toggle (creator post) [32](https://decrypt.co/377514/openai-gpt-6-astra-review-shockingly-good).
- Long iterative builds (about a week for a city; play-while-patch FPS) versus one-shot builds of about 45 minutes [33](https://aituts.com/gpt6-astra-game-demos/).

**Common pattern across both lists:** the strongest creation evidence comes from **image generation as a visual target** plus **Three.js**, and from **iteration**. One-shot builds exist, but the good-looking ones were usually iterated. This matches what the operator praised in the latest round (lit 3D with real shadows) and what the probe research says (test the feature, not the code).

**DeepSeek V4.1 Flash and MiMo V2.6.** I found no game-creation showcase for either model in the sources reviewed. Their verified facts are benchmark and pricing facts (§1). A proper field test is needed before we say anything about their game creation.

---

## 4. Three.js and technique notes (grounded, short)

1. **Test what runs, not what is written** (WorldBench §2.1 F): a removed feature still has its code in the file. Probes must check a state change or a pixel change, for example "day/night changes the sun angle and the frame brightness within N seconds."
2. **Pin the APIs** (3DCodeBench §2.2 E): failures were mostly API mismatches. Our own field logs show the same class of failure: a build-tool tree-shake that dropped CSS variables, and an unlayered CSS rule that beat the utility classes. Battle prompts should pin the library version and say what is known to break.
3. **Image as target, then code** (showcases §3): a generated reference image, used as a target and then re-authored procedurally, is the recurring pattern in strong Three.js results. Our receipts rule already requires disclosure. Keep it.
4. **Keep the best build** (RSIGame §2.1 A): preserve the last green build and compare new versions to it (RGC A/B vs retained). This is the missing piece in our current fix loop.
5. **Playtester in the loop** (Play2Code §2.1 C, RGC §2.1 B): a second pass that plays the build with no source access and reports what it experienced. This can be a second agent, or the same agent in a clean context.

---

## 5. What this changes for the battle prompt (summary; full list in the v23 notes)

| Finding | Change proposed | Source |
|---|---|---|
| Fix loops stop on errors | Keep the last green build; compare new builds to it | RSIGame, RGC |
| Code presence is not feature evidence | Probes assert state or pixel changes; code-only credit is not evidence | WorldBench |
| Agents write probes that test their own build | Brief declares the behaviours to test; the probe must cover each declared behaviour | GameASG-Bench |
| Self-revision is weaker than targeted feedback | Revision prompts cite specific requirements that failed | A2Z GameSpec-Bench |
| Visual feedback raises success | Battle protocol adds a screenshot review step where the model can see images | GameDevBench |
| Effort setting changes results a lot | Battle records state the effort setting in the ENV line | Opus effort test; GameASG-Bench |
| API mismatch is the common failure | Pin library versions; list known breakage | 3DCodeBench |

---

## 6. Limits of this research

- Search snippets and abstracts were read; full PDFs were not read end to end for every paper. Numbers are as reported by the authors.
- Model facts come from release notes and third-party summaries. Benchmark numbers mix vendor and independent sources. Where sources disagreed (e.g. GPT-6 Astra ARC-AGI-3), both are given.
- Showcases are creator-reported. None were reproduced here.
- No DeepSeek or MiMo game-creation evidence was found in the sources checked.
