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

## ♻️ Refactoring

- Migrated all components from Shadow DOM (`shadowDomName`) to Light DOM (`customElementName`) for Shades v13 compatibility
- Replaced `constructed` lifecycle with `render`-based initialization using `useRef`, `useDisposable`, and `useHostProps` in Monaco editors
- Replaced `Router`/`RouteLink` with `NestedRouter`/`NestedRouteLink`
- Replaced `ObservableValue` local state with `useState` hook in `JsonSchemaSelector`
- Adopted `PageLayout` component with auto-hide app bar, simplifying `Layout` and `Header`
- Moved inline styles to component-level `css` property across multiple components
- Redesigned home page using `Card`, `CardHeader`, `CardContent`, and `CardActions` components
- Replaced `element` direct access with `useRef` pattern in page components
- Removed `any` type cast from diff editor options in compare page
- Imported `getTextColor` as a standalone function instead of a `ThemeProviderService` method

## ⬆️ Dependencies

- Upgraded `@furystack/shades` from v11 to v13
- Upgraded `@furystack/shades-common-components` from v10 to v14
- Upgraded `monaco-editor` from 0.54 to 0.55
- Upgraded `vite` from 7.1 to 7.3
- Upgraded `vitest` from 3.x to 4.x
- Upgraded `@types/node` from v24 to v25
