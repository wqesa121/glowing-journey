import { NextResponse } from 'next/server';
import { fetchPublishedSlugsForSitemap } from '@/lib/articlePublic';

export const revalidate = 300;

const siteUrl = () => (process.env.NEXTAUTH_URL ?? 'http://localhost:3000').replace(/\/$/, '');

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const base = siteUrl();
  const posts = await fetchPublishedSlugsForSitemap();
  const now = new Date().toISOString();

  const urls = [
    `<url><loc>${escapeXml(base)}</loc><lastmod>${now}</lastmod><changefreq>hourly</changefreq><priority>1</priority></url>`,
    ...posts.map(
      (post) =>
        `<url><loc>${escapeXml(`${base}/posts/${post.slug}`)}</loc><lastmod>${post.updatedAt.toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`
    )
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
