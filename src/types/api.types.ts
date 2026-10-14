import type { SortOrder } from '@/types/sort.types';

export type CollectionQueryParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
};

export type CollectionFilterState = CollectionQueryParams & {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
};
