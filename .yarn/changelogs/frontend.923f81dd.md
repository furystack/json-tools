<!-- version-type: patch -->
# frontend

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

- Migrated inline styles to `css` property in Shades components (`Header`, `Layout`, `JsonSchemaSelector`, `ShareButton`, `ThemeSwitch`, `ComparePage`, `ValidatePage`) - leveraging the new CSS-in-JS API for cleaner styling with pseudo-class support

## 🧪 Tests
<!-- PLACEHOLDER: Describe test changes (test:) -->

## 📦 Build
<!-- PLACEHOLDER: Describe build system changes (build:) -->

## 👷 CI
<!-- PLACEHOLDER: Describe CI configuration changes (ci:) -->

## ⬆️ Dependencies

- Updated `@furystack/shades-common-components` from 10.x to 11.x (with new CSS-in-JS API)
- Updated `@furystack/shades` from 11.0.x to 11.1.x
- Updated other FuryStack packages (`core`, `inject`, `logging`, `rest-client-fetch`, `utils`)
- Updated `monaco-editor` from 0.54.0 to 0.55.1
- Updated `vite` from 7.1.x to 7.3.x and `vitest` from 3.x to 4.x

## 🔧 Chores
<!-- PLACEHOLDER: Describe other changes (chore:) -->
