import type { CreateProductInput } from '@/features/products/api/create-product';
import type { Product } from '@/features/products/types/product.types';

export function productToFormValues(product: Product): CreateProductInput {
  return {
    barcode: product.barcode ?? '',
    category: product.category,
    costPrice: product.costPrice ?? 0,
    description: product.description ?? '',
    name: product.name,
    price: product.price,
    sku: product.sku,
    status: product.status,
    stock: product.stock,
  };
}
