import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { EditProductView } from '@/features/products/components/forms/edit-product-view';
import type { MetaFunction } from '@/types/meta.types';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Edit Product`),
  },
];

export const Route = createFileRoute('/_admin/products/$productId/edit')({
  component: EditProductRouteComponent,
  loader: () => ({ meta }),
});

function EditProductRouteComponent() {
  const { productId } = Route.useParams();
  return <EditProductView productId={productId} />;
}
