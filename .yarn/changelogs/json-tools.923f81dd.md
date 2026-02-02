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

## ✨ Features
<!-- PLACEHOLDER: Describe your shiny new features (feat:) -->

## 🐛 Bug Fixes
<!-- PLACEHOLDER: Describe the nasty little bugs that has been eradicated (fix:) -->

## 📚 Documentation
<!-- PLACEHOLDER: Describe documentation changes (docs:) -->

## ⚡ Performance
<!-- PLACEHOLDER: Describe performance improvements (perf:) -->

## ♻️ Refactoring
<!-- PLACEHOLDER: Describe code refactoring (refactor:) -->

## 🧪 Tests
<!-- PLACEHOLDER: Describe test changes (test:) -->

## 📦 Build

- Consolidated vitest configuration by replacing workspace file with inline projects in `vitest.config.mts`
- Switched coverage provider from `v8` to `istanbul`
- Renamed npm script `test:unit` to `test` for consistency

## 👷 CI

- Updated CI workflow Node.js version references

## ⬆️ Dependencies

- Updated `vitest` from 3.x to 4.x with new coverage setup
- Updated `eslint` from 9.37.x to 9.39.x and related plugins
- Updated `@playwright/test` from 1.56.x to 1.58.x
- Updated `jsdom` from 27.x to 28.x
- Updated `yarn` from 4.10.3 to 4.12.0
- Updated `prettier`, `lint-staged`, `rimraf`, and other dev dependencies

## 🔧 Chores
<!-- PLACEHOLDER: Describe other changes (chore:) -->
