import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { PASSWORD_STRENGTH_REGEX } from '@/lib/zod/validation.constants';
import { setupZodErrorMap } from '@/lib/zod/zod-error-map';

setupZodErrorMap();

const message = (schema: z.ZodType, value: unknown) => {
  const result = schema.safeParse(value);

  return result.success ? '' : (result.error?.issues[0]?.message ?? '');
};

describe('zod-error-map', () => {
  it('turns a missing value into "required"', () => {
    expect(message(z.object({ name: z.string() }), {})).toBe(
      'This field is required'
    );
  });

  it('separates "required" from a real minimum length', () => {
    expect(message(z.string().min(1), '')).toBe('This field is required');
    expect(message(z.string().min(3), 'ab')).toBe(
      'Minimum 3 characters required'
    );
  });

  it('reports the maximum with the number filled in', () => {
    expect(message(z.string().max(5), 'abcdef')).toBe(
      'Maximum 5 characters allowed'
    );
  });

  it('has a message for each known format', () => {
    expect(message(z.email(), 'nope')).toBe(
      'Please enter a valid email address'
    );
    expect(message(z.url(), 'nope')).toBe('The URL is badly formatted');
    expect(message(z.uuid(), 'nope')).toBe('Please enter a valid UUID');
  });

  it('tells a weak password apart from any other pattern', () => {
    const weak = z.string().regex(PASSWORD_STRENGTH_REGEX);

    expect(message(weak, 'abc')).toBe(
      'Password must contain uppercase and lowercase letters, numbers, and special characters'
    );
    expect(message(z.string().regex(/^\d{4}$/), 'abc')).toBe('Invalid format');
  });

  it('keeps Zod’s own message for an unknown issue', () => {
    expect(message(z.number(), 'not a number')).not.toBe('');
  });
});
