import { z } from 'zod';

import {
  searchParamNonNegativeNumberSchema,
  searchParamSortOrderSchema,
  searchParamStringSchema,
} from './search-params.schemas';

const collectionSearchFields = {
  page: searchParamNonNegativeNumberSchema,
  pageSize: searchParamNonNegativeNumberSchema,
  search: searchParamStringSchema,
  sortBy: searchParamStringSchema,
  sortOrder: searchParamSortOrderSchema,
};

export function createCollectionSearchSchema<
  T extends z.ZodRawShape = Record<never, never>,
>(extra: T = {} as T) {
  const schema = z.object({
    ...collectionSearchFields,
    ...extra,
  } as Omit<typeof collectionSearchFields, keyof T> & T);

  return schema.catch({} as z.infer<typeof schema>);
}
