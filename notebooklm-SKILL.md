---
name: notebooklm
description: >
  Expert skill for interacting with Google NotebookLM via the notebooklm-mcp MCP server.
  Use this skill when the user asks to create, manage, or query NotebookLM notebooks;
  add sources (URLs, files, PDFs, Google Drive docs, text); generate audio overviews,
  videos, slides, mind maps, quizzes, flashcards or reports; take notes; research topics;
  or manage their NotebookLM library. Trigger on any mention of NotebookLM, notebook,
  audio overview, podcast generation from documents, or grounded research.
---

# NotebookLM MCP — Expert Guide

## Overview

This skill enables full control of Google NotebookLM through the `notebooklm-mcp` MCP server
(package: `notebooklm-mcp-cli` by jacob-bd). The server exposes ~35 tools organized into
functional groups. Always check authentication status before starting work.

---

## Prerequisites & Authentication

Before any operation, verify auth is active:
- If tools return auth errors → tell the user to run `nlm login` in their terminal
- Profile default: `default` (can have named profiles via `nlm login --profile <name>`)
- Auth cookies stored at: `~/.notebooklm-mcp-cli/profiles/default/auth.json`

---

## Tool Reference (All 35 Tools)

### 🗂️ NOTEBOOK MANAGEMENT

| Tool | Purpose | Key Parameters |
|------|---------|---------------|
| `notebook_list` | List all notebooks in library | `limit`, `offset` |
| `notebook_create` | Create new notebook | `title` (required) |
| `notebook_get` | Get notebook details + sources | `notebook_id` |
| `notebook_describe` | Get AI summary + suggested topics | `notebook_id` |
| `notebook_rename` | Rename a notebook | `notebook_id`, `title` |
| `notebook_delete` | Delete notebook permanently | `notebook_id` |

**Workflow tip**: Always call `notebook_list` first to get IDs when the user mentions a notebook by name.

---

### 📎 SOURCE MANAGEMENT

| Tool | Purpose | Key Parameters |
|------|---------|---------------|
| `source_add` | Add any source type (UNIFIED) | `notebook_id`, `type`, + type-specific params |
| `source_list` | List sources in notebook | `notebook_id` |
| `source_delete` | Remove a source | `notebook_id`, `source_id` |
| `source_list_drive` | List Drive sources with freshness | `notebook_id` |
| `source_sync_drive` | Sync stale Google Drive sources | `notebook_id` |

**`source_add` type parameter values:**
- `"url"` → add `url` param (website, YouTube video, article)
- `"text"` → add `title` + `content` params (paste raw text)
- `"file"` → add `file_path` param (local PDF, DOCX, TXT, etc.)
- `"drive"` → add `document_id` param (Google Drive file ID)

**Optional `source_add` params:** `wait` (bool, wait for processing), `timeout` (seconds)

---

### 💬 CHAT & QUERY

| Tool | Purpose | Key Parameters |
|------|---------|---------------|
| `chat_message` | Send a message / ask a question | `notebook_id`, `message` |
| `chat_configure` | Configure chat settings | `notebook_id`, `settings` |

**Usage pattern**: Use `chat_message` for grounded Q&A. Responses cite sources within the notebook.
This is the primary tool for "ask NotebookLM about X" requests.

---

### 🎙️ STUDIO — CONTENT GENERATION

| Tool | Purpose | Key Parameters |
|------|---------|---------------|
| `studio_create` | Generate an artifact | `notebook_id`, `type`, `instructions` (optional) |
| `studio_status` | Poll generation status | `notebook_id`, `artifact_id` |
| `download_artifact` | Download completed artifact | `notebook_id`, `artifact_id`, `output_path` |

**`studio_create` artifact types:**
- `"audio"` — Audio Overview / podcast (2 AI hosts discussing the content)
- `"video"` — Video summary
- `"report"` — Written deep-dive report
- `"mind_map"` — Visual mind map
- `"slide_deck"` — Presentation slides
- `"infographic"` — Infographic
- `"data_table"` — Structured data table
- `"quiz"` — Multiple choice quiz
- `"flashcards"` — Study flashcards

**IMPORTANT**: Generation takes 1–5 minutes. Workflow:
1. `studio_create` → get `artifact_id`
2. Poll `studio_status` every 30s until status = `"completed"`
3. `download_artifact` to save the file

---

### 📝 NOTES

| Tool | Purpose | Key Parameters |
|------|---------|---------------|
| `note_list` | List all notes in notebook | `notebook_id` |
| `note_create` | Create a new note | `notebook_id`, `title`, `content` |
| `note_update` | Update note content | `notebook_id`, `note_id`, `content` |
| `note_delete` | Delete a note | `notebook_id`, `note_id` |

