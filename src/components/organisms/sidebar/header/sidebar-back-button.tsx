import { Button, Tooltip } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { ArrowLeftIcon } from 'lucide-react';

type SidebarBackButtonProps = {
  isExpanded: boolean;
  onPress: () => void;
};

export function SidebarBackButton({
  isExpanded,
  onPress,
}: SidebarBackButtonProps) {
  const { _ } = useLingui();

  if (isExpanded) {
    return (
      <Button
        className='justify-start'
        fullWidth
        onPress={onPress}
        size='sm'
        variant='ghost'
      >
        <ArrowLeftIcon />
        {_(msg`Back`)}
      </Button>
    );
  }

  return (
    <Tooltip delay={0}>
      <Button
        aria-label={_(msg`Back`)}
        isIconOnly
        onPress={onPress}
        size='sm'
        variant='ghost'
      >
        <ArrowLeftIcon />
      </Button>
      <Tooltip.Content showArrow>
        <Tooltip.Arrow />
        {_(msg`Back`)}
      </Tooltip.Content>
    </Tooltip>
  );
}
