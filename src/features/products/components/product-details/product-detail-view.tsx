import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { QueryState } from '@/components/molecules/query-state';
import { FormActions } from '@/components/organisms/form/actions/form-actions';
import { ContentLayout } from '@/components/templates/content-layout';
import { useProduct } from '@/features/products/api/get-product';
import { DeleteProductModal } from '@/features/products/components/modals/delete-product-modal';
import { ProductStatusChip } from '@/features/products/components/product-status-chip';
import type { Product } from '@/features/products/types/product.types';
import { ProductDetailContent } from './product-detail-content';

type ProductDetailViewProps = {
  productId: string;
};

export function ProductDetailView({ productId }: ProductDetailViewProps) {
  const navigate = useNavigate();
  const productQuery = useProduct({ id: productId });

  return (
    <QueryState
      data={productQuery.data}
      isError={productQuery.isError}
      isPending={productQuery.isLoading}
      onBack={() => {
        void navigate({ to: '/products' });
      }}
      onRetry={() => {
        void productQuery.refetch();
      }}
    >
      {(product) => <ProductDetailLayout product={product} />}
    </QueryState>
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
