import { env } from '@/config/env';

export const enableMocking = async () => {
  if (env.ENABLE_API_MOCKING) {
    const { worker } = await import('./browser');
    await worker.start({
      onUnhandledFrame: 'bypass',
    });
  }
};
