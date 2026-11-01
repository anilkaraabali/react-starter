import { fallback } from '@tanstack/zod-adapter';
import { z } from 'zod';
import { SortByDto } from '@/api/models/common/sort-by-dto';
import { DEFAULT_SORT_BY, DEFAULT_SORT_ORDER } from '@/config/sort';
import {
  createSearchParamObjectEnumSchema,
  searchParamPositiveIntSchema,
  searchParamSortOrderSchema,
  searchParamStringSchema,
} from './search-params.schemas';

const baseFields = {
  page: searchParamPositiveIntSchema,
  pageSize: searchParamPositiveIntSchema,
  search: searchParamStringSchema,
  sortBy: fallback(
    createSearchParamObjectEnumSchema(SortByDto),
    DEFAULT_SORT_BY
  ).default(DEFAULT_SORT_BY),
  sortOrder: fallback(searchParamSortOrderSchema, DEFAULT_SORT_ORDER).default(
    DEFAULT_SORT_ORDER
  ),
};

const baseSchema = z.object(baseFields);

export function createCollectionSearchSchema<
  TFields extends z.ZodRawShape = Record<never, never>,
>(fields?: TFields) {
  return fields ? baseSchema.extend(fields) : baseSchema;
}
