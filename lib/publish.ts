export function parsePublishedAt(value: string | null | undefined): Date | undefined {
  if (!value?.trim()) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export function formatDatetimeLocal(value?: Date | string | null): string {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function isScheduled(status: string, publishedAt?: Date | string | null): boolean {
  if (status !== 'published' || !publishedAt) return false;
  const date = publishedAt instanceof Date ? publishedAt : new Date(publishedAt);
  return !Number.isNaN(date.getTime()) && date.getTime() > Date.now();
}

export const publicVisibilityFilter = {
  $or: [{ publishedAt: { $exists: false } }, { publishedAt: null }, { publishedAt: { $lte: new Date() } }]
};
