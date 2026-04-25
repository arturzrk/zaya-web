---
description: Create or update the feature specification from a natural language feature description.
---

## User Input

**Telemetry**: Run: `polaris telemetry record specify --feature <slug> --phase start --agent {{AGENT_NAME}}`


```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Amend Mode

If `$ARGUMENTS` contains `--amend` (check for the literal string `--amend`), skip the Discovery Gate entirely and follow the Amend Workflow below. `--amend` is mutually exclusive with `--quick`.

### Amend Workflow

**Extract inputs from $ARGUMENTS:**
- Amendment text: the quoted string immediately after `--amend`
- Feature override: value of `--feature <slug>` if present (skip auto-detection)
- Skip confirm: `--yes` flag present means skip the confirm/adjust step and the ambiguity detection step (Step 1.5)

**Step 1 - Detect target feature** (skip if `--feature <slug>` was provided):

```bash
polaris agent feature list-in-progress --json
```

Parse the `features` array:
- 0 features: print "No in-progress features found. Start a new feature with /polaris.specify." and STOP
- 1 feature: print "Amend feature: `<slug>` (<N> pending WPs, <M> locked)? (y/n)" and wait
  - "n": print "Amendment cancelled." and STOP
  - "y" or enter: proceed
- 2+ features: print numbered list and ask "Which feature to amend? (enter number)" and wait

After detection, set `FEATURE_SLUG` and `FEATURE_DIR` for all subsequent steps.

**Check if all WPs are done:**

If `wp_summary.planned + wp_summary.doing == 0` (all WPs completed):
- Print: "All WPs for `<slug>` are completed. The amendment will update spec.md and plan.md as a historical record - no WPs will be regenerated."
- Ask: "Proceed? (y/n)" - if "n": STOP. If "y": set `WP_REGEN_ENABLED=false` and continue.

**Step 1.5 - Detect amendment ambiguity (skip if `--yes` flag set):**

Evaluate the amendment text for ambiguity signals before reading the spec or proposing sections.
An amendment is **ambiguous** when ANY of the following are true:
- It references entities, features, or flows without naming them specifically (e.g., "improve performance", "fix the issue", "add support")
- It spans multiple domains but does not specify which parts of each domain are in scope
- It uses removal language without specifying what is being removed (e.g., "remove the old behavior")
- It contains a comparison without a reference point (e.g., "make it faster", "simplify the flow")

An amendment is **unambiguous** when ALL of the following are true:
- Named entities, screens, or data fields are explicitly referenced
- The action (add/remove/change/rename) and its target are both clear
- No reasonable alternative interpretation exists

**If unambiguous**: proceed directly to Step 2 with no questions asked.

**If ambiguous**: generate 1-3 targeted questions that, when answered, will allow deterministic
section inference. Present all questions as a single numbered list. End with `WAITING_FOR_AMEND_CLARIFICATION`.

Rules for targeted questions:
- Each question must resolve a specific ambiguity signal identified above
- Questions must be answerable with a short phrase or selection from options
- Do not ask about implementation approach - only about scope, entities, and boundaries
- Do not ask more than 3 questions regardless of how many ambiguity signals exist (prioritize highest-impact ones)

Example for "improve performance":
1. Which part of the system should be optimized? (e.g., "data loading", "search results", "API response time")
2. Is there a measurable target? (e.g., "under 200ms", "50% faster", or "not specified")

After receiving answers: incorporate the answers into the amendment interpretation and proceed to Step 2
using the clarified scope. Do not re-present the clarification prompt.

**Step 2 - Propose affected sections:**

Read `FEATURE_DIR/spec.md` fully. Reason about which sections are impacted by the amendment text:
- New user flows, personas, or scenarios -> "User Scenarios" likely affected
- New or changed acceptance criteria -> "Success Criteria" likely affected
- New or changed functional behavior -> "Functional Requirements" likely affected
- New or changed data entities -> "Key Entities" likely affected
- Scope boundary change -> "Out of Scope" or "Overview" likely affected

Identify which plan artifacts would need updating:
- New or changed data entities -> `data-model.md`
- New or changed API surface or integration contracts -> `contracts/`
- Technical approach or architecture changes -> `plan.md` Technical Context
- New setup steps, environment changes, or onboarding impacts -> `quickstart.md`
- New research questions or unknown dependencies introduced -> `research.md`

**Multi-concern detection**: If the amendment text references two or more distinct domains
(e.g., "add bulk delete and update the permission model"), apply the inference rules
independently for each concern and take the union of all affected sections and artifacts.
Do not collapse multi-concern amendments into a single dominant concern.

**False-positive suppression**: Only include a plan artifact in the proposal if the
amendment text explicitly or clearly implicitly affects its domain. When in doubt,
exclude the artifact and note it as "verify manually" in the proposal comments.
A narrower proposal is preferable to an over-broad one that triggers unnecessary
re-generation of WPs.

Identify pending WPs (lane: planned or doing) that are relevant to the amendment.
Identify locked WPs (lane: done or for_review) that will be skipped.

Present to the user (**no files written until confirmation**):

```
Proposed amendment to: <slug>

