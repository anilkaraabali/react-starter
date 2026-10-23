import { execFileSync } from 'node:child_process';
import path from 'node:path';

import type {
  CustomActionConfig,
  NodePlopAPI,
  PlopGeneratorConfig,
} from 'node-plop';
import { GENERATORS } from './generators/_lib/registry.ts';
import allGenerator from './generators/all/index.ts';

const generators: Record<string, PlopGeneratorConfig> = {
  ...GENERATORS,
  all: allGenerator,
};

export default function init(plop: NodePlopAPI): void {
  /**
   * `print` exists because plop's `append` needs a target file, and bolting
   * manual follow-up steps onto a throwaway file is worse than saying them.
   */
  plop.setActionType(
    'print',
    (_answers, config: CustomActionConfig<string>) => {
      if (typeof config.message === 'string') {
        console.log(config.message);
      }

      return '';
    }
  );

  /**
   * Line wrapping depends on how long the entity name is, so no fixed template
   * can emit pre-formatted code for every name. Running Biome over the generated
   * files is what actually guarantees `pnpm lint:ci` passes afterwards.
   */
  plop.setActionType(
    'format',
    (_answers, config: CustomActionConfig<string>) => {
      const paths = Array.isArray(config.paths) ? config.paths : [];

      if (paths.length === 0) {
        return '';
      }

      const biome = path.join(process.cwd(), 'node_modules/.bin/biome');

      execFileSync(
        biome,
        ['check', '--write', '--no-errors-on-unmatched', ...paths],
        {
          stdio: 'ignore',
        }
      );

      return `Formatted ${paths.length} file(s) with Biome`;
    }
  );

  /**
   * Regenerates the TanStack route tree so `pnpm typecheck` passes immediately
   * after new route files are written, instead of only on the next dev/build.
   */
  plop.setActionType(
    'routes-codegen',
    (_answers, _config: CustomActionConfig<string>) => {
      execFileSync(process.execPath, ['scripts/generate-route-tree.mjs'], {
        stdio: 'ignore',
      });

      return 'Regenerated src/app/route-tree.gen.ts';
    }
  );

  for (const [name, generator] of Object.entries(generators)) {
    plop.setGenerator(name, generator);
  }
}
