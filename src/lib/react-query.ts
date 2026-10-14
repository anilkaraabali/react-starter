import { toast } from '@heroui/react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getErrorMessage } from '@/utils/error.utils';

// biome-ignore lint/suspicious/noExplicitAny: Required for universal API function type inference
export type ApiFnReturnType<FnType extends (...args: any[]) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: unknown[]) => unknown> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<
  // biome-ignore lint/suspicious/noExplicitAny: Required for universal API function type inference
  MutationFnType extends (...args: any[]) => Promise<any>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;

function handleApiError(error: AxiosError): void {
  const message = getErrorMessage(error);

  toast.danger(message);

  if (import.meta.env.DEV) {
    console.error('API Error:', {
      message: error.message,
      method: error.config?.method?.toUpperCase(),
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
    });
  }
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError;
    mutationMeta: {
      handleGlobalError?: boolean;
    };
    queryMeta: {
      handleGlobalError?: boolean;
    };
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 60 * 1000,
    },
  },
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      const handleGlobalError = mutation.meta?.handleGlobalError ?? true;
      if (!handleGlobalError) return;

      if (error instanceof AxiosError) {
        handleApiError(error);
      }
    },
  }),
  queryCache: new QueryCache({
    onError: (error, query) => {
      const handleGlobalError = query.meta?.handleGlobalError ?? true;
      if (!handleGlobalError) return;

      if (error instanceof AxiosError) {
        handleApiError(error);
      }
    },
  }),
});
