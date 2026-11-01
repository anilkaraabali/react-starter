import type { PlopGeneratorConfig } from 'node-plop';

import { featurePrompts, fileActions, resolveData } from '../_lib/prompts.ts';

type Answers = { entityName: string; feature: string };

/**
 * `src/features/<feature>/components/<entity>-list/`
 *
 * List screen, header actions, and table column definitions.
 */
const listGenerator: PlopGeneratorConfig = {
  actions: (answers) => {
    const data = resolveData(answers as Answers);
    const base = `src/features/${data.featureDir}/components/${data.entityKebab}-list`;
    const e = data.entityKebab;
    const p = data.pluralKebab;

    return fileActions(
      [
        {
          path: `${base}/${e}-list.tsx`,
          templateFile: 'generators/list/entity-list.tsx.hbs',
        },
        {
          path: `${base}/${e}-list-actions.tsx`,
          templateFile: 'generators/list/list-actions.tsx.hbs',
        },
        {
          path: `${base}/${p}-table-columns.tsx`,
          templateFile: 'generators/list/table-columns.tsx.hbs',
        },
      ],
      data
    );
  },
  description: 'List view, header actions, and table columns',
  prompts: featurePrompts(),
};

export default listGenerator;
