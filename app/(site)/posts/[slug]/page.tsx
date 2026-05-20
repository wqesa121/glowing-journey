import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SiteSidebar } from '@/components/site/SiteSidebar';
import { ArticleFeedCard } from '@/components/site/ArticleFeedCard';
import { ShareArticleActions } from '@/components/site/ShareArticleActions';
import { ArticleBody } from '@/components/article/ArticleBody';
import { ArticleCoverImage } from '@/components/site/ArticleCoverImage';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { ReadingProgress } from '@/components/site/ReadingProgress';
import { GiscusComments } from '@/components/site/GiscusComments';
import {
  fetchPublishedArticleBySlugCached,
  fetchPublishedArticleSummaries,
  formatDate,
  formatTimeAgo,
  type PublicArticleSummary
} from '@/lib/articlePublic';
import {
  pageGrid,
  panel,
  accentLink,
  muted,
  body,
  heading,
  tagPillAccent,
  articleMeta
} from '@/lib/uiStyles';
import { cn } from '@/lib/utils';

export const revalidate = 60;

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: PostPageProps): Promise<Metadata> {
  const params = await props.params;
  const article = await fetchPublishedArticleBySlugCached(params.slug);
  if (!article) return { title: 'Статья не найдена' };
  return {
    title: article.title,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.metaDescription || article.excerpt,
      images: article.featuredImage ? [article.featuredImage] : undefined
    }
  };
}

export default async function PostPage(props: PostPageProps) {
  const params = await props.params;
  const article = await fetchPublishedArticleBySlugCached(params.slug);
  if (!article) {
    notFound();
  }

  const relatedByTag: PublicArticleSummary[] = article.tags[0]
    ? (await fetchPublishedArticleSummaries({ tag: article.tags[0], limit: 6 })).filter((a) => a.slug !== article.slug)
    : [];

  const related = (relatedByTag.length > 0 ? relatedByTag : await fetchPublishedArticleSummaries({ limit: 6 }))
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <ReadingProgress />
      <section className={pageGrid}>
        <main className="min-w-0 space-y-6">
          <Breadcrumbs
            items={[
              { label: 'Лента', href: '/' },
              ...(article.tags[0] ? [{ label: `#${article.tags[0]}`, href: `/tag/${encodeURIComponent(article.tags[0])}` }] : []),
              { label: article.title }
            ]}
          />

          <article className={cn(panel, 'overflow-hidden')}>
            {article.featuredImage ? (
              <figure className="border-b border-zinc-800">
                <ArticleCoverImage src={article.featuredImage} alt="" priority />
              </figure>
            ) : null}

            <header className="border-b border-zinc-800 px-4 py-6 sm:px-8">
              <p className={cn('mb-4', articleMeta)}>
                {article.authorId ? (
                  <Link href={`/author/${article.authorId}`} className={cn('font-medium text-zinc-200', accentLink)}>
                    {article.authorName}
                  </Link>
                ) : (
                  <span className="font-medium text-zinc-200">{article.authorName}</span>
                )}
                <span className="text-zinc-700">·</span>
                <time dateTime={article.createdAt}>{formatTimeAgo(article.createdAt)}</time>
                <span className="text-zinc-700">·</span>
                <span>{formatDate(article.createdAt)}</span>
                <span className="text-zinc-700">·</span>
                <span>{article.readMinutes} мин</span>
              </p>
              <h1 className={cn(heading, 'text-balance')}>{article.title}</h1>
              {article.excerpt ? (
                <p className={cn('mt-4 text-lg leading-relaxed text-zinc-400')}>{article.excerpt}</p>
              ) : null}
              {article.tags.length > 0 ? (
                <p className="mt-5 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`} className={tagPillAccent}>
                      #{tag}
                    </Link>
                  ))}
                </p>
              ) : null}
              <section className="mt-5 border-t border-zinc-800/80 pt-4">
                <ShareArticleActions title={article.title} slug={article.slug} />
              </section>
            </header>

            <section className="px-4 py-10 sm:px-8">
              <ArticleBody content={article.content} />
            </section>
          </article>

          <GiscusComments slug={article.slug} />

          {related.length > 0 ? (
            <section className="space-y-4">
              <h2 className={cn('text-xs font-medium uppercase tracking-wider', muted)}>Ещё почитать</h2>
              <ul className="space-y-4">
                {related.map((item) => (
                  <li key={item.slug}>
                    <ArticleFeedCard article={item} compact />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </main>
        <SiteSidebar />
      </section>
    </>
  );
}
