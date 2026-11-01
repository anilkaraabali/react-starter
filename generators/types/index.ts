import type { PlopGeneratorConfig } from 'node-plop';

import { featurePrompts, fileActions, resolveData } from '../_lib/prompts.ts';

type Answers = { entityName: string; feature: string };

/**
 * `src/api/models/<plural>/`
 *
 * Transport DTOs and zod input schemas for the generated CRUD module.
 */
const typesGenerator: PlopGeneratorConfig = {
  actions: (answers) => {
    const data = resolveData(answers as Answers);
    const base = `src/api/models/${data.pluralKebab}`;
    const e = data.entityKebab;

    return fileActions(
      [
        {
          path: `${base}/${e}-dto.ts`,
          templateFile: 'generators/types/entity-dto.ts.hbs',
        },
        {
          path: `${base}/${e}-status-dto.ts`,
          templateFile: 'generators/types/entity-status-dto.ts.hbs',
        },
        {
          path: `${base}/${e}-sort-by-dto.ts`,
          templateFile: 'generators/types/entity-sort-by-dto.ts.hbs',
        },
        {
          path: `${base}/create-${e}-input.ts`,
          templateFile: 'generators/types/create-entity-input.ts.hbs',
        },
        {
          path: `${base}/update-${e}-input.ts`,
          templateFile: 'generators/types/update-entity-input.ts.hbs',
        },
      ],
      data
    );
  },
  description: 'API DTOs, status/sort enums, and create/update input schemas',
  prompts: featurePrompts(),
};

export default typesGenerator;
