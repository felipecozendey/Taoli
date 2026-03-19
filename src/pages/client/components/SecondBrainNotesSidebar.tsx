import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { File, Plus } from 'lucide-react'
import type { StudyNote } from '@/services/study'

interface SecondBrainNotesSidebarProps {
  notes: StudyNote[]
  isLoading: boolean
  activeNoteId: string | null
  onSelectNote: (note: StudyNote) => void
  onNewNote: () => void
}

export function SecondBrainNotesSidebar({
  notes,
  isLoading,
  activeNoteId,
  onSelectNote,
  onNewNote,
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
            <button
              key={note.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('noteId', note.id)}
              onClick={() => onSelectNote(note)}
              className={cn(
                'w-full flex items-center justify-start gap-3 px-2 py-2 text-sm rounded-md transition-colors cursor-grab active:cursor-grabbing text-left',
                activeNoteId === note.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'hover:bg-muted text-muted-foreground',
              )}
            >
              <File className="h-4 w-4 shrink-0" />
              <span className="truncate block w-full">{note.title}</span>
            </button>
          ))
        )}
        {!isLoading && notes.length === 0 && (
          <p className="text-xs text-center text-muted-foreground py-4 block">Nenhuma nota.</p>
        )}
      </div>
    </>
  )
}
