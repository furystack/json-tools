<!-- version-type: patch -->
# frontend

## ♻️ Refactoring

### Migrated `AppBarLink` and `NestedRouteLink` to the new `path` prop

`@furystack/shades@14` renamed the `href` prop on `NestedRouteLink` to `path`,
and `@furystack/shades-common-components@16` propagated the change to
`AppBarLink`. All in-app usages (`components/header.tsx`, `pages/home.tsx`)
have been updated accordingly.

- `<NestedRouteLink href="/compare">` → `<NestedRouteLink path="/compare">`
- `<AppBarLink href="/validate">` → `<AppBarLink path="/validate">`

## 📦 Build

- Added explicit `.js` extensions to Monaco side-effect imports
  (`monaco-editor/esm/vs/editor/editor.main.js`) and the local
  `./worker-config.js` import, required by TypeScript 6's stricter
  NodeNext module resolution.
- Added an explicit `lib` entry (`ES2022`, `ESNext`, `DOM`, `DOM.Iterable`)
  to `frontend/tsconfig.json` so `Symbol.dispose` / `Symbol.asyncDispose`
  type definitions are available under TypeScript 6.

## ⬆️ Dependencies

- Bumped `@furystack/core` to `^16.0.4`
- Bumped `@furystack/shades` to `^14.0.0`
- Bumped `@furystack/shades-common-components` to `^16.0.0`
- Bumped `@furystack/inject`, `@furystack/logging`, `@furystack/rest-client-fetch`, `@furystack/utils`
- Bumped `@codecov/vite-plugin` to `^2.0.1`
- Bumped `typescript` to `^6.0.3`
- Bumped `vite` to `^8.0.10`
- Bumped `vitest` to `^4.1.5`
- Bumped `@types/node` to `^25.6.0`
