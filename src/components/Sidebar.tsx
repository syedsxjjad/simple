import { X, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { cn } from '@/utils/utils';
import en from '@/locales/en.json';
import { USER_ROLES } from '@/enums/userRoles.enum';
import AppLogo from '@/assets/icons/AppLogo';
import { Typography } from './Form/Typography';
import { PUBLIC_ROUTES } from '@/constant/url';
import { useAuthStore } from '@/stores/authStores';
import {
  adminNavItems,
  assistantTrainerNavItems,
  ownerNavItems,
  syndicateManagerNavItems,
  syndicateMemberNavItems,
  trainerNavItems,
} from '@/constant/navItems';

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate(PUBLIC_ROUTES.LOGIN, { replace: true });
  };

  const getNavItems = () => {
    switch (user?.role) {
      case USER_ROLES.ADMIN:
        return adminNavItems;
      case USER_ROLES.OWNER:
        return ownerNavItems;
      case USER_ROLES.TRAINER:
        return trainerNavItems;
      case USER_ROLES.ASSISTANT_TRAINER:
        return assistantTrainerNavItems;
      case USER_ROLES.SYNDICATE_MANAGER:
        return syndicateManagerNavItems;
      case USER_ROLES.SYNDICATE_MEMBER:
        return syndicateMemberNavItems;
      default:
        return adminNavItems;
    }
  };

  const currentNavItems = getNavItems();

  const routes = currentNavItems.map(item => ({
    path: item.to,
    labelKey: item.label,
    icon: <item.icon />,
    isAiChatNav: item.to.includes('training-updates'),
    showInSidebar: true,
    isActive: item.isActive,
  }));

  return (
    <>
      {isMobileOpen && (
        <div
          className={cn('fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden')}
          onClick={() => setIsMobileOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          'sidebar-bg-gradient transition-all lg:rounded-2xl p-2 duration-300 border border-sidebar-border flex flex-col',
          'lg:sticky lg:top-4 lg:h-[calc(100vh-32px)] lg:w-70 lg:shrink-0 lg:z-auto',
          'fixed inset-y-0 left-0 h-full z-[70]',
          isMobileOpen ? 'translate-x-0 w-full! sm:w-70 ' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className={cn('flex items-center justify-between shrink-0 pb-4 pt-1 border-b border-sidebar-border')}>
          <div className='flex items-center gap-2'>
            <AppLogo className='h-14 w-[70px]' />
          </div>

          <button
            onClick={() => setIsMobileOpen(false)}
            className={cn('p-2 rounded-lg hover:bg-sidebar-accent transition-colors lg:hidden')}
            aria-label="Close Sidebar"
          >
            <X className={cn('w-5 h-5 text-placeholder cursor-pointer')} />
          </button>
        </div>

        <Typography
          className={cn('block px-2 mt-5 !font-normal !text-xs uppercase tracking-[0.2em] text-secondary-light mb-2')}
        >
          {en.sidebar.navigation}
        </Typography>
        <nav className={cn('mt-1 flex-1 overflow-y-auto min-h-0')}>
          <ul className={cn('space-y-1.5')}>
            {routes.map(item => {
              const isActive = item.isActive ? item.isActive(location.pathname) : location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => {
                      setIsMobileOpen(false);
                    }}
                    className={cn(
                      'relative w-full flex items-center rounded-2xl group p-3 pl-4 transition-all duration-200',
                      isActive
                        ? 'sidebar-active-gradient text-secondary-dark border-secondary-dark/20'
                        : 'text-placeholder hover:bg-primary/10 border-transparent'
                    )}
                  >
                    {isActive ? (
                      <span className="absolute left-0 top-1/2 h-[22px] w-[2.4px] -translate-y-1/2 rounded-full bg-secondary-dark" />
                    ) : null}
                    <span
                      className={cn(
                        '!w-5 !h-5 flex-shrink-0 transition-colors',
                        item.isAiChatNav && '-mt-1.5',
                      )}
                    >
                      {item.icon}
                    </span>

                    {item.labelKey ? (
                      <Typography
                        className={cn(
                          'ml-4 !font-medium !text-base text-nowrap',
                          isActive ? 'text-secondary-dark' : 'text-placeholder',
                        )}
                      >
                        {item.labelKey}
                      </Typography>
                    ) : null}
                    {isActive ? (
                      <span className={cn("absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-secondary-dark")} />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div
          className={cn(
            'flex items-center gap-2 pt-6 pb-2 px-6 cursor-pointer border-t border-sidebar-border hover:bg-sidebar-accent transition-colors flex-shrink-0'
          )}
          onClick={handleLogout}
        >
          <LogOut className={cn('w-5 h-5 text-destructive')} />
          <Typography variant="p" className={cn('text-destructive')}>
            {en.sidebar.logout}
          </Typography>
        </div>
      </aside>
    </>
  );
}
