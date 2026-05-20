'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navLink, navLinkActive } from '@/lib/uiStyles';

const links = [
  { href: '/dashboard/articles', label: 'Статьи', match: '/dashboard/articles' },
  { href: '/dashboard/articles/new', label: 'Новая статья', match: '/dashboard/articles/new' },
  { href: '/dashboard/profile', label: 'Профиль', match: '/dashboard/profile' },
  { href: '/dashboard/users', label: 'Пользователи', match: '/dashboard/users', adminOnly: true }
] as const;

export function DashboardNav({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {links
        .filter((link) => !('adminOnly' in link && link.adminOnly) || isAdmin)
        .map((link) => {
          const active =
            pathname === link.href ||
            (link.href === '/dashboard/articles' && pathname.startsWith('/dashboard/articles/') && pathname !== '/dashboard/articles/new');
          return (
            <Link key={link.href} href={link.href} className={cn(navLink, active && navLinkActive)}>
              {link.label}
            </Link>
          );
        })}
    </nav>
  );
}
