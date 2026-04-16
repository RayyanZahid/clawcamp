# CDP vs Playwright · API-first · Rate-limit — Research Notes

## Token cost (measured by practitioners)
- **Playwright MCP**: 13.7k tokens of tool schema; ~114k tokens for a 10-step automation (Zechner, Zhang)
- **Chrome DevTools MCP**: 17–18k schema; ~50k for 10 steps
- **agent-browser / raw CDP**: ~7k for 10 steps
- Raw CDP over WebSocket is a single hop. MCP adds a JSON-RPC hop per call.

## Quotable lines
**Steve Kinney:**
> "Playwright is in the business of driving a browser, and Chrome DevTools MCP is in the business of debugging one."
> "Tool schemas are heavy. Agents pay for them on every turn. Slim modes are how the platforms admit it without saying it."
Source: https://stevekinney.com/writing/driving-vs-debugging-the-browser

**Mario Zechner:**
> "Agents can run Bash and write code well. Bash and code are composable. So what's simpler than having your agent just invoke CLI tools and write code?"
Source: https://mariozechner.at/posts/2025-11-02-what-if-you-dont-need-mcp/

**Marc Brooker (AWS), Exponential Backoff And Jitter (March 2015):**
> "Jittered backoff should be considered a standard approach for remote clients."
Full Jitter formula: `sleep = random(0, min(cap, base * 2^attempt))`
Source: https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/

## Claude Code + Chrome attach (the recommended way)
- `claude --chrome` attaches to your real Chrome via native-messaging + `chrome.debugger.attach(tabId, "1.3")` — CDP under the hood.
- Docs warn: *"Enabling Chrome by default in the CLI increases context usage since browser tools are always loaded."*
- Official plugin: claude.com/plugins/chrome-devtools-mcp

## When Playwright MCP still wins
Weird auth flows · heavy JS/SPA waits · shadow DOM · cross-browser parity · ARIA-first element targeting when DOM is unknown.

## API-first pattern
- Will Schenk, *Reverse engineering APIs using Chrome DevTools* (2019): https://willschenk.com/howto/2019/reverse_engineering_apis_using_chrome/
- Joyce Lin (Postman): https://medium.com/better-practices/reverse-engineering-an-api-403fae885303
- OpenAPI DevTools (auto-generates OpenAPI specs from live traffic)

## Rate-limit horror stories
- **Telegram (Telethon FAQ):** *"any third-party library is prone to cause accounts to appear banned… The best advice is to not abuse the API, like calling many requests really quickly."* FloodWaitError surfaces `e.seconds`. Check @SpamBot.
- **LinkedIn:** sued Proxycurl to shutdown (July 2025); removed Apollo.io + Seamless.AI (March 2025). First offense: 24–72h restriction. Third offense: permanent.

## Full source index
- https://stevekinney.com/writing/driving-vs-debugging-the-browser
- https://mariozechner.at/posts/2025-11-02-what-if-you-dont-need-mcp/
- https://dev.to/chen_zhang_bac430bc7f6b95/why-vercels-agent-browser-is-winning-the-token-efficiency-war-for-ai-browser-automation-4p87
- https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/
- https://github.com/ChromeDevTools/chrome-devtools-mcp
- https://code.claude.com/docs/en/chrome
- https://docs.telethon.dev/en/stable/quick-references/faq.html
- https://www.linkedin.com/help/linkedin/answer/a1340567
