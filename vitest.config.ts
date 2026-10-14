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
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/e2e/**'],
    globals: true,
    passWithNoTests: true,
    setupFiles: ['./src/testing/setup-tests.ts'],
  },
});
