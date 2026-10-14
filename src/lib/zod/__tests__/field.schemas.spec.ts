import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import {
  EmailSchema,
  PasswordSchema,
  RequiredPasswordSchema,
  StringSchema,
  withPasswordConfirmation,
} from '@/lib/zod/schemas/field.schemas';

const ok = (result: { success: boolean }) => result.success;

describe('field.schemas', () => {
  describe('EmailSchema', () => {
    it('accepts a normal address', () => {
      expect(ok(EmailSchema.safeParse('ada@example.com'))).toBe(true);
    });

    it('rejects a missing @ or a missing domain', () => {
      expect(ok(EmailSchema.safeParse('ada.example.com'))).toBe(false);
      expect(ok(EmailSchema.safeParse('ada@'))).toBe(false);
      expect(ok(EmailSchema.safeParse(''))).toBe(false);
    });

    it('caps the length at 50, counting the domain', () => {
      expect(
        EmailSchema.safeParse(`${'a'.repeat(38)}@example.com`).success
      ).toBe(true);
      expect(
        EmailSchema.safeParse(`${'a'.repeat(39)}@example.com`).success
      ).toBe(false);
    });
  });

  describe('StringSchema', () => {
    it('accepts text and rejects an empty or blank value', () => {
      expect(ok(StringSchema.safeParse('Ada'))).toBe(true);
      expect(ok(StringSchema.safeParse(''))).toBe(false);
      expect(ok(StringSchema.safeParse('   '))).toBe(false);
    });
  });

  describe('RequiredPasswordSchema', () => {
    it('asks only for a non-empty value, because an old password may predate the rules', () => {
      expect(ok(RequiredPasswordSchema.safeParse('a'))).toBe(true);
      expect(ok(RequiredPasswordSchema.safeParse(''))).toBe(false);
    });
  });

  describe('PasswordSchema', () => {
    it('needs at least 8 and at most 50 characters', () => {
      expect(ok(PasswordSchema.safeParse('Abcdef1!'))).toBe(true);
      expect(ok(PasswordSchema.safeParse('Abc1!a'))).toBe(false);
      expect(ok(PasswordSchema.safeParse(`Ab1!${'a'.repeat(60)}`))).toBe(false);
    });

    it('needs an uppercase letter, a lowercase letter, a digit and a special character', () => {
      expect(ok(PasswordSchema.safeParse('abcdefg1!'))).toBe(false);
      expect(ok(PasswordSchema.safeParse('ABCDEFG1!'))).toBe(false);
      expect(ok(PasswordSchema.safeParse('Abcdefgh!'))).toBe(false);
      expect(ok(PasswordSchema.safeParse('Abcdefg1'))).toBe(false);
      expect(ok(PasswordSchema.safeParse('Abcdef1!'))).toBe(true);
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
