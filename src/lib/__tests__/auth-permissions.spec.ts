import { describe, expect, it } from 'vitest';

import { roles } from '@/lib/auth-permissions';

describe('auth-permissions', () => {
  it('defines exactly the two roles the app signs a user into', () => {
    expect(Object.keys(roles)).toEqual(['admin', 'user']);
  });

  it('lets the admin role act on a user, including delete and impersonate', () => {
    const actions = [...roles.admin.statements.user].sort();

    expect(actions).toContain('delete');
    expect(actions).toContain('ban');
    expect(actions).toContain('impersonate');
    expect(actions).toContain('set-role');
  });

  it('gives the plain user role no action on any user', () => {
    // This is the line that breaks if userRole is built from adminAc instead
    // of userAc: a regular user would gain delete, ban and impersonate.
    expect(roles.user.statements.user).toEqual([]);
  });

  it('never lets the user role hold an action the admin role lacks', () => {
    const admin = new Set(roles.admin.statements.user);

    for (const action of roles.user.statements.user) {
      expect(admin.has(action)).toBe(true);
    }
  });

  it('keeps the session statements separate per role', () => {
    expect(roles.admin.statements.session).not.toEqual(
      roles.user.statements.session
    );
  });
});
