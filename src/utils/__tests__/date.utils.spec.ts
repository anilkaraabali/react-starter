import { parseDate } from '@internationalized/date';
import { describe, expect, it } from 'vitest';

const { formatDate, formatDateTime, toCalendarDate, toIsoDateString } =
  await import('@/utils/date.utils');

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

  describe('formatDate', () => {
    it('formats an ISO string as a calendar date, not a datetime', () => {
      // A plain YYYY-MM-DD string must not drift by a day through UTC parsing.
      expect(formatDate('2024-03-15')).toBe('March 15, 2024');
    });

    it('formats a Date built from local parts', () => {
      expect(formatDate(new Date(2024, 2, 15))).toBe('March 15, 2024');
    });

    it('formats with the given format', () => {
      expect(formatDate('2024-03-15', 'YYYY-MM-DD')).toBe('2024-03-15');
    });

    it('returns an empty string for a missing or empty value', () => {
      expect(formatDate(undefined)).toBe('');
      expect(formatDate(null)).toBe('');
      expect(formatDate('')).toBe('');
    });

    it('reports an unparsable value instead of printing "Invalid Date"', () => {
      expect(formatDate('not-a-date')).toBe('Invalid date');
    });
  });

  describe('formatDateTime', () => {
    it('keeps the time part of a datetime string', () => {
      // The clock time depends on the runner timezone, so assert the shape.
      expect(formatDateTime('2024-03-15T13:30:00')).toMatch(
        /^March 15, 2024 \d{1,2}:\d{2} (AM|PM)$/
      );
    });

    it('accepts a Date and a timestamp', () => {
      const local = new Date(2024, 2, 15, 13, 30);

      expect(formatDateTime(local)).toMatch(
        /^March 15, 2024 \d{1,2}:\d{2} (AM|PM)$/
      );
      expect(formatDateTime(local.getTime())).toBe(formatDateTime(local));
    });

    it('returns an empty string for a missing or empty value', () => {
      expect(formatDateTime(undefined)).toBe('');
      expect(formatDateTime(null)).toBe('');
      expect(formatDateTime('')).toBe('');
    });
  });
});
