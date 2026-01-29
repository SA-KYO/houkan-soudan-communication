import * as React from 'react';
import { cn } from '@/lib/utils';

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-blush-100', className)}>
      <div
        className="h-full rounded-full bg-blush-400 transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
