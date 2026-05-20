'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { type ArticleDocument } from '@/models/Article';
import { articleViewHref } from '@/lib/articleDashboardPolicy';
import { tableWrap, tableHead, tableRow, searchInput, tagPill } from '@/lib/uiStyles';
import { isScheduled } from '@/lib/publish';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

type ArticleRow = Pick<ArticleDocument, 'title' | 'slug' | 'status' | 'createdAt' | 'tags'> & {
  _id?: string;
  authorId?: string;
  publishedAt?: string | Date | null;
};

interface ArticleTableProps {
  articles: ArticleRow[];
  currentUserId: string;
  isAdmin: boolean;
}

function formatArticleDate(value: Date | string | undefined) {
  if (value == null) return '—';
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString();
}

export function ArticleTable({ articles, currentUserId, isAdmin }: ArticleTableProps) {
  const [search, setSearch] = useState('');
  const filtered = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.slug.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Поиск по заголовку или slug..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={searchInput}
      />
      <div className={tableWrap}>
        <table className="w-full border-collapse text-left text-sm">
          <thead className={tableHead}>
            <tr>
              <th className="px-6 py-4 font-medium text-zinc-300">Заголовок</th>
              <th className="px-6 py-4 font-medium text-zinc-300">Статус</th>
              <th className="px-6 py-4 font-medium text-zinc-300">Дата</th>
              <th className="px-6 py-4 font-medium text-zinc-300">Теги</th>
              <th className="px-6 py-4 font-medium text-zinc-300">Действия</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                  {articles.length === 0 ? 'Нет статей' : 'Ничего не найдено'}
                </td>
              </tr>
            ) : null}
            {filtered.map((post) => (
              <tr key={post._id ?? post.slug} className={tableRow}>
                <td className="px-6 py-4">
                  <p className="font-medium text-zinc-100">{post.title}</p>
                  <p className="text-xs text-zinc-500">/{post.slug}</p>
                </td>
                <td className="px-6 py-4">
                  <Badge
                    variant={
                      isScheduled(post.status, post.publishedAt)
                        ? 'default'
                        : post.status === 'published'
                          ? 'success'
                          : 'warning'
                    }
                  >
                    {isScheduled(post.status, post.publishedAt)
                      ? 'Запланировано'
                      : post.status === 'published'
                        ? 'Опубликовано'
                        : 'Черновик'}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-zinc-400">{formatArticleDate(post.createdAt)}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {post.tags?.slice(0, 3).map((tag) => (
                      <span key={tag} className={tagPill}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={articleViewHref(post.slug, post.status)}
                      className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
                    >
                      Читать
                    </Link>
                    {(isAdmin || post.authorId === currentUserId) && (
                      <Link href={`/dashboard/articles/${post.slug}`} className={cn(buttonVariants({ size: 'sm' }))}>
                        Редактировать
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
