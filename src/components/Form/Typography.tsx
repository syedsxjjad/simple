import { cn } from '@/utils/utils';
import React from 'react';

export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'title'
  | 'heading'
  | 'subheading'
  | 'xs';

interface ITypography {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
}

const tagMap: Record<Variant, keyof JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
  title: 'h1',
  heading: 'h2',
  subheading: 'h3',
  xs: 'span',
};

export const Typography = ({ className, children, variant = 'p' }: ITypography) => {
  const Tag = tagMap[variant] || 'p';
  return <Tag className={cn('break-words whitespace-normal', className)}>{children}</Tag>;
};
