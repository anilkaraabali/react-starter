import { cn } from '@heroui/styles';
import { useLingui } from '@lingui/react/macro';
import type { LayoutCardOption } from '@/config/layout-options';
import type { SidebarVariant } from '@/types/layout.types';
import { LayoutPreview } from './layout-preview';

type LayoutOptionCardProps = {
  isSelected: boolean;
  onSelect: (key: SidebarVariant) => void;
  option: LayoutCardOption;
};

export function LayoutOptionCard({
  isSelected,
  onSelect,
  option,
}: LayoutOptionCardProps) {
  const { t } = useLingui();

  return (
    <button
      className={cn(
        'hover:border-accent flex flex-col gap-2 rounded-xl border p-2.5 text-left transition-all',
        {
          'border-accent bg-accent-soft text-accent-soft-foreground ring-accent-soft ring-2':
            isSelected,
        }
      )}
      onClick={() => onSelect(option.key)}
      type='button'
    >
      <LayoutPreview variant={option.key} />
      <span className='text-center text-xs font-medium'>{t(option.label)}</span>
    </button>
  );
}
