import React, { useRef, useState } from 'react';

interface ProfileUploaderProps {
  name?: string; // For initials fallback
  avatar?: string | null; // Existing image URL (e.g. from profile)
  size?: number; // Circle size
  onChange?: (file: File | null) => void;
}

const ProfileUploader: React.FC<ProfileUploaderProps> = ({
  name = 'SF',
  avatar,
  size = 120,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const getInitials = (value: string) => {
    return value
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    onChange?.(file);
  };

  return (
    <div
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Avatar Circle */}
      <div
        onClick={() => inputRef.current?.click()}
        className="w-full h-full rounded-full bg-primary flex items-center justify-center cursor-pointer overflow-hidden"
      >
        {preview ? (
          <img
            src={preview}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white text-3xl font-medium">
            {getInitials(name)}
          </span>
        )}
      </div>

      {/* Plus Button */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-text-primary text-white flex items-center justify-center border-2 border-white"
      >
        +
      </button>
    </div>
  );
};

export default ProfileUploader;
