import { Button } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { XIcon } from 'lucide-react';

type FiltersPanelActionsProps = {
  hasActiveFilters: boolean;
  onApply: () => void;
  onCancel: () => void;
  onClear: () => void;
};

export function FiltersPanelActions({
  hasActiveFilters,
  onApply,
  onCancel,
  onClear,
}: FiltersPanelActionsProps) {
  const { t } = useLingui();

  return (
    <div className='flex flex-wrap items-center gap-2'>
      <Button onPress={onApply} variant='primary'>
        {t`Apply`}
      </Button>
      <Button onPress={onCancel} variant='secondary'>
        {t`Cancel`}
      </Button>
      {hasActiveFilters ? (
        <Button onPress={onClear} variant='ghost'>
          <XIcon />
          {t`Clear filters`}
        </Button>
      ) : null}
    </div>
  );
}
