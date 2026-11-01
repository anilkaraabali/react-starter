import type { PlopGeneratorConfig } from 'node-plop';

import { featurePrompts, fileActions, resolveData } from '../_lib/prompts.ts';

type Answers = { entityName: string; feature: string };

/**
 * `src/features/<feature>/components/delete-<entity>-modal.tsx`
 */
const modalGenerator: PlopGeneratorConfig = {
  actions: (answers) => {
    const data = resolveData(answers as Answers);
    const e = data.entityKebab;

    return fileActions(
      [
        {
          path: `src/features/${data.featureDir}/components/delete-${e}-modal.tsx`,
          templateFile: 'generators/modal/delete-modal.tsx.hbs',
        },
      ],
      data
    );
  },
  description: 'Delete confirmation modal wired to the delete mutation',
  prompts: featurePrompts(),
};

export default modalGenerator;
