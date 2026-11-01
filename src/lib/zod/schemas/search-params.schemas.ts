import { z } from 'zod';
import { SortOrderDto } from '@/api/models/common/sort-order-dto';
import { ISO_DATE_PATTERN } from '@/config/date';

/**
 * Lenient enum param for `as const` enum-like objects (e.g. `SortOrderDto`):
 * unknown values are dropped instead of failing the route.
 */
export function createSearchParamObjectEnumSchema<
  const TEntries extends Record<string, string>,
>(entries: TEntries) {
  const values = Object.values(entries) as [
    TEntries[keyof TEntries],
    ...TEntries[keyof TEntries][],
  ];

  return z.preprocess((value) => {
    if (value == null) return undefined;
    if (typeof value === 'string') {
      const trimmed = value.trim();
      return values.includes(trimmed as TEntries[keyof TEntries])
        ? trimmed
        : undefined;
    }
    return undefined;
  }, z.enum(values).optional());
}

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
  createSearchParamObjectEnumSchema(SortOrderDto);

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

/** Page numbers and page sizes: a positive whole number, anything else is dropped. */
export const searchParamPositiveIntSchema = z.preprocess((value) => {
  if (value === '' || value == null) return undefined;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}, z.number().int().positive().optional());

export const createSearchParamArraySchema = <T extends z.ZodType>(item: T) =>
  z.preprocess((value) => {
    if (value == null || value === '') return undefined;
    const array = Array.isArray(value) ? value : [value];
    return array.length > 0 ? array : undefined;
  }, z.array(item).optional());
