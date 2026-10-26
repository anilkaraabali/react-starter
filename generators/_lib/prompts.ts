import type {
  ActionType,
  AddActionConfig,
  CustomActionConfig,
  PromptQuestion,
} from 'node-plop';
import pluralize from 'pluralize';

import { buildNaming, type EntityNaming, toKebab } from './naming.ts';

function validateEntityName(input: string | undefined): true | string {
  const name = toKebab(input ?? '');

  if (!name) {
    return 'Entity name is required.';
  }

  if (!/^[a-z][a-z\d]*(-[a-z\d]+)*$/.test(name)) {
    return 'Use a lowercase singular noun in kebab-case, e.g. "invoice".';
  }

  // Catches typos the plural helper cannot round-trip ("adress" -> "addresses"
  // -> "address"), which would otherwise silently produce `/adresses` routes.
  if (pluralize.singular(pluralize(name)) !== name) {
    return `"${name}" does not pluralize cleanly — check for a typo.`;
  }

  return true;
}

/**
 * Every granular generator asks the same two questions, so they share one
 * implementation. `feature` defaults to the pluralised entity name, which keeps
 * a brand new module a single-keystroke flow, while still letting a generator
 * be pointed at an existing folder (e.g. an extra entity inside `products`).
 */
export function featurePrompts(): PromptQuestion[] {
  return [
    {
      message: 'Entity name (singular, kebab-case)',
      name: 'entityName',
      type: 'input',
      validate: validateEntityName,
    },
    {
      default: ({ entityName }: { entityName: string }) =>
        buildNaming(entityName).feature,
      message: 'Feature folder',
      name: 'feature',
      type: 'input',
      validate: (input: string) => {
        const folder = toKebab(input ?? '');
        return folder ? true : 'Feature folder is required.';
      },
    },
  ];
}

export type GeneratorData = Record<string, unknown> & EntityNaming;

type FileSpec = {
  path: string;
  templateFile: string;
};

/**
 * Every generator ends the same way: add its files, let Biome format them, then
 * print the manual follow-ups. Keeping that in one place means a new generator
 * cannot accidentally forget the format step and hand back lint-broken code.
 */
export function fileActions(
  specs: FileSpec[],
  data: GeneratorData,
  options: { print?: boolean } = {}
): ActionType[] {
  const { print = true } = options;

  const format: CustomActionConfig<string> = {
    paths: specs.map((spec) => spec.path),
    type: 'format',
  };

  return [
    ...specs.map(
      (spec): AddActionConfig => ({
        data,
        path: spec.path,
        templateFile: spec.templateFile,
        type: 'add',
      })
    ),
    format,
    ...(print ? [{ message: nextSteps(data), type: 'print' }] : []),
  ];
}

export function resolveData(answers: {
  entityName: string;
  feature: string;
}): GeneratorData {
  const naming = buildNaming(answers.entityName);

  return {
    ...answers,
    ...naming,
    // Templates always reach the feature through one variable so that the
    // folder name is decided in exactly one place.
    featureDir: toKebab(answers.feature) || naming.feature,
  };
}

/**
 * The sidebar, route constants and local-storage keys all live in shared files
 * that need hand edits (icon imports, symbols, nested groups). Pretending a
 * generator can patch them safely produces a half-registered feature, so we say
 * it out loud instead.
 */
export function nextSteps(data: GeneratorData): string {
  const { entityPascal, feature, pluralTitle, routeParam, routePath } = data;

  return [
    '',
    `Next steps for ${feature}:`,
    '  1. pnpm intl:build        - extract new messages, then translate the empty msgstr entries',
    `  2. Register ${routePath} in src/app/layouts/admin-layout/sidebar-items.ts (needs an icon import)`,
    '  3. Add a column-storage key in src/config/local-storage-keys.ts, then pass it to the table',
    `  4. Register the MSW handlers for ${routePath} in src/testing/mocks/handlers.ts`,
    '',
    `Generated names: ${entityPascal} / ${pluralTitle}, route param \`${routeParam}\``,
    'The generators build on each other: types + config + api come first, then',
    'modal and detail, then form, list and routes. `form` and `list` both import',
    'the modal, and `form` also imports the query boundary, so running them out of',
    'order leaves the module temporarily broken.',
  ].join('\n');
}
