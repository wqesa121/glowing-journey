import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectMongoose from '@/lib/mongoose';
import Article from '@/models/Article';
import { ArticleEditor } from '@/components/dashboard/ArticleEditor';
import { AIForm } from '@/components/dashboard/AIForm';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { slugify, cn } from '@/lib/utils';
import { canManageDashboardArticle, normalizeAuthorId, articleViewHref } from '@/lib/articleDashboardPolicy';
import Link from 'next/link';
import { ArticleBody } from '@/components/article/ArticleBody';
import { Badge } from '@/components/ui/badge';
import { formPanel, eyebrow, heading, selectInput } from '@/lib/uiStyles';
import { parsePublishedAt, formatDatetimeLocal, isScheduled } from '@/lib/publish';

async function updateArticleAction(formData: FormData) {
  'use server';
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  if (!user?.id) {
    redirect('/signin');
  }

  const articleId = formData.get('articleId')?.toString();
  const title = formData.get('title')?.toString() ?? '';
  const slug = formData.get('slug')?.toString() ?? slugify(title);
  const metaTitle = formData.get('metaTitle')?.toString() ?? title;
  const metaDescription = formData.get('metaDescription')?.toString() ?? '';
  const content = formData.get('content')?.toString() ?? '';
  const excerpt = formData.get('excerpt')?.toString() ?? '';
  const tags = formData.get('tags')?.toString().split(',').map((tag) => tag.trim()).filter(Boolean) ?? [];
  const featuredImage = formData.get('featuredImage')?.toString() ?? '';
  const additionalImages = formData.get('additionalImages')?.toString().split(',').map((src) => src.trim()).filter(Boolean) ?? [];
  const status = (formData.get('status')?.toString().toLowerCase() ?? 'draft') as 'draft' | 'published';
  const publishedAtRaw = formData.get('publishedAt')?.toString();
  const publishedAt = parsePublishedAt(publishedAtRaw);

  if (!articleId) {
    redirect('/dashboard/articles');
  }

  await connectMongoose();
  const existing = await Article.findById(articleId).lean() as any;
  if (!existing) {
    redirect('/dashboard/articles');
  }
  const authorId = normalizeAuthorId(existing);
  if (!canManageDashboardArticle(authorId, user.id, user.role)) {
    redirect('/dashboard/articles');
  }

  const update: Record<string, unknown> = {
    title,
    slug,
    metaTitle,
    metaDescription,
    content,
    excerpt,
    tags,
    featuredImage: featuredImage || undefined,
    additionalImages,
    status
  };
  if (publishedAtRaw?.trim()) {
    update.publishedAt = publishedAt ?? null;
  } else {
    update.$unset = { publishedAt: 1 };
  }
  await Article.findByIdAndUpdate(articleId, update);

  revalidatePath('/dashboard', 'layout');
  revalidatePath('/dashboard/articles');
  revalidatePath(`/posts/${existing.slug}`);
  if (slug !== existing.slug) {
    revalidatePath(`/posts/${slug}`);
  }
  revalidatePath('/');

  redirect('/dashboard/articles');
}

async function deleteArticleAction(formData: FormData) {
  'use server';
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  if (!user?.id) {
    redirect('/signin');
  }

  const articleId = formData.get('articleId')?.toString();
  if (!articleId) {
    redirect('/dashboard/articles');
  }

  await connectMongoose();
  const existing = await Article.findById(articleId).lean() as any;
  if (!existing) {
    redirect('/dashboard/articles');
  }
  const authorId = normalizeAuthorId(existing);
  if (!canManageDashboardArticle(authorId, user.id, user.role)) {
    redirect('/dashboard/articles');
  }

  await Article.findByIdAndDelete(articleId);

  revalidatePath('/dashboard', 'layout');
  revalidatePath('/dashboard/articles');
  revalidatePath(`/posts/${existing.slug}`);
  revalidatePath('/');

  redirect('/dashboard/articles');
}

type EditArticlePageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
};

