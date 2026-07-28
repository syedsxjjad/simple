import { cn } from '@/utils/utils';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return <div className={cn('animate-pulse rounded-md bg-gray-200', className)} {...props} />;
};

export { Skeleton };
