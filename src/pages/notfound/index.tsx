import { Link } from 'react-router-dom';
import { PUBLIC_ROUTES } from '@/constant/url';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-gray-400 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          to={PUBLIC_ROUTES.LOGIN}
          className="bg-primary-button text-white px-6 py-3 rounded-lg hover:bg-primary-500 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
