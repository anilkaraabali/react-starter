# Admin Starter: Admin App

React admin SPA for the companion API. It ships the app shell, auth flows, organization and member management, an activity log and the shared building blocks (forms, filters, tables, authorization, feature flags) that new feature modules plug into.

This is a **personal showcase** of a production-shaped React admin. It is not a hosted product. Auth uses the API's cookie sessions; do not commit real credentials.

## Technical Stack

| Area         | Choice                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------ |
| Framework    | [React 19](https://react.dev/), [Vite 8](https://vite.dev/), TypeScript 5                                          |
| UI           | [HeroUI v3](https://heroui.com/), [Tailwind CSS v4](https://tailwindcss.com/), [Lucide](https://lucide.dev/) icons |
| Routing      | [TanStack Router](https://tanstack.com/router) (file-based, `src/app/routes/`)                                     |
| Server state | [TanStack Query](https://tanstack.com/query) + [Orval](https://orval.dev/)-generated hooks, Axios                  |
| Forms        | [TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev/)                                               |
| Auth         | [Better Auth](https://www.better-auth.com/) client (cookie sessions)                                               |
| i18n         | [Lingui](https://lingui.dev/) (`en`, `tr`)                                                                         |
| Quality      | Biome, Vitest, knip, jscpd                                                                                         |

Full stack table: [`.agents/admin/reference.md` § Stack](.agents/admin/reference.md#technology-stack).

## Features

- Sign in, register, forgot and reset password (Better Auth via the API)
- Account area: profile, password, sessions, account deletion
- Organization: rename, members (add, change role, ban, remove), roles and their permissions
- Policy-based authorization for routes, sidebar items and actions
- English / Turkish UI, light/dark theme and color palettes
- Mocked Better-Auth with MSW
- Dashboard placeholder, ready for feature modules

## Prerequisites

- Node.js and pnpm versions from the root [`package.json`](package.json) (`engines`, `packageManager`)
- A running API (default `http://localhost:3000`)

## Getting Started

1. Install dependencies from the repo root:

   ```bash
   pnpm install
   ```

2. Create the env file:

   ```bash
   cp apps/admin/.env.example apps/admin/.env
   ```

3. Start the dev server:

   ```bash
   pnpm --filter @admin-starter/admin dev
   ```

Vite serves the app at **http://localhost:4200** (or the next free port). Register a user from the sign-up page.

### Environment

| Variable                      | Default                 | Description                    |
| ----------------------------- | ----------------------- | ------------------------------ |
| `VITE_APP_API_URL`            | `http://localhost:3000` | API origin (no trailing slash) |
| `VITE_APP_ENABLE_API_MOCKING` | `true`                  | Enable MSW mock service worker |

`VITE_*` values are copied into the client bundle, so never put secrets in them. Rules for adding a variable: [reference.md § Environment](.agents/admin/reference.md#environment-variables).

## Available Scripts

Run from this folder with `pnpm <script>`, or from the repo root with `pnpm --filter @admin-starter/admin <script>`.

| Command                         | Description                                                   |
| ------------------------------- | ------------------------------------------------------------- |
| `pnpm dev`                      | Vite dev server (port 4200)                                   |
| `pnpm build`                    | Catalog extraction, type check, production bundle (see below) |
| `pnpm preview`                  | Serve the production build (port 4200)                        |
| `pnpm test` / `pnpm test:watch` | Vitest once / in watch mode                                   |
| `pnpm typecheck`                | `tsc --noEmit`                                                |
| `pnpm lint` / `pnpm lint:ci`    | Biome check with fixes / CI check only                        |
| `pnpm lint:css`                 | Stylelint for CSS                                             |
| `# (Orval optional)`            | Regenerate the API client from `../api/swagger.json`          |
| `pnpm intl:extract`             | Extract messages into the Lingui catalogs (`--clean`)         |
| `pnpm agents:heroui`            | Optional: download HeroUI docs for AI agents (local only)     |

Every script, with when to use it: [`.agents/admin/commands.md`](.agents/admin/commands.md).

### Build Validation

`pnpm build` runs these steps in order:

1. `intl:build` → `intl:extract`: `lingui extract --clean` rewrites the catalogs and drops obsolete entries, then the sync script fills English `msgstr` values.
2. `tsc`: type check (no emit).
3. `vite build`: production bundle.

`build:sourcemap` and `build:source` (bundle analyzer) run the same build with extra output.

### API Client

The API writes `swagger.json` when it starts outside production. With the API running locally, run `# (Orval optional)` to refresh `src/api/`; commit the result and never edit it by hand.

## Project Structure

```text
src/
├── app/          # routes, layouts (admin, auth, error), router, providers
├── api/generated # Orval output (do not edit)
├── assets/       # global static assets
├── components/   # shared UI (atoms, molecules, organisms)
├── config/       # app-wide constants, env.ts
├── features/     # domain feature modules
├── hooks/        # shared React hooks
├── lib/          # library wrappers (zod, axios, auth-client, etc.)
├── locales/      # Lingui message catalogs
├── stores/       # global client stores
├── styles/       # global CSS & Tailwind
├── types/        # shared domain-agnostic types
└── utils/        # pure helpers
```

Folder rules, co-location and import boundaries: [`.agents/admin/project-structure.md`](.agents/admin/project-structure.md). Adding a feature: [feature-module skill](.agents/skills/feature-module/SKILL.md).

## Conventions

- Naming (files, folders, exports, routes, policies): [`.agents/admin/reference.md` § Naming](.agents/admin/reference.md#naming-conventions). Generated API types keep Orval's names (`*Dto`, `*Params`).
- Agent rules and task skills: [`AGENTS.md`](./AGENTS.md). HeroUI is **v3**, not v2.
- English for comments, docs, commits and UI source strings; Conventional Commits (see the root [`AGENTS.md`](AGENTS.md)).

## CI

The root workflow (`.github/workflows/ci.yml`) runs knip, jscpd, Biome, type checks, tests and the production build via Turbo when this app is affected.

## License

[MIT](LICENSE) © 2026 Anil Karaabali
