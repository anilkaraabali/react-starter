import type { Key } from '@heroui/react';

type FilterFieldType =
  | 'autocomplete'
  | 'date'
  | 'multiselect'
  | 'number'
  | 'search'
  | 'select';

type FilterOption = {
  description?: string;
  label: string;
  value: Key;
};

export type FilterValue = Key | Key[] | null | undefined;

export type DefaultFilterState = Record<string, FilterValue>;

export type FilterFieldConfig<TState extends object = DefaultFilterState> = {
  /** API / search key, e.g. "categoryId" */
  key: keyof TState & string;
  /** Visible field label, e.g. "Category" */
  label: string;
  options?: FilterOption[];
  prefix?: string;
  type: FilterFieldType;
};
