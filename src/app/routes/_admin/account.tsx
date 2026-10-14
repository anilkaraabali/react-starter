import { createFileRoute } from '@tanstack/react-router';
import { ACCOUNT_SIDEBAR_ITEMS } from '@/app/layouts/admin-layout/account-sidebar-items';
import { AccountLayout } from '@/features/account/components/account-layout';

export const Route = createFileRoute('/_admin/account')({
  component: AccountLayout,
  staticData: {
    contentPadding: 'account',
    hideHeader: true,
    sidebarHeaderMode: 'account',
    sidebarItems: ACCOUNT_SIDEBAR_ITEMS,
  },
});
