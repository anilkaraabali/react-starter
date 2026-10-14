import { lingui } from '@lingui/vite-plugin';
import { inspectorServer } from '@react-dev-inspector/vite-plugin';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';

const BASE_URL = process.env.BASE_URL || '/';

export default defineConfig(({ mode }): import('vite').UserConfig => {
  const isDev = mode === 'development';

  return {
    assetsInclude: ['**/*.svg'],
    base: BASE_URL,
    build: {
      chunkSizeWarningLimit: 1024,
      sourcemap: process.env.SOURCEMAP === 'true',
    },
    plugins: [
      tanstackRouter({
        autoCodeSplitting: true,
        generatedRouteTree: './src/app/route-tree.gen.ts',
        routesDirectory: './src/app/routes',
        target: 'react',
      }),
      lingui({
        cwd: import.meta.dirname,
        macroTransform: {
          parser: { syntax: 'typescript', tsx: true },
        },
      }),
      ...(isDev
        ? [
            babel({
              plugins: ['@react-dev-inspector/babel-plugin'],
            }),
          ]
        : []),
      react({
        compiler: true,
      }),
      tailwindcss(),
      svgr(),
      ...(isDev ? [inspectorServer()] : []),
      ...(process.env.ANALYZE === 'true'
        ? [
            visualizer({
              brotliSize: true,
              filename: 'visualizer.html',
              gzipSize: true,
              open: true,
              template: 'treemap',
            }),
          ]
        : []),
    ] as PluginOption[],
    preview: {
      port: 4200,
    },
    resolve: {
      tsconfigPaths: true,
    },
    server: {
      port: 4200,
    },
  };
});
