import { Button } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { useNavigate } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-is-mobile';

export function CreateProductButton() {
  const { t } = useLingui();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <Button
      isIconOnly={isMobile}
      onPress={() => navigate({ to: '/products/new' })}
      variant='primary'
    >
      <PlusIcon />
      {isMobile ? null : t`Add product`}
    </Button>
  );
}
