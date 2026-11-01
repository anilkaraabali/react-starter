import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { AccountSecurityView } from '@/features/account/components/account-security-view';

export const Route = createFileRoute('/_admin/account/security')({
  component: AccountSecurityView,
  staticData: { title: msg`Security` },
});
