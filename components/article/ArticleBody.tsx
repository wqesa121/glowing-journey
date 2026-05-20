import { ArticleToc } from '@/components/article/ArticleToc';
import { proseClass, articleColumn } from '@/lib/uiStyles';
import { extractToc, tiptapJsonToHtml } from '@/lib/tiptapContentHtml';
import { cn } from '@/lib/utils';

type ArticleBodyProps = {
  content: string;
};

export function ArticleBody({ content }: ArticleBodyProps) {
  const toc = extractToc(content);
  const html = tiptapJsonToHtml(content);

  if (!html) {
    return <p className="text-zinc-500">Нет содержимого.</p>;
  }

  return (
    <div className={articleColumn}>
      <ArticleToc items={toc} />
      <div className={cn('article-prose', proseClass)} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
