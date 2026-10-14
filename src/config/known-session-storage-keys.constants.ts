const PREFIX = 'admin-' as const;

const keys = {
  ACCOUNT_DELETED_FLASH: 'flash-account-deleted',
};

type KeysType = typeof keys;
type PrefixedKeys = {
  [K in keyof KeysType]: `${typeof PREFIX}${K}`;
};

export const KNOWN_SESSION_STORAGE_KEYS: PrefixedKeys = Object.fromEntries(
  Object.entries(keys).map(([key, value]) => [key, `${PREFIX}${value}`])
) as PrefixedKeys;
