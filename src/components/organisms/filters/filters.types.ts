import type { Key } from '@heroui/react';

export type FilterOption = {
  description?: string;
  label: string;
  value: Key;
};

export type FilterValue = Key | Key[] | null | undefined;

export type FilterState = Record<string, FilterValue>;

type FilterFieldProps = {
  options?: FilterOption[];
  prefix?: string;
  placeholder?: string;
};

type FilterFieldConfigBase<TKey extends string> = {
  key: TKey;
  label: string;
  props?: FilterFieldProps;
};

export type SearchFilterFieldConfig<TKey extends string = string> =
  FilterFieldConfigBase<TKey> & {
    type: 'search';
  };

export type FilterFieldConfig<TFilters extends object = FilterState> =
  FilterFieldConfigBase<keyof TFilters & string> & {
    type: 'autocomplete' | 'date' | 'number' | 'search' | 'select';
  };
