import React, { useRef } from 'react';
import { cn, withAvatarCacheBust } from '@/utils/utils';
import Toast from '@/utils/Toast';
import Button from '@/components/Form/Button';
import { Typography } from '@/components/Form/Typography';

const MAX_AVATAR_FILE_BYTES = 2 * 1024 * 1024; // 2 MB

interface AvatarUploadProps {
  name?: string; // For initials fallback
  avatar?: string | null; // Existing image URL (e.g. from profile)
  size?: number;
  onChange?: (file: File | null) => void;
  loading?: boolean;
  title?: string;
  subtitle?: string;
  uploadLabel?: string;
  removeLabel?: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  name = 'SF',
  avatar,
  size = 115,
  onChange,
  loading = false,
  title = 'Profile Photo',
  subtitle = 'JPG, GIF or PNG. Max size 2MB.',
  uploadLabel = 'Upload New',
  removeLabel = 'Remove',
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

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
    if (file.size > MAX_AVATAR_FILE_BYTES) {
      Toast.error('Please choose an image that is 2 MB or smaller.');
      e.target.value = '';
      return;
    }
    onChange?.(file);
  };

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.gif,image/jpeg,image/png,image/gif"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        onClick={() => !loading && inputRef.current?.click()}
        style={{ width: size, height: size }}
        className={cn(
          'relative flex shrink-0 items-center justify-center overflow-hidden rounded-[36px]',
          loading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer',
          !avatar && !loading && 'bg-secondary-light shadow-[0_0_32px_rgba(212,175,119,0.23)]'
        )}
      >
        {avatar ? (
          <img
            src={avatar.startsWith('blob:') ? avatar : withAvatarCacheBust(avatar)}
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        ) : loading ? (
          <div className="h-full w-full animate-pulse bg-placeholder/30" />
        ) : (
          <Typography className="text-[29px]! font-bold! text-secondary-dark-bg1!">
            {getInitials(name)}
          </Typography>
        )}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-[36px] bg-black/10">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-secondary-light border-t-transparent" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Typography className="text-xl! font-medium! text-foreground-white!">
          {title}
        </Typography>
        <Typography className="text-base! font-normal! text-placeholder!">
          {subtitle}
        </Typography>
        <div className="flex flex-wrap items-center gap-6 pt-1">
          <Button
            type="button"
            onClick={() => !loading && inputRef.current?.click()}
            disabled={loading}
            variant="outline"
            label={uploadLabel}
            className="h-10! rounded-2xl border-secondary-light/35! bg-transparent! text-secondary-light! hover:bg-secondary-light/10!"
            buttonTextClassName="text-sm! font-medium!"
          >
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (!loading) {
                if (inputRef.current) inputRef.current.value = '';
                onChange?.(null);
              }
            }}
            disabled={loading || !avatar}
            variant="ghost"
            label={removeLabel}
            buttonTextClassName="text-sm! font-medium!"
            className="h-auto! bg-transparent! p-0 text-destructive! hover:bg-transparent! hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-45"
          >
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvatarUpload;
