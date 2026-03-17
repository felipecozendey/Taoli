import { useEffect, useState } from 'react'
import { studyService, type StudyDeck, type StudyFlashcard } from '@/services/study'
import { useAuth } from '@/contexts/AuthContext'

export function useFlashcards() {
  const { user, isLoading } = useAuth()
  const [decks, setDecks] = useState<StudyDeck[]>([])
  const [loadingDecks, setLoadingDecks] = useState(true)

  const [isReviewing, setIsReviewing] = useState(false)
  const [currentDeck, setCurrentDeck] = useState<StudyDeck | null>(null)
  const [flashcards, setFlashcards] = useState<StudyFlashcard[]>([])
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

  const startReview = async (deck: StudyDeck) => {
    if (!user) return

    setLoadingCards(true)
    setIsReviewing(true)
    setCurrentDeck(deck)
    setCurrentIndex(0)
    setShowAnswer(false)
    const { data } = await studyService.getDueFlashcards(deck.id)
    setFlashcards(data || [])
    setLoadingCards(false)
  }

  const handleGrade = async (grade: number) => {
    if (!user || !flashcards.length) return

    const card = flashcards[currentIndex]
    console.log(`processCardReview called for card ${card.id} with grade ${grade}`)

    await studyService.processCardReview(card.id, grade, {
      interval: card.interval,
      repetition: card.repetition,
      easeFactor: card.ease_factor,
    })

    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setShowAnswer(false)
    } else {
      setIsReviewing(false)
      setCurrentDeck(null)
    }
  }

  const endReview = () => {
    setIsReviewing(false)
    setCurrentDeck(null)
  }

  return {
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
  }
}

export type FlashcardsData = ReturnType<typeof useFlashcards>
