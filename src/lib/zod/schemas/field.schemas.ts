import { z } from 'zod';
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_STRENGTH_REGEX,
} from '../validation.constants';
import { ValidationMessages } from '../validation-messages';

export const EmailSchema = z.email().trim().max(EMAIL_MAX_LENGTH);

export const StringSchema = z.string().trim().min(1);

/** For existing passwords (sign-in, confirmation): strength rules may postdate them. */
export const RequiredPasswordSchema = z.string().min(1);

export const PasswordSchema = RequiredPasswordSchema.min(PASSWORD_MIN_LENGTH)
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
