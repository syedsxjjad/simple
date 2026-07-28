import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ADMIN_ROUTES, PUBLIC_ROUTES, USERS_DEFAULT_ROUTES } from '@/constant/url';
import { useAuthStore } from '@/stores/authStores';
import { USER_ROLES } from '@/enums/userRoles.enum';
import { publicAuthRoutes } from './routeConfig';

const PublicRoute = () => {
  const location = useLocation();
  const token = useAuthStore(s => s.token);
  const user = useAuthStore(s => s.user);

  const publicPaths = publicAuthRoutes.map(r => r.path);
  const isPublicAuthPage = publicPaths.some(
    p => location.pathname === p || location.pathname.startsWith(`${p}/`)
  );

  if (token && isPublicAuthPage) {
    const nextPath =
      user?.role && user.role in USERS_DEFAULT_ROUTES
        ? USERS_DEFAULT_ROUTES[user.role as USER_ROLES]
        : ADMIN_ROUTES.DASHBOARD;
    return <Navigate to={nextPath} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
