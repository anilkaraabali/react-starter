import { i18n } from '@lingui/core';
import { msg } from '@lingui/core/macro';

export const ValidationMessages = {
  email: () => i18n._(msg`Please enter a valid email address`),
  invalidDate: () => i18n._(msg`Enter a valid date (YYYY-MM-DD)`),
  invalidFormat: () => i18n._(msg`Invalid format`),
  invalidUuid: () => i18n._(msg`Please enter a valid UUID`),
  maxLength: (max: number) => i18n._(msg`Maximum ${max} characters allowed`),
  minLength: (min: number) => i18n._(msg`Minimum ${min} characters required`),
  passwordMatch: () => i18n._(msg`Passwords do not match`),
  passwordSameAsCurrent: () =>
    i18n._(msg`New password cannot be the same as the current password`),
  passwordStrength: () =>
    i18n._(
      msg`Password must contain uppercase and lowercase letters, numbers, and special characters`
    ),
  required: () => i18n._(msg`This field is required`),
  urlInvalid: () => i18n._(msg`The URL is badly formatted`),
} as const;
