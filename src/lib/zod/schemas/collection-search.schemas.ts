import { z } from 'zod';

import {
  SearchParamNonNegativeNumberSchema,
  SearchParamSortOrderSchema,
  SearchParamStringSchema,
} from './search-params.schemas';

const collectionSearchFields = {
  page: SearchParamNonNegativeNumberSchema,
  pageSize: SearchParamNonNegativeNumberSchema,
  search: SearchParamStringSchema,
  sortBy: SearchParamStringSchema,
  sortOrder: SearchParamSortOrderSchema,
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
