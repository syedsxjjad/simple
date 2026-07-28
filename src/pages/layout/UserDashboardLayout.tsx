import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default function UserDashboardLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      <Header isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      <main className="flex-1 transition-all duration-300 lg:ml-72 sm:pt-28 pt-24 min-h-screen overflow-x-hidden">
        <div className="py-3 lg:pl-7 pl-3 lg:pr-5 pr-3">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
