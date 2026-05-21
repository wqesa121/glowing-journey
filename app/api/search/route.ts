import { NextResponse } from 'next/server';
import { fetchPublishedArticleSummaries } from '@/lib/articlePublic';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rateLimit';
import { searchCache, getCacheKeyForSearch } from '@/lib/cache';

export const revalidate = 30;

export async function GET(request: Request) {
  // Apply rate limiting: 30 requests per minute
  const rateLimitResult = checkRateLimit(request, {
    requests: 30,
    windowMs: 60 * 1000 // 1 minute
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { results: [], error: 'Rate limit exceeded' },
      { 
        status: 429,
        headers: getRateLimitHeaders(rateLimitResult)
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim() ?? '';

  if (q.length < 2) {
    return NextResponse.json(
      { results: [] },
      { headers: getRateLimitHeaders(rateLimitResult) }
    );
  }

  // Check cache first
  const cacheKey = getCacheKeyForSearch(q);
  const cachedResults = searchCache.get(cacheKey);
  if (cachedResults) {
    return NextResponse.json(
      cachedResults,
      { 
        headers: {
          ...getRateLimitHeaders(rateLimitResult),
          'X-Cache': 'HIT'
        }
      }
    );
  }

  const articles = await fetchPublishedArticleSummaries({ search: q, limit: 8 });

  const results = {
    results: articles.map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt || a.metaDescription,
      tags: a.tags.slice(0, 3),
      authorName: a.authorName
    }))
  };

  // Cache the result
  searchCache.set(cacheKey, results);

  return NextResponse.json(
    results,
    { 
      headers: {
        ...getRateLimitHeaders(rateLimitResult),
        'X-Cache': 'MISS'
      }
    }
  );
}
