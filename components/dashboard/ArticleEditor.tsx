'use client';

import { useEffect, useMemo, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import { Markdown } from '@tiptap/markdown';
import { Button } from '@/components/ui/button';
import { editorToolbar, editorSurface } from '@/lib/uiStyles';

interface ArticleEditorProps {
  content: string;
  inputId: string;
}

function parseContent(value: string) {
  if (!value) return '';
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export function ArticleEditor({ content, inputId }: ArticleEditorProps) {
  const [loaded, setLoaded] = useState(false);
  const syncHiddenInput = (ed: NonNullable<ReturnType<typeof useEditor>>) => {
    const element = document.getElementById(inputId) as HTMLInputElement | null;
    if (element) {
      element.value = JSON.stringify(ed.getJSON());
    }
  };

  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false }), Highlight, Placeholder.configure({ placeholder: 'Write your article content here.' }), Markdown],
    content: parseContent(content),
    onCreate: ({ editor: ed }) => {
      syncHiddenInput(ed);
    },
    onUpdate: ({ editor: ed }) => {
      syncHiddenInput(ed);
    }
  });

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!editor) return;
    const field = document.getElementById(inputId) as HTMLInputElement | null;
    if (!field) return;

    const handleInput = () => {
      const contentValue = field.value;
      if (contentValue) {
        console.log('[ArticleEditor] Input field changed, updating content');
        editor.commands.setContent(parseContent(contentValue));
      }
    };

    field.addEventListener('input', handleInput);
    field.addEventListener('change', handleInput);
    return () => {
      field.removeEventListener('input', handleInput);
      field.removeEventListener('change', handleInput);
    };
  }, [editor, inputId]);

  return (
    <div className="space-y-4">
      <div className={editorToolbar}>
        <Button variant="secondary" size="sm" type="button" onClick={() => editor?.chain().focus().toggleBold().run()}>
          Bold
        </Button>
        <Button variant="secondary" size="sm" type="button" onClick={() => editor?.chain().focus().toggleItalic().run()}>
          Italic
        </Button>
        <Button variant="secondary" size="sm" type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </Button>
        <Button variant="secondary" size="sm" type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()}>
          List
        </Button>
      </div>
      <div className={editorSurface}>
        {editor ? <EditorContent editor={editor} /> : <p className="text-sm text-zinc-500">Загрузка редактора…</p>}
      </div>
    </div>
  );
}
