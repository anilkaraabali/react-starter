import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { FormActions } from '@/components/organisms/form/actions/form-actions';
import { ContentLayout } from '@/components/templates/content-layout';
import { DeleteProductModal } from '@/features/products/components/modals/delete-product-modal';
import { ProductQueryBoundary } from '@/features/products/components/product-query-boundary';
import { ProductStatusChip } from '@/features/products/components/product-status-chip';
import type { Product } from '@/features/products/types/product.types';
import { ProductDetailContent } from './product-detail-content';

type ProductDetailViewProps = {
  productId: string;
};

export function ProductDetailView({ productId }: ProductDetailViewProps) {
  return (
    <ProductQueryBoundary productId={productId}>
      {(product) => <ProductDetailLayout product={product} />}
    </ProductQueryBoundary>
  );
}

function ProductDetailLayout({ product }: { product: Product }) {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <ContentLayout
      actions={
        <FormActions
          onDelete={() => setIsDeleteModalOpen(true)}
          onEdit={() => {
            void navigate({
              params: { productId: product.id },
              to: '/products/$productId/edit',
            });
          }}
        />
      }
      title={
        <div className='flex items-center gap-3'>
          <span>{product.name}</span>
          <ProductStatusChip status={product.status} />
        </div>
      }
    >
      <ProductDetailContent product={product} />

      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccess={() => {
          void navigate({ to: '/products' });
        }}
        product={product}
      />
    </ContentLayout>
  );
}
