'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export function SidebarAuthCta() {
  const { status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and initial hydration, show skeleton to match server render
  if (!mounted) {
    return <div className="h-9 w-full animate-pulse rounded-lg bg-zinc-800" aria-hidden />;
  }

  if (status === 'loading') {
    return <div className="h-9 w-full animate-pulse rounded-lg bg-zinc-800" aria-hidden />;
  }

  if (status === 'authenticated') {
    return (
      <Link href="/dashboard/articles/new" className={cn(buttonVariants({ size: 'sm' }), 'w-full justify-center')}>
        Написать статью
      </Link>
    );
  }

  return (
    <>
      <Link href="/register" className={cn(buttonVariants({ size: 'sm' }), 'w-full justify-center')}>
        Создать аккаунт
      </Link>
      <Link href="/signin" className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'w-full justify-center')}>
        Войти
      </Link>
    </>
  );
}
