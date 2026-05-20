'use client';

import { useMemo } from 'react';
import { slugify } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SlugGeneratorProps {
  title: string;
  slug: string;
  onSlugChange: (slug: string) => void;
}

export function SlugGenerator({ title, slug, onSlugChange }: SlugGeneratorProps) {
  const suggestions = useMemo(() => {
    if (!title.trim()) return [];
    
    const words = title.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];
    
    const suggestions = new Set<string>();

    // Полный slug
    suggestions.add(slugify(title));

    // Первые 2 слова
    if (words.length >= 2) {
      suggestions.add(slugify(words.slice(0, 2).join(' ')));
    }

    // Первые 3 слова
    if (words.length >= 3) {
      suggestions.add(slugify(words.slice(0, 3).join(' ')));
    }

    // Первые 4 слова
    if (words.length >= 4) {
      suggestions.add(slugify(words.slice(0, 4).join(' ')));
    }

    // Первые 5 слов
    if (words.length >= 5) {
      suggestions.add(slugify(words.slice(0, 5).join(' ')));
    }

    // Первое и последнее слово
    if (words.length >= 2) {
      suggestions.add(slugify(`${words[0]}-${words[words.length - 1]}`));
    }

    return Array.from(suggestions)
      .filter(s => s.length > 0)
      .sort((a, b) => a.length - b.length);
  }, [title]);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          value={slug}
          onChange={(e) => onSlugChange(e.target.value)}
          placeholder="auto-generated-slug"
          className="mt-1"
        />
      </div>

      {suggestions.length > 0 && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-400">
              Готовые варианты ({suggestions.length})
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => onSlugChange(suggestion)}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  slug === suggestion
                    ? 'bg-sky-600 text-white'
                    : 'border border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-sky-500 hover:bg-sky-950 hover:text-sky-300'
                }`}
              >
                <span>{suggestion}</span>
                {slug === suggestion && (
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
          <p className="text-xs text-zinc-500 pt-1">
            Нажмите на любой вариант, чтобы выбрать
          </p>
        </div>
      )}
    </div>
  );
}
