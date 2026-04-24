<!-- version-type: patch -->
# json-tools

## 📦 Build

### Bumped minimum Node.js version to 22

The `engines.node` field now requires `>=22.0.0`. This aligns with the
TypeScript 6 / Vite 8 / Vitest 4 toolchain and enables the
`require(ESM)` support needed by `jsdom@29` / `html-encoding-sniffer@6`
during tests.

- Upgraded the Yarn package manager to `4.14.1`.

## ⬆️ Dependencies

- Bumped `typescript` to `^6.0.3`
- Bumped `vite` to `^8.0.10`
- Bumped `vitest` and `@vitest/coverage-*` to `^4.1.5`
- Bumped `@playwright/test` to `^1.59.1`
- Bumped `eslint` to `^10.2.1`, `typescript-eslint` to `^8.59.0`
- Bumped `eslint-plugin-jsdoc`, `eslint-plugin-playwright`
- Bumped `jsdom` to `^29.0.2`
- Bumped `lint-staged` to `^16.4.0`
- Bumped `prettier` to `^3.8.3`
- Bumped `@furystack/eslint-plugin` to `^2.2.0`
- Bumped `@furystack/yarn-plugin-changelog` to `^1.0.10`
- Bumped `@types/node` to `^25.6.0`
