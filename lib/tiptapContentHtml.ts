/** Лёгкий рендер TipTap JSON → HTML (StarterKit) без клиентского редактора. */

export type TocItem = { id: string; text: string; level: number };

type TipTapNode = {
  type?: string;
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: { type: string; attrs?: Record<string, unknown> }[];
  content?: TipTapNode[];
};

const usedIds = new Set<string>();

function slugifyHeading(text: string): string {
  const base = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
  let id = base || 'section';
  let n = 1;
  while (usedIds.has(id)) {
    id = `${base}-${n++}`;
  }
  usedIds.add(id);
  return id;
}

function nodeText(node: TipTapNode): string {
  if (node.text) return node.text;
  return node.content?.map(nodeText).join('') ?? '';
}

export function extractToc(content: string): TocItem[] {
  usedIds.clear();
  let doc: TipTapNode;
  try {
    doc = JSON.parse(content) as TipTapNode;
  } catch {
    return [];
  }

  const items: TocItem[] = [];

  const walk = (nodes?: TipTapNode[]) => {
    nodes?.forEach((node) => {
      if (node.type === 'heading') {
        const level = Math.min(3, Math.max(1, Number(node.attrs?.level ?? 2)));
        const text = nodeText(node).trim();
        if (text) items.push({ id: slugifyHeading(text), text, level });
      }
      walk(node.content);
    });
  };

  walk(doc.content);
  return items;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function applyMarks(text: string, marks?: TipTapNode['marks']): string {
  if (!marks?.length) return text;
  let out = text;
  for (const mark of marks) {
    switch (mark.type) {
      case 'bold':
        out = `<strong>${out}</strong>`;
        break;
      case 'italic':
        out = `<em>${out}</em>`;
        break;
      case 'code':
        out = `<code>${out}</code>`;
        break;
      case 'link': {
        const href = String(mark.attrs?.href ?? '#');
        const safe = href.startsWith('http') || href.startsWith('/') || href.startsWith('mailto:') ? href : '#';
        out = `<a href="${escapeHtml(safe)}" rel="noopener noreferrer" target="_blank">${out}</a>`;
        break;
      }
      case 'highlight':
        out = `<mark>${out}</mark>`;
        break;
      default:
        break;
    }
  }
  return out;
}

function renderNodes(nodes: TipTapNode[] | undefined): string {
  if (!nodes?.length) return '';
  return nodes.map(renderNode).join('');
}

function renderNode(node: TipTapNode): string {
  const children = renderNodes(node.content);

  switch (node.type) {
    case 'doc':
      return children;
    case 'paragraph':
      return children ? `<p>${children}</p>` : '<p></p>';
    case 'heading': {
      const level = Math.min(3, Math.max(1, Number(node.attrs?.level ?? 2)));
      const text = nodeText(node);
      const id = slugifyHeading(text);
      return `<h${level} id="${id}">${children}</h${level}>`;
    }
    case 'bulletList':
      return `<ul>${children}</ul>`;
    case 'orderedList':
      return `<ol>${children}</ol>`;
    case 'listItem':
      return `<li>${children}</li>`;
    case 'blockquote':
      return `<blockquote>${children}</blockquote>`;
    case 'codeBlock': {
      const code = node.content?.map((c) => c.text ?? '').join('') ?? '';
      return `<pre><code>${escapeHtml(code)}</code></pre>`;
    }
    case 'horizontalRule':
      return '<hr />';
    case 'hardBreak':
      return '<br />';
    case 'text':
      return applyMarks(escapeHtml(node.text ?? ''), node.marks);
    default:
      return children;
  }
}

export function tiptapJsonToHtml(content: string): string {
  usedIds.clear();
  if (!content.trim()) return '';

  let doc: TipTapNode;
  try {
    doc = JSON.parse(content) as TipTapNode;
  } catch {
    return `<p>${escapeHtml(content)}</p>`;
  }

  if (doc.type !== 'doc' && !doc.content) {
    return `<p>${escapeHtml(content)}</p>`;
  }

  return renderNode(doc);
}

export function estimateReadMinutesFromText(text: string): number {
  const words = text.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
