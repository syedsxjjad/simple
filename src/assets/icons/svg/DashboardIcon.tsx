import * as React from 'react';
import { SVGProps } from 'react';

interface CheckIconProps extends SVGProps<SVGSVGElement> {
  color?: string;
  width?: string | number;
  height?: string | number;
}

const DashboardIcon: React.FC<CheckIconProps> = ({ width = '21', height = '21', color = 'currentColor', ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 21 21" fill="none" {...props}>
    <path d="M7.70161 2.56738H3.42309C2.95049 2.56738 2.56738 2.95049 2.56738 3.42309V9.41302C2.56738 9.88561 2.95049 10.2687 3.42309 10.2687H7.70161C8.1742 10.2687 8.55732 9.88561 8.55732 9.41302V3.42309C8.55732 2.95049 8.1742 2.56738 7.70161 2.56738Z" stroke={color} strokeWidth="1.71141" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.1137 2.56738H12.8352C12.3626 2.56738 11.9795 2.95049 11.9795 3.42309V5.9902C11.9795 6.46279 12.3626 6.84591 12.8352 6.84591H17.1137C17.5863 6.84591 17.9694 6.46279 17.9694 5.9902V3.42309C17.9694 2.95049 17.5863 2.56738 17.1137 2.56738Z" stroke={color} strokeWidth="1.71141" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.1137 10.2686H12.8352C12.3626 10.2686 11.9795 10.6517 11.9795 11.1243V17.1142C11.9795 17.5868 12.3626 17.9699 12.8352 17.9699H17.1137C17.5863 17.9699 17.9694 17.5868 17.9694 17.1142V11.1243C17.9694 10.6517 17.5863 10.2686 17.1137 10.2686Z" stroke={color} strokeWidth="1.71141" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.70161 13.6914H3.42309C2.95049 13.6914 2.56738 14.0745 2.56738 14.5471V17.1142C2.56738 17.5868 2.95049 17.9699 3.42309 17.9699H7.70161C8.1742 17.9699 8.55732 17.5868 8.55732 17.1142V14.5471C8.55732 14.0745 8.1742 13.6914 7.70161 13.6914Z" stroke={color} strokeWidth="1.71141" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default DashboardIcon;
