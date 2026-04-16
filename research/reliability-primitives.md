# Reliability Primitives — Research Notes

## Key quotes (verified)

**Anthropic — Building Effective Agents (Dec 2024):**
> "One rule of thumb is to think about how much effort goes into human-computer interfaces (HCI), and plan to invest just as much effort in creating good _agent_-computer interfaces (ACI)."
> "Poka-yoke your tools. Change the arguments so that it is harder to make mistakes."
Source: https://www.anthropic.com/engineering/building-effective-agents

**Pydantic AI:**
> "Pydantic AI is designed to give your IDE or AI coding agent as much context as possible for auto-completion and type checking, moving entire classes of errors from runtime to write-time."
Source: https://ai.pydantic.dev/

**DSPy Assertions paper (Singhvi et al., 2023):**
> "LM Assertions improve not only compliance with imposed rules but also downstream task performance, passing constraints up to 164% more often and generating up to 37% more higher-quality responses."
Source: https://arxiv.org/abs/2312.13382

## Claude Code hooks (verified)
- **PreToolUse** — fires before every tool call. Returns `permissionDecision: "allow"|"deny"|"ask"|"defer"`. **Precedence: deny > defer > ask > allow.** Exit code 2 blocks the tool call. *This is the gate primitive.*
- **PostToolUse** — ledger hook. Fires after every tool with both `tool_input` and `tool_response`.
- **Stop** — fires when the turn ends (Rayyan's atomic-commit-gate lives here).
- **SessionStart / UserPromptSubmit** — context-injection hooks.
Source: https://code.claude.com/docs/en/hooks

## Real reliability failures
- **Replit prod DB delete (July 2025)** — Fortune retrospective: https://fortune.com/2026/03/24/ai-agents-are-getting-more-capable-but-reliability-is-lagging-narayanan-kapoor/
- **OpenAI Operator — $31.43 Instacart purchase** when asked to "find cheap eggs" (Washington Post, 2025). A typed `Verb.purchase(confirm_required=True)` with an `approval_gate` hook prevents this class of failure.

## Other sources
- https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- https://ai.pydantic.dev/output/
- https://arxiv.org/abs/2501.10868 (JSONSchemaBench)
- https://www.langchain.com/langgraph

## Flags
- No canonical attributed "can't improve what you can't measure" quote from LangSmith/Braintrust — invoke Drucker if citing.
- Instructor quote is composite paraphrase.
