import Link from 'next/link';
import { formatTimeAgo, type PublicArticleSummary } from '@/lib/articlePublic';
import { cn } from '@/lib/utils';
import { ArticleCoverImage } from '@/components/site/ArticleCoverImage';
import { panel, tagPill, tagPillAccent, accentLink, muted, body } from '@/lib/uiStyles';

type ArticleFeedCardProps = {
  article: PublicArticleSummary;
  compact?: boolean;
};

export function ArticleFeedCard({ article, compact = false }: ArticleFeedCardProps) {
  const preview = article.excerpt || article.metaDescription;

  return (
    <article
      className={cn(
        panel,
        'group flex overflow-hidden transition hover:border-zinc-600 hover:ring-zinc-700/50'
      )}
    >
      <div className="flex w-11 shrink-0 flex-col items-center justify-center gap-0.5 border-r border-zinc-800 bg-zinc-950 py-3 text-zinc-500 sm:w-12">
        <span className="font-mono text-[11px] font-semibold tabular-nums text-zinc-400">{article.readMinutes}</span>
        <span className="text-[9px] font-medium uppercase tracking-wide text-zinc-600">мин</span>
      </div>

      <div className="min-w-0 flex-1 p-4 sm:p-5">
        <div className={cn('mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs', muted)}>
          {article.authorId ? (
            <Link href={`/author/${article.authorId}`} className="font-medium text-zinc-200 hover:text-sky-400">
              {article.authorName}
            </Link>
          ) : (
            <span className="font-medium text-zinc-200">{article.authorName}</span>
          )}
          <span className="text-zinc-600" aria-hidden>
            ·
          </span>
          <time dateTime={article.createdAt}>{formatTimeAgo(article.createdAt)}</time>
          {article.tags[0] ? (
            <>
              <span className="text-zinc-600" aria-hidden>
                ·
              </span>
              <Link href={`/tag/${encodeURIComponent(article.tags[0])}`} className={tagPillAccent}>
                #{article.tags[0]}
              </Link>
            </>
          ) : null}
        </div>

        <Link href={`/posts/${article.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 rounded-sm">
          <h2
            className={cn(
              'font-semibold leading-snug tracking-tight text-zinc-50 group-hover:text-sky-400',
              compact ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
            )}
          >
            {article.title}
          </h2>
        </Link>

        {preview && !compact ? <p className={cn('mt-2 line-clamp-2 text-sm', body)}>{preview}</p> : null}

        {article.featuredImage && !compact ? (
          <div className="mt-4 overflow-hidden rounded-lg border border-zinc-800">
            <ArticleCoverImage src={article.featuredImage} alt="" className="!max-h-56" />
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-zinc-800/80 pt-3">
          {article.tags.slice(0, 3).map((tag) => (
            <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`} className={tagPill}>
              {tag}
            </Link>
          ))}
          <Link href={`/posts/${article.slug}`} className={cn('ml-auto text-xs font-medium', accentLink)}>
            Читать
          </Link>
        </div>
      </div>
    </article>
  );
}
