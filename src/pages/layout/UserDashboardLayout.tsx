import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default function UserDashboardLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="h-screen bg-background sm:p-4 p-2.5 flex gap-4 overflow-hidden">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      <div className="flex-1 flex flex-col min-w-0 sm:gap-4 gap-2.5 overflow-hidden">
        <Header isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
        <main className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
