import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import {
  OptionalIsoDateSearchParam,
  OptionalNonNegativeNumberSearchParam,
  optionalArraySearchParam,
  SearchParamSortOrderSchema,
} from '@/lib/zod/schemas/search-params.schemas';

describe('search-params.schemas', () => {
  describe('SearchParamSortOrderSchema', () => {
    it('accepts the two orders and nothing absent', () => {
      expect(SearchParamSortOrderSchema.safeParse('asc').success).toBe(true);
      expect(SearchParamSortOrderSchema.safeParse('desc').success).toBe(true);
      expect(SearchParamSortOrderSchema.safeParse(undefined).success).toBe(
        true
      );
      expect(SearchParamSortOrderSchema.safeParse('sideways').success).toBe(
        false
      );
    });
  });

  describe('OptionalIsoDateSearchParam', () => {
    const parse = (value: unknown) => OptionalIsoDateSearchParam.parse(value);

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

  describe('OptionalNonNegativeNumberSearchParam', () => {
    it('reads a query string value as a number', () => {
      expect(OptionalNonNegativeNumberSearchParam.parse('5')).toBe(5);
      expect(OptionalNonNegativeNumberSearchParam.parse(0)).toBe(0);
    });

    it('drops an empty, missing or unparsable value', () => {
      expect(OptionalNonNegativeNumberSearchParam.parse('')).toBeUndefined();
      expect(
        OptionalNonNegativeNumberSearchParam.parse(undefined)
      ).toBeUndefined();
      expect(OptionalNonNegativeNumberSearchParam.parse('abc')).toBeUndefined();
      expect(
        OptionalNonNegativeNumberSearchParam.parse(Infinity)
      ).toBeUndefined();
    });

    it('rejects a negative number rather than dropping it', () => {
      expect(OptionalNonNegativeNumberSearchParam.safeParse('-1').success).toBe(
        false
      );
    });
  });

  describe('optionalArraySearchParam', () => {
    const single = optionalArraySearchParam(z.string());

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
