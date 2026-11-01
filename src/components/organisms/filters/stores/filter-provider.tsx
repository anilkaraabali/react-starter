import { createContext, type ReactNode, useContext } from 'react';
import type {
  FilterFieldConfig,
  FilterState,
} from '@/components/organisms/filters/filters.types';
import { useFilterState } from '@/components/organisms/filters/stores/use-filter-state';
import { withDependentFiltersCleared } from '@/components/organisms/filters/utils/filter-state.utils';

type FilterContextValue<TFilters extends object> = {
  fields: FilterFieldConfig<TFilters>[];
} & ReturnType<typeof useFilterState<TFilters>>;

const FilterContext = createContext<FilterContextValue<FilterState> | null>(
  null
);

type RouteFilterStateOptions<TFilters extends object> = {
  initialState: TFilters;
  navigate: (options: never) => unknown;
  search: TFilters;
};

/** Filter state backed by the route's search params. */
export function useRouteFilterState<TFilters extends object>({
  initialState,
  navigate,
  search,
}: RouteFilterStateOptions<TFilters>) {
  return useFilterState({
    initialState,
    navigate: (updater) =>
      navigate({
        search: updater as never,
      } as never),
    search,
  });
}

type FilterProviderProps<TFilters extends object> = {
  children: ReactNode;
  fields: FilterFieldConfig<TFilters>[];
  value: ReturnType<typeof useFilterState<TFilters>>;
};

export function FilterProvider<TFilters extends object>({
  children,
  fields,
  value,
}: FilterProviderProps<TFilters>) {
  // Changing a field also clears the fields that depend on it, in one update.
  const setFilters = (patch: Partial<TFilters>) =>
    value.setFilters(
      withDependentFiltersCleared(fields, patch, value.getFilterValue)
    );

  const setFilterValue = <K extends keyof TFilters>(
    key: K,
    next: TFilters[K] | undefined
  ) => {
    const patch: Partial<TFilters> = {};
    patch[key] = next;
    setFilters(patch);
  };

  return (
    <FilterContext.Provider
      value={
        {
          ...value,
          fields,
          setFilters,
          setFilterValue,
        } as unknown as FilterContextValue<FilterState>
      }
    >
      {children}
    </FilterContext.Provider>
  );
}

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
  const filterState = useRouteFilterState({
    initialState,
    navigate,
    search,
  });

  return (
    <FilterProvider fields={fields} value={filterState}>
      {children}
    </FilterProvider>
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
