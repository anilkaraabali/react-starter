import { z } from 'zod';
import { ISO_DATE_PATTERN } from '@/config/date.constants';
import { SORT_ORDERS } from '@/types/sort.types';

export const SearchParamSortOrderSchema = z.enum(SORT_ORDERS).optional();

function optionalMatchingSearchParam(pattern: RegExp) {
  return z
    .string()
    .optional()
    .transform((value) => {
      if (value == null || value.trim() === '') return undefined;
      const trimmed = value.trim();
      return pattern.test(trimmed) ? trimmed : undefined;
    });
}

export const OptionalIsoDateSearchParam =
  optionalMatchingSearchParam(ISO_DATE_PATTERN);

export const OptionalNonNegativeNumberSearchParam = z.preprocess((value) => {
  if (value === '' || value == null) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}, z.number().nonnegative().optional());

export const optionalArraySearchParam = <T extends z.ZodType>(item: T) =>
  z.preprocess((value) => {
    if (value == null || value === '') return undefined;
    const array = Array.isArray(value) ? value : [value];
    return array.length > 0 ? array : undefined;
  }, z.array(item).optional());
