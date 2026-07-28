import { USER_ROLES } from '@/enums/userRoles.enum';
import {
  PUBLIC_ROUTES,
  ADMIN_ROUTES,
  OWNER_ROUTES,
  TRAINER_ROUTES,
  ASSISTANT_TRAINER_ROUTES,
  SYNDICATE_MANAGER_ROUTES,
  SYNDICATE_MEMBER_ROUTES,
} from '@/constant/url';
import Login from '@/pages/authentication/Login';
import Signup from '@/pages/authentication/Signup';
import ForgotPassword from '@/pages/authentication/ForgotPassword';
import OtpVerification from '@/pages/authentication/OtpVerification';
import ResetPassword from '@/pages/authentication/ResetPassword';
import Dashboard from '@/pages/dashboard';

export const publicAuthRoutes = [
  { component: Login, path: PUBLIC_ROUTES.LOGIN },
  { component: Signup, path: PUBLIC_ROUTES.SIGNUP },
  { component: ForgotPassword, path: PUBLIC_ROUTES.FORGOT_PASSWORD },
  { component: OtpVerification, path: PUBLIC_ROUTES.OTP_VERIFICATION },
  { component: ResetPassword, path: PUBLIC_ROUTES.RESET_PASSWORD },
];

export type ProtectedRoute = {
  roles: USER_ROLES[];
  path: string;
  isPrivate: boolean;
  component: React.ComponentType;
};

export const protectedRoleRoutes: ProtectedRoute[] = [
  { isPrivate: true, roles: [USER_ROLES.ADMIN], component: Dashboard, path: ADMIN_ROUTES.DASHBOARD },
  { isPrivate: true, roles: [USER_ROLES.OWNER], component: Dashboard, path: OWNER_ROUTES.DASHBOARD },
  { isPrivate: true, roles: [USER_ROLES.TRAINER], component: Dashboard, path: TRAINER_ROUTES.DASHBOARD },
  { isPrivate: true, roles: [USER_ROLES.ASSISTANT_TRAINER], component: Dashboard, path: ASSISTANT_TRAINER_ROUTES.DASHBOARD },
  { isPrivate: true, roles: [USER_ROLES.SYNDICATE_MANAGER], component: Dashboard, path: SYNDICATE_MANAGER_ROUTES.DASHBOARD },
  { isPrivate: true, roles: [USER_ROLES.SYNDICATE_MEMBER], component: Dashboard, path: SYNDICATE_MEMBER_ROUTES.DASHBOARD },
];
