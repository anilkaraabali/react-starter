import { createContext, type ReactNode, useContext } from 'react';
import type {
  DefaultFilterState,
  FilterFieldConfig,
} from '@/components/organisms/filters/filters.types';
import { useFilterState } from '@/components/organisms/filters/stores/use-filter-state';

export type FilterContextValue<TSearch extends object = DefaultFilterState> = {
  fields: FilterFieldConfig<TSearch>[];
} & ReturnType<typeof useFilterState<TSearch>>;

const FilterContext =
  createContext<FilterContextValue<DefaultFilterState> | null>(null);

type FilterProviderProps<TSearch extends object> = {
  children: ReactNode;
  fields: FilterFieldConfig<TSearch>[];
  initialState: TSearch;
  navigate: (updater: (prev: TSearch) => TSearch) => void;
  search: TSearch;
};

export function FilterProvider<TSearch extends object>({
  children,
  fields,
  initialState,
  navigate,
  search,
}: FilterProviderProps<TSearch>) {
  const filterState = useFilterState({ initialState, navigate, search });

  return (
    <FilterContext.Provider
      value={
        {
          ...filterState,
          fields,
        } as FilterContextValue<TSearch> as FilterContextValue<DefaultFilterState>
      }
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter<
  TSearch extends object = DefaultFilterState,
>(): FilterContextValue<TSearch> {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }

  return context as FilterContextValue<TSearch>;
}

export function useOptionalFilter<
  TSearch extends object = DefaultFilterState,
>(): FilterContextValue<TSearch> | null {
  const context = useContext(FilterContext);
  return (context as FilterContextValue<TSearch>) ?? null;
}
