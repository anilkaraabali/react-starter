import { describe, expect, it } from 'vitest';

import { ValidationMessages } from '@/lib/zod/validation-messages';

describe('validation-messages', () => {
  it('fills the number into a length message', () => {
    // A mock of the Lingui macro used to drop the interpolation, which turned
    // this into "Maximum  characters allowed".
    expect(ValidationMessages.maxLength(7)).toBe(
      'Maximum 7 characters allowed'
    );
    expect(ValidationMessages.minLength(120)).toBe(
      'Minimum 120 characters required'
    );
  });

  it('keeps a zero boundary, which a truthiness check would swallow', () => {
    expect(ValidationMessages.minLength(0)).toBe(
      'Minimum 0 characters required'
    );
  });

  it('returns the plain message when it takes no argument', () => {
    expect(ValidationMessages.invalidDate()).toBe(
      'Enter a valid date (YYYY-MM-DD)'
    );
    expect(ValidationMessages.passwordSameAsCurrent()).toBe(
      'New password cannot be the same as the current password'
    );
  });
});
