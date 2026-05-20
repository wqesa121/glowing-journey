import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { aiGenerationSchema } from '@/lib/validators';
import { generateArticleDraft, fetchUnsplashImages, insertImagesIntoContent } from '@/lib/ai';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
  }

  const body = await request.json();
  const parseResult = aiGenerationSchema.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json({ message: 'Invalid AI request payload', errors: parseResult.error.flatten() }, { status: 400 });
  }

  const draft = await generateArticleDraft(parseResult.data);
  const images = await fetchUnsplashImages(draft.imageQuery);
  
  // Insert image links into the content
  const contentWithImages = insertImagesIntoContent(draft.content, images);

  return NextResponse.json({ ...draft, content: contentWithImages, images });
}
