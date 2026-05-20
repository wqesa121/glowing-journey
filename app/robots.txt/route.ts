import { NextResponse } from 'next/server';

const siteUrl = () => (process.env.NEXTAUTH_URL ?? 'http://localhost:3000').replace(/\/$/, '');

export function GET() {
  const base = siteUrl();
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /dashboard/',
    'Disallow: /api/',
    'Disallow: /signin',
    'Disallow: /register',
    '',
    `Sitemap: ${base}/sitemap.xml`
  ].join('\n');

  return new NextResponse(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
