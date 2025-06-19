import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from 'lucide-react';

export const HAS_LANDING = true;

export interface UserMenuOption {
  label: string;
  icon: React.ElementType;
  route?: string;
  group: string;
}

export const userMenuOptions: UserMenuOption[] = [
  {
    label: 'Upgrade to Pro',
    icon: Sparkles,
    route: undefined,
    group: 'main',
  },
  {
    label: 'Account',
    icon: BadgeCheck,
    route: '/account',
    group: 'secondary',
  },
  {
    label: 'Billing',
    icon: CreditCard,
    route: '/billing',
    group: 'secondary',
  },
  {
    label: 'Notifications',
    icon: Bell,
    route: '/notifications',
    group: 'secondary',
  },
  // DO NOT EDIT (only label or icon)
  {
    label: 'Log out',
    icon: LogOut,
    route: undefined,
    group: 'logout',
  },
];
