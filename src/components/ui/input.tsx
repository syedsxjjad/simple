import { cn } from '@/utils/utils';
import * as React from 'react';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          'w-full min-w-0 h-9 rounded-2xl border border-border bg-primary px-3 text-base leading-5 outline-none',
          'text-placeholder placeholder:text-placeholder/30 selection:bg-border selection:text-placeholder',
          'focus-visible:ring-1 focus-visible:ring-secondary-dark focus-visible:border-border',
          '[caret-color:var(--color-placeholder)]',
          'autofill:bg-primary autofill:text-placeholder',
          'autofill:shadow-[inset_0_0_0px_1000px_var(--color-primary)]',
          'autofill:[-webkit-text-fill-color:var(--color-placeholder)]',
          'transition-none',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',

          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };