import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import { BrainCircuit, Network, FileText, Search, Plus, Save, Loader2 } from 'lucide-react'
import { studyService, type StudyNote } from '@/services/study'
import { cn } from '@/lib/utils'

export function SecondBrainPanel() {
  const [notes, setNotes] = useState<StudyNote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)
  const [editorTitle, setEditorTitle] = useState('')
  const [editorContent, setEditorContent] = useState('')
  const { toast } = useToast()

  const fetchNotes = async () => {
    setIsLoading(true)
    const { data, error } = await studyService.getNotes()
    if (error) {
      toast({
        title: 'Erro ao carregar notas',
        description: error.message,
        variant: 'destructive',
      })
    } else if (data) {
      setNotes(data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

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
      toast({
        title: 'Título obrigatório',
        description: 'Por favor, insira um título para a nota.',
        variant: 'destructive',
      })
      return
    }

    setIsSaving(true)
    const { data, error } = await studyService.saveNote(activeNoteId, editorTitle, editorContent)
    setIsSaving(false)

    if (error) {
      toast({
        title: 'Erro ao salvar nota',
        description: error.message,
        variant: 'destructive',
      })
    } else if (data) {
      toast({
        title: 'Nota salva',
        description: 'Sua nota foi salva com sucesso.',
      })
      setActiveNoteId(data.id)
      fetchNotes()
    }
  }

  return (
    <div className="flex flex-col h-full bg-background relative z-0">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/20 shrink-0">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-primary" />
          <span className="font-semibold text-sm">Segundo Cérebro</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 bg-background shadow-sm hover:bg-muted/50"
        >
          <Network className="h-4 w-4 text-muted-foreground" />
          <span className="hidden xl:inline">Ver Grafo de Conhecimento</span>
          <span className="xl:hidden">Grafo</span>
        </Button>
      </div>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar - Notes List */}
        <div className="w-16 sm:w-56 lg:w-64 border-r bg-muted/5 flex flex-col shrink-0">
          <div className="p-3 border-b flex flex-col gap-2">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
              <Input className="h-8 pl-8 text-xs bg-background" placeholder="Buscar notas..." />
            </div>
            <div className="sm:hidden flex justify-center pb-2 border-b mb-1">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>

            <Button
              variant="default"
              size="sm"
              className="h-8 w-full gap-2 text-xs"
              onClick={handleNewNote}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Nova Nota</span>
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {isLoading ? (
              <>
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-9 w-full rounded-md" />
              </>
            ) : notes.length === 0 ? (
              <p className="text-xs text-center text-muted-foreground py-4 hidden sm:block">
                Nenhuma nota.
              </p>
            ) : (
              notes.map((note) => (
                <button
                  key={note.id}
                  onClick={() => handleSelectNote(note)}
                  className={cn(
                    'w-full flex items-center justify-center sm:justify-start gap-3 px-2 py-2 text-sm rounded-md transition-colors',
                    activeNoteId === note.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'hover:bg-muted text-muted-foreground group',
                  )}
                >
                  <FileText
                    className={cn(
                      'h-4 w-4 shrink-0 transition-colors',
                      activeNoteId !== note.id && 'group-hover:text-foreground',
                    )}
                  />
                  <span className="hidden sm:inline truncate text-left">{note.title}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 bg-background overflow-y-auto relative flex flex-col">
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
                <span className="hidden sm:inline">Guardar Nota</span>
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
    </div>
  )
}
