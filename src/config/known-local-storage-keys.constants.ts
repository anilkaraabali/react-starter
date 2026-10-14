const PREFIX = 'admin-' as const;

const keys = {
  LANGUAGE: 'language',
  PALETTE: 'palette',
  SIDEBAR_EXPANDED: 'sidebar-expanded',
  SIDEBAR_VARIANT: 'sidebar-variant',
  THEME: 'theme',
};

type KeysType = typeof keys;
type PrefixedKeys = {
  [K in keyof KeysType]: `${typeof PREFIX}${K}`;
};

export const KNOWN_LOCAL_STORAGE_KEYS: PrefixedKeys = Object.fromEntries(
  Object.entries(keys).map(([key, value]) => [key, `${PREFIX}${value}`])
) as PrefixedKeys;
