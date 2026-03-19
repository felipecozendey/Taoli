import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import {
  BrainCircuit,
  File,
  Plus,
  Save,
  Loader2,
  Folder,
  FolderPlus,
  FolderOpen,
  Hash,
  X,
} from 'lucide-react'
import { studyService, type StudyNote, type StudyFolder } from '@/services/study'
import { cn } from '@/lib/utils'
import { RichTextEditor } from '@/components/shared/RichTextEditor'

export function SecondBrainPanel() {
  const [notes, setNotes] = useState<StudyNote[]>([])
  const [folders, setFolders] = useState<StudyFolder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)

  const [editorTitle, setEditorTitle] = useState('')
  const [editorContent, setEditorContent] = useState('')
  const [editorTags, setEditorTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const initialNoteData = useRef({ title: '', content: '', tags: [] as string[] })

  const [backlinks, setBacklinks] = useState<{ id: string; title: string }[]>([])

  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')

  const { toast } = useToast()

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    const [notesRes, foldersRes] = await Promise.all([
      studyService.getNotes(),
      studyService.getFolders(),
    ])
    if (notesRes.data) setNotes(notesRes.data)
    if (foldersRes.data) setFolders(foldersRes.data)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Debounced Auto-save Engine
  useEffect(() => {
    if (
      editorTitle === initialNoteData.current.title &&
      editorContent === initialNoteData.current.content &&
      JSON.stringify(editorTags) === JSON.stringify(initialNoteData.current.tags)
    ) {
      return
    }

    if (!activeNoteId && !editorTitle.trim() && !editorContent.trim() && editorTags.length === 0) {
      return
    }

    const handler = setTimeout(async () => {
      setIsSaving(true)
      const titleToSave = editorTitle.trim() || 'Nova Nota'

      const { data, error } = await studyService.saveNote(
        activeNoteId,
        titleToSave,
        editorContent,
        selectedFolderId,
        editorTags,
      )

      setIsSaving(false)

      if (data && !error) {
        setLastSaved(new Date())
        initialNoteData.current = {
          title: data.title,
          content: data.content,
          tags: data.tags || [],
        }

        if (!activeNoteId) {
          setActiveNoteId(data.id)
          if (!editorTitle.trim()) setEditorTitle(data.title)
          fetchData()
        } else {
          setNotes((prev) => prev.map((n) => (n.id === data.id ? data : n)))
        }
      } else if (error) {
        toast({
          title: 'Erro no salvamento automático',
          description: error.message,
          variant: 'destructive',
        })
      }
    }, 1500)

    return () => clearTimeout(handler)
  }, [editorTitle, editorContent, editorTags, activeNoteId, selectedFolderId, fetchData, toast])

  // Backlinks Discovery Effect
  useEffect(() => {
    if (activeNoteId) {
      studyService.getBacklinks(activeNoteId).then((res) => {
        if (res.data) setBacklinks(res.data)
      })
    } else {
      setBacklinks([])
    }
  }, [activeNoteId])

  const filteredNotes = selectedFolderId
    ? notes.filter((n) => n.folder_id === selectedFolderId)
    : notes

  const handleSelectNote = async (note: StudyNote) => {
    // Pre-selection Save (Data Loss Prevention)
    if (
      activeNoteId &&
      (editorTitle !== initialNoteData.current.title ||
        editorContent !== initialNoteData.current.content ||
        JSON.stringify(editorTags) !== JSON.stringify(initialNoteData.current.tags))
    ) {
      setIsSaving(true)
      const { data } = await studyService.saveNote(
        activeNoteId,
        editorTitle.trim() || 'Nova Nota',
        editorContent,
        selectedFolderId,
        editorTags,
      )
      if (data) {
        setNotes((prev) => prev.map((n) => (n.id === data.id ? data : n)))
      }
      setIsSaving(false)
    }

    initialNoteData.current = { title: note.title, content: note.content, tags: note.tags || [] }
    setActiveNoteId(note.id)
    setEditorTitle(note.title)
    setEditorContent(note.content)
    setEditorTags(note.tags || [])
    setTagInput('')
    setLastSaved(null)
  }

  const handleNewNote = async () => {
    // Pre-creation Save (Data Loss Prevention)
    if (
      activeNoteId &&
      (editorTitle !== initialNoteData.current.title ||
        editorContent !== initialNoteData.current.content ||
        JSON.stringify(editorTags) !== JSON.stringify(initialNoteData.current.tags))
    ) {
      setIsSaving(true)
      const { data } = await studyService.saveNote(
        activeNoteId,
        editorTitle.trim() || 'Nova Nota',
        editorContent,
        selectedFolderId,
        editorTags,
      )
      if (data) {
        setNotes((prev) => prev.map((n) => (n.id === data.id ? data : n)))
      }
      setIsSaving(false)
    }

    initialNoteData.current = { title: '', content: '', tags: [] }
    setActiveNoteId(null)
    setEditorTitle('')
    setEditorContent('')
    setEditorTags([])
    setTagInput('')
    setLastSaved(null)
  }

  const handleCreateNoteFromLink = async (title: string): Promise<StudyNote | null> => {
    const { data, error } = await studyService.saveNote(null, title, '', selectedFolderId, [])
    if (error) {
      toast({ title: 'Erro ao criar nota', description: error.message, variant: 'destructive' })
      return null
    }
    if (data) {
      toast({ title: 'Nota criada', description: `Nota "${title}" criada com sucesso.` })
      fetchData()
      return data
    }
    return null
  }

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return

    const { data, error } = await studyService.createFolder(newFolderName)

    if (error) {
      toast({ title: 'Erro ao criar pasta', description: error.message, variant: 'destructive' })
    } else if (data) {
      toast({ title: 'Pasta criada', description: 'Sua nova pasta foi criada.' })
      setIsFolderModalOpen(false)
      setNewFolderName('')
      fetchData()
    }
  }

  const handleDrop = async (e: React.DragEvent, folderId: string | null) => {
    e.preventDefault()
    const noteId = e.dataTransfer.getData('noteId')
    const note = notes.find((n) => n.id === noteId)

    if (note && note.folder_id !== folderId) {
      await studyService.saveNote(note.id, note.title, note.content, folderId, note.tags || [])
      toast({ title: 'Nota movida com sucesso' })
      fetchData()
    }
  }

  return (
    <div className="flex flex-col h-full bg-background relative z-0">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/20 shrink-0">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-primary" />
          <span className="font-semibold text-sm">Segundo Cérebro</span>
        </div>
      </div>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Folders Sidebar */}
        <div className="w-16 md:w-56 lg:w-64 border-r bg-muted/10 flex flex-col shrink-0">
          <div className="p-3 border-b flex flex-col md:flex-row items-center justify-between gap-2">
            <span className="hidden md:inline text-xs font-semibold uppercase text-muted-foreground">
              Meu Cérebro
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 shrink-0"
              onClick={() => setIsFolderModalOpen(true)}
            >
              <FolderPlus className="h-4 w-4 text-primary" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            <button
              onClick={() => setSelectedFolderId(null)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, null)}
              className={cn(
                'w-full flex items-center justify-center md:justify-start gap-2 px-2 py-2 md:py-1.5 text-sm rounded-md transition-colors',
                selectedFolderId === null
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'hover:bg-muted text-muted-foreground',
              )}
            >
              <FolderOpen className="h-4 w-4 shrink-0" />
              <span className="hidden md:inline truncate">Todas as Notas</span>
            </button>
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolderId(folder.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, folder.id)}
                className={cn(
                  'w-full flex items-center justify-center md:justify-start gap-2 px-2 py-2 md:py-1.5 text-sm rounded-md transition-colors',
                  selectedFolderId === folder.id
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'hover:bg-muted text-muted-foreground',
                )}
              >
                <Folder className="h-4 w-4 shrink-0" />
                <span className="hidden md:inline truncate">{folder.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notes List Sidebar */}
        <div className="w-16 md:w-56 lg:w-64 border-r bg-muted/5 flex flex-col shrink-0">
          <div className="p-3 border-b flex flex-col gap-2">
            <Button
              variant="default"
              size="sm"
              className="h-8 w-full gap-2 text-xs"
              onClick={handleNewNote}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden md:inline">Nova Nota</span>
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {isLoading ? (
              <Skeleton className="h-9 w-full rounded-md" />
            ) : (
              filteredNotes.map((note) => (
                <button
                  key={note.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('noteId', note.id)}
                  onClick={() => handleSelectNote(note)}
                  className={cn(
                    'w-full flex items-center justify-center md:justify-start gap-3 px-2 py-2 text-sm rounded-md transition-colors cursor-grab active:cursor-grabbing',
                    activeNoteId === note.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'hover:bg-muted text-muted-foreground',
                  )}
                >
                  <File className="h-4 w-4 shrink-0" />
                  <span className="hidden md:inline truncate text-left">{note.title}</span>
                </button>
              ))
            )}
            {!isLoading && filteredNotes.length === 0 && (
              <p className="text-xs text-center text-muted-foreground py-4 hidden md:block">
                Nenhuma nota.
              </p>
            )}
          </div>
        </div>

        {/* Editor Center Column */}
        <div className="flex-1 bg-background overflow-y-auto flex flex-col min-w-0">
          <div className="flex-1 p-4 lg:p-8 flex flex-col max-w-3xl mx-auto w-full gap-4">
            <div className="flex items-center justify-between gap-4 shrink-0 border-b pb-4">
              <Input
                value={editorTitle}
                onChange={(e) => setEditorTitle(e.target.value)}
                placeholder="Título da nota..."
                className="text-2xl lg:text-3xl font-bold border-none px-0 focus-visible:ring-0 h-auto bg-transparent"
              />
              <div className="flex items-center justify-end shrink-0 min-w-32">
                {isSaving ? (
                  <span className="text-xs text-muted-foreground animate-pulse flex items-center gap-1.5">
                    <Loader2 className="h-3 w-3 animate-spin" />A guardar...
                  </span>
                ) : lastSaved ? (
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Save className="h-3 w-3" />
                    Guardado às{' '}
                    {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              {editorTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-2 py-0.5 text-xs font-medium gap-1 cursor-default"
                >
                  <Hash className="h-3 w-3" />
                  {tag}
                  <button
                    onClick={() => setEditorTags((prev) => prev.filter((t) => t !== tag))}
                    className="ml-1 hover:text-destructive transition-colors outline-none"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault()
                    const val = tagInput.trim().replace(/^#/, '')
                    if (val && !editorTags.includes(val)) {
                      setEditorTags((prev) => [...prev, val])
                    }
                    setTagInput('')
                  }
                }}
                placeholder="Adicionar tag..."
                className="bg-transparent border-none outline-none text-sm w-24 placeholder:text-muted-foreground"
              />
            </div>

            <RichTextEditor
              key={activeNoteId || 'new-note'}
              content={editorContent}
              onChange={setEditorContent}
              existingNotes={notes}
              onCreateNote={handleCreateNoteFromLink}
              className="flex-1 shadow-sm border-none bg-transparent"
            />
          </div>
        </div>

        {/* Right Sidebar (Backlinks Knowledge Graph) */}
        <div className="hidden lg:flex w-64 border-l bg-muted/10 p-4 flex-col shrink-0">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b">
            <span className="font-semibold text-sm">🔗 Referências</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2">
            {!activeNoteId ? (
              <p className="text-sm text-muted-foreground">Salve a nota para ver referências.</p>
            ) : backlinks.length > 0 ? (
              backlinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    const targetNote = notes.find((n) => n.id === link.id)
                    if (targetNote) handleSelectNote(targetNote)
                  }}
                  className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors truncate text-primary"
                >
                  {link.title}
                </button>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Nenhuma nota referencia este tópico.</p>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isFolderModalOpen} onOpenChange={setIsFolderModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Nova Pasta</DialogTitle>
          </DialogHeader>
          <Input
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Nome da pasta..."
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
          />
          <DialogFooter>
            <Button onClick={handleCreateFolder}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
