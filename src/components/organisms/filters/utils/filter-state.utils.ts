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
export function hasActiveFilterFields<TState extends object>(
  search: Partial<TState>,
  initialState: TState,
  fields: FilterFieldConfig<TState>[]
): boolean {
  return fields.some((field) =>
    isFilterValueActive(search[field.key], initialState[field.key])
  );
}
