import { Button, Disclosure } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { ListFilterIcon } from 'lucide-react';

type FiltersTriggerButtonProps = {
  activeCount: number;
  hasActiveFilters: boolean;
};

export function FiltersTriggerButton({
  activeCount,
  hasActiveFilters,
}: FiltersTriggerButtonProps) {
  const { _ } = useLingui();

  return (
    <Button
      slot='trigger'
      variant={hasActiveFilters ? 'secondary' : 'tertiary'}
    >
      <ListFilterIcon />
      {hasActiveFilters ? _(msg`Filters (${activeCount})`) : _(msg`Filters`)}
      <Disclosure.Indicator />
    </Button>
  );
}
