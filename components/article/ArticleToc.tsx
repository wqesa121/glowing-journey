import type { TocItem } from '@/lib/tiptapContentHtml';
import { panelInset, muted } from '@/lib/uiStyles';
import { cn } from '@/lib/utils';

type ArticleTocProps = {
  items: TocItem[];
};

export function ArticleToc({ items }: ArticleTocProps) {
  if (items.length < 2) return null;

  return (
    <nav className={cn(panelInset, 'mb-8 p-4')} aria-label="Содержание">
      <p className={cn('mb-3 text-xs font-medium uppercase tracking-wider', muted)}>Содержание</p>
      <ol className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}>
            <a href={`#${item.id}`} className="text-sky-400 transition hover:text-sky-300 hover:underline">
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
