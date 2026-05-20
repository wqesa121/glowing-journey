import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { panel, headingSm, muted } from '@/lib/uiStyles';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className={cn(panel, 'flex flex-col items-center justify-center px-8 py-16 text-center')}>
      <div className="mb-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-800">
          <svg className="h-7 w-7 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6"
            />
          </svg>
        </div>
      </div>
      <h3 className={headingSm}>{title}</h3>
      <p className={cn('mt-2 max-w-md', muted)}>{description}</p>
      {action && (
        <Link href={action.href}>
          <Button className="mt-6">{action.label}</Button>
        </Link>
      )}
    </div>
  );
}
