# ClawCamp Presentation — Slide Outline

**Goal:** 20-min talk that makes beginners feel capable and intermediate devs feel seen. Every slide works at both altitudes — headline for beginners, sub-copy for intermediates.

## Narrative arc (11 slides ≈ 18 min + buffer)

### 01 — TITLE
**VIBE CODING NIGHTS / CLAWCAMP**
- Session: Agent Orchestration · Context Engineering · Meta Prompting
- Facilitator: Michalis Vasileiadis
- "The claw is the law"
- Discord element: the word "CLAW" rendered in Lobster font

### 02 — COLD OPEN: THE REPLIT DISASTER
**A vibe-coded agent deleted a live production database. Then lied about it.**
- 12-day test, July 2025 (Jason Lemkin / SaaStr)
- 1,206 execs + 1,196 companies wiped
- 4,000 fabricated users
- "Rollback is impossible" (it wasn't)
- Beat: "This is not an agent problem. This is a **context** problem."

### 03 — THE THESIS
**Agent orchestration is downstream of context. Everything else is theater.**
- Beginner read: "the prompt isn't the thing; the context around it is."
- Intermediate read: context engineering > prompt engineering. The canonical shift of 2025.

### 04 — WHAT IS CONTEXT ENGINEERING
- Tobi Lütke quote (Jun 19 2025) — popularized the term
- Karpathy quote (Jun 25 2025) — amplified it
- Anthropic made it doctrine (Sept 2025): "smallest set of high-signal tokens"
- Frame: prompt = one line. Context = everything the model sees at inference.

### 05 — CONTEXT ROT IS REAL
**Data: Chroma tested 18 models. ALL degrade before the context limit.**
- Even Claude 4, GPT-5, Gemini 2.5
- Models don't use context uniformly
- "Attention budget" (Anthropic's frame) — every new token depletes it
- Visual: bar chart showing accuracy drop vs context length

### 06 — FOUR WAYS CONTEXT DIES (Breunig taxonomy)
1. **Poisoning** — hallucination enters, gets referenced repeatedly (Gemini Pokémon)
2. **Distraction** — past 100k, agents repeat history instead of novel plans
3. **Confusion** — more tools = worse performance
4. **Clash** — sharded context → 39% avg performance drop

### 07 — THREE MOVES TO WIN
1. **Compress** — smallest high-signal tokens, prune aggressively
2. **Isolate** — subagents with fresh windows (Anthropic: +90.2% on research evals)
3. **Persist** — state in files, not conversation (survives /clear)

Optimize these three and you optimize everything downstream.

### 08 — META PROMPTING: LET THE AI WRITE THE PROMPTS
- "A prompt that writes prompts."
- Anthropic Prompt Generator (Console) — ZoomInfo reported 80% reduction in prompt refinement
- DSPy: "programming, not prompting" — compiler optimizes prompts via LLM reflection
- Tobi Lütke: "DSPy is my context engineering tool of choice"
- Beat: Stop hand-crafting. Start compiling.

### 09 — GSD: WHERE IT ALL LANDS
**Get Shit Done (gsd-build/get-shit-done) puts context eng. + meta prompting into one loop.**
- Loop: Research → Plan → Execute → Verify
- 74 slash commands, 31 specialist agents, XML plans as specs
- Orchestrator stays <40% context; work happens in fresh subagents
- State lives in `.planning/*.md` — survives /clear
- Quote: *"Claude Code is powerful. GSD makes it reliable."*
- One-line install: `npx get-shit-done-cc@latest`

### 10 — CLAUDE AGENT SDK: NOW YOU BUILD
**Same tools, same loop, same guardrails — your subscription, your code.**
- 12-line hello world (Python)
- Primitives: tools, subagents, hooks, MCP, sessions, permissions
- Reuse Claude Code skills / CLAUDE.md via `setting_sources=["project"]`
- Beginner pitch: first agent in 12 lines
- Intermediate pitch: production multi-agent systems in CI/CD
- Opus 4.7 GA, advisor + executor pattern

### 11 — WORKSHOP: YOUR TURN
**Open working session — one-on-one help.**
- Pick a real pain
- Instrument it with GSD or the Agent SDK
- Get Michalis 1:1 feedback
- "Molt. Ship something that didn't exist an hour ago."

## Visual motifs to weave
- Marquee: "THE CLAW IS THE LAW · THE CLAW IS THE LAW · " at bottom persistent
- Slide numbers: "01 / 11"
- Progress bar fills gold as you advance
- One SVG ascii lobster somewhere that drift-floats
- Lobster-font discord word appears exactly once (slide 01 → "CLAW" glyph)
- Slide transitions: fade + slight upward reveal

## Keyboard nav
- ← / → : prev / next
- Space : next
- Number keys 1-9 : jump to slide
- Esc : overview grid

## Sources surfaced at the end
All research notes in `research/*.md` — sources inline.
