import * as React from 'react';
import { cn } from '@/lib/utils';

const variantClasses = {
  default: 'border border-zinc-700 bg-zinc-800/80 text-zinc-200',
  success: 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
  destructive: 'border border-red-500/30 bg-red-500/10 text-red-200',
  warning: 'border border-amber-500/30 bg-amber-500/10 text-amber-200'
};

type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: keyof typeof variantClasses;
};

export function Alert({ className, variant = 'default', ...props }: AlertProps) {
  return <div className={cn('rounded-lg px-3 py-2.5 text-sm', variantClasses[variant], className)} {...props} />;
}
