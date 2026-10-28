import { Button, Kbd, Tooltip } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
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
  const { t } = useLingui();
  const label = isExpanded ? t`Collapse sidebar` : t`Expand sidebar`;

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
