import { cache } from 'react';
import Article from '@/models/Article';
import connectMongoose from '@/lib/mongoose';
import mongoose from 'mongoose';
import { estimateReadMinutesFromText } from '@/lib/tiptapContentHtml';
import { publicVisibilityFilter } from '@/lib/publish';

export type FeedSort = 'new' | 'updated';

export const PUBLISHED_STATUS = 'published';

const LIST_FIELDS =
  'title slug excerpt metaDescription tags featuredImage author createdAt updatedAt status';

export type PublicArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  tags: string[];
  featuredImage?: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  readMinutes: number;
};

export type PublicArticle = PublicArticleSummary & {
  content: string;
};

function readMinutesFromDoc(doc: Record<string, unknown>, content?: string): number {
  if (content) {
    return estimateReadMinutesFromText(content);
  }
  const excerpt = String(doc.excerpt ?? '');
  const meta = String(doc.metaDescription ?? '');
  const combined = `${excerpt} ${meta}`.trim();
  if (combined) {
    return Math.max(1, Math.min(30, estimateReadMinutesFromText(combined)));
  }
  return 3;
}

function serializeSummary(doc: Record<string, unknown>): PublicArticleSummary {
  const createdAt = doc.createdAt instanceof Date ? doc.createdAt.toISOString() : String(doc.createdAt ?? '');
  const updatedAt = doc.updatedAt instanceof Date ? doc.updatedAt.toISOString() : String(doc.updatedAt ?? createdAt);
  const author = doc.author as { id?: unknown; name?: string; email?: string } | undefined;

  return {
    slug: String(doc.slug),
    title: String(doc.title),
    excerpt: String(doc.excerpt ?? ''),
    metaDescription: String(doc.metaDescription ?? ''),
    tags: Array.isArray(doc.tags) ? doc.tags.map(String) : [],
    featuredImage: doc.featuredImage ? String(doc.featuredImage) : undefined,
    authorId: author?.id ? String(author.id) : '',
    authorName: author?.name ?? author?.email ?? 'Автор',
    createdAt,
    updatedAt,
    readMinutes: readMinutesFromDoc(doc)
  };
}

export function serializePublicArticle(doc: Record<string, unknown>): PublicArticle {
  const content = String(doc.content ?? '');
  return {
    ...serializeSummary(doc),
    content,
    readMinutes: readMinutesFromDoc(doc, content)
  };
}

function buildFilter(options: { tag?: string; search?: string; authorId?: string }) {
  const base: Record<string, unknown> = { status: PUBLISHED_STATUS };
  if (options.tag) base.tags = options.tag;
  if (options.authorId && mongoose.Types.ObjectId.isValid(options.authorId)) {
    base['author.id'] = new mongoose.Types.ObjectId(options.authorId);
  }

  const parts: Record<string, unknown>[] = [base, publicVisibilityFilter];

  if (options.search?.trim()) {
    const regex = new RegExp(options.search.trim(), 'i');
    parts.push({ $or: [{ title: regex }, { excerpt: regex }, { tags: regex }, { metaDescription: regex }] });
  }

  return parts.length === 1 ? parts[0] : { $and: parts };
}

function publishedFeedSort(sort: FeedSort = 'new') {
  return sort === 'updated' ? '-updatedAt' : '-createdAt';
}

export async function fetchPublishedArticleSummaries(options: {
  tag?: string;
  search?: string;
  authorId?: string;
  sort?: FeedSort;
  limit?: number;
  skip?: number;
} = {}): Promise<PublicArticleSummary[]> {
  const { tag, search, authorId, sort = 'new', limit = 50, skip = 0 } = options;

  await connectMongoose();

  const rows = await Article.find(buildFilter({ tag, search, authorId }))
    .select(LIST_FIELDS)
    .sort(publishedFeedSort(sort))
    .skip(skip)
    .limit(limit)
    .lean();

  return rows.map((row) => serializeSummary(row as Record<string, unknown>));
}

