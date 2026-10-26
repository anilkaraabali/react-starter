import { Badge, Button, Disclosure } from '@heroui/react';
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
    <Badge.Anchor>
      <Button
        aria-label={_(msg`Filters`)}
        isIconOnly={isMobile}
        slot='trigger'
        variant='tertiary'
      >
        <ListFilterIcon />
        {isMobile ? null : _(msg`Filters`)}
        {isMobile ? null : <Disclosure.Indicator />}
      </Button>
      {hasActiveFilters ? (
        <Badge.Root
          color='accent'
          placement='top-right'
          size='sm'
          variant='soft'
        >
          <Badge.Label>{activeCount}</Badge.Label>
        </Badge.Root>
      ) : null}
    </Badge.Anchor>
  );
}
