import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Layers, Play, BrainCircuit } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import type { FlashcardsData } from '@/hooks/use-flashcards'

interface FlashcardsPanelProps {
  data: FlashcardsData
}

export function FlashcardsPanel({ data }: FlashcardsPanelProps) {
  const {
    decks,
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

  if (isReviewing) {
    if (loadingCards) {
      return (
        <div className="flex flex-col h-full bg-muted/10 p-6 space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      )
    }

    if (flashcards.length === 0) {
      return (
        <div className="flex flex-col h-full items-center justify-center p-6 bg-muted/10">
          <BrainCircuit className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Você está em dia!</h3>
          <p className="text-muted-foreground mb-6 text-center">
            Nenhum flashcard pendente para revisão neste baralho agora.
          </p>
          <Button onClick={endReview}>Voltar aos Baralhos</Button>
        </div>
      )
    }

    const card = flashcards[currentIndex]

    return (
      <div className="flex flex-col h-full bg-muted/10 animate-fade-in-up">
        <div className="flex items-center justify-between px-4 py-3 border-b bg-background/50 backdrop-blur-sm shrink-0">
          <span className="font-semibold text-sm truncate pr-4">{currentDeck?.title}</span>
          <span className="text-xs text-muted-foreground font-medium bg-muted px-2 py-1 rounded-md shrink-0">
            {currentIndex + 1} / {flashcards.length}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center justify-center">
          <Card className="w-full max-w-lg min-h-[350px] flex flex-col p-6 sm:p-8 shadow-md relative overflow-hidden bg-background/80 backdrop-blur-xl border-border/50">
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="text-xl sm:text-2xl font-medium text-foreground leading-relaxed">
                {card.front_content}
              </div>

              {showAnswer && (
                <>
                  <div className="w-full h-px bg-border my-6 sm:my-8" />
                  <div className="text-lg sm:text-xl text-muted-foreground animate-fade-in-up leading-relaxed">
                    {card.back_content}
                  </div>
                </>
              )}
            </div>

            <div className="mt-8 pt-4 w-full shrink-0">
              {!showAnswer ? (
                <Button
                  onClick={() => setShowAnswer(true)}
                  className="w-full h-12 text-base font-semibold"
                >
                  Revelar Resposta
                </Button>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full animate-fade-in">
                  <Button variant="destructive" className="h-12" onClick={() => handleGrade(1)}>
                    Errei
                  </Button>
                  <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white h-12"
                    onClick={() => handleGrade(3)}
                  >
                    Difícil
                  </Button>
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-white h-12"
                    onClick={() => handleGrade(4)}
                  >
                    Bom
                  </Button>
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white h-12"
                    onClick={() => handleGrade(5)}
                  >
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

  return (
    <div className="flex flex-col h-full bg-muted/10 relative z-0">
      <div className="flex items-center px-4 py-3 border-b bg-background/50 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-amber-500" />
          <span className="font-semibold text-sm">Flashcards (SRS)</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 lg:p-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
          Meus Baralhos Ativos
        </h3>

        {loadingDecks ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
        ) : decks.length === 0 ? (
          <Card className="border-dashed bg-transparent shadow-none flex flex-col items-center justify-center p-8 text-center mt-4">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Layers className="h-6 w-6 text-muted-foreground" />
            </div>
            <h4 className="text-lg font-medium mb-2">Nenhum baralho encontrado</h4>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Você ainda não possui baralhos. Crie um novo para começar a revisar com repetição
              espaçada.
            </p>
            <Button variant="outline" className="gap-2">
              <Layers className="h-4 w-4" />
              Criar Novo Baralho
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {decks.map((deck) => (
              <Card
                key={deck.id}
                className="bg-background/60 backdrop-blur-xl border-border/50 shadow-sm hover:shadow-md hover:bg-background/80 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors"></div>
                <CardHeader className="pb-4 relative z-10">
                  <CardTitle className="text-xl mb-1.5">{deck.title}</CardTitle>
                  {deck.description && <CardDescription>{deck.description}</CardDescription>}
                </CardHeader>
                <CardContent className="relative z-10">
                  <Button
                    size="lg"
                    className="w-full gap-2 rounded-xl h-12 font-medium text-base shadow-sm"
                    onClick={() => startReview(deck)}
                  >
                    <Play className="h-4 w-4 fill-current" />
                    Estudar Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
