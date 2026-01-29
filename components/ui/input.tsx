import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'focus-ring w-full rounded-2xl border border-blush-100 bg-white px-4 py-3 text-sm shadow-sm transition',
        'placeholder:text-blush-300',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';
