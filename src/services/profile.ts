import { supabase } from '@/lib/supabase/client'
import type { TablesUpdate } from '@/lib/supabase/types'
import type { User } from '@supabase/supabase-js'

export const uploadAvatar = async (userId: string, file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop()
  const uuid = crypto.randomUUID()
  const fileName = `${userId}-${uuid}.${fileExt}`
  const filePath = `${fileName}`

  const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)
  if (uploadError) throw uploadError

  const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
  return data.publicUrl
}

export const updateUserProfile = async (
  metadata: TablesUpdate<'profiles'>,
): Promise<{ user: User | null }> => {
  const { data, error } = await supabase.auth.updateUser({ data: metadata })
  if (error) throw error

  // Sync name with profiles table if it's being updated
  if (metadata.name) {
    const { data: sessionData } = await supabase.auth.getSession()
    if (sessionData?.session?.user?.id) {
      await supabase
        .from('profiles')
        .update({ name: metadata.name })
        .eq('id', sessionData.session.user.id)
    }
  }

  return data
}
