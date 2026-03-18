import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

export type Profile = Database['public']['Tables']['profiles']['Row']

export interface UpdateAccessData {
  role: string
  is_nutritionist: boolean
  is_trainer: boolean
  is_psychologist: boolean
}

/**
 * Fetches all user profiles from the database, ordered by creation date (newest first).
 */
export const getAllProfiles = async (): Promise<Profile[]> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return data || []
  } catch (error: any) {
    console.error('Error fetching all profiles:', error)
    throw new Error(error.message || 'Failed to fetch profiles')
  }
}

/**
 * Updates a specific user's role and specialties in the database.
 */
export const updateUserAccess = async (userId: string, data: UpdateAccessData): Promise<void> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        role: data.role,
        is_nutritionist: data.is_nutritionist,
        is_trainer: data.is_trainer,
        is_psychologist: data.is_psychologist,
      })
      .eq('id', userId)

    if (error) throw error
  } catch (error: any) {
    console.error('Error updating user access:', error)
    throw new Error(error.message || 'Failed to update user access')
  }
}
