# AI Guide Index

This folder contains internal AI operating protocols plus curated external references.

## Tag Key
- **Policy**: Operational standards used directly in this repository.
- **Reference**: Technical material used to inform implementation decisions.
- **Optional**: Opinionated or exploratory reading; useful but non-authoritative.

## Documents

| File | Tags | Notes |
| :--- | :--- | :--- |
| [agent-memory-protocol.md](agent-memory-protocol.md) | Policy, Reference | **Primary policy entrypoint for future sessions**; defines APSU GIS Astro memory/execution protocol. |
| [ai-prompt-engineering-report.md](ai-prompt-engineering-report.md) | Reference | Deep-dive report on prompting, agentic patterns, and optimization frameworks. |
| [google-adk-context-aware-multi-agent.md](google-adk-context-aware-multi-agent.md) | Reference | Google ADK context-engineering model for production multi-agent systems. |
| [prompt-compression-llmlingua.md](prompt-compression-llmlingua.md) | Reference | LLMLingua-based prompt compression techniques for cost/latency reduction. |
| [prompt-caching-kv-cache-explainer.md](prompt-caching-kv-cache-explainer.md) | Reference | KV-cache mechanics and prompt-caching intuition/performance tradeoffs. |
| [agents-md-file-guide.md](agents-md-file-guide.md) | Optional | Introductory article on using `AGENTS.md` as an AI behavior contract. |
| [4c-prompt-framework.md](4c-prompt-framework.md) | Optional | Productivity-oriented 4C prompting workflow and examples. |
| [claude-code-agents-orchestration.md](claude-code-agents-orchestration.md) | Optional, Reference | Multi-agent orchestration concepts with practical but opinionated patterns. |
| [claude-45-percent-smarter-techniques.md](claude-45-percent-smarter-techniques.md) | Optional | Anecdotal psychological prompting tactics; treat claims as non-authoritative. |

## Session Start Order
- Start with [agent-memory-protocol.md](agent-memory-protocol.md) as the primary AI policy for this repository.
- Then read [../AGENTS.md](../AGENTS.md) for current project constraints and active todo context.
- Use `guide/` strategy documents when making content or messaging decisions.

## Usage Guidance
- Use [agent-memory-protocol.md](agent-memory-protocol.md) as the policy entrypoint for future sessions.
- Prefer root [../AGENTS.md](../AGENTS.md) for project-specific operating rules.
- Use **Policy** + **Reference** docs when defining implementation standards.
- Use **Optional** docs for ideation, not as mandatory engineering policy.
