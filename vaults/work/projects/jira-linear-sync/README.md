# 🔄 Jira ↔ Linear Sync

Bidirectional sync service between **Jira** (support/ops) and **Linear** (engineering).

## Features

- **Status sync**: Jira → Linear (with optional bidirectional mode)
- **Comment mirroring**: Bidirectional with anti-loop markers
- **Flexible mapping**: Configurable status de-para via JSON
- **Dry-run mode**: Test without making changes
- **Webhook-ready**: Simple HTTP endpoint for automation

## Quick Start

### 1. Install dependencies

```bash
cd service
npm install
```

### 2. Configure environment

```bash
cp env.example .env
# Edit .env with your credentials
```

### 3. Configure status mapping

Edit `project/status-mapping.json`:

```json
{
  "meta": {
    "linearProject": {
      "id": "YOUR_LINEAR_PROJECT_ID"
    }
  },
  "jiraStatusNameToLinearStateName": {
    "Open": "Todo",
    "In Progress": "In Progress",
    "Resolved": "Done"
  },
  "linearStateNameToJiraStatusName": {
    "Todo": "Open",
    "In Progress": "In Progress",
    "Done": "Resolved"
  }
}
```

### 4. Run the service

```bash
npm run dev
```

### 5. Trigger sync

```bash
curl -X POST http://localhost:3000/sync \
  -H "Authorization: Bearer YOUR_SYNC_TOKEN"
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `LINEAR_API_KEY` | ✅ | Linear API key |
| `JIRA_BASE_URL` | ✅ | Jira instance URL (e.g., `https://yourcompany.atlassian.net`) |
| `JIRA_EMAIL` | ✅ | Jira user email |
| `JIRA_API_TOKEN` | ✅ | Jira API token |
| `SYNC_TRIGGER_TOKEN` | ✅ | Bearer token for `/sync` endpoint |
| `LINEAR_SYNC_PROJECT_ID` | ❌ | Override project ID (uses mapping file if not set) |
| `PORT` | ❌ | Server port (default: 3000) |
| `DRY_RUN` | ❌ | Set to `1` to disable writes |
| `SYNC_STATUS_MODE` | ❌ | `jira_to_linear` (default), `bidirectional`, or `off` |

## How It Works

### Issue Linking

The service finds Jira issues linked to Linear issues by:

1. **Explicit marker** in Linear description: `<!-- jira-linear-sync jira:ABC-123 -->`
2. **Jira URL** in Linear attachments
3. **Jira key pattern** in title/description (validated against Jira API)

### Status Sync Modes

| Mode | Behavior |
|------|----------|
| `jira_to_linear` | Jira status changes update Linear state |
| `bidirectional` | Both directions sync |
| `off` | Status sync disabled (comments only) |

### Comment Markers

Comments include markers to prevent infinite loops:

```
<!-- jira-linear-sync source:jira key:ABC-123 comment:12345 -->
```

## Architecture

```
┌─────────────┐     POST /sync      ┌─────────────────┐
│   Trigger   │ ──────────────────> │   HTTP Server   │
│  (n8n/cron) │                     │   (server.ts)   │
└─────────────┘                     └────────┬────────┘
                                             │
                                             ▼
                                    ┌─────────────────┐
                                    │ jiraLinearSync  │
                                    │    (core)       │
                                    └────────┬────────┘
                                             │
                        ┌────────────────────┼────────────────────┐
                        ▼                    ▼                    ▼
               ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
               │ linearClient│      │  jiraClient │      │ mappingStore│
               │  (GraphQL)  │      │  (REST v3)  │      │   (JSON)    │
               └─────────────┘      └─────────────┘      └─────────────┘
```

## Deployment

### Docker

```dockerfile
FROM node:20-slim
WORKDIR /app
COPY service/ .
RUN npm ci --omit=dev
CMD ["npm", "start"]
```

### Railway / Render

1. Set environment variables
2. Set root directory to `service/`
3. Build command: `npm install`
4. Start command: `npm start`
