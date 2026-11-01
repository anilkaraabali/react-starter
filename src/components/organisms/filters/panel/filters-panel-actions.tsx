import { Button } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { XIcon } from 'lucide-react';

type FiltersPanelActionsProps = {
  hasActiveFilters: boolean;
  onClear: () => void;
};

export function FiltersPanelActions({
  hasActiveFilters,
  onClear,
}: FiltersPanelActionsProps) {
  const { t } = useLingui();

  if (!hasActiveFilters) return null;

  return (
    <div className='flex flex-wrap items-center gap-2'>
      <Button onPress={onClear} variant='ghost'>
        <XIcon />
        {t`Clear filters`}
      </Button>
    </div>
  );
}
