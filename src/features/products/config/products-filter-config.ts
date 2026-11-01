import { i18n } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import type { GetProductsQuery } from '@/api/endpoints/products/get-products';
import { ProductSortByDto } from '@/api/models/products/product-sort-by-dto';
import type { FilterFieldConfig } from '@/components/organisms/filters/filters.types';
import { getSortOrderFilterField } from '@/components/organisms/filters/utils/filter-fields.utils';
import { DEFAULT_SORT_ORDER } from '@/config/sort';
import {
  getProductCategorySelectOptions,
  getProductStatusSelectOptions,
} from '@/features/products/config/product-select-options';

export const initialProductsFiltersState = {
  page: 1,
  pageSize: undefined,
  search: '',
  sortBy: ProductSortByDto.createdAt,
  sortOrder: DEFAULT_SORT_ORDER,
} satisfies GetProductsQuery;

const getProductSortOptions = (): {
  label: string;
  value: ProductSortByDto;
}[] => [
  { label: i18n._(msg`Name`), value: ProductSortByDto.name },
  { label: i18n._(msg`Category`), value: ProductSortByDto.category },
  { label: i18n._(msg`Price`), value: ProductSortByDto.price },
  { label: i18n._(msg`Stock`), value: ProductSortByDto.stock },
  { label: i18n._(msg`Status`), value: ProductSortByDto.status },
  { label: i18n._(msg`Created date`), value: ProductSortByDto.createdAt },
  { label: i18n._(msg`Updated date`), value: ProductSortByDto.updatedAt },
];

export const getProductsFilterFields =
  (): FilterFieldConfig<GetProductsQuery>[] => [
    {
      key: 'search',
      label: i18n._(msg`Search products by name or SKU...`),
      type: 'search',
    },
    {
      key: 'category',
      label: i18n._(msg`Category`),
      props: {
        options: getProductCategorySelectOptions(),
      },
      type: 'select',
    },
    {
      key: 'status',
      label: i18n._(msg`Status`),
      props: {
        options: getProductStatusSelectOptions(),
      },
      type: 'select',
    },
    {
      key: 'dateStart',
      label: i18n._(msg`Start date`),
      type: 'date',
    },
    {
      key: 'dateEnd',
      label: i18n._(msg`End date`),
      type: 'date',
    },
    {
      key: 'sortBy',
      label: i18n._(msg`Sort by`),
      props: {
        options: getProductSortOptions().map((s) => ({
          label: s.label,
          value: s.value,
        })),
      },
      type: 'select',
    },
    getSortOrderFilterField<GetProductsQuery>(),
  ];
