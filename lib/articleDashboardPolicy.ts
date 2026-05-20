import mongoose from 'mongoose';

/** Фильтр списка статей в панели: черновики только свои; админ видит всё. */
export function dashboardArticleListFilter(userId: string, role: string | undefined) {
  if (role === 'admin') return {};
  return {
    $or: [
      { status: 'published' },
      { status: 'draft', 'author.id': new mongoose.Types.ObjectId(userId) }
    ]
  };
}

export function normalizeAuthorId(article: { author?: { id?: unknown } } | null | undefined): string | undefined {
  const id = article?.author?.id;
  if (id == null) return undefined;
  return String(id);
}

/** Публичная статья или preview черновика в панели. */
export function articleViewHref(slug: string, status: string) {
  return status === 'published' ? `/posts/${slug}` : `/dashboard/articles/${slug}?preview=1`;
}

/** Редактирование / удаление: автор статьи или админ. */
export function canManageDashboardArticle(
  authorIdStr: string | undefined,
  userId: string | undefined,
  role: string | undefined
): boolean {
  if (!userId) return false;
  if (role === 'admin') return true;
  if (!authorIdStr) return false;
  return authorIdStr === userId;
}
