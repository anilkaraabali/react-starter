import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { AccountSecurityView } from '@/features/account/components/account-security-view';
import type { MetaFunction } from '@/types/meta.types';

const meta: MetaFunction = (i18n) => [
  {
    title: i18n._(msg`Security`),
  },
];

export const Route = createFileRoute('/_admin/account/security')({
  component: AccountSecurityView,
  loader: () => ({ meta }),
});
