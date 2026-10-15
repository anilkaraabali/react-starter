/**
 * Regenerates `src/app/route-tree.gen.ts` from the files under
 * `src/app/routes`. The Vite plugin already does this on every `pnpm dev` /
 * `pnpm build`, but a generator that writes new route files otherwise leaves
 * `pnpm typecheck` failing until the next build, so `plop routes` calls this.
 *
 * The router options mirror `vite.config.ts`. If the two ever drift, the plugin
 * still wins on the next dev/build run and rewrites this output.
 */

import { tanstackRouterGenerator } from '@tanstack/router-plugin/vite';
import { build } from 'vite';

const ENTRY_ID = 'virtual:route-tree-codegen-entry';
const RESOLVED_ENTRY_ID = `\0${ENTRY_ID}`;

await build({
  build: {
    rollupOptions: { input: ENTRY_ID },
    write: false,
  },
  configFile: false,
  logLevel: 'error',
  plugins: [
    // The route tree is generated during `buildStart`; the bundle afterwards is
    // pure overhead and would fail here anyway, because bundling it means
    // following the Lingui `.po` imports without the Lingui plugin loaded.
    {
      load: (id) =>
        id === RESOLVED_ENTRY_ID ? 'export default 0;' : undefined,
      name: 'route-tree-codegen-entry',
      resolveId: (id) => (id === ENTRY_ID ? RESOLVED_ENTRY_ID : undefined),
    },
    tanstackRouterGenerator({
      autoCodeSplitting: true,
      generatedRouteTree: './src/app/route-tree.gen.ts',
      routesDirectory: './src/app/routes',
      target: 'react',
    }),
  ],
});
