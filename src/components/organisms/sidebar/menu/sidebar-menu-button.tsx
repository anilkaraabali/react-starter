import { Button, cn } from '@heroui/react';
import { useLingui } from '@lingui/react/macro';
import type { SidebarLeafItem } from '../sidebar.types';

type SidebarMenuButtonProps = {
  isActive?: boolean;
  isCompact?: boolean;
  isExpanded: boolean;
  item: SidebarLeafItem;
  onPress: () => void;
};

export function SidebarMenuButton({
  isActive = false,
  isCompact = false,
  isExpanded,
  item,
  onPress,
}: SidebarMenuButtonProps) {
  const { t } = useLingui();
  const Icon = item.icon;
  const label = t(item.label);

  if (isCompact) {
    return (
      <Button
        className={cn(
          'group flex h-auto w-full flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-2'
        )}
        onPress={onPress}
        variant={isActive ? 'secondary' : 'ghost'}
      >
        {Icon && <Icon className='shrink-0' />}
        <span className='max-w-full truncate text-[10px]'>{label}</span>
      </Button>
    );
  }

  return (
    <Button
      aria-label={label}
      fullWidth={isExpanded}
      isIconOnly={!isExpanded}
      onPress={onPress}
      variant={isActive ? 'secondary' : 'ghost'}
    >
      {Icon && <Icon className='shrink-0' />}
      {isExpanded && (
        <span className='flex-1 truncate text-start'>{label}</span>
      )}
      {isExpanded && item.badge != null && (
        <span className='ms-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-soft px-1.5 font-semibold text-[10px] text-accent-soft-foreground'>
          {item.badge}
        </span>
      )}
    </Button>
  );
}
