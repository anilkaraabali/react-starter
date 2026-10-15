import type { PlopGeneratorConfig } from 'node-plop';

import apiGenerator from '../api/index.ts';
import configGenerator from '../config/index.ts';
import detailGenerator from '../detail/index.ts';
import formGenerator from '../form/index.ts';
import listGenerator from '../list/index.ts';
import modalGenerator from '../modal/index.ts';
import routesGenerator from '../routes/index.ts';
import typesGenerator from '../types/index.ts';

export const GENERATORS: Record<string, PlopGeneratorConfig> = {
  api: apiGenerator,
  config: configGenerator,
  detail: detailGenerator,
  form: formGenerator,
  list: listGenerator,
  modal: modalGenerator,
  routes: routesGenerator,
  types: typesGenerator,
};

/**
 * Dependency order, not alphabetical. `form` and `list` both import the delete
 * modal, `form` also imports the query boundary, and `routes` has to run last so
 * the route tree is generated from a complete set of route files.
 *
 * The `all` generator re-uses this to run a multi-selection in a valid order no
 * matter which order the boxes were ticked in.
 */
export const GENERATOR_ORDER = [
  'types',
  'config',
  'api',
  'modal',
  'detail',
  'form',
  'list',
  'routes',
] as const;

export type GeneratorName = (typeof GENERATOR_ORDER)[number];

/** Generators a partial selection is most likely to break, and what it needs. */
export const GENERATOR_REQUIRES: Partial<
  Record<GeneratorName, readonly GeneratorName[]>
> = {
  detail: ['api'],
  form: ['api', 'modal', 'detail'],
  list: ['api', 'modal'],
  routes: ['api'],
};
