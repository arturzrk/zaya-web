---
description: Run the full Aptean application pipeline autonomously with retry logic.
---

## User Input

**Telemetry**: Run: `polaris telemetry record autopilot --feature <slug> --phase start --agent {{AGENT_NAME}}`

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Quick Mode

If `--quick` is passed: use quick mode for the specify stage (2 questions max, combined spec+plan generation). All downstream stages (tasks, implement, test, review, accept, merge) run normally with full quality gates.

## Discovery

1. **Context**: New application (full pipeline), existing feature (resume from current phase), or `--resume` (from saved state).
2. **Feature slug**: Detect from directory, arguments, or ask.
3. **Retry limit**: Default 3 attempts per stage.
4. **On failure**: Default skip-and-continue (skip failed WP, continue with independents).
5. **Mode**: `--quick` activates quick mode for specify phase (record in state).

End discovery with `WAITING_FOR_AUTOPILOT_INPUT`.

## Pipeline Stages

### Stage 1: Setup (new apps only)

Run `/polaris.setup` with Aptean defaults (Suisse Intl, --aptean-* CSS, teal #1A7B7E, Django 6+/Vite+React 19+/PostgreSQL 17+, AKS+Helm, health probes, CI/CD). Skip if `.polaris/` exists.

### Stage 2: Build

**2a. Specify + Plan** (`/polaris.specify`): Create spec with auto-review, generate plan. Skip if both `spec.md` and `plan.md` exist.

**2b. Tasks** (`/polaris.tasks`): Generate WPs and task breakdowns. Run `polaris agent feature finalize-tasks --json` to parse deps, update frontmatter, generate E2E test skeletons. Skip if `tasks.md` exists.

**2c. Test Plan**: Create `polaris-specs/<slug>/test-plan.md` with sections: Unit Tests (per WP, min 2 each), Integration Tests (cross-WP), Acceptance Tests (from spec), Edge Cases. Rules: all names start with `test_`, all unique, map to spec criteria. Skip if exists.

**2d. Implement**: For each WP in dependency order:
1. `polaris implement <WP_ID> --feature <slug>` (add `--base <dep>` if deps exist). Verify WP moved to `doing`.
2. **Worktree handoff**: Parse the `cd` command from implement output. Execute it. Verify: `pwd` must contain `.worktrees/` and `git branch --show-current` must NOT show `main` or `master`. If verification fails, STOP and report error.
3. Follow implementation prompt from `polaris-specs/<slug>/tasks/<WP_ID>.md`
4. Implement fully, run tests, commit
5. **Return to main**: `cd` back to the main repo root before processing next WP
6. On failure: retry up to limit, then mark failed and skip dependents

### Stage 3: Quality Assurance and Ship

**3a. Test Execution** (per WP after implementation):

1. Move to testing: `polaris agent tasks move-task <WP_ID> --to testing --feature <slug>`
2. Run project tests: `python .polaris/scripts/tasks/run_tests.py --project-root . --wp <WP_ID> --json`. Check `success: true`, `failed: 0`. If `no_tests: true`, log warning and continue (not a failure).
3. Run E2E tests if `.spec.js` files exist: `polaris runtests --wp <WP_ID> --feature <slug>`
4. On failure: move back to doing, fix, retry (max 3). After exhausting retries, mark failed.
5. Validate test plan coverage: `python .polaris/scripts/tasks/run_tests.py --project-root . --validate-plan polaris-specs/<slug>/test-plan.md --no-run --json`. Gate: `coverage_percent >= 80`.
6. On success: proceed to mutation testing.

**3b. Mutation Testing** (per WP after tests pass):

Run mutation analysis on the files changed in this WP to validate test quality:
1. Identify changed files via `git diff` for this WP
2. Introduce 3-5 targeted mutations per file (negate conditions, remove returns, swap operators)
3. Re-run relevant tests for each mutation
4. If a mutation is not caught by any test (surviving mutant), note the gap
5. **Gate**: If survival rate > 30%, add targeted tests to kill surviving mutants, then re-run
6. Report mutation testing results in the WP activity log

This is a quality gate - it ensures the generated tests actually validate behavior, not just execute code paths.

**3c. Self-Review** (per WP after mutation testing passes):

Before moving to for_review, the agent reviews its own implementation:
1. Read the original spec requirements and acceptance criteria
2. `git diff` all changes made in this WP
3. Check: Does every acceptance criterion have a corresponding implementation?
4. Check: Are there any unintended changes (files modified that shouldn't be)?
5. Check: Are there any hardcoded values, secrets, or debug code left behind?
6. Check: Does the implementation follow the constitution's coding standards?
7. If issues found: fix them, re-run tests, re-run mutation testing
8. If clean: move WP to for_review with a self-review summary note

**Kanban flow**: planned -> doing -> testing -> (doing if fail) -> testing -> for_review -> done

**3d. Review** (`/polaris.review`): For each WP in for_review. On approval, move to done. On rejection, move to doing, fix, restart from 3a.

**3e. Accept** (`/polaris.accept`): Once all WPs pass review.

**3f. Merge** (`/polaris.merge`): Preflight, merge all WPs, clean up worktrees.

## State Persistence

Save to `.polaris/autopilot-state.json`:

```json
{
  "feature_slug": "<slug>",
  "current_stage": "build.implement",
  "wp_order": ["WP01", "WP02"],
  "completed_wps": ["WP01"],
  "failed_wps": {},
  "current_wp": "WP02",
  "current_attempt": 1,
  "max_attempts": 3,
  "mode": "standard|quick",
  "on_failure": "skip-and-continue",
  "started_at": "<ISO>",
  "updated_at": "<ISO>",
  "build": { "test_plan": { "status": "complete|pending|skipped" } },
  "ship": { "test_execution": { "status": "passed|failed|skipped", "passed": 0, "failed": 0, "total": 0, "coverage_percent": 0 } }
}
```

Resume: `/polaris.autopilot --resume`. Abort: `/polaris.autopilot --abort`.

## Final Summary

Display: pipeline stages, succeeded/failed/skipped WP counts, per-WP test results table (tests run/passed/failed/coverage), failed WP details with error and impact, next steps.

## Error Handling

Never halt silently. Never lose work (committed code preserved). State updated atomically. All commands are cross-platform (Polaris CLI + git).

**Telemetry**: Run: `polaris telemetry record autopilot --feature <slug> --phase complete --agent {{AGENT_NAME}}`
