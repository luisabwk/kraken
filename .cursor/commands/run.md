# Run Project Locally

## Overview
This command allows you to run projects locally in the terminal. Simply provide the project folder name as a parameter.

**Usage**: `/run <project-name>`

**Example**: `/run work/projects/my-app/project`

---

## Parameter

| Parameter | Description | Example |
|-----------|-------------|---------|
| `project-name` | Project path inside `/vaults/` | `work/projects/my-app/project`, `personal/projects/data-analysis/project` |

---

## Execution Workflow

### 1. Locate the Project
- [ ] Search for project in `/vaults/<project-name>/`
- [ ] If not found directly, search in `/vaults/` subdirectories
- [ ] Validate that the directory exists

### 2. Detect Project Type
Check configuration files to identify the type:

| File | Project Type | Default Command |
|------|--------------|------------------|
| `package.json` | Node.js | `npm run dev` or `npm start` |
| `requirements.txt` or `pyproject.toml` | Python | `python main.py` or `python -m <module>` |
| `Cargo.toml` | Rust | `cargo run` |
| `go.mod` | Go | `go run .` |
| `Makefile` | Make | `make run` |
| `docker-compose.yml` | Docker | `docker-compose up` |

### 3. Check Dependencies
- [ ] For Node.js: verify if `node_modules/` exists
  - If not, run `npm install` first
- [ ] For Python: check virtual environment
  - If needed, create venv and install dependencies
- [ ] For others: check specific requirements

### 4. Check Environment Variables
- [ ] Check if `.env` or `.env.example` exists
- [ ] Alert if required variables are not configured

### 5. Run the Project
Priority of scripts for Node.js:
1. `npm run dev` (if exists)
2. `npm run start` (if exists)
3. `node <main>` (based on package.json `main` field)

Priority for Python:
1. `python -m <name>` (if it's a module)
2. `python main.py` or `python app.py`
3. Script defined in `pyproject.toml`

---

## Complete Usage Example

```
User: /run work/projects/my-app/project

Agent:
1. Locating project at /vaults/work/projects/my-app/project/
2. Detected: Node.js (package.json found)
3. Checking dependencies... node_modules/ exists ✓
4. Running: npm run dev

[Server output]
Server running at http://localhost:3000
```

---

## Error Handling

### Project not found
```
❌ Project 'xyz' not found in /vaults/

Available projects:
- work/projects/my-app/project
- personal/projects/data-analysis/project
```

### Missing dependencies
```
⚠️ node_modules/ not found
→ Running npm install first...
```

### Script not found
```
⚠️ No 'dev' or 'start' script found
→ Running: node src/index.js (based on package.json main)
```

---

## Optional Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--install` | Force reinstall dependencies | `/run project --install` |
| `--build` | Run build before starting | `/run project --build` |
| `--port <number>` | Set port (if applicable) | `/run project --port 8080` |

---

## Current Projects

To list available projects, check `/vaults/`:

```bash
ls -la /workspace/vaults/
```

---

## Important Notes

1. **Long-running processes**: The command will start the server/process. Use Ctrl+C to stop.

2. **Multiple instances**: Check if another instance is already running on the same port.

3. **Logs**: All process logs will be displayed in the terminal.

4. **Hot Reload**: For Node.js projects with `--watch` or similar, file changes will automatically restart the server.

---

## Quick Reference

```
/run <project>              # Run the project
/run <project> --install    # Reinstall deps and run
/run <project> --build      # Build + run
```
