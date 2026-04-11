import { supabase } from '@/lib/supabase/client'

// --- AGENDA ---
export const getAppointmentsByDate = async (profId: string, startDate: string, endDate: string) => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*, client:client_id(raw_user_meta_data)')
    .eq('professional_id', profId)
    .gte('start_time', startDate)
    .lte('start_time', endDate)
    .order('start_time', { ascending: true })

  if (error) throw error
  return data || []
}

export const createAppointment = async (appointmentData: any) => {
  const { error } = await supabase.from('appointments').insert([appointmentData])
  if (error) throw error
}

// --- PLANOS E ASSINATURAS ---
export const getServicePlans = async (profId: string) => {
  const { data, error } = await supabase
    .from('service_plans')
    .select('*')
    .eq('professional_id', profId)
  if (error) throw error
  return data || []
}

export const createServicePlan = async (planData: any) => {
  const { error } = await supabase.from('service_plans').insert([planData])
  if (error) throw error
}

export const getSubscriptions = async (profId: string) => {
  const { data, error } = await supabase
    .from('client_subscriptions')
    .select('*, plan:plan_id(*), client:client_id(raw_user_meta_data)')
    .eq('professional_id', profId)
    .order('next_billing_date', { ascending: true })
  if (error) throw error
  return data || []
}

export const updateSubscriptionStatus = async (subId: string, status: string) => {
  const { error } = await supabase.from('client_subscriptions').update({ status }).eq('id', subId)
  if (error) throw error
}

// --- FINANÇAS ---
export const getTransactionsByMonth = async (
  profId: string,
  startOfMonth: string,
  endOfMonth: string,
) => {
  const { data, error } = await supabase
    .from('financial_transactions')
    .select('*')
    .eq('professional_id', profId)
    .gte('transaction_date', startOfMonth)
    .lte('transaction_date', endOfMonth)
    .order('transaction_date', { ascending: false })

  if (error) throw error
  return data || []
}

export const createTransaction = async (transactionData: any) => {
  const { error } = await supabase.from('financial_transactions').insert([transactionData])
  if (error) throw error
}
