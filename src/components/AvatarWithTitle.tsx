import React from 'react';
import { cn, withAvatarCacheBust } from '@/utils/utils';

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((s) => s[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export interface IAvatarWithTitleProps {
  title: string;
  imageUrl?: string;
  className?: string;
}

const avatarSizeClass = 'w-10 h-10';



export const AvatarWithTitle: React.FC<IAvatarWithTitleProps> = ({
  title,
  imageUrl,
  className,
}) => {
  if (imageUrl) {
    return (
      <img
        src={withAvatarCacheBust(imageUrl)}
        alt=""
        className={cn(avatarSizeClass, 'rounded-full object-cover shrink-0', className)}
      />
    );
  }
  return (
    <span
      className={cn(
        'avatar-gold-gradient flex items-center justify-center rounded-full text-primary text-xl font-semibold shrink-0',
        avatarSizeClass,
        className
      )}
    >
      {getInitials(title)}
    </span>
  );
};
