import { i18n } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import { SortOrderDto } from '@/api/models/common/sort-order-dto';
import type { FilterFieldConfig } from '@/components/organisms/filters/filters.types';

export function getSortOrderFilterField<
  TFilters extends object,
>(): FilterFieldConfig<TFilters> {
  return {
    key: 'sortOrder' as keyof TFilters & string,
    label: i18n._(msg`Sort order`),
    props: {
      options: [
        { label: i18n._(msg`Ascending (A-Z)`), value: SortOrderDto.asc },
        { label: i18n._(msg`Descending (Z-A)`), value: SortOrderDto.desc },
      ],
    },
    type: 'select',
  };
}
