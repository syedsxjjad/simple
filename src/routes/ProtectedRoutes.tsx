import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStores';
import { USER_ROLES, isPathAllowedForRole } from '@/enums/userRoles.enum';
import { PUBLIC_ROUTES, USERS_DEFAULT_ROUTES } from '@/constant/url';
import { Spinner } from '@/components/Spinner';
import { getCurrentUserService } from '@/services/auth.service';
import { ListErrorState } from '@/components/ListErrorState';

const isUserRole = (value: string): value is USER_ROLES =>
  (Object.values(USER_ROLES) as string[]).includes(value);

export default function ProtectedRoute() {
  const location = useLocation();
  const token = useAuthStore(s => s.token);
  const user = useAuthStore(s => s.user);
  const setUser = useAuthStore(s => s.setUser);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (token && user && !user._id) {
      const loadCurrentUser = async () => {
        try {
          const res = await getCurrentUserService();
          if (res.status && res.data) {
            setUser(res.data);
          } else {
            setApiError('Session expired. Please log in again.');
          }
        } catch {
          setApiError('Unable to reach the server. Please check your connection.');
        }
      };
      void loadCurrentUser();
    }
  }, [token, user?._id, setUser]);

  if (!token) return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;

  if (apiError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ListErrorState className="w-1/2" message={apiError} backToHref={PUBLIC_ROUTES.LOGIN} />
      </div>
    );
  }

  if (token && user && !user._id) {
    return <Spinner size={48} fullScreen color="border-secondary-dark" />;
  }

  if (!user?.role || !isUserRole(user.role)) {
    return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;
  }

  const role = user.role as USER_ROLES;

  if (!isPathAllowedForRole(location.pathname, role)) {
    return <Navigate to={USERS_DEFAULT_ROUTES[role]} replace />;
  }

  return <Outlet />;
}
