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

- Migrated `MonacoModelProvider` and `ScrollService` from the `@Injectable` decorator-based class API to the new `defineService` factory API
- Replaced `injector.getInstance(...)` calls with `injector.get(...)` across components and pages to align with the new FuryStack DI resolver

## ⬆️ Dependencies

- Upgraded `@furystack/core` from v16 to v17
- Upgraded `@furystack/inject` from v12 to v13
- Upgraded `@furystack/logging` from v8 to v9
- Upgraded `@furystack/rest-client-fetch` from v8 to v9
- Upgraded `@furystack/shades` from v14 to v15
- Upgraded `@furystack/shades-common-components` from v16 to v17
- Upgraded `@furystack/utils` from v8 to v9
