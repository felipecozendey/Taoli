import { useEffect, useState } from 'react'
import { studyService, type StudyDeck, type StudyFlashcard } from '@/services/study'
import { useAuth } from '@/contexts/AuthContext'
import { calculateSRS } from '@/lib/srs'

export function useFlashcards() {
  const { user, isLoading } = useAuth()
  const [decks, setDecks] = useState<StudyDeck[]>([])
  const [loadingDecks, setLoadingDecks] = useState(true)

  const [isReviewing, setIsReviewing] = useState(false)
  const [currentDeck, setCurrentDeck] = useState<StudyDeck | null>(null)
  const [dueCards, setDueCards] = useState<StudyFlashcard[]>([])
  const [loadingCards, setLoadingCards] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    if (isLoading) return

    if (!user) {
      setLoadingDecks(false)
      return
    }

    setLoadingDecks(true)
    studyService.getDecks().then(({ data }) => {
      setDecks(data || [])
      setLoadingDecks(false)
    })
  }, [user, isLoading])

  const startReview = async (deck: StudyDeck, deckCards?: StudyFlashcard[]) => {
    if (!user) return

    setLoadingCards(true)
    setIsReviewing(true)
    setCurrentDeck(deck)
    setCurrentIndex(0)
    setShowAnswer(false)

    let cards = deckCards
    if (!cards) {
      const { data } = await studyService.getFlashcards(deck.id)
      cards = data || []
    }

    const now = new Date().toISOString()
    const due = cards.filter((c) => !c.next_review || c.next_review <= now)

    setDueCards(due)
    setLoadingCards(false)
  }

  const handleGrade = async (grade: number) => {
    if (!user || !dueCards.length) return

    const card = dueCards[currentIndex]

    const nextReview = calculateSRS(
      {
        interval: card.interval || 0,
        repetition: card.repetition || 0,
        easeFactor: card.efactor || card.ease_factor || 2.5,
      },
      grade,
    )

    await studyService.updateFlashcardReview(card.id, {
      interval: nextReview.interval,
      repetition: nextReview.repetition,
      efactor: nextReview.easeFactor,
      next_review: nextReview.nextReviewDate.toISOString(),
    })

    if (currentIndex < dueCards.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setShowAnswer(false)
    } else {
      setCurrentIndex(dueCards.length)
    }
  }

  const endReview = () => {
    setIsReviewing(false)
    setCurrentDeck(null)
    setDueCards([])
    setCurrentIndex(0)
  }

  return {
    decks,
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
  }
}

export type FlashcardsData = ReturnType<typeof useFlashcards>
