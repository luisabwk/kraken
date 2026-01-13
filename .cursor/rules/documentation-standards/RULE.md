---
description: "Use when creating or editing structural files like commands, hooks, rules, AGENTS.md, or README files"
alwaysApply: false
---

# Documentation Standards

> Use this rule when creating or modifying structural documentation files to ensure consistency across the codebase.

## Core Principle

**English is the standard language** for all structural files. This ensures consistency, maintainability, and accessibility for any developer who may work on the project.

## Scope

This rule applies to:

| File Type | Location | Examples |
|-----------|----------|----------|
| **Commands** | `.cursor/commands/` | `boot.md`, `run.md`, `commit.md` |
| **Hooks** | `.cursor/hooks/` | `warn-debug-code.md`, `block-dangerous-commands.md` |
| **Rules** | `.cursor/rules/*/` | `RULE.md` files |
| **Agent Instructions** | Any directory | `AGENTS.md` files |
| **READMEs** | Any directory | `README.md` files |
| **Plans** | `/vaults/*/projects/*/plans/` | Project plan files |
| **Tasks** | `/vaults/*/projects/*/tasks/` | Task documentation |
| **PRDs/PRPs** | `/vaults/*/projects/*/plans/prds/` | Product requirements |

## Language Requirements

### Always in English

All structural files **MUST** be written in English:

- ✅ Titles and headings
- ✅ Descriptions and explanations
- ✅ Table headers and content
- ✅ Code comments within examples
- ✅ Error messages and warnings
- ✅ Checklist items

### Exceptions

The following may use the user's preferred language:

- User-facing application content (if app targets specific locale)
- Comments in the user's conversation (not in files)
- Temporary notes in task files (should be translated before completion)

## File Structure Standards

### Commands (`.cursor/commands/*.md`)

```markdown
# [Action Verb] [Subject]

## Overview
[1-2 sentences describing what this command does]

---

## [Section 1]
[Content]

## [Section 2]
[Content]

---

## Quick Reference
[Summary or TL;DR]
```

**Required sections:**
- Overview (what it does)
- Process/Workflow (how it works)
- Examples (usage examples)
- Quick Reference (TL;DR)

### Hooks (`.cursor/hooks/*.md`)

```markdown
---
name: hook-identifier
enabled: true
event: bash | file | commit | stop
pattern: regex-pattern
action: warn | block
---

# [Emoji] [Title]

[What was detected and why it matters]

## [Details/Patterns]

## What to Do Instead

## If User Insists
```

**Required elements:**
- YAML frontmatter with all fields
- Clear title with relevant emoji
- Explanation of the issue
- Alternative solutions

### Rules (`.cursor/rules/*/RULE.md`)

```markdown
---
description: "Use when [trigger condition]"
alwaysApply: false
---

# [Rule Name]

> [One-line summary of when to use this rule]

## Core Principle

[The main philosophy behind this rule]

## When to Use

[Trigger conditions]

## [Main Content Sections]

## Checklist

[Verification checklist]
```

**Required elements:**
- YAML frontmatter with description
- Clear trigger conditions
- Actionable guidelines
- Examples (good and bad)
- Verification checklist

### AGENTS.md Files

```markdown
# [Directory/Project] Instructions

> [Scope: what files/folders this applies to]

## Overview

[Purpose of this directory]

## Guidelines

[Specific rules for this context]

## Integration

[How this relates to other parts of the system]
```

## Naming Conventions

### File Names

| Type | Convention | Example |
|------|------------|---------|
| Commands | `kebab-case.md` | `code-review.md`, `prp-new.md` |
| Hooks | `action-subject.md` | `warn-debug-code.md`, `block-dangerous-commands.md` |
| Rules | `RULE.md` in named folder | `plan/RULE.md`, `task/RULE.md` |
| Plans | `[ID] - [Title] - [Date].md` | `001 - Email Viewer - 2026-01-10.md` |
| Tasks | `[ID] - [Title].md` | `001 - Setup project.md` |

### Identifiers

- Use `kebab-case` for hook names and identifiers
- Use `PascalCase` for component/class references
- Use `camelCase` for function/variable references
- Use `SCREAMING_SNAKE_CASE` for constants

## Quality Checklist

Before finalizing any structural file:

- [ ] **Language**: Written entirely in English
- [ ] **Structure**: Follows the template for its type
- [ ] **Clarity**: Clear and unambiguous
- [ ] **Completeness**: All required sections present
- [ ] **Formatting**: Proper markdown syntax
- [ ] **Examples**: Includes relevant examples
- [ ] **Consistency**: Matches style of existing files
- [ ] **Links**: All internal links are valid

## Common Mistakes to Avoid

| ❌ Don't | ✅ Do |
|----------|-------|
| Mix languages in same file | Use English throughout |
| Use informal abbreviations | Write full words |
| Skip the overview section | Always explain purpose first |
| Leave placeholder text | Complete all sections |
| Use inconsistent headings | Follow heading hierarchy |
| Forget YAML frontmatter | Include all required fields |

## Enforcement

This rule is enforced through:

1. **Code review** - Check language consistency
2. **Hooks** - Could add hook to warn on non-English content
3. **Self-review** - Before committing, verify compliance

## Integration

- **Use with**: `/commit` to verify before pushing
- **Use with**: `/code-review` for structural file changes
- **Reference**: Check existing files in same category for style
