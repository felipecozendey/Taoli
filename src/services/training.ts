import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

export const getExercises = async (category?: string) => {
  try {
    let query = supabase.from('exercises').select('*').order('name')

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error in getExercises:', error)
    throw error
  }
}

export const createPlan = async (
  clientId: string,
  name: string,
  planType: 'workout' | 'rehabilitation',
) => {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('exercise_plans')
      .insert({
        professional_id: user.id,
        client_id: clientId,
        name,
        plan_type: planType,
        is_active: true,
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error in createPlan:', error)
    throw error
  }
}

export const getProfessionalPlans = async () => {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('exercise_plans')
      .select(`
        *,
        client:profiles!exercise_plans_client_id_fkey(id, name)
      `)
      .eq('professional_id', user.id)

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error in getProfessionalPlans:', error)
    throw error
  }
}

export const getClientActivePlans = async (clientId: string) => {
  try {
    const { data, error } = await supabase
      .from('exercise_plans')
      .select('*')
      .eq('client_id', clientId)
      .eq('is_active', true)

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error in getClientActivePlans:', error)
    throw error
  }
}

export interface PlanItemDetails {
  sets: number
  reps: string
  rest_seconds?: number
  target_load_kg?: number
  frequency?: string
  pain_limit_eva?: number
  notes?: string
  order_index: number
}

export const addPlanItem = async (planId: string, exerciseId: string, details: PlanItemDetails) => {
  try {
    const { data, error } = await supabase
      .from('exercise_plan_items')
      .insert({
        plan_id: planId,
        exercise_id: exerciseId,
        sets: details.sets,
        reps: details.reps,
        rest_seconds: details.rest_seconds || null,
        target_load_kg: details.target_load_kg || null,
        frequency: details.frequency || null,
        pain_limit_eva: details.pain_limit_eva || null,
        notes: details.notes || null,
        order_index: details.order_index,
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error in addPlanItem:', error)
    throw error
  }
}

export const getFullPlanDetails = async (planId: string) => {
  try {
    const { data, error } = await supabase
      .from('exercise_plans')
      .select(`
        *,
        items:exercise_plan_items(
          *,
          exercise:exercises(
            name, 
            muscle_group, 
            video_url
          )
        )
      `)
      .eq('id', planId)
      .single()

    if (error) throw error

    if (data && data.items) {
      // Sort items by order_index
      data.items.sort((a, b) => a.order_index - b.order_index)
    }

    return data
  } catch (error) {
    console.error('Error in getFullPlanDetails:', error)
    throw error
  }
}
