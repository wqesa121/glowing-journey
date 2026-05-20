'use client';

import { useEffect, useRef } from 'react';
import { panel } from '@/lib/uiStyles';
import { cn } from '@/lib/utils';

type GiscusCommentsProps = {
  slug: string;
};

export function GiscusComments({ slug }: GiscusCommentsProps) {
  const ref = useRef<HTMLDivElement>(null);

  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  useEffect(() => {
    if (!ref.current || !repo || !repoId || !categoryId) return;

    ref.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category ?? 'General');
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-term', `/posts/${slug}`);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
    script.setAttribute('data-lang', 'ru');

    ref.current.appendChild(script);
  }, [slug, repo, repoId, category, categoryId]);

  if (!repo || !repoId || !categoryId) {
    return null;
  }

  return (
    <section className={cn(panel, 'mt-8 p-4 sm:p-6')}>
      <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">Комментарии</h2>
      <div ref={ref} />
    </section>
  );
}
