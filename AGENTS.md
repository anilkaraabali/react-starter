# AGENTS.md

<!-- intent-skills:start -->
## Skill Loading

Use the repository’s installed Intent. If it is unavailable, report the missing dependency instead of downloading a replacement.
Before editing files for a substantial task:
- Run `pnpm exec intent list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `pnpm exec intent load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

## Project Overview

A scalable admin template built on modern React best practices and bulletproof architecture:

- **React Vite**: Modern Vite-based React 19 application
- **TypeScript 5**: Strict mode enabled
- **Tailwind CSS v4 & HeroUI v3**: Modern styling & accessible UI primitives
- **TanStack**: Router (file-based), Query v5 (server state), Form (form management)
- **Better Auth**: Cookie-based authentication & session management
- **Lingui**: Internationalization with message catalogs

## Setup Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Type check
pnpm typecheck

# Run tests
pnpm test

# Extract Lingui messages / verify catalogs are in sync
pnpm intl:extract
pnpm intl:check

# Lint and auto-fix code style & dependencies
pnpm lint

# CI verification (read-only lint & dependency check)
pnpm lint:ci

# Build for production
pnpm build

# Quality checks
pnpm knip      # Detect unused code & exports
pnpm jscpd     # Detect code duplication
```

## Project Structure

The codebase follows a feature-based architecture organized as follows:

```
src/
├── app/              # Application layer (routes, layouts, providers, router)
├── assets/           # Global static assets (SVGs, images, fonts)
├── components/       # Shared UI components (Atomic Design: atoms, molecules, organisms)
├── config/           # Global configurations, env validation, route definitions
├── features/         # Feature-based modules (products, users, etc.)
├── hooks/            # Shared React hooks
├── lib/              # Preconfigured libraries (api-client, react-query, auth-client, etc.)
├── locales/          # Lingui PO translation catalogs
├── styles/           # Global CSS, theme, and Tailwind setup
├── testing/          # Test utilities, mocks, and MSW handlers
├── types/            # Shared TypeScript types
└── utils/            # Shared utility functions
```

### Feature Structure

Each feature should be self-contained:

```
src/features/awesome-feature/
├── api/              # API queries, mutations, and query keys factory (*.keys.ts)
├── components/       # Feature-specific components, views (*-view.tsx), forms, tables
├── config/           # Feature-specific constants and options
├── hooks/            # Feature-specific hooks
├── types/            # Feature-specific types and schemas
└── utils/            # Feature-specific utilities and mappers
```

## Code Standards

### TypeScript
- **Strict mode enabled** - All TypeScript strict checks are enforced
- **Type-first approach** - Use `type` aliases for props and domain data; reserve `interface` strictly for `declare module` augmentation
- **Absolute imports** - Use `@/` prefix for all src imports (e.g., `@/components/atoms/logo`)
- **Zero barrel files** - Import directly from atomic files; never use `index.ts`

### Code Style
- **Biome** configured for formatting, linting, and imports
- **PascalCase** for React components
- **camelCase** for functions and variables
- **Sentence case for buttons and actions** - Use sentence case for button labels and action texts (e.g., "Add product", "Save changes", "Create member"; NOT Title Case like "Add Product" or "Save Changes")

### File Naming Conventions
- **Components** - `kebab-case.tsx` (e.g., `user-profile.tsx`, `product-view.tsx`)
- **Hooks** - `use-kebab-case.ts` (e.g., `use-discussions.ts`, `use-disclosure.ts`)
- **Utilities** - `kebab-case.ts` (e.g., `format-date.ts`, `format-currency.ts`)
- **Types** - `kebab-case.ts` (e.g., `api-types.ts`, `user.types.ts`)
- **Folders** - `kebab-case` throughout the entire repository

### Architecture Rules
- **No cross-feature imports** - Features should not import from each other
- **Unidirectional flow** - Code flows: shared → features → app
- **Colocation** - Keep related code as close as possible to where it's used

## Component Guidelines

### Best Practices
- **Composition over props** - Use children/slots instead of many props
- **Single responsibility** - Shared components in `src/components/` must be pure ("dumb") with zero router, auth, or API dependencies
- **Extract render functions** - Move complex JSX into separate components
- **Limit prop count** - Consider composition if accepting too many props
- **Atomic Design** - Higher level imports lower level (`organisms` → `molecules` → `atoms`; never reverse)

### Styling
- **Tailwind CSS v4** is the primary styling solution
- **HeroUI v3** components built on React Aria primitives

## State Management Strategy

### Component State
- Use `useState` for simple independent state
- Use `useReducer` for complex state with multiple related updates

### Server State

- **TanStack Query** for all asynchronous server cache
- Global error handling via `QueryCache` / `MutationCache` and toast alerts (`toast.danger`); opt-out with `meta: { handleGlobalError: false }`

### Form State
- **TanStack Form** for form management
- **Zod** for form validation schemas
- Create reusable Form and Input components

### Application State
- **React Context** (Kent C. Dodds pattern) for local and app-wide UI state (active drawer, theme, preferences)
- Keep `createContext`, `<Name>Provider`, and `use<Name>()` in one atomic file; fail-fast if rendered outside provider

## API Layer

- **HTTP Client** - Configured Axios instance (`src/lib/api-client.ts`) with `withCredentials: true`
- **Queries & Mutations** - TanStack Query hooks organized by feature under `src/features/<feature>/api/`
- **Query Keys** - Dedicated query keys factory per feature (`<feature>.keys.ts`) for predictable cache invalidation
- **Global Error Handling** - Handled centrally by query cache; display localized toast notifications

```ts
// src/features/<feature>/api/get-<resource>.ts
export const getProducts = (params?: GetProductsParams, signal?: AbortSignal) =>
  api.get<never, ProductsResponseDto>('/api/products', { params, signal });

export const getProductsQueryOptions = (params?: GetProductsParams) =>
  queryOptions({
    queryKey: productKeys.list(params),
    queryFn: ({ signal }) => getProducts(params, signal),
  });

export const useProducts = ({ params, queryConfig }: UseProductsOptions = {}) =>
  useQuery({ ...getProductsQueryOptions(params), ...queryConfig });
```

## Testing Strategy

### Unit & Integration Tests
- **Vitest & Testing Library** - Co-located in `__tests__/` subdirectories using `<name>.spec.ts(x)`
- **Render Wrapper** - Use `renderWithI18n` (`src/testing/render.tsx`) for components requiring translation context
- **Mocking** - Mock API calls using MSW (Mock Service Worker) handlers in `src/testing/mocks/`
- **Lingui Macro** - Never mock `@lingui/core/macro`; transformed automatically during test runs

## Security Considerations

### Authentication
- **HttpOnly Cookies** - JWT & session tokens stored in secure `HttpOnly` cookies (never `localStorage` or `sessionStorage`)
- **Better Auth Client** - Built-in session state management (`authClient.useSession`) with automatic session tracking
- **Automatic Session & Token Refresh** - Handled seamlessly via Better Auth cookie lifecycle and Axios interceptors
- On `401 Unauthorized` responses, clear local session state and redirect to login

### Authorization
- **RBAC (Role-Based Access Control)** for basic permissions
- **PBAC (Permission-Based Access Control)** for granular control
- **Client-side authorization for UX** (always validate server-side)
- Use policy-based authorization checks (`@/lib/authorization`) instead of hardcoding raw role strings in UI components
- Restrict route access at loader or layout level using authenticated context and policies

### XSS Prevention
- `dangerouslySetInnerHTML` is strictly prohibited
- Sanitize all user inputs before rendering
- Use DOMPurify for HTML content sanitization
- Validate and escape data at boundaries
- Ensure external links with `target="_blank"` include `rel="noopener noreferrer"`
- Rely on React's automatic JSX encoding and validate user-supplied URLs

## Performance Optimization

### Code Splitting
- **Route-level splitting** - Lazy load pages/routes automatically via TanStack Router
- **Avoid excessive splitting** - Balance network requests vs bundle size; don't split small atomic components

### React Optimizations
- **Children prop pattern** - Prevent unnecessary re-renders of heavy subtrees using composition
- **State colocation** - Keep state as close to where it's used as possible
- **State initializer functions** - Use lazy initial state (`useState(() => computeExpensiveValue())`) for heavy computations

### Image Optimization
- **Lazy loading** - Native lazy loading (`loading="lazy"`) for images outside viewport
- **Modern formats** - Prefer WebP/AVIF with suitable fallbacks
- **Responsive images** - Use `srcset` and `sizes` attributes for resolution switching

## Error Handling

### API Errors
- **Global error interceptor** in API client (`src/lib/api-client.ts`)
- **Automatic error notifications** via toast system (`toast.danger`)
- **Automatic token refresh & redirect** on 401 Unauthorized errors

### Application Errors
- **Error Boundaries at feature level** (not just root app level)
- **Graceful fallbacks** for broken components via localized error UI
- **Sentry integration** for production error tracking when configured

## Build and Deployment

### Development
- **Vite** for fast development builds and HMR
- **TypeScript strict mode** for compile-time safety
- **Biome** for formatting, linting, and imports code quality

### Production
- **Deploy to CDN platforms** - Vercel, Netlify, or AWS CloudFront
- **Source maps** uploaded to Sentry for error tracking
- **Environment configuration** via `.env` files with validation (`src/config/env.ts`)

## Development Workflow

### Git Hooks (Husky & lint-staged)
- **Pre-commit** - Automated via `lint-staged`:
  - Biome formatting & lint check (`biome check --write`)
  - TypeScript type check (`tsc --noEmit`)
  - Related unit tests on staged files (`vitest related --run`)
  - CSS style linting (`stylelint --fix`)
- Ensure all automated checks pass before committing

## Common Patterns

### Feature Development
- Start with API types and validation schemas
- Create API fetcher functions and React Query hooks (`src/features/<feature>/api/`)
- Build UI components with proper TypeScript integration (`src/features/<feature>/components/`)
- Add unit/integration tests covering the feature workflow (`__tests__/*.spec.tsx`)
- Register file-based routes under `src/app/routes/`

### Component Creation
- Follow Atomic Design (`atoms` → `molecules` → `organisms`) in `src/components/` or feature-level `components/`
- Prioritize composition over prop drilling
- Keep shared components pure with zero router/auth/API dependencies
- Include unit tests for components with logic in co-located `__tests__/`

### State Management
- Start with local component state (`useState`, `useReducer`)
- Lift to parent component if needed by siblings
- Application UI state in React Context (provider + custom hook in one file)
- Server state in TanStack Query (with query key factory)
- Form state in TanStack Form + Zod

## Lingui (i18n)

- Lingui Agent Skills are installed in the gitignored .agents/skills directory (`lingui-best-practices`, `find-unwrapped-strings`, `enhanced-message-context`, `lingui-framework-setup`, `migrate-i18next-to-lingui`, `swc-plugin-compatibility`). Read the relevant skill before i18n work. Restore the skills from the tracked `skills-lock.json` with `npx skills experimental_install`.
- Lingui docs for agents: https://lingui.dev/llms.txt. Any doc page is available as Markdown by appending `.md` to its URL.
- Use the macro hook (`useLingui` from `@lingui/react/macro`) in components; import `i18n` directly from `@lingui/core` (`src/lib/i18n.ts` only exports `loadCatalog` / `getSavedLanguage`).
- The saved locale is activated in `src/main.tsx` before `App` is imported; `loadCatalog` is the single place that activates a locale and sets `<html lang>`.
- Never translate at module scope (`i18n._`/`t` in top-level constants or zod schemas). Use `msg` descriptors or zod `{ error: () => ... }` so messages resolve at render/validation time.
- `pnpm intl:extract` updates the catalogs; `pnpm intl:check` (CI) fails on stale catalogs or missing `tr` translations. The `pseudo` locale is a development-only QA locale.

## Better Auth

Auth uses the Better Auth client (`src/lib/auth-client.ts`). Before changing auth flows, read the Better Auth skills in the gitignored .agents/skills directory (`better-auth-best-practices`, `better-auth-security-best-practices`, `email-and-password-best-practices`, `two-factor-authentication-best-practices`, `organization-best-practices`, `create-auth`). Docs as Markdown: https://better-auth.com/llms.txt. Restore skills with `npx skills experimental_install`.

## Custom Biome rules

GritQL plugins in `plugins/` (registered under `plugins` in `biome.json`) run with `pnpm lint` / `biome ci` and fail as errors. They are syntactic, not type-aware:

- `no-lingui-format-helpers`: `i18n.number()` / `i18n.date()` (deprecated) → `formatNumber` / `Intl.DateTimeFormat`.
- `no-runtime-use-lingui`: `useLingui` from `@lingui/react` → `@lingui/react/macro`.
- `no-implicit-locale-format`: argument-less `toLocaleString/DateString/TimeString()`.
- `no-module-level-t`: `t` macro outside a function → `msg`.

Justified exceptions: `// biome-ignore lint/plugin: <reason>` on the line above.

## Sidebar

- Sidebar items (`SidebarNavItem`) are either a direct link (`to`) or a group heading with `children` links (one level only). A group has no `to`; the types forbid it.
- Groups are keyed by their label message id, start expanded and only a click on the heading collapses or expands them (also the active one). Navigation never changes group state, and the state lives in memory only (not `localStorage`), so a reload expands everything again.
- Top-level pages live in the "Overview" group of `src/app/layouts/admin-layout/sidebar-items.ts`.

---






<!-- HEROUI-REACT-AGENTS-MD-START -->

[HeroUI React v3 Docs Index]|root: ./.heroui-docs/react|STOP. What you remember about HeroUI React v3 is WRONG for this project. Always search docs and read before any task.|If docs missing, run this command first: heroui agents-md --react --output AGENTS.md|components/(buttons):{button-group.mdx,button.mdx,close-button.mdx,toggle-button-group.mdx,toggle-button.mdx}|components/(collections):{dropdown.mdx,list-box.mdx,tag-group.mdx}|components/(colors):{color-area.mdx,color-field.mdx,color-picker.mdx,color-slider.mdx,color-swatch-picker.mdx,color-swatch.mdx}|components/(controls):{slider.mdx,switch.mdx}|components/(data-display):{badge.mdx,chip.mdx,table.mdx}|components/(date-and-time):{calendar.mdx,date-field.mdx,date-picker.mdx,date-range-picker.mdx,range-calendar.mdx,time-field.mdx}|components/(feedback):{alert.mdx,meter.mdx,progress-bar.mdx,progress-circle.mdx,skeleton.mdx,spinner.mdx}|components/(forms):{checkbox-group.mdx,checkbox.mdx,description.mdx,error-message.mdx,field-error.mdx,fieldset.mdx,form.mdx,input-group.mdx,input-otp.mdx,input.mdx,label.mdx,number-field.mdx,radio-group.mdx,search-field.mdx,text-area.mdx,text-field.mdx}|components/(layout):{card.mdx,separator.mdx,surface.mdx,toolbar.mdx}|components/(media):{avatar-group.mdx,avatar.mdx}|components/(navigation):{accordion.mdx,breadcrumbs.mdx,disclosure-group.mdx,disclosure.mdx,link.mdx,pagination.mdx,tabs.mdx}|components/(overlays):{alert-dialog.mdx,drawer.mdx,modal.mdx,popover.mdx,toast.mdx,tooltip.mdx}|components/(pickers):{autocomplete.mdx,combo-box.mdx,select.mdx}|components/(typography):{kbd.mdx,typography.mdx}|components/(utilities):{scroll-shadow.mdx}|getting-started/(handbook):{animation.mdx,colors.mdx,composition.mdx,dark-mode.mdx,styling.mdx,theming.mdx}|getting-started/(overview):{cli.mdx,design-principles.mdx,frameworks.mdx,quick-start.mdx}|getting-started/(ui-for-agents):{agent-skills.mdx,agents-md.mdx,llms-txt.mdx,mcp-server.mdx}|releases:{v3-0-0-alpha-32.mdx,v3-0-0-alpha-33.mdx,v3-0-0-alpha-34.mdx,v3-0-0-alpha-35.mdx,v3-0-0-beta-1.mdx,v3-0-0-beta-2.mdx,v3-0-0-beta-3.mdx,v3-0-0-beta-4.mdx,v3-0-0-beta-6.mdx,v3-0-0-beta-7.mdx,v3-0-0-beta-8.mdx,v3-0-0-rc-1.mdx,v3-0-0.mdx,v3-0-2.mdx,v3-0-3.mdx,v3-0-4.mdx,v3-0-5.mdx,v3-1-0.mdx,v3-2-0.mdx,v3-2-1.mdx,v3-2-2.mdx,v3-2-3.mdx,v3-2-4.mdx,v3-2-5.mdx,v3-2-6.mdx}|demos/cn/accordion:{basic.tsx,controlled.tsx,custom-indicator.tsx,custom-styles.tsx,disabled.tsx,faq.tsx,multiple.tsx,render-function.tsx,surface.tsx,without-separator.tsx}|demos/cn/alert-dialog:{backdrop-variants.tsx,close-methods.tsx,controlled.tsx,custom-animations.tsx,custom-backdrop.tsx,custom-icon.tsx,custom-portal.tsx,custom-styles.tsx,custom-trigger.tsx,default.tsx,dismiss-behavior.tsx,placements.tsx,sizes.tsx,statuses.tsx}|demos/cn/alert:{basic.tsx,custom-styles.tsx}|demos/cn/autocomplete:{allows-empty-collection.tsx,asynchronous-filtering.tsx,controlled-multiple.tsx,controlled-open-state.tsx,controlled.tsx,custom-indicator.tsx,custom-styles.tsx,custom-value.tsx,default.tsx,disabled.tsx,email-recipients.tsx,full-width.tsx,location-search.tsx,multiple-select.tsx,on-surface.tsx,required.tsx,tag-group-selection.tsx,user-selection-multiple.tsx,user-selection.tsx,variants.tsx,virtualization.tsx,with-description.tsx,with-disabled-options.tsx,with-sections.tsx}|demos/cn/avatar-group:{basic.tsx,count.tsx,custom-styles.tsx,grid.tsx,max.tsx,overlap.tsx,sizes.tsx}|demos/cn/avatar:{basic.tsx,colors.tsx,custom-image-component.tsx,custom-styles.tsx,fallback.tsx,sizes.tsx,variants.tsx}|demos/cn/badge:{basic.tsx,colors.tsx,custom-styles.tsx,dot.tsx,placements.tsx,sizes.tsx,variants.tsx,with-content.tsx}|demos/cn/breadcrumbs:{basic.tsx,custom-separator.tsx,custom-styles.tsx,disabled.tsx,level-2.tsx,level-3.tsx,render-function.tsx}|demos/cn/button-group:{basic.tsx,custom-styles.tsx,disabled.tsx,full-width.tsx,orientation.tsx,sizes.tsx,variants.tsx,with-icons.tsx,without-separator.tsx}|demos/cn/button:{basic.tsx,custom-styles.tsx,custom-variants.tsx,disabled.tsx,full-width.tsx,icon-only.tsx,loading-state.tsx,loading.tsx,release-outline-variant.tsx,render-function.tsx,ripple-effect.tsx,sizes.tsx,social.tsx,variants.tsx,with-icons.tsx}|demos/cn/calendar:{basic.tsx,booking-calendar.tsx,controlled.tsx,custom-icons.tsx,custom-styles.tsx,day-view.tsx,default-value.tsx,disabled.tsx,focused-value.tsx,international-calendar.tsx,min-max-dates.tsx,multiple-months.tsx,multiple-selection.tsx,read-only.tsx,unavailable-dates.tsx,week-view.tsx,weeks-in-month.tsx,with-indicators.tsx,year-picker.tsx}|demos/cn/card:{custom-styles.tsx,default.tsx,horizontal.tsx,variants.tsx,with-avatar.tsx,with-form.tsx,with-images.tsx}|demos/cn/checkbox-group:{basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,features-and-addons.tsx,indeterminate.tsx,on-surface.tsx,render-function.tsx,validation.tsx,with-custom-indicator.tsx}|demos/cn/checkbox:{basic.tsx,controlled.tsx,custom-indicator.tsx,custom-styles.tsx,default-selected.tsx,disabled.tsx,external-label.tsx,form.tsx,full-rounded.tsx,indeterminate.tsx,invalid.tsx,render-function.tsx,render-props.tsx,variants.tsx,with-description.tsx}|demos/cn/chip:{basic.tsx,custom-styles.tsx,release-vibrant-palette.tsx,statuses.tsx,variants.tsx,with-icon.tsx}|demos/cn/close-button:{custom-styles.tsx,default.tsx,interactive.tsx,variants.tsx,with-custom-icon.tsx}|demos/cn/color-area:{basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,render-function.tsx,space-and-channels.tsx,with-dots.tsx}|demos/cn/color-field:{basic.tsx,channel-editing.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,form-example.tsx,full-width.tsx,invalid.tsx,on-surface.tsx,render-function.tsx,required.tsx,variants.tsx,with-description.tsx}|demos/cn/color-picker:{basic.tsx,controlled.tsx,custom-styles.tsx,with-fields.tsx,with-sliders.tsx,with-swatches.tsx}|demos/cn/color-slider:{alpha-channel.tsx,basic.tsx,channels.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,render-function.tsx,rgb-channels.tsx,vertical.tsx}|demos/cn/color-swatch-picker:{basic.tsx,controlled.tsx,custom-indicator.tsx,custom-styles.tsx,default-value.tsx,disabled.tsx,render-function.tsx,sizes.tsx,stack-layout.tsx,variants.tsx}|demos/cn/color-swatch:{accessibility.tsx,basic.tsx,custom-styles.tsx,render-function.tsx,shapes.tsx,sizes.tsx,transparency.tsx}|demos/cn/combo-box:{allows-custom-value.tsx,asynchronous-loading.tsx,controlled-input-value.tsx,controlled.tsx,custom-filtering.tsx,custom-indicator.tsx,custom-styles.tsx,custom-validation.tsx,custom-value.tsx,default-selected-key.tsx,default.tsx,disabled.tsx,form-value.tsx,full-width.tsx,menu-trigger.tsx,multiple-selection.tsx,on-surface.tsx,read-only.tsx,render-function.tsx,required.tsx,validation-behavior.tsx,with-description.tsx,with-disabled-options.tsx,with-sections.tsx}|demos/cn/date-field:{basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,form-example.tsx,full-width.tsx,granularity.tsx,invalid.tsx,on-surface.tsx,render-function.tsx,required.tsx,variants.tsx,with-description.tsx,with-prefix-and-suffix.tsx,with-prefix-icon.tsx,with-suffix-icon.tsx,with-validation.tsx}|demos/cn/date-picker:{basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,form-example.tsx,format-options-no-ssr.tsx,format-options.tsx,international-calendar.tsx,render-function.tsx,with-custom-indicator.tsx,with-validation.tsx}|demos/cn/date-range-picker:{basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,form-example.tsx,format-options-no-ssr.tsx,format-options.tsx,international-calendar.tsx,release-input-container.tsx,render-function.tsx,with-custom-indicator.tsx,with-validation.tsx}|demos/cn/description:{basic.tsx,custom-styles.tsx}|demos/cn/disclosure-group:{basic.tsx,controlled.tsx,custom-styles.tsx}|demos/cn/disclosure:{basic.tsx,custom-styles.tsx,render-function.tsx}|demos/cn/drawer:{backdrop-variants.tsx,basic.tsx,controlled.tsx,custom-styles.tsx,navigation.tsx,non-dismissable.tsx,placements.tsx,scrollable-content.tsx,with-form.tsx}|demos/cn/dropdown:{controlled-open-state.tsx,controlled.tsx,custom-styles.tsx,custom-trigger.tsx,default.tsx,long-press-trigger.tsx,single-with-custom-indicator.tsx,with-custom-submenu-indicator.tsx,with-descriptions.tsx,with-disabled-items.tsx,with-icons.tsx,with-keyboard-shortcuts.tsx,with-multiple-selection.tsx,with-section-level-selection.tsx,with-sections.tsx,with-single-selection.tsx,with-submenus.tsx}|demos/cn/error-message:{basic.tsx,custom-styles.tsx}|demos/cn/field-error:{basic.tsx,custom-styles.tsx}|demos/cn/fieldset:{basic.tsx,custom-styles.tsx,on-surface.tsx}|demos/cn/form:{basic.tsx,custom-styles.tsx,render-function.tsx}|demos/cn/input-group:{custom-styles.tsx,default.tsx,disabled.tsx,full-width.tsx,invalid.tsx,on-surface.tsx,password-with-toggle.tsx,required.tsx,variants.tsx,with-badge-suffix.tsx,with-copy-suffix.tsx,with-icon-prefix-and-copy-suffix.tsx,with-icon-prefix-and-text-suffix.tsx,with-keyboard-shortcut.tsx,with-loading-suffix.tsx,with-prefix-and-suffix.tsx,with-prefix-icon.tsx,with-suffix-icon.tsx,with-text-prefix.tsx,with-text-suffix.tsx,with-textarea.tsx}|demos/cn/input-otp:{basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,form-example.tsx,four-digits.tsx,on-complete.tsx,on-surface.tsx,variants.tsx,with-pattern.tsx,with-validation.tsx}|demos/cn/input:{basic.tsx,controlled.tsx,custom-styles.tsx,full-width.tsx,on-surface.tsx,types.tsx,variants.tsx}|demos/cn/kbd:{basic.tsx,custom-styles.tsx,inline.tsx,instructional.tsx,navigation.tsx,special.tsx,variants.tsx}|demos/cn/label:{basic.tsx,custom-styles.tsx}|demos/cn/link:{basic.tsx,custom-icon.tsx,custom-styles.tsx,icon-placement.tsx,render-function.tsx,underline-and-offset.tsx,underline-offset.tsx,underline-variants.tsx}|demos/cn/list-box:{controlled.tsx,custom-check-icon.tsx,custom-styles.tsx,default.tsx,multi-select.tsx,release-scrollbar-modes.tsx,render-function.tsx,virtualization.tsx,with-disabled-items.tsx,with-sections.tsx}|demos/cn/meter:{basic.tsx,colors.tsx,custom-styles.tsx,custom-value.tsx,sizes.tsx,without-label.tsx}|demos/cn/modal:{backdrop-variants.tsx,close-methods.tsx,controlled.tsx,custom-animations.tsx,custom-backdrop.tsx,custom-portal.tsx,custom-styles.tsx,custom-trigger.tsx,default.tsx,dismiss-behavior.tsx,placements.tsx,scroll-comparison.tsx,sizes.tsx,with-form.tsx}|demos/cn/number-field:{basic.tsx,controlled.tsx,custom-icons.tsx,custom-styles.tsx,disabled.tsx,form-example.tsx,full-width.tsx,on-surface.tsx,render-function.tsx,required.tsx,validation.tsx,variants.tsx,with-chevrons.tsx,with-description.tsx,with-format-options.tsx,with-step.tsx,with-validation.tsx}|demos/cn/pagination:{basic.tsx,controlled.tsx,custom-icons.tsx,custom-styles.tsx,disabled.tsx,simple-prev-next.tsx,sizes.tsx,with-ellipsis.tsx,with-summary.tsx}|demos/cn/popover:{basic.tsx,custom-styles.tsx,interactive.tsx,placement.tsx,render-function.tsx,with-arrow.tsx}|demos/cn/progress-bar:{basic.tsx,colors.tsx,custom-styles.tsx,custom-value.tsx,indeterminate.tsx,sizes.tsx,without-label.tsx}|demos/cn/progress-circle:{basic.tsx,colors.tsx,custom-styles.tsx,custom-svg.tsx,indeterminate.tsx,sizes.tsx,with-label.tsx}|demos/cn/radio-group:{basic.tsx,controlled.tsx,custom-indicator.tsx,custom-styles.tsx,delivery-and-payment.tsx,disabled.tsx,horizontal.tsx,on-surface.tsx,render-function.tsx,uncontrolled.tsx,validation.tsx,variants.tsx}|demos/cn/range-calendar:{allows-non-contiguous-ranges.tsx,anchor-unavailable-dates.tsx,basic.tsx,booking-calendar.tsx,controlled.tsx,custom-styles.tsx,day-view.tsx,default-value.tsx,disabled.tsx,focused-value.tsx,international-calendar.tsx,invalid.tsx,min-max-dates.tsx,multiple-months.tsx,read-only.tsx,unavailable-dates.tsx,week-view.tsx,weeks-in-month.tsx,with-indicators.tsx,year-picker.tsx}|demos/cn/scroll-shadow:{custom-styles.tsx,default.tsx,hide-scroll-bar.tsx,orientation.tsx,size.tsx,visibility-change.tsx,with-card.tsx}|demos/cn/search-field:{basic.tsx,controlled.tsx,custom-icons.tsx,custom-styles.tsx,disabled.tsx,form-example.tsx,full-width.tsx,on-surface.tsx,render-function.tsx,required.tsx,validation.tsx,variants.tsx,with-description.tsx,with-keyboard-shortcut.tsx,with-validation.tsx}|demos/cn/select:{asynchronous-loading.tsx,controlled-multiple.tsx,controlled-open-state.tsx,controlled.tsx,custom-indicator.tsx,custom-styles.tsx,custom-value.tsx,default.tsx,disabled.tsx,full-width.tsx,multiple-select.tsx,on-surface.tsx,render-function.tsx,required.tsx,variants.tsx,with-clear-button.tsx,with-description.tsx,with-disabled-options.tsx,with-sections.tsx}|demos/cn/separator:{basic.tsx,custom-styles.tsx,render-function.tsx,variants.tsx,vertical.tsx,with-content.tsx,with-surface.tsx}|demos/cn/skeleton:{animation-types.tsx,basic.tsx,card.tsx,custom-styles.tsx,grid.tsx,list.tsx,single-shimmer.tsx,text-content.tsx,user-profile.tsx}|demos/cn/slider:{controlled.tsx,custom-output.tsx,custom-styles.tsx,custom-value-formatting.tsx,default.tsx,disabled.tsx,range.tsx,render-function.tsx,vertical.tsx}|demos/cn/spinner:{basic.tsx,colors.tsx,custom-styles.tsx,sizes.tsx,speed.tsx}|demos/cn/surface:{basic.tsx,custom-styles.tsx,variants.tsx,with-form-components.tsx}|demos/cn/switch:{basic.tsx,controlled.tsx,custom-styles.tsx,default-selected.tsx,disabled.tsx,form.tsx,group-horizontal.tsx,group.tsx,label-position.tsx,render-function.tsx,render-props.tsx,sizes.tsx,with-description.tsx,with-icons.tsx,without-label.tsx}|demos/cn/table:{async-loading.tsx,basic.tsx,column-resizing.tsx,custom-cells.tsx,custom-styles.tsx,empty-state.tsx,expandable-rows.tsx,pagination.tsx,secondary-variant.tsx,selection.tsx,sorting.tsx,tanstack-table.tsx,virtualization.tsx}|demos/cn/tabs:{basic.tsx,custom-styles.tsx,disabled.tsx,overflow.tsx,render-function.tsx,secondary-vertical.tsx,secondary.tsx,vertical-alignment.tsx,vertical.tsx,with-separator.tsx}|demos/cn/tag-group:{basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,render-function.tsx,selection-modes.tsx,sizes.tsx,variants.tsx,with-error-message.tsx,with-list-data.tsx,with-prefix.tsx,with-remove-button.tsx}|demos/cn/textarea:{basic.tsx,controlled.tsx,custom-styles.tsx,full-width.tsx,on-surface.tsx,rows.tsx,variants.tsx}|demos/cn/textfield:{basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,full-width.tsx,input-types.tsx,on-surface.tsx,render-function.tsx,required.tsx,textarea.tsx,validation.tsx,with-description.tsx,with-error.tsx}|demos/cn/time-field:{basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,form-example.tsx,full-width.tsx,invalid.tsx,on-surface.tsx,render-function.tsx,required.tsx,with-description.tsx,with-prefix-and-suffix.tsx,with-prefix-icon.tsx,with-suffix-icon.tsx,with-validation.tsx}|demos/cn/toast:{callbacks.tsx,custom-indicator.tsx,custom-queue.tsx,custom-styles.tsx,custom-toast.tsx,default.tsx,expanded.tsx,placements.tsx,promise.tsx,simple.tsx,variants.tsx}|demos/cn/toggle-button-group:{attached.tsx,basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,full-width.tsx,orientation.tsx,selection-mode.tsx,sizes.tsx,without-separator.tsx}|demos/cn/toggle-button:{basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,icon-only.tsx,sizes.tsx,variants.tsx}|demos/cn/toolbar:{attached.tsx,basic.tsx,custom-styles.tsx,vertical.tsx,with-button-group.tsx}|demos/cn/tooltip:{basic.tsx,custom-styles.tsx,custom-trigger.tsx,placement.tsx,render-function.tsx,with-arrow.tsx}|demos/cn/typography:{custom-styles.tsx,default.tsx,primitives.tsx,prose.tsx,render-props.tsx,typography-scale.tsx}|demos/en/accordion:{basic.tsx,controlled.tsx,custom-indicator.tsx,custom-styles.tsx,disabled.tsx,faq.tsx,multiple.tsx,render-function.tsx,surface.tsx,without-separator.tsx}|demos/en/alert-dialog:{backdrop-variants.tsx,close-methods.tsx,controlled.tsx,custom-animations.tsx,custom-backdrop.tsx,custom-icon.tsx,custom-portal.tsx,custom-styles.tsx,custom-trigger.tsx,default.tsx,dismiss-behavior.tsx,placements.tsx,sizes.tsx,statuses.tsx}|demos/en/alert:{basic.tsx,custom-styles.tsx}|demos/en/autocomplete:{allows-empty-collection.tsx,asynchronous-filtering.tsx,controlled-multiple.tsx,controlled-open-state.tsx,controlled.tsx,custom-indicator.tsx,custom-styles.tsx,custom-value.tsx,default.tsx,disabled.tsx,email-recipients.tsx,full-width.tsx,location-search.tsx,multiple-select.tsx,on-surface.tsx,required.tsx,tag-group-selection.tsx,user-selection-multiple.tsx,user-selection.tsx,variants.tsx,virtualization.tsx,with-description.tsx,with-disabled-options.tsx,with-sections.tsx}|demos/en/avatar-group:{basic.tsx,count.tsx,custom-styles.tsx,grid.tsx,max.tsx,overlap.tsx,sizes.tsx}|demos/en/avatar:{basic.tsx,colors.tsx,custom-image-component.tsx,custom-styles.tsx,fallback.tsx,sizes.tsx,variants.tsx}|demos/en/badge:{basic.tsx,colors.tsx,custom-styles.tsx,dot.tsx,placements.tsx,sizes.tsx,variants.tsx,with-content.tsx}|demos/en/breadcrumbs:{basic.tsx,custom-separator.tsx,custom-styles.tsx,disabled.tsx,level-2.tsx,level-3.tsx,render-function.tsx}|demos/en/button-group:{basic.tsx,custom-styles.tsx,disabled.tsx,full-width.tsx,orientation.tsx,sizes.tsx,variants.tsx,with-icons.tsx,without-separator.tsx}|demos/en/button:{basic.tsx,custom-styles.tsx,custom-variants.tsx,disabled.tsx,full-width.tsx,icon-only.tsx,loading-state.tsx,loading.tsx,release-outline-variant.tsx,render-function.tsx,ripple-effect.tsx,sizes.tsx,social.tsx,variants.tsx,with-icons.tsx}|demos/en/calendar:{basic.tsx,booking-calendar.tsx,controlled.tsx,custom-icons.tsx,custom-styles.tsx,day-view.tsx,default-value.tsx,disabled.tsx,focused-value.tsx,international-calendar.tsx,min-max-dates.tsx,multiple-months.tsx,multiple-selection.tsx,read-only.tsx,unavailable-dates.tsx,week-view.tsx,weeks-in-month.tsx,with-indicators.tsx,year-picker.tsx}|demos/en/card:{custom-styles.tsx,default.tsx,horizontal.tsx,variants.tsx,with-avatar.tsx,with-form.tsx,with-images.tsx}|demos/en/checkbox-group:{basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,features-and-addons.tsx,indeterminate.tsx,on-surface.tsx,render-function.tsx,validation.tsx,with-custom-indicator.tsx}|demos/en/checkbox:{basic.tsx,controlled.tsx,custom-indicator.tsx,custom-styles.tsx,default-selected.tsx,disabled.tsx,external-label.tsx,form.tsx,full-rounded.tsx,indeterminate.tsx,invalid.tsx,render-function.tsx,render-props.tsx,variants.tsx,with-description.tsx}|demos/en/chip:{basic.tsx,custom-styles.tsx,release-vibrant-palette.tsx,statuses.tsx,variants.tsx,with-icon.tsx}|demos/en/close-button:{custom-styles.tsx,default.tsx,interactive.tsx,with-custom-icon.tsx}|demos/en/color-area:{basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,render-function.tsx,space-and-channels.tsx,with-dots.tsx}|demos/en/color-field:{basic.tsx,channel-editing.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,form-example.tsx,full-width.tsx,invalid.tsx,on-surface.tsx,render-function.tsx,required.tsx,variants.tsx,with-description.tsx}|demos/en/color-picker:{basic.tsx,controlled.tsx,custom-styles.tsx,with-fields.tsx,with-sliders.tsx,with-swatches.tsx}|demos/en/color-slider:{alpha-channel.tsx,basic.tsx,channels.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,render-function.tsx,rgb-channels.tsx,vertical.tsx}|demos/en/color-swatch-picker:{basic.tsx,controlled.tsx,custom-indicator.tsx,custom-styles.tsx,default-value.tsx,disabled.tsx,render-function.tsx,sizes.tsx,stack-layout.tsx,variants.tsx}|demos/en/color-swatch:{accessibility.tsx,basic.tsx,custom-styles.tsx,render-function.tsx,shapes.tsx,sizes.tsx,transparency.tsx}|demos/en/combo-box:{allows-custom-value.tsx,asynchronous-loading.tsx,controlled-input-value.tsx,controlled.tsx,custom-filtering.tsx,custom-indicator.tsx,custom-styles.tsx,custom-validation.tsx,custom-value.tsx,default-selected-key.tsx,default.tsx,disabled.tsx,form-value.tsx,full-width.tsx,menu-trigger.tsx,multiple-selection.tsx,on-surface.tsx,read-only.tsx,render-function.tsx,required.tsx,validation-behavior.tsx,with-description.tsx,with-disabled-options.tsx,with-sections.tsx}|demos/en/date-field:{basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,form-example.tsx,full-width.tsx,granularity.tsx,invalid.tsx,on-surface.tsx,render-function.tsx,required.tsx,variants.tsx,with-description.tsx,with-prefix-and-suffix.tsx,with-prefix-icon.tsx,with-suffix-icon.tsx,with-validation.tsx}|demos/en/date-picker:{basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,form-example.tsx,format-options-no-ssr.tsx,format-options.tsx,international-calendar.tsx,render-function.tsx,with-custom-indicator.tsx,with-validation.tsx}|demos/en/date-range-picker:{basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,form-example.tsx,format-options-no-ssr.tsx,format-options.tsx,international-calendar.tsx,release-input-container.tsx,render-function.tsx,with-custom-indicator.tsx,with-validation.tsx}|demos/en/description:{basic.tsx,custom-styles.tsx}|demos/en/disclosure-group:{basic.tsx,controlled.tsx,custom-styles.tsx}|demos/en/disclosure:{basic.tsx,custom-styles.tsx,render-function.tsx}|demos/en/drawer:{backdrop-variants.tsx,basic.tsx,controlled.tsx,custom-styles.tsx,navigation.tsx,non-dismissable.tsx,placements.tsx,scrollable-content.tsx,with-form.tsx}|demos/en/dropdown:{controlled-open-state.tsx,controlled.tsx,custom-styles.tsx,custom-trigger.tsx,default.tsx,long-press-trigger.tsx,single-with-custom-indicator.tsx,with-custom-submenu-indicator.tsx,with-descriptions.tsx,with-disabled-items.tsx,with-icons.tsx,with-keyboard-shortcuts.tsx,with-multiple-selection.tsx,with-section-level-selection.tsx,with-sections.tsx,with-single-selection.tsx,with-submenus.tsx}|demos/en/error-message:{basic.tsx,custom-styles.tsx}|demos/en/field-error:{basic.tsx,custom-styles.tsx}|demos/en/fieldset:{basic.tsx,custom-styles.tsx,on-surface.tsx}|demos/en/form:{basic.tsx,custom-styles.tsx,render-function.tsx}|demos/en/input-group:{custom-styles.tsx,default.tsx,disabled.tsx,full-width.tsx,invalid.tsx,on-surface.tsx,password-with-toggle.tsx,required.tsx,variants.tsx,with-badge-suffix.tsx,with-copy-suffix.tsx,with-icon-prefix-and-copy-suffix.tsx,with-icon-prefix-and-text-suffix.tsx,with-keyboard-shortcut.tsx,with-loading-suffix.tsx,with-prefix-and-suffix.tsx,with-prefix-icon.tsx,with-suffix-icon.tsx,with-text-prefix.tsx,with-text-suffix.tsx,with-textarea.tsx}|demos/en/input-otp:{basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,form-example.tsx,four-digits.tsx,on-complete.tsx,on-surface.tsx,variants.tsx,with-pattern.tsx,with-validation.tsx}|demos/en/input:{basic.tsx,controlled.tsx,custom-styles.tsx,full-width.tsx,on-surface.tsx,types.tsx,variants.tsx}|demos/en/kbd:{basic.tsx,custom-styles.tsx,inline.tsx,instructional.tsx,navigation.tsx,special.tsx,variants.tsx}|demos/en/label:{basic.tsx,custom-styles.tsx}|demos/en/link:{basic.tsx,custom-icon.tsx,custom-styles.tsx,icon-placement.tsx,render-function.tsx,underline-and-offset.tsx}|demos/en/list-box:{controlled.tsx,custom-check-icon.tsx,custom-styles.tsx,default.tsx,multi-select.tsx,release-scrollbar-modes.tsx,render-function.tsx,virtualization.tsx,with-disabled-items.tsx,with-sections.tsx}|demos/en/meter:{basic.tsx,colors.tsx,custom-styles.tsx,custom-value.tsx,sizes.tsx,without-label.tsx}|demos/en/modal:{backdrop-variants.tsx,close-methods.tsx,controlled.tsx,custom-animations.tsx,custom-backdrop.tsx,custom-portal.tsx,custom-styles.tsx,custom-trigger.tsx,default.tsx,dismiss-behavior.tsx,placements.tsx,scroll-comparison.tsx,sizes.tsx,with-form.tsx}|demos/en/number-field:{basic.tsx,controlled.tsx,custom-icons.tsx,custom-styles.tsx,disabled.tsx,form-example.tsx,full-width.tsx,on-surface.tsx,render-function.tsx,required.tsx,validation.tsx,variants.tsx,with-chevrons.tsx,with-description.tsx,with-format-options.tsx,with-step.tsx,with-validation.tsx}|demos/en/pagination:{basic.tsx,controlled.tsx,custom-icons.tsx,custom-styles.tsx,disabled.tsx,simple-prev-next.tsx,sizes.tsx,with-ellipsis.tsx,with-summary.tsx}|demos/en/popover:{basic.tsx,custom-styles.tsx,interactive.tsx,placement.tsx,render-function.tsx,with-arrow.tsx}|demos/en/progress-bar:{basic.tsx,colors.tsx,custom-styles.tsx,custom-value.tsx,indeterminate.tsx,sizes.tsx,without-label.tsx}|demos/en/progress-circle:{basic.tsx,colors.tsx,custom-styles.tsx,custom-svg.tsx,indeterminate.tsx,sizes.tsx,with-label.tsx}|demos/en/radio-group:{basic.tsx,controlled.tsx,custom-indicator.tsx,custom-styles.tsx,delivery-and-payment.tsx,disabled.tsx,horizontal.tsx,on-surface.tsx,render-function.tsx,uncontrolled.tsx,validation.tsx,variants.tsx}|demos/en/range-calendar:{allows-non-contiguous-ranges.tsx,anchor-unavailable-dates.tsx,basic.tsx,booking-calendar.tsx,controlled.tsx,custom-styles.tsx,day-view.tsx,default-value.tsx,disabled.tsx,focused-value.tsx,international-calendar.tsx,invalid.tsx,min-max-dates.tsx,multiple-months.tsx,read-only.tsx,unavailable-dates.tsx,week-view.tsx,weeks-in-month.tsx,with-indicators.tsx,year-picker.tsx}|demos/en/scroll-shadow:{custom-styles.tsx,default.tsx,hide-scroll-bar.tsx,orientation.tsx,size.tsx,visibility-change.tsx,with-card.tsx}|demos/en/search-field:{basic.tsx,controlled.tsx,custom-icons.tsx,custom-styles.tsx,disabled.tsx,form-example.tsx,full-width.tsx,on-surface.tsx,render-function.tsx,required.tsx,validation.tsx,variants.tsx,with-description.tsx,with-keyboard-shortcut.tsx,with-validation.tsx}|demos/en/select:{asynchronous-loading.tsx,controlled-multiple.tsx,controlled-open-state.tsx,controlled.tsx,custom-indicator.tsx,custom-styles.tsx,custom-value.tsx,default.tsx,disabled.tsx,full-width.tsx,multiple-select.tsx,on-surface.tsx,render-function.tsx,required.tsx,variants.tsx,with-clear-button.tsx,with-description.tsx,with-disabled-options.tsx,with-sections.tsx}|demos/en/separator:{basic.tsx,custom-styles.tsx,render-function.tsx,variants.tsx,vertical.tsx,with-content.tsx,with-surface.tsx}|demos/en/skeleton:{animation-types.tsx,basic.tsx,custom-styles.tsx,grid.tsx,list.tsx,single-shimmer.tsx,text-content.tsx,user-profile.tsx}|demos/en/slider:{controlled.tsx,custom-output.tsx,custom-styles.tsx,custom-value-formatting.tsx,default.tsx,disabled.tsx,range.tsx,render-function.tsx,vertical.tsx}|demos/en/spinner:{basic.tsx,colors.tsx,custom-styles.tsx,sizes.tsx,speed.tsx}|demos/en/surface:{basic.tsx,custom-styles.tsx,variants.tsx,with-form-components.tsx}|demos/en/switch:{basic.tsx,controlled.tsx,custom-styles.tsx,default-selected.tsx,disabled.tsx,form.tsx,group-horizontal.tsx,group.tsx,label-position.tsx,render-function.tsx,render-props.tsx,sizes.tsx,with-description.tsx,with-icons.tsx,without-label.tsx}|demos/en/table:{async-loading.tsx,basic.tsx,column-resizing.tsx,custom-cells.tsx,custom-styles.tsx,empty-state.tsx,expandable-rows.tsx,pagination.tsx,secondary-variant.tsx,selection.tsx,sorting.tsx,tanstack-table.tsx,virtualization.tsx}|demos/en/tabs:{basic.tsx,custom-styles.tsx,disabled.tsx,overflow.tsx,render-function.tsx,secondary-vertical.tsx,secondary.tsx,vertical-alignment.tsx,vertical.tsx,with-separator.tsx}|demos/en/tag-group:{basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,render-function.tsx,selection-modes.tsx,sizes.tsx,variants.tsx,with-error-message.tsx,with-list-data.tsx,with-prefix.tsx,with-remove-button.tsx}|demos/en/textarea:{basic.tsx,controlled.tsx,custom-styles.tsx,full-width.tsx,on-surface.tsx,rows.tsx,variants.tsx}|demos/en/textfield:{basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,full-width.tsx,input-types.tsx,on-surface.tsx,render-function.tsx,required.tsx,textarea.tsx,validation.tsx,with-description.tsx,with-error.tsx}|demos/en/time-field:{basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,form-example.tsx,full-width.tsx,invalid.tsx,on-surface.tsx,render-function.tsx,required.tsx,with-description.tsx,with-prefix-and-suffix.tsx,with-prefix-icon.tsx,with-suffix-icon.tsx,with-validation.tsx}|demos/en/toast:{callbacks.tsx,custom-indicator.tsx,custom-queue.tsx,custom-styles.tsx,custom-toast.tsx,default.tsx,expanded.tsx,placements.tsx,promise.tsx,simple.tsx,variants.tsx}|demos/en/toggle-button-group:{attached.tsx,basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,full-width.tsx,orientation.tsx,selection-mode.tsx,sizes.tsx,without-separator.tsx}|demos/en/toggle-button:{basic.tsx,controlled.tsx,custom-styles.tsx,disabled.tsx,icon-only.tsx,sizes.tsx,variants.tsx}|demos/en/toolbar:{attached.tsx,basic.tsx,custom-styles.tsx,vertical.tsx,with-button-group.tsx}|demos/en/tooltip:{basic.tsx,custom-styles.tsx,custom-trigger.tsx,placement.tsx,render-function.tsx,with-arrow.tsx}|demos/en/typography:{custom-styles.tsx,default.tsx,primitives.tsx,prose.tsx,render-props.tsx,typography-scale.tsx}

<!-- HEROUI-REACT-AGENTS-MD-END -->
