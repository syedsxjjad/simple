import { useEffect } from 'react';
import { useState } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  onClick?: () => void;
  width?: string | number;
  height?: string | number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const Image = ({
  src,
  alt,
  width,
  height,
  onClick,
  className = '',
  fallbackSrc = '',
  objectFit = 'cover',
}: ImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc?.length ? imgSrc : fallbackSrc}
      alt={alt}
      className={className}
      style={{
        width: width,
        height: height,
        objectFit: objectFit,
        // Only set cursor when this img is the click target; otherwise inherit (e.g. parent <button>).
        ...(onClick ? { cursor: 'pointer' as const } : {}),
      }}
      onError={handleError}
      onClick={onClick}
    />
  );
};

export default Image;
