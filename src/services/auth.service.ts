import { AUTH_ENDPOINTS, USER_ENDPOINTS } from '@/api/endpoints';
import { API, IAPIResponse } from '@/api/ApiInstance';
import {
  LoginPayload,
  LoginResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ResendSignupOtpPayload,
  SignupPayload,
  SignupRedirectResponse,
  VerifySignupOtpPayload,
  VerifyResetPasswordPayload,
  VerifyForgotPasswordOtpPayload,
  ChangePasswordPayload,
  ChangePasswordResponse,
  LoginUser,
} from '@/types/authentication.types';

// Normal user/company admin login
export const userLoginService = async (payload: LoginPayload): Promise<IAPIResponse<LoginResponse>> => {
  const response = await API.Post<LoginPayload, LoginResponse>(AUTH_ENDPOINTS.login, payload);
  return response;
};

/** `POST /auth/logout` — bearer token + optional `x-lang` header (OpenAPI: no body). */
export const logoutService = async (lang = 'en'): Promise<IAPIResponse<null>> => {
  const response = await API.Post<Record<string, never>, null>(
    AUTH_ENDPOINTS.logout,
    {},
    {
      headers: {
        'x-lang': lang,
      },
    }
  );
  return response;
};

export const forgotPasswordService = async (
  payload: ForgotPasswordPayload
): Promise<IAPIResponse<ForgotPasswordResponse>> => {
  const response = await API.Post<ForgotPasswordPayload, ForgotPasswordResponse>(AUTH_ENDPOINTS.forgotPassword, payload);
  return response;
};

export const resendSignupOtpService = async (payload: ResendSignupOtpPayload): Promise<IAPIResponse<boolean>> => {
  const response = await API.Post<ResendSignupOtpPayload, boolean>(AUTH_ENDPOINTS.resendSignupOtp, payload);
  return response;
};

export const signupService = async (payload: SignupPayload): Promise<IAPIResponse<SignupRedirectResponse>> => {
  const response = await API.Post<SignupPayload, SignupRedirectResponse>(AUTH_ENDPOINTS.signup, payload);
  return response;
};

export const verifyForgotPasswordOtpService = async (
  payload: VerifyForgotPasswordOtpPayload
): Promise<IAPIResponse<{ resetToken: string }>> => {
  const response = await API.Post<VerifyForgotPasswordOtpPayload, { resetToken: string }>(
    AUTH_ENDPOINTS.verifyForgotPasswordOtp,
    payload
  );
  return response;
};

export const verifySignupOtpService = async (payload: VerifySignupOtpPayload): Promise<IAPIResponse<boolean>> => {
  const response = await API.Post<VerifySignupOtpPayload, boolean>(AUTH_ENDPOINTS.verifySignupOtp, payload);
  return response;
};

export const verifyResetPasswordService = async (
  payload: VerifyResetPasswordPayload
): Promise<IAPIResponse<boolean>> => {
  const response = await API.Post<VerifyResetPasswordPayload, boolean>(AUTH_ENDPOINTS.resetPassword, payload);
  return response;
};

export const changePasswordService = async (
  payload: ChangePasswordPayload
): Promise<IAPIResponse<ChangePasswordResponse>> => {
  const response = await API.Post<ChangePasswordPayload, ChangePasswordResponse>(
    AUTH_ENDPOINTS.changePassword,
    payload
  );
  return response;
};

export const getCurrentUserService = async (): Promise<IAPIResponse<LoginUser>> => {
  const response = await API.Get<LoginUser>(USER_ENDPOINTS.me, {
    headers: {
      'x-lang': 'en',
    },
  });
  return response;
};

// export const setPasswordService = async (payload: SetPasswordPayload): Promise<IAPIResponse<SetPasswordResponse>> => {
//   const response = await API.Post<SetPasswordPayload, SetPasswordResponse>(AUTH_ENDPOINTS., payload);
//   return response;
// };

// export const getUserByMagicHashService = async (magicHash: string): Promise<IAPIResponse<GetUserByMagicHashResponse>> => {
//   const response = await API.Get<GetUserByMagicHashResponse>(`${AUTH_ENDPOINTS.GET_USER_BY_MAGIC_HASH}/${magicHash}`);
//   return response;
// };