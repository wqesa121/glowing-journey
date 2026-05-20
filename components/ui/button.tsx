import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-sky-600 text-white hover:bg-sky-500 active:bg-sky-700',
        secondary: 'border border-zinc-700 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 hover:border-zinc-600',
        ghost: 'bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50',
        destructive: 'bg-red-600 text-white hover:bg-red-500 active:bg-red-700'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-11 px-5 text-base'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = 'button', ...props }, ref) => {
    return <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} type={type} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
