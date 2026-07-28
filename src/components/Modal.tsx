import type React from 'react';
import { CircleX, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useEffect, useRef, type ReactNode } from 'react';

import { cn } from '@/utils/utils';
import { Typography } from './Form/Typography';
import FormJson from '@/locales/en.json';

let openModalCount = 0;
let originalBodyOverflow = '';

interface ModalProps {
  title?: string;
  isOpen: boolean;
  icon?: ReactNode;
  subTitle?: string;
  className?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  isCloseIcon?: boolean;
  titleVariant?: any;
  BodyClassName?: string;
  titleClassName?: string;
  headerClassName?: string;
  showBorder?: boolean;
  subTitleVariant?: any;
  subTitleClassName?: string;
  footerClassName?: string;
  childrenClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  icon,
  onClose,
  children,
  footer,
  className = '',
  isCloseIcon = true,
  BodyClassName,
  titleClassName,
  headerClassName,
  showBorder = false,
  subTitle,
  footerClassName,
  subTitleClassName,
  titleVariant = 'h3',
  childrenClassName,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      if (openModalCount === 0) {
        originalBodyOverflow = document.body.style.overflow;
      }
      openModalCount += 1;
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleEscape);
        openModalCount = Math.max(0, openModalCount - 1);
        if (openModalCount === 0) {
          document.body.style.overflow = originalBodyOverflow;
          originalBodyOverflow = '';
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
        ref={modalRef}
        onClick={e => e.stopPropagation()}
        className={cn(
          'bg-background border border-border rounded-3xl w-full max-w-lg mx-4 max-h-[90vh] flex flex-col overflow-hidden',
          className
        )}
      >
        {/* Sticky header */}
        <div
          className={cn(
            'flex-shrink-0 flex w-full items-center mx-0 sm:p-5 p-2 sm:py-5 py-4 gap-2 justify-between',
            showBorder ? 'border-b border-border py-5' : '',
            BodyClassName
          )}
        >
          {icon && <div className="flex justify-center items-center">{icon}</div>}
          <div className={cn("flex-1 space-y-1 min-w-0", headerClassName)}>
            <Typography
              variant={titleVariant}
              className={cn('text-secondary-dark uppercase !break-words !text-sm tracking-[0.15em]', titleClassName)}
            >
              {title}
            </Typography>
            {subTitle && (
              <Typography
                variant="p"
                className={cn('text-foreground-white font-sora leading-7 !break-words !text-xl !font-bold', subTitleClassName)}
              >
                {subTitle}
              </Typography>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 cursor-pointer transition-colors"
            aria-label="Close"
          >
            {isCloseIcon ? <CircleX className="text-destructive" size={27} /> : ''}
          </button>
        </div>

        {/* Scrollable body */}
        <div className={cn("flex-1 min-h-0 overflow-y-auto sm:px-7 px-3 pb-2", childrenClassName)}>
          {children}
        </div>

        {/* Sticky footer (optional) */}
        {footer != null && (
          <div className={cn("flex-shrink-0 bg-background sm:px-7 px-3 pt-2 pb-5", footerClassName)}>
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
