'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { accentLink } from '@/lib/uiStyles';

export function SiteHeaderAuth() {
  const { status, data } = useSession();
  const user = data?.user as { name?: string } | undefined;

  if (status === 'loading') {
    return <div className="h-8 w-24 animate-pulse rounded-lg bg-zinc-800" aria-hidden />;
  }

  if (user) {
    return (
      <>
        <Link href="/dashboard/profile" className={cn('hidden text-xs font-semibold sm:inline', accentLink)}>
          {user.name?.split(' ')[0] ?? 'Профиль'}
        </Link>
        <Link
          href="/dashboard/articles"
          className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'hidden sm:inline-flex')}
        >
          Мои статьи
        </Link>
        <Link href="/dashboard/articles/new" className={cn(buttonVariants({ size: 'sm' }))}>
          Написать
        </Link>
      </>
    );
  }

  return (
    <>
      <Link href="/signin" className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}>
        Войти
      </Link>
      <Link href="/register" className={cn(buttonVariants({ size: 'sm' }), 'hidden sm:inline-flex')}>
        Регистрация
      </Link>
    </>
  );
}
