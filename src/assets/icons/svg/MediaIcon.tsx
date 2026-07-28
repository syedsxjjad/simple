import * as React from 'react';
import { SVGProps } from 'react';

interface CheckIconProps extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: string | number;
  height?: string | number;
}

const MediaIcon: React.FC<CheckIconProps> = ({ width = '21', height = '21', color = 'currentColor', ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 21 21" fill="none" {...props}>
  <path d="M16.2577 2.56714H4.27782C3.33263 2.56714 2.56641 3.33336 2.56641 4.27855V16.2584C2.56641 17.2036 3.33263 17.9698 4.27782 17.9698H16.2577C17.2029 17.9698 17.9691 17.2036 17.9691 16.2584V4.27855C17.9691 3.33336 17.2029 2.56714 16.2577 2.56714Z" stroke={color} stroke-width="1.71141" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.69969 9.41256C8.64488 9.41256 9.4111 8.64634 9.4111 7.70116C9.4111 6.75597 8.64488 5.98975 7.69969 5.98975C6.75451 5.98975 5.98828 6.75597 5.98828 7.70116C5.98828 8.64634 6.75451 9.41256 7.69969 9.41256Z" stroke={color} stroke-width="1.71141" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M17.9684 12.8356L15.3277 10.1949C15.0067 9.87408 14.5715 9.69385 14.1177 9.69385C13.6639 9.69385 13.2287 9.87408 12.9077 10.1949L5.13281 17.9699" stroke={color} stroke-width="1.71141" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);

export default MediaIcon;
