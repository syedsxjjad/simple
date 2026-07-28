import * as React from 'react';
import { SVGProps } from 'react';

interface CheckIconProps extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: string | number;
  height?: string | number;
}

const TradingIcon: React.FC<CheckIconProps> = ({ width = '21', height = '21', color = 'currentColor', ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 21 21" fill="none" {...props}>
    <path d="M2.56738 2.56702V16.2583C2.56738 16.7122 2.74769 17.1475 3.06864 17.4684C3.38959 17.7894 3.8249 17.9697 4.27879 17.9697H17.9701" stroke={color} stroke-width="1.71141" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16.2587 7.70123L11.9802 11.9798L8.55735 8.55694L5.99023 11.1241" stroke={color} stroke-width="1.71141" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

export default TradingIcon;
