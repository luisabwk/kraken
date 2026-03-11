# 🦑 Kraken

> **Release the Kraken!** — Um framework para transformar agentes de IA em parceiros confiáveis de trabalho.

Pare de torcer para o ChatGPT não inventar coisas. O Kraken é um framework open-source que organiza como você trabalha com agentes de IA — separando **o que fazer**, **como decidir** e **como executar**.

Feito para **Product Managers, Product Owners, Product Designers, AI Builders** e qualquer pessoa que use IA como ferramenta de trabalho no dia a dia.

---

## Por que o Kraken existe?

LLMs são probabilísticos. Sua lógica de negócio não deveria ser.

```
90% de acerto por passo = 59% de sucesso em 5 passos
80% de acerto por passo = 33% de sucesso em 5 passos
```

Quanto mais passos você pede para a IA executar sozinha, mais ela erra. A solução? **Separar as responsabilidades**: a IA decide, scripts determinísticos executam.

### Para quem é isso?

| Perfil | Como o Kraken te ajuda |
|--------|----------------------|
| **Product Manager** | Crie PRDs estruturados, decomponha em tasks, acompanhe execução |
| **Product Owner** | Planeje sprints com estimativas de complexidade, priorize com clareza |
| **Product Designer** | Documente decisões de design, mantenha specs organizados |
| **AI Builder** | Monte agentes confiáveis com guardrails, memória e self-healing |
| **Dev com IA** | TDD assistido, code review com scoring, debugging sistemático |

---

## Como funciona: a Arquitetura de 3 Camadas

```
┌─────────────────────────────────────────────────────────────┐
│  CAMADA 1: DIRETIVA (O que fazer)                           │
│  Onde: /vaults/<area>/projects/<projeto>/plans/              │
│  O quê: Instruções em Markdown — objetivos, inputs, outputs │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  CAMADA 2: ORQUESTRAÇÃO (Quem decide)                       │
│  Quem: O Agente de IA                                       │
│  O quê: Lê instruções, chama ferramentas, lida com erros    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  CAMADA 3: EXECUÇÃO (Quem faz o trabalho)                   │
│  Onde: /vaults/<area>/projects/<projeto>/execution/          │
│  O quê: Scripts determinísticos (Python, TypeScript, JS)    │
└─────────────────────────────────────────────────────────────┘
```

| Camada | Faz o quê | Quem controla |
|--------|-----------|---------------|
| **Diretiva** | Define metas e instruções | Você (em Markdown) |
| **Orquestração** | Toma decisões, roteia trabalho | Agente de IA |
| **Execução** | Roda código determinístico | Scripts que você controla |

**Na prática**: Você escreve um plano em Markdown. O agente lê, decide o que fazer, chama o script certo, lida com erros, e atualiza o plano com o que aprendeu.

---

## Início Rápido

### Pré-requisitos

