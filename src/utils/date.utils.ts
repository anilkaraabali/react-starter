import {
  type CalendarDate,
  type DateValue,
  parseDate,
} from '@internationalized/date';
import { ISO_DATE_PATTERN } from '@/config/date.constants';

export function toCalendarDate(value: string | undefined): CalendarDate | null {
  if (!value || !ISO_DATE_PATTERN.test(value)) {
    return null;
  }

  try {
    return parseDate(value);
  } catch {
    return null;
  }
}

export function toIsoDateString(value: DateValue | null): string {
  if (!value) {
    return '';
  }

  return value.toString();
}
