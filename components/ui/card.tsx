import * as React from 'react';
import { cn } from '@/lib/utils';
import { panel } from '@/lib/uiStyles';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(panel, 'p-6 transition hover:border-zinc-700', className)}
    {...props}
  />
));
Card.displayName = 'Card';

export { Card };
