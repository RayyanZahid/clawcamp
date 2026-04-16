# Human-in-the-Loop — Research Notes

## Canonical references (2024-2026)
- **HumanLayer (Dexter Horthy, YC F24)** — SDK adding approval gates to agents. Decorators: `@require_approval`, `human_as_tool`. Slack/email/SMS routing. Tagline: *"Close your editor forever."* https://www.humanlayer.dev/
- **12-Factor Agents (Horthy, 2025)** — canonical HITL manifesto. Factor 7: *"Contact humans with tool calls."* https://www.humanlayer.dev/12-factor-agents
- **Anthropic — Claude Code auto-mode**: https://www.anthropic.com/engineering/claude-code-auto-mode
- **Cognition — Closing the Agent Loop**: https://cognition.ai/blog/closing-the-agent-loop-devin-autofixes-review-comments
- **Latent Space / swyx — Agent Labs**: https://www.latent.space/p/agent-labs
- **Hamel Husain — Field Guide to Rapidly Improving AI Products**: https://hamel.dev/blog/posts/field-guide/
- **DAgger → HG-DAgger → ASkDAgger** — interactive imitation learning lineage. https://arxiv.org/abs/1810.02890, https://arxiv.org/abs/2508.05310

## The "drift" problem (named in literature)
- **Goal drift** — arXiv:2505.02709 "Evaluating Goal Drift in Language Model Agents"
- **Specification gaming / reward hacking** — Lilian Weng: https://lilianweng.github.io/posts/2024-11-28-reward-hacking/
- **Memory poisoning / long-horizon goal hijacks** — Lakera: https://www.lakera.ai/blog/agentic-ai-threats-p1

## Best quotes
**Dexter Horthy (12-Factor Agents):**
> "Most successful AI products aren't purely agentic loops, but combine deterministic code with strategically placed LLM decision points."

**swyx (Agent Labs):**
> Agent Labs "prioritize speed, auditable/human-in-the-loop control and multiturn interactivity."

**Hamel Husain:**
> "The teams who succeed barely talk about tools at all. Instead, they obsess over measurement and iteration."

**Cognition (product copy):**
> "Closing the agent loop."

## Validate → Summarize → Approve → Act
**No canonical source** for this exact 4-step phrasing. Closest equivalents:
- "Plan → Approve → Act" (Claude Code plan mode)
- "Propose-Confirm-Execute" (HumanLayer docs, informal)
- DAgger "query-then-act" cycle

**This phrasing is original to Rayyan** (life/CLAUDE.md:181, inherited from Sandbox VR). Lean into it as his coinage.

## Claude Code HITL primitives
- Permission modes: default, acceptEdits, plan, bypassPermissions, auto (classifier-routed), dontAsk
- AskUserQuestion tool (first-class primitive)
- PreToolUse hooks: *"the only hook that can block actions. Use it for security gates."* Precedence: deny > defer > ask > allow.

Docs: https://code.claude.com/docs/en/permission-modes · https://code.claude.com/docs/en/hooks

## Flag
"Saves MONTHS" is directionally supported by Hamel + Cognition writeups but not quantified in a single paper. Don't attribute a specific number.
