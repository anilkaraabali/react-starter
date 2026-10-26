import { z } from 'zod';
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_STRENGTH_REGEX,
} from '../validation.constants';
import { ValidationMessages } from '../validation-messages';

export const emailFieldSchema = z.email().trim().max(EMAIL_MAX_LENGTH);

/** @public */
export const isoDateFieldSchema = z.iso.date({
  error: () => ValidationMessages.invalidDate(),
});

export const stringFieldSchema = z.string().trim().min(1);

/** @public */
export function arrayFieldSchema<const T extends z.ZodType>(itemSchema: T) {
  return z.array(itemSchema);
}

/** @public */
export function enumFieldSchema<const T extends Record<string, string>>(
  values: T
) {
  return z.enum(Object.values(values) as [T[keyof T], ...T[keyof T][]]);
}

function normalizeNumericFieldInput(input: unknown): unknown {
  if (input === undefined || input === null || input === '') {
    return undefined;
  }

  if (typeof input === 'number') {
    return Number.isNaN(input) ? undefined : input;
  }

  if (typeof input === 'string') {
    const trimmed = input.trim();

    if (trimmed === '') {
      return undefined;
    }

    const parsed = Number(trimmed);

    return Number.isNaN(parsed) ? undefined : parsed;
  }

  return input;
}

/** Required positive number from form inputs (empty / NaN → missing). */
/** @public */
export const positiveNumberFieldSchema = z.preprocess(
  normalizeNumericFieldInput,
  z.number().positive()
);

/** Required non-negative number from form inputs (empty / NaN → missing). */
export const nonNegativeNumberFieldSchema = z.preprocess(
  normalizeNumericFieldInput,
  z.number().min(0)
);

/** Required whole non-negative number from form inputs. */
export const nonNegativeIntegerFieldSchema = z.preprocess(
  normalizeNumericFieldInput,
  z.number().int().min(0)
);

/** For existing passwords (sign-in, confirmation): strength rules may postdate them. */
export const requiredPasswordFieldSchema = z.string().min(1);

export const passwordFieldSchema = requiredPasswordFieldSchema
  .min(PASSWORD_MIN_LENGTH)
  .max(PASSWORD_MAX_LENGTH)
  .regex(PASSWORD_STRENGTH_REGEX);

/**
 * Adds the rule that `confirmPassword` repeats `password`. Two schemas
 * repeat the same `superRefine` body otherwise. The change-password schema
 * compares `newPassword` instead and carries a second rule, so it keeps its
 * own refinement.
 */
export function withPasswordConfirmation<
  TSchema extends z.ZodObject<z.core.$ZodShape>,
>(schema: TSchema) {
  return schema.superRefine((values, ctx) => {
    // `superRefine` on a generic object gives back a union of every object
    // refinement, so the two keys have to be narrowed by name.
    if (!('password' in values) || !('confirmPassword' in values)) {
      return;
    }

    if (values.password !== values.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: ValidationMessages.passwordMatch(),
        path: ['confirmPassword'],
      });
    }
  });
}
