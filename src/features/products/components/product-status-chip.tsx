import { Chip, type ChipProps } from '@heroui/react';
import type { MessageDescriptor } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
import type { ProductStatusDto } from '@/api/models/products/product-status-dto';

const STATUS_CONFIG = {
  active: {
    color: 'success',
    label: msg`Active`,
  },
  archived: {
    color: 'warning',
    label: msg`Archived`,
  },
  draft: {
    color: 'default',
    label: msg`Draft`,
  },
} as const satisfies Record<
  ProductStatusDto,
  { color: NonNullable<ChipProps['color']>; label: MessageDescriptor }
>;

type ProductStatusChipProps = Omit<ChipProps, 'children'> & {
  status: ProductStatusDto;
};

export function ProductStatusChip({
  status,
  size = 'sm',
  ...rest
}: ProductStatusChipProps) {
  const { t } = useLingui();
  const config = STATUS_CONFIG[status];

  return (
    <Chip color={config.color} size={size} variant='soft' {...rest}>
      {t(config.label)}
    </Chip>
  );
}
