import { CustomizeDrawer } from '@/components/organisms/customize-drawer/customize-drawer';
import { useLanguage } from '@/hooks/use-language';
import { usePreferences } from '@/stores/preferences-provider';

export function AdminCustomizeDrawer() {
  const {
    close,
    isOpen,
    palette,
    resetToDefaults,
    setPalette,
    setSidebarVariant,
    setTheme,
    sidebarVariant,
    theme,
  } = usePreferences();
  const { language, setLanguage } = useLanguage();

  return (
    <CustomizeDrawer
      isOpen={isOpen}
      language={language}
      onClose={close}
      onResetToDefaults={resetToDefaults}
      onSelectLanguage={setLanguage}
      onSelectPalette={setPalette}
      onSelectSidebarVariant={setSidebarVariant}
      onSelectTheme={setTheme}
      palette={palette}
      sidebarVariant={sidebarVariant}
      theme={theme}
    />
  );
}
