import { Button } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { useNavigate } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';

export function ProductListActions() {
  const { t } = useLingui();
  const navigate = useNavigate();

  return (
    <Button onPress={() => navigate({ to: '/products/new' })}>
      <PlusIcon />
      {t`Add product`}
    </Button>
  );
}
