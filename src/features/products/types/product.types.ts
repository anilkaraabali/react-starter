import type { Entity } from '@/types/api.types';

export const PRODUCT_STATUSES = ['draft', 'active', 'archived'] as const;

export const PRODUCT_CATEGORIES = [
  'electronics',
  'clothing',
  'home',
  'books',
  'accessories',
] as const;

export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export type Product = Entity<{
  barcode?: string;
  category: ProductCategory;
  costPrice?: number;
  description?: string;
  name: string;
  price: number;
  sku: string;
  status: ProductStatus;
  stock: number;
}>;
