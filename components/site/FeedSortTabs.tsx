import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { FeedSort } from '@/lib/articlePublic';

type FeedSortTabsProps = {
  active: FeedSort;
  q?: string;
  tag?: string;
};

function buildHref(sort: FeedSort, q?: string, tag?: string) {
  const params = new URLSearchParams();
  if (sort !== 'new') params.set('sort', sort);
  if (q) params.set('q', q);
  if (tag) params.set('tag', tag);
  const qs = params.toString();
  return qs ? `/?${qs}` : '/';
}

export function FeedSortTabs({ active, q, tag }: FeedSortTabsProps) {
  const tabs: { id: FeedSort; label: string }[] = [
    { id: 'new', label: 'Новое' },
    { id: 'updated', label: 'Обновлённое' }
  ];

  return (
    <div className="flex gap-1 border-b border-zinc-800 px-3">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={buildHref(tab.id, q, tag)}
          className={cn(
            '-mb-px border-b-2 px-3 py-3 text-sm font-medium transition',
            active === tab.id
              ? 'border-sky-500 text-zinc-50'
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
