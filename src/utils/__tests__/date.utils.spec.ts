import { parseDate } from '@internationalized/date';
import { describe, expect, it } from 'vitest';
import { toCalendarDate, toIsoDateString } from '@/utils/date.utils';

describe('date.utils', () => {
  describe('toCalendarDate', () => {
    it('parses a YYYY-MM-DD string', () => {
      expect(toCalendarDate('2024-03-15')?.toString()).toBe('2024-03-15');
      expect(toCalendarDate('2024-03-15')).toEqual(parseDate('2024-03-15'));
    });

    it('rejects a string that is not YYYY-MM-DD', () => {
      expect(toCalendarDate('15/03/2024')).toBeNull();
      expect(toCalendarDate('2024-3-15')).toBeNull();
      expect(toCalendarDate('not a date')).toBeNull();
    });

    it('rejects a well shaped but impossible date', () => {
      expect(toCalendarDate('2024-13-45')).toBeNull();
    });

    it('rejects an empty or missing value', () => {
      expect(toCalendarDate('')).toBeNull();
      expect(toCalendarDate(undefined)).toBeNull();
    });
  });

  describe('toIsoDateString', () => {
    it('returns the calendar date as YYYY-MM-DD', () => {
      expect(toIsoDateString(parseDate('2024-03-15'))).toBe('2024-03-15');
    });

    it('returns an empty string for null', () => {
      expect(toIsoDateString(null)).toBe('');
    });
  });
});
