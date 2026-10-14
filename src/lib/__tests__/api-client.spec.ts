import { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const cookies = vi.hoisted(() => ({ remove: vi.fn() }));

vi.mock('js-cookie', () => ({ default: cookies }));

import { api } from '@/lib/api-client';
import { eventBus } from '@/utils/event-bus.utils';

type FormSerializer = {
  visitor: (
    value: unknown,
    key: string,
    path: unknown,
    helpers: { defaultVisitor: (...args: unknown[]) => unknown }
  ) => unknown;
};

/** The real visitor delegates to this; only the return value matters here. */
const helpers = {
  defaultVisitor: (value: unknown) => `formatted:${String(value)}`,
};

function visitor(value: unknown) {
  const serializer = api.defaults.formSerializer as FormSerializer;

  return serializer.visitor(value, 'name', [], helpers);
}

/** The last rejected handler is the 401 branch. */
function onRejected() {
  const handler = api.interceptors.response.handlers?.at(-1);

  return handler?.rejected;
}

const config = {} as InternalAxiosRequestConfig;

describe('api client', () => {
  let unauthorizedCalls = 0;
  let stopListening: (() => void) | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
    unauthorizedCalls = 0;
    stopListening = eventBus.on('auth:unauthorized', () => {
      unauthorizedCalls += 1;
    });
  });

  afterEach(() => {
    stopListening?.();
  });

  describe('request interceptor', () => {
    it('sets Accept header and withCredentials', async () => {
      const handler = api.interceptors.request.handlers?.at(-1);
      const reqConfig = { headers: {} } as InternalAxiosRequestConfig;
      const result = await handler?.fulfilled?.(reqConfig);

      expect(result?.headers.Accept).toBe('application/json');
      expect(result?.withCredentials).toBe(true);
    });
  });

  describe('response interceptor', () => {
    it('unwraps response data', async () => {
      const handler = api.interceptors.response.handlers?.at(-1);
      const response = { data: { id: 123 } } as unknown;
      const result = await handler?.fulfilled?.(response as never);

      expect(result).toEqual({ id: 123 });
    });
  });

  describe('form serializer', () => {
    it('skips null and undefined so they do not reach the API', () => {
      expect(visitor(null)).toBe(true);
      expect(visitor(undefined)).toBe(true);
    });

    it('keeps every other value through the default visitor', () => {
      expect(visitor('Ada')).toBe('formatted:Ada');
      expect(visitor(0)).toBe('formatted:0');
      expect(visitor(false)).toBe('formatted:false');
    });
  });

  describe('401 response interceptor', () => {
    it('clears the session cookie and announces the logout on a 401', async () => {
      const error = new AxiosError('unauthorized');
      error.response = { config, status: 401 } as AxiosError['response'];

      await expect(onRejected()?.(error)).rejects.toBe(error);

      expect(cookies.remove).toHaveBeenCalledWith('better-auth.session_token');
      expect(unauthorizedCalls).toBe(1);
    });

    it('leaves the cookie and the bus alone for any other status', async () => {
      const error = new AxiosError('server error');
      error.response = { config, status: 500 } as AxiosError['response'];

      await expect(onRejected()?.(error)).rejects.toBe(error);

      expect(cookies.remove).not.toHaveBeenCalled();
      expect(unauthorizedCalls).toBe(0);
    });

    it('rejects with the original error even without a response', async () => {
      const error = new AxiosError('network down');

      await expect(onRejected()?.(error)).rejects.toBe(error);
      expect(cookies.remove).not.toHaveBeenCalled();
    });
  });
});
