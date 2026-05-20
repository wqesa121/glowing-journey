import Link from 'next/link';
import { EmptyState } from '@/components/EmptyState';
import { pageGrid } from '@/lib/uiStyles';

export default function SiteNotFound() {
  return (
    <section className={pageGrid}>
      <main className="min-w-0 lg:col-span-2">
        <EmptyState
          title="Страница не найдена"
          description="Возможно, ссылка устарела или материал был удалён."
          action={{ label: 'На главную', href: '/' }}
        />
        <p className="mt-4 text-center text-sm text-zinc-500">
          <Link href="/dashboard/articles" className="font-medium text-sky-400 hover:underline">
            Перейти в панель управления
          </Link>
        </p>
      </main>
    </section>
  );
}
