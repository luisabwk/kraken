---
name: require-tests
enabled: true
event: stop
pattern: (check_transcript_for_test_commands)
action: warn
---

# 🧪 Tests Reminder

Before marking this task as complete, please verify that tests were run.

## Checklist

- [ ] Unit tests pass: `npm test` or `pytest`
- [ ] Type checking passes: `npm run typecheck` or `mypy`
- [ ] Linting passes: `npm run lint` or `ruff check`
- [ ] Build succeeds: `npm run build`

## Test Commands Reference

### JavaScript/TypeScript
```bash
npm test              # Run tests
npm run test:watch    # Watch mode
npm run typecheck     # Type checking
npm run lint          # Linting
npm run build         # Build
```

### Python
```bash
pytest                # Run tests
pytest -v             # Verbose
python -m mypy .      # Type checking
ruff check .          # Linting
```

## If Tests Were Not Run

1. Run the appropriate test commands now
2. Fix any failures before completing
3. Document test results in task Notes

## If Tests Don't Exist Yet

Consider:
- Is this new code that needs tests?
- Should tests be added as a follow-up task?
- Document the decision in task Notes

## Skipping This Check

If tests are intentionally not needed (config changes, docs only), document why in the task Notes.
