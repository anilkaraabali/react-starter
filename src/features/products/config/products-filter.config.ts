import { i18n } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import type { FilterFieldConfig } from '@/components/organisms/filters/filters.types';
import { getSortOrderFilterField } from '@/components/organisms/filters/utils/filter-fields.utils';
import type { GetProductsQuery } from '@/features/products/api/get-products';
import {
  PRODUCT_CATEGORY_OPTIONS,
  PRODUCT_STATUS_OPTIONS,
} from '@/features/products/config/product.constants';

export const PRODUCT_SORT_FIELDS = [
  'name',
  'category',
  'price',
  'stock',
  'status',
  'createdAt',
  'updatedAt',
] as const;

type ProductSortField = (typeof PRODUCT_SORT_FIELDS)[number];

export const DEFAULT_PRODUCT_SORT_BY: ProductSortField = 'createdAt';
export const DEFAULT_PRODUCT_SORT_ORDER = 'desc' as const;

export const INITIAL_PRODUCTS_SEARCH_STATE: GetProductsQuery = {
  category: undefined,
  dateEnd: undefined,
  dateStart: undefined,
  page: 1,
  pageSize: undefined,
  search: '',
  sortBy: DEFAULT_PRODUCT_SORT_BY,
  sortOrder: DEFAULT_PRODUCT_SORT_ORDER,
  status: undefined,
};

export const getProductSortOptions = (): {
  label: string;
  value: ProductSortField;
}[] => [
  { label: i18n._(msg`Name`), value: 'name' },
  { label: i18n._(msg`Category`), value: 'category' },
  { label: i18n._(msg`Price`), value: 'price' },
  { label: i18n._(msg`Stock`), value: 'stock' },
  { label: i18n._(msg`Status`), value: 'status' },
  { label: i18n._(msg`Created date`), value: 'createdAt' },
  { label: i18n._(msg`Updated date`), value: 'updatedAt' },
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
      options: PRODUCT_CATEGORY_OPTIONS.map((c) => ({
        label: c.label,
        value: c.value,
      })),
      type: 'select',
    },
    {
      key: 'status',
      label: i18n._(msg`Status`),
      options: PRODUCT_STATUS_OPTIONS.map((s) => ({
        label: s.label,
        value: s.value,
      })),
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
      options: getProductSortOptions().map((s) => ({
        label: s.label,
        value: s.value,
      })),
      type: 'select',
    },
    getSortOrderFilterField<GetProductsQuery>(),
  ];
