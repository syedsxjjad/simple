import { cn } from '@/utils/utils';
import React from 'react';

interface ICard {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Card: React.FC<ICard> = ({ children, className = '', onClick }) => {
  return (
    <div
      className={cn(
        `block rounded-2xl border border-border bg-primary sm:p-5 p-3 ${className}`
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
