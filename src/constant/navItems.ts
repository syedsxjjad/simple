import React from 'react';
import {
  ADMIN_ROUTES,
  OWNER_ROUTES,
  TRAINER_ROUTES,
  ASSISTANT_TRAINER_ROUTES,
  SYNDICATE_MANAGER_ROUTES,
  SYNDICATE_MEMBER_ROUTES,
} from './url';
import DashboardIcon from '@/assets/icons/svg/DashboardIcon';

export interface NavItem {
  to: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  isActive?: (pathname: string) => boolean;
  isMarginTop?: boolean;
}

export const ownerNavItems: NavItem[] = [
  { to: OWNER_ROUTES.DASHBOARD, label: 'Dashboard', icon: DashboardIcon },
];

export const trainerNavItems: NavItem[] = [
  { to: TRAINER_ROUTES.DASHBOARD, label: 'Dashboard', icon: DashboardIcon },
];

export const assistantTrainerNavItems: NavItem[] = [
  { to: ASSISTANT_TRAINER_ROUTES.DASHBOARD, label: 'Dashboard', icon: DashboardIcon },
];

export const syndicateManagerNavItems: NavItem[] = [
  { to: SYNDICATE_MANAGER_ROUTES.DASHBOARD, label: 'Dashboard', icon: DashboardIcon },
];

export const syndicateMemberNavItems: NavItem[] = [
  { to: SYNDICATE_MEMBER_ROUTES.DASHBOARD, label: 'Dashboard', icon: DashboardIcon },
];

export const adminNavItems: NavItem[] = [
  { to: ADMIN_ROUTES.DASHBOARD, label: 'Dashboard', icon: DashboardIcon },
];

export const OTP_LENGTH = 6;
