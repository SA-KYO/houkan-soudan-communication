import * as React from 'react';
import { cn } from '@/lib/utils';

export type SliderProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Slider({ className, label, ...props }: SliderProps) {
  return (
    <label className="flex w-full flex-col gap-2 text-sm font-medium text-ink">
      {label && <span>{label}</span>}
      <input
        type="range"
        className={cn(
          'h-2 w-full cursor-pointer appearance-none rounded-full bg-blush-100 accent-blush-400',
          className
        )}
        {...props}
      />
    </label>
  );
}
