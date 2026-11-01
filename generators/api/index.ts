import type { PlopGeneratorConfig } from 'node-plop';

import { featurePrompts, fileActions, resolveData } from '../_lib/prompts.ts';

type Answers = { entityName: string; feature: string };

/**
 * `src/api/endpoints/<plural>/`
 *
 * Query-key factory plus list/detail queries and create/update/delete mutations.
 */
const apiGenerator: PlopGeneratorConfig = {
  actions: (answers) => {
    const data = resolveData(answers as Answers);
    const base = `src/api/endpoints/${data.pluralKebab}`;
    const e = data.entityKebab;
    const p = data.pluralKebab;

    return fileActions(
      [
        {
          path: `${base}/${p}.keys.ts`,
          templateFile: 'generators/api/keys.ts.hbs',
        },
        {
          path: `${base}/get-${p}.ts`,
          templateFile: 'generators/api/get-list.ts.hbs',
        },
        {
          path: `${base}/get-${e}.ts`,
          templateFile: 'generators/api/get-detail.ts.hbs',
        },
        {
          path: `${base}/create-${e}.ts`,
          templateFile: 'generators/api/create.ts.hbs',
        },
        {
          path: `${base}/update-${e}.ts`,
          templateFile: 'generators/api/update.ts.hbs',
        },
        {
          path: `${base}/delete-${e}.ts`,
          templateFile: 'generators/api/delete.ts.hbs',
        },
      ],
      data
    );
  },
  description:
    'Query keys, list/detail queries, create/update/delete mutations',
  prompts: featurePrompts(),
};

export default apiGenerator;
