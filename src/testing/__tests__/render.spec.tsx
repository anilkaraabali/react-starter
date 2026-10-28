import { useLingui } from '@lingui/react/macro';
import { expect, it } from 'vitest';

import { renderWithI18n } from '../render';

function RoleCount({ count }: { count: number }) {
  const { t } = useLingui();

  return <span>{t`${count} roles`}</span>;
}

/**
 * `vitest.config.ts` runs the real macro transform and `setup-tests.ts`
 * activates i18n with an empty catalog. A test therefore sees the real
 * message with its interpolation. The previous `msg` mock returned a plain
 * string built from the template parts only, so this assertion could not
 * have passed.
 */
it('renders the source message with its interpolated value', () => {
  const { container } = renderWithI18n(<RoleCount count={3} />);

  expect(container.textContent).toBe('3 roles');
});
