import { Suspense } from 'react';
import { SiteSidebar } from '@/components/site/SiteSidebar';
import { ArticleFeedCard } from '@/components/site/ArticleFeedCard';
import { FeedSortTabs } from '@/components/site/FeedSortTabs';
import { FeedPagination } from '@/components/site/FeedPagination';
import { EmptyState } from '@/components/EmptyState';
import { FEED_PAGE_SIZE, fetchPublishedFeedPageCached, type FeedSort } from '@/lib/articlePublic';
import { pageGrid, panel, eyebrow, heading, body } from '@/lib/uiStyles';
import { cn } from '@/lib/utils';
import { FeedSkeleton } from '../../components/site/FeedSkeleton';

export const revalidate = 60;

type HomePageProps = {
  searchParams: Promise<{ q?: string; tag?: string; sort?: string; page?: string }>;
};

async function FeedContent({
  q,
  tag,
  sort,
  page
}: {
  q?: string;
  tag?: string;
  sort: FeedSort;
  page: number;
}) {
  const { articles, total, totalPages } = await fetchPublishedFeedPageCached({
    search: q,
    tag,
    sort,
    page,
    pageSize: FEED_PAGE_SIZE
  });

  const safePage = Math.min(page, totalPages);
  const feedTitle = tag ? `#${tag}` : q ? `Поиск: «${q}»` : 'Лента статей';

  return (
    <>
      <header className={cn(panel, 'overflow-hidden')}>
        <FeedSortTabs active={sort} q={q} tag={tag} />
        <div className="border-b border-zinc-800 px-4 py-5 sm:px-6">
          <p className={eyebrow}>Лента</p>
          <h1 className={cn('mt-1', heading)}>{feedTitle}</h1>
          <p className={cn('mt-2 text-sm', body)}>
            {total} {total === 1 ? 'публикация' : total < 5 ? 'публикации' : 'публикаций'}
          </p>
        </div>
      </header>

      {articles.length === 0 ? (
        <EmptyState
          title={q || tag ? 'Ничего не найдено' : 'Лента пуста'}
          description={
            q || tag
              ? 'Попробуйте другой запрос или сбросьте фильтр.'
              : 'Пока нет опубликованных статей. Создайте и опубликуйте статью в разделе «Мои статьи».'
          }
          action={
            q || tag
              ? { label: 'Вся лента', href: '/' }
              : { label: 'Написать статью', href: '/dashboard/articles/new' }
          }
        />
      ) : (
        <>
          <ul className="space-y-4">
            {articles.map((article) => (
              <li key={article.slug}>
                <ArticleFeedCard article={article} />
              </li>
            ))}
          </ul>
          <FeedPagination page={safePage} totalPages={totalPages} q={q} tag={tag} sort={sort} />
        </>
      )}
    </>
  );
}

export default async function HomePage(props: HomePageProps) {
  const searchParams = await props.searchParams;
  const q = searchParams.q?.trim();
  const tag = searchParams.tag?.trim();
  const sort = (searchParams.sort === 'updated' ? 'updated' : 'new') as FeedSort;
  const page = Math.max(1, Number(searchParams.page ?? '1') || 1);

  return (
    <section className={pageGrid}>
      <main className="min-w-0 space-y-6">
        <Suspense fallback={<FeedSkeleton />}>
          <FeedContent q={q} tag={tag} sort={sort} page={page} />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-zinc-900/80" />}>
        <SiteSidebar activeTag={tag} />
      </Suspense>
    </section>
  );
}
