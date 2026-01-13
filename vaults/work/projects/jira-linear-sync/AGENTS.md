# jira-linear-sync — AGENTS 🔄

Sync bidirecional entre **Jira** (Atendimento/Suporte) e **Linear** (Engenharia).

## MCP Mode: `dev`

Este projeto usa modo **dev** por padrão.

| Permitidos | Bloqueados |
|------------|------------|
| context7, semgrep, Atlassian | Linear, Notion, Slack, Railway, supabase, github, supermemory, shadcn |

> Para trocar de modo: `/mcp [modo]`

---

## Sobre o Projeto

Serviço que sincroniza issues entre Jira e Linear:
- **Status sync**: Jira → Linear (ou bidirecional)
- **Comment mirroring**: Bidirecional com markers anti-loop
- **Flexible mapping**: Configuração via JSON

## Estrutura

```
jira-linear-sync/
├── AGENTS.md          # Este arquivo
├── README.md          # Documentação de uso
├── env.example        # Template de variáveis
├── plans/             # Planos e PRPs
├── tasks/             # Tasks em andamento
└── service/           # Código TypeScript
    ├── src/
    ├── tests/
    ├── package.json
    └── tsconfig.json
```

## Configuração

1. Copiar `env.example` para `.env`
2. Configurar credenciais Jira e Linear
3. Criar `project/status-mapping.json` com mapeamento de status
4. `cd service && npm install && npm run dev`
