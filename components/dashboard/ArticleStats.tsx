import { panelInset, eyebrow } from '@/lib/uiStyles';
import { cn } from '@/lib/utils';

type ArticleStatsProps = {
  total: number;
  published: number;
  drafts: number;
};

export function ArticleStats({ total, published, drafts }: ArticleStatsProps) {
  const items = [
    { label: 'Всего', value: total },
    { label: 'Опубликовано', value: published, accent: 'text-emerald-400' },
    { label: 'Черновики', value: drafts, accent: 'text-amber-400' }
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className={cn(panelInset, 'px-4 py-3')}>
          <p className={eyebrow}>{item.label}</p>
          <p className={cn('mt-1 text-2xl font-semibold tabular-nums text-zinc-50', item.accent)}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}
