import { useEffect, useRef } from 'react'
import { useEditor, EditorContent, type Editor, ReactRenderer } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Image } from '@tiptap/extension-image'
import { Youtube } from '@tiptap/extension-youtube'
import Mention from '@tiptap/extension-mention'
import tippy from 'tippy.js'
import {
  Bold,
  Underline as UnderlineIcon,
  Palette,
  Image as ImageIcon,
  Youtube as YoutubeIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MentionList } from './MentionList'
import type { StudyNote } from '@/services/study'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  className?: string
  existingNotes?: StudyNote[]
  onCreateNote?: (title: string) => Promise<StudyNote | null>
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null

  const addImage = () => {
    const url = window.prompt('URL da imagem:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addYoutubeVideo = () => {
    const url = window.prompt('URL do vídeo do YouTube:')
    if (url) {
      editor.commands.setYoutubeVideo({ src: url })
    }
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b bg-muted/20 items-center sticky top-0 z-10">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn('h-8 w-8 p-0', editor.isActive('bold') && 'bg-muted')}
        title="Negrito"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={cn('h-8 w-8 p-0', editor.isActive('underline') && 'bg-muted')}
        title="Sublinhado"
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>

      <div
        className="flex items-center gap-1 border border-input rounded-md px-2 h-8 bg-background"
        title="Cor do Texto"
      >
        <Palette className="h-3.5 w-3.5 text-muted-foreground" />
        <input
          type="color"
          onInput={(event) =>
            editor
              .chain()
              .focus()
              .setColor((event.target as HTMLInputElement).value)
              .run()
          }
          value={editor.getAttributes('textStyle').color || '#000000'}
          className="w-5 h-5 p-0 border-0 bg-transparent cursor-pointer"
        />
      </div>

      <div className="w-[1px] h-4 bg-border mx-1" />

      <Button
        variant="ghost"
        size="sm"
        onClick={addImage}
        className="h-8 w-8 p-0"
        title="Inserir Imagem"
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={addYoutubeVideo}
        className="h-8 w-8 p-0"
        title="Inserir Vídeo (YouTube)"
      >
        <YoutubeIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function RichTextEditor({
  content,
  onChange,
  className,
  existingNotes = [],
  onCreateNote,
}: RichTextEditorProps) {
  const notesRef = useRef(existingNotes)
  const createNoteRef = useRef(onCreateNote)

  useEffect(() => {
    notesRef.current = existingNotes
  }, [existingNotes])

  useEffect(() => {
    createNoteRef.current = onCreateNote
  }, [onCreateNote])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'max-w-full rounded-md h-auto',
        },
      }),
      Youtube.configure({
        inline: false,
        HTMLAttributes: {
          class: 'w-full aspect-video rounded-md',
        },
      }),
      Mention.configure({
        HTMLAttributes: {
          class:
            'text-primary bg-primary/10 hover:bg-primary/20 px-1.5 py-0.5 rounded-md no-underline font-medium cursor-pointer transition-colors',
        },
        renderLabel({ node }) {
          return `${node.attrs.label ?? node.attrs.id}`
        },
        suggestion: {
          char: '[[',
          allowSpaces: true,
          items: ({ query }) => {
            const notes = notesRef.current || []
            const filtered = notes
              .filter((n) => n.title.toLowerCase().includes(query.toLowerCase()))
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((n) => ({ id: n.id, title: n.title }))

            const exactMatch = filtered.find((n) => n.title.toLowerCase() === query.toLowerCase())

            if (!exactMatch && query.trim().length > 0) {
              filtered.push({
                id: 'new',
                title: `✨ Criar nova nota: ${query}`,
                isNew: true,
                query: query,
              } as any)
            }
            return filtered
          },
          render: () => {
            let component: ReactRenderer
            let popup: any

            return {
              onStart: (props) => {
                component = new ReactRenderer(MentionList, {
                  props,
                  editor: props.editor,
                })

                if (!props.clientRect) return

                popup = tippy('body', {
                  getReferenceClientRect: props.clientRect,
                  appendTo: () => document.body,
                  content: component.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: 'manual',
                  placement: 'bottom-start',
                })
              },
              onUpdate(props) {
                component.updateProps(props)
                if (!props.clientRect) return
                popup[0].setProps({
                  getReferenceClientRect: props.clientRect,
                })
              },
              onKeyDown(props) {
                if (props.event.key === 'Escape') {
                  popup[0].hide()
                  return true
                }
                return component.ref?.onKeyDown(props)
              },
              onExit() {
                if (popup?.[0]) popup[0].destroy()
                component.destroy()
              },
            }
          },
          command: ({ editor, range, props }) => {
            if (props.isNew && createNoteRef.current) {
              editor.chain().focus().deleteRange(range).run()
              createNoteRef.current(props.query).then((newNote) => {
                if (newNote) {
                  editor
                    .chain()
                    .focus()
                    .insertContent({
                      type: 'mention',
                      attrs: { id: newNote.id, label: newNote.title },
                    })
                    .insertContent(' ')
                    .run()
                }
              })
            } else {
              editor
                .chain()
                .focus()
                .insertContentAt(range, {
                  type: 'mention',
                  attrs: { id: props.id, label: props.title },
                })
                .insertContent(' ')
                .run()
            }
          },
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base dark:prose-invert focus:outline-none min-h-[500px] h-full max-w-none p-4',
      },
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      const currentContent = editor.getHTML()
      if (content !== currentContent) {
        editor.commands.setContent(content, false)
      }
    }
  }, [content, editor])

  return (
    <div className={cn('flex flex-col border rounded-md bg-background', className)}>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="cursor-text"
        onClick={() => editor?.commands.focus()}
      />
    </div>
  )
}
