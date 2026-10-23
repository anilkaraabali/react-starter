import { Button } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useNavigate } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-is-mobile';

export function CreateProductButton() {
  const { _ } = useLingui();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <Button
      isIconOnly={isMobile}
      onPress={() => navigate({ to: '/products/new' })}
      variant='primary'
    >
      <PlusIcon />
      {isMobile ? null : _(msg`Add product`)}
    </Button>
  );
}
