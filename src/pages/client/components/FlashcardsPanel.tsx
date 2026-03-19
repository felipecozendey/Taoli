import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Layers, Play, BrainCircuit, Plus, Trash2, ChevronLeft, X } from 'lucide-react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { studyService, type StudyDeck, type StudyFlashcard } from '@/services/study'
import type { FlashcardsData } from '@/hooks/use-flashcards'
import { RichTextEditor } from '@/components/shared/RichTextEditor'

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
  const [newCardType, setNewCardType] = useState('traditional')
  const [newCardOptions, setNewCardOptions] = useState<string[]>([])
  const [optionInput, setOptionInput] = useState('')
  const [newCardFront, setNewCardFront] = useState('')
  const [newCardBack, setNewCardBack] = useState('')
  const [isCreatingCard, setIsCreatingCard] = useState(false)

  const {
    decks: initialDecks,
    loadingDecks,
    isReviewing,
    currentDeck,
    dueCards,
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

  const handleOpenCardModalChange = (open: boolean) => {
    setIsCardModalOpen(open)
    if (!open) {
      setNewCardFront('')
      setNewCardBack('')
      setNewCardType('traditional')
      setNewCardOptions([])
      setOptionInput('')
    }
  }

  const handleAddOption = () => {
    if (!optionInput.trim()) return
    if (newCardOptions.includes(optionInput.trim())) return
    setNewCardOptions([...newCardOptions, optionInput.trim()])
    setOptionInput('')
  }

  const handleRemoveOption = (index: number) => {
    setNewCardOptions(newCardOptions.filter((_, i) => i !== index))
  }

  const handleCreateCard = async () => {
    if (!selectedDeck || !newCardFront.trim()) return
    if (newCardType === 'traditional' && !newCardBack.trim()) return
    if (newCardType === 'multiple_choice' && !newCardBack.trim()) return

    const backContent = newCardType === 'cloze' ? newCardFront : newCardBack

    setIsCreatingCard(true)
    const { error } = await studyService.createFlashcard(
      selectedDeck.id,
      newCardFront,
      backContent,
      newCardType,
      newCardOptions,
    )
    setIsCreatingCard(false)
    if (error) return toast({ title: 'Erro', description: error.message, variant: 'destructive' })
    toast({ title: 'Cartão criado!' })

    handleOpenCardModalChange(false)
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

    if (dueCards.length === 0 || currentIndex >= dueCards.length) {
      return (
        <div className="flex flex-col h-full items-center justify-center p-6 bg-muted/10 animate-fade-in">
          <BrainCircuit className="h-16 w-16 text-primary mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Parabéns, terminou por hoje!</h3>
          <p className="text-muted-foreground mb-6">
            Você revisou todos os cartões pendentes deste baralho.
          </p>
          <Button
            onClick={() => {
              endReview()
              setSelectedDeck(null)
            }}
          >
            Voltar para Dashboard
          </Button>
        </div>
      )
    }

    const card = dueCards[currentIndex]
    return (
      <div className="flex flex-col h-full bg-muted/10 animate-fade-in-up">
        <div className="flex justify-between items-center px-4 py-3 border-b bg-background/50 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={endReview}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Sair do Modo de Estudo
            </Button>
            <span className="font-semibold text-sm truncate hidden sm:inline">
              {currentDeck?.title}
            </span>
          </div>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full border shadow-sm">
            Carta {currentIndex + 1} de {dueCards.length}
          </span>
        </div>
        <div className="flex-1 p-4 md:p-8 flex items-center justify-center overflow-y-auto">
          <Card className="w-full max-w-3xl min-h-[400px] p-6 sm:p-10 flex flex-col justify-between shadow-lg border-2 bg-card/95 backdrop-blur">
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
              {card.card_type === 'multiple_choice' && (
                <Badge variant="outline" className="mb-2">
                  Múltipla Escolha
                </Badge>
              )}
              {card.card_type === 'cloze' && (
                <Badge variant="outline" className="mb-2">
                  Completar Lacuna
                </Badge>
              )}

              <div className="w-full prose prose-sm dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: card.front_content }} />
              </div>

              {showAnswer && (
                <>
                  <div className="w-full h-px bg-border my-8 opacity-50" />
                  <div className="w-full prose prose-sm dark:prose-invert text-muted-foreground animate-fade-in">
                    {card.card_type === 'multiple_choice' && (
                      <div className="space-y-3">
                        <p className="font-bold text-foreground text-xl">{card.back_content}</p>
                        {Array.isArray(card.options) && card.options.length > 0 && (
                          <div className="text-sm line-through opacity-50 flex flex-col gap-1">
                            {card.options.map((opt: string, i: number) => (
                              <span key={i}>{opt}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {card.card_type !== 'multiple_choice' && (
                      <div dangerouslySetInnerHTML={{ __html: card.back_content }} />
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="mt-10 shrink-0">
              {!showAnswer ? (
                <Button
                  onClick={() => setShowAnswer(true)}
                  className="w-full h-14 text-lg font-medium shadow-sm"
                  size="lg"
                >
                  Mostrar Resposta
                </Button>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in-up">
                  <Button
                    variant="outline"
                    className="h-14 border-red-500/50 text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                    onClick={() => handleGrade(0)}
                  >
                    Errei (0)
                  </Button>
                  <Button
                    variant="outline"
                    className="h-14 border-orange-500/50 text-orange-600 hover:bg-orange-500 hover:text-white transition-colors"
                    onClick={() => handleGrade(3)}
                  >
                    Difícil (3)
                  </Button>
                  <Button
                    variant="outline"
                    className="h-14 border-green-500/50 text-green-600 hover:bg-green-500 hover:text-white transition-colors"
                    onClick={() => handleGrade(4)}
                  >
                    Bom (4)
                  </Button>
                  <Button
                    variant="outline"
                    className="h-14 border-blue-500/50 text-blue-600 hover:bg-blue-500 hover:text-white transition-colors"
                    onClick={() => handleGrade(5)}
                  >
                    Fácil (5)
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
    const nowISO = new Date().toISOString()
    const dueCardsCount = deckCards.filter((c) => !c.next_review || c.next_review <= nowISO).length

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
            <Button
              size="sm"
              variant="default"
              onClick={() => startReview(selectedDeck, deckCards)}
              disabled={dueCardsCount === 0}
            >
              <Play className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Estudar Agora ({dueCardsCount})</span>
            </Button>
            <Button size="sm" variant="outline" onClick={() => setIsCardModalOpen(true)}>
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
              <Card
                key={card.id}
                className="p-4 flex gap-4 items-start bg-background/80 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-1 grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs font-semibold text-muted-foreground">Frente</p>
                      {card.card_type === 'multiple_choice' && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">
                          Múltipla Escolha
                        </Badge>
                      )}
                      {card.card_type === 'cloze' && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">
                          Cloze
                        </Badge>
                      )}
                    </div>
                    <div
                      className="prose prose-sm dark:prose-invert line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: card.front_content }}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Verso</p>
                    <div
                      className="prose prose-sm dark:prose-invert line-clamp-3 text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html:
                          card.card_type === 'cloze' ? 'Lacuna preenchida' : card.back_content,
                      }}
                    />
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
        <Dialog open={isCardModalOpen} onOpenChange={handleOpenCardModalChange}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Novo Cartão</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label>Tipo de Cartão</Label>
                <Select
                  value={newCardType}
                  onValueChange={(val) => {
                    setNewCardType(val)
                    setNewCardOptions([])
                    setOptionInput('')
                    setNewCardFront('')
                    setNewCardBack('')
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="traditional">Tradicional</SelectItem>
                    <SelectItem value="multiple_choice">Múltipla Escolha</SelectItem>
                    <SelectItem value="cloze">Completar Lacuna (Cloze)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newCardType === 'traditional' && (
                <>
                  <div className="space-y-2">
                    <Label>Frente (Pergunta)</Label>
                    <RichTextEditor
                      content={newCardFront}
                      onChange={setNewCardFront}
                      className="min-h-[150px] border rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Verso (Resposta)</Label>
                    <RichTextEditor
                      content={newCardBack}
                      onChange={setNewCardBack}
                      className="min-h-[150px] border rounded-md"
                    />
                  </div>
                </>
              )}

              {newCardType === 'multiple_choice' && (
                <>
                  <div className="space-y-2">
                    <Label>Pergunta</Label>
                    <RichTextEditor
                      content={newCardFront}
                      onChange={setNewCardFront}
                      className="min-h-[150px] border rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Resposta Correta</Label>
                    <Input value={newCardBack} onChange={(e) => setNewCardBack(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Opções Incorretas (Distratores)</Label>
                    <div className="flex gap-2">
                      <Input
                        value={optionInput}
                        onChange={(e) => setOptionInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleAddOption()
                          }
                        }}
                        placeholder="Ex: Opção errada"
                      />
                      <Button type="button" onClick={handleAddOption} variant="secondary">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {newCardOptions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {newCardOptions.map((opt, i) => (
                          <Badge key={i} variant="secondary" className="flex items-center gap-1">
                            {opt}
                            <X
                              className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive"
                              onClick={() => handleRemoveOption(i)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {newCardType === 'cloze' && (
                <>
                  <div className="space-y-2">
                    <Label>Texto com Lacuna</Label>
                    <RichTextEditor
                      content={newCardFront}
                      onChange={setNewCardFront}
                      className="min-h-[150px] border rounded-md"
                    />
                    <p className="text-[0.8rem] text-muted-foreground leading-snug">
                      Dica: Envolva a palavra em chaves duplas para criar a lacuna. Exemplo: A
                      capital de Portugal é {'{{Lisboa}}'}.
                    </p>
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => handleOpenCardModalChange(false)}
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
                  Revisar Baralho
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
