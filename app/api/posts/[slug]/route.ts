import { NextResponse } from 'next/server';
import connectMongoose from '@/lib/mongoose';
import Article from '@/models/Article';

export async function GET(request: Request, context: any) {
  const { params } = context;
  try {
    await connectMongoose();
  } catch (dbErr) {
    console.error('Posts/[slug] GET DB connect error:', dbErr);
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }
  const article = await Article.findOne({ slug: params.slug, status: 'published' }).lean();

  if (!article) {
    return NextResponse.json({ message: 'Article not found' }, { status: 404 });
  }

  return NextResponse.json(article);
}
