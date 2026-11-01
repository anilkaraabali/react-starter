import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import { createFileRoute } from '@tanstack/react-router';
import { BackButton } from '@/components/atoms/back-button';
import { ContentLayout } from '@/components/templates/content-layout';
import { CreateProduct } from '@/features/products/components/forms/create-product';
import type { MetaFunction } from '@/types/meta.types';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Create Product`),
  },
];

function ProductCreatePage() {
  const { t } = useLingui();

  return (
    <ContentLayout
      actions={<BackButton to='/products'>{t`Back to products`}</BackButton>}
      description={t`Add a new product to your inventory catalog.`}
    >
      <CreateProduct />
    </ContentLayout>
  );
}

export const Route = createFileRoute('/_admin/products/new')({
  component: ProductCreatePage,
  loader: () => ({ meta }),
});
