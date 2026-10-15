import type {
  ProductCategory,
  ProductStatus,
} from '@/features/products/types/product.types';

export const PRODUCT_STATUS_OPTIONS: {
  label: string;
  value: ProductStatus;
}[] = [
  { label: 'Active', value: 'active' },
  { label: 'Draft', value: 'draft' },
  { label: 'Archived', value: 'archived' },
];

export const PRODUCT_CATEGORY_OPTIONS: {
  label: string;
  value: ProductCategory;
}[] = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Home & Living', value: 'home' },
  { label: 'Books', value: 'books' },
  { label: 'Accessories', value: 'accessories' },
];
