import {
  type CalendarDate,
  type DateValue,
  parseDate,
} from '@internationalized/date';
import { i18n } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import dayjs, { type Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  ISO_DATE_PATTERN,
} from '@/config/date.constants';

import 'dayjs/locale/tr';

dayjs.extend(isoWeek);
dayjs.extend(localizedFormat);

type DateInput = Date | DateValue | number | string | undefined;

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

function toCalendarDay(value: string): Dayjs {
  const dateOnly = value.slice(0, 10);
  const parsed = dayjs(dateOnly);

  return parsed.isValid() ? parsed : dayjs(value);
}

function toDayjs(date: Exclude<DateInput, undefined>): Dayjs {
  if (typeof date === 'string') {
    return toCalendarDay(date);
  }

  if (date instanceof Date || typeof date === 'number') {
    return dayjs(date);
  }

  return toCalendarDay(date.toString());
}

export function formatDate(
  date?: DateInput | null,
  format: string = DATE_FORMAT
) {
  if (date == null || date === '') {
    return '';
  }

  const parsed = toDayjs(date);

  if (!parsed.isValid()) {
    return i18n._(msg`Invalid date`);
  }

  return parsed.locale(i18n.locale).format(format);
}

/** Date and time of an instant; unlike `formatDate`, strings keep their time. */
export function formatDateTime(date?: Date | number | string | null) {
  if (date == null || date === '') {
    return '';
  }

  return formatDate(new Date(date), DATE_TIME_FORMAT);
}
