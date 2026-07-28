interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  fullScreen?: boolean;
}

export const Spinner: React.FC<LoadingSpinnerProps> = ({ size = 25, color = 'border-secondary-light', fullScreen = false }) => {
  const containerClass = fullScreen
    ? 'flex items-center justify-center min-h-screen w-full'
    : 'flex items-center justify-center';

  return (
    <div className={containerClass}>
      <div className={`animate-spin rounded-full border-b-2 ${color}`} style={{ height: size, width: size }}></div>
    </div>
  );
};
