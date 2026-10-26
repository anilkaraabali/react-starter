import { createContext, type ReactNode, useContext } from 'react';
import type {
  FilterFieldConfig,
  FilterState,
} from '@/components/organisms/filters/filters.types';
import { useFilterState } from '@/components/organisms/filters/stores/use-filter-state';

type FilterContextValue<TFilters extends object> = {
  fields: FilterFieldConfig<TFilters>[];
} & ReturnType<typeof useFilterState<TFilters>>;

const FilterContext = createContext<FilterContextValue<FilterState> | null>(
  null
);

type RouteFilterProviderProps<TFilters extends object> = {
  children: ReactNode;
  fields: FilterFieldConfig<TFilters>[];
  initialState: TFilters;
  navigate: (options: never) => unknown;
  search: TFilters;
};

export function RouteFilterProvider<TFilters extends object>({
  children,
  fields,
  initialState,
  navigate,
  search,
}: RouteFilterProviderProps<TFilters>) {
  const filterState = useFilterState({
    initialState,
    navigate: (updater) =>
      navigate({
        search: updater as never,
      } as never),
    search,
  });

  return (
    <FilterContext.Provider
      value={
        {
          ...filterState,
          fields,
        } as unknown as FilterContextValue<FilterState>
      }
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter<
  TFilters extends object,
>(): FilterContextValue<TFilters> {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a route filter provider');
  }

  return context as unknown as FilterContextValue<TFilters>;
}
