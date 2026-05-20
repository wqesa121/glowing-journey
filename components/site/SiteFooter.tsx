import Link from 'next/link';
import { cn } from '@/lib/utils';
import { accentLink, muted } from '@/lib/uiStyles';

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-semibold text-zinc-100">
            Neura<span className="text-sky-400">CMS</span>
          </p>
          <p className={cn('mt-1 max-w-sm text-xs leading-relaxed', muted)}>Headless CMS с AI и лентой статей.</p>
        </div>
        <nav className={cn('flex flex-wrap gap-x-6 gap-y-2 text-sm', muted)}>
          <Link href="/" className={accentLink}>
            Лента
          </Link>
          <Link href="/feed.xml" className={accentLink}>
            RSS
          </Link>
          <Link href="/sitemap.xml" className={accentLink}>
            Sitemap
          </Link>
          <Link href="/dashboard/articles" className={accentLink}>
            Мои статьи
          </Link>
          <Link href="/signin" className={accentLink}>
            Войти
          </Link>
        </nav>
      </div>
    </footer>
  );
}
