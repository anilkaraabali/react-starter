import { Button } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { XIcon } from 'lucide-react';

type FiltersPanelActionsProps = {
  hasActiveFilters: boolean;
  onCancel: () => void;
  onClear: () => void;
};

export function FiltersPanelActions({
  hasActiveFilters,
  onCancel,
  onClear,
}: FiltersPanelActionsProps) {
  const { _ } = useLingui();

  return (
    <div className='flex flex-wrap items-center gap-2'>
      <Button onPress={onCancel} variant='tertiary'>
        {_(msg`Cancel`)}
      </Button>
      {hasActiveFilters ? (
        <Button onPress={onClear} variant='ghost'>
          <XIcon />
          {_(msg`Clear filters`)}
        </Button>
      ) : null}
    </div>
  );
}
