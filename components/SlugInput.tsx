'use client';

import { useEffect, useState } from 'react';
import { SlugGenerator } from '@/components/SlugGenerator';

interface SlugInputProps {
  titleInputId: string;
  slugInputId: string;
}

export function SlugInput({ titleInputId, slugInputId }: SlugInputProps) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const titleInput = document.getElementById(titleInputId) as HTMLInputElement;
    const slugInput = document.getElementById(slugInputId) as HTMLInputElement;

    if (!titleInput || !slugInput) {
      console.warn(`Inputs not found: ${titleInputId}, ${slugInputId}`);
      return;
    }

    // Инициальные значения
    setTitle(titleInput.value);
    setSlug(slugInput.value);
    setIsReady(true);

    // Синхронизируем значения при изменении
    const handleTitleChange = () => {
      setTitle(titleInput.value);
    };

    const handleSlugChange = () => {
      setSlug(slugInput.value);
    };

    titleInput.addEventListener('input', handleTitleChange);
    slugInput.addEventListener('input', handleSlugChange);

    return () => {
      titleInput.removeEventListener('input', handleTitleChange);
      slugInput.removeEventListener('input', handleSlugChange);
    };
  }, [titleInputId, slugInputId]);

  const handleSlugChange = (newSlug: string) => {
    setSlug(newSlug);
    const slugInput = document.getElementById(slugInputId) as HTMLInputElement;
    if (slugInput) {
      slugInput.value = newSlug;
      // Триггерим события для синхронизации с формой
      slugInput.dispatchEvent(new Event('input', { bubbles: true }));
      slugInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  if (!isReady) {
    return null;
  }

  return <SlugGenerator title={title} slug={slug} onSlugChange={handleSlugChange} />;
}
