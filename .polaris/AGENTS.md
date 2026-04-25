# Agent Rules for Polaris Projects

**⚠️ CRITICAL**: All AI agents working in this project must follow these rules.

These rules apply to **all commands** (specify, plan, research, tasks, implement, review, merge, etc.).

---

## 1. Path Reference Rule

**When you mention directories or files, provide either the absolute path or a path relative to the project root.**

✅ **CORRECT**:
- `polaris-specs/001-feature/tasks/WP01.md`
- `/Users/robert/Code/myproject/polaris-specs/001-feature/spec.md`
- `tasks/WP01.md` (relative to feature directory)

❌ **WRONG**:
- "the tasks folder" (which one? where?)
- "WP01.md" (in which lane? which feature?)
- "the spec" (which feature's spec?)

**Why**: Clarity and precision prevent errors. Never refer to a folder by name alone.

---

## 2. UTF-8 Encoding and ASCII Punctuation Rule (MANDATORY)

**NEVER generate em dashes, en dashes, smart quotes, or other non-ASCII punctuation.**
This applies to ALL generated content: specs, plans, tasks, code, comments, commit messages.

Use ONLY: straight quotes (`"` and `'`), hyphens (`-`), and `...` for ellipsis.
The pre-commit hook will reject files containing these characters.

When writing ANY markdown, JSON, YAML, CSV, or code files, use ONLY UTF-8 encoding.

Exception: en dashes are used as field separators in the activity log format ONLY.

### What to Avoid (Will Break the Dashboard and Block Commits)

❌ **Windows-1252 smart quotes**: " " ' ' (from Word/Outlook/Office)
❌ **Em/en dashes and special punctuation**: - -
❌ **Copy-pasted arrows**: → (becomes illegal bytes)
❌ **Multiplication sign**: x (0xD7 in Windows-1252)
❌ **Plus-minus sign**: +/- (0xB1 in Windows-1252)
❌ **Degree symbol**:  degrees (0xB0 in Windows-1252)
❌ **Copy/paste from Microsoft Office** without cleaning

**Real examples that crashed the dashboard:**
- "User's favorite feature" → "User's favorite feature" (smart quote)
- "Price: $100 +/- $10" → "Price: $100 +/- $10"
- "Temperature: 72 degreesF" → "Temperature: 72 degrees F"
- "3 x 4 matrix" → "3 x 4 matrix"

### What to Use Instead

✅ Standard ASCII quotes: `"`, `'`
✅ Hyphen-minus: `-` instead of en/em dash
✅ ASCII arrow: `->` instead of →
✅ Lowercase `x` for multiplication
✅ `+/-` for plus-minus
✅ ` degrees` for temperature
✅ Plain punctuation

### Safe Characters

✅ Emoji (proper UTF-8)  
✅ Accented characters typed directly: café, naïve, Zürich  
✅ Unicode math typed directly (√ ≈ ≠ ≤ ≥)  

### Copy/Paste Guidance

1. Paste into a plain-text buffer first (VS Code, TextEdit in plain mode)
2. Replace smart quotes and dashes
3. Verify no � replacement characters appear
4. Run `polaris validate-encoding --feature <feature-id>` to check
5. Run `polaris validate-encoding --feature <feature-id> --fix` to auto-repair

**Failure to follow this rule causes the dashboard to render blank pages.**

### Auto-Fix Available

If you accidentally introduce problematic characters:
```bash
# Check for encoding issues
polaris validate-encoding --feature 001-my-feature

# Automatically fix all issues (creates .bak backups)
polaris validate-encoding --feature 001-my-feature --fix

# Check all features at once
polaris validate-encoding --all --fix
```

---

## 3. Context Management Rule

**Build the context you need, then maintain it intelligently.**

- Session start (0 tokens): You have zero context. Read plan.md, tasks.md, relevant artifacts.  
- Mid-session (you already read them): Use your judgment-don't re-read everything unless necessary.  
- Never skip relevant information; do skip redundant re-reads to save tokens.  
- Rely on the steps in the command you are executing.

---

## 4. Work Quality Rule

**Produce secure, tested, documented work.**

- Follow the plan and constitution requirements.  
- Prefer existing patterns over invention.  
- Treat security warnings as fatal-fix or escalate.  
- Run all required tests before claiming work is complete.  
- Be transparent: state what you did, what you didn't, and why.

---

## 5. Git Discipline Rule

**Keep commits clean and auditable.**

- Commit only meaningful units of work.
- Write descriptive commit messages (imperative mood).
- Do not rewrite history of shared branches.
- Keep feature branches up to date with main via merge or rebase as appropriate.
- Never commit secrets, tokens, or credentials.

---

## 6. Git and Branch Protection

### Branch Protection - MANDATORY

**NEVER bypass git hooks.** If a pre-commit hook blocks your commit:
1. **Stop.** Do not retry with `--no-verify` or any other bypass.
2. Read the hook's error message - it is telling you WHY the commit was blocked.
3. If the hook says you are on a protected branch (main/master), create a feature branch instead.
4. If the hook reports a code issue, fix the issue and retry normally.
5. Only a human user may bypass hooks for intentional hotfixes.

**NEVER commit source code directly to main or master.** Use feature branches
and pull requests. Planning artifacts (polaris-specs/, .polaris/, docs/) are
allowed on protected branches.

### Agent Directories - NEVER Commit

**NEVER commit agent directories to git.**

### Why Agent Directories Must Not Be Committed

Agent directories like `.claude/`, `.codex/`, `.gemini/` contain:
- Authentication tokens and API keys
- User-specific credentials (auth.json)
- Session data and conversation history
- Temporary files and caches

### What Should Be Committed

✅ **DO commit:**
- `.polaris/templates/` - Command templates (source)
- `.polaris/missions/` - Mission definitions
- `.polaris/memory/constitution.md` - Project constitution
- `.gitignore` - With all agent directories excluded

❌ **DO NOT commit:**
- `.claude/`, `.codex/`, `.gemini/`, etc. - Agent runtime directories
- `.polaris/templates/command-templates/` - These are templates, not final commands
- Any `auth.json`, `credentials.json`, or similar files

### Automatic Protection

Polaris automatically:
1. Adds all agent directories to `.gitignore` during `polaris init`
2. Installs pre-commit hook to block accidental commits
3. Creates `.claudeignore` to optimize AI scanning

### Manual Verification

```bash
# Verify .gitignore protection
git check-ignore .claude/ .codex/ .gemini/ .cursor/

# Check for accidentally staged agent files
git diff --cached --name-only -- .claude/ .codex/ .gemini/ .cursor/

# If you find staged agent files, unstage them:
git reset HEAD .claude/
```

### Worktree Constitution Sharing

In worktrees, `.polaris/memory/` is a symlink to the main repo's memory,
ensuring all feature branches share the same constitution.

```bash
# In a worktree, verify memory is a symlink:
python -c "from pathlib import Path; p=Path('.polaris/memory'); print(f'{p} -> {p.resolve()}' if p.is_symlink() else f'{p} (not a symlink)')"
```

This is intentional and correct - it ensures a single source of truth for project principles.

---

### Quick Reference

- 📁 **Paths**: Always specify exact locations.  
- 🔤 **Encoding**: UTF-8 only. Run the validator when unsure.  
- 🧠 **Context**: Read what you need; don't forget what you already learned.  
- ✅ **Quality**: Follow secure, tested, documented practices.  
- 📝 **Git**: Commit cleanly with clear messages.