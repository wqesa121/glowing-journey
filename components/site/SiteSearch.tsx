'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { searchInput, panel } from '@/lib/uiStyles';
import { cn } from '@/lib/utils';

type SearchHit = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  authorName: string;
};

function SiteSearchInner() {
  const router = useRouter();
  const params = useSearchParams();
  const initialQ = params.get('q') ?? '';
  const [query, setQuery] = useState(initialQ);
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(initialQ);
  }, [initialQ]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setHits([]);
      setOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        const data = (await res.json()) as { results: SearchHit[] };
        setHits(data.results ?? []);
        setOpen(true);
      } catch {
        setHits([]);
      } finally {
        setLoading(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const goToFullSearch = () => {
    const q = query.trim();
    setOpen(false);
    router.push(q ? `/?q=${encodeURIComponent(q)}` : '/');
  };

  return (
    <div ref={wrapRef} className="relative min-w-0 flex-1">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goToFullSearch();
        }}
        className="relative"
      >
        <input
          type="search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => hits.length > 0 && setOpen(true)}
          placeholder="Поиск статей…"
          className={searchInput}
          autoComplete="off"
          aria-label="Поиск статей"
          aria-expanded={open}
          aria-controls="search-suggestions"
        />
        {loading ? (
          <span className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-zinc-600 border-t-sky-500" />
        ) : null}
      </form>

      {open && hits.length > 0 ? (
        <ul
          id="search-suggestions"
          className={cn(panel, 'absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-80 overflow-y-auto p-1 shadow-lg')}
          role="listbox"
        >
          {hits.map((hit) => (
            <li key={hit.slug} role="option">
              <Link
                href={`/posts/${hit.slug}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 transition hover:bg-zinc-800"
              >
                <p className="text-sm font-medium text-zinc-100">{hit.title}</p>
                {hit.excerpt ? <p className="mt-0.5 line-clamp-1 text-xs text-zinc-500">{hit.excerpt}</p> : null}
                <p className="mt-1 text-[11px] text-zinc-600">{hit.authorName}</p>
              </Link>
            </li>
          ))}
          <li className="border-t border-zinc-800 p-1">
            <button
              type="button"
              onClick={goToFullSearch}
              className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-sky-400 hover:bg-zinc-800"
            >
              Все результаты →
            </button>
          </li>
        </ul>
      ) : null}
    </div>
  );
}

export function SiteSearch() {
  return (
    <Suspense fallback={<div className="min-w-0 flex-1" />}>
      <SiteSearchInner />
    </Suspense>
  );
}
