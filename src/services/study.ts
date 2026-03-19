import { supabase } from '@/lib/supabase/client'
import { calculateNextReview, type SRSItem } from '@/lib/srs'
import type { Database } from '@/lib/supabase/types'

export type StudyDeck = Database['public']['Tables']['study_decks']['Row']
export type StudyFlashcard = Database['public']['Tables']['study_flashcards']['Row']
export type StudyNote = Database['public']['Tables']['study_notes']['Row']
export type StudyFolder = Database['public']['Tables']['study_folders']['Row']

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
        .or(
          `next_review.lte.${now},next_review.is.null,next_review_date.lte.${now},next_review_date.is.null`,
        )
        .order('next_review', { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching due flashcards:', error)
      return { data: [], error }
    }
  },

  async updateFlashcardReview(
    cardId: string,
    data: { next_review: string; efactor: number; interval: number; repetition: number },
  ) {
    try {
      const { error } = await supabase
        .from('study_flashcards')
        .update({
          next_review: data.next_review,
          next_review_date: data.next_review,
          efactor: data.efactor,
          ease_factor: data.efactor,
          interval: data.interval,
          repetition: data.repetition,
        })
        .eq('id', cardId)

      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Error updating flashcard review:', error)
      return { error }
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
          efactor: nextReview.easeFactor,
          next_review: nextReview.nextReviewDate.toISOString(),
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

  async saveNote(
    id: string | null | undefined,
    title: string,
    content: string,
    folderId?: string | null,
    tags: string[] = [],
  ) {
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
        folder_id: folderId || null,
        tags,
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

  async getBacklinks(noteId: string) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return { data: [], error: new Error('Not authenticated') }

      const { data, error } = await supabase
        .from('study_notes')
        .select('id, title')
        .eq('user_id', user.id)
        .neq('id', noteId)
        .ilike('content', `%${noteId}%`)

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching backlinks:', error)
      return { data: [], error }
    }
  },

  async getFolders() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return { data: [], error: new Error('Not authenticated') }

      const { data, error } = await supabase
        .from('study_folders')
        .select('*')
        .eq('user_id', user.id)
        .order('name', { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching folders:', error)
      return { data: [], error }
    }
  },

  async createFolder(name: string, parentId?: string | null) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return { data: null, error: new Error('Not authenticated') }

      const folderData = {
        name,
        parent_id: parentId || null,
        user_id: user.id,
      }

      const { data, error } = await supabase
        .from('study_folders')
        .insert([folderData])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating folder:', error)
      return { data: null, error }
    }
  },

  async deleteFolder(id: string) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return { error: new Error('Not authenticated') }

      const { error } = await supabase
        .from('study_folders')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Error deleting folder:', error)
      return { error }
    }
  },

  async getFlashcards(deckId: string) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return { data: [], error: new Error('Not authenticated') }

      const { data, error } = await supabase
        .from('study_flashcards')
        .select('*')
        .eq('deck_id', deckId)
        .order('id', { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching flashcards:', error)
      return { data: [], error }
    }
  },

  async createFlashcard(
    deckId: string,
    frontContent: string,
    backContent: string,
    cardType: string = 'traditional',
    options: string[] = [],
  ) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return { data: null, error: new Error('Not authenticated') }

      const { data, error } = await supabase
        .from('study_flashcards')
        .insert([
          {
            deck_id: deckId,
            front_content: frontContent,
            back_content: backContent,
            card_type: cardType,
            options: options,
          },
        ])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating flashcard:', error)
      return { data: null, error }
    }
  },

  async deleteFlashcard(cardId: string) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return { error: new Error('Not authenticated') }

      const { error } = await supabase.from('study_flashcards').delete().eq('id', cardId)
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Error deleting flashcard:', error)
      return { error }
    }
  },

  async deleteDeck(deckId: string) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return { error: new Error('Not authenticated') }

      const { error } = await supabase
        .from('study_decks')
        .delete()
        .eq('id', deckId)
        .eq('user_id', user.id)
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Error deleting deck:', error)
      return { error }
    }
  },
}
