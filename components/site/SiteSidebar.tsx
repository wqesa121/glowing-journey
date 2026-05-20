import Link from 'next/link';
import { getSidebarData, formatTimeAgo } from '@/lib/articlePublic';
import { cn } from '@/lib/utils';
import { panel, panelHeader, panelInset, body, muted, accent, accentLink, tagPillAccent } from '@/lib/uiStyles';
import { SidebarAuthCta } from '@/components/site/SidebarAuthCta';

type SiteSidebarProps = {
  activeTag?: string;
};

export async function SiteSidebar({ activeTag }: SiteSidebarProps) {
  const { tags, recent, totalArticles } = await getSidebarData();

  return (
    <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
      <section className={cn(panel, 'overflow-hidden')}>
        <header className={cn(panelHeader, 'px-4 py-3 sm:px-5')}>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">NeuraCMS</h2>
        </header>
        <section className={cn('space-y-3 px-4 py-4 text-sm leading-relaxed sm:px-5', body)}>
          <p>Публикуйте статьи, читайте ленту, фильтруйте по тегам и управляйте контентом с AI.</p>
          <p className={cn(panelInset, 'px-3 py-2 text-xs', muted)}>
            <span className={cn('font-semibold tabular-nums', accent)}>{totalArticles}</span> опубликовано
          </p>
          <SidebarAuthCta />
        </section>
      </section>

      {recent.length > 0 ? (
        <section className={cn(panel, 'overflow-hidden')}>
          <header className="border-b border-zinc-800 px-4 py-2.5 sm:px-5">
            <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">Свежее</h2>
          </header>
          <ul className="divide-y divide-zinc-800">
            {recent.map((article) => (
              <li key={article.slug}>
                <Link href={`/posts/${article.slug}`} className="block px-4 py-3 transition hover:bg-zinc-800/40 sm:px-5">
                  <p className="line-clamp-2 text-sm font-medium text-zinc-100">{article.title}</p>
                  <p className={cn('mt-1 text-xs', muted)}>{formatTimeAgo(article.createdAt)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {tags.length > 0 ? (
        <section className={cn(panel, 'overflow-hidden')}>
          <header className="border-b border-zinc-800 px-4 py-2.5 sm:px-5">
            <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">Теги</h2>
          </header>
          <ul className="divide-y divide-zinc-800">
            {tags.map(({ tag, count }) => (
              <li key={tag}>
                <Link
                  href={`/tag/${encodeURIComponent(tag)}`}
                  className={cn(
                    'flex items-center justify-between px-4 py-2.5 text-sm transition hover:bg-zinc-800/40 sm:px-5',
                    activeTag === tag && 'bg-sky-500/5 font-medium text-sky-400'
                  )}
                >
                  <span>#{tag}</span>
                  <span className={tagPillAccent}>{count}</span>
                </Link>
              </li>
            ))}
          </ul>
          {activeTag ? (
            <p className="border-t border-zinc-800 px-4 py-2 sm:px-5">
              <Link href="/" className={cn('text-xs font-medium', accentLink)}>
                Сбросить фильтр
              </Link>
            </p>
          ) : null}
        </section>
      ) : null}
    </aside>
  );
}
