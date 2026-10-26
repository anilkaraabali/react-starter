import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { themeOptions } from '@/config/theme';
import type { Theme } from '@/types/theme.types';
import { PreferenceOptionCard } from './preference-option-card';

type ThemeOptionListProps = {
  onSelect: (theme: Theme) => void;
  selectedTheme: Theme;
};

export function ThemeOptionList({
  onSelect,
  selectedTheme,
}: ThemeOptionListProps) {
  const { _ } = useLingui();

  return (
    <div>
      <h4 className='mb-2 font-semibold text-foreground text-xs'>
        {_(msg`Theme`)}
      </h4>
      <div className='grid grid-cols-3 gap-2.5'>
        {themeOptions.map((opt) => {
          const isSelected = selectedTheme === opt.key;
          const Icon = opt.icon;

          return (
            <PreferenceOptionCard
              isSelected={isSelected}
              key={opt.key}
              label={_(opt.label)}
              onSelect={() => onSelect(opt.key as Theme)}
              preview={<Icon />}
            />
          );
        })}
      </div>
    </div>
  );
}
