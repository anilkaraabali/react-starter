import type { ProductDto } from '@/api/models/products/product-dto';
import type { ProductFormValues } from '@/features/products/components/forms/product-form-schema';

export function productToFormValues(product: ProductDto): ProductFormValues {
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
