import type { LinguiConfig } from '@lingui/conf';

import { formatter } from '@lingui/format-po';

const config: LinguiConfig = {
  catalogs: [
    {
      // A test message never reaches the screen, so it must not become a
      // catalog entry for a translator to fill in.
      exclude: ['src/**/__tests__/**', 'src/**/*.spec.ts', 'src/**/*.spec.tsx'],
      include: ['src'],
      path: 'src/locales/{locale}/messages',
    },
  ],
  fallbackLocales: { default: 'en' },
  format: formatter({
    lineNumbers: false,
  }),
  locales: ['en', 'tr', 'pseudo'],
  pseudoLocale: 'pseudo',
  sourceLocale: 'en',
};

/**
 * Entry point for the Lingui CLI, so the export is consumed by the toolchain
 * rather than by app code — knip cannot see that on its own.
 *
 * @public
 */
export default config;
