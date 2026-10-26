import { z } from 'zod';

import { PASSWORD_STRENGTH_REGEX } from './validation.constants';
import { ValidationMessages } from './validation-messages';

/**
 * Localizes Zod's default messages. Returning `undefined` keeps the default.
 */
export function setupZodErrorMap() {
  z.config({
    customError: (issue) => {
      switch (issue.code) {
        case 'invalid_type':
          if (
            issue.input === undefined ||
            issue.input === null ||
            (typeof issue.input === 'number' && Number.isNaN(issue.input))
          ) {
            return ValidationMessages.required();
          }
          return undefined;
        case 'too_small':
          if (issue.origin !== 'string') {
            return undefined;
          }
          return issue.minimum === 1
            ? ValidationMessages.required()
            : ValidationMessages.minLength(Number(issue.minimum));
        case 'too_big':
          return issue.origin === 'string'
            ? ValidationMessages.maxLength(Number(issue.maximum))
            : undefined;
        case 'invalid_value':
          if (
            issue.input === undefined ||
            issue.input === null ||
            issue.input === ''
          ) {
            return ValidationMessages.required();
          }
          return ValidationMessages.invalidFormat();
        case 'invalid_format':
          switch (issue.format) {
            case 'email':
              return ValidationMessages.email();
            case 'url':
              return ValidationMessages.urlInvalid();
            case 'uuid':
              return ValidationMessages.invalidUuid();
            case 'regex':
              if (issue.pattern?.includes(PASSWORD_STRENGTH_REGEX.source)) {
                return ValidationMessages.passwordStrength();
              }
              return ValidationMessages.invalidFormat();
            default:
              return undefined;
          }
        default:
          return undefined;
      }
    },
  });
}
