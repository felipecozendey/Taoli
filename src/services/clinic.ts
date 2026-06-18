import { supabase } from '@/lib/supabase/client'
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns'

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

export const createAppointments = async (appointmentsData: any[]) => {
  const { error } = await supabase.from('appointments').insert(appointmentsData)
  if (error) throw error
}

export const updateAppointment = async (id: string, appointmentData: any) => {
  const { error } = await supabase.from('appointments').update(appointmentData).eq('id', id)
  if (error) throw error
}

export const deleteAppointment = async (id: string) => {
  const { error } = await supabase.from('appointments').delete().eq('id', id)
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

export const updateServicePlan = async (id: string, planData: any) => {
  const { error } = await supabase.from('service_plans').update(planData).eq('id', id)
  if (error) throw error
}

export const deleteServicePlan = async (id: string) => {
  const { error } = await supabase.from('service_plans').delete().eq('id', id)
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

export const getClientSubscriptions = async (profId: string, clientId: string) => {
  const { data, error } = await supabase
    .from('client_subscriptions')
    .select('*, plan:plan_id(*)')
    .eq('professional_id', profId)
    .eq('client_id', clientId)
  if (error) throw error
  return data || []
}

export const createClientSubscription = async (data: any) => {
  const { error } = await supabase.from('client_subscriptions').insert([data])
  if (error) throw error
}

export const updateSubscriptionStatus = async (subId: string, status: string) => {
  const { error } = await supabase.from('client_subscriptions').update({ status }).eq('id', subId)
  if (error) throw error
}

// --- FINANÇAS ---
export const getTransactionsByMonth = async (
  profId: string,
  startOfMonthStr: string,
  endOfMonthStr: string,
) => {
  const { data, error } = await supabase
    .from('financial_transactions')
    .select('*')
    .eq('professional_id', profId)
    .gte('transaction_date', startOfMonthStr)
    .lte('transaction_date', endOfMonthStr)
    .order('transaction_date', { ascending: false })

  if (error) throw error
  return data || []
}

export const getTransactions = async (profId: string) => {
  const { data, error } = await supabase
    .from('financial_transactions')
    .select('*, client:client_id(name)')
    .eq('professional_id', profId)
    .order('transaction_date', { ascending: false })

  if (error) throw error
  return data || []
}

export const getClientTransactions = async (profId: string, clientId: string) => {
  const { data, error } = await supabase
    .from('financial_transactions')
    .select('*')
    .eq('professional_id', profId)
    .eq('client_id', clientId)
    .order('transaction_date', { ascending: false })
  if (error) throw error
  return data || []
}

export const createTransaction = async (transactionData: any) => {
  const { error } = await supabase.from('financial_transactions').insert([transactionData])
  if (error) throw error
}

export const updateTransactionStatus = async (txId: string, status: string) => {
  const { error } = await supabase.from('financial_transactions').update({ status }).eq('id', txId)
  if (error) throw error
}

// --- DASHBOARD ---
export const getDashboardMetrics = async (profId: string) => {
  const now = new Date()
  const startMonthStr = format(startOfMonth(now), 'yyyy-MM-dd')
  const endMonthStr = format(endOfMonth(now), 'yyyy-MM-dd')
  const today = format(now, 'yyyy-MM-dd')

  const { data: incomeTx } = await supabase
    .from('financial_transactions')
    .select('amount')
    .eq('professional_id', profId)
    .eq('type', 'income')
    .eq('status', 'paid')
    .gte('transaction_date', startMonthStr)
    .lte('transaction_date', endMonthStr)

  const startMonthIso = startOfMonth(now).toISOString()
  const endMonthIso = endOfMonth(now).toISOString()
  const { count: consultationsCount } = await supabase
    .from('appointments')
    .select('*', { count: 'exact', head: true })
    .eq('professional_id', profId)
    .in('status', ['confirmed', 'realizado', 'done'])
    .gte('start_time', startMonthIso)
    .lte('start_time', endMonthIso)

  const { data: pendingTx } = await supabase
    .from('financial_transactions')
    .select('amount')
    .eq('professional_id', profId)
    .eq('type', 'income')
    .in('status', ['pending', 'overdue'])
    .lt('transaction_date', today)

  const { data: subs } = await supabase
    .from('client_subscriptions')
    .select('status, plan:plan_id(price, billing_cycle)')
    .eq('professional_id', profId)
    .in('status', ['active', 'overdue'])

  const { count: activePatientsCount } = await supabase
    .from('professional_client_links')
    .select('*', { count: 'exact', head: true })
    .eq('professional_id', profId)
    .eq('status', 'active')

  const safeIncomeTx = incomeTx ?? []
  const safePendingTx = pendingTx ?? []
  const safeSubs = subs ?? []

  const monthlyRevenue =
    safeIncomeTx.reduce((acc, tx) => acc + Math.round(Number(tx.amount) * 100), 0) / 100
  const delinquency =
    safePendingTx.reduce((acc, tx) => acc + Math.round(Number(tx.amount) * 100), 0) / 100

  let mrrCents = 0
  safeSubs.forEach((sub) => {
    if (sub.plan && !Array.isArray(sub.plan)) {
      const priceCents = Math.round(Number(sub.plan.price) * 100) || 0
      const cycle = sub.plan.billing_cycle
      if (cycle === 'monthly') mrrCents += priceCents
      else if (cycle === 'quarterly') mrrCents += Math.round(priceCents / 3)
      else if (cycle === 'yearly') mrrCents += Math.round(priceCents / 12)
    }
  })
  const mrr = mrrCents / 100

  const sixMonthsAgo = format(startOfMonth(subMonths(now, 5)), 'yyyy-MM-dd')
  const { data: chartTx } = await supabase
    .from('financial_transactions')
    .select('amount, transaction_date')
    .eq('professional_id', profId)
    .eq('type', 'income')
    .eq('status', 'paid')
    .gte('transaction_date', sixMonthsAgo)

  return {
    monthlyRevenue,
    consultationsCount: consultationsCount || 0,
    delinquency,
    mrr,
    activePatientsCount: activePatientsCount || 0,
    chartTx: chartTx ?? [],
  }
}

// --- CONFIGURAÇÕES ---
export const getProfessionalSettings = async (profId: string) => {
  const { data, error } = await supabase
    .from('professional_settings')
    .select('*')
    .eq('professional_id', profId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export const upsertProfessionalSettings = async (profId: string, settings: any) => {
  const { error } = await supabase
    .from('professional_settings')
    .upsert({ professional_id: profId, ...settings }, { onConflict: 'professional_id' })
  if (error) throw error
}
