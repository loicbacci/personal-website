# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js App Router project with Sanity CMS integration.

- `app/`: route files, layouts, and global styles (`app/page.tsx`, `app/projects/page.tsx`, `app/layout.tsx`).
- `components/`: reusable UI and rendering helpers (for example `Header.tsx`, `ProjectsList.tsx`, `portableText.tsx`).
- `sanity/`: CMS client setup, schemas, structure config, and generated type artifacts.
- Root config: `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `.prettierrc.json`.

Keep feature logic close to its route/component, and place shared CMS utilities under `sanity/lib/`.

## Build, Test, and Development Commands
Use Yarn (the repo includes `yarn.lock`).

- `yarn dev`: start local dev server with Turbopack.
- `yarn build`: create a production build.
- `yarn start`: run the production server from the build output.
- `yarn lint`: run Next.js + TypeScript ESLint checks.
- `yarn sanity:typegen`: extract schemas and regenerate Sanity types.
- `yarn test:unit`: run Vitest unit + integration tests with coverage.
- `yarn test:e2e`: run Playwright end-to-end tests.
- `yarn test`: run all tests (`test:unit` + `test:e2e`).

Before opening a PR, run `yarn test`, `yarn lint`, and `yarn build`.

## Coding Style & Naming Conventions
- Language: TypeScript (`.ts`/`.tsx`).
- Indentation: 2 spaces (`.editorconfig`, Prettier `tabWidth: 2`).
- Formatting: single quotes, JSX single quotes, semicolons, trailing commas (`es5`).
- Linting: `next/core-web-vitals`, `next/typescript`, and `prettier`.
- Naming: React components in PascalCase (`Layout.tsx`), utility modules in lower camel/single-word style (`client.ts`, `image.ts`).

Run `yarn lint` before committing; keep diffs formatting-clean.

## Testing Guidelines
The repository uses:
- Vitest + Testing Library for unit and integration tests.
- Playwright for end-to-end tests.

Keep tests in `tests/` (current convention) using:
- `tests/unit/` for focused unit tests.
- `tests/integration/` for App Router/component integration tests.
- `e2e/` for Playwright specs.

Use `.env.test` for test-safe environment variables used by Vitest and Playwright.

## Commit & Pull Request Guidelines
Recent commits use short, imperative, sentence-style messages (for example: `Added vercel analytics`, `Fixed build`). Follow that pattern and keep each commit focused.

PRs should include:
- a concise description of what changed and why,
- linked issue/task (if applicable),
- screenshots or short recordings for UI updates,
- notes about schema/content model changes and whether `yarn sanity:typegen` was run.
