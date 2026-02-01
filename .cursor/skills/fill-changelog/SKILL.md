---
name: fill-changelog
description: Fill changelog entries for the current branch. Use when the user asks to fill changelog, write changelog entries, update changelog, or prepare changelog for a PR.
---

# fill-changelog

Automate filling changelog entries based on the changes in the current branch.

## Prerequisites

Version bumps MUST be configured before running this skill. If `yarn version check` fails, version files need to be adjusted first using `yarn version patch/minor/major` or `yarn bumpVersions` (interactive).

## Workflow

### Step 1: Validate Version Configuration

Run `yarn version check` to validate version manifests exist:

```bash
yarn version check
```

**If fails:** Stop and report error. The user must run `yarn version patch`, `yarn version minor`, `yarn version major`, or `yarn bumpVersions` first to configure version bumps.

### Step 2: Create/Recreate Changelog Drafts

Run with force flag to ensure all drafts are created or recreated:

```bash
yarn changelog create -f
```

This creates files in `.yarn/changelogs/` with the pattern `{package-name}.{manifest-id}.md`.

### Step 3: Analyze Branch Changes

Gather information about changes:

```bash
git diff master...HEAD --stat
git log master...HEAD --oneline
```

Read the changed files to understand what was actually modified.

### Step 4: Read Changelog Drafts

Use Glob to find `.yarn/changelogs/*.md` files, then Read to load their content.

### Step 5: Fill Changelog Entries

Map changes to the appropriate sections and fill the changelog drafts.

## Section Mapping

| Section             | When to Use                                    |
| ------------------- | ---------------------------------------------- |
| ✨ Features         | New functionality, new files, new capabilities |
| 🐛 Bug Fixes        | Corrections to existing behavior               |
| 📚 Documentation    | README, comments, documentation files          |
| ⚡ Performance      | Optimizations                                  |
| ♻️ Refactoring      | Code restructuring without behavior change     |
| 🧪 Tests            | Test additions/modifications                   |
| 📦 Build            | Build system, dependencies configuration       |
| 👷 CI               | CI/CD configuration changes                    |
| ⬆️ Dependencies     | Dependency updates                             |
| 🔧 Chores           | Other maintenance tasks                        |
| 💥 Breaking Changes | Major version only (REQUIRED)                  |
| 🗑️ Deprecated       | Minor/Major versions only                      |

## Quality Guidelines

### Writing Style: Documentation, NOT Git Log

Write for package consumers, not as git history.

**Avoid vague terms:**

- "improved", "updated", "refactored", "fixed bugs", "changed internal implementation"

**Use specific, actionable language:**

- "Added dark theme support with automatic system preference detection"
- "Fixed JSON validation not detecting trailing commas"

### Version-Specific Requirements

**Major Versions:**

- Document ALL breaking changes with descriptive titles
- Explain WHAT changed and WHY
- Include before/after code examples using ❌/✅ markers
- Provide migration guide with step-by-step instructions
- Explain impact (who is affected)

**Minor Versions:**

- Document new features with descriptive titles
- Provide usage examples
- Explain benefits/use cases

**Patch Versions:**

- Be specific about bug fixes (not vague "fixed bugs")
- Describe what was broken

## Entry Format Examples

### Simple List (straightforward changes)

```markdown
## ✨ Features

- Added JSON schema validation support
- Implemented diff view for comparing JSON files
```

### Detailed Entry (complex changes)

```markdown
## ✨ Features

### New JSON Schema Validation

Validate JSON documents against JSON Schema drafts.

**Usage:**

Select a schema from the dropdown and paste your JSON to validate.
```

## Validation

After filling entries, run:

```bash
yarn changelog check
```

This validates:

- Every release has a changelog file
- Major releases have filled "💥 Breaking Changes" section
- At least one section has content
- Version type matches the manifest
