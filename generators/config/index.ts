import type { PlopGeneratorConfig } from 'node-plop';

import { featurePrompts, fileActions, resolveData } from '../_lib/prompts.ts';

type Answers = { entityName: string; feature: string };

/**
 * `src/features/<feature>/config/`
 *
 * Status select options and URL-backed filter config shared by the list and route.
 */
const configGenerator: PlopGeneratorConfig = {
  actions: (answers) => {
    const data = resolveData(answers as Answers);
    const base = `src/features/${data.featureDir}/config`;
    const e = data.entityKebab;
    const p = data.pluralKebab;

    return fileActions(
      [
        {
          path: `${base}/${e}-select-options.ts`,
          templateFile: 'generators/config/entity-select-options.ts.hbs',
        },
        {
          path: `${base}/${p}-filter-config.ts`,
          templateFile: 'generators/config/filter.config.ts.hbs',
        },
      ],
      data
    );
  },
  description: 'Status select options and URL filter/sort config',
  prompts: featurePrompts(),
};

export default configGenerator;
