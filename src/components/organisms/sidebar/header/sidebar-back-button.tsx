import { Button, Tooltip } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import { ArrowLeftIcon } from 'lucide-react';

type SidebarBackButtonProps = {
  isExpanded: boolean;
  onPress: () => void;
};

export function SidebarBackButton({
  isExpanded,
  onPress,
}: SidebarBackButtonProps) {
  const { t } = useLingui();

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
        {t`Back`}
      </Button>
    );
  }

  return (
    <Tooltip delay={0}>
      <Button
        aria-label={t`Back`}
        isIconOnly
        onPress={onPress}
        size='sm'
        variant='ghost'
      >
        <ArrowLeftIcon />
      </Button>
      <Tooltip.Content showArrow>
        <Tooltip.Arrow />
        {t`Back`}
      </Tooltip.Content>
    </Tooltip>
  );
}
