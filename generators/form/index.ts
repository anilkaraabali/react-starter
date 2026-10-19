import type { PlopGeneratorConfig } from 'node-plop';

import { featurePrompts, fileActions, resolveData } from '../_lib/prompts.ts';

type Answers = { entityName: string; feature: string };

/**
 * `src/features/<feature>/components/forms/`
 *
 * The whole create/edit slice at once — shared field component, its form
 * options, the entity-to-form mapper and the two views that drive it. Splitting
 * these across generators would let someone scaffold a form with no view that
 * compiles.
 */
const formGenerator: PlopGeneratorConfig = {
  actions: (answers) => {
    const data = resolveData(answers as Answers);
    const base = `src/features/${data.featureDir}/components/forms`;
    const e = data.entityKebab;

    return fileActions(
      [
        {
          path: `${base}/${e}-form.tsx`,
          templateFile: 'generators/form/form.tsx.hbs',
        },
        {
          path: `${base}/${e}-form-mappers.ts`,
          templateFile: 'generators/form/form-mappers.ts.hbs',
        },
        {
          path: `${base}/create-${e}-view.tsx`,
          templateFile: 'generators/form/create-view.tsx.hbs',
        },
        {
          path: `${base}/edit-${e}-view.tsx`,
          templateFile: 'generators/form/edit-view.tsx.hbs',
        },
      ],
      data
    );
  },
  description: 'Shared form + options + mapper, create and edit views',
  prompts: featurePrompts(),
};

export default formGenerator;
