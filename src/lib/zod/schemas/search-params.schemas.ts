import { z } from 'zod';
import { ISO_DATE_PATTERN } from '@/config/date.constants';
import { SORT_ORDERS } from '@/types/sort.types';

export function createSearchParamEnumSchema<
  T extends string,
  const TValues extends readonly [T, ...T[]] | readonly T[] | Record<string, T>,
>(valuesOrEnum: TValues) {
  const values = Array.isArray(valuesOrEnum)
    ? (valuesOrEnum as readonly T[])
    : (Object.values(valuesOrEnum) as readonly T[]);

  return z.preprocess((value) => {
    if (value == null) return undefined;
    if (typeof value === 'string') {
      const trimmed = value.trim();
      return values.includes(trimmed as T) ? trimmed : undefined;
    }
    return undefined;
  }, z.enum(values as unknown as [T, ...T[]]).optional());
}

export const searchParamSortOrderSchema =
  createSearchParamEnumSchema(SORT_ORDERS);

export const searchParamBooleanSchema = z
  .union([z.boolean(), z.literal('true'), z.literal('false')])
  .transform((value) => value === true || value === 'true')
  .optional();

export const searchParamStringSchema = z.preprocess((value) => {
  if (value == null) return undefined;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed === '' ? undefined : trimmed;
  }
  return String(value);
}, z.string().optional());

function createSearchParamPatternSchema(pattern: RegExp) {
  return z
    .string()
    .optional()
    .transform((value) => {
      if (value == null || value.trim() === '') return undefined;
      const trimmed = value.trim();
      return pattern.test(trimmed) ? trimmed : undefined;
    });
}

export const searchParamIsoDateSchema =
  createSearchParamPatternSchema(ISO_DATE_PATTERN);

export const searchParamNonNegativeNumberSchema = z.preprocess((value) => {
  if (value === '' || value == null) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}, z.number().nonnegative().optional());

export const createSearchParamArraySchema = <T extends z.ZodType>(item: T) =>
  z.preprocess((value) => {
    if (value == null || value === '') return undefined;
    const array = Array.isArray(value) ? value : [value];
    return array.length > 0 ? array : undefined;
  }, z.array(item).optional());
