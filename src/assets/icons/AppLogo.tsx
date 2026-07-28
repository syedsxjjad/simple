import React from 'react';
import AppLogoImage from '@/assets/images/app-logo.png';

interface AppLogoProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ width = 330, height = 58, className }) => {
  return (
    <img
      src={AppLogoImage}
      alt="App logo"
      width={width}
      height={height}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
};

export default AppLogo;
