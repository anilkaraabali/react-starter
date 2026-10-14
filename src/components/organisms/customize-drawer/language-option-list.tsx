import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { GlobeIcon } from 'lucide-react';
import { LANGUAGES, type Language } from '@/config/language.constants';
import { PreferenceOptionCard } from './preference-option-card';

type LanguageOptionListProps = {
  onSelect: (language: Language) => void;
  selectedLanguage: Language;
};

export function LanguageOptionList({
  onSelect,
  selectedLanguage,
}: LanguageOptionListProps) {
  const { _ } = useLingui();

  return (
    <div>
      <h4 className='mb-2 font-semibold text-foreground text-xs'>
        {_(msg`Language`)}
      </h4>
      <div className='grid grid-cols-3 gap-2.5'>
        {LANGUAGES.map((lang) => {
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
