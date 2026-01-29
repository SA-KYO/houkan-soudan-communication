import * as React from 'react';
import { cn } from '@/lib/utils';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
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
Textarea.displayName = 'Textarea';
