---
description: Run a project locally
allowed-tools: Bash, Read
argument-hint: <project-path>
---

# Run Project Locally

Run the project at `/vaults/$ARGUMENTS/`.

## Workflow

1. Locate project in `/vaults/$ARGUMENTS/`
2. Detect type from config files (package.json → Node, requirements.txt → Python, etc.)
3. Check dependencies (node_modules, venv)
4. Check .env configuration
5. Run with appropriate command:
   - Node.js: `npm run dev` > `npm start` > `node <main>`
   - Python: `python3 -m <name>` > `python3 main.py`
   - Docker: `docker-compose up`
