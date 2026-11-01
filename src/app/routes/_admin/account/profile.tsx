import { msg } from '@lingui/core/macro';
import { createFileRoute } from '@tanstack/react-router';
import { AccountProfileView } from '@/features/account/components/account-profile-view';

export const Route = createFileRoute('/_admin/account/profile')({
  component: AccountProfileView,
  staticData: { title: msg`Settings` },
});
