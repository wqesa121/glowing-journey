/**
 * Simple in-memory cache with TTL support
 * Stores data with automatic expiration
 */

export interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

export interface CacheConfig {
  ttlMs?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of entries
}

export class Cache<T> {
  private store: Map<string, CacheEntry<T>> = new Map();
  private ttlMs: number;
  private maxSize: number;

  constructor(config: CacheConfig = {}) {
    this.ttlMs = config.ttlMs ?? 5 * 60 * 1000; // 5 minutes default
    this.maxSize = config.maxSize ?? 1000;
    
    // Start cleanup interval (every minute)
    this.startCleanup();
  }

  /**
   * Get value from cache
   */
  get(key: string): T | null {
    const entry = this.store.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if expired
    if (entry.expiresAt < Date.now()) {
      this.store.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * Set value in cache
   */
  set(key: string, value: T, ttlMs?: number): void {
    // Evict oldest entry if cache is full
    if (this.store.size >= this.maxSize) {
      const firstKey = this.store.keys().next().value;
      if (firstKey) {
        this.store.delete(firstKey);
      }
    }

    this.store.set(key, {
      data: value,
      expiresAt: Date.now() + (ttlMs ?? this.ttlMs)
    });
  }

  /**
   * Check if key exists and is not expired
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Delete specific key
   */
  delete(key: string): boolean {
    return this.store.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.store.clear();
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.store.size;
  }

  /**
   * Automatically clean up expired entries every minute
   */
  private startCleanup(): void {
    if (typeof window !== 'undefined') {
      return; // Don't run in browser
    }

    setInterval(() => {
      const now = Date.now();
      let cleaned = 0;

      for (const [key, entry] of this.store.entries()) {
        if (entry.expiresAt < now) {
          this.store.delete(key);
          cleaned++;
        }
      }

      if (cleaned > 0 && process.env.NODE_ENV === 'development') {
        console.log(`[Cache] Cleaned up ${cleaned} expired entries`);
      }
    }, 60 * 1000); // Every minute
  }
}

// Global cache instances
export const articleCache = new Cache<any>({
  ttlMs: 10 * 60 * 1000, // 10 minutes for articles
  maxSize: 500
});

export const searchCache = new Cache<any>({
  ttlMs: 5 * 60 * 1000, // 5 minutes for search results
  maxSize: 200
});

/**
 * Generate cache key for articles list
 */
export function getCacheKeyForArticles(search?: string, tag?: string, page?: number): string {
  const parts = ['articles'];
  if (search) parts.push(`search:${search}`);
  if (tag) parts.push(`tag:${tag}`);
  if (page && page > 1) parts.push(`page:${page}`);
  return parts.join(':');
}

/**
 * Generate cache key for article by slug
 */
export function getCacheKeyForArticle(slug: string): string {
  return `article:${slug}`;
}

/**
 * Generate cache key for search
 */
export function getCacheKeyForSearch(query: string): string {
  return `search:${query.toLowerCase()}`;
}

/**
 * Invalidate article related caches when article is updated
 */
export function invalidateArticleCaches(slug?: string): void {
  if (slug) {
    articleCache.delete(getCacheKeyForArticle(slug));
  }
  // Clear all article list caches on any update
  articleCache.clear();
  searchCache.clear();
}
