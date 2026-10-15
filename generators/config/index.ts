import type { PlopGeneratorConfig } from 'node-plop';

import { featurePrompts, fileActions, resolveData } from '../_lib/prompts.ts';

type Answers = { entityName: string; feature: string };

/**
 * `src/features/<feature>/config/`
 *
 * Produces the status select options and the URL-backed filter/sort config that
 * the list view, the table columns and the route search validator all share.
 */
const configGenerator: PlopGeneratorConfig = {
  actions: (answers) => {
    const data = resolveData(answers as Answers);
    const base = `src/features/${data.featureDir}/config`;

    return fileActions(
      [
        {
          path: `${base}/${data.entityKebab}.constants.ts`,
          templateFile: 'generators/config/entity.constants.ts.hbs',
        },
        {
          path: `${base}/${data.pluralKebab}-filter.config.ts`,
          templateFile: 'generators/config/filter.config.ts.hbs',
        },
      ],
      data
    );
  },
  description: 'Status option constants and URL filter/sort config',
  prompts: featurePrompts(),
};

export default configGenerator;
