import { Card } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { SimpleDetailField } from '@/components/molecules/simple-detail-field';
import type { Product } from '@/features/products/types/product.types';
import { calculateProfitMargin } from '@/features/products/utils/product.utils';
import {
  formatCurrency,
  formatDateTime,
  formatPercent,
} from '@/utils/format.utils';

type ProductDetailContentProps = {
  product: Product;
};

export function ProductDetailContent({ product }: ProductDetailContentProps) {
  const { t } = useLingui();
  const marginRatio = calculateProfitMargin(product.price, product.costPrice);

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <Card>
          <Card.Header>
            <Card.Title>{t`Pricing & Inventory`}</Card.Title>
          </Card.Header>
          <Card.Content className='grid grid-cols-1 content-start gap-4 sm:grid-cols-2'>
            <SimpleDetailField.Column
              label={t`Price`}
              value={formatCurrency(product.price)}
            />
            {product.costPrice ? (
              <SimpleDetailField.Column
                label={t`Cost price`}
                value={
                  <span>
                    {formatCurrency(product.costPrice)}{' '}
                    {marginRatio != null ? (
                      <span className='text-muted text-xs'>
                        ({formatPercent(marginRatio)} {t`margin`})
                      </span>
                    ) : null}
                  </span>
                }
              />
            ) : null}
            <SimpleDetailField.Column
              label={t`Available stock`}
              value={
                <span
                  className={
                    product.stock === 0 ? 'font-medium text-danger' : undefined
                  }
                >
                  {product.stock}{' '}
                  <span className='text-muted text-xs'>
                    ({product.stock > 0 ? t`In stock` : t`Out of stock`})
                  </span>
                </span>
              }
            />
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>{t`Product Information`}</Card.Title>
          </Card.Header>
          <Card.Content className='grid grid-cols-1 content-start gap-4 sm:grid-cols-2'>
            <SimpleDetailField.Column
              label={t`Category`}
              value={<span className='capitalize'>{product.category}</span>}
            />
            <SimpleDetailField.Column label={t`SKU`} value={product.sku} />
            <SimpleDetailField.Column
              label={t`Barcode`}
              value={product.barcode}
            />
            <SimpleDetailField.Column
              label={t`Date created`}
              value={formatDateTime(product.createdAt)}
            />
            <SimpleDetailField.Column
              label={t`Last updated`}
              value={formatDateTime(product.updatedAt)}
            />
          </Card.Content>
        </Card>
      </div>

      <Card>
        <Card.Header>
          <Card.Title>{t`Description`}</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className='prose prose-sm dark:prose-invert text-foreground/80'>
            {product.description || (
              <span className='text-muted italic'>
                {t`No description provided.`}
              </span>
            )}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
