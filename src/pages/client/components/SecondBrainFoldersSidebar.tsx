import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Folder, FolderPlus, FolderOpen, Hash, Trash2 } from 'lucide-react'
import type { StudyFolder } from '@/services/study'

interface SecondBrainFoldersSidebarProps {
  folders: StudyFolder[]
  allTags: string[]
  selectedFolderId: string | null
  onSelectFolder: (id: string | null) => void
  selectedTag: string | null
  onToggleTag: (tag: string) => void
  onAddFolder: () => void
  onDrop: (e: React.DragEvent, folderId: string | null) => void
  onSelectAllNotes: () => void
  onDeleteFolder?: (id: string) => void
}

export function SecondBrainFoldersSidebar({
  folders,
  allTags,
  selectedFolderId,
  onSelectFolder,
  selectedTag,
  onToggleTag,
  onAddFolder,
  onDrop,
  onSelectAllNotes,
  onDeleteFolder,
}: SecondBrainFoldersSidebarProps) {
  return (
    <>
      <div className="p-3 border-b flex items-center justify-between gap-2 shrink-0 min-h-[53px]">
        <span className="text-xs font-semibold uppercase text-muted-foreground truncate">
          Meu Cérebro
        </span>
        <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={onAddFolder}>
          <FolderPlus className="h-4 w-4 text-primary" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-6">
        <div className="space-y-1">
          <button
            onClick={onSelectAllNotes}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, null)}
            className={cn(
              'w-full flex items-center justify-start gap-2 px-2 py-1.5 text-sm rounded-md transition-colors',
              selectedFolderId === null && selectedTag === null
                ? 'bg-primary/10 text-primary font-medium'
                : 'hover:bg-muted text-muted-foreground',
            )}
          >
            <FolderOpen className="h-4 w-4 shrink-0" />
            <span className="truncate">Todas as Notas</span>
          </button>
          {folders.map((folder) => (
            <div
              key={folder.id}
              onClick={() => onSelectFolder(folder.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, folder.id)}
              className={cn(
                'group w-full flex items-center justify-between gap-2 px-2 py-1.5 text-sm rounded-md transition-colors cursor-pointer',
                selectedFolderId === folder.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'hover:bg-muted text-muted-foreground',
              )}
            >
              <div className="flex items-center gap-2 truncate">
                <Folder className="h-4 w-4 shrink-0" />
                <span className="truncate">{folder.name}</span>
              </div>
              {onDeleteFolder && (
                <div
                  role="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteFolder(folder.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 hover:text-destructive rounded transition-all shrink-0"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {allTags.length > 0 && (
          <div className="space-y-1">
            <div className="px-2 py-1 flex items-center">
              <span className="text-xs font-semibold uppercase text-muted-foreground">Tags</span>
            </div>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onToggleTag(tag)}
                className={cn(
                  'w-full flex items-center justify-start gap-2 px-2 py-1.5 text-sm rounded-md transition-colors',
                  selectedTag === tag
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'hover:bg-muted text-muted-foreground',
                )}
              >
                <Hash className="h-4 w-4 shrink-0" />
                <span className="truncate">{tag}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
