import type {
  FilterFieldConfig,
  FilterValue,
} from '@/components/organisms/filters/filters.types';

export function isFilterValueActive<T = FilterValue>(
  current: T,
  initial: T
): boolean {
  if (current === undefined || current === null || current === '') {
    return false;
  }

  if (Array.isArray(current)) {
    return current.length > 0;
  }

  return current !== initial;
}

/** Route-level helper: are any declared filter fields non-default? */
export function hasActiveFilterFields<TFilters extends object>(
  search: Partial<TFilters>,
  initialState: TFilters,
  fields: FilterFieldConfig<TFilters>[]
): boolean {
  return fields.some((field) =>
    isFilterValueActive(search[field.key], initialState[field.key])
  );
}

/** Every field that depends on `key`, directly or through other fields. */
export function getDependentFilterKeys<TFilters extends object>(
  fields: readonly FilterFieldConfig<TFilters>[],
  key: keyof TFilters & string
): (keyof TFilters & string)[] {
  const dependents = new Set<keyof TFilters & string>();
  const pending = [key];

  for (let parent = pending.pop(); parent; parent = pending.pop()) {
    for (const field of fields) {
      if (field.dependsOn?.includes(parent) && !dependents.has(field.key)) {
        dependents.add(field.key);
        pending.push(field.key);
      }
    }
  }

  return [...dependents];
}

/**
 * Extends a filter patch so every field depending on a changed field is
 * cleared in the same update. Fields the patch sets explicitly are kept.
 */
export function withDependentFiltersCleared<TFilters extends object>(
  fields: readonly FilterFieldConfig<TFilters>[],
  patch: Partial<TFilters>,
  getFilterValue: <K extends keyof TFilters>(key: K) => TFilters[K] | undefined
): Partial<TFilters> {
  const next: Partial<TFilters> = { ...patch };

  for (const { key } of fields) {
    if (!(key in patch) || patch[key] === getFilterValue(key)) continue;

    for (const dependent of getDependentFilterKeys(fields, key)) {
      if (!(dependent in patch)) next[dependent] = undefined;
    }
  }

  return next;
}

export function isFilterValueEmpty(value: FilterValue): boolean {
  return (
    value === undefined ||
    value === null ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)
  );
}

/**
 * The first parent a dependent field waits for: set only while every parent in
 * `dependsOn` is empty. One selected parent is enough to pick a value.
 */
export function getAwaitedParentField<TFilters extends object>(
  fields: readonly FilterFieldConfig<TFilters>[],
  field: FilterFieldConfig<TFilters>,
  getFilterValue: (key: keyof TFilters & string) => FilterValue
): FilterFieldConfig<TFilters> | undefined {
  const parents = (field.dependsOn ?? []).flatMap((key) =>
    fields.filter((candidate) => candidate.key === key)
  );

  if (parents.length === 0) return undefined;

  return parents.every((parent) =>
    isFilterValueEmpty(getFilterValue(parent.key))
  )
    ? parents[0]
    : undefined;
}
