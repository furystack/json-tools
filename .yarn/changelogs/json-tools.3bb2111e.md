<!-- version-type: minor -->
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

- Upgraded Yarn from 4.10.3 to 4.12.0
- Added `@furystack/yarn-plugin-changelog` for automated changelog management
- Renamed `test:unit` script to `test`, `prettier` to `format`, and `prettier:check` to `format:check`
- Consolidated `applyVersionBumps` into `applyReleaseChanges` (now includes changelog apply and formatting)
- Replaced `vitest.workspace.mts` with a unified `vitest.config.mts`

## 👷 CI

- Added `check-changelog.yml` workflow to validate changelog entries on PRs
- Added `release.yml` workflow for automated releases
- Updated `build-test.yml` and `check-version-bump.yml` pipelines

## ⬆️ Dependencies

- `@eslint/js` ^9.37.0 → ^10.0.1
- `@playwright/test` ^1.56.0 → ^1.58.2
- `@types/node` ^24.7.2 → ^25.2.2
- `@vitest/coverage-v8` ^3.2.4 → ^4.0.18
- `eslint` ^9.37.0 → ^10.0.0
- `eslint-plugin-jsdoc` ^61.1.4 → ^62.5.4
- `eslint-plugin-playwright` ^2.2.2 → ^2.5.1
- `eslint-plugin-prettier` ^5.5.4 → ^5.5.5
- `jsdom` ^27.0.0 → ^28.0.0
- `lint-staged` ^16.2.4 → ^16.2.7
- `prettier` ^3.6.2 → ^3.8.1
- `rimraf` ^6.0.1 → ^6.1.2
- `typescript-eslint` ^8.46.1 → ^8.54.0
- `vite` ^7.1.11 → ^7.3.1
- `vitest` ^3.2.4 → ^4.0.18
- Added `@vitest/coverage-istanbul` 4.0.18

## 🔧 Chores

- Renamed package from `furystack-boilerplate-app` to `json-tools`
- Updated description and repository URL in `package.json`
