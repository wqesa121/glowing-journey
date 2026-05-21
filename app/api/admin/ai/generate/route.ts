import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { aiGenerationSchema } from '@/lib/validators';
import { generateArticleDraft, fetchUnsplashImages, insertImagesIntoContent } from '@/lib/ai';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rateLimit';
import { createLogger } from '@/lib/logger';

const logger = createLogger('AI_GENERATION');

export async function POST(request: Request) {
  const startTime = Date.now();
  
  // Apply rate limiting: 5 requests per hour
  const rateLimitResult = checkRateLimit(request, {
    requests: 5,
    windowMs: 60 * 60 * 1000 // 1 hour
  });

  if (!rateLimitResult.success) {
    logger.warn('Rate limit exceeded for AI generation');
    return NextResponse.json(
      { message: 'Rate limit exceeded. Too many AI generation requests.' },
      { 
        status: 429,
        headers: getRateLimitHeaders(rateLimitResult)
      }
    );
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    logger.warn('Unauthorized AI generation request');
    return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
  }

  const body = await request.json();
  const parseResult = aiGenerationSchema.safeParse(body);

  if (!parseResult.success) {
    logger.warn('Invalid AI generation payload', { errors: parseResult.error.flatten() });
    return NextResponse.json({ message: 'Invalid AI request payload', errors: parseResult.error.flatten() }, { status: 400 });
  }

  try {
    logger.info('Starting AI article generation', { topic: parseResult.data.topic });
    
    const draft = await generateArticleDraft(parseResult.data);
    const images = await fetchUnsplashImages(draft.imageQuery);
    
    // Insert image links into the content
    const contentWithImages = insertImagesIntoContent(draft.content, images);

    const duration = Date.now() - startTime;
    logger.info('AI article generation completed', { 
      duration, 
      topic: parseResult.data.topic,
      imagesCount: images.length 
    });

    return NextResponse.json(
      { ...draft, content: contentWithImages, images },
      { headers: getRateLimitHeaders(rateLimitResult) }
    );
  } catch (error) {
    logger.error('AI generation failed', error, { topic: parseResult.data.topic });
    return NextResponse.json(
      { message: 'AI generation failed', error: error instanceof Error ? error.message : String(error) },
      { status: 500, headers: getRateLimitHeaders(rateLimitResult) }
    );
  }
}
