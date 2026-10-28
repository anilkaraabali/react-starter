import { useLingui } from '@lingui/react/macro';
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
  const { t } = useLingui();

  return (
    <div>
      <h4 className='mb-2 font-semibold text-foreground text-xs'>{t`Theme`}</h4>
      <div className='grid grid-cols-3 gap-2.5'>
        {themeOptions.map((opt) => {
          const isSelected = selectedTheme === opt.key;
          const Icon = opt.icon;

          return (
            <PreferenceOptionCard
              isSelected={isSelected}
              key={opt.key}
              label={t(opt.label)}
              onSelect={() => onSelect(opt.key as Theme)}
              preview={<Icon />}
            />
          );
        })}
      </div>
    </div>
  );
}
