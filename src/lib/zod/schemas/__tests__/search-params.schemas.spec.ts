import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import {
  createSearchParamArraySchema,
  createSearchParamEnumSchema,
  searchParamBooleanSchema,
  searchParamIsoDateSchema,
  searchParamNonNegativeNumberSchema,
  searchParamSortOrderSchema,
  searchParamStringSchema,
} from '@/lib/zod/schemas/search-params.schemas';

describe('search-params.schemas', () => {
  describe('createSearchParamEnumSchema & searchParamSortOrderSchema', () => {
    it('accepts valid enum values and trims string input', () => {
      expect(searchParamSortOrderSchema.safeParse('asc').data).toBe('asc');
      expect(searchParamSortOrderSchema.safeParse('desc').data).toBe('desc');
      expect(searchParamSortOrderSchema.safeParse('  asc  ').data).toBe('asc');
      expect(
        searchParamSortOrderSchema.safeParse(undefined).data
      ).toBeUndefined();
      expect(searchParamSortOrderSchema.safeParse(null).data).toBeUndefined();
      expect(
        searchParamSortOrderSchema.safeParse('sideways').data
      ).toBeUndefined();
    });

    it('works with object enum input', () => {
      const StatusEnum = { ACTIVE: 'active', INACTIVE: 'inactive' } as const;
      const schema = createSearchParamEnumSchema(StatusEnum);

      expect(schema.parse('active')).toBe('active');
      expect(schema.parse('inactive')).toBe('inactive');
      expect(schema.parse('invalid')).toBeUndefined();
    });
  });

  describe('searchParamBooleanSchema', () => {
    it('parses booleans and string literals', () => {
      expect(searchParamBooleanSchema.parse(true)).toBe(true);
      expect(searchParamBooleanSchema.parse('true')).toBe(true);
      expect(searchParamBooleanSchema.parse(false)).toBe(false);
      expect(searchParamBooleanSchema.parse('false')).toBe(false);
      expect(searchParamBooleanSchema.parse(undefined)).toBeUndefined();
    });
  });

  describe('searchParamStringSchema', () => {
    it('trims strings and returns undefined for empty strings', () => {
      expect(searchParamStringSchema.parse('hello')).toBe('hello');
      expect(searchParamStringSchema.parse('  hello  ')).toBe('hello');
      expect(searchParamStringSchema.parse('')).toBeUndefined();
      expect(searchParamStringSchema.parse('   ')).toBeUndefined();
      expect(searchParamStringSchema.parse(undefined)).toBeUndefined();
      expect(searchParamStringSchema.parse(null)).toBeUndefined();
      expect(searchParamStringSchema.parse(123)).toBe('123');
    });
  });

  describe('searchParamIsoDateSchema', () => {
    const parse = (value: unknown) => searchParamIsoDateSchema.parse(value);

    it('drops anything that is not a date, instead of failing the search', () => {
      expect(parse(undefined)).toBeUndefined();
      expect(parse('')).toBeUndefined();
      expect(parse('   ')).toBeUndefined();
      expect(parse('yesterday')).toBeUndefined();
      expect(parse('2024-1-1')).toBeUndefined();
    });

    it('checks the shape, not the calendar', () => {
      // ISO_DATE_PATTERN is a shape check, so 2024-13-45 passes here and the
      // API is what rejects it. The param must not throw the view away.
      expect(parse('2024-13-45')).toBe('2024-13-45');
    });

    it('keeps a well-formed date and trims it', () => {
      expect(parse('2024-01-15')).toBe('2024-01-15');
      expect(parse('  2024-01-15  ')).toBe('2024-01-15');
    });
  });

  describe('searchParamNonNegativeNumberSchema', () => {
    it('reads a query string value as a number', () => {
      expect(searchParamNonNegativeNumberSchema.parse('5')).toBe(5);
      expect(searchParamNonNegativeNumberSchema.parse(0)).toBe(0);
    });

    it('drops an empty, missing or unparsable value', () => {
      expect(searchParamNonNegativeNumberSchema.parse('')).toBeUndefined();
      expect(
        searchParamNonNegativeNumberSchema.parse(undefined)
      ).toBeUndefined();
      expect(searchParamNonNegativeNumberSchema.parse('abc')).toBeUndefined();
      expect(
        searchParamNonNegativeNumberSchema.parse(Infinity)
      ).toBeUndefined();
    });

    it('rejects a negative number rather than dropping it', () => {
      expect(searchParamNonNegativeNumberSchema.safeParse('-1').success).toBe(
        false
      );
    });
  });

  describe('createSearchParamArraySchema', () => {
    const single = createSearchParamArraySchema(z.string());

    it('wraps a lone value into an array', () => {
      expect(single.parse('a')).toEqual(['a']);
      expect(single.parse(['a', 'b'])).toEqual(['a', 'b']);
    });

    it('drops an empty value or an empty array', () => {
      expect(single.parse('')).toBeUndefined();
      expect(single.parse(undefined)).toBeUndefined();
      expect(single.parse([])).toBeUndefined();
    });
  });
});
