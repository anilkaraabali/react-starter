import { Toast } from '@heroui/react';
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
  );
}