---

### 🔬 RESEARCH (Deep Research)

| Tool | Purpose | Key Parameters |
|------|---------|---------------|
| `research_start` | Start deep research job | `notebook_id`, `query` |
| `research_status` | Poll research status | `notebook_id`, `research_id` |
| `research_import` | Import research results into notebook | `notebook_id`, `research_id` |

**Workflow**: Research jobs run asynchronously. Poll `research_status` until done, then `research_import`.

---

### 🏷️ TAGS & ORGANIZATION

| Tool | Purpose | Key Parameters |
|------|---------|---------------|
| `tag_add` | Add tag to notebook | `notebook_id`, `tag` |
| `tag_remove` | Remove tag | `notebook_id`, `tag` |
| `tag_list` | List all tags | — |
| `tag_select` | Filter notebooks by tag | `tag` |

---

### ⚡ BATCH & PIPELINE

| Tool | Purpose | Key Parameters |
|------|---------|---------------|
| `batch_add_sources` | Add multiple sources at once | `notebook_id`, `sources` (array) |
| `pipeline_create` | Create automated pipeline | `notebook_id`, `pipeline_config` |
| `pipeline_run` | Execute a pipeline | `notebook_id`, `pipeline_id` |

---

## Common Task Patterns

### "Crea un notebook sobre [tema]"
```
1. notebook_create(title="[tema]")
2. source_add(notebook_id=..., type="url", url="...")  [repeat per source]
3. notebook_describe(notebook_id=...)  → ver resumen IA generado
```

### "Añade este PDF / archivo a mi notebook"
```
1. notebook_list() → encontrar notebook_id correcto
2. source_add(notebook_id=..., type="file", file_path="C:/ruta/al/archivo.pdf")
```

### "Pregúntale a NotebookLM sobre X"
```
1. notebook_list() → obtener notebook_id
2. chat_message(notebook_id=..., message="[pregunta del usuario]")
```

### "Genera un audio overview / podcast"
```
1. notebook_list() → obtener notebook_id
2. studio_create(notebook_id=..., type="audio")  → obtener artifact_id
3. [esperar 2-5 min] studio_status(notebook_id=..., artifact_id=...) hasta status="completed"
4. download_artifact(notebook_id=..., artifact_id=..., output_path="C:/Users/.../audio.mp3")
```

### "Genera un quiz / flashcards para estudiar"
```
1. notebook_list() → notebook_id
2. studio_create(notebook_id=..., type="quiz")   # o "flashcards"
3. studio_status poll → esperar
4. download_artifact → guardar archivo
```

### "Investiga en profundidad [tema] en mi notebook"
```
1. notebook_list() → notebook_id
2. research_start(notebook_id=..., query="[tema]") → research_id
3. research_status poll (cada 30s) hasta completado
4. research_import(notebook_id=..., research_id=...) → resultados al notebook
```

---

## Context & Performance Tips

- **35 tools consume context**: Prefer targeted calls over exploratory browsing
- **IDs son obligatorios**: Siempre resolver nombres → IDs con `notebook_list` primero
- **Operaciones async**: studio_create, research_start son async — siempre hacer poll de status
- **Rate limits**: Si hay errores, espera 30s y reintenta
- **Google Drive sync**: Usar `source_list_drive` para detectar docs desactualizados
- **Múltiples cuentas**: `nlm login --profile work` para cuenta de trabajo

---

## Error Handling

| Error | Causa | Solución |
|-------|-------|---------|
| Auth error / 401 | Sesión expirada | Usuario ejecuta `nlm login` |
| Notebook not found | ID incorrecto | Ejecutar `notebook_list` y verificar |
| Source processing failed | URL mala o archivo no soportado | Probar diferente URL o convertir archivo |
| Studio timeout | Servidor ocupado | Esperar y reintentar `studio_create` |
| Rate limited | Demasiadas peticiones | Esperar 60s y reintentar |

---

## Installation Reference

```bash
# Instalar (Windows PowerShell)
pip install notebooklm-mcp-cli
# o con uv (recomendado)
uv tool install notebooklm-mcp-cli

# Autenticar con Google
nlm login

# Verificar autenticación
nlm login --check

# Configurar en Claude Code
claude mcp add --scope user notebooklm-mcp notebooklm-mcp
```

**Config en claude_desktop_config.json / settings.json:**
```json
{
  "mcpServers": {
    "notebooklm-mcp": {
      "command": "notebooklm-mcp",
      "type": "stdio"
    }
  }
}
```
