import type { CalendarDate } from '@internationalized/date';

import type { FilterValue } from '@/components/organisms/filters/filters.types';
import { toCalendarDate, toIsoDateString } from '@/utils/date.utils';

/** URL search value (`YYYY-MM-DD`) → `FilterDate` value. Invalid or empty → `null`. */
export function parseDateFilterValue(value: FilterValue): CalendarDate | null {
  return toCalendarDate(typeof value === 'string' ? value : undefined);
}

/** `FilterDate` value → URL search value. Cleared → `undefined` (param omitted). */
export function serializeDateFilterValue(
  value: CalendarDate | null
): string | undefined {
  return toIsoDateString(value) || undefined;
}
