import { i18n } from '@lingui/core';
import { beforeEach, describe, expect, it } from 'vitest';
import { FALLBACK_VALUE } from '@/config/string.constants';
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatNumber,
  formatPercent,
} from '@/utils/format.utils';

describe('format.utils', () => {
  beforeEach(() => {
    i18n.activate('en');
  });

  describe('formatCurrency', () => {
    it('formats a valid number as USD currency by default', () => {
      expect(formatCurrency(189)).toBe('$189.00');
      expect(formatCurrency(189.5)).toBe('$189.50');
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('returns fallback value for null or undefined', () => {
      expect(formatCurrency(null)).toBe(FALLBACK_VALUE);
      expect(formatCurrency(undefined)).toBe(FALLBACK_VALUE);
      expect(formatCurrency(Number.NaN)).toBe(FALLBACK_VALUE);
    });

    it('supports custom currency', () => {
      expect(formatCurrency(100, { currency: 'EUR' })).toBe('€100.00');
    });

    it('formats based on active i18n locale', () => {
      i18n.activate('tr');
      expect(formatCurrency(189, { currency: 'TRY' })).toContain('189,00');
    });
  });

  describe('formatNumber', () => {
    it('formats a number with fixed decimal places', () => {
      expect(formatNumber(189)).toBe('189.00');
      expect(formatNumber(189.456, { decimals: 2 })).toBe('189.46');
      expect(formatNumber(0)).toBe('0.00');
    });

    it('returns fallback value for invalid numbers', () => {
      expect(formatNumber(null)).toBe(FALLBACK_VALUE);
      expect(formatNumber(undefined)).toBe(FALLBACK_VALUE);
      expect(formatNumber(Number.NaN)).toBe(FALLBACK_VALUE);
    });

    it('respects active i18n locale decimal separator', () => {
      i18n.activate('tr');
      expect(formatNumber(189.5)).toBe('189,50');
    });
  });

  describe('formatPercent', () => {
    it('formats a ratio as percent', () => {
      expect(formatPercent(0.52)).toBe('52%');
      expect(formatPercent(0.524, { decimals: 1 })).toBe('52.4%');
      expect(formatPercent(0)).toBe('0%');
    });

    it('returns fallback value for invalid ratios', () => {
      expect(formatPercent(null)).toBe(FALLBACK_VALUE);
      expect(formatPercent(undefined)).toBe(FALLBACK_VALUE);
      expect(formatPercent(Number.NaN)).toBe(FALLBACK_VALUE);
    });

    it('respects active i18n locale', () => {
      i18n.activate('tr');
      // In Turkish, percent format is "%52" or "% 52"
      expect(formatPercent(0.52)).toContain('52');
    });
  });

  describe('formatDate', () => {
    it('formats an ISO string as a calendar date, not a datetime', () => {
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
