import { supabase } from '@/lib/supabase/client'

export async function addMoodLog(clientId: string, mood: string, notes?: string) {
  const { data, error } = await supabase
    .from('mood_logs' as any)
    .insert({
      client_id: clientId,
      mood,
      notes,
    })
    .select()
    .single()

  if (error) throw error
  return { data, error: null }
}
