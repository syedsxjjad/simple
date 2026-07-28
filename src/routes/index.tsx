import { Navigate, Route, Routes } from 'react-router-dom';

import NotFound from '@/pages/notfound';
import PublicRoute from './PublicRoutes';
import ProtectedRoute from './ProtectedRoutes';
import AuthLayout from '@/pages/layout/AuthLayout';
import { PUBLIC_ROUTES } from '@/constant/url';
import { publicAuthRoutes, protectedRoleRoutes } from './routeConfig';
import UserDashboardLayout from '@/pages/layout/UserDashboardLayout';

export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={PUBLIC_ROUTES.LOGIN} replace />} />
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          {publicAuthRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Route>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<UserDashboardLayout />}>
          {protectedRoleRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
