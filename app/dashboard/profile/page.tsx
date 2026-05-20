import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ProfileSignOutButton } from '@/components/ProfileSignOut';
import { eyebrow, heading, panelInset, body } from '@/lib/uiStyles';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export default async function DashboardProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-6">
      <div>
        <p className={eyebrow}>Аккаунт</p>
        <h1 className={heading}>Профиль</h1>
      </div>

      <Card className="space-y-6 p-8">
        <div className={cn(panelInset, 'grid gap-4 p-6')}>
          <div className="grid gap-2">
            <p className={eyebrow}>Имя</p>
            <p className="text-base font-medium text-zinc-100">{session?.user?.name ?? '—'}</p>
          </div>
          <div className="grid gap-2">
            <p className={eyebrow}>Email</p>
            <p className="text-base font-medium text-zinc-100">{session?.user?.email}</p>
          </div>
          <div className="grid gap-2">
            <p className={eyebrow}>Роль</p>
            <p className="text-base font-medium text-zinc-100">{(session?.user as { role?: string })?.role ?? 'user'}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/" className={cn(buttonVariants({ variant: 'secondary' }))}>
            На ленту
          </Link>
          <Link href="/dashboard/articles" className={cn(buttonVariants())}>
            Мои статьи
          </Link>
          <ProfileSignOutButton />
        </div>
      </Card>
    </div>
  );
}
