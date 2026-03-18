import { supabase } from '@/lib/supabase/client'

export interface ProfessionalLink {
  id: string
  professional_id: string
  can_view_nutrition: boolean
  can_view_training: boolean
  can_view_mind: boolean
  status: string
  professional: {
    id: string
    name: string | null
    is_nutritionist: boolean
    is_trainer: boolean
    is_psychologist: boolean
  }
}

export const getMyTeam = async (clientId: string): Promise<ProfessionalLink[]> => {
  const { data, error } = await supabase
    .from('professional_client_links')
    .select(`
      id,
      professional_id,
      can_view_nutrition,
      can_view_training,
      can_view_mind,
      status,
      professional:profiles!professional_client_links_professional_id_fkey(
        id,
        name,
        is_nutritionist,
        is_trainer,
        is_psychologist
      )
    `)
    .eq('client_id', clientId)

  if (error) throw error

  // Unwrap potential array from One-to-One join and ensure type safety
  return (data || []).map((item: any) => ({
    ...item,
    professional: Array.isArray(item.professional) ? item.professional[0] : item.professional,
  })) as ProfessionalLink[]
}

export const connectProfessional = async (clientId: string, professionalId: string) => {
  try {
    const { data, error } = await supabase
      .from('professional_client_links')
      .insert({
        client_id: clientId,
        professional_id: professionalId,
        status: 'active',
        can_view_nutrition: false,
        can_view_training: false,
        can_view_mind: false,
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error: any) {
    if (error.code === '23505') throw new Error('Já está conectado com este profissional.')
    if (error.code === '22P02') throw new Error('Chave de profissional inválida.')
    if (error.code === '23503') throw new Error('Profissional não encontrado.')
    throw new Error('Não foi possível conectar ao profissional.')
  }
}

export const updatePermissions = async (
  linkId: string,
  permissions: {
    can_view_nutrition?: boolean
    can_view_training?: boolean
    can_view_mind?: boolean
  },
) => {
  const { error } = await supabase
    .from('professional_client_links')
    .update(permissions)
    .eq('id', linkId)

  if (error) throw error
}

export const disconnectProfessional = async (linkId: string) => {
  const { error } = await supabase.from('professional_client_links').delete().eq('id', linkId)

  if (error) throw error
}
