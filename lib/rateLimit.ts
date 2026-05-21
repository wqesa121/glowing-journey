/**
 * In-memory rate limiter for API protection
 * Stores request counts by IP with automatic cleanup
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};
const CLEANUP_INTERVAL = 60000; // Clean up every minute

// Start cleanup interval
if (typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const key in store) {
      if (store[key].resetTime < now) {
        delete store[key];
      }
    }
  }, CLEANUP_INTERVAL);
}

export interface RateLimitConfig {
  requests: number;
  windowMs: number; // in milliseconds
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
}

/**
 * Get client IP from request
 */
function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  return ip;
}

/**
 * Check if request is within rate limit
 */
export function checkRateLimit(
  request: Request,
  config: RateLimitConfig
): RateLimitResult {
  const clientIp = getClientIp(request);
  const key = `${clientIp}`;
  const now = Date.now();

  if (!store[key] || store[key].resetTime < now) {
    store[key] = {
      count: 1,
      resetTime: now + config.windowMs
    };
    return {
      success: true,
      limit: config.requests,
      remaining: config.requests - 1,
      resetTime: store[key].resetTime
    };
  }

  store[key].count++;

  const isWithinLimit = store[key].count <= config.requests;
  return {
    success: isWithinLimit,
    limit: config.requests,
    remaining: Math.max(0, config.requests - store[key].count),
    resetTime: store[key].resetTime
  };
}

/**
 * Create rate limit response headers
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
    ...(result.resetTime && { 'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString() })
  };
}
