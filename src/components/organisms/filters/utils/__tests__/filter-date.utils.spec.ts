import { CalendarDate } from '@internationalized/date';
import { describe, expect, it } from 'vitest';

import {
  parseDateFilterValue,
  serializeDateFilterValue,
} from '@/components/organisms/filters/utils/filter-date.utils';

describe('filter-date.utils', () => {
  describe('parseDateFilterValue', () => {
    it('parses a YYYY-MM-DD search value into a CalendarDate', () => {
      const parsed = parseDateFilterValue('2026-10-07');

      expect(parsed).toBeInstanceOf(CalendarDate);
      expect(parsed?.toString()).toBe('2026-10-07');
    });

    it('returns null for empty, invalid or non-string values', () => {
      expect(parseDateFilterValue(undefined)).toBeNull();
      expect(parseDateFilterValue(null)).toBeNull();
      expect(parseDateFilterValue('')).toBeNull();
      expect(parseDateFilterValue('07.10.2026')).toBeNull();
      expect(parseDateFilterValue('2026-13-40')).toBeNull();
      expect(parseDateFilterValue(20261007)).toBeNull();
      expect(parseDateFilterValue(['2026-10-07'])).toBeNull();
    });
  });

  describe('serializeDateFilterValue', () => {
    it('serializes a CalendarDate to YYYY-MM-DD', () => {
      expect(serializeDateFilterValue(new CalendarDate(2026, 1, 5))).toBe(
        '2026-01-05'
      );
    });

    it('omits a cleared value', () => {
      expect(serializeDateFilterValue(null)).toBeUndefined();
    });
  });

  it('round-trips URL → picker → URL unchanged', () => {
    const url = '2026-02-28';

    expect(serializeDateFilterValue(parseDateFilterValue(url))).toBe(url);
  });
});
