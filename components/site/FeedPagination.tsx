import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { panel, muted } from '@/lib/uiStyles';

type FeedPaginationProps = {
  page: number;
  totalPages: number;
  q?: string;
  tag?: string;
  sort?: string;
};

function buildPageHref(page: number, q?: string, tag?: string, sort?: string) {
  const params = new URLSearchParams();
  if (page > 1) params.set('page', String(page));
  if (q) params.set('q', q);
  if (tag) params.set('tag', tag);
  if (sort && sort !== 'new') params.set('sort', sort);
  const qs = params.toString();
  return qs ? `/?${qs}` : '/';
}

export function FeedPagination({ page, totalPages, q, tag, sort }: FeedPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className={cn(panel, 'flex items-center justify-between gap-4 px-4 py-3 sm:px-5')} aria-label="Пагинация">
      {page > 1 ? (
        <Link href={buildPageHref(page - 1, q, tag, sort)} className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}>
          ← Назад
        </Link>
      ) : (
        <span />
      )}
      <span className={cn('text-sm', muted)}>
        Страница <strong className="font-semibold text-zinc-200">{page}</strong> из{' '}
        <strong className="font-semibold text-zinc-200">{totalPages}</strong>
      </span>
      {page < totalPages ? (
        <Link href={buildPageHref(page + 1, q, tag, sort)} className={cn(buttonVariants({ size: 'sm' }))}>
          Далее →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
