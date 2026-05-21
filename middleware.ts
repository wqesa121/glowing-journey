import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { createLogger } from '@/lib/logger';

const logger = createLogger('MIDDLEWARE');

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const method = req.method;
  const startTime = Date.now();

  // Log API requests in development
  if (pathname.startsWith('/api')) {
    logger.debug(`${method} ${pathname}`, { query: searchParams.toString() });
  }

  // protect dashboard routes for any authenticated user
  if (pathname.startsWith('/dashboard')) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
      logger.warn(`Unauthorized dashboard access attempt from ${clientIp}`);
      const url = req.nextUrl.clone();
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }
  }

  // protect admin API routes for admin users only
  if (pathname.startsWith('/api/admin')) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const role = token?.role as string | undefined;
    if (!token || role !== 'admin') {
      const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
      logger.warn(`Unauthorized admin API access attempt: ${pathname}`, { ip: clientIp });
      return NextResponse.json(
        { error: { message: 'Admin access required', code: 'FORBIDDEN' } },
        { status: 403 }
      );
    }
  }

  const response = NextResponse.next();
  
  // Log performance in development
  if (pathname.startsWith('/api')) {
    const duration = Date.now() - startTime;
    response.headers.set('X-Response-Time', `${duration}ms`);
    if (duration > 1000) {
      logger.warn(`Slow API response: ${pathname}`, { duration });
    }
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/admin/:path*', '/api/:path*']
};
