export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface Subscription {
  _id: string;
  userId: string;
  amount: number;
  createdAt: string;
  currency: string;
  currentPeriodEnd: string;
  currentPeriodStart: string;
  isInTrial: boolean;
  isSubscriptionActive: boolean;
  paymentFailureCount: number;
  paymentFailureHistory: any[];
  plan: string;
  status: string;
  updatedAt: string;
}

export interface LoginUser {
  _id: string;
  fullName: string;
  email: string;
  emailVerified: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  preferredLanguage: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  avatar?: string;
  phone?: string;
  subscription: Subscription | null;
}

export type LoginResponse =
  | { redirect: true; otpToken: string }
  | { redirect: false; user: LoginUser; accessToken: string };

export interface LoginSessionPayload {
  accessToken: string;
  user: LoginUser;
  refreshToken?: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  otpToken?: string;
}

export interface ResendSignupOtpPayload {
  email: string;
}

export interface SignupPayload {
  fullName: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyForgotPasswordOtpPayload {
  email: string;
  otp: string;
  otpToken: string;
}

export interface VerifySignupOtpPayload {
  email: string;
  otp: string;
  otpToken: string;
}

export interface SignupRedirectResponse {
  redirect?: boolean;
  otpToken: string;
}

export interface VerifyResetPasswordPayload {
  email: string;
  password: string;
  token: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  message?: string;
}
