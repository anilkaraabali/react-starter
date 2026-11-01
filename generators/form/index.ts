import type { PlopGeneratorConfig } from 'node-plop';

import { featurePrompts, fileActions, resolveData } from '../_lib/prompts.ts';

type Answers = { entityName: string; feature: string };

/**
 * `src/features/<feature>/components/forms/`
 */
const formGenerator: PlopGeneratorConfig = {
  actions: (answers) => {
    const data = resolveData(answers as Answers);
    const base = `src/features/${data.featureDir}/components/forms`;
    const e = data.entityKebab;

    return fileActions(
      [
        {
          path: `${base}/${e}-form-schema.ts`,
          templateFile: 'generators/form/form-schema.ts.hbs',
        },
        {
          path: `${base}/${e}-form.tsx`,
          templateFile: 'generators/form/form.tsx.hbs',
        },
        {
          path: `${base}/${e}-form-mappers.ts`,
          templateFile: 'generators/form/form-mappers.ts.hbs',
        },
        {
          path: `${base}/create-${e}.tsx`,
          templateFile: 'generators/form/create-entity.tsx.hbs',
        },
        {
          path: `${base}/edit-${e}.tsx`,
          templateFile: 'generators/form/edit-entity.tsx.hbs',
        },
      ],
      data
    );
  },
  description: 'Form schema, fields, mapper, create and edit screens',
  prompts: featurePrompts(),
};

export default formGenerator;
