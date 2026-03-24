import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { File, Plus, Trash2 } from 'lucide-react'
import type { StudyNote } from '@/services/study'

interface SecondBrainNotesSidebarProps {
  notes: StudyNote[]
  isLoading: boolean
  activeNoteId: string | null
  onSelectNote: (note: StudyNote) => void
  onNewNote: () => void
  onDeleteNote?: (id: string) => void
}

export function SecondBrainNotesSidebar({
  notes,
  isLoading,
  activeNoteId,
  onSelectNote,
  onNewNote,
  onDeleteNote,
}: SecondBrainNotesSidebarProps) {
  return (
    <>
      <div className="p-3 border-b flex flex-col gap-2 shrink-0 min-h-[53px] justify-center">
        <Button
          variant="default"
          size="sm"
          className="h-8 w-full gap-2 text-xs"
          onClick={onNewNote}
        >
          <Plus className="h-4 w-4 shrink-0" />
          <span className="truncate">Nova Nota</span>
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {isLoading ? (
          <Skeleton className="h-9 w-full rounded-md" />
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('noteId', note.id)}
              onClick={() => onSelectNote(note)}
              className={cn(
                'group w-full flex items-center justify-between gap-3 px-2 py-2 text-sm rounded-md transition-colors cursor-grab active:cursor-grabbing text-left',
                activeNoteId === note.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'hover:bg-muted text-muted-foreground',
              )}
            >
              <div className="flex items-center gap-3 truncate w-full">
                <File className="h-4 w-4 shrink-0" />
                <span className="truncate block w-full">{note.title}</span>
              </div>
              {onDeleteNote && (
                <div
                  role="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteNote(note.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 hover:text-destructive rounded transition-all shrink-0"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </div>
              )}
            </div>
          ))
        )}
        {!isLoading && notes.length === 0 && (
          <p className="text-xs text-center text-muted-foreground py-4 block">Nenhuma nota.</p>
        )}
      </div>
    </>
  )
}
