import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Layers, Play, BrainCircuit, Plus, Trash2, ChevronLeft } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { studyService, type StudyDeck, type StudyFlashcard } from '@/services/study'
import type { FlashcardsData } from '@/hooks/use-flashcards'

interface FlashcardsPanelProps {
  data: FlashcardsData
}

export function FlashcardsPanel({ data }: FlashcardsPanelProps) {
  const { toast } = useToast()
  const [localDecks, setLocalDecks] = useState<StudyDeck[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newDeckTitle, setNewDeckTitle] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const [selectedDeck, setSelectedDeck] = useState<StudyDeck | null>(null)
  const [deckCards, setDeckCards] = useState<StudyFlashcard[]>([])
  const [loadingDeckCards, setLoadingDeckCards] = useState(false)
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [newCardFront, setNewCardFront] = useState('')
  const [newCardBack, setNewCardBack] = useState('')
  const [isCreatingCard, setIsCreatingCard] = useState(false)

  const {
    decks: initialDecks,
    loadingDecks,
    isReviewing,
    currentDeck,
    flashcards,
    loadingCards,
    currentIndex,
    showAnswer,
    setShowAnswer,
    startReview,
    handleGrade,
    endReview,
  } = data

  useEffect(() => {
    setLocalDecks(initialDecks)
  }, [initialDecks])

  const refreshDecks = async () => {
    const { data: rDecks } = await studyService.getDecks()
    if (rDecks) setLocalDecks(rDecks)
  }

  const handleCreateDeck = async () => {
    if (!newDeckTitle.trim()) return toast({ title: 'Título obrigatório', variant: 'destructive' })
    setIsCreating(true)
    const { data: newDeck, error } = await studyService.createDeck(newDeckTitle.trim())
    setIsCreating(false)
    if (error || !newDeck) return toast({ title: 'Erro ao criar baralho', variant: 'destructive' })
    toast({ title: 'Baralho criado!' })
    setNewDeckTitle('')
    setIsDialogOpen(false)
    await refreshDecks()
  }

  const handleDeleteDeck = async (e: React.MouseEvent, deckId: string) => {
    e.stopPropagation()
    if (!confirm('Tem certeza que deseja excluir este baralho?')) return
    const { error } = await studyService.deleteDeck(deckId)
    if (error) return toast({ title: 'Erro', description: error.message, variant: 'destructive' })
    toast({ title: 'Baralho excluído' })
    await refreshDecks()
  }

  const handleSelectDeck = async (deck: StudyDeck) => {
    setSelectedDeck(deck)
    setLoadingDeckCards(true)
    const { data } = await studyService.getFlashcards(deck.id)
    if (data) setDeckCards(data)
    setLoadingDeckCards(false)
  }

  const handleCreateCard = async () => {
    if (!selectedDeck || !newCardFront.trim() || !newCardBack.trim()) return
    setIsCreatingCard(true)
    const { error } = await studyService.createFlashcard(selectedDeck.id, newCardFront, newCardBack)
    setIsCreatingCard(false)
    if (error) return toast({ title: 'Erro', description: error.message, variant: 'destructive' })
    toast({ title: 'Cartão criado!' })
    setIsCardModalOpen(false)
    setNewCardFront('')
    setNewCardBack('')
    handleSelectDeck(selectedDeck)
  }

  const handleDeleteCard = async (cardId: string) => {
    if (!confirm('Excluir este flashcard?')) return
    const { error } = await studyService.deleteFlashcard(cardId)
    if (error) return toast({ title: 'Erro', variant: 'destructive' })
    toast({ title: 'Cartão excluído' })
    if (selectedDeck) handleSelectDeck(selectedDeck)
  }

  if (isReviewing) {
    if (loadingCards)
      return (
        <div className="p-6 space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-[300px]" />
        </div>
      )
    if (flashcards.length === 0)
      return (
        <div className="flex flex-col h-full items-center justify-center p-6 bg-muted/10">
          <BrainCircuit className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Você está em dia!</h3>
          <Button className="mt-4" onClick={endReview}>
            Voltar
          </Button>
        </div>
      )
    const card = flashcards[currentIndex]
    return (
      <div className="flex flex-col h-full bg-muted/10 animate-fade-in-up">
        <div className="flex justify-between px-4 py-3 border-b bg-background/50 backdrop-blur-sm shrink-0">
          <span className="font-semibold text-sm truncate">{currentDeck?.title}</span>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
            {currentIndex + 1} / {flashcards.length}
          </span>
        </div>
        <div className="flex-1 p-4 md:p-8 flex items-center justify-center">
          <Card className="w-full max-w-lg min-h-[350px] p-6 flex flex-col justify-between shadow-md">
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="text-xl font-medium">{card.front_content}</div>
              {showAnswer && (
                <>
                  <div className="w-full h-px bg-border my-6" />
                  <div className="text-lg text-muted-foreground">{card.back_content}</div>
                </>
              )}
            </div>
            <div className="mt-8 shrink-0">
              {!showAnswer ? (
                <Button onClick={() => setShowAnswer(true)} className="w-full h-12">
                  Revelar Resposta
                </Button>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Button variant="destructive" onClick={() => handleGrade(1)}>
                    Errei
                  </Button>
                  <Button
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() => handleGrade(3)}
                  >
                    Difícil
                  </Button>
                  <Button
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => handleGrade(4)}
                  >
                    Bom
                  </Button>
                  <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => handleGrade(5)}>
                    Fácil
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (selectedDeck) {
    return (
      <div className="flex flex-col h-full bg-muted/10 animate-fade-in">
        <div className="flex items-center justify-between px-4 py-3 border-b bg-background/50 shrink-0">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setSelectedDeck(null)}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="font-semibold text-sm">{selectedDeck.title}</h2>
              <p className="text-xs text-muted-foreground">{deckCards.length} cartões</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => startReview(selectedDeck)}>
              <Play className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Estudar</span>
            </Button>
            <Button size="sm" onClick={() => setIsCardModalOpen(true)}>
              <Plus className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Adicionar</span>
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loadingDeckCards ? (
            <Skeleton className="h-20 w-full" />
          ) : deckCards.length === 0 ? (
            <p className="text-center text-muted-foreground mt-10">Nenhum cartão adicionado.</p>
          ) : (
            deckCards.map((card) => (
              <Card key={card.id} className="p-4 flex gap-4 items-start bg-background/80 shadow-sm">
                <div className="flex-1 grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Frente</p>
                    <p className="text-sm line-clamp-3">{card.front_content}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Verso</p>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {card.back_content}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive shrink-0 h-8 w-8 hover:bg-destructive/10"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </Card>
            ))
          )}
        </div>
        <Dialog open={isCardModalOpen} onOpenChange={setIsCardModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Cartão</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label>Frente (Pergunta)</Label>
                <Textarea value={newCardFront} onChange={(e) => setNewCardFront(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Verso (Resposta)</Label>
                <Textarea value={newCardBack} onChange={(e) => setNewCardBack(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCardModalOpen(false)}
                disabled={isCreatingCard}
              >
                Cancelar
              </Button>
              <Button onClick={handleCreateCard} disabled={isCreatingCard}>
                {isCreatingCard ? 'Salvando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-muted/10">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-background/50 shrink-0">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-amber-500" />
          <span className="font-semibold text-sm">Flashcards (SRS)</span>
        </div>
        <Button size="sm" variant="outline" onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Baralho
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
        {loadingDecks ? (
          <Skeleton className="h-32 w-full" />
        ) : localDecks.length === 0 ? (
          <Card className="border-dashed bg-transparent p-8 text-center flex flex-col items-center">
            <Layers className="h-8 w-8 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-4">Nenhum baralho encontrado.</p>
            <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
              Criar Baralho
            </Button>
          </Card>
        ) : (
          localDecks.map((deck) => (
            <Card
              key={deck.id}
              className="bg-background/60 hover:bg-background/80 transition-all group cursor-pointer shadow-sm relative"
              onClick={() => handleSelectDeck(deck)}
            >
              <CardHeader className="pb-4 flex flex-row items-start justify-between space-y-0 relative z-10">
                <div>
                  <CardTitle className="text-xl mb-1.5">{deck.title}</CardTitle>
                  {deck.description && <CardDescription>{deck.description}</CardDescription>}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10"
                  onClick={(e) => handleDeleteDeck(e, deck.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="relative z-10">
                <Button
                  size="lg"
                  className="w-full gap-2 shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    startReview(deck)
                  }}
                >
                  <Play className="h-4 w-4 fill-current" />
                  Estudar Agora
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Baralho</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <Label>Título do Baralho</Label>
            <Input value={newDeckTitle} onChange={(e) => setNewDeckTitle(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isCreating}>
              Cancelar
            </Button>
            <Button onClick={handleCreateDeck} disabled={isCreating}>
              {isCreating ? 'Criando...' : 'Criar Baralho'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
