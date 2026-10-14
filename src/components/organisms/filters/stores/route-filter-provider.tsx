import type { ReactNode } from 'react';

import type { FilterFieldConfig } from '@/components/organisms/filters/filters.types';
import { FilterProvider } from './filter-provider';

type RouteFilterProviderProps<TSearch extends object> = {
  children: ReactNode;
  fields: FilterFieldConfig<TSearch>[];
  initialState: TSearch;
  navigate: (options: never) => unknown;
  search: TSearch;
};

export function RouteFilterProvider<TSearch extends object>({
  children,
  fields,
  initialState,
  navigate,
  search,
}: RouteFilterProviderProps<TSearch>) {
  return (
    <FilterProvider
      fields={fields}
      initialState={initialState}
      navigate={(updater) =>
        navigate({
          search: ((prev: TSearch) => updater(prev)) as never,
        } as never)
      }
      search={search}
    >
      {children}
    </FilterProvider>
  );
}