export default async function EditArticlePage(props: EditArticlePageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const isPreview = searchParams.preview === '1';
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/signin');
  }

  await connectMongoose();
  const article = await Article.findOne({ slug: params.slug }).lean() as any;
  if (!article) {
    redirect('/dashboard/articles');
  }

  const user = session.user as any;
  const authorId = normalizeAuthorId(article);
  if (!canManageDashboardArticle(authorId, user.id, user.role)) {
    redirect(articleViewHref(params.slug, article.status));
  }

  if (isPreview) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <Badge
              variant={
                isScheduled(article.status, article.publishedAt)
                  ? 'default'
                  : article.status === 'published'
                    ? 'success'
                    : 'warning'
              }
            >
              {isScheduled(article.status, article.publishedAt)
                ? 'Запланировано'
                : article.status === 'published'
                  ? 'Опубликовано'
                  : 'Черновик'}
            </Badge>
            <h1 className={heading}>{article.title}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={`/dashboard/articles/${params.slug}`} className={cn(buttonVariants({ variant: 'secondary' }))}>
              Редактировать
            </Link>
            {article.status === 'published' ? (
              <Link href={`/posts/${params.slug}`} className={cn(buttonVariants())}>
                На сайте
              </Link>
            ) : null}
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6">
          <ArticleBody content={typeof article.content === 'string' ? article.content : ''} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className={eyebrow}>Редактировать статью</p>
          <h1 className={heading}>{article.title}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={articleViewHref(params.slug, article.status)}
            className={cn(buttonVariants({ variant: 'secondary' }))}
          >
            Просмотр
          </Link>
          <form action={deleteArticleAction} className="inline-flex">
            <input type="hidden" name="articleId" value={article._id.toString()} />
            <Button type="submit" variant="destructive">Удалить</Button>
          </form>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <form action={updateArticleAction} className={cn(formPanel, 'space-y-6')}>
          <input type="hidden" name="articleId" value={article._id.toString()} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="title">Заголовок</Label>
              <Input id="title" name="title" defaultValue={article.title} required />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" defaultValue={article.slug} required />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="metaTitle">Мета-заголовок</Label>
              <Input id="metaTitle" name="metaTitle" defaultValue={article.metaTitle} required />
            </div>
            <div>
              <Label htmlFor="metaDescription">Мета-описание</Label>
              <Textarea id="metaDescription" name="metaDescription" defaultValue={article.metaDescription} required rows={4} />
            </div>
          </div>

          <div>
            <Label htmlFor="excerpt">Краткое описание</Label>
            <Textarea id="excerpt" name="excerpt" defaultValue={article.excerpt} rows={4} />
          </div>

          <div>
            <Label htmlFor="content">Содержимое</Label>
            <input id="contentInput" type="hidden" name="content" defaultValue={article.content} />
            <ArticleEditor content={article.content} inputId="contentInput" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="tags">Теги</Label>
              <Input id="tags" name="tags" defaultValue={article.tags?.join(', ')} />
            </div>
            <div>
              <Label htmlFor="featuredImage">URL главного изображения</Label>
              <Input id="featuredImage" name="featuredImage" defaultValue={article.featuredImage ?? ''} />
            </div>
          </div>

          <div>
            <Label htmlFor="additionalImages">Дополнительные URL изображений</Label>
            <Textarea id="additionalImages" name="additionalImages" defaultValue={article.additionalImages?.join(', ')} rows={3} />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Label htmlFor="status">Статус</Label>
              <select id="status" name="status" defaultValue={article.status} className={selectInput}>
                <option value="draft">Черновик</option>
                <option value="published">Опубликовано</option>
              </select>
              <div className="mt-4">
                <Label htmlFor="publishedAt">Дата публикации (необязательно)</Label>
                <Input
                  id="publishedAt"
                  name="publishedAt"
                  type="datetime-local"
                  className="mt-1.5"
                  defaultValue={formatDatetimeLocal(article.publishedAt)}
                />
              </div>
            </div>
            <Button type="submit">Сохранить изменения</Button>
          </div>
        </form>

        <div className="space-y-6">
          <AIForm
            fieldIds={{
              title: 'title',
              slug: 'slug',
              metaTitle: 'metaTitle',
              metaDescription: 'metaDescription',
              excerpt: 'excerpt',
              tags: 'tags',
              featuredImage: 'featuredImage',
              content: 'contentInput'
            }}
          />
        </div>
      </div>
    </div>
  );
}
