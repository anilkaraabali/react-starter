import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { CreateProductView } from '@/features/products/components/forms/create-product-view';
import type { MetaFunction } from '@/types/meta.types';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Create Product`),
  },
];

export const Route = createFileRoute('/_admin/products/new')({
  component: CreateProductView,
  loader: () => ({ meta }),
});
