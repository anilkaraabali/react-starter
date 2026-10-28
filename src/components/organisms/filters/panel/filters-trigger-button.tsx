import { Badge, Button, Disclosure } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
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
  const { t } = useLingui();
  const isMobile = useIsMobile();

  return (
    <Badge.Anchor>
      <Button
        aria-label={t`Filters`}
        isIconOnly={isMobile}
        slot='trigger'
        variant='tertiary'
      >
        <ListFilterIcon />
        {isMobile ? null : t`Filters`}
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
