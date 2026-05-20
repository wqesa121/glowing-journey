import Link from 'next/link';
import { SiteSidebar } from '@/components/site/SiteSidebar';
import { ArticleFeedCard } from '@/components/site/ArticleFeedCard';
import { EmptyState } from '@/components/EmptyState';
import { fetchPublishedFeedPageCached } from '@/lib/articlePublic';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { pageGrid, panel, accent, accentLink, heading, body } from '@/lib/uiStyles';
import { cn } from '@/lib/utils';

export const revalidate = 60;

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

export default async function TagPage(props: TagPageProps) {
  const params = await props.params;
  const tag = decodeURIComponent(params.tag);

  const { articles, total } = await fetchPublishedFeedPageCached({ tag, page: 1, pageSize: 40 });

  return (
    <section className={pageGrid}>
      <main className="min-w-0 space-y-6">
        <Breadcrumbs items={[{ label: 'Лента', href: '/' }, { label: `#${tag}` }]} />
        <header className={cn(panel, 'px-4 py-5 sm:px-6')}>
          <p className={cn('text-xs font-bold uppercase tracking-[0.2em]', accent)}>Тема</p>
          <h1 className={cn('mt-1', heading)}>#{tag}</h1>
          <p className={cn('mt-2 text-sm', body)}>
            {total} {total === 1 ? 'статья' : total < 5 ? 'статьи' : 'статей'}
          </p>
          <Link href="/" className={cn('mt-3 inline-block text-sm font-semibold', accentLink)}>
            ← Вся лента
          </Link>
        </header>

        {articles.length === 0 ? (
          <EmptyState
            title="Нет статей с этим тегом"
            description="Попробуйте другой тег или вернитесь на главную."
            action={{ label: 'На главную', href: '/' }}
          />
        ) : (
          <ul className="space-y-4">
            {articles.map((article) => (
              <li key={article.slug}>
                <ArticleFeedCard article={article} />
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteSidebar activeTag={tag} />
    </section>
  );
}
