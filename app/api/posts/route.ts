import { NextResponse } from 'next/server';
import connectMongoose from '@/lib/mongoose';
import Article from '@/models/Article';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rateLimit';
import { articleCache, getCacheKeyForArticles } from '@/lib/cache';

export async function GET(request: Request) {
  // Apply rate limiting: 100 requests per minute
  const rateLimitResult = checkRateLimit(request, {
    requests: 100,
    windowMs: 60 * 1000 // 1 minute
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { 
        status: 429,
        headers: getRateLimitHeaders(rateLimitResult)
      }
    );
  }

  const url = new URL(request.url);
  const search = url.searchParams.get('search') ?? '';
  const tag = url.searchParams.get('tag') ?? '';
  const page = Math.max(Number(url.searchParams.get('page') ?? '1'), 1);
  const pageSize = Math.min(Math.max(Number(url.searchParams.get('pageSize') ?? '10'), 1), 50);

  // Generate cache key
  const cacheKey = getCacheKeyForArticles(search, tag, page);
  
  // Check cache first
  const cachedResult = articleCache.get(cacheKey);
  if (cachedResult) {
    return NextResponse.json(
      cachedResult,
      { 
        headers: {
          ...getRateLimitHeaders(rateLimitResult),
          'X-Cache': 'HIT'
        }
      }
    );
  }

  try {
    await connectMongoose();
  } catch (dbErr) {
    console.error('Posts GET DB connect error:', dbErr);
    return NextResponse.json(
      { error: 'Database unavailable' },
      { 
        status: 503,
        headers: getRateLimitHeaders(rateLimitResult)
      }
    );
  }

  const filter: Record<string, any> = { status: 'published' };
  if (search) {
    // Use MongoDB text search instead of regex for better performance
    filter.$text = { $search: search };
  }
  if (tag) {
    filter.tags = tag;
  }

  const total = await Article.countDocuments(filter);
  const posts = await Article.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .lean();

  const response = {
    data: posts,
    meta: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize)
    }
  };

  // Cache the result
  articleCache.set(cacheKey, response);

  return NextResponse.json(
    response,
    { 
      headers: {
        ...getRateLimitHeaders(rateLimitResult),
        'X-Cache': 'MISS'
      }
    }
  );
}