Amendment: "<text>"

Spec sections to update:
  - <Section Name 1>
  - <Section Name 2>

Plan artifacts to regenerate:
  - <filename> (or "none")

WPs to regenerate (<N> pending):
  - <WP ID> (planned) - <title>

WPs protected (<M> locked - done or for_review):
  - <WP ID> (done)

Confirm? (y to proceed / list section names to adjust / n to cancel)
```

If `--yes` flag was set, skip this prompt and proceed as if user typed "y".

Wait for response:
- "n": print "Amendment cancelled." and STOP
- "y" or enter: proceed with proposed sections
- Any other text: treat as revised section list, re-present summary and ask again (max 2 rounds)

**Step 3 - Apply cascade** (only after confirmation - writes begin here):

**3a. Update spec.md:**
Rewrite ONLY the confirmed sections. For each affected section, generate new content that incorporates the amendment while preserving the intent of unchanged requirements. All other sections are preserved verbatim - do not summarize or paraphrase them.

**3b. Update plan artifacts** (only if relevant):
- If data-model.md needs updating: rewrite only the affected entity definitions
- If contracts/ needs updating: regenerate only the affected contract files
- If plan.md Technical Context needs updating: update that section only
- If no plan artifacts affected: skip this step entirely

**3c. Regenerate pending WPs** (skip if `WP_REGEN_ENABLED=false`):
For each WP in the pending list:
1. Read the current WP prompt file fully
2. Rewrite only the Objective, Subtasks, and Definition of Done sections to reflect the amendment
3. Preserve frontmatter (work_package_id, lane, dependencies, test_file) verbatim
4. Add `amend_history` entry to frontmatter:
   ```yaml
   amend_history:
     - amendment_id: "TBD"
       regenerated_at: "<ISO timestamp>"
       reason: "<first 80 chars of amendment text>"
   ```

**3d. Handle net-new scope:**
If the amendment introduces requirements that no existing pending WP can absorb:
1. Determine the next WP number (count existing WP files in tasks/ and add 1)
2. Generate a new WP prompt file at `FEATURE_DIR/tasks/WP<NN>-<slug>.md`
3. Set frontmatter: `lane: planned`, `dependencies` based on logical ordering after last existing WP
4. Update the WP Summary table in `tasks.md` to include the new WP

**3e. Post-amendment regression review:**

Re-read the FULL updated spec.md from start to finish. For each section that was NOT updated
in this amendment, check for:

1. **Orphaned entity references**: Does any non-updated section mention an entity name,
   field, or concept that was renamed or removed in the updated sections?
2. **Scope boundary conflicts**: Does any non-updated section include items that the updated
   "Out of Scope" section now excludes?
3. **Success criteria invalidation**: Do any non-updated Success Criteria reference outcomes
   that no longer have corresponding Functional Requirements?
4. **Edge case orphans**: Do any non-updated Edge Cases reference flows or behaviors that
   were modified or removed?

**If no issues found**: print "Regression review: No regressions detected." and proceed to Step 3f.

**If issues found**: print a regression report before proceeding:

```
Regression review: <N> issue(s) found

  1. [Section: <section name>] <description of conflict or orphaned reference>
  2. [Section: <section name>] <description>

These sections were not in the amendment scope. Options:
  (a) Auto-fix: update the flagged sections to resolve the conflicts
  (b) Proceed anyway: commit as-is and resolve manually
  (c) Cancel: abort the amendment

