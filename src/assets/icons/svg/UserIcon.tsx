import * as React from 'react';
import { SVGProps } from 'react';

interface CheckIconProps extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: string | number;
  height?: string | number;
}

const UserIcon: React.FC<CheckIconProps> = ({ width = '21', height = '21', color = 'currentColor', ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 21 21" fill="none" {...props}>
    <path d="M13.6908 17.9699V16.2585C13.6908 15.3507 13.3302 14.4801 12.6883 13.8382C12.0464 13.1963 11.1758 12.8357 10.268 12.8357H5.13376C4.22597 12.8357 3.35536 13.1963 2.71346 13.8382C2.07155 14.4801 1.71094 15.3507 1.71094 16.2585V17.9699" stroke={color} stroke-width="1.71141" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.70016 9.41278C9.59053 9.41278 11.123 7.88033 11.123 5.98996C11.123 4.09959 9.59053 2.56714 7.70016 2.56714C5.80979 2.56714 4.27734 4.09959 4.27734 5.98996C4.27734 7.88033 5.80979 9.41278 7.70016 9.41278Z" stroke={color} stroke-width="1.71141" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18.8249 17.9698V16.2584C18.8244 15.5 18.5719 14.7632 18.1073 14.1639C17.6427 13.5645 16.9921 13.1364 16.2578 12.9468" stroke={color} stroke-width="1.71141" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13.6914 2.67847C14.4277 2.86698 15.0802 3.29517 15.5463 3.89554C16.0123 4.49591 16.2652 5.23431 16.2652 5.99432C16.2652 6.75433 16.0123 7.49273 15.5463 8.0931C15.0802 8.69347 14.4277 9.12167 13.6914 9.31018" stroke={color} stroke-width="1.71141" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

export default UserIcon;
