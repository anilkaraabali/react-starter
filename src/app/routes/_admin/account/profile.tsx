import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import type { MetaFunction } from '@/app/router.types';
import { AccountProfileView } from '@/features/account/components/account-profile-view';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Settings`),
  },
];

export const Route = createFileRoute('/_admin/account/profile')({
  component: AccountProfileView,
  loader: () => ({ meta }),
});
