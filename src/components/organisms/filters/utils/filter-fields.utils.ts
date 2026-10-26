import { i18n } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import type { FilterFieldConfig } from '@/components/organisms/filters/filters.types';
import { SORT_ORDERS } from '@/types/sort.types';

export function getSortOrderFilterField<
  TFilters extends object,
>(): FilterFieldConfig<TFilters> {
  return {
    key: 'sortOrder' as keyof TFilters & string,
    label: i18n._(msg`Sort order`),
    props: {
      options: [
        { label: i18n._(msg`Ascending (A-Z)`), value: SORT_ORDERS[0] },
        { label: i18n._(msg`Descending (Z-A)`), value: SORT_ORDERS[1] },
      ],
    },
    type: 'select',
  };
}
