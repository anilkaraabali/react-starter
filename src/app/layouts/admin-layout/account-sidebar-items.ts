import { msg } from '@lingui/core/macro';
import {
  LockKeyholeIcon,
  MonitorSmartphoneIcon,
  NetworkIcon,
  SettingsIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import type { SidebarNavItem } from '@/components/organisms/sidebar/sidebar.types';
import type { ResourcelessPolicyName } from '@/lib/authorization/authorization-policies.utils';

export const ACCOUNT_SIDEBAR_ITEMS: readonly SidebarNavItem<ResourcelessPolicyName>[] =
  [
    {
      icon: SettingsIcon,
      label: msg`Settings`,
      to: '/account/profile',
    },
    {
      icon: MonitorSmartphoneIcon,
      label: msg`Sessions`,
      to: '/account/sessions',
    },
    {
      icon: LockKeyholeIcon,
      label: msg`Security`,
      to: '/account/security',
    },
    {
      icon: NetworkIcon,
      label: msg`Organization`,
      policy: 'members:list',
      to: '/account/organization',
    },
    {
      icon: ShieldCheckIcon,
      label: msg`Roles & Permissions`,
      policy: 'members:list',
      to: '/account/roles',
    },
  ];
