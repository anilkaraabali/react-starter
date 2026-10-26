import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import {
  emailFieldSchema,
  nonNegativeIntegerFieldSchema,
  nonNegativeNumberFieldSchema,
  passwordFieldSchema,
  requiredPasswordFieldSchema,
  stringFieldSchema,
  withPasswordConfirmation,
} from '@/lib/zod/schemas/field.schemas';

const ok = (result: { success: boolean }) => result.success;

describe('field.schemas', () => {
  describe('emailFieldSchema', () => {
    it('accepts a normal address', () => {
      expect(ok(emailFieldSchema.safeParse('ada@example.com'))).toBe(true);
    });

    it('rejects a missing @ or a missing domain', () => {
      expect(ok(emailFieldSchema.safeParse('ada.example.com'))).toBe(false);
      expect(ok(emailFieldSchema.safeParse('ada@'))).toBe(false);
      expect(ok(emailFieldSchema.safeParse(''))).toBe(false);
    });

    it('caps the length at 50, counting the domain', () => {
      expect(
        emailFieldSchema.safeParse(`${'a'.repeat(38)}@example.com`).success
      ).toBe(true);
      expect(
        emailFieldSchema.safeParse(`${'a'.repeat(39)}@example.com`).success
      ).toBe(false);
    });
  });

  describe('nonNegativeNumberFieldSchema', () => {
    it('coerces numeric strings and accepts zero', () => {
      expect(ok(nonNegativeNumberFieldSchema.safeParse('29.99'))).toBe(true);
      expect(nonNegativeNumberFieldSchema.parse('29.99')).toBe(29.99);
      expect(ok(nonNegativeNumberFieldSchema.safeParse(0))).toBe(true);
    });

    it('rejects negative values', () => {
      expect(ok(nonNegativeNumberFieldSchema.safeParse(-1))).toBe(false);
    });
  });

  describe('nonNegativeIntegerFieldSchema', () => {
    it('coerces whole numbers and rejects decimals', () => {
      expect(nonNegativeIntegerFieldSchema.parse('100')).toBe(100);
      expect(ok(nonNegativeIntegerFieldSchema.safeParse('10.5'))).toBe(false);
    });
  });

  describe('stringFieldSchema', () => {
    it('accepts text and rejects an empty or blank value', () => {
      expect(ok(stringFieldSchema.safeParse('Ada'))).toBe(true);
      expect(ok(stringFieldSchema.safeParse(''))).toBe(false);
      expect(ok(stringFieldSchema.safeParse('   '))).toBe(false);
    });
  });

  describe('requiredPasswordFieldSchema', () => {
    it('asks only for a non-empty value, because an old password may predate the rules', () => {
      expect(ok(requiredPasswordFieldSchema.safeParse('a'))).toBe(true);
      expect(ok(requiredPasswordFieldSchema.safeParse(''))).toBe(false);
    });
  });

  describe('passwordFieldSchema', () => {
    it('needs at least 8 and at most 50 characters', () => {
      expect(ok(passwordFieldSchema.safeParse('Abcdef1!'))).toBe(true);
      expect(ok(passwordFieldSchema.safeParse('Abc1!a'))).toBe(false);
      expect(ok(passwordFieldSchema.safeParse(`Ab1!${'a'.repeat(60)}`))).toBe(
        false
      );
    });

    it('needs an uppercase letter, a lowercase letter, a digit and a special character', () => {
      expect(ok(passwordFieldSchema.safeParse('abcdefg1!'))).toBe(false);
      expect(ok(passwordFieldSchema.safeParse('ABCDEFG1!'))).toBe(false);
      expect(ok(passwordFieldSchema.safeParse('Abcdefgh!'))).toBe(false);
      expect(ok(passwordFieldSchema.safeParse('Abcdefg1'))).toBe(false);
      expect(ok(passwordFieldSchema.safeParse('Abcdef1!'))).toBe(true);
    });
  });

  describe('withPasswordConfirmation', () => {
    const schema = withPasswordConfirmation(
      z.object({
        confirmPassword: z.string(),
        password: z.string(),
      })
    );

    it('accepts a matching pair', () => {
      expect(
        ok(
          schema.safeParse({
            confirmPassword: 'Abcdef1!',
            password: 'Abcdef1!',
          })
        )
      ).toBe(true);
    });

    it('reports the mismatch on confirmPassword', () => {
      const result = schema.safeParse({
        confirmPassword: 'Abcdef2!',
        password: 'Abcdef1!',
      });

      expect(result.success).toBe(false);
      expect(result.error?.issues[0]?.path).toEqual(['confirmPassword']);
      expect(result.error?.issues[0]?.message).toBe('Passwords do not match');
    });

    it('leaves a schema without the two keys alone', () => {
      const other = withPasswordConfirmation(z.object({ name: z.string() }));

      expect(ok(other.safeParse({ name: 'Ada' }))).toBe(true);
    });
  });
});