Enter choice (a/b/c):
```

- If user chooses (a): apply minimal fixes to the flagged sections, then proceed to Step 3f
- If user chooses (b): proceed to Step 3f without changes
- If user chooses (c): print "Amendment cancelled." and STOP (do not record or commit)
- If `--yes` flag was set: default to (a) auto-fix without prompting

**3f. Record the amendment:**
```bash
polaris agent feature record-amendment --feature <slug> --text "<amendment text>" --affected-sections "<s1>,<s2>" --wps-regenerated "<WP04>,<WP05>" --wps-locked "<WP01>,<WP02>,<WP03>" --wps-created "<WPN>" --plan-files "<data-model.md>" --json
```
Parse JSON response for `amendment_id`.

Update any `amend_history.amendment_id: "TBD"` entries in regenerated WP files with the actual `amendment_id`.

**3g. Commit all changes:**
```bash
git add polaris-specs/<slug>/
git commit -m "amend(<feature-number>): <first 60 chars of amendment text>"
```

**Step 4 - Print summary:**

```
Amendment applied: <amendment_id>
  Feature: <slug>
  Spec sections updated: <list>
  Plan artifacts updated: <list or "none">
  WPs regenerated: <list or "none">
  WPs protected (locked): <list>
  WPs created: <list or "none">

Run /polaris.autopilot to continue implementing pending WPs.
```

STOP. Do not continue to the Discovery Gate, Discovery questions, or any planning phases.

---

## Quick Mode

If user passes `--quick` or arguments contain "quick": Skip discovery gate. Assume simple complexity. Ask only: (1) What is the feature? (2) Key acceptance criteria. Generate spec directly with no clarification rounds, no separate plan phase - produce spec.md and plan.md together. Commit and report.

## Working Directory

Run from the planning repository root. NO worktrees created during specify. Artifacts go to `polaris-specs/###-feature/`. Worktrees are created later during `/polaris.implement`.

## Discovery Gate

Conduct a structured discovery interview scaled to complexity:

- **Trivial** (hello world, simple page): 1-2 questions max, then proceed
- **Simple** (small UI, minor enhancement): 2-3 questions
- **Complex** (new subsystem, integration): 3-5 questions
- **Critical** (auth, payments, infra): 5+ questions

Rules:
- Determine the full question set based on complexity tier, then present ALL questions as a **numbered list** in a single message
- End with `WAITING_FOR_DISCOVERY_INPUT`
- Developer responds with numbered answers (any order)
- If user says "just testing" or "skip questions" - minimize and use defaults
- Track questions internally (do not render table to user)
- When sufficient context gathered, present **Intent Summary** and confirm
- Empty invocation: stay in interview mode until description agreed

**Work Item Question**: Always include as one of the batch questions:
- "Is this work linked to a tracker item? (ADO: AB#12345, GitHub: #42 or URL, Jira: PROJ-123, or 'skip')"
- Auto-detect provider from input format:
  - `AB#` prefix or `dev.azure.com` URL -> ADO: fetch via ADO REST API, confirm title
  - `#` prefix or `github.com` URL -> GitHub: store number and URL
  - `PROJ-123` pattern or Jira URL -> Jira: store key and URL
- If skipped or credentials missing: proceed without link (never blocks)

**Estimation Question**: Always include as one of the batch questions (after ADO question):
- "What is the team's estimate for this work without AI assistance? (e.g., '3 days', '16 hours', '5 SP')"
- If the ADO work item has an Original Estimate or Story Points field: present it and ask to confirm or adjust
- If no ADO estimate: ask the developer to provide one
- Normalize to hours (1 day = 8h, 1 week = 40h, 1 SP = 4h; configurable in `.polaris/config.yaml` under `estimation:`)
- Store in meta.json under `estimation` field:
  ```json
  {"estimation": {"baseline_raw": "3 days", "baseline_hours": 24, "source": "developer|ado|ado-adjusted", "captured_at": "<ISO>"}}
  ```
- If skipped: proceed without estimation data (never blocks)

**Partial answer handling**: If the developer answers fewer than N questions:
1. Identify unanswered questions by number
2. Re-present only the unanswered questions (max 2 re-ask rounds)
3. After 2 rounds, use informed defaults for remaining questions
4. Document any defaulted answers in the spec's Assumptions section

## Mission Selection

After discovery, determine mission:
- **software-dev**: Building features, APIs, tools, apps (build/implement/create)
- **research**: Investigations, analysis, evaluations (research/investigate/analyze)

Confirm with user unless explicit. If `--mission <key>` provided, use it directly.

## Workflow

**IMPORTANT - Write early, write often.** Context windows can drop mid-conversation.
Create the feature directory and write files as soon as you have content - do not
accumulate everything in conversation memory. Every file write is a checkpoint that
survives context loss.

