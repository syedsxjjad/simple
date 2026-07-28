import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { ADMIN_ROUTES, PUBLIC_ROUTES, USERS_DEFAULT_ROUTES } from '@/constant/url';
import { USER_ROLES } from '@/enums/userRoles.enum';
import { IAPIResponse } from '@/api/ApiInstance';
import { useAuthStore } from '@/stores/authStores';
import {
  userLoginService,
  forgotPasswordService,
  resendSignupOtpService,
  signupService,
  verifySignupOtpService,
  verifyForgotPasswordOtpService,
  verifyResetPasswordService,
  changePasswordService,
  getCurrentUserService,
} from '@/services/auth.service';
import {
  LoginPayload,
  LoginResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ResendSignupOtpPayload,
  SignupPayload,
  SignupRedirectResponse,
  VerifyForgotPasswordOtpPayload,
  VerifySignupOtpPayload,
  VerifyResetPasswordPayload,
  ChangePasswordPayload,
  ChangePasswordResponse,
  LoginSessionPayload,
} from '@/types/authentication.types';
import { COMMON_ERROR_DESCRIPTION } from '@/constant/common';

const formatToastMessage = (message: string) => {
  return message.replace(/[._]/g, ' ').replace(/\s+/g, ' ').trim();
};

export const useUserLogin = () => {
  const { login, setUser } = useAuthStore();
  const navigate = useNavigate();
  return useMutation<IAPIResponse<LoginResponse>, AxiosError, LoginPayload>({
    mutationFn: userLoginService,
    onSuccess: async (res, variables) => {
      if (res.status && res.data) {
        if (res.data.redirect) {
          const queryParams = new URLSearchParams({
            email: variables.email,
            isSignup: 'true',
            token: res.data.otpToken,
          });
          navigate(`${PUBLIC_ROUTES.OTP_VERIFICATION}?${queryParams.toString()}`);
        } else {
          const session = res.data as LoginSessionPayload;
          login(session);
          try {
            const meRes = await getCurrentUserService();
            if (meRes.status && meRes.data) {
              setUser(meRes.data);
            }
          } catch {
            // login/session is already set; route can still proceed
          }
          toast.success(formatToastMessage(res.message));
          const nextPath =
            USERS_DEFAULT_ROUTES[session.user.role as USER_ROLES] ?? ADMIN_ROUTES.DASHBOARD;
          navigate(nextPath, { replace: true });
        }
      }
    },
    onError: (err: any) => {
      const errorMessage =
        err?.response?.data?.message || err?.response?.data?.msg || err?.message || COMMON_ERROR_DESCRIPTION;
      toast.error(formatToastMessage(errorMessage));
    },
  });
};

export const useForgotPassword = () => {
  const navigate = useNavigate();
  return useMutation<IAPIResponse<ForgotPasswordResponse>, AxiosError, ForgotPasswordPayload>({
    mutationFn: forgotPasswordService,
    retry: false,
    onSuccess: (res, variables) => {
      if (res.status && res.data) {
        toast.success(formatToastMessage(res.message));
        const otpToken = res.data.otpToken as string;
        const queryParams = new URLSearchParams({
          email: variables.email,
          isForgotPassword: 'true',
          token: otpToken,
        });
        navigate(`${PUBLIC_ROUTES.OTP_VERIFICATION}?${queryParams.toString()}`);
      }
    },
    onError: (err: any) => {
      const errorMessage =
        err?.response?.data?.message || err?.response?.data?.msg || err?.message || COMMON_ERROR_DESCRIPTION;
      toast.error(formatToastMessage(errorMessage));
    },
  });
};

export const useResendSignupOtp = () => {
  return useMutation<IAPIResponse<boolean>, AxiosError, ResendSignupOtpPayload>({
    mutationFn: resendSignupOtpService,
    retry: false,
    onSuccess: res => {
      if (res.status && res.data) {
        toast.success(formatToastMessage(res.message));
      } else {
        toast.error(formatToastMessage(res.message));
      }
    },
    onError: (err: any) => {
      const errorMessage =
        err?.response?.data?.message || err?.response?.data?.msg || err?.message || COMMON_ERROR_DESCRIPTION;
      toast.error(formatToastMessage(errorMessage));
    },
  });
};

