import { NextResponse } from 'next/server';
import connectMongoose from '@/lib/mongoose';
import Article from '@/models/Article';

export async function GET(request: Request) {
  try {
    await connectMongoose();
  } catch (dbErr) {
    console.error('Posts GET DB connect error:', dbErr);
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }
  const url = new URL(request.url);
  const search = url.searchParams.get('search') ?? '';
  const tag = url.searchParams.get('tag') ?? '';
  const page = Math.max(Number(url.searchParams.get('page') ?? '1'), 1);
  const pageSize = Math.min(Math.max(Number(url.searchParams.get('pageSize') ?? '10'), 1), 50);

  const filter: Record<string, any> = { status: 'published' };
  if (search) {
    const regex = new RegExp(search, 'i');
    filter.$or = [{ title: regex }, { excerpt: regex }, { metaTitle: regex }, { metaDescription: regex }, { tags: regex }];
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

  return NextResponse.json({
    data: posts,
    meta: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize)
    }
  });
}
