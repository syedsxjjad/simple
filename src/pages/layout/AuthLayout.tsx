import { Outlet, useLocation } from 'react-router-dom';

const AuthLayout = () => {

  return (
    // <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="flex flex-col h-screen lg:flex-row w-full bg-foreground-white overflow-hidden">
      {/* Left side - Branding */}
      <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-8 lg:p-16 lg:block hidden">
        Background Pattern
      </div>

      {/* Right side - Form */}
      <div className="lg:w-1/2 flex flex-col overflow-y-auto h-full px-8 lg:px-16 py-6">
        <div className="w-full my-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