export const useSignup = () => {
  const navigate = useNavigate();
  return useMutation<IAPIResponse<SignupRedirectResponse>, AxiosError, SignupPayload>({
    mutationFn: signupService,
    retry: false,
    onSuccess: (res, variables) => {
      if (res.status && res.data) {
        toast.success(formatToastMessage(res.message));
        const otpToken = res.data.otpToken;
        const queryParams = new URLSearchParams({
          email: variables.email,
          isSignup: 'true',
          token: otpToken,
        });
        navigate(`${PUBLIC_ROUTES.OTP_VERIFICATION}?${queryParams.toString()}`);
      } else {
        toast.error(formatToastMessage(res.message));
      }
    },
    onError: (err: any) => {
      const errorMessage =
        err?.response?.data?.message || err?.response?.data?.msg || err?.message || COMMON_ERROR_DESCRIPTION;
      toast.error(formatToastMessage(errorMessage));
    },
  });
};

export const useVerifyForgotPasswordOtp = () => {
  const navigate = useNavigate();
  return useMutation<IAPIResponse<any>, AxiosError, VerifyForgotPasswordOtpPayload>({
    mutationFn: verifyForgotPasswordOtpService,
    retry: false,
    onSuccess: (res, variables) => {
      if (res.status && res.data) {
        toast.success(formatToastMessage(res.message));
        const resetToken =
          typeof res.data === 'object' && res.data !== null && 'resetToken' in res.data
            ? (res.data as any).resetToken
            : '';
        const queryParams = new URLSearchParams({
          email: variables.email,
          ...(resetToken && { token: resetToken }),
        });
        navigate(`${PUBLIC_ROUTES.RESET_PASSWORD}?${queryParams.toString()}`);
      } else {
        toast.error(formatToastMessage(res.message));
      }
    },
    onError: (err: any) => {
      const errorMessage =
        err?.response?.data?.message || err?.response?.data?.msg || err?.message || COMMON_ERROR_DESCRIPTION;
      toast.error(formatToastMessage(errorMessage));
    },
  });
};

export const useVerifySignupOtp = () => {
  return useMutation<IAPIResponse<boolean>, AxiosError, VerifySignupOtpPayload>({
    mutationFn: verifySignupOtpService,
    retry: false,
    onSuccess: res => {
      if (res.status && res.data) {
        toast.success(formatToastMessage(res.message));
      } else {
        toast.error(formatToastMessage(res.message));
      }
    },
    onError: (err: any) => {
      const errorMessage =
        err?.response?.data?.message || err?.response?.data?.msg || err?.message || COMMON_ERROR_DESCRIPTION;
      toast.error(formatToastMessage(errorMessage));
    },
  });
};

export const useVerifyResetPassword = () => {
  return useMutation<IAPIResponse<boolean>, AxiosError, VerifyResetPasswordPayload>({
    mutationFn: verifyResetPasswordService,
    retry: false,
    onSuccess: res => {
      if (res.status) {
        toast.success(formatToastMessage(res.message));
      } else {
        toast.error(formatToastMessage(res.message));
      }
    },
    onError: (err: any) => {
      const errorMessage =
        err?.response?.data?.message || err?.response?.data?.msg || err?.message || COMMON_ERROR_DESCRIPTION;
      toast.error(formatToastMessage(errorMessage));
    },
  });
};

export const useChangePassword = () => {
  return useMutation<IAPIResponse<ChangePasswordResponse>, AxiosError, ChangePasswordPayload>({
    mutationFn: changePasswordService,
    onSuccess: res => {
      if (res.status) {
        toast.success(formatToastMessage(res.message));
      } else {
        toast.error(formatToastMessage(res.message));
      }
    },
    onError: (err: any) => {
      const errorMessage =
        err?.response?.data?.message || err?.response?.data?.msg || err?.message || COMMON_ERROR_DESCRIPTION;
      toast.error(formatToastMessage(errorMessage));
    },
  });
};
