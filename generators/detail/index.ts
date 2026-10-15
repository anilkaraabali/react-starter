import type { PlopGeneratorConfig } from 'node-plop';

import { featurePrompts, fileActions, resolveData } from '../_lib/prompts.ts';

type Answers = { entityName: string; feature: string };

/**
 * `src/features/<feature>/components/`
 *
 * The query boundary, status chip and detail view. The boundary is a separate
 * file because both the detail view and the edit view consume it, and duplicating
 * that loading/error handling is how the two drift apart.
 */
const detailGenerator: PlopGeneratorConfig = {
  actions: (answers) => {
    const data = resolveData(answers as Answers);
    const base = `src/features/${data.featureDir}/components`;
    const e = data.entityKebab;

    return fileActions(
      [
        {
          path: `${base}/${e}-status-chip.tsx`,
          templateFile: 'generators/detail/status-chip.tsx.hbs',
        },
        {
          path: `${base}/${e}-query-boundary.tsx`,
          templateFile: 'generators/detail/query-boundary.tsx.hbs',
        },
        {
          path: `${base}/${e}-details/${e}-detail-content.tsx`,
          templateFile: 'generators/detail/detail-content.tsx.hbs',
        },
        {
          path: `${base}/${e}-details/${e}-detail-view.tsx`,
          templateFile: 'generators/detail/detail-view.tsx.hbs',
        },
      ],
      data
    );
  },
  description: 'Query boundary, status chip and detail view + content',
  prompts: featurePrompts(),
};

export default detailGenerator;
