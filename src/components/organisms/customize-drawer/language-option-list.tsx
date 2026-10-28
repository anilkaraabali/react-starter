import { useLingui } from '@lingui/react/macro';
import { GlobeIcon } from 'lucide-react';
import { type Language, languageOptions } from '@/config/language';
import { PreferenceOptionCard } from './preference-option-card';

type LanguageOptionListProps = {
  onSelect: (language: Language) => void;
  selectedLanguage: Language;
};

export function LanguageOptionList({
  onSelect,
  selectedLanguage,
}: LanguageOptionListProps) {
  const { t } = useLingui();

  return (
    <div>
      <h4 className='text-foreground mb-2 text-xs font-semibold'>
        {t`Language`}
      </h4>
      <div className='grid grid-cols-3 gap-2.5'>
        {languageOptions.map((lang) => {
          const isSelected = selectedLanguage === lang.key;

          return (
            <PreferenceOptionCard
              isSelected={isSelected}
              key={lang.key}
              label={lang.label}
              onSelect={() => onSelect(lang.key)}
              preview={<GlobeIcon />}
            />
          );
        })}
      </div>
    </div>
  );
}
