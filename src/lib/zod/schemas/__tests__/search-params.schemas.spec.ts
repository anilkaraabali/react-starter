import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import {
  createSearchParamArraySchema,
  createSearchParamEnumSchema,
  SearchParamBooleanSchema,
  SearchParamIsoDateSchema,
  SearchParamNonNegativeNumberSchema,
  SearchParamSortOrderSchema,
  SearchParamStringSchema,
} from '@/lib/zod/schemas/search-params.schemas';

describe('search-params.schemas', () => {
  describe('createSearchParamEnumSchema & SearchParamSortOrderSchema', () => {
    it('accepts valid enum values and trims string input', () => {
      expect(SearchParamSortOrderSchema.safeParse('asc').data).toBe('asc');
      expect(SearchParamSortOrderSchema.safeParse('desc').data).toBe('desc');
      expect(SearchParamSortOrderSchema.safeParse('  asc  ').data).toBe('asc');
      expect(
        SearchParamSortOrderSchema.safeParse(undefined).data
      ).toBeUndefined();
      expect(SearchParamSortOrderSchema.safeParse(null).data).toBeUndefined();
      expect(
        SearchParamSortOrderSchema.safeParse('sideways').data
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

  describe('SearchParamBooleanSchema', () => {
    it('parses booleans and string literals', () => {
      expect(SearchParamBooleanSchema.parse(true)).toBe(true);
      expect(SearchParamBooleanSchema.parse('true')).toBe(true);
      expect(SearchParamBooleanSchema.parse(false)).toBe(false);
      expect(SearchParamBooleanSchema.parse('false')).toBe(false);
      expect(SearchParamBooleanSchema.parse(undefined)).toBeUndefined();
    });
  });

  describe('SearchParamStringSchema', () => {
    it('trims strings and returns undefined for empty strings', () => {
      expect(SearchParamStringSchema.parse('hello')).toBe('hello');
      expect(SearchParamStringSchema.parse('  hello  ')).toBe('hello');
      expect(SearchParamStringSchema.parse('')).toBeUndefined();
      expect(SearchParamStringSchema.parse('   ')).toBeUndefined();
      expect(SearchParamStringSchema.parse(undefined)).toBeUndefined();
      expect(SearchParamStringSchema.parse(null)).toBeUndefined();
      expect(SearchParamStringSchema.parse(123)).toBe('123');
    });
  });

  describe('SearchParamIsoDateSchema', () => {
    const parse = (value: unknown) => SearchParamIsoDateSchema.parse(value);

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

  describe('SearchParamNonNegativeNumberSchema', () => {
    it('reads a query string value as a number', () => {
      expect(SearchParamNonNegativeNumberSchema.parse('5')).toBe(5);
      expect(SearchParamNonNegativeNumberSchema.parse(0)).toBe(0);
    });

    it('drops an empty, missing or unparsable value', () => {
      expect(SearchParamNonNegativeNumberSchema.parse('')).toBeUndefined();
      expect(
        SearchParamNonNegativeNumberSchema.parse(undefined)
      ).toBeUndefined();
      expect(SearchParamNonNegativeNumberSchema.parse('abc')).toBeUndefined();
      expect(
        SearchParamNonNegativeNumberSchema.parse(Infinity)
      ).toBeUndefined();
    });

    it('rejects a negative number rather than dropping it', () => {
      expect(SearchParamNonNegativeNumberSchema.safeParse('-1').success).toBe(
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
