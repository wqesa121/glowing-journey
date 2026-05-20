'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

type ShareArticleActionsProps = {
  title: string;
  slug: string;
};

export function ShareArticleActions({ title, slug }: ShareArticleActionsProps) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== 'undefined' ? `${window.location.origin}/posts/${slug}` : `/posts/${slug}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const shareNative = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      await navigator.share({ title, url });
    } else {
      await copyLink();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button type="button" variant="secondary" size="sm" onClick={copyLink}>
        {copied ? 'Ссылка скопирована' : 'Копировать ссылку'}
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={shareNative}>
        Поделиться
      </Button>
    </div>
  );
}
