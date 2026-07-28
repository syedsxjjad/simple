import { Outlet } from 'react-router-dom';
import AuthLayoutImage from '@/assets/images/authImage.svg';
import ContainerImage from '@/assets/images/containerImage.png';
import AppLogo from '@/assets/icons/AppLogo';
import AuthHeroSection from '@/components/Auth/AuthHeroSection';

const AuthLayout = () => {
  return (
    <div
      className="min-h-screen flex justify-center bg-background py-3 lg:pl-3"
      style={{
        backgroundImage: `url(${AuthLayoutImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom center',
      }}
    >
      <div className="hidden md:w-1/2 lg:flex racing-gradient flex-col rounded-4xl justify-center items-center max-h-[120vh] border-0 gold-border-gradient">
        <div className="w-full flex flex-col overflow-hidden items-center">
          <div
            className="flex w-full justify-center items-center"
            style={{
              width: '600px',
              height: '440px',
              backgroundImage: `url(${ContainerImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
            }}
          >
            <AppLogo width={340} />
          </div>
          <div className="xl:w-3/4 lg:w-[80%] w-[95%] mx-auto mb-20">
            <AuthHeroSection />
          </div>
        </div>
      </div>

      <div className="px-5 xl:px-20 lg:px-16 md:py-5 md:px-8 md:m-0 m-3 w-full md:max-w-lg lg:max-w-none lg:w-1/2 mx-auto lg:mx-0 max-h-[120vh] overflow-y-auto show-scrollbar flex flex-col justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
