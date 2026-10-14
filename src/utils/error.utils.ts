import { i18n } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import type { AxiosError } from 'axios';

/** Axios / transport-level error codes surfaced on `AxiosError.code`. */
export const ApiErrorCode = {
  ECONNABORTED: 'ECONNABORTED',
  ERR_BAD_REQUEST: 'ERR_BAD_REQUEST',
  ERR_BAD_RESPONSE: 'ERR_BAD_RESPONSE',
  ERR_CANCELED: 'ERR_CANCELED',
  ERR_NETWORK: 'ERR_NETWORK',
} as const;

export type ApiErrorCode = (typeof ApiErrorCode)[keyof typeof ApiErrorCode];

const apiErrorCodeSet = new Set<string>(Object.values(ApiErrorCode));

export function isApiErrorCode(code: string | undefined): code is ApiErrorCode {
  return !!code && apiErrorCodeSet.has(code);
}

export function getDefaultErrorMessage(): string {
  return i18n._(msg`Please try again or check back later.`);
}

export function getErrorMessage(error: AxiosError): string {
  // The API sends the HTTP status and nothing else worth showing; the wording
  // comes from the map below so it stays translated.
  const statusMessages: Record<number, string> = {
    400: i18n._(msg`Bad request. Please check your input.`),
    401: i18n._(msg`Unauthorized. Please login again.`),
    403: i18n._(msg`You do not have permission to perform this action.`),
    404: i18n._(msg`The requested resource was not found.`),
    409: i18n._(msg`A conflict occurred. The resource may already exist.`),
    422: i18n._(msg`Validation failed. Please check your input.`),
    429: i18n._(msg`Too many requests. Please try again later.`),
    500: i18n._(msg`Internal server error. Please try again later.`),
    502: i18n._(msg`Bad gateway. The server is temporarily unavailable.`),
    503: i18n._(msg`Service unavailable. Please try again later.`),
  };

  const status = error.response?.status;
  if (status && statusMessages[status]) {
    return statusMessages[status];
  }

  const transportErrorMessages: Partial<Record<ApiErrorCode, string>> = {
    [ApiErrorCode.ERR_NETWORK]: i18n._(
      msg`Network error. Please check your connection.`
    ),
    [ApiErrorCode.ECONNABORTED]: i18n._(
      msg`Request timeout. Please try again.`
    ),
    [ApiErrorCode.ERR_CANCELED]: i18n._(msg`Request was canceled.`),
  };

  if (isApiErrorCode(error.code) && transportErrorMessages[error.code]) {
    return transportErrorMessages[error.code]!;
  }

  // Default fallback
  return error.message || getDefaultErrorMessage();
}
