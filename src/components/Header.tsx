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
  const handleSearchChange = () => { };
  const user = useAuthStore(state => state.user);
  const userName = user?.fullName || en.header.defaultUserName;
  const userRole = user?.role ? user.role.replace(/_/g, ' ') : en.header.defaultUserRole;
  return (
    <div
      className={cn(
        'fixed top-0 sm:h-28 h-24 bg-background z-40 transition-all duration-300',
        'lg:left-[312px] right-0 left-2 w-[calc(100%-1rem)] lg:w-[calc(100%-20rem-0.5rem)]'
      )}
    >
      <header
        className={cn(
          'fixed top-0 sm:h-[92px] h-20 border border-sidebar-border rounded-2xl header-bg-gradient z-40 transition-all duration-300',
          'lg:left-[312px] top-4 right-0 left-2 w-[calc(100%-1rem)] lg:w-[calc(100%-20rem-0.5rem)]'
        )}
      >
        <div className="flex items-center justify-between h-full sm:px-4 px-2">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={cn(
              'p-2 rounded-lg bg-placeholder/10 transition-colors duration-200',
              'flex items-center justify-center w-12 h-11 lg:hidden'
            )}
          >
            <Menu className="w-6 h-6 cursor-pointer text-placeholder" />
          </button>
          <div className="flex items-center w-full lg:pl-0 md:pl-5 pl-3 gap-3">
            <Typography className="text-placeholder !text-2xl font-normal hidden lg:block">
              {en.header.welcomeTitle}
            </Typography>
            {/* <SearchBar
              placeholder={en.header.searchPlaceholder}
              onChange={handleSearchChange}
              containerClass="hidden md:block w-full max-w-[460px]"
            /> */}
            <Profile
              className="ml-auto"
              name={userName}
              initials={getInitials(userName)}
              companyName={userRole}
              notificationCount={0}
              profilePic={user?.avatar}
            />
          </div>
        </div>
      </header>
    </div>
  );
}
