import { redirect } from 'next/navigation';
import connectMongoose from '@/lib/mongoose';
import Article from '@/models/Article';

type ReadRedirectProps = {
  params: Promise<{ slug: string }>;
};

/** Старый URL предпросмотра в панели — ведём на публичную или preview-страницу. */
export default async function LegacyReadRedirect(props: ReadRedirectProps) {
  const params = await props.params;
  await connectMongoose();
  const article = (await Article.findOne({ slug: params.slug }).lean()) as { status?: string } | null;

  if (!article) {
    redirect('/dashboard/articles');
  }

  if (article.status === 'published') {
    redirect(`/posts/${params.slug}`);
  }

  redirect(`/dashboard/articles/${params.slug}?preview=1`);
}
