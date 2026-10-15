import type { PlopGeneratorConfig } from 'node-plop';

import { featurePrompts, fileActions, resolveData } from '../_lib/prompts.ts';

type Answers = { entityName: string; feature: string };

/**
 * `src/features/<feature>/components/modals/`
 *
 * The confirm dialog the list view and the edit/detail views both hang off.
 * It is a separate generator because a read-only module legitimately needs the
 * delete modal without ever running the form generator.
 */
const modalGenerator: PlopGeneratorConfig = {
  actions: (answers) => {
    const data = resolveData(answers as Answers);
    const base = `src/features/${data.featureDir}/components/modals`;

    return fileActions(
      [
        {
          path: `${base}/delete-${data.entityKebab}-modal.tsx`,
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