1. **Check discovery status** - stay in question loop until Intent Summary confirmed

2. **Create feature** (once discovery complete, title and mission confirmed):
   ```bash
   polaris agent feature create-feature "<slug>" --json
   ```
   Parse JSON for `feature`, `feature_dir`, `target_branch`. Run this ONCE only.

3. **Create meta.json** in feature dir:
   ```json
   {
     "feature_number": "<number>", "slug": "<full-slug>",
     "friendly_name": "<Title>", "mission": "<mission>",
     "source_description": "$ARGUMENTS",
     "created_at": "<ISO>", "target_branch": "<current-branch>", "vcs": "git",
     "ado_work_item": {"id": 12345, "type": "User Story", "title": "...", "url": "...", "parent_id": null},
     "github_issue": {"number": 42, "title": "...", "url": "..."},
     "jira_issue": {"key": "PROJ-123", "title": "...", "url": "..."}
   }
   ```
   Use the CURRENT branch for `target_branch` (from create-feature JSON output).
   Include only the detected provider's field. Omit others entirely.

   **Write discovery notes now:** Save `<feature_dir>/discovery-notes.md` with the
   Intent Summary and all Q&A answers collected so far. This protects against context
   loss during spec generation. Delete this file after spec.md is finalized.

4. **Generate spec** from discovery answers (not raw $ARGUMENTS):
   - Identify actors, actions, data, constraints, success metrics
   - For ambiguity: ask user (max 3 `[NEEDS CLARIFICATION]` markers for truly deferred decisions)
   - Fill: User Scenarios, Functional Requirements (testable), Success Criteria (measurable, tech-agnostic), Key Entities
   - **Write to `<feature_dir>/spec.md` immediately** - do not wait for later steps.
     A partial spec on disk is better than a perfect spec lost to context.

5. **Control map** (if feature has 2+ interrelated flows/forms/screens):
   Create `<feature_dir>/control-map.md`:
   ```markdown
   ## Flows
   | Flow | Purpose | Key Files |
   |------|---------|-----------|
   | <name> | <purpose> | <comma-separated paths> |

   ## Shared Dependencies
   | Component | Used By | Path |
   |-----------|---------|------|
   | <name> | <flow1>, <flow2> | <path> |
   ```
   Target: under 100 lines. Skip if single-flow feature.

6. **Validate spec** against quality checklist:
   - No implementation details, focused on user value, all sections complete
   - Requirements testable, success criteria measurable and tech-agnostic
   - If items fail: fix spec.md on disk and re-validate (max 3 iterations)
   - If `[NEEDS CLARIFICATION]` remains: present options (A/B/C/Custom) for each, update spec.md with answers
   - Save checklist to `<feature_dir>/checklists/requirements.md`

7. **Auto-review**: Re-read spec end-to-end, identify gaps, ask user if needed, update spec.md on disk.
   Delete `<feature_dir>/discovery-notes.md` once spec is finalized.

## Phase 2: Implementation Planning

Proceed directly to planning (eliminates separate `/polaris.plan` step).

**Planning interrogation** - scaled to complexity (same tiers as discovery):
- Suggest best option and confirm rather than open-ended questions
- Ask one at a time, end with `WAITING_FOR_PLANNING_INPUT`
- Summarize into **Engineering Alignment** note and confirm

**Plan generation**:
1. Run `polaris agent feature setup-plan --feature <feature-slug> --json`
2. Read spec and `.polaris/memory/constitution.md` (if exists)
3. Update Technical Context, Constitution Check (if applicable), generate research.md (if unknowns), data-model.md, contracts/, quickstart.md
4. Commit planning artifacts

## Spec Guidelines

- Focus on **WHAT** and **WHY**, never HOW (no tech stack, APIs, code structure)
- Written for business stakeholders
- Mandatory sections must be completed; remove irrelevant optional sections entirely
- Make informed guesses using industry standards; document in Assumptions
- Success criteria: measurable, tech-agnostic, user-focused, verifiable

## On Completion

- If `--no-continue`: STOP and report spec path
- If spec commit fails, do NOT auto-progress
- Default: ask "Spec and plan are ready. Proceed with autopilot? (y/n)"
  - **y** (default): Launch `/polaris.autopilot` with the current feature
  - **n**: Stop and report spec path for manual `/polaris.tasks` or `/polaris.plan`


**Telemetry**: Run: `polaris telemetry record specify --feature <slug> --phase complete --agent {{AGENT_NAME}}`
