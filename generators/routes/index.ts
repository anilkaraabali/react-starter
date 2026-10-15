import type { PlopGeneratorConfig } from 'node-plop';

import {
  featurePrompts,
  fileActions,
  nextSteps,
  resolveData,
} from '../_lib/prompts.ts';

type Answers = { entityName: string; feature: string };

/**
 * `src/app/routes/_admin/<plural>/`
 *
 * The four file-based routes that make a module reachable: list, create, detail
 * and edit. This is the one generator that also refreshes the generated route
 * tree, because until that happens the router does not know these paths exist
 * and `pnpm typecheck` reports every `to=`/`params=` against them as an error.
 */
const routesGenerator: PlopGeneratorConfig = {
  actions: (answers) => {
    const data = resolveData(answers as Answers);
    const base = `src/app/routes/_admin/${data.featureDir}`;

    return [
      ...fileActions(
        [
          {
            path: `${base}/index.tsx`,
            templateFile: 'generators/routes/index.tsx.hbs',
          },
          {
            path: `${base}/new.tsx`,
            templateFile: 'generators/routes/new.tsx.hbs',
          },
          {
            path: `${base}/$${data.routeParam}/index.tsx`,
            templateFile: 'generators/routes/detail.tsx.hbs',
          },
          {
            path: `${base}/$${data.routeParam}/edit.tsx`,
            templateFile: 'generators/routes/edit.tsx.hbs',
          },
        ],
        data,
        { print: false }
      ),
      {
        featureDir: data.featureDir,
        pluralTitle: data.pluralTitle,
        routeKeyDetail: data.routeKeyDetail,
        routeKeyEdit: data.routeKeyEdit,
        routeKeyList: data.routeKeyList,
        routeKeyNew: data.routeKeyNew,
        routeParam: data.routeParam,
        type: 'register-routes',
      },
      { type: 'routes-codegen' },
      { message: nextSteps(data), type: 'print' },
    ];
  },
  description: 'File-based routes for list, create, detail and edit',
  prompts: featurePrompts(),
};

export default routesGenerator;
