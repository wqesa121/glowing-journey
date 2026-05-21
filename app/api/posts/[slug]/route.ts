import { NextResponse } from 'next/server';
import connectMongoose from '@/lib/mongoose';
import Article from '@/models/Article';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rateLimit';
import { articleCache, getCacheKeyForArticle } from '@/lib/cache';

export async function GET(request: Request, context: any) {
  // Apply rate limiting: 200 requests per minute for single article
  const rateLimitResult = checkRateLimit(request, {
    requests: 200,
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

  const { params } = context;
  
  // Check cache first
  const cacheKey = getCacheKeyForArticle(params.slug);
  const cachedArticle = articleCache.get(cacheKey);
  if (cachedArticle) {
    return NextResponse.json(
      cachedArticle,
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
    console.error('Posts/[slug] GET DB connect error:', dbErr);
    return NextResponse.json(
      { error: 'Database unavailable' },
      { 
        status: 503,
        headers: getRateLimitHeaders(rateLimitResult)
      }
    );
  }
  const article = await Article.findOne({ slug: params.slug, status: 'published' }).lean();

  if (!article) {
    return NextResponse.json(
      { message: 'Article not found' },
      { 
        status: 404,
        headers: getRateLimitHeaders(rateLimitResult)
      }
    );
  }

  // Cache the result
  articleCache.set(cacheKey, article);

  return NextResponse.json(
    article,
    { 
      headers: {
        ...getRateLimitHeaders(rateLimitResult),
        'X-Cache': 'MISS'
      }
    }
  );
}
