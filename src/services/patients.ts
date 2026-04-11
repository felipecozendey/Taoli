import { supabase } from '@/lib/supabase/client'

export const getPatientById = async (patientId: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('professional_client_links')
    .select('*, client:profiles!professional_client_links_client_id_fkey(*)')
    .eq('client_id', patientId)
    .eq('professional_id', user.id)
    .single()

  if (error) throw error
  return data
}

export const getMyPatients = async (professionalId: string) => {
  const { data, error } = await supabase
    .from('professional_client_links')
    .select(`
      id,
      status,
      client_id,
      client:profiles!professional_client_links_client_id_fkey(id, name, email)
    `)
    .eq('professional_id', professionalId)

  if (error) {
    throw error
  }

  return data
}
