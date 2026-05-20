import { panel } from '@/lib/uiStyles';
import { cn } from '@/lib/utils';

export function FeedSkeleton() {
  return (
    <>
      <header className={cn(panel, 'overflow-hidden')}>
        <div className="h-11 border-b border-zinc-800" />
        <div className="space-y-3 px-4 py-5 sm:px-6">
          <div className="h-3 w-16 animate-pulse rounded bg-zinc-800" />
          <div className="h-8 w-2/3 max-w-sm animate-pulse rounded-lg bg-zinc-800" />
          <div className="h-4 w-32 animate-pulse rounded bg-zinc-800" />
        </div>
      </header>
      <ul className="space-y-4">
        {[1, 2, 3].map((i) => (
          <li key={i} className={cn(panel, 'h-36 animate-pulse bg-zinc-900/80')} />
        ))}
      </ul>
    </>
  );
}
