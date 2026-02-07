# personal-website

This website was built with assistance from Codex.

Personal website built with Next.js App Router, TypeScript, Tailwind CSS, and Sanity CMS.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Sanity Studio + `next-sanity`
- Vercel Analytics + Speed Insights

## Requirements

- Node.js 20+
- Yarn 1.x

## Getting Started

```bash
yarn install
yarn dev
```

App: `http://localhost:3000`  
Sanity Studio: `http://localhost:3000/studio`

## Environment Variables

Create a `.env.local` file for Sanity integration:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-08-18
SANITY_API_READ_TOKEN=your_server_read_token
```

Notes:
- `SANITY_API_READ_TOKEN` is server-only (not public).
- The app can run without Sanity env vars; content sections will render with empty/fallback states.

## Scripts

- `yarn dev`: Start dev server (Turbopack).
- `yarn build`: Create production build.
- `yarn start`: Run production server.
- `yarn lint`: Run ESLint checks.
- `yarn sanity:typegen`: Regenerate Sanity schema/query TypeScript types.
- `yarn test:unit`: Run unit + integration tests with Vitest and coverage.
- `yarn test:unit:watch`: Run Vitest in watch mode.
- `yarn test:e2e`: Run Playwright end-to-end suite.
- `yarn test:e2e:headed`: Run Playwright in headed browser mode.
- `yarn test:e2e:install`: Install Playwright browser binaries.
- `yarn test`: Run unit/integration and e2e suites.

## Project Structure

```text
app/                  Next.js routes and layouts
components/           Reusable UI components
sanity/               Sanity config, schemas, and client utilities
sanity/lib/           CMS API client and query helpers
```

## Content Management

Sanity Studio is mounted under `/studio`.

Schemas:
- `sanity/schemaTypes/indexInfoType.ts`
- `sanity/schemaTypes/projectType.ts`
- `sanity/schemaTypes/linkType.ts`

After schema/query updates, run:

```bash
yarn sanity:typegen
```

## Build and Quality Checks

Before opening a PR:

```bash
yarn lint
yarn build
```

## Testing

This repository includes:
- Unit tests (component and helper behavior)
- Integration tests (App Router pages/layouts with mocked boundaries)
- E2E tests (Playwright smoke and routing flows)

### Test Environment

- `.env.test` is loaded by both `vitest.config.ts` and `playwright.config.ts`.
- Keep test-safe values in `.env.test` so tests don’t depend on production secrets.

### Run Tests

```bash
yarn test:unit
yarn test:e2e:install
yarn test:e2e
```

## Deployment

Deploy on Vercel or any platform that supports Next.js.

Set the same environment variables from `.env.local` in your deployment target.
