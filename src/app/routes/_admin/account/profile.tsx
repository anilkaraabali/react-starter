import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { AccountProfileView } from '@/features/account/components/account-profile-view';
import type { MetaFunction } from '@/types/meta.types';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Settings`),
  },
];

export const Route = createFileRoute('/_admin/account/profile')({
  component: AccountProfileView,
  loader: () => ({ meta }),
});