/** @deprecated Используйте fetchPublishedArticleSummaries для списков */
export async function fetchPublishedArticles(
  options: Parameters<typeof fetchPublishedArticleSummaries>[0] & { includeContent?: boolean } = {}
): Promise<PublicArticleSummary[] | PublicArticle[]> {
  if (options.includeContent) {
    const { includeContent: _, ...rest } = options;
    await connectMongoose();
    const rows = await Article.find(buildFilter(rest))
      .sort(publishedFeedSort(rest.sort))
      .skip(rest.skip ?? 0)
      .limit(rest.limit ?? 50)
      .lean();
    return rows.map((row) => serializePublicArticle(row as Record<string, unknown>));
  }
  return fetchPublishedArticleSummaries(options);
}

export async function countPublishedArticles(options: {
  tag?: string;
  search?: string;
  authorId?: string;
} = {}): Promise<number> {
  await connectMongoose();
  return Article.countDocuments(buildFilter(options));
}

/** Одна страница ленты: список + total (параллельно, без content). */
export async function fetchPublishedFeedPage(options: {
  tag?: string;
  search?: string;
  sort?: FeedSort;
  page?: number;
  pageSize?: number;
}) {
  const { tag, search, sort = 'new', page = 1, pageSize = FEED_PAGE_SIZE } = options;
  const skip = (page - 1) * pageSize;
  const filter = { tag, search };

  await connectMongoose();

  const [rows, total] = await Promise.all([
    Article.find(buildFilter(filter))
      .select(LIST_FIELDS)
      .sort(publishedFeedSort(sort))
      .skip(skip)
      .limit(pageSize)
      .lean(),
    Article.countDocuments(buildFilter(filter))
  ]);

  return {
    articles: rows.map((row) => serializeSummary(row as Record<string, unknown>)),
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
    page
  };
}

export const fetchPublishedFeedPageCached = cache(fetchPublishedFeedPage);

export async function fetchPublishedArticleBySlug(slug: string): Promise<PublicArticle | null> {
  await connectMongoose();
  const row = await Article.findOne({ slug, status: PUBLISHED_STATUS }).lean();
  if (!row) return null;
  return serializePublicArticle(row as Record<string, unknown>);
}

export const fetchPublishedArticleBySlugCached = cache(fetchPublishedArticleBySlug);

export async function fetchPopularTags(limit = 12): Promise<{ tag: string; count: number }[]> {
  await connectMongoose();
  const rows = await Article.aggregate([
    { $match: { status: PUBLISHED_STATUS, tags: { $exists: true, $ne: [] } } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: limit }
  ]);
  return rows.map((r: { _id: string; count: number }) => ({ tag: r._id, count: r.count }));
}

export async function fetchAuthorProfile(authorId: string) {
  if (!mongoose.Types.ObjectId.isValid(authorId)) return null;

  await connectMongoose();
  const oid = new mongoose.Types.ObjectId(authorId);
  const sample = (await Article.findOne({ status: PUBLISHED_STATUS, 'author.id': oid })
    .select('author')
    .lean()) as Record<string, unknown> | null;
  if (!sample) return null;
  const author = sample.author as { name?: string; email?: string };
  const count = await Article.countDocuments({ status: PUBLISHED_STATUS, 'author.id': oid });
  return {
    id: authorId,
    name: author?.name ?? author?.email ?? 'Автор',
    email: author?.email ?? '',
    articleCount: count
  };
}

export const getSidebarData = cache(async () => {
  await connectMongoose();

  const [tags, recent, totalArticles] = await Promise.all([
    fetchPopularTags(10),
    fetchPublishedArticleSummaries({ limit: 5 }),
    countPublishedArticles()
  ]);

  return { tags, recent, totalArticles };
});

export function formatTimeAgo(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'только что';
  if (minutes < 60) return `${minutes} мин. назад`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ч. назад`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} дн. назад`;
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export const FEED_PAGE_SIZE = 10;

export async function fetchPublishedSlugsForSitemap(limit = 500) {
  await connectMongoose();
  const rows = await Article.find({ $and: [{ status: PUBLISHED_STATUS }, publicVisibilityFilter] })
    .select('slug updatedAt')
    .sort({ updatedAt: -1 })
    .limit(limit)
    .lean();
  return rows.map((row) => ({
    slug: String(row.slug),
    updatedAt: row.updatedAt instanceof Date ? row.updatedAt : new Date(String(row.updatedAt ?? Date.now()))
  }));
}
