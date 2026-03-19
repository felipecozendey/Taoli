import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
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
} from 'lucide-react'
import { studyService, type StudyNote, type StudyFolder } from '@/services/study'
import { cn } from '@/lib/utils'

export function SecondBrainPanel() {
  const [notes, setNotes] = useState<StudyNote[]>([])
  const [folders, setFolders] = useState<StudyFolder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)

  const [editorTitle, setEditorTitle] = useState('')
  const [editorContent, setEditorContent] = useState('')

  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')

  const { toast } = useToast()

  const fetchData = async () => {
    setIsLoading(true)
    const [notesRes, foldersRes] = await Promise.all([
      studyService.getNotes(),
      studyService.getFolders(),
    ])
    if (notesRes.data) setNotes(notesRes.data)
    if (foldersRes.data) setFolders(foldersRes.data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const filteredNotes = selectedFolderId
    ? notes.filter((n) => n.folder_id === selectedFolderId)
    : notes

  const handleSelectNote = (note: StudyNote) => {
    setActiveNoteId(note.id)
    setEditorTitle(note.title)
    setEditorContent(note.content)
  }

  const handleNewNote = () => {
    setActiveNoteId(null)
    setEditorTitle('')
    setEditorContent('')
  }

  const handleSaveNote = async () => {
    if (!editorTitle.trim()) {
      return toast({
        title: 'Título obrigatório',
        description: 'Insira um título para a nota.',
        variant: 'destructive',
      })
    }

    setIsSaving(true)
    const { data, error } = await studyService.saveNote(
      activeNoteId,
      editorTitle,
      editorContent,
      selectedFolderId,
    )
    setIsSaving(false)

    if (error) {
      toast({ title: 'Erro ao salvar nota', description: error.message, variant: 'destructive' })
    } else if (data) {
      toast({ title: 'Nota salva', description: 'Sua nota foi salva com sucesso.' })
      setActiveNoteId(data.id)
      fetchData()
    }
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
      await studyService.saveNote(note.id, note.title, note.content, folderId)
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

        {/* Editor */}
        <div className="flex-1 bg-background overflow-y-auto flex flex-col min-w-0">
          <div className="flex-1 p-4 lg:p-8 flex flex-col max-w-4xl mx-auto w-full gap-4">
            <div className="flex items-center justify-between gap-4">
              <Input
                value={editorTitle}
                onChange={(e) => setEditorTitle(e.target.value)}
                placeholder="Título da nota..."
                className="text-2xl lg:text-3xl font-bold border-none px-0 focus-visible:ring-0 h-auto bg-transparent"
              />
              <Button
                onClick={handleSaveNote}
                disabled={isSaving}
                size="sm"
                className="gap-2 shrink-0"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span className="hidden md:inline">Guardar</span>
              </Button>
            </div>
            <Textarea
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              placeholder="Comece a escrever sua nota aqui..."
              className="flex-1 resize-none border-none px-0 focus-visible:ring-0 bg-transparent text-base lg:text-lg leading-relaxed text-muted-foreground focus:text-foreground transition-colors"
            />
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
