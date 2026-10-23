# React Admin Template

React admin SPA starter. It ships the app shell, auth flows, organization and member management, an activity log, and shared building blocks (forms, filters, tables, authorization, theme/palette management) that new feature modules plug into.

This is a **showcase and starter template** of a production-shaped React admin application. Auth uses Better Auth cookie sessions with MSW mock support out of the box.

## Technical Stack

| Area         | Choice                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------ |
| Framework    | [React 19](https://react.dev/), [Vite 8](https://vite.dev/), TypeScript 5                                          |
| UI           | [HeroUI v3](https://heroui.com/), [Tailwind CSS v4](https://tailwindcss.com/), [Lucide](https://lucide.dev/) icons |
| Routing      | [TanStack Router](https://tanstack.com/router) (file-based, `src/app/routes/`)                                     |
| Server state | [TanStack Query](https://tanstack.com/query), Axios                                                                |
| Forms        | [TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev/)                                               |
| Auth         | [Better Auth](https://www.better-auth.com/) client (cookie sessions)                                               |
| i18n         | [Lingui](https://lingui.dev/) (`en`, `tr`)                                                                         |
| Quality      | Biome, Vitest, Stylelint, Knip, jscpd, Dependency Cruiser                                                          |

## Features

- Sign in, register, forgot and reset password (Better Auth)
- Account area: profile, password, sessions, account deletion
- Organization: rename, members (add, change role, ban, remove), roles and permissions
- Policy-based authorization for routes, navigation items, and actions
- English / Turkish UI localization (`en`, `tr`), light/dark theme, and multiple color palettes
- Mocked Better-Auth & API handlers with Mock Service Worker (MSW)
- Dashboard placeholder and modular architecture ready for new feature modules

## Prerequisites

- Node.js (`>=22.23.4`) and pnpm (`>=9.12.0`) as defined in [`package.json`](package.json)
- Companion API running at `http://localhost:3000` or MSW mocking enabled (`VITE_APP_ENABLE_API_MOCKING=true`)

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create the environment configuration file:

   ```bash
   cp .env.example .env
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

Vite serves the app at **http://localhost:4200** (or the next free port).

### Environment Variables

| Variable                      | Default                 | Description                    |
| ----------------------------- | ----------------------- | ------------------------------ |
| `VITE_APP_API_URL`            | `http://localhost:3000` | API origin (no trailing slash) |
| `VITE_APP_ENABLE_API_MOCKING` | `true`                  | Enable MSW mock service worker |

`VITE_*` values are bundled into the client build, so never put sensitive secrets in them.

## Available Scripts

| Command                         | Description                                                   |
| ------------------------------- | ------------------------------------------------------------- |
| `pnpm dev`                      | Vite dev server (port 4200)                                   |
| `pnpm build`                    | Catalog extraction, type check (`tsc -b`), production bundle  |
| `pnpm build:source`             | Production build with bundle visualizer analysis              |
| `pnpm build:sourcemap`          | Production build with source maps                             |
| `pnpm preview`                  | Serve the production build (port 4200)                        |
| `pnpm test` / `pnpm test:watch` | Vitest once / in watch mode                                   |
| `pnpm typecheck`                | `tsc -b` type check                                           |
| `pnpm lint` / `pnpm lint:ci`    | Biome check & fixes with dependency-cruiser / CI check only   |
| `pnpm lint:css`                 | Stylelint for CSS files                                       |
| `pnpm lint:deps`                | Dependency Cruiser architecture validation                    |
| `pnpm knip`                     | Detect unused files, exports, and dependencies                |
| `pnpm jscpd`                    | Duplicate code analysis                                       |
| `pnpm intl:extract`             | Extract messages into Lingui catalogs and sync translations   |
| `pnpm generate`                 | Scaffold feature modules with the Plop generators             |
| `pnpm script:check-docs`        | Verify documentation and link integrity                       |
| `pnpm agents:heroui`            | Update HeroUI documentation reference (`AGENTS.md`)           |

### Generators

`pnpm generate` scaffolds a feature module from the same patterns the
`products` module implements, so a new module does not start as a blank folder.

```bash
pnpm generate            # interactive picker
pnpm generate api invoice
```

### Running several generators at once

`pnpm generate all` opens a checkbox instead of a single-choice list. Tick with
`Space`, `a` toggles all, `Enter` confirms:

```bash
pnpm generate all
pnpm generate all invoice invoices "types,config,api"
```

Selections are always executed in dependency order, not the order you ticked
them, and the route tree is regenerated once at the end. If the selection leaves
a generator without something it imports, the output lists what is missing
rather than leaving you to discover it at `pnpm typecheck`.

### Granular generators

| Generator | Produces |
| --- | --- |
| `types`   | `types/<entity>.types.ts` — entity plus a `draft`/`active`/`archived` status enum |
| `config`  | `config/<entity>.constants.ts` and `config/<plural>-filter.config.ts` — status options and the URL-backed filter/sort config |
| `api`     | Query-key factory, list and detail queries, create/update/delete mutations |
| `modal`   | `components/modals/delete-<entity>-modal.tsx` |
| `detail`  | Query boundary, status chip, detail view and content |
| `form`    | Shared form, form options, entity-to-form mapper, create and edit views |
| `list`    | List view, data table and column definitions |
| `routes`  | The four file-based routes, then regenerates `route-tree.gen.ts` |

Generators only write production code. Tests are written by hand, so a new
module ships without the scaffolding of specs that its first real test would
replace anyway.

Every generator asks for an entity name (`invoice`) and a feature folder, and
derives all other names from it: `Invoice`, `Invoices`, `invoiceId`,
`invoiceKeys`, `/invoices`, `/api/invoices`. Generated files are formatted with
Biome before they are written, so `pnpm lint:ci` stays green.

The entity shape is deliberately generic (`name`, `description`, `status`) —
domain fields are added by hand on top. The shared files that need editing (the
sidebar, the local-storage keys and the MSW handlers) are listed in the
generator's output rather than patched automatically.

Templates live in `generators/<name>/*.hbs` and are covered by
`generators/__tests__/templates.spec.ts`, which renders each one and checks the
result parses.

### Build Validation

`pnpm build` executes the following sequence:

1. `intl:build` (`intl:extract`): Extracts UI strings with Lingui and synchronizes English message strings.
2. `tsc -b`: Project type checking with no emit.
3. `vite build`: Production asset compilation and bundling.

## Project Structure

```text
src/
├── api/          # Shared API calls, endpoints, and query keys
├── app/          # Router setup, routes, providers, layouts, progress indicator
├── assets/       # Static assets, icons, illustration SVGs
├── components/   # Shared UI components (atoms, molecules, organisms)
├── config/       # App constants, environment validation, route definitions
├── features/     # Feature-driven modules (auth, account, dashboard)
├── hooks/        # Shared custom React hooks
├── lib/          # Integration wrappers (Better Auth client, axios, i18n, zod)
├── locales/      # Lingui message catalogs (en, tr)
├── stores/       # Application context and state stores
├── styles/       # Tailwind CSS & global theme stylesheets
├── testing/      # Test helpers, test providers, and MSW mocks
├── types/        # Shared TypeScript interfaces and types
└── utils/        # Pure utilities and helper functions
```

## Conventions

- **HeroUI**: Component styling and primitives are based on HeroUI **v3** (see [`AGENTS.md`](AGENTS.md)).
- **Code Quality**: Biome enforces formatting and linting, Stylelint checks CSS, knip detects unused code, and Dependency Cruiser prevents illegal module cross-imports.
- **Localization**: UI strings are wrapped with Lingui macros (`t`, `<Trans />`) supporting English and Turkish.

## CI

The GitHub Actions workflow ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) validates secrets via Gitleaks, checks documentation integrity, runs Knip, jscpd, Biome, Stylelint, TypeScript type checks, Vitest unit tests, and the production build.

## License

[MIT](LICENSE) © 2026 Anil Karaabali

