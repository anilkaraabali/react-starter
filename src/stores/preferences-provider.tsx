import { useOverlayState } from '@heroui/react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useLocalStorage } from 'usehooks-ts';
import {
  colorPaletteKeys,
  DEFAULT_COLOR_PALETTE,
} from '@/config/color-palette';
import { DEFAULT_SIDEBAR_VARIANT } from '@/config/layout-options';
import { LOCAL_STORAGE_KEYS } from '@/config/local-storage-keys';
import { DEFAULT_THEME, THEME_COLOR_SCHEME } from '@/config/theme';
import type { ColorPalette } from '@/types/color-palette.types';
import type { SidebarVariant } from '@/types/layout.types';
import type { Theme } from '@/types/theme.types';
import { isColorPalette } from '@/utils/color-palette.utils';
import { isSidebarVariant } from '@/utils/layout.utils';
import { applyDocumentTheme, isTheme } from '@/utils/theme.utils';

export type PreferencesContextValue = {
  close: () => void;
  isOpen: boolean;
  open: () => void;
  palette: ColorPalette;
  resetToDefaults: () => void;
  setPalette: (palette: ColorPalette) => void;
  setSidebarVariant: (variant: SidebarVariant) => void;
  setTheme: (theme: Theme) => void;
  sidebarVariant: SidebarVariant;
  theme: Theme;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

type PreferencesProviderProps = {
  children: React.ReactNode;
};

export function PreferencesProvider({ children }: PreferencesProviderProps) {
  const { close, isOpen, open } = useOverlayState();

  const [sidebarVariant, setSidebarVariant] = useLocalStorage<SidebarVariant>(
    LOCAL_STORAGE_KEYS.SIDEBAR_VARIANT,
    DEFAULT_SIDEBAR_VARIANT,
    {
      deserializer: (v) => (isSidebarVariant(v) ? v : DEFAULT_SIDEBAR_VARIANT),
      serializer: (v) => v,
    }
  );

  const [theme, setTheme] = useLocalStorage<Theme>(
    LOCAL_STORAGE_KEYS.THEME,
    DEFAULT_THEME,
    {
      deserializer: (v) => (isTheme(v) ? v : DEFAULT_THEME),
      serializer: (v) => v,
    }
  );

  const [palette, setPalette] = useLocalStorage<ColorPalette>(
    LOCAL_STORAGE_KEYS.PALETTE,
    DEFAULT_COLOR_PALETTE,
    {
      deserializer: (v) =>
        isColorPalette(v) ? (v as ColorPalette) : DEFAULT_COLOR_PALETTE,
      serializer: (v) => v,
    }
  );

  const resetToDefaults = useCallback(() => {
    setTheme(DEFAULT_THEME);
    setPalette(DEFAULT_COLOR_PALETTE);
    setSidebarVariant(DEFAULT_SIDEBAR_VARIANT);
  }, [setPalette, setSidebarVariant, setTheme]);

  useEffect(() => {
    applyDocumentTheme(theme);

    if (theme !== 'system') return;

    const media = window.matchMedia(THEME_COLOR_SCHEME);
    const handler = () => applyDocumentTheme('system');

    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.remove(...colorPaletteKeys);
    document.documentElement.classList.add(palette);
  }, [palette]);

  const value = useMemo(
    () => ({
      close,
      isOpen,
      open,
      palette,
      resetToDefaults,
      setPalette,
      setSidebarVariant,
      setTheme,
      sidebarVariant,
      theme,
    }),
    [
      close,
      isOpen,
      open,
      palette,
      resetToDefaults,
      setPalette,
      setSidebarVariant,
      setTheme,
      sidebarVariant,
      theme,
    ]
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences(): PreferencesContextValue {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }

  return context;
}
