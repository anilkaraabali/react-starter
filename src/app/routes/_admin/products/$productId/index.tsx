import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { ProductDetailView } from '@/features/products/components/product-details/product-detail-view';
import type { MetaFunction } from '@/types/meta.types';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Product Details`),
  },
];

export const Route = createFileRoute('/_admin/products/$productId/')({
  component: ProductDetailRouteComponent,
  loader: () => ({ meta }),
});

function ProductDetailRouteComponent() {
  const { productId } = Route.useParams();
  return <ProductDetailView productId={productId} />;
}
