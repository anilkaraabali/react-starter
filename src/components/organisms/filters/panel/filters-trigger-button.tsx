import { Button, Disclosure } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { ListFilterIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-is-mobile';

type FiltersTriggerButtonProps = {
  activeCount: number;
  hasActiveFilters: boolean;
};

export function FiltersTriggerButton({
  activeCount,
  hasActiveFilters,
}: FiltersTriggerButtonProps) {
  const { _ } = useLingui();
  const isMobile = useIsMobile();

  return (
    <Button
      isIconOnly={isMobile}
      slot='trigger'
      variant={hasActiveFilters ? 'secondary' : 'tertiary'}
    >
      <ListFilterIcon />
      {isMobile
        ? null
        : hasActiveFilters
          ? _(msg`Filters (${activeCount})`)
          : _(msg`Filters`)}
      {isMobile ? null : <Disclosure.Indicator />}
    </Button>
  );
}
