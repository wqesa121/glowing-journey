'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains('light'));
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle('light', next);
    document.documentElement.classList.toggle('dark', !next);
    localStorage.setItem('theme', next ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 transition hover:bg-zinc-800"
      aria-label={light ? 'Тёмная тема' : 'Светлая тема'}
      title={light ? 'Тёмная тема' : 'Светлая тема'}
    >
      {light ? '🌙' : '☀️'}
    </button>
  );
}
