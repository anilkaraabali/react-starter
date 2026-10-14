import { isFilterValueActive } from '@/components/organisms/filters/utils/filter-state.utils';

type UseFilterStateOptions<TSearch extends object> = {
  initialState: TSearch;
  navigate: (updater: (prev: TSearch) => TSearch) => void;
  search: TSearch;
};

/** Empty strings stay in the query as `?search=`; omit them instead. */
function omitEmptySearchValue<T>(value: T): T | undefined {
  if ((value as string) === '' || value === null) return undefined;
  return value;
}

export function useFilterState<TSearch extends object>({
  initialState,
  navigate,
  search,
}: UseFilterStateOptions<TSearch>) {
  const patchSearch = (patch: Partial<TSearch>) => {
    navigate((prev) => ({ ...prev, ...patch, page: undefined }));
  };

  const getFilterValue = <K extends keyof TSearch>(
    key: K
  ): TSearch[K] | undefined =>
    search[key] !== undefined ? search[key] : initialState[key];

  const setFilterValue = <K extends keyof TSearch>(
    key: K,
    value: TSearch[K] | undefined
  ) => {
    patchSearch({ [key]: omitEmptySearchValue(value) } as Partial<TSearch>);
  };

  const clearFilter = (...keys: (keyof TSearch)[]) => {
    patchSearch(
      Object.fromEntries(
        keys.map((key) => [key, omitEmptySearchValue(initialState[key])])
      ) as Partial<TSearch>
    );
  };

  const isActive = (key: keyof TSearch): boolean =>
    isFilterValueActive(search[key], initialState[key]);

  const setPage = (page: number) => {
    navigate((prev) => ({
      ...prev,
      page: page <= 1 ? undefined : page,
    }));
  };

  return {
    clearFilter,
    getFilterValue,
    isActive,
    setFilterValue,
    setPage,
  };
}
