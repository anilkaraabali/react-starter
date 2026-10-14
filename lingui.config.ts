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
  format: formatter({
    lineNumbers: false,
  }),
  locales: ['en', 'tr'],
};

export default config;
