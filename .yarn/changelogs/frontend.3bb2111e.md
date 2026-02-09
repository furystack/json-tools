<!-- version-type: minor -->
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

### Redesigned Home Page

The landing page now uses a card-based layout with `PageContainer`, `Card`, `CardHeader`, `CardContent`, and `CardActions` components, providing a cleaner visual hierarchy for the available tools.

### Auto-Hiding App Bar

Adopted the `PageLayout` component with `auto-hide` variant for the app bar, replacing the previous manual scroll-based visibility logic.

## ♻️ Refactoring

- Migrated routing from `Router` to `NestedRouter` and links from `RouteLink` to `NestedRouteLink` (shades v12 API)
- Replaced `useDisposable` + `ObservableValue` pattern with the `useState` hook in `JsonSchemaSelector`
- Migrated Monaco editor and diff editor components to use `useRef`, `useHostProps`, and disposable lifecycle patterns
- Moved inline styles to component-level `css` property in `ComparePage`, `ValidatePage`, `JsonSchemaSelector`, and `Home`
- Replaced manual layout styling in `Layout` with the `PageLayout` component
- Updated Monaco JSON language import path in `MonacoModelProvider`

## 🧪 Tests

- Updated E2E visual snapshots to match the redesigned home page
- Added placeholder unit test

## ⬆️ Dependencies

- `@furystack/shades` ^11.0.28 → ^12.0.0
- `@furystack/shades-common-components` ^10.0.28 → ^12.0.0
- `@furystack/core` ^15.0.27 → ^15.0.35
- `@furystack/inject` ^12.0.21 → ^12.0.29
- `@furystack/logging` ^8.0.21 → ^8.0.29
- `@furystack/rest-client-fetch` ^8.0.27 → ^8.0.35
- `@furystack/utils` ^8.1.3 → ^8.1.9
- `@types/node` ^24.7.2 → ^25.2.2
- `monaco-editor` ^0.54.0 → ^0.55.1
- `vite` ^7.1.11 → ^7.3.1
- `vitest` ^3.2.4 → ^4.0.18
