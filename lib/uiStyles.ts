/** Плоская тёмная дизайн-система NeuraCMS — без градиентов, акцент на читаемость */

import { cn } from '@/lib/utils';

export const pageBackground = 'min-h-screen bg-zinc-950 text-zinc-100 antialiased';

export const pageGrid =
  'mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:gap-10';

export const panel =
  'rounded-2xl border border-zinc-800/90 bg-zinc-900/70 shadow-sm ring-1 ring-zinc-800/40';

export const panelHeader = 'border-b border-zinc-800 bg-zinc-900/90';

export const panelInset = 'rounded-xl border border-zinc-800 bg-zinc-950/80';

export const heading = 'text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl';

export const headingSm = 'text-lg font-semibold tracking-tight text-zinc-50';

export const eyebrow = 'text-xs font-medium uppercase tracking-[0.2em] text-zinc-500';

export const muted = 'text-zinc-400';

export const body = 'text-[15px] leading-relaxed text-zinc-300';

export const accent = 'text-sky-400';

export const accentLink = 'font-medium text-sky-400 underline-offset-2 transition hover:text-sky-300 hover:underline';

export const navLink =
  'rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-zinc-50';

export const headerBar =
  'sticky top-0 z-50 border-b border-zinc-800/90 bg-zinc-950/95 backdrop-blur-md';

export const searchInput =
  'h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/25';

export const tagPill =
  'rounded-md border border-zinc-700 bg-zinc-800/60 px-2 py-0.5 text-[11px] font-medium text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-100';

export const tagPillAccent =
  'rounded-md bg-sky-500/10 px-2 py-0.5 text-xs font-medium text-sky-400 ring-1 ring-sky-500/25';

export const tableWrap = 'overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 shadow-sm';

export const tableHead = 'border-b border-zinc-800 bg-zinc-950/90';

export const tableRow = 'border-b border-zinc-800/80 transition hover:bg-zinc-800/30';

export const proseClass =
  'article-prose outline-none text-[17px] leading-[1.7] text-zinc-300 [&_a]:font-medium [&_a]:text-sky-400 [&_a]:underline [&_a]:underline-offset-2 [&_blockquote]:border-l-[3px] [&_blockquote]:border-zinc-600 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-zinc-500 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-zinc-50 [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-zinc-50 [&_h3]:mb-2 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-zinc-100 [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mb-4 [&_strong]:font-semibold [&_strong]:text-zinc-100 [&_ul]:list-disc';

export const editorToolbar =
  'flex flex-wrap gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950 p-2';

export const editorSurface =
  'min-h-[420px] rounded-xl border border-zinc-800 bg-zinc-950/80 p-5 text-zinc-200';

export const formPanel = cn(panel, 'p-6 sm:p-8');

export const selectInput =
  'mt-2 flex h-11 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 focus:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/25';

export const navLinkActive = 'bg-zinc-800 text-zinc-50 ring-1 ring-zinc-700';

/** Узкая колонка для комфортного чтения статьи */
export const articleColumn = 'mx-auto w-full max-w-[42rem]';

export const articleMeta = 'flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500';
