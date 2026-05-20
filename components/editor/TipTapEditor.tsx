'use client';

import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import { Markdown } from '@tiptap/markdown';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { editorToolbar, editorSurface } from '@/lib/uiStyles';

interface TipTapEditorProps {
  content: string;
  inputId: string;
}

function parseContent(value: string) {
  if (!value) return '';
  try {
    return JSON.parse(value);
  } catch {
    // If it's not JSON, treat it as markdown and let Markdown extension parse it
    // Return as-is, the editor's Markdown extension will handle it
    return value;
  }
}

export function TipTapEditor({ content, inputId }: TipTapEditorProps) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false }), Highlight, Placeholder.configure({ placeholder: 'Start writing your article...' }), Markdown],
    content: parseContent(content),
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      const element = document.getElementById(inputId) as HTMLInputElement | null;
      if (element) {
        element.value = JSON.stringify(json);
      }
    }
  });

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!editor) return;
    const field = document.getElementById(inputId) as HTMLInputElement | null;
    if (!field) return;

    const handleInput = () => {
      const contentValue = parseContent(field.value);
      editor.commands.setContent(contentValue);
    };

    field.addEventListener('input', handleInput);
    return () => field.removeEventListener('input', handleInput);
  }, [editor, inputId]);

  if (!editor) {
    return <div className={cn(editorSurface, 'text-zinc-500')}>Loading editor...</div>;
  }

  return (
    <div className="space-y-4">
      <div className={editorToolbar}>
        <Button variant="secondary" size="sm" type="button" onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </Button>
        <Button variant="secondary" size="sm" type="button" onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </Button>
        <Button variant="secondary" size="sm" type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </Button>
        <Button variant="secondary" size="sm" type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          List
        </Button>
        <Button variant="secondary" size="sm" type="button" onClick={() => editor.chain().focus().toggleHighlight().run()}>
          Highlight
        </Button>
      </div>

      <div className={cn(editorSurface, 'overflow-hidden', !hasLoaded && 'opacity-70')}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
