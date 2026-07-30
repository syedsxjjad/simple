import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/utils/utils';
import { useAuthStore } from '@/stores/authStores';
import TooltipTypography from './TooltipTypography';
import { PUBLIC_ROUTES } from '@/constant/url';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AvatarWithTitle } from './Upload/AvatarWithTitle';

interface ProfileProps {
  name: string;
  initials: string;
  className?: string;
  notificationCount?: number;
  profilePic?: string;
  companyName?: string;
  popoverDefaultOpen?: boolean;
}

export default function Profile({
  name,
  className,
  profilePic,
  popoverDefaultOpen = false,
}: ProfileProps) {
  const { user, token, logout } = useAuthStore();
  const isUserLoading = Boolean(token && user && !user._id);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate(PUBLIC_ROUTES.LOGIN, { replace: true });
  };

  return (
    <div className={cn('flex items-center sm:gap-6 gap-5', className)}>
      {/* <NotificationBell /> */}

      {isUserLoading ? (
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-placeholder/20 animate-pulse" />
          <div className="hidden sm:flex flex-col gap-2">
            <div className="h-4 w-28 rounded bg-placeholder/20 animate-pulse" />
            <div className="h-3 w-20 rounded bg-placeholder/20 animate-pulse" />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <AvatarWithTitle className="w-10! h-10! text-base" title={name} imageUrl={profilePic} />

          <div className="hidden min-w-0 max-w-[160px] flex-col sm:flex sm:gap-0.5">
            <TooltipTypography
              as="span"
              disabled={false}
              className="text-header-name! truncate text-base! font-medium! capitalize"
            >
              {name}
            </TooltipTypography>
            <TooltipTypography
              as="span"
              disabled={false}
              className="text-header-email! text-sm! font-normal! leading-4 line-clamp-2"
            >
              {user?.email || ''}
            </TooltipTypography>
          </div>

          {popoverDefaultOpen && (
            <Popover defaultOpen>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex cursor-pointer items-center justify-center rounded-md p-1 text-placeholder outline-none hover:opacity-80 focus-visible:ring-1 focus-visible:ring-secondary-light"
                  aria-label='sidebar.logout'
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                sideOffset={8}
                className="w-auto min-w-36 rounded-xl border border-input-border! bg-background! p-1 shadow-md"
              >
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full cursor-pointer rounded-xl px-3 py-2.5 text-left text-sm text-placeholder transition-colors hover:bg-primary/70 hover:text-pri-text"
                >
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      )}
    </div>
  );
}
