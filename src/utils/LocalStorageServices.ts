import { LOCAL_STORAGE_KEY } from '@/constant/auth';

export const getAccessToken = (): string | null => {
  return localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN) || null;
};

export const setAccessToken = (token: string): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, token);
};

export const clearAccessToken = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_KEY.OTP_TIMER);
};

export const getUserRole = (): string | null => {
  return localStorage.getItem(LOCAL_STORAGE_KEY.USER_ROLE);
};

export const setUserRole = (role: string): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY.USER_ROLE, role);
};

export const clearUserRole = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.USER_ROLE);
};

export const clearUserFromLocalStorage = (key: string = LOCAL_STORAGE_KEY.AUTH_USER): void => {
  localStorage.removeItem(key);
};
