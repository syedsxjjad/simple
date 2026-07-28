import * as React from 'react';
import { SVGProps } from 'react';

interface FlagIconProps extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: string | number;
  height?: string | number;
}

const FlagIcon: React.FC<FlagIconProps> = ({
  width = '21',
  height = '21',
  color = 'currentColor',
  ...props
}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 21 21" fill="none" {...props}>
    <path d="M3.42285 12.8356C3.42285 12.8356 4.27856 11.9799 6.84567 11.9799C9.41278 11.9799 11.1242 13.6913 13.6913 13.6913C16.2584 13.6913 17.1141 12.8356 17.1141 12.8356V2.56713C17.1141 2.56713 16.2584 3.42284 13.6913 3.42284C11.1242 3.42284 9.41278 1.71143 6.84567 1.71143C4.27856 1.71143 3.42285 2.56713 3.42285 2.56713V12.8356Z" stroke={color} strokeWidth="1.71141" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.42285 18.8254V12.8355" stroke={color} strokeWidth="1.71141" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default FlagIcon;
