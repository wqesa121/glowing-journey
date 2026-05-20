import { ArticleTable } from '@/components/dashboard/ArticleTable';
import { Button } from '@/components/ui/button';
import Article from '@/models/Article';
import connectMongoose from '@/lib/mongoose';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { dashboardArticleListFilter } from '@/lib/articleDashboardPolicy';
import { eyebrow, heading, body } from '@/lib/uiStyles';
import { cn } from '@/lib/utils';
import { ArticleStats } from '@/components/dashboard/ArticleStats';
import { PUBLISHED_STATUS } from '@/lib/articlePublic';

export default async function ArticlesPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  const userId = user?.id as string | undefined;
  const role = user?.role as string | undefined;
  const isAdmin = role === 'admin';

  await connectMongoose();
  const listFilter = userId ? dashboardArticleListFilter(userId, role) : { _id: null };

  const rows = (await Article.find(listFilter)
    .select('title slug status createdAt publishedAt tags _id author')
    .sort({ updatedAt: -1 })
    .lean()) as any[];

  const [publishedCount, draftCount] = await Promise.all([
    Article.countDocuments({ ...listFilter, status: PUBLISHED_STATUS }),
    Article.countDocuments({ ...listFilter, status: 'draft' })
  ]);

  const articles = rows.map((a) => ({
    _id: String(a._id),
    title: a.title,
    slug: a.slug,
    status: a.status,
    createdAt: a.createdAt instanceof Date ? a.createdAt.toISOString() : a.createdAt,
    publishedAt: a.publishedAt instanceof Date ? a.publishedAt.toISOString() : a.publishedAt,
    tags: a.tags ?? [],
    authorId: String(a.author?.id ?? '')
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className={eyebrow}>Библиотека</p>
          <h1 className={heading}>Статьи</h1>
          {!isAdmin ? (
            <p className={cn('mt-2 text-sm', body)}>
              Опубликованные статьи видны всем. Черновики — только ваши, пока не опубликуете.
            </p>
          ) : null}
        </div>
        <Link href="/dashboard/articles/new">
          <Button>Новая статья</Button>
        </Link>
      </div>
      <ArticleStats total={rows.length} published={publishedCount} drafts={draftCount} />
      <ArticleTable articles={articles} currentUserId={userId ?? ''} isAdmin={isAdmin} />
    </div>
  );
}
