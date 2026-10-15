import pluralize from 'pluralize';

/**
 * Every generator derives its names from a single singular, kebab-case entity
 * name so that the whole feature stays consistent. Deriving names ad-hoc inside
 * each template is how a feature ends up with `Products`, `products` and
 * `PRODUCT` in the wrong places, so all of it is computed once, here.
 */
export type EntityNaming = {
  /** Constant-case entity id, e.g. `PRODUCT`. */
  entityConst: string;
  /** PascalCase entity, e.g. `Product`. */
  entityPascal: string;
  /** camelCase entity, e.g. `product`. */
  entityCamel: string;
  /** kebab-case entity, e.g. `product`. */
  entityKebab: string;
  /** Feature folder name, e.g. `products`. */
  feature: string;
  /** PascalCase plural, e.g. `Products`. */
  pluralConst: string;
  /** PascalCase plural, e.g. `Products`. */
  pluralPascal: string;
  /** camelCase plural, e.g. `products`. */
  pluralCamel: string;
  /** kebab-case plural, e.g. `products`. */
  pluralKebab: string;
  /** Title Case plural for i18n messages, e.g. `Products`. */
  pluralTitle: string;
  /** Route param, e.g. `productId`. */
  routeParam: string;
  /** Route path segment, e.g. `/products`. */
  routePath: string;
  /** REST path for the collection, e.g. `/api/products`. */
  apiPath: string;
  /** Singular human label, e.g. `Product`. */
  singularTitle: string;
  /** PascalCase query-key factory, e.g. `productKeys`. */
  keysFactory: string;
  /** `APP_ROUTES` keys, e.g. `PRODUCTS`, `PRODUCT_NEW`, ... */
  routeKeyList: string;
  routeKeyNew: string;
  routeKeyDetail: string;
  routeKeyEdit: string;
};

export function toKebab(value: string): string {
  return value
    .trim()
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function toPascal(value: string): string {
  return toKebab(value)
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function toCamel(value: string): string {
  const pascal = toPascal(value);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function toConst(value: string): string {
  return toKebab(value).replace(/-/g, '_').toUpperCase();
}

function toTitle(value: string): string {
  return toKebab(value)
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function buildNaming(rawName: string): EntityNaming {
  const entityKebab = toKebab(rawName);

  if (!entityKebab) {
    throw new Error('Entity name must contain at least one letter.');
  }

  const pluralKebab = pluralize(entityKebab);
  const entityPascal = toPascal(entityKebab);
  const entityCamel = toCamel(entityKebab);
  const pluralPascal = toPascal(pluralKebab);

  return {
    apiPath: `/api/${pluralKebab}`,
    entityCamel,
    entityConst: toConst(entityKebab),
    entityKebab,
    entityPascal,
    feature: pluralKebab,
    keysFactory: `${entityCamel}Keys`,
    pluralCamel: toCamel(pluralKebab),
    pluralConst: toConst(pluralKebab),
    pluralKebab,
    pluralPascal,
    pluralTitle: toTitle(pluralKebab),
    routeKeyDetail: `${toConst(entityKebab)}_DETAIL`,
    routeKeyEdit: `${toConst(entityKebab)}_EDIT`,
    routeKeyList: toConst(pluralKebab),
    routeKeyNew: `${toConst(entityKebab)}_NEW`,
    routeParam: `${entityCamel}Id`,
    routePath: `/${pluralKebab}`,
    singularTitle: toTitle(entityKebab),
  };
}
