/** biome-ignore-all assist/source/useSortedKeys: keep domain-grouped route order */

/**
 * App pathnames for `Link` / `navigate({ to })`.
 * Prefer these over raw strings in feature code.
 * Keep in sync with `src/app/routes` (TanStack still type-checks usages).
 */
export const APP_ROUTES = {
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // App shell
  DASHBOARD: '/dashboard',

  // Account
  ACCOUNT: '/account',
  ACCOUNT_PROFILE: '/account/profile',
  ACCOUNT_SESSIONS: '/account/sessions',
  ACCOUNT_SECURITY: '/account/security',
  ACCOUNT_ORGANIZATION: '/account/organization',
  ACCOUNT_ROLES: '/account/roles',
  ACCOUNT_ROLE: '/account/roles/$role',
} as const;

/**
 * Route ids for `useSearch({ from })` / typed route hooks that require the
 * `/_admin/...` or `/_auth/...` id rather than the public fullPath.
 */
export const APP_ROUTE_IDS = {
  // Auth
  AUTH: '/_auth',
  LOGIN: '/_auth/login',
  REGISTER: '/_auth/register',
  FORGOT_PASSWORD: '/_auth/forgot-password',
  RESET_PASSWORD: '/_auth/reset-password',

  // App shell
  ADMIN: '/_admin',
  DASHBOARD: '/_admin/dashboard',

  // Account
  ACCOUNT: '/_admin/account',
  ACCOUNT_INDEX: '/_admin/account/',
  ACCOUNT_PROFILE: '/_admin/account/profile',
  ACCOUNT_SESSIONS: '/_admin/account/sessions',
  ACCOUNT_SECURITY: '/_admin/account/security',
  ACCOUNT_ORGANIZATION: '/_admin/account/organization',
  ACCOUNT_ROLES: '/_admin/account/roles/',
  ACCOUNT_ROLE: '/_admin/account/roles/$role',
} as const;
