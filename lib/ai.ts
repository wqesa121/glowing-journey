const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? 'qwen2.5:7b';

function buildPrompt(values: {
  topic: string;
  keywords?: string;
  length: string;
  tone: string;
  audience?: string;
}) {
  const { topic, keywords, length, tone, audience } = values;
  const keywordList = keywords ? keywords.split(',').map((item) => item.trim()).filter(Boolean).join(', ') : 'нет';
  return `Создай полную, оптимизированную для SEO статью для CMS на русском языке.

Тема: ${topic}
Ключевые слова: ${keywordList}
Желаемый объем: ${length}
Тон: ${tone}
Целевая аудитория: ${audience ?? 'Общая аудитория'}

Верни ответ в виде JSON с точной следующей структурой:
{
  "title": "...",
  "metaTitle": "...",
  "metaDescription": "...",
  "slug": "...",
  "excerpt": "...",
  "content": "...", 
  "tags": ["..."],
  "imageQuery": "..."
}

Поле content должно быть форматировано в Markdown с заголовками, списками, жирным текстом и четкой структурой. Убедись что metaDescription содержит 150-160 символов. Используй 10-15 релевантных тегов. Создай чистый URL-friendly slug.`;
}

export type GeneratedArticleResult = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  imageQuery: string;
};

export async function generateArticleDraft(values: {
  topic: string;
  keywords?: string;
  length: string;
  tone: string;
  audience?: string;
}): Promise<GeneratedArticleResult> {
  const prompt = buildPrompt(values);

  try {
    console.log('[AI] Sending request to Ollama:', { model: OLLAMA_MODEL, url: OLLAMA_BASE_URL });
    
    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: prompt,
        stream: false,
        temperature: 0.3,
        num_predict: 800,
        top_p: 0.9,
        top_k: 40,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[AI] Ollama API error:', response.statusText, errorText);
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[AI] Received response from Ollama, response length:', data.response?.length || 0);
    
    const text = data.response?.trim() || '';

    if (!text) {
      console.error('[AI] Empty response from Ollama');
      throw new Error('Empty response from Ollama');
    }

    // Extract JSON from response (model might return extra text)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('[AI] Could not find JSON in response:', text.substring(0, 500));
      throw new Error('Response does not contain valid JSON');
    }

    // Clean JSON: remove control characters and fix newlines in strings
    let jsonStr = jsonMatch[0];
    jsonStr = jsonStr.replace(/[\n\r\t]/g, ' '); // Replace newlines and tabs with space
    jsonStr = jsonStr.replace(/\\n/g, '\\n'); // Ensure escaped newlines are preserved
    
    console.log('[AI] Raw JSON before parse (first 500 chars):', jsonStr.substring(0, 500));
    
    const payload = JSON.parse(jsonStr);
    console.log('[AI] Successfully parsed JSON response');
    console.log('[AI] Content field length:', payload.content?.length || 0);
    
    return {
      title: payload.title || 'Untitled',
      metaTitle: payload.metaTitle || payload.title || 'Untitled',
      metaDescription: payload.metaDescription || '',
      slug: payload.slug || '',
      excerpt: payload.excerpt || '',
      content: payload.content || '## No content generated\n\nThe AI model did not generate content for this article. Please edit and add content manually.',
      tags: Array.isArray(payload.tags) ? payload.tags.slice(0, 15) : [],
      imageQuery: payload.imageQuery || values.topic
    };
  } catch (error) {
    console.error('[AI] Error generating article:', error);
    if (error instanceof SyntaxError) {
      throw new Error('Unable to parse AI response. Ensure the model returns valid JSON.');
    }
    if (error instanceof Error && error.message.includes('fetch')) {
      throw new Error(`Cannot connect to Ollama at ${OLLAMA_BASE_URL}. Make sure Ollama is running.`);
    }
    throw error;
  }
}

export async function fetchUnsplashImages(query: string) {
  if (!process.env.UNSPLASH_ACCESS_KEY || process.env.UNSPLASH_ACCESS_KEY.includes('your-')) {
    console.log('[AI] Unsplash API key not configured, skipping image fetch');
    return [];
  }

  const searchParams = new URLSearchParams({
    query,
    orientation: 'landscape',
    per_page: '6'
  });

  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?${searchParams.toString()}`, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });

    if (!response.ok) {
      console.warn('[AI] Unsplash API error:', response.status, response.statusText);
      return [];
    }

    const json = await response.json();
    return (json.results ?? []).map((image: any) => ({
      id: image.id,
      alt: image.alt_description || query,
      url: image.urls?.regular,
      authorName: image.user?.name,
      authorLink: image.user?.links?.html
    }));
  } catch (error) {
    console.warn('[AI] Unsplash fetch error:', error);
    return [];
  }
}

export function insertImagesIntoContent(content: string, images: any[]): string {
  if (!images || images.length === 0) return content;

  const paragraphs = content.split('\n\n');
  
  // Insert images at different points in the content
  if (images.length >= 1 && paragraphs.length > 2) {
    // Insert first image after 2nd paragraph
    const imageMarkdown1 = `![${images[0].alt}](${images[0].url})`;
    paragraphs.splice(2, 0, imageMarkdown1);
  }
  
  if (images.length >= 2 && paragraphs.length > 5) {
    // Insert second image after 5th paragraph
    const imageMarkdown2 = `![${images[1].alt}](${images[1].url})`;
    paragraphs.splice(5, 0, imageMarkdown2);
  }
  
  if (images.length >= 3 && paragraphs.length > 8) {
    // Insert third image after 8th paragraph
    const imageMarkdown3 = `![${images[2].alt}](${images[2].url})`;
    paragraphs.splice(8, 0, imageMarkdown3);
  }

  return paragraphs.join('\n\n');
}
