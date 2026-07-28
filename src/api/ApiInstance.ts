import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASE_URL } from '@/api/endpoints';
import { COMMON_ERROR_DESCRIPTION } from '@/constant/common';
import { getAccessToken, clearAccessToken, clearUserRole, setAccessToken } from '@/utils/LocalStorageServices';

export interface IAPIResponse<T> {
  status: boolean;
  message: string;
  data: T | null;
}

export interface GetUsersAPIResponse<T> {
  status: boolean;
  message: string;
  data: T | [];
}

export const axiosInstance = Axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export type APIError = AxiosError<{ message?: string }>;

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.request.use(config => {
  const token = getAccessToken();
  // config.headers['x-locale'] = getCurrentLanguage();
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

// Helper function to check if request is for authentication endpoints
const isAuthEndpoint = (url: string): boolean => {
  const authEndpoints = [
    '/auth/signin',
    '/auth/signup',
    '/auth/forgot-password',
    '/auth/verify-forgot-password-otp',
    '/auth/verify-reset-password',
    '/auth/reset-password',
    '/auth/verify-signup-otp',
    '/auth/resend-signup-otp',
    '/auth/google-signin',
    '/auth/google-signup',
    '/auth/refresh-token',
    '/auth/logout',
  ];
  return authEndpoints.some(endpoint => url.includes(endpoint));
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: APIError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    const isUnauthorized = error.response?.status === 401;
    const isAuthRequest = isAuthEndpoint(originalRequest.url || '');
    if (isUnauthorized && !originalRequest._retry && !isAuthRequest) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            // Retry the original request
            return axiosInstance(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token
        const refreshResponse = await axiosInstance.post('/auth/refresh-token');
        setAccessToken(refreshResponse.data.data?.accessToken);
        if (refreshResponse.data.status) {
          processQueue(null, refreshResponse.data.data?.accessToken);
          // Update the authorization header for the original request
          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${refreshResponse.data.data?.accessToken}`;
          }
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Clear access token and redirect to login
        clearAccessToken();
        clearUserRole();
        window.location.href = '/';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const modifiedError = error;
    let errorMessage = COMMON_ERROR_DESCRIPTION;
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    modifiedError.message = errorMessage;
    throw modifiedError;
  }
);

export class API {
  private static handleResponse<RES>(response: AxiosResponse): IAPIResponse<RES> {
    return {
      data: response?.data?.data ?? null,
      status: response?.data?.status ?? false,
      message: response?.data?.message ?? '',
    };
  }

  private static handleError<RES>(error: APIError): IAPIResponse<RES> {
    throw error;
  }

  static async Post<REQ, RES>(url: string, payload: REQ, config?: AxiosRequestConfig): Promise<IAPIResponse<RES>> {
    try {
      const response = await axiosInstance.post<RES>(url, payload, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error as APIError);
    }
  }

  static async Get<RES>(url: string, config?: AxiosRequestConfig): Promise<IAPIResponse<RES>> {
    try {
      const response = await axiosInstance.get<RES>(url, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error as APIError);
    }
  }

  static async Put<REQ, RES>(url: string, payload?: REQ, config?: AxiosRequestConfig): Promise<IAPIResponse<RES>> {
    try {
      const response = await axiosInstance.put<RES>(url, payload, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error as APIError);
    }
  }

  static async Patch<REQ, RES>(url: string, payload?: REQ, config?: AxiosRequestConfig): Promise<IAPIResponse<RES>> {
    try {
      const response = await axiosInstance.patch<RES>(url, payload, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error as APIError);
    }
  }

  static async Delete<REQ, RES>(url: string, data?: REQ, config?: AxiosRequestConfig): Promise<IAPIResponse<RES>> {
    try {
      const response = await axiosInstance.delete<RES>(url, { data, ...config });
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error as APIError);
    }
  }
}