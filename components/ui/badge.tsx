import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ className, variant = 'default', ...props }, ref) => {
  const variantClasses = {
    default: 'bg-zinc-800 text-zinc-300 ring-1 ring-zinc-700',
    success: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/25',
    warning: 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/25',
    destructive: 'bg-red-500/10 text-red-400 ring-1 ring-red-500/25'
  };

  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = 'Badge';

export { Badge };
