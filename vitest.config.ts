import { lingui } from '@lingui/vite-plugin';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    lingui({
      cwd: import.meta.dirname,
      macroTransform: {
        parser: { syntax: 'typescript', tsx: true },
      },
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    coverage: {
      include: ['src/**'],
    },
    // `src/config/env.ts` validates at import time and throws when `API_URL` is
    // missing. `.env*` files are gitignored, so CI never has one — without these
    // defaults the whole suite fails on import. Point them at the MSW-mocked base
    // URL; nothing hits the network because handlers intercept every request.
    env: {
      VITE_APP_API_URL: 'http://localhost:3000',
    },
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/e2e/**'],
    globals: true,
    passWithNoTests: true,
    setupFiles: ['./src/testing/setup-tests.ts'],
  },
});
