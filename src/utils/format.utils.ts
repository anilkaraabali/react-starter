import type { DateValue } from '@internationalized/date';
import { i18n } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import dayjs, { type Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '@/config/date.constants';
import { FALLBACK_VALUE } from '@/config/string.constants';

import 'dayjs/locale/tr';

dayjs.extend(isoWeek);
dayjs.extend(localizedFormat);

type FormatCurrencyOptions = {
  currency?: string;
};

export function formatCurrency(
  amount?: null | number,
  { currency = 'USD' }: FormatCurrencyOptions = {}
): string {
  if (amount == null || Number.isNaN(amount)) {
    return FALLBACK_VALUE;
  }

  const locale = i18n.locale || 'en';

  return new Intl.NumberFormat(locale, {
    currency,
    style: 'currency',
  }).format(amount);
}

type FormatNumberOptions = {
  decimals?: number;
};

export function formatNumber(
  value?: null | number,
  { decimals = 2 }: FormatNumberOptions = {}
): string {
  if (value == null || Number.isNaN(value)) {
    return FALLBACK_VALUE;
  }

  const locale = i18n.locale || 'en';

  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

type FormatPercentOptions = {
  decimals?: number;
};

export function formatPercent(
  ratio?: null | number,
  { decimals = 0 }: FormatPercentOptions = {}
): string {
  if (ratio == null || Number.isNaN(ratio)) {
    return FALLBACK_VALUE;
  }

  const locale = i18n.locale || 'en';

  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
    style: 'percent',
  }).format(ratio);
}

type DateInput = Date | DateValue | number | string | undefined;

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
): string {
  if (date == null || date === '') {
    return '';
  }

  const parsed = toDayjs(date);

  if (!parsed.isValid()) {
    return i18n._(msg`Invalid date`);
  }

  return parsed.locale(i18n.locale).format(format);
}

export function formatDateTime(
  date?: Date | number | string | null,
  format: string = DATE_TIME_FORMAT
): string {
  if (date == null || date === '') {
    return '';
  }

  return formatDate(new Date(date), format);
}
