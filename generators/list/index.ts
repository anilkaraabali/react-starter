import type { PlopGeneratorConfig } from 'node-plop';

import { featurePrompts, fileActions, resolveData } from '../_lib/prompts.ts';

type Answers = { entityName: string; feature: string };

/**
 * `src/features/<feature>/components/<entity>-list/`
 *
 * List view, table and column definitions. Filters are driven by the URL rather
 * than local state so that a filtered list stays linkable and the browser's back
 * button works — which is why the view talks to `RouteFilterProvider` and the
 * route supplies `validateSearch`.
 */
const listGenerator: PlopGeneratorConfig = {
  actions: (answers) => {
    const data = resolveData(answers as Answers);
    const base = `src/features/${data.featureDir}/components/${data.entityKebab}-list`;

    return fileActions(
      [
        {
          path: `${base}/${data.entityKebab}-list-view.tsx`,
          templateFile: 'generators/list/list-view.tsx.hbs',
        },
        {
          path: `${base}/${data.pluralKebab}-table.tsx`,
          templateFile: 'generators/list/table.tsx.hbs',
        },
        {
          path: `${base}/${data.pluralKebab}-table-columns.tsx`,
          templateFile: 'generators/list/table-columns.tsx.hbs',
        },
      ],
      data
    );
  },
  description: 'List view, data table and column definitions',
  prompts: featurePrompts(),
};

export default listGenerator;
