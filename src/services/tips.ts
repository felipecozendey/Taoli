import { supabase } from '@/lib/supabase/client'

export interface ProfessionalTip {
  id: string
  professional_id: string
  title: string
  content: string
  category: string | null
  created_at: string
}

export async function getProfessionalTips(professionalId: string) {
  const { data, error } = await supabase
    .from('professional_tips')
    .select('*')
    .eq('professional_id', professionalId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createProfessionalTip(tip: {
  professional_id: string
  title: string
  content: string
  category?: string
}) {
  const { data, error } = await supabase
    .from('professional_tips')
    .insert(tip as any)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteProfessionalTip(id: string) {
  const { error } = await supabase.from('professional_tips').delete().eq('id', id)
  if (error) throw error
}
