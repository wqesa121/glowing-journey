import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectMongoose from '@/lib/mongoose';
import Article from '@/models/Article';
import mongoose from 'mongoose';
import { ArticleEditor } from '@/components/dashboard/ArticleEditor';
import { AIForm } from '@/components/dashboard/AIForm';
import { SlugInput } from '@/components/SlugInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { slugify } from '@/lib/utils';
import { parsePublishedAt } from '@/lib/publish';
import { formPanel, eyebrow, heading, selectInput } from '@/lib/uiStyles';
import { cn } from '@/lib/utils';

/** Подбирает slug, которого ещё нет в коллекции (уникальный индекс). */
async function allocateUniqueSlug(desired: string, title: string): Promise<string> {
  const base = (() => {
    const b = desired.trim() || slugify(title);
    return b || 'article';
  })();

  for (let n = 0; n < 1000; n += 1) {
    const candidate = n === 0 ? base : `${base}-${n + 1}`;
    const taken = await Article.exists({ slug: candidate });
    if (!taken) {
      return candidate;
    }
  }
  return `${base}-${Date.now().toString(36)}`;
}

async function createArticleAction(formData: FormData) {
  'use server';
  const session = await getServerSession(authOptions);
  const user = session?.user as any;
  if (!session?.user?.email || !user?.id) {
    redirect('/signin');
  }

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
  const publishedAt = parsePublishedAt(formData.get('publishedAt')?.toString());

  await connectMongoose();

  if (!mongoose.Types.ObjectId.isValid(user.id)) {
    redirect('/signin');
  }

  let uniqueSlug = await allocateUniqueSlug(slug, title);

  const payload = {
    title,
    slug: uniqueSlug,
    metaTitle,
    metaDescription,
    content,
    excerpt,
    tags,
    featuredImage: featuredImage || undefined,
    additionalImages,
    author: {
      id: new mongoose.Types.ObjectId(user.id),
      name: user.name ?? user.email,
      email: user.email
    },
    status,
    ...(publishedAt ? { publishedAt } : {})
  };

  try {
    await Article.create(payload);
  } catch (err: unknown) {
    const code = err && typeof err === 'object' && 'code' in err ? (err as { code?: number }).code : undefined;
    if (code === 11000) {
      uniqueSlug = await allocateUniqueSlug(`${uniqueSlug}-${Date.now().toString(36)}`, title);
      await Article.create({ ...payload, slug: uniqueSlug });
    } else {
      throw err;
    }
  }

  revalidatePath('/dashboard', 'layout');
  revalidatePath('/dashboard/articles');
  revalidatePath(`/posts/${uniqueSlug}`);
  revalidatePath('/');

  redirect('/dashboard/articles');
}

export default async function NewArticlePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/signin');
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className={eyebrow}>Студия</p>
          <h1 className={heading}>Новая статья</h1>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <form action={createArticleAction} className={cn(formPanel, 'space-y-6')}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="title">Заголовок</Label>
              <Input id="title" name="title" placeholder="Заголовок статьи" required />
            </div>
            <SlugInput titleInputId="title" slugInputId="slug" />
          </div>

          <input id="slug" name="slug" type="hidden" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="metaTitle">Meta заголовок</Label>
              <Input id="metaTitle" name="metaTitle" placeholder="SEO meta заголовок" required />
            </div>
            <div>
              <Label htmlFor="metaDescription">Meta описание</Label>
              <Textarea id="metaDescription" name="metaDescription" placeholder="150-160 символов" required rows={4} />
            </div>
          </div>

          <div>
            <Label htmlFor="excerpt">Краткое описание</Label>
            <Textarea id="excerpt" name="excerpt" placeholder="Краткое резюме для списка" rows={4} />
          </div>

          <div>
            <Label htmlFor="content">Контент</Label>
            <input id="contentInput" type="hidden" name="content" defaultValue="" />
            <ArticleEditor content="" inputId="contentInput" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="tags">Теги</Label>
              <Input id="tags" name="tags" placeholder="marketing, ai, seo" />
            </div>
            <div>
              <Label htmlFor="featuredImage">URL изображения</Label>
              <Input id="featuredImage" name="featuredImage" placeholder="https://images.unsplash.com/..." />
            </div>
          </div>

          <div>
            <Label htmlFor="additionalImages">Дополнительные изображения</Label>
            <Textarea id="additionalImages" name="additionalImages" placeholder="URL через запятую" rows={3} />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Label htmlFor="status">Статус</Label>
              <select id="status" name="status" className={selectInput}>
                <option value="draft">Черновик</option>
                <option value="published">Опубликовано</option>
              </select>
              <div className="mt-4">
                <Label htmlFor="publishedAt">Дата публикации (необязательно)</Label>
                <Input id="publishedAt" name="publishedAt" type="datetime-local" className="mt-1.5" />
                <p className="mt-1 text-xs text-zinc-500">
                  Пусто — сразу на сайте. Будущая дата скроет статью до указанного времени.
                </p>
              </div>
            </div>
            <Button type="submit">Создать статью</Button>
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
