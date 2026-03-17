import { supabase } from '@/lib/supabase/client'
import { calculateNextReview, type SRSItem } from '@/lib/srs'
import type { Database } from '@/lib/supabase/types'

export type StudyDeck = Database['public']['Tables']['study_decks']['Row']
export type StudyFlashcard = Database['public']['Tables']['study_flashcards']['Row']
export type StudyNote = Database['public']['Tables']['study_notes']['Row']

export const studyService = {
  async getDecks() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return { data: [], error: new Error('Not authenticated') }

      const { data, error } = await supabase
        .from('study_decks')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching study decks:', error)
      return { data: [], error }
    }
  },

  async createDeck(title: string, description?: string) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return { data: null, error: new Error('Not authenticated') }

      const deckData = {
        title,
        description: description || null,
        user_id: user.id,
      }

      const { data, error } = await supabase
        .from('study_decks')
        .insert([deckData])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating study deck:', error)
      return { data: null, error }
    }
  },

  async getDueFlashcards(deckId: string) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return { data: [], error: new Error('Not authenticated') }

      const now = new Date().toISOString()
      const { data, error } = await supabase
        .from('study_flashcards')
        .select('*')
        .eq('deck_id', deckId)
        .or(`next_review_date.lte.${now},next_review_date.is.null`)
        .order('next_review_date', { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching due flashcards:', error)
      return { data: [], error }
    }
  },

  async processCardReview(cardId: string, grade: number, currentData: SRSItem) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return { data: null, error: new Error('Not authenticated') }

      const nextReview = calculateNextReview(currentData, grade)

      const { data, error } = await supabase
        .from('study_flashcards')
        .update({
          interval: nextReview.interval,
          repetition: nextReview.repetition,
          ease_factor: nextReview.easeFactor,
          next_review_date: nextReview.nextReviewDate.toISOString(),
        })
        .eq('id', cardId)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error processing card review:', error)
      return { data: null, error }
    }
  },

  async getNotes() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return { data: [], error: new Error('Not authenticated') }

      const { data, error } = await supabase
        .from('study_notes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching notes:', error)
      return { data: [], error }
    }
  },

  async saveNote(id: string | null | undefined, title: string, content: string) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return { data: null, error: new Error('Not authenticated') }

      const noteData = {
        title,
        content,
        user_id: user.id,
        updated_at: new Date().toISOString(),
      }

      let result

      if (id) {
        result = await supabase
          .from('study_notes')
          .update(noteData)
          .eq('id', id)
          .eq('user_id', user.id)
          .select()
          .single()
      } else {
        result = await supabase.from('study_notes').insert([noteData]).select().single()
      }

      if (result.error) throw result.error
      return { data: result.data, error: null }
    } catch (error) {
      console.error('Error saving note:', error)
      return { data: null, error }
    }
  },
}
