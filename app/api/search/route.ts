import { NextResponse } from 'next/server';
import { fetchPublishedArticleSummaries } from '@/lib/articlePublic';

export const revalidate = 30;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim() ?? '';

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const articles = await fetchPublishedArticleSummaries({ search: q, limit: 8 });

  return NextResponse.json({
    results: articles.map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt || a.metaDescription,
      tags: a.tags.slice(0, 3),
      authorName: a.authorName
    }))
  });
}
