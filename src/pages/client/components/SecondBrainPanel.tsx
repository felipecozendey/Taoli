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
import { useToast } from '@/hooks/use-toast'
import { BrainCircuit, Save, Loader2, Hash, X, Menu } from 'lucide-react'
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
                />
              </div>
              <div className="w-1/2 flex flex-col h-full bg-muted/5">
                <SecondBrainNotesSidebar
                  notes={filteredNotes}
                  isLoading={isLoading}
                  activeNoteId={activeNoteId}
                  onSelectNote={handleSelectNote}
                  onNewNote={handleNewNote}
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
        <div className="hidden md:flex w-56 lg:w-64 border-r bg-muted/10 flex-col shrink-0">
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
          />
        </div>

        {/* Notes List Sidebar - Desktop */}
        <div className="hidden md:flex w-56 lg:w-64 border-r bg-muted/5 flex-col shrink-0">
          <SecondBrainNotesSidebar
            notes={filteredNotes}
            isLoading={isLoading}
            activeNoteId={activeNoteId}
            onSelectNote={handleSelectNote}
            onNewNote={handleNewNote}
          />
        </div>

        {/* Editor Center Column */}
        <div className="flex-1 bg-background overflow-y-auto flex flex-col min-w-0">
          <div className="flex-1 p-4 lg:p-8 flex flex-col max-w-3xl mx-auto w-full gap-4">
            <div className="flex items-center justify-between gap-4 shrink-0 border-b pb-4">
              <Input
                value={editorTitle}
                onChange={(e) => setEditorTitle(e.target.value)}
                placeholder="Título da nota..."
                className="text-xl md:text-2xl lg:text-3xl font-bold border-none px-0 focus-visible:ring-0 h-auto bg-transparent"
              />
              <div className="flex items-center justify-end shrink-0 min-w-[120px]">
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
        <div className="hidden xl:flex w-64 border-l bg-muted/10 p-4 flex-col shrink-0">
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
