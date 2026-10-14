import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { LAYOUT_OPTIONS } from '@/config/layout-options.constants';
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
  const { _ } = useLingui();

  return (
    <div>
      <div className='mb-2 flex items-center justify-between'>
        <h4 className='font-semibold text-foreground text-xs'>
          {_(msg`Layout`)}
        </h4>
      </div>
      <div className='grid grid-cols-2 gap-2.5'>
        {LAYOUT_OPTIONS.map((opt) => (
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
