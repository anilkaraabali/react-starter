import { i18n } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import {
  ProductCategoryDto,
  type ProductCategoryDto as ProductCategoryValue,
} from '@/api/models/products/product-category-dto';
import {
  ProductStatusDto,
  type ProductStatusDto as ProductStatusValue,
} from '@/api/models/products/product-status-dto';

export type ProductSelectOption<T extends string> = {
  label: string;
  value: T;
};

export function getProductCategorySelectOptions(): ProductSelectOption<ProductCategoryValue>[] {
  return [
    { label: i18n._(msg`Electronics`), value: ProductCategoryDto.electronics },
    { label: i18n._(msg`Clothing`), value: ProductCategoryDto.clothing },
    { label: i18n._(msg`Home & Living`), value: ProductCategoryDto.home },
    { label: i18n._(msg`Books`), value: ProductCategoryDto.books },
    { label: i18n._(msg`Accessories`), value: ProductCategoryDto.accessories },
  ];
}

export function getProductStatusSelectOptions(): ProductSelectOption<ProductStatusValue>[] {
  return [
    { label: i18n._(msg`Active`), value: ProductStatusDto.active },
    { label: i18n._(msg`Draft`), value: ProductStatusDto.draft },
    { label: i18n._(msg`Archived`), value: ProductStatusDto.archived },
  ];
}
