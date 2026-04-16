# Claude Agent SDK — Research Notes

## What it is
Framework giving you Claude's capabilities as a library. Python + TypeScript. The same tools, agentic loop, and context management that power Claude Code — programmatically. Lives at [code.claude.com/docs/en/agent-sdk](https://code.claude.com/docs/en/agent-sdk).

**Relation to Claude Code**: The SDK *is* Claude Code as a library. Claude Code is the interactive CLI; the Agent SDK is the same engine for custom apps. Both share primitives (tools, hooks, sessions, subagents, MCP servers).

## Hello World (Python, 12 lines)
```python
import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions

async def main():
    async for message in query(
        prompt="Find and fix the bug in auth.py",
        options=ClaudeAgentOptions(allowed_tools=["Read", "Edit", "Glob"]),
    ):
        print(message)

asyncio.run(main())
```

## Hello World (TypeScript)
```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

for await (const message of query({
  prompt: "Find and fix the bug in auth.ts",
  options: { allowedTools: ["Read", "Edit", "Glob"] }
})) {
  console.log(message);
}
```

## Primitives
- **Tools**: Read, Edit, Bash, Glob, Grep, WebSearch, WebFetch, Monitor, AskUserQuestion
- **Permissions**: allowed_tools, permission_mode ("acceptEdits", "dontAsk", "auto", "bypassPermissions")
- **Hooks**: PreToolUse, PostToolUse, Stop, SessionStart, SessionEnd
- **Subagents**: spawn specialized agents via `agents` dict
- **MCP servers**: Playwright, databases, 300+ community servers
- **Sessions**: resume=session_id, fork to explore branches
- **Skills/commands reuse**: `setting_sources=["project"]` pulls in CLAUDE.md, skills, etc.

## Pitch
- **Beginners**: "First agent in 12 lines. No loop, no orchestration — just async iteration."
- **Intermediates**: "Production multi-agent systems: hook gates, subagents, MCP, sessions, CI/CD-ready."

## Quotable
- "Claude Agent SDK is Claude Code as a library — same tools, same loop, same guardrails, any language."
- "Write agents for CI/CD and automation. Write CLI tools for interactive dev. Use both."
- "Hooks audit. Subagents split. Sessions persist. Built-in."

## Recent (April 2026)
- Opus 4.7 GA with `xhigh` effort level
- Advisor + Executor pattern (fast executor + high-intelligence advisor mid-generation)
- Agent SDK v0.2.111+ required for 4.7

## Sources
- https://code.claude.com/docs/en/agent-sdk/overview
- https://code.claude.com/docs/en/agent-sdk/quickstart
- https://github.com/anthropics/claude-agent-sdk-python
- https://github.com/anthropics/claude-agent-sdk-typescript
- https://github.com/anthropics/claude-agent-sdk-demos
