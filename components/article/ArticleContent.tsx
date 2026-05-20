'use client';

import { useEffect, useMemo } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import { Markdown } from '@tiptap/markdown';

interface ArticleContentProps {
  content: string;
}

function parseContent(value: string) {
  if (!value) return '';
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

import { proseClass } from '@/lib/uiStyles';

export function ArticleContent({ content }: ArticleContentProps) {
  const parsedContent = useMemo(() => parseContent(content), [content]);

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    content: parsedContent,
    extensions: [StarterKit, Link.configure({ openOnClick: true }), Highlight, Placeholder, Markdown],
    editorProps: {
      attributes: {
        class: proseClass
      }
    }
  });

  useEffect(() => {
    if (!editor) return;
    editor.commands.setContent(parsedContent);
  }, [editor, parsedContent]);

  if (!editor) {
    return <div className="py-8 text-sm text-zinc-500">Загрузка статьи…</div>;
  }

  return <EditorContent editor={editor} />;
}