- [Cursor IDE](https://cursor.sh) e/ou [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (CLI)
- Node.js >= 18.x LTS
- Python >= 3.10
- Git

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/luisabwk/kraken.git
cd kraken

# 2. Configure o ambiente (se necessário)
cp .env.example .env
# Adicione suas API keys

# 3. Solte o Kraken!
# No Cursor ou Claude Code, digite:
/boot
```

O comando `/boot` verifica se a estrutura está correta, carrega as regras e te mostra o que está disponível.

---

## Tutorial: Seu Primeiro Projeto

### Passo 1: Crie a estrutura do projeto

```bash
mkdir -p vaults/work/projects/meu-projeto/{plans,tasks,execution,project}
touch vaults/work/projects/meu-projeto/AGENTS.md
```

Isso cria:
- `plans/` — Seus planos e PRDs
- `tasks/` — Tasks individuais detalhadas
- `execution/` — Scripts que o agente vai rodar
- `project/` — Código, assets e outputs do projeto

### Passo 2: Crie um PRP (Product Requirement Prompt)

Digite `/prp-new` no chat. O agente vai te guiar com perguntas estruturadas:

1. "Qual problema você quer resolver?"
2. "É feature nova, bug fix, refatoração ou documentação?"
3. "O que já existe hoje?"
4. "Tem restrições de prazo, orçamento ou tecnologia?"
5. "Como você vai saber que está pronto?"

No final, ele gera um PRP completo com: Contexto, Requisitos, Restrições, Critérios de Sucesso e Não-Requisitos.

### Passo 3: Decomponha em Tasks

Após aprovar o PRP, o agente decompõe em tasks executáveis com:
- Estimativa de complexidade (1, 3, 5 ou 8 pontos)
- Dependências entre tasks
- Critérios de aceitação
- Organização em fases (Fundação → Core → Testes → Deploy)

### Passo 4: Execute

Digite `/execute` e o agente:
1. Lê o plano e as tasks
2. Atualiza o status ("In process")
3. Executa cada passo
4. Roda testes e validações
5. Marca como "Done" e documenta aprendizados

### Passo 5: Revise

Digite `/code-review` para uma revisão de qualidade com scoring de confiança — só reporta problemas reais (confiança >= 80%), sem ruído.

---

## Comandos Disponíveis

Todos os comandos funcionam tanto no Cursor (`/comando`) quanto no Claude Code (`/comando`).

| Comando | O que faz |
|---------|-----------|
| `/boot` | Inicializa o agente e verifica o setup |
| `/execute` | Executa tasks de um plano passo a passo |
| `/code-review` | Revisão de qualidade com scoring de confiança |
| `/commit` | Commit no git com Conventional Commits |
| `/prp-new` | Cria um PRP (Product Requirement Prompt) do zero |
| `/prp-review` | Revisa e pontua um PRP existente |
| `/mcp` | Alterna modos de MCP (minimal/dev/infra/pm/full) |
| `/run <projeto>` | Roda um projeto localmente |
| `/context` | Gerencia contexto dinâmico (status/clean/log) |
| `/clean` | Manutenção e higiene do repositório |

---

## Guardrails: Proteções Automáticas

O Kraken vem com hooks que protegem você de erros comuns:

| Proteção | O que detecta |
|----------|--------------|
| **Bloqueio de comandos perigosos** | `rm -rf /`, `DROP TABLE`, formatação de disco |
| **Código de debug** | `console.log`, `debugger`, `print()` esquecidos |
| **Secrets no código** | API keys, passwords hardcoded |
| **Arquivos grandes** | Arquivos com mais de 500 linhas |
| **TypeScript `any`** | Uso de `any` que desativa type safety |
| **Testes obrigatórios** | Lembrete de rodar testes antes de concluir |
| **`.env` no commit** | Bloqueia commit de arquivos com secrets |
| **TODOs perdidos** | Detecta TODO/FIXME sem tracking |
| **Output longo** | Saída > 50 linhas que polui o contexto |

---

## Estrutura do Repositório

```
kraken/
├── .cursor/                # Configuração para Cursor IDE
│   ├── commands/           # 10 slash commands
│   ├── hooks/              # 10 guardrails comportamentais
│   ├── rules/              # 11 regras operacionais
│   └── skills/             # 13 skills procedurais
├── .claude/                # Configuração para Claude Code
│   ├── commands/           # 10 slash commands
│   ├── agents/             # 5 subagentes especializados
│   └── settings.json       # Permissões e hooks
├── CLAUDE.md               # Instruções root (Claude Code)
├── AGENTS.md               # Instruções root (Cursor)
├── context/                # Armazenamento de contexto dinâmico
│   ├── mcp/                # Respostas longas de ferramentas
│   ├── history/            # Histórico de decisões da sessão
│   └── terminal/           # Logs de execução
├── vaults/                 # Seus workspaces
│   ├── work/
│   │   ├── projects/       # Iniciativas completas
│   │   ├── data/           # Pipelines de dados e relatórios
│   │   └── apps/           # Apps e serviços deployáveis
│   └── personal/projects/  # Projetos pessoais
└── .gitignore
```

### Categorias de Vaults

| Categoria | Caminho | Use para |
|-----------|---------|----------|
| **projects/** | `vaults/<area>/projects/` | Iniciativas completas com planos, tasks e execução |
| **data/** | `vaults/<area>/data/` | Pipelines de dados, relatórios, datasets |
| **apps/** | `vaults/<area>/apps/` | Apps deployáveis e serviços |

---

## Skills: Conhecimento Especializado

Skills são guias procedurais detalhados que o agente carrega sob demanda. Enquanto as regras são curtas e sempre ativas, skills trazem workflows completos.

| Skill | O que faz |
|-------|-----------|
| `code-simplifier` | Simplifica código após implementação, sem mudar comportamento |
| `documentation-standards` | Garante consistência em docs estruturais |
| `dynamic-context` | Gerencia janela de contexto de forma eficiente |
| `execution` | Workflow passo a passo para executar tasks |
| `memory-awareness` | Uso proativo de memória entre sessões |
| `mcp-modes` | Otimiza quais MCPs usar por contexto |
| `plan` | Cria planos de projeto estruturados |
| `prd` | Cria PRPs e decompõe em tasks técnicas |
| `skill-creator` | Meta-skill: cria novos skills |
| `stack` | Escolhas de tecnologia e setup de projetos |
| `systematic-debugging` | Encontra causa raiz antes de corrigir |
| `task` | Cria e gerencia arquivos de task |
| `test-driven-development` | Ciclo Red → Green → Refactor |

### Criando Novos Skills

```bash
python3 .cursor/skills/skill-creator/scripts/init_skill.py meu-skill --path .cursor/skills/
```

---

## Gerenciamento de Contexto Dinâmico

A janela de contexto de LLMs enche rápido. O Kraken inclui um sistema para lidar com isso:

- **Outputs longos** (>50 linhas) são salvos em `context/` ao invés de poluir o chat
- **Histórico de sessão** preserva decisões entre auto-compactações
- **Logs de terminal** são redirecionados para consulta seletiva

```bash
/context status   # Ver uso de armazenamento
/context clean    # Limpar arquivos > 7 dias
/context log      # Registrar uma decisão importante
```

---

## Self-Annealing: O Agente Aprende

Quando algo quebra, o Kraken não só conserta — ele melhora:

```
Erro acontece
    ↓
Corrige o problema
    ↓
Atualiza o script
    ↓
Testa a correção
    ↓
Atualiza a diretiva
    ↓
O sistema ficou mais forte
```

Cada erro é uma oportunidade de melhorar as diretivas. O sistema fica mais robusto com o tempo.

---

## Compatibilidade: Cursor + Claude Code

O Kraken funciona tanto no **Cursor IDE** quanto no **Claude Code** (CLI da Anthropic). As duas configurações compartilham a mesma estrutura de projetos.

| Feature | Cursor | Claude Code |
|---------|--------|-------------|
| Instruções root | `AGENTS.md` | `CLAUDE.md` |
| Instruções por diretório | `vaults/AGENTS.md` | `vaults/CLAUDE.md` |
| Slash commands | `.cursor/commands/` | `.claude/commands/` |
| Guardrails | `.cursor/hooks/` (markdown) | `.claude/settings.json` (shell) |
| Rules + Skills | `.cursor/rules/` + `.cursor/skills/` | Consolidado no `CLAUDE.md` |
| Subagentes | `.cursor/skills/` (sob demanda) | `.claude/agents/` (persistentes) |

### Subagentes (Claude Code)

| Agente | Especialidade |
|--------|--------------|
| `code-reviewer` | Code review com scoring de confiança |
| `debugger` | Análise sistemática de causa raiz |
| `prd-creator` | Criação de PRPs e decomposição em tasks |
| `code-simplifier` | Limpeza de código pós-implementação |
| `tdd-coach` | Guia de Test-Driven Development |

---

## Princípios Operacionais

1. **Reutilize antes de criar** — Sempre verifique se já existe um script ou tool
2. **Self-anneal** — Aprenda com erros, atualize diretivas
3. **KISS** — Mantenha simples. Se tem mais de 500 linhas, divida
4. **YAGNI** — Não construa pro futuro. Resolva o problema de agora
5. **DRY** — Não repita código. Mudanças em um lugar só
6. **TDD** — Escreva o teste primeiro, veja falhar, depois implemente
7. **Debug sistemático** — Encontre a causa raiz antes de corrigir
8. **Gerencie contexto** — Offload dados verbosos, recupere seletivamente

---

## Documentação

| Documento | O que contém |
|-----------|-------------|
| [AGENTS.md](./AGENTS.md) | Instruções root do agente (Cursor) |
| [CLAUDE.md](./CLAUDE.md) | Instruções root do agente (Claude Code) |
| [vaults/AGENTS.md](./vaults/AGENTS.md) | Estrutura de vaults e modos MCP |
| [context/README.md](./context/README.md) | Sistema de contexto dinâmico |
| [.cursor/hooks/README.md](./.cursor/hooks/README.md) | Documentação dos hooks |
| [.cursor/skills/](./.cursor/skills/) | Biblioteca de skills (Cursor) |
| [.claude/agents/](./.claude/agents/) | Biblioteca de subagentes (Claude Code) |

---

## Contribuindo

1. Fork o repositório
2. Crie sua feature branch
3. Siga a arquitetura de 3 camadas
4. Rode `/code-review` antes de submeter
5. Use `/commit` para mensagens de commit padronizadas

---

## Licença

MIT — Use, modifique, distribua. Solte o Kraken. 🦑

---

<p align="center">
  <strong>🦑 Release the Kraken!</strong><br>
  <em>Domine o caos. Entregue com confiança.</em>
</p>
