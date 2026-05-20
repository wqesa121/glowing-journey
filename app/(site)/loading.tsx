import { pageGrid } from '@/lib/uiStyles';
import { FeedSkeleton } from '../../components/site/FeedSkeleton';

export default function SiteLoading() {
  return (
    <section className={pageGrid}>
      <main className="min-w-0 space-y-6">
        <FeedSkeleton />
      </main>
      <div className="hidden h-64 animate-pulse rounded-2xl bg-zinc-900/80 lg:block" />
    </section>
  );
}
