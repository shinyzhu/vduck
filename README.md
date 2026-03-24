# HiDestina

A modern, beautiful Express chat application for conversing with **custom LLMs**, using **custom MCP tools**, and applying reusable **skills** (system prompt instructions).

## Features

- 💬 **Multi-conversation history** — create, browse, and delete chat histories
- 🤖 **Custom LLM providers** — connect any OpenAI-compatible API (OpenAI, Ollama, DeepSeek, LM Studio, etc.)
- 🔧 **MCP tools** — add Model Context Protocol servers to give the LLM tools (web search, file access, databases…)
- 🧠 **Skills** — define reusable system prompt instructions and selectively enable them per conversation
- ⚡ **Streaming responses** — real-time token streaming with an agentic tool-call loop
- 🌙 **Dark / light mode** — toggle with one click
- 📱 **Responsive** — works on desktop and mobile

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy and edit environment variables (optional)
cp .env.example .env

# 3. Start the server
npm start
```

Then open **http://localhost:3000** in your browser.

## Configuration

### LLM Providers

Click **🤖 LLMs** in the sidebar → **＋** to add a provider.

| Field | Example |
|---|---|
| Name | OpenAI |
| Base URL | `https://api.openai.com/v1` |
| API Key | `sk-…` |

**Works with**: OpenAI, Azure OpenAI, Anthropic (via proxy), Ollama (`http://localhost:11434/v1`), LM Studio, DeepSeek, Groq, Together AI, and any OpenAI-compatible endpoint.

### MCP Tools

Click **🔧 MCP** in the sidebar → **＋** to add an MCP server.

| Field | Example |
|---|---|
| Name | File System |
| Server URL | `http://localhost:3001/mcp` |

MCP servers must expose a Streamable HTTP or SSE endpoint.
Click the **⟳** icon next to a server to discover its tools.

### Skills

Click **🧠 Skills** in the sidebar → **＋** to create a skill.

| Field | Description |
|---|---|
| Name | Short label shown in the UI |
| Description | Optional summary of what the skill does |
| Content | System prompt instructions injected at the start of the conversation |

Skills are injected as a `system` message before the conversation history whenever they are enabled. You can toggle individual skills on/off globally or select a specific subset per conversation using the skills dropdown next to the chat input.

## Architecture

```
HiDestina/
├── src/
│   ├── server.js              # Express entry point
│   ├── store.js               # JSON file-backed store
│   ├── routes/
│   │   ├── chat.js            # Streaming chat + agentic tool loop
│   │   ├── conversations.js   # Conversation CRUD
│   │   ├── llm.js             # LLM provider CRUD
│   │   ├── mcp.js             # MCP server CRUD + tool refresh
│   │   └── skills.js          # Skills CRUD
│   └── services/
│       ├── llmService.js      # OpenAI-compatible streaming
│       └── mcpService.js      # MCP client (Streamable HTTP / SSE)
├── public/
│   └── index.html             # Single-page chat UI
└── data/
    └── store.json             # Persisted data (auto-created)
```

## Development

```bash
npm run dev   # auto-restarts on file changes (uses node --watch)
```
