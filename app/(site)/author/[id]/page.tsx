import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteSidebar } from '@/components/site/SiteSidebar';
import { ArticleFeedCard } from '@/components/site/ArticleFeedCard';
import { EmptyState } from '@/components/EmptyState';
import { fetchAuthorProfile, fetchPublishedArticleSummaries } from '@/lib/articlePublic';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { pageGrid, panel, accent, accentLink, heading, body } from '@/lib/uiStyles';
import { cn } from '@/lib/utils';

export const revalidate = 60;

type AuthorPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AuthorPage(props: AuthorPageProps) {
  const params = await props.params;

  const profile = await fetchAuthorProfile(params.id);
  if (!profile) {
    notFound();
  }

  const articles = await fetchPublishedArticleSummaries({ authorId: params.id, limit: 40 });

  return (
    <section className={pageGrid}>
      <main className="min-w-0 space-y-6">
        <Breadcrumbs items={[{ label: 'Лента', href: '/' }, { label: profile.name }]} />

        <header className={cn(panel, 'px-4 py-5 sm:px-6')}>
          <p className={cn('text-xs font-bold uppercase tracking-[0.2em]', accent)}>Автор</p>
          <h1 className={cn('mt-2', heading)}>{profile.name}</h1>
          <p className={cn('mt-2 text-sm', body)}>
            {profile.articleCount}{' '}
            {profile.articleCount === 1 ? 'публикация' : profile.articleCount < 5 ? 'публикации' : 'публикаций'}
          </p>
        </header>

        {articles.length === 0 ? (
          <EmptyState
            title="Нет публикаций"
            description="У этого автора пока нет опубликованных статей."
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
      <SiteSidebar />
    </section>
  );
}
