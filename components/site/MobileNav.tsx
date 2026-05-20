'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { accentLink, panel } from '@/lib/uiStyles';
import { SiteSearch } from '@/components/site/SiteSearch';
import { ThemeToggle } from '@/components/ThemeToggle';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { status, data } = useSession();
  const user = data?.user;

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300"
        aria-expanded={open}
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
      >
        <span className="sr-only">Меню</span>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/60"
            aria-label="Закрыть"
            onClick={() => setOpen(false)}
          />
          <nav
            className={cn(
              panel,
              'fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col gap-4 overflow-y-auto p-5 shadow-xl'
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-zinc-100">Меню</p>
              <ThemeToggle />
            </div>
            <SiteSearch />
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/" className={accentLink} onClick={() => setOpen(false)}>
                Лента
              </Link>
              <Link href="/feed.xml" className={accentLink} onClick={() => setOpen(false)}>
                RSS
              </Link>
            </div>
            <div className="mt-auto flex flex-col gap-2 border-t border-zinc-800 pt-4">
              {status === 'authenticated' && user ? (
                <>
                  <Link
                    href="/dashboard/articles"
                    className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'justify-center')}
                    onClick={() => setOpen(false)}
                  >
                    Мои статьи
                  </Link>
                  <Link
                    href="/dashboard/articles/new"
                    className={cn(buttonVariants({ size: 'sm' }), 'justify-center')}
                    onClick={() => setOpen(false)}
                  >
                    Написать
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'justify-center')}
                    onClick={() => setOpen(false)}
                  >
                    Войти
                  </Link>
                  <Link
                    href="/register"
                    className={cn(buttonVariants({ size: 'sm' }), 'justify-center')}
                    onClick={() => setOpen(false)}
                  >
                    Регистрация
                  </Link>
                </>
              )}
            </div>
          </nav>
        </>
      ) : null}
    </div>
  );
}
