const STORAGE_PREFIX = 'admin-' as const;

const storageKeyNames = {
  ACCOUNT_DELETED_FLASH: 'flash-account-deleted',
};

type PrefixedKeys<T extends Record<string, string>> = {
  [K in keyof T]: `${typeof STORAGE_PREFIX}${T[K]}`;
};

export const SESSION_STORAGE_KEYS = Object.fromEntries(
  Object.entries(storageKeyNames).map(([key, value]) => [
    key,
    `${STORAGE_PREFIX}${value}`,
  ])
) as PrefixedKeys<typeof storageKeyNames>;
