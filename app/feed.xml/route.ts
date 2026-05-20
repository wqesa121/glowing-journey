import { NextResponse } from 'next/server';
import { fetchPublishedArticleSummaries } from '@/lib/articlePublic';

export const revalidate = 300;

export async function GET() {
  if (process.env.SKIP_DB_DURING_BUILD === '1') {
    return new NextResponse('Feed unavailable during build', { status: 503 });
  }

  const articles = await fetchPublishedArticleSummaries({ limit: 30 });
  const site = process.env.NEXTAUTH_URL ?? 'http://localhost:3000';
  const base = site.replace(/\/$/, '');

  const items = articles
    .map((article) => {
      const link = `${base}/posts/${article.slug}`;
      const pubDate = new Date(article.createdAt).toUTCString();
      return `<item>
  <title><![CDATA[${article.title}]]></title>
  <link>${link}</link>
  <guid>${link}</guid>
  <pubDate>${pubDate}</pubDate>
  <description><![CDATA[${article.excerpt || article.metaDescription}]]></description>
</item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>NeuraCMS — лента статей</title>
    <link>${base}/</link>
    <description>Опубликованные статьи NeuraCMS</description>
    <language>ru</language>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
