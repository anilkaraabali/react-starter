import { isFilterValueActive } from '@/components/organisms/filters/utils/filter-state.utils';

type UseFilterStateOptions<TFilters extends object> = {
  initialState: TFilters;
  navigate: (updater: (prev: TFilters) => TFilters) => void;
  search: TFilters;
};

export function useFilterState<TFilters extends object>({
  initialState,
  navigate,
  search,
}: UseFilterStateOptions<TFilters>) {
  const setFilters = (patch: Partial<TFilters>) => {
    navigate((prev) => ({ ...prev, ...patch, page: undefined }));
  };

  const getFilterValue = <K extends keyof TFilters>(
    key: K
  ): TFilters[K] | undefined =>
    search[key] !== undefined ? search[key] : initialState[key];

  const setFilterValue = <K extends keyof TFilters>(
    key: K,
    value: TFilters[K] | undefined
  ) => {
    setFilters({ [key]: value } as Partial<TFilters>);
  };

  const clearFilters = (...keys: (keyof TFilters)[]) => {
    setFilters(
      Object.fromEntries(
        keys.map((key) => [key, initialState[key]])
      ) as Partial<TFilters>
    );
  };

  const isActive = (key: keyof TFilters): boolean =>
    isFilterValueActive(search[key], initialState[key]);

  const setPage = (page: number) => {
    navigate((prev) => ({
      ...prev,
      page: page <= 1 ? undefined : page,
    }));
  };

  return {
    clearFilters,
    getFilterValue,
    isActive,
    setFilters,
    setFilterValue,
    setPage,
  };
}
