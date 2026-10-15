const PREFIX = 'admin-' as const;

const keys = {
  LANGUAGE: 'language',
  PALETTE: 'palette',
  SIDEBAR_EXPANDED: 'sidebar-expanded',
  SIDEBAR_VARIANT: 'sidebar-variant',
  THEME: 'theme',
} as const;

const columnKeys = {
  PRODUCTS: 'products-columns',
} as const;

type KeysType = typeof keys;
type ColumnKeysType = typeof columnKeys;

type PrefixedKeys<T extends Record<string, string>> = {
  [K in keyof T]: `${typeof PREFIX}${T[K]}`;
};

export const KNOWN_LOCAL_STORAGE_KEYS = {
  ...(Object.fromEntries(
    Object.entries(keys).map(([key, value]) => [key, `${PREFIX}${value}`])
  ) as PrefixedKeys<KeysType>),
  COLUMNS: Object.fromEntries(
    Object.entries(columnKeys).map(([key, value]) => [key, `${PREFIX}${value}`])
  ) as PrefixedKeys<ColumnKeysType>,
};
