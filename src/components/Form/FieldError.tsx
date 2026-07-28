import React from 'react';
import { cn } from '@/utils/utils';

interface FieldErrorProps {
  children?: React.ReactNode;
  message?: string;
  className?: string;
}

const FieldError: React.FC<FieldErrorProps> = ({ children, message, className }) => {
  if (!children && !message) return null;

  return <p className={cn('text-destructive text-xs mt-2', className)}>{children ?? message}</p>;
};

export default FieldError;
