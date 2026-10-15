import { z } from 'zod';

import {
  OptionalNonNegativeNumberSearchParam,
  SearchParamSortOrderSchema,
} from './search-params.schemas';

const collectionSearchFields = {
  page: OptionalNonNegativeNumberSearchParam,
  pageSize: OptionalNonNegativeNumberSearchParam,
  search: z.string().optional(),
  sortBy: z.string().optional(),
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
