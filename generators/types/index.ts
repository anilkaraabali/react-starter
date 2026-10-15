import type { PlopGeneratorConfig } from 'node-plop';

import { featurePrompts, fileActions, resolveData } from '../_lib/prompts.ts';

type Answers = { entityName: string; feature: string };

/**
 * `src/features/<feature>/types/<entity>.types.ts`
 *
 * The entity shape is intentionally generic — name / description / status —
 * so the generated module is a working CRUD slice on its own. Domain fields are
 * added by hand on top, which is cheaper than pruning products-only concepts
 * (price, stock, margin) out of every other module.
 */
const typesGenerator: PlopGeneratorConfig = {
  actions: (answers) => {
    const data = resolveData(answers as Answers);

    return fileActions(
      [
        {
          path: `src/features/${data.featureDir}/types/${data.entityKebab}.types.ts`,
          templateFile: 'generators/types/entity.types.ts.hbs',
        },
      ],
      data
    );
  },
  description: 'Entity types with a status enum (draft/active/archived)',
  prompts: featurePrompts(),
};

export default typesGenerator;
