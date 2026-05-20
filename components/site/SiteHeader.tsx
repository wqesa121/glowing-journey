import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SiteSearch } from '@/components/site/SiteSearch';
import { SiteHeaderAuth } from '@/components/site/SiteHeaderAuth';
import { MobileNav } from '@/components/site/MobileNav';
import { ThemeToggle } from '@/components/ThemeToggle';
import { headerBar, accentLink } from '@/lib/uiStyles';

export function SiteHeader() {
  return (
    <header className={headerBar}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-12 items-center gap-2 sm:gap-3">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-600 text-sm font-bold text-white">
              N
            </span>
            <span className="hidden text-base font-semibold tracking-tight text-zinc-100 sm:inline">
              Neura<span className="text-sky-400">CMS</span>
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 lg:block">
            <SiteSearch />
          </div>

          <nav className="ml-auto hidden shrink-0 items-center gap-2 lg:flex">
            <ThemeToggle />
            <Link href="/feed.xml" className={cn('text-xs font-semibold', accentLink)}>
              RSS
            </Link>
            <SiteHeaderAuth />
          </nav>

          <div className="ml-auto lg:hidden">
            <MobileNav />
          </div>
        </div>

        <div className="pb-3 lg:hidden">
          <SiteSearch />
        </div>
      </div>
    </header>
  );
}
