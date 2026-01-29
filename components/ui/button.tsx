import * as React from 'react';
import { cn } from '@/lib/utils';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-8 text-base'
};

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-blush-500 text-white shadow-soft hover:bg-blush-600',
  outline: 'border border-blush-200 text-blush-700 hover:bg-blush-50',
  ghost: 'text-blush-700 hover:bg-blush-50'
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'focus-ring inline-flex items-center justify-center rounded-2xl font-semibold transition duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-60',
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
