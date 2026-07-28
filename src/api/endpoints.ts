export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const AUTH_ENDPOINTS = {
  signup: "/auth/signup",
  login: "/auth/login",
  forgotPassword: "/auth/forgot-password",
  verifySignupOtp: "/auth/verify-signup-otp",
  verifyForgotPasswordOtp: "/auth/verify-forgot-password-otp",
  resetPassword: "/auth/reset-password",
  getAuthenticatedUser: "/auth/get-authenticated-user",
  resendSignupOtp: "/auth/resend-signup-otp",
  changePassword: "/auth/change-password",
  logout: "/auth/logout",
};

export const USER_ENDPOINTS = {
  me: "/users/me",
  uploadAvatar: "/users/upload-avatar",
  deleteAvatar: "/users/avatar",
  updateProfile: (id: string) => `/users/${id}/profile`,
};