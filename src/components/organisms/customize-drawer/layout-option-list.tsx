import { useLingui } from '@lingui/react/macro';
import { layoutOptions } from '@/config/layout-options';
import type { SidebarVariant } from '@/types/layout.types';
import { LayoutOptionCard } from './layout-option-card';

type LayoutOptionListProps = {
  onSelect: (variant: SidebarVariant) => void;
  selectedVariant: SidebarVariant;
};

export function LayoutOptionList({
  onSelect,
  selectedVariant,
}: LayoutOptionListProps) {
  const { t } = useLingui();

  return (
    <div>
      <div className='mb-2 flex items-center justify-between'>
        <h4 className='font-semibold text-foreground text-xs'>{t`Layout`}</h4>
      </div>
      <div className='grid grid-cols-2 gap-2.5'>
        {layoutOptions.map((opt) => (
          <LayoutOptionCard
            isSelected={selectedVariant === opt.key}
            key={opt.key}
            onSelect={onSelect}
            option={opt}
          />
        ))}
      </div>
    </div>
  );
}
