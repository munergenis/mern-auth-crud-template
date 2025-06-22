import {
  BadgeCheck,
  // Bell,
  // CreditCard,
  LogOut,
  Sparkles,
} from 'lucide-react';

export const HAS_LANDING = true;
export const LOCALE = 'es-ES';
// TODO: review
// export const LOCALE =
//   typeof window !== 'undefined' ? navigator.language || 'es-ES' : 'es-ES';

export interface UserMenuOption {
  label: string;
  icon: React.ElementType;
  route?: string;
  group: string;
}

export const userMenuOptions: UserMenuOption[] = [
  {
    label: 'Some Main Options',
    icon: Sparkles,
    route: '/options',
    group: 'main',
  },
  // {
  //   label: 'Upgrade to Pro',
  //   icon: Sparkles,
  //   route: undefined,
  //   group: 'main',
  // },
  {
    label: 'Sessions',
    icon: BadgeCheck,
    route: '/sessions',
    group: 'secondary',
  },
  // {
  //   label: 'Account',
  //   icon: BadgeCheck,
  //   route: '/account',
  //   group: 'secondary',
  // },
  // {
  //   label: 'Billing',
  //   icon: CreditCard,
  //   route: '/billing',
  //   group: 'secondary',
  // },
  // {
  //   label: 'Notifications',
  //   icon: Bell,
  //   route: '/notifications',
  //   group: 'secondary',
  // },
  // DO NOT EDIT (only label or icon)
  {
    label: 'Log out',
    icon: LogOut,
    route: undefined,
    group: 'logout',
  },
];
