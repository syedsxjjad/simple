import * as React from 'react';
import { SVGProps } from 'react';
import { cn } from '@/utils/utils';

interface EditIconProps extends SVGProps<SVGSVGElement> {
  color?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
}

const EditIcon: React.FC<EditIconProps> = ({
  color,
  className,
  width = '20',
  height = '20',
  strokeWidth = 2,
  ...props
}) => (
  <svg
    fill="none"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    className={cn(className)}
    stroke={color || 'currentColor'}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

export default EditIcon;
