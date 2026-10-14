import { Toast } from '@heroui/react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { MotionConfig } from 'framer-motion';
import { LucideProvider } from 'lucide-react';
import { queryClient } from '@/lib/react-query';
import { PreferencesProvider } from '@/stores/preferences-provider';

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <I18nProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <PreferencesProvider>
          <MotionConfig reducedMotion='user'>
            <LucideProvider size={16}>
              <Toast.Provider />
              {children}
            </LucideProvider>
          </MotionConfig>
        </PreferencesProvider>
      </QueryClientProvider>
    </I18nProvider>
  );
}
