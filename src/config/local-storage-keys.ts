const STORAGE_PREFIX = 'admin-' as const;

const storageKeyNames = {
  LANGUAGE: 'language',
  PALETTE: 'palette',
  SIDEBAR_EXPANDED: 'sidebar-expanded',
  SIDEBAR_VARIANT: 'sidebar-variant',
  THEME: 'theme',
} as const;

const columnStorageKeyNames = {
  PRODUCTS: 'products-columns',
} as const;

type PrefixedKeys<T extends Record<string, string>> = {
  [K in keyof T]: `${typeof STORAGE_PREFIX}${T[K]}`;
};

function prefixStorageKeys<T extends Record<string, string>>(
  names: T
): PrefixedKeys<T> {
  return Object.fromEntries(
    Object.entries(names).map(([key, value]) => [
      key,
      `${STORAGE_PREFIX}${value}`,
    ])
  ) as PrefixedKeys<T>;
}

export const LOCAL_STORAGE_KEYS = {
  ...prefixStorageKeys(storageKeyNames),
  COLUMNS: prefixStorageKeys(columnStorageKeyNames),
};
