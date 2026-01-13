---
description: "Use when choosing technologies, setting up projects, or checking version requirements for development"
alwaysApply: false
---

# Tech Stack

> Use this rule when building something to ensure correct technology choices and version requirements.

## Version Requirements

### Core Runtimes
| Technology | Minimum Version | Recommended |
|------------|-----------------|-------------|
| Node.js | 18.x LTS | 20.x LTS |
| Python | 3.10 | 3.11+ |
| npm | 9.x | 10.x |

### Frameworks & Libraries
| Technology | Minimum Version | Notes |
|------------|-----------------|-------|
| Next.js | 14.x | App Router preferred |
| React | 18.x | |
| TypeScript | 5.x | Strict mode enabled |
| shadcn/ui | Latest | Install components as needed |

## Use Cases

### Data Analysis & Small Workflows
**Use Python** when:
- Analyzing data
- Building small scripts
- Quick automations
- Data transformations

```bash
# Setup
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
.venv\Scripts\activate     # Windows

# Common dependencies
pip install pandas numpy requests python-dotenv
```

### Usable Prototypes & Applications
**Use TypeScript + Next.js** when:
- Building web applications
- Creating user interfaces
- Building APIs
- Full-stack prototypes

```bash
# Setup
npx create-next-app@latest [project-name] --typescript --tailwind --eslint --app

# Add shadcn
npx shadcn-ui@latest init
```

### Configuration Templates

#### TypeScript Project (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true
  }
}
```

#### Python Project (`requirements.txt`)
```
pandas>=2.0.0
numpy>=1.24.0
requests>=2.31.0
python-dotenv>=1.0.0
pytest>=7.4.0
ruff>=0.1.0
```

## Database Preferences

| Use Case | Technology |
|----------|------------|
| Production apps | Supabase (PostgreSQL) |
| Document storage | MongoDB |
| Prototypes/Testing | Mock data (JSON files) |

If no database is specified in the project, use mock data.

## Package Management

### JavaScript/TypeScript
- **Package Manager**: npm (not yarn or pnpm)
- **Lock File**: Always commit `package-lock.json`

```bash
npm install           # Install dependencies
npm install [pkg]     # Add new dependency
npm update            # Update to latest within semver
npm audit             # Security check
```

### Python
- **Virtual Environments**: Always use venv
- **Requirements**: Use `requirements.txt` with pinned versions

```bash
pip install -r requirements.txt
pip freeze > requirements.txt
pip install --upgrade [pkg]
```

## MCP Tools Reference

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `context7` | Library documentation | Check package versions, API changes, security issues |
| `supermemory` | Memory storage | Store/retrieve project context, learnings, decisions |
| `github` | Repository management | Commit, sync, check branches, view PRs |
| `linear` | Issue tracking | Work projects, create/update issues |
| `notion` | Documentation | PRDs, meeting notes, project docs |
| `supabase` | Database | Manage tables, auth, storage for prototypes |

### Using context7
Before installing packages, verify versions are safe:
```
Check if [package] version X.Y.Z has known vulnerabilities
What is the latest stable version of [package]?
```

### Using supermemory
Store important learnings:
```
Remember: [project] - API has rate limit of 100/min
Recall: What do we know about [project]?
```

## Code Style Preferences

### TypeScript/JavaScript
- Use functional components in React
- Prefer `const` over `let`
- Use arrow functions
- Use template literals
- Destructure when possible

### Python
- Follow PEP 8
- Use type hints
- Prefer f-strings
- Use pathlib for file operations

## Project Structure Templates

### Next.js Project
```
project-name/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── api/
│   ├── components/
│   │   └── ui/
│   ├── lib/
│   └── types/
├── public/
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
```

### Python Project
```
project-name/
├── src/
│   ├── __init__.py
│   └── main.py
├── tests/
│   └── test_main.py
├── .env
├── requirements.txt
└── README.md
```

## Red Flags - Wrong Technology Choice

Stop and reconsider if:

- Using yarn/pnpm instead of npm
- Creating React app without TypeScript
- Skipping virtual environment in Python
- Using outdated Node.js version (< 18)
- Not checking package versions before installing
- Hardcoding API keys instead of using .env

## Security Rules

1. **Never hardcode secrets** - Use `.env` files
2. **Always add `.env` to `.gitignore`**
3. **Use environment variables** for API keys
4. **Run `npm audit`** before deploying
5. **Keep dependencies updated** - Check monthly

## Quick Reference

```bash
# Start new Next.js project
npx create-next-app@latest my-app --typescript --tailwind --eslint --app
cd my-app && npx shadcn-ui@latest init

# Start new Python project
mkdir my-project && cd my-project
python -m venv .venv && source .venv/bin/activate
pip install pandas requests python-dotenv pytest

# Check for updates
npm outdated          # Node
pip list --outdated   # Python
```
