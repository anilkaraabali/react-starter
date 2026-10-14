import { Button, Kbd, Tooltip } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const isMac = /Mac|iPhone|iPad/i.test(navigator.userAgent);

type SidebarToggleButtonProps = {
  isExpanded: boolean;
  onToggle: () => void;
};

export function SidebarToggleButton({
  isExpanded,
  onToggle,
}: SidebarToggleButtonProps) {
  const { _ } = useLingui();
  const label = isExpanded ? _(msg`Collapse sidebar`) : _(msg`Expand sidebar`);

  return (
    <Tooltip delay={0}>
      <Button
        aria-label={label}
        className='absolute top-20 -right-3 z-10 size-6'
        isIconOnly
        onPress={onToggle}
        size='sm'
        variant='tertiary'
      >
        {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </Button>
      <Tooltip.Content showArrow>
        <Tooltip.Arrow />
        {label}{' '}
        <Kbd>
          <Kbd.Abbr keyValue={isMac ? 'command' : 'ctrl'} />
          <Kbd.Content>.</Kbd.Content>
        </Kbd>
      </Tooltip.Content>
    </Tooltip>
  );
}
