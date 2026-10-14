import { Button, Drawer, Typography } from '@heroui/react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { RotateCcwIcon } from 'lucide-react';
import type { Language } from '@/config/language.constants';
import type { ColorPalette } from '@/types/color-palette.types';
import type { SidebarVariant } from '@/types/layout.types';
import type { Theme } from '@/types/theme.types';
import { ColorPaletteOptionList } from './color-palette-option-list';
import { LanguageOptionList } from './language-option-list';
import { LayoutOptionList } from './layout-option-list';
import { ThemeOptionList } from './theme-option-list';

type CustomizeDrawerProps = {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  onResetToDefaults: () => void;
  onSelectLanguage: (language: Language) => void;
  onSelectPalette: (palette: ColorPalette) => void;
  onSelectSidebarVariant: (variant: SidebarVariant) => void;
  onSelectTheme: (theme: Theme) => void;
  palette: ColorPalette;
  sidebarVariant: SidebarVariant;
  theme: Theme;
};

export function CustomizeDrawer({
  isOpen,
  language,
  onClose,
  onResetToDefaults,
  onSelectLanguage,
  onSelectPalette,
  onSelectSidebarVariant,
  onSelectTheme,
  palette,
  sidebarVariant,
  theme,
}: CustomizeDrawerProps) {
  const { _ } = useLingui();

  return (
    <Drawer>
      <Drawer.Backdrop
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <Drawer.Content placement='right'>
          <Drawer.Dialog className='flex h-full flex-col p-0'>
            <Drawer.CloseTrigger />
            <Drawer.Header className='gap-1.5 p-4'>
              <Drawer.Heading>{_(msg`Customize`)}</Drawer.Heading>
              <Typography.Paragraph color='muted' size='xs'>
                {_(msg`Personalize your dashboard experience.`)}
              </Typography.Paragraph>
            </Drawer.Header>

            <Drawer.Body className='flex-1 space-y-6 overflow-y-auto px-4 py-2'>
              <ThemeOptionList onSelect={onSelectTheme} selectedTheme={theme} />
              <ColorPaletteOptionList
                onSelect={onSelectPalette}
                selectedPalette={palette}
              />
              <LayoutOptionList
                onSelect={onSelectSidebarVariant}
                selectedVariant={sidebarVariant}
              />
              <LanguageOptionList
                onSelect={onSelectLanguage}
                selectedLanguage={language}
              />
            </Drawer.Body>

            <Drawer.Footer className='border-t p-4'>
              <Button
                className='w-full'
                onPress={onResetToDefaults}
                size='sm'
                variant='outline'
              >
                <RotateCcwIcon />
                {_(msg`Reset to defaults`)}
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
