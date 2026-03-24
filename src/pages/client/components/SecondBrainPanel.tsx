import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import {
  BrainCircuit,
  Save,
  Loader2,
  Hash,
  X,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  AlertTriangle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { studyService, type StudyNote, type StudyFolder } from '@/services/study'
import { RichTextEditor } from '@/components/shared/RichTextEditor'
import { SecondBrainFoldersSidebar } from './SecondBrainFoldersSidebar'
import { SecondBrainNotesSidebar } from './SecondBrainNotesSidebar'

export function SecondBrainPanel() {
  const [notes, setNotes] = useState<StudyNote[]>([])
  const [folders, setFolders] = useState<StudyFolder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [editorTitle, setEditorTitle] = useState('')
  const [editorContent, setEditorContent] = useState('')
  const [editorTags, setEditorTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const initialNoteData = useRef({ title: '', content: '', tags: [] as string[] })

  const [backlinks, setBacklinks] = useState<{ id: string; title: string }[]>([])
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')

  // Focus & Delete States
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true)
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null)
  const [folderToDelete, setFolderToDelete] = useState<string | null>(null)
  const [folderDeleteMode, setFolderDeleteMode] = useState<'all' | 'keep_notes' | null>(null)
  const [showFolderConfirmDelete, setShowFolderConfirmDelete] = useState(false)

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

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>()
    notes.forEach((note) => {
      if (note.tags) {
        note.tags.forEach((tag) => tagsSet.add(tag))
      }
    })
    return Array.from(tagsSet).sort((a, b) => a.localeCompare(b))
  }, [notes])

  const filteredNotes = useMemo(() => {
    return notes.filter((n) => {
      const matchFolder = selectedFolderId ? n.folder_id === selectedFolderId : true
      const matchTag = selectedTag ? n.tags?.includes(selectedTag) : true
      return matchFolder && matchTag
    })
  }, [notes, selectedFolderId, selectedTag])

  const handleSelectNote = async (note: StudyNote) => {
    setIsMobileMenuOpen(false)
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
    setIsMobileMenuOpen(false)
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

  const handleDeleteNote = async () => {
    if (!noteToDelete) return
    setIsLoading(true)
    const { error } = await studyService.deleteNote(noteToDelete)
    if (error) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' })
    } else {
      toast({ title: 'Nota excluída' })
      if (activeNoteId === noteToDelete) {
        initialNoteData.current = { title: editorTitle, content: editorContent, tags: editorTags }
        handleNewNote()
      }
      fetchData()
    }
    setNoteToDelete(null)
    setIsLoading(false)
  }

  const handleDeleteFolder = async (folderId: string, deleteNotes: boolean) => {
    setIsLoading(true)
    const { error } = await studyService.deleteFolder(folderId, deleteNotes)
    if (error) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' })
    } else {
      toast({ title: 'Pasta excluída' })
      if (selectedFolderId === folderId) {
        setSelectedFolderId(null)
      }
      if (deleteNotes) {
        const deletedNoteIds = notes.filter((n) => n.folder_id === folderId).map((n) => n.id)
        if (activeNoteId && deletedNoteIds.includes(activeNoteId)) {
          initialNoteData.current = { title: editorTitle, content: editorContent, tags: editorTags }
          handleNewNote()
        }
      }
      fetchData()
    }
    setFolderToDelete(null)
    setShowFolderConfirmDelete(false)
    setFolderDeleteMode(null)
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col h-full bg-background relative z-0">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/20 shrink-0">
        <div className="flex items-center gap-2">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-8 w-8 -ml-2 shrink-0">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[90vw] max-w-[400px] p-0 flex gap-0">
              <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
              <SheetDescription className="sr-only">
                Pastas e notas do seu Segundo Cérebro
              </SheetDescription>
              <div className="w-1/2 flex flex-col h-full border-r bg-muted/10">
                <SecondBrainFoldersSidebar
                  folders={folders}
                  allTags={allTags}
                  selectedFolderId={selectedFolderId}
                  onSelectFolder={setSelectedFolderId}
                  selectedTag={selectedTag}
                  onToggleTag={(tag) => setSelectedTag((prev) => (prev === tag ? null : tag))}
                  onAddFolder={() => setIsFolderModalOpen(true)}
                  onDrop={handleDrop}
                  onSelectAllNotes={() => {
                    setSelectedFolderId(null)
                    setSelectedTag(null)
                  }}
                  onDeleteFolder={setFolderToDelete}
                />
              </div>
              <div className="w-1/2 flex flex-col h-full bg-muted/5">
                <SecondBrainNotesSidebar
                  notes={filteredNotes}
                  isLoading={isLoading}
                  activeNoteId={activeNoteId}
                  onSelectNote={handleSelectNote}
                  onNewNote={handleNewNote}
                  onDeleteNote={setNoteToDelete}
                />
              </div>
            </SheetContent>
          </Sheet>
          <BrainCircuit className="h-5 w-5 text-primary" />
          <span className="font-semibold text-sm">Segundo Cérebro</span>
        </div>
      </div>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Folders & Tags Sidebar - Desktop */}
        <div
          className={cn(
            'hidden md:flex border-r bg-muted/10 flex-col shrink-0 transition-all duration-300',
            isLeftSidebarOpen ? 'w-56 lg:w-64' : 'w-0 border-r-0 overflow-hidden opacity-0',
          )}
        >
          <SecondBrainFoldersSidebar
            folders={folders}
            allTags={allTags}
            selectedFolderId={selectedFolderId}
            onSelectFolder={setSelectedFolderId}
            selectedTag={selectedTag}
            onToggleTag={(tag) => setSelectedTag((prev) => (prev === tag ? null : tag))}
            onAddFolder={() => setIsFolderModalOpen(true)}
            onDrop={handleDrop}
            onSelectAllNotes={() => {
              setSelectedFolderId(null)
              setSelectedTag(null)
            }}
            onDeleteFolder={setFolderToDelete}
          />
        </div>

        {/* Notes List Sidebar - Desktop */}
        <div
          className={cn(
            'hidden md:flex border-r bg-muted/5 flex-col shrink-0 transition-all duration-300',
            isLeftSidebarOpen ? 'w-56 lg:w-64' : 'w-0 border-r-0 overflow-hidden opacity-0',
          )}
        >
          <SecondBrainNotesSidebar
            notes={filteredNotes}
            isLoading={isLoading}
            activeNoteId={activeNoteId}
            onSelectNote={handleSelectNote}
            onNewNote={handleNewNote}
            onDeleteNote={setNoteToDelete}
          />
        </div>

        {/* Editor Center Column */}
        <div className="flex-1 bg-background overflow-y-auto flex flex-col min-w-0">
          <div className="flex-1 p-4 lg:p-8 flex flex-col max-w-3xl mx-auto w-full gap-4">
            <div className="flex items-center justify-between gap-4 shrink-0 border-b pb-4">
              <div className="flex items-center gap-2 flex-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex h-8 w-8 text-muted-foreground shrink-0"
                  onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
                >
                  {isLeftSidebarOpen ? (
                    <PanelLeftClose className="h-5 w-5" />
                  ) : (
                    <PanelLeftOpen className="h-5 w-5" />
                  )}
                </Button>
                <Input
                  value={editorTitle}
                  onChange={(e) => setEditorTitle(e.target.value)}
                  placeholder="Título da nota..."
                  className="text-xl md:text-2xl lg:text-3xl font-bold border-none px-0 focus-visible:ring-0 h-auto bg-transparent min-w-0"
                />
              </div>
              <div className="flex items-center justify-end shrink-0 gap-2">
                <div className="min-w-[120px] flex items-center justify-end">
                  {isSaving ? (
                    <span className="text-xs text-muted-foreground animate-pulse flex items-center gap-1.5">
                      <Loader2 className="h-3 w-3 animate-spin" />A guardar...
                    </span>
                  ) : lastSaved ? (
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Save className="h-3 w-3" />
                      {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  ) : null}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden xl:flex h-8 w-8 text-muted-foreground shrink-0"
                  onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
                >
                  {isRightSidebarOpen ? (
                    <PanelRightClose className="h-5 w-5" />
                  ) : (
                    <PanelRightOpen className="h-5 w-5" />
                  )}
                </Button>
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
                className="bg-transparent border-none outline-none text-sm w-28 placeholder:text-muted-foreground focus:ring-0"
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
        <div
          className={cn(
            'hidden xl:flex border-l bg-muted/10 p-4 flex-col shrink-0 transition-all duration-300',
            isRightSidebarOpen ? 'w-64' : 'w-0 border-l-0 p-0 overflow-hidden opacity-0',
          )}
        >
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

      {/* Create Folder Dialog */}
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

      {/* Delete Note Alert */}
      <AlertDialog open={!!noteToDelete} onOpenChange={(open) => !open && setNoteToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja excluir esta nota?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A nota será permanentemente removida.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteNote}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Excluir Nota
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Folder Dual Flow Dialog */}
      <Dialog
        open={!!folderToDelete && !showFolderConfirmDelete}
        onOpenChange={(open) => !open && setFolderToDelete(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Excluir Pasta
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button
              variant="outline"
              className="justify-start h-auto p-4 flex flex-col items-start gap-1 whitespace-normal"
              onClick={() => {
                setFolderDeleteMode('keep_notes')
                handleDeleteFolder(folderToDelete!, false)
              }}
            >
              <span className="font-semibold text-foreground">
                Excluir apenas a Pasta (Manter Notas)
              </span>
              <span className="text-xs text-muted-foreground text-left">
                A pasta será removida, mas as suas notas serão movidas para a pasta padrão 'Notas a
                Organizar'.
              </span>
            </Button>

            <Button
              variant="destructive"
              className="justify-start h-auto p-4 flex flex-col items-start gap-1 whitespace-normal"
              onClick={() => {
                setFolderDeleteMode('all')
                setShowFolderConfirmDelete(true)
              }}
            >
              <span className="font-semibold">Excluir Pasta e Todas as Notas</span>
              <span className="text-xs text-destructive-foreground/90 text-left">
                Esta ação excluirá a pasta e todo o seu conteúdo permanentemente.
              </span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hard Confirm Folder Deletion Alert */}
      <AlertDialog open={showFolderConfirmDelete} onOpenChange={setShowFolderConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Atenção! Esta ação não pode ser desfeita.
            </AlertDialogTitle>
            <AlertDialogDescription>
              Todas as notas contidas nesta pasta serão permanentemente perdidas. Tem certeza de que
              deseja prosseguir?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowFolderConfirmDelete(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteFolder(folderToDelete!, true)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sim, Excluir Tudo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
