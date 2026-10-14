import type {
  CollectionFilterState,
  CollectionQueryParams,
} from '@/types/api.types';
import type { SortOrder } from '@/types/sort.types';

type CollectionSortOptions<TField extends string> = {
  defaultSortBy: TField;
  defaultSortOrder: SortOrder;
  sortFields: readonly TField[];
};

function resolveSortBy<TField extends string>(
  sortBy: string | undefined,
  options: CollectionSortOptions<TField>
): TField {
  if (sortBy && options.sortFields.includes(sortBy as TField)) {
    return sortBy as TField;
  }

  return options.defaultSortBy;
}

function resolveSortOrder(
  sortOrder: SortOrder | undefined,
  defaultSortOrder: SortOrder
): SortOrder {
  return sortOrder === 'asc' || sortOrder === 'desc'
    ? sortOrder
    : defaultSortOrder;
}

export function toCollectionQueryParams<TField extends string>(
  search: CollectionFilterState,
  sortOptions: CollectionSortOptions<TField>
): CollectionQueryParams & { sortBy: TField; sortOrder: SortOrder } {
  const trimmedSearch = search.search?.trim();

  return {
    page: search.page,
    pageSize: search.pageSize,
    search: trimmedSearch ? trimmedSearch : undefined,
    sortBy: resolveSortBy(search.sortBy, sortOptions),
    sortOrder: resolveSortOrder(search.sortOrder, sortOptions.defaultSortOrder),
  };
}
