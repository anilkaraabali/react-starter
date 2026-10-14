import type { AxiosError } from 'axios';
import { describe, expect, it } from 'vitest';

const {
  ApiErrorCode,
  getDefaultErrorMessage,
  getErrorMessage,
  isApiErrorCode,
} = await import('@/utils/error.utils');

function axiosError(error: Partial<AxiosError>): AxiosError {
  return error as AxiosError;
}

describe('error.utils', () => {
  describe('isApiErrorCode', () => {
    it('accepts every declared transport code', () => {
      for (const code of Object.values(ApiErrorCode)) {
        expect(isApiErrorCode(code)).toBe(true);
      }
    });

    it('rejects an unknown or missing code', () => {
      expect(isApiErrorCode('ERR_SOMETHING_ELSE')).toBe(false);
      expect(isApiErrorCode('')).toBe(false);
      expect(isApiErrorCode(undefined)).toBe(false);
    });
  });

  describe('getDefaultErrorMessage', () => {
    it('returns the translated fallback text', () => {
      expect(getDefaultErrorMessage()).toBe(
        'Please try again or check back later.'
      );
    });
  });

  describe('getErrorMessage', () => {
    it('maps a response status to its own wording', () => {
      expect(
        getErrorMessage(axiosError({ response: { status: 400 } as never }))
      ).toBe('Bad request. Please check your input.');
      expect(
        getErrorMessage(axiosError({ response: { status: 401 } as never }))
      ).toBe('Unauthorized. Please login again.');
      expect(
        getErrorMessage(axiosError({ response: { status: 403 } as never }))
      ).toBe('You do not have permission to perform this action.');
      expect(
        getErrorMessage(axiosError({ response: { status: 404 } as never }))
      ).toBe('The requested resource was not found.');
      expect(
        getErrorMessage(axiosError({ response: { status: 409 } as never }))
      ).toBe('A conflict occurred. The resource may already exist.');
      expect(
        getErrorMessage(axiosError({ response: { status: 422 } as never }))
      ).toBe('Validation failed. Please check your input.');
      expect(
        getErrorMessage(axiosError({ response: { status: 429 } as never }))
      ).toBe('Too many requests. Please try again later.');
      expect(
        getErrorMessage(axiosError({ response: { status: 500 } as never }))
      ).toBe('Internal server error. Please try again later.');
      expect(
        getErrorMessage(axiosError({ response: { status: 502 } as never }))
      ).toBe('Bad gateway. The server is temporarily unavailable.');
      expect(
        getErrorMessage(axiosError({ response: { status: 503 } as never }))
      ).toBe('Service unavailable. Please try again later.');
    });

    it('never leaks the API error body, only the mapped wording', () => {
      const error = axiosError({
        message: 'Request failed with status code 400',
        response: {
          data: { message: 'email must be unique' },
          status: 400,
        } as never,
      });

      expect(getErrorMessage(error)).toBe(
        'Bad request. Please check your input.'
      );
      expect(getErrorMessage(error)).not.toContain('email must be unique');
    });

    it('maps a transport code when there is no response', () => {
      expect(getErrorMessage(axiosError({ code: 'ERR_NETWORK' }))).toBe(
        'Network error. Please check your connection.'
      );
      expect(getErrorMessage(axiosError({ code: 'ECONNABORTED' }))).toBe(
        'Request timeout. Please try again.'
      );
      expect(getErrorMessage(axiosError({ code: 'ERR_CANCELED' }))).toBe(
        'Request was canceled.'
      );
    });

    it('prefers the status wording over the transport code', () => {
      const error = axiosError({
        code: 'ERR_NETWORK',
        response: { status: 500 } as never,
      });

      expect(getErrorMessage(error)).toBe(
        'Internal server error. Please try again later.'
      );
    });

    it('falls back to the error message for an unmapped status', () => {
      expect(
        getErrorMessage(
          axiosError({
            message: 'Request failed with status code 418',
            response: { status: 418 } as never,
          })
        )
      ).toBe('Request failed with status code 418');
    });

    it('falls back to the default text when there is no message to show', () => {
      expect(getErrorMessage(axiosError({ message: '' }))).toBe(
        'Please try again or check back later.'
      );
      expect(getErrorMessage(axiosError({}))).toBe(
        'Please try again or check back later.'
      );
    });

    it('falls back to the default text for an unknown transport code', () => {
      expect(
        getErrorMessage(axiosError({ code: 'ERR_UNKNOWN', message: '' }))
      ).toBe('Please try again or check back later.');
    });
  });
});
