import type {
  ActionType,
  PlopGeneratorConfig,
  PromptQuestion,
} from 'node-plop';
import { featurePrompts, nextSteps, resolveData } from '../_lib/prompts.ts';
import {
  GENERATOR_ORDER,
  GENERATOR_REQUIRES,
  GENERATORS,
  type GeneratorName,
} from '../_lib/registry.ts';

type Answers = {
  entityName: string;
  feature: string;
  generators: GeneratorName[];
};

function actionType(action: ActionType): string | undefined {
  return typeof action === 'object' && action !== null && 'type' in action
    ? String(action.type)
    : undefined;
}

function runGenerator(name: GeneratorName, answers: Answers): ActionType[] {
  const generator = GENERATORS[name];

  if (typeof generator?.actions !== 'function') {
    return [];
  }

  return (
    generator.actions({
      entityName: answers.entityName,
      feature: answers.feature,
    }) ?? []
  );
}

/**
 * Composes the granular generators into a single multi-select run.
 *
 * Plop's own picker can only ever select one generator, so instead of fighting
 * it this generator takes a checkbox, then runs each selected generator's
 * actions back to back. Because every granular generator already returns a
 * plain list of actions, composing them is just a `flatMap` — no special
 * support from the sub-generators beyond letting the caller silence the
 * per-generator "next steps" output.
 */
const allGenerator: PlopGeneratorConfig = {
  actions: (answers) => {
    const typed = answers as Answers;
    const data = resolveData(typed);

    // Re-order so the result is always valid regardless of tick order.
    const selected = GENERATOR_ORDER.filter((name) =>
      typed.generators.includes(name)
    );

    if (selected.length === 0) {
      return [
        { message: 'Nothing selected - no files were written.', type: 'print' },
      ];
    }

    const actions = selected.flatMap((name) => runGenerator(name, typed));

    const missing = selected.flatMap((name) => {
      const required = GENERATOR_REQUIRES[name] ?? [];
      return required
        .filter((dependency) => !selected.includes(dependency))
        .map((dependency) => `${name} needs ${dependency}`);
    });

    return [
      // Drop the sub-generators' own trailing steps: `routes` already emits a
      // codegen pass, and every generator emits a "next steps" block. One of each
      // at the end is enough, and the codegen has to run after all the writes.
      ...actions.filter((action) => {
        const type = actionType(action);
        return (
          type !== 'print' &&
          type !== 'routes-codegen' &&
          type !== 'register-routes'
        );
      }),
      ...(selected.includes('routes')
        ? [
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
          ]
        : []),
      {
        message: `${nextSteps(data)}\n\nRan: ${selected.join(' → ')}${
          missing.length > 0
            ? `\n\nMissing dependencies, this module will not compile yet:\n${missing
                .map((entry) => `  - ${entry}`)
                .join('\n')}`
            : ''
        }`,
        type: 'print',
      },
    ];
  },
  description: 'Run several generators at once (multi-select with space)',
  prompts: [
    ...featurePrompts(),
    {
      choices: GENERATOR_ORDER.map((name) => ({
        checked: true,
        name: `${name.padEnd(7)} ${GENERATORS[name].description ?? ''}`,
        value: name,
      })),
      message:
        'Generators to run (space to toggle, a to toggle all, enter to confirm)',
      // Without a name plop stores the answer under "undefined".
      name: 'generators',
      type: 'checkbox',
      validate: (input: GeneratorName[] | string) =>
        Array.isArray(input) && input.length > 0
          ? true
          : 'Select at least one generator.',
    } as PromptQuestion,
  ],
};

export default allGenerator;
