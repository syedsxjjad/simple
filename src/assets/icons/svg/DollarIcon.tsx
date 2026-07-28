import * as React from 'react';
import { SVGProps } from 'react';

interface CheckIconProps extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: string | number;
  height?: string | number;
}

const DollarIcon: React.FC<CheckIconProps> = ({ width = '21', height = '21', color = 'currentColor', ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 21 21" fill="none" {...props}>
    <path d="M10.2695 1.71167V18.8258" stroke={color} strokeWidth="1.71141" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.5456 4.27881H8.12778C7.33346 4.27881 6.57168 4.59435 6.01002 5.15601C5.44835 5.71768 5.13281 6.47946 5.13281 7.27377C5.13281 8.06809 5.44835 8.82987 6.01002 9.39154C6.57168 9.9532 7.33346 10.2687 8.12778 10.2687H12.4063C13.2006 10.2687 13.9624 10.5843 14.5241 11.1459C15.0857 11.7076 15.4013 12.4694 15.4013 13.2637C15.4013 14.058 15.0857 14.8198 14.5241 15.3815C13.9624 15.9431 13.2006 16.2587 12.4063 16.2587H5.13281" stroke={color} strokeWidth="1.71141" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default DollarIcon;
