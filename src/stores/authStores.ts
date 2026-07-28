import { create } from 'zustand';
import { LoginSessionPayload, LoginUser } from '@/types/authentication.types';
import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
  clearUserFromLocalStorage,
  getUserRole,
  setUserRole,
  clearUserRole,
} from '@/utils/LocalStorageServices';
import { logoutService } from '@/services/auth.service';

/** Minimal user when only `role` was restored from localStorage after refresh. */
function userFromStoredRole(role: string): LoginUser {
  return {
    _id: '',
    fullName: '',
    email: '',
    emailVerified: false,
    role,
    status: '',
    isDeleted: false,
    preferredLanguage: '',
    createdAt: '',
    updatedAt: '',
    subscription: null,
  };
}

interface AuthState {
  logout: () => Promise<void>;
  token: string | null;
  user: LoginUser | null;
  refreshToken: string | null;
  getToken: () => string | null;
  getUser: () => LoginUser | null;
  login: (session: LoginSessionPayload) => void;
  setUser: (user: LoginUser | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => {
  const initialToken = getAccessToken();
  const storedRole = getUserRole();
  const initialUser =
    initialToken && storedRole ? userFromStoredRole(storedRole) : null;

  return {
    token: initialToken,
    user: initialUser,
    refreshToken: null,

    login: (session: LoginSessionPayload) => {
      const { accessToken, user, refreshToken } = session;

      setAccessToken(accessToken);
      setUserRole(user.role);

      set({
        token: accessToken,
        user,
        refreshToken: refreshToken ?? null,
      });
    },

    setUser: (user: LoginUser | null) => {
      if (user?.role) {
        setUserRole(user.role);
      }
      set({ user });
    },

    logout: async () => {
      const state = get();
      const accessToken = state.token ?? getAccessToken();

      if (accessToken) {
        const lang = state.user?.preferredLanguage?.trim() || 'en';
        try {
          await logoutService(lang);
        } catch {
          // Always clear local session even if the server rejects the request.
        }
      }

      clearAccessToken();
      clearUserRole();
      clearUserFromLocalStorage();

      set({
        token: null,
        user: null,
        refreshToken: null,
      });
    },

    getUser: () => {
      return get().user;
    },

    getToken: () => {
      return get().token;
    },
  };
});
