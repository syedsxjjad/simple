import { capitalizeFirst, cn } from '@/utils/utils';
import { Typography } from './Form/Typography';
import { AvatarWithTitle } from './AvatarWithTitle';
import { useAuthStore } from '@/stores/authStores';

interface ProfileProps {
  name: string;
  initials: string;
  className?: string;
  notificationCount?: number;
  profilePic?: string;
  companyName?: string;
}

export default function Profile({
  name,
  notificationCount = 0,
  className,
  profilePic,
  companyName,
}: ProfileProps) {
  const { user, token } = useAuthStore();
  const isUserLoading = Boolean(token && !user?._id);

  return (
    <div className={cn('flex items-center sm:gap-6 gap-5', className)}>
      <div className="h-8 w-[1.2px] bg-border" aria-hidden />
      <div className="flex items-center max-w-52 gap-3">
        {isUserLoading ? (
          <>
            <div className="w-11 h-11 rounded-full bg-placeholder/20 animate-pulse" />
            <div className="hidden sm:flex flex-col gap-2">
              <div className="h-4 w-28 rounded bg-placeholder/20 animate-pulse" />
              <div className="h-3 w-20 rounded bg-placeholder/20 animate-pulse" />
            </div>
          </>
        ) : (
          <>
            <AvatarWithTitle className="w-11! h-11!" title={name} imageUrl={profilePic} />
            <div className="flex flex-col sm:gap-1">
              <Typography className="text-foreground-white capitalize font-normal! text-base! leading-4 py-0.5! break-all line-clamp-2! hidden sm:block">
                {name}
              </Typography>
              <Typography className="text-placeholder capitalize text-xs! font-normal! leading-4 py-0.5! break-all line-clamp-2! hidden sm:block">
                {capitalizeFirst(companyName || '')}
              </Typography>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
