import type { Entity } from '@/api/models/common/entity';
import type { ProductCategoryDto } from '@/api/models/products/product-category-dto';
import type { ProductStatusDto } from '@/api/models/products/product-status-dto';

export type ProductDto = Entity<{
  barcode?: string;
  category: ProductCategoryDto;
  costPrice?: number;
  description?: string;
  name: string;
  price: number;
  sku: string;
  status: ProductStatusDto;
  stock: number;
}>;
