import { msg } from '@lingui/core/macro';
import {
  BarChart3Icon,
  CreditCardIcon,
  FileTextIcon,
  FolderKanbanIcon,
  FolderOpenIcon,
  GraduationCapIcon,
  HandshakeIcon,
  LayoutDashboardIcon,
  MailIcon,
  MegaphoneIcon,
  MessageSquareIcon,
  PackageIcon,
  RocketIcon,
  ShoppingCartIcon,
  StoreIcon,
  TagIcon,
  TruckIcon,
  UsersIcon,
  WalletIcon,
} from 'lucide-react';
import type { SidebarNavItem } from '@/components/organisms/sidebar/sidebar.types';
import type { ResourcelessPolicyName } from '@/lib/authorization/authorization-policies.utils';

export const SIDEBAR_ITEMS: readonly SidebarNavItem<ResourcelessPolicyName>[] =
  [
    {
      children: [
        {
          icon: LayoutDashboardIcon,
          label: msg`Dashboard`,
          to: '/dashboard',
        },
        {
          icon: BarChart3Icon,
          label: msg`Analytics`,
          to: '/analytics',
        },
        {
          icon: StoreIcon,
          label: msg`eCommerce`,
          to: '/ecommerce',
        },
        {
          icon: HandshakeIcon,
          label: msg`CRM`,
          to: '/crm',
        },
        {
          icon: FolderKanbanIcon,
          label: msg`Project`,
          to: '/project',
        },
        {
          icon: UsersIcon,
          label: msg`HR`,
          to: '/hr',
        },
        {
          icon: MegaphoneIcon,
          label: msg`Marketing`,
          to: '/marketing',
        },
        {
          icon: GraduationCapIcon,
          label: msg`Academy`,
          to: '/academy',
        },
        {
          icon: TruckIcon,
          label: msg`Logistics`,
          to: '/logistics',
        },
        {
          icon: RocketIcon,
          label: msg`SaaS`,
          to: '/saas',
        },
      ],
      icon: LayoutDashboardIcon,
      label: msg`Overview`,
    },
    {
      children: [
        {
          icon: CreditCardIcon,
          label: msg`Billing`,
          to: '/finance/billing',
        },
        {
          icon: TagIcon,
          label: msg`Pricing`,
          to: '/finance/pricing',
        },
      ],
      icon: WalletIcon,
      label: msg`Finance`,
    },
    {
      children: [
        {
          badge: 12,
          icon: ShoppingCartIcon,
          label: msg`Orders`,
          to: '/commerce/orders',
        },
        {
          icon: PackageIcon,
          label: msg`Products`,
          to: '/products',
        },
        {
          icon: UsersIcon,
          label: msg`Customers`,
          to: '/commerce/customers',
        },
        {
          icon: FileTextIcon,
          label: msg`Invoices`,
          to: '/commerce/invoices',
        },
      ],
      icon: ShoppingCartIcon,
      label: msg`Commerce`,
    },
    {
      children: [
        {
          icon: MailIcon,
          label: msg`Mail`,
          to: '/apps/mail',
        },
        {
          icon: MessageSquareIcon,
          label: msg`Chat`,
          to: '/apps/chat',
        },
        {
          icon: FolderOpenIcon,
          label: msg`Files`,
          to: '/apps/files',
        },
      ],
      icon: MailIcon,
      label: msg`Apps`,
    },
  ];
