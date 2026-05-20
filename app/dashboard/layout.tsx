import { ReactNode } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { pageBackground, panel, panelInset, accentLink, body } from '@/lib/uiStyles';
import { DashboardNav } from '@/components/dashboard/DashboardNav';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin');
  }

  const user = session.user as { email?: string; role?: string };
  const isAdmin = user?.role === 'admin';

  return (
    <div className={cn('min-h-screen px-4 py-8 sm:px-6', pageBackground)}>
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl gap-8 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-10">
        <aside className={cn(panel, 'h-fit space-y-5 p-5 lg:sticky lg:top-8')}>
          <div className="space-y-2">
            <Link href="/" className={cn('text-sm font-medium', accentLink)}>
              ← На ленту
            </Link>
            <h1 className="text-xl font-semibold tracking-tight text-zinc-50">NeuraCMS</h1>
            <p className={cn('text-sm leading-relaxed', body)}>Статьи и черновики.</p>
          </div>
          <DashboardNav isAdmin={isAdmin} />
          <p className={cn(panelInset, 'p-3 text-xs leading-relaxed', body)}>
            <span className="text-zinc-500">Сессия:</span>{' '}
            <span className="font-medium text-zinc-200">{user?.email ?? 'admin'}</span>
          </p>
        </aside>
        <main className="space-y-8">{children}</main>
      </div>
    </div>
  );
}
