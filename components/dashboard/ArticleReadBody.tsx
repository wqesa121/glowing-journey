'use client';

import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import { Markdown } from '@tiptap/markdown';
import { panel, proseClass } from '@/lib/uiStyles';
import { cn } from '@/lib/utils';

function parseContent(value: string) {
  if (!value) return '';
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export function ArticleReadBody({ content }: { content: string }) {
  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: [StarterKit, Link.configure({ openOnClick: true }), Highlight, Markdown],
    content: parseContent(content),
    editorProps: {
      attributes: {
        class: proseClass
      }
    }
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(parseContent(content));
    }
  }, [editor, content]);

  return (
    <div className={cn(panel, 'p-8')}>
      {editor ? <EditorContent editor={editor} /> : <p className="text-sm text-zinc-500">Загрузка текста…</p>}
    </div>
  );
}
