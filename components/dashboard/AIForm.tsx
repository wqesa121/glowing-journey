'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { panel, panelInset, eyebrow, headingSm, body, accent } from '@/lib/uiStyles';
import { cn } from '@/lib/utils';

interface AIFormProps {
  fieldIds: {
    title: string;
    slug: string;
    metaTitle: string;
    metaDescription: string;
    excerpt: string;
    tags: string;
    featuredImage: string;
    content: string;
  };
}

type GeneratedImage = {
  id: string;
  alt: string;
  url: string;
  authorName: string;
  authorLink: string;
};

const TONE_OPTIONS = [
  { value: 'Профессиональный', label: 'Профессиональный' },
  { value: 'Информативный', label: 'Информативный' },
  { value: 'Дружелюбный', label: 'Дружелюбный' },
  { value: 'Академический', label: 'Академический' },
  { value: 'Консультативный', label: 'Консультативный' },
  { value: 'Креативный', label: 'Креативный' },
];

const LENGTH_OPTIONS = [
  { value: '500 слов', label: '500 слов' },
  { value: '1000 слов', label: '1000 слов' },
  { value: '1500 слов', label: '1500 слов' },
  { value: '2000 слов', label: '2000 слов' },
];

const AUDIENCE_OPTIONS = [
  { value: 'Специалисты маркетинга', label: 'Специалисты маркетинга' },
  { value: 'Разработчики', label: 'Разработчики' },
  { value: 'Предприниматели', label: 'Предприниматели' },
  { value: 'Общая аудитория', label: 'Общая аудитория' },
  { value: 'Студенты', label: 'Студенты' },
];

export function AIForm({ fieldIds }: AIFormProps) {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [length, setLength] = useState('1000 слов');
  const [tone, setTone] = useState('Профессиональный');
  const [audience, setAudience] = useState('Специалисты маркетинга');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<GeneratedImage[]>([]);

  const setFieldValue = (id: string, value: string) => {
    const element = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null;
    if (!element) return;
    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const setContentField = (id: string, markdownContent: string) => {
    // For TipTap editor, set content to the hidden input field
    // The editor will update when it detects the change
    const element = document.getElementById(id) as HTMLInputElement | null;
    if (!element) {
      console.warn('[AIForm] Content field not found:', id);
      return;
    }
    
    console.log('[AIForm] Setting content field, length:', markdownContent.length);
    
    // Just set the value directly - TipTap's useEffect will pick it up
    element.value = markdownContent;
    
    // Dispatch input event to trigger TipTap's content update
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topic, keywords, length, tone, audience })
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result?.message || 'AI generation failed.');
        setLoading(false);
        return;
      }

      setFieldValue(fieldIds.title, result.title);
      setFieldValue(fieldIds.slug, result.slug);
      setFieldValue(fieldIds.metaTitle, result.metaTitle);
      setFieldValue(fieldIds.metaDescription, result.metaDescription);
      setFieldValue(fieldIds.excerpt, result.excerpt);
      setFieldValue(fieldIds.tags, (result.tags ?? []).join(', '));
      setContentField(fieldIds.content, result.content);
      if (result.images?.length) {
        setImages(result.images);
        setFieldValue(fieldIds.featuredImage, result.images[0].url);
      }
    } catch (err) {
      setError('Ошибка AI запроса. Проверьте учетные данные.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn(panel, 'p-8 max-w-4xl')}>
      <div className="mb-8 space-y-3">
        <div className="inline-block rounded-full bg-blue-500/10 px-3 py-1">
          <p className={cn(eyebrow, 'text-blue-400')}>✨ AI Ассистент</p>
        </div>
        <h2 className={cn(headingSm, 'text-2xl')}>Генерировать статью с помощью AI</h2>
        <p className={cn('text-sm leading-6 text-zinc-400')}>Заполните форму и ассистент автоматически создаст полноценную SEO-оптимизированную статью с метаданными, контентом, тегами и подбором изображений.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Основная тема */}
        <div>
          <Label htmlFor="topic" className="block font-medium text-zinc-200 mb-2">
            Основная тема статьи *
          </Label>
          <Input 
            id="topic" 
            placeholder="Например: будущее систем управления контентом"
            value={topic} 
            onChange={(event) => setTopic(event.target.value)} 
            required 
            className="bg-zinc-900 border-zinc-700 focus:border-blue-500 focus:ring-blue-500/30"
          />
        </div>

        {/* Ключевые слова */}
        <div>
          <Label htmlFor="keywords" className="block font-medium text-zinc-200 mb-2">
            Ключевые слова (через запятую)
          </Label>
          <Input 
            id="keywords" 
            placeholder="CMS, управление контентом, маркетинг..."
            value={keywords} 
            onChange={(event) => setKeywords(event.target.value)} 
            className="bg-zinc-900 border-zinc-700 focus:border-blue-500 focus:ring-blue-500/30"
          />
        </div>

        {/* Сетка параметров */}
        <div className="grid gap-6 grid-cols-1">
          {/* Длина статьи */}
          <div>
            <Label className="block font-medium text-zinc-200 mb-3">Объем статьи</Label>
            <select 
              value={length} 
              onChange={(event) => setLength(event.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border-2 border-zinc-600 rounded-lg text-white text-base font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition hover:border-blue-500 cursor-pointer"
              style={{ colorScheme: 'dark' }}
            >
              {LENGTH_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Тон голоса */}
          <div>
            <Label className="block font-medium text-zinc-200 mb-3">Тон голоса</Label>
            <select 
              value={tone} 
              onChange={(event) => setTone(event.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border-2 border-zinc-600 rounded-lg text-white text-base font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition hover:border-blue-500 cursor-pointer"
              style={{ colorScheme: 'dark' }}
            >
              {TONE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Целевая аудитория */}
          <div>
            <Label className="block font-medium text-zinc-200 mb-3">Целевая аудитория</Label>
            <select 
              value={audience} 
              onChange={(event) => setAudience(event.target.value)}
              className="w-full px-4 py-3 bg-zinc-800 border-2 border-zinc-600 rounded-lg text-white text-base font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition hover:border-blue-500 cursor-pointer"
              style={{ colorScheme: 'dark' }}
            >
              {AUDIENCE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Ошибка */}
        {error ? (
          <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-4">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        ) : null}

        {/* Кнопка */}
        <Button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 font-semibold text-lg transition"
        >
          {loading ? '⏳ Генерируется статья...' : '✨ Генерировать с AI'}
        </Button>
      </form>

      {/* Изображения */}
      {images.length > 0 ? (
        <div className="mt-8 space-y-4">
          <div>
            <p className="text-sm font-semibold text-zinc-200">📸 Предложенные изображения</p>
            <p className="text-xs text-zinc-500 mt-1">Нажмите на изображение чтобы установить его как основное</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {images.map((image) => (
              <button
                type="button"
                key={image.id}
                onClick={() => setFieldValue(fieldIds.featuredImage, image.url)}
                className={cn(panelInset, 'group overflow-hidden transition hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20')}
              >
                <img src={image.url} alt={image.alt} className="h-40 w-full object-cover transition duration-200 group-hover:scale-105" />
                <div className="p-3 text-left">
                  <p className="text-xs font-semibold text-zinc-200 truncate">{image.authorName}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
