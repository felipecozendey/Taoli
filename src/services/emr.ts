import { supabase } from '@/lib/supabase/client'

export async function getLabExams(clientId: string) {
  const { data, error } = await supabase
    .from('lab_exams')
    .select('*')
    .eq('client_id', clientId)
    .order('date', { ascending: false })
  return { data: data || [], error }
}

export async function createLabExam(data: any) {
  const { data: user } = await supabase.auth.getUser()
  if (!user.user) return { error: new Error('User not found') }

  const res = await supabase
    .from('lab_exams')
    .insert({ ...data, professional_id: user.user.id })
    .select()
    .single()
  return res
}

export async function deleteLabExam(id: string) {
  return supabase.from('lab_exams').delete().eq('id', id)
}

export async function getAnamnesisTemplates(profId: string) {
  const { data, error } = await supabase
    .from('anamnesis_templates')
    .select('*')
    .eq('professional_id', profId)
    .order('created_at', { ascending: false })
  return { data: data || [], error }
}

export async function createAnamnesisTemplate(profId: string, name: string, fields: any[]) {
  return supabase
    .from('anamnesis_templates')
    .insert({ professional_id: profId, name, fields })
    .select()
    .single()
}

export async function getAnamnesisResponses(clientId: string) {
  const { data, error } = await supabase
    .from('anamnesis_responses')
    .select('*, template:anamnesis_templates(name)')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
  return { data: data || [], error }
}

export async function createAnamnesisResponse(
  clientId: string,
  profId: string,
  templateId: string,
  responses: any,
) {
  return supabase
    .from('anamnesis_responses')
    .insert({ client_id: clientId, professional_id: profId, template_id: templateId, responses })
    .select()
    .single()
}

export async function getStrengthTests(clientId: string) {
  const { data, error } = await supabase
    .from('strength_tests')
    .select('*')
    .eq('client_id', clientId)
    .order('date', { ascending: false })
  return { data: data || [], error }
}

export async function createStrengthTest(data: any) {
  const { data: user } = await supabase.auth.getUser()
  if (!user.user) return { error: new Error('User not found') }

  return supabase
    .from('strength_tests')
    .insert({ ...data, professional_id: user.user.id })
    .select()
    .single()
}

export async function deleteStrengthTest(id: string) {
  return supabase.from('strength_tests').delete().eq('id', id)
}
