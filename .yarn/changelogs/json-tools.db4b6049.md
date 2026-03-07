<!-- version-type: patch -->
# json-tools

<!--
FORMATTING GUIDE:

### Detailed Entry (appears first when merging)

Use h3 (###) and below for detailed entries with paragraphs, code examples, and lists.

### Simple List Items

- Simple changes can be added as list items
- They are collected together at the bottom of each section

TIP: When multiple changelog drafts are merged, heading-based entries
appear before simple list items within each section.
-->

## 📦 Build

- Added `@furystack/eslint-plugin` with `recommendedStrict` and `shadesStrict` rule sets
- Added `@furystack/yarn-plugin-changelog` for structured changelog management
- Restructured Vitest config from workspace-based to project-based with named test groups (Common, Service, Frontend)
- Switched test coverage provider from `v8` to `istanbul`
- Renamed scripts: `test:unit` → `test`, `prettier` → `format`, `prettier:check` → `format:check`, `applyVersionBumps` → `applyReleaseChanges`

## ⬆️ Dependencies

- Upgraded Yarn from 4.10.3 to 4.13.0
- Upgraded `eslint` from v9 to v10
- Upgraded `vitest` from 3.x to 4.x
- Upgraded `@playwright/test` from 1.56 to 1.58
- Upgraded `jsdom` from v27 to v28
- Upgraded `prettier` from 3.6 to 3.8
- Upgraded `typescript-eslint` from 8.46 to 8.56
- Upgraded `@types/node` from v24 to v25
- Various other minor dependency bumps

## 🔧 Chores

- Renamed package from `furystack-boilerplate-app` to `json-tools` with updated description and repository URL
