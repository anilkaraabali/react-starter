import { msg } from '@lingui/core/macro';
import {
  LockKeyholeIcon,
  MonitorSmartphoneIcon,
  NetworkIcon,
  SettingsIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import type { SidebarNavItem } from '@/components/organisms/sidebar/sidebar.types';
import { APP_ROUTES } from '@/config/app-routes.constants';
import type { ResourcelessPolicyName } from '@/lib/authorization/authorization-policies.utils';

export const ACCOUNT_SIDEBAR_ITEMS: readonly SidebarNavItem<ResourcelessPolicyName>[] =
  [
    {
      icon: SettingsIcon,
      label: msg`Settings`,
      to: APP_ROUTES.ACCOUNT_PROFILE,
    },
    {
      icon: MonitorSmartphoneIcon,
      label: msg`Sessions`,
      to: APP_ROUTES.ACCOUNT_SESSIONS,
    },
    {
      icon: LockKeyholeIcon,
      label: msg`Security`,
      to: APP_ROUTES.ACCOUNT_SECURITY,
    },
    {
      icon: NetworkIcon,
      label: msg`Organization`,
      policy: 'members:list',
      to: APP_ROUTES.ACCOUNT_ORGANIZATION,
    },
    {
      icon: ShieldCheckIcon,
      label: msg`Roles & Permissions`,
      policy: 'members:list',
      to: APP_ROUTES.ACCOUNT_ROLES,
    },
  ];
