import Profile from './Profile';
import { cn } from '@/utils/utils';
import en from '@/locales/en.json';
import { Menu } from 'lucide-react';
import { getInitials } from '@/utils/GetClasses';
import { useAuthStore } from '@/stores/authStores';
import { Typography } from './Form/Typography';

interface HeaderProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export default function Header({ isMobileOpen, setIsMobileOpen }: HeaderProps) {
  const user = useAuthStore(state => state.user);
  const userName = user?.fullName || en.header.defaultUserName;
  const userRole = user?.role ? user.role.replace(/_/g, ' ') : en.header.defaultUserRole;
  return (
    <header
      className={cn(
        'sm:h-24 h-20 w-full border border-sidebar-border rounded-2xl header-bg-gradient transition-all duration-300 flex items-center justify-between p-4 sm:p-6 shrink-0',
      )}
    >
      <div className="flex items-center w-full justify-between gap-3">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={cn(
            'p-2 rounded-lg bg-placeholder/10 transition-colors duration-200',
            'flex items-center justify-center w-10 h-10 lg:hidden'
          )}
        >
          <Menu className="w-5 h-5 cursor-pointer text-placeholder" />
        </button>
        <Typography className="text-placeholder !text-xl lg:!text-2xl font-normal">
          {en.header.welcomeTitle}
        </Typography>
        <Profile
          className="ml-auto"
          name={userName}
          initials={getInitials(userName)}
          companyName={userRole}
          notificationCount={0}
          profilePic={user?.avatar}
        />
      </div>
    </header>
  );
}
