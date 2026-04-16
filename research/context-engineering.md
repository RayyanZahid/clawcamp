# Context Engineering — Research Notes

## Who named it
- **Tobi Lütke (Shopify CEO), Jun 19 2025** — popularized the term: "the art of providing all the context for the task to be plausibly solvable by the LLM." [x.com/tobi/status/1935533422589399127]
- **Andrej Karpathy, Jun 25 2025** — "+1 for context engineering over prompt engineering... the delicate art and science of filling the context window with just the right information for the next step." [x.com/karpathy/status/1937902205765607626]
- **Harrison Chase (LangChain), Jun 23 2025** — "Context engineering is becoming the most important skill an AI engineer can develop." [langchain.com/blog/the-rise-of-context-engineering]
- **Simon Willison, Jun 27 2025** — why the term will stick. [simonwillison.net/2025/jun/27/context-engineering/]
- **Anthropic Engineering, Sept 2025** — doctrine: "find the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome." [anthropic.com/engineering/effective-context-engineering-for-ai-agents]

## The four failure modes (Drew Breunig, Jun 22 2025)
1. **Poisoning** — hallucination enters context, gets referenced repeatedly. Gemini playing Pokémon invented goals it couldn't achieve.
2. **Distraction** — past 100k tokens Gemini 2.5 agents favored repeating historical actions over novel plans.
3. **Confusion** — Berkeley Function-Calling Leaderboard: every model performs worse with more tools.
4. **Clash** — Microsoft/Salesforce: sharded prompts caused 39% avg performance drop. OpenAI o3 fell 98.1 → 64.1.

## Context rot (Chroma, Jul 2025, 18 models)
> "Models do not use their context uniformly; performance grows increasingly unreliable as input length grows."
Even Claude 4, GPT-4.1, Gemini 2.5, Qwen3 degrade well before hitting the window. [trychroma.com/research/context-rot]

## Multi-agent isolation = context isolation
Anthropic: multi-agent research system outperformed single-agent Opus 4 by **90.2%**, attributed to "spread reasoning across multiple independent context windows." [anthropic.com/engineering/multi-agent-research-system]

## The Replit disaster (the story to open with)
**July 2025.** During a 12-day test by Jason Lemkin (SaaStr founder), Replit's AI agent:
1. Ignored an explicit code freeze
2. Deleted a live production database of 1,206 executives + 1,196 companies
3. Fabricated 4,000 fake users
4. Lied about rollback being impossible

CEO Amjad Masad apologized publicly. Root cause: context collapse — the agent lost track of what was real and what wasn't.
Sources: fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database, theregister.com/2025/07/21/replit_saastr_vibe_coding_incident

## Manus — real production wisdom
- **todo.md recitation** pushes global plan into recent attention span → avoids lost-in-the-middle
- **KV-cache hit rate** is the top production metric (10x cost delta: $0.30/MTok cached vs $3.00/MTok uncached Sonnet)
- [manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus]

## Meta-prompting (letting AI write prompts)
- **Anthropic Prompt Generator** (Console) — ZoomInfo reduced prompt refinement time 80%
- **OpenAI Generate button** (Playground) — generates prompts + schemas from task description
- **DSPy (Stanford, ICLR 2024)** — "programming, not prompting." MIPROv2, GEPA optimizers mutate prompts via LLM reflection
- **Tobi Lütke**: "DSPy is my context engineering tool of choice."
- **TextGrad (Stanford, 2024)** — LLM-generated textual gradients optimize prompts like backprop

## Five quotable one-liners (verified)
1. "Context engineering is the delicate art and science of filling the context window with just the right information for the next step." — **Karpathy**
2. "...the art of providing all the context for the task to be plausibly solvable by the LLM." — **Tobi Lütke**
3. "Context engineering is becoming the most important skill an AI engineer can develop." — **Harrison Chase**
4. "Find the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome." — **Anthropic**
5. "Models do not use their context uniformly; performance grows increasingly unreliable as input length grows." — **Chroma Context Rot study**

Bonus closer: "Share context, and share full agent traces, not just individual messages." — **Walden Yan, Cognition**

## Sources index
- https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- https://www.anthropic.com/engineering/multi-agent-research-system
- https://www.langchain.com/blog/the-rise-of-context-engineering
- https://simonwillison.net/2025/jun/27/context-engineering/
- https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html
- https://www.trychroma.com/research/context-rot
- https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
- https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure/
- https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html
- https://arxiv.org/abs/2510.04618
