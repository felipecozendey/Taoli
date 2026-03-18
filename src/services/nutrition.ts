import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

type DietInsert = Database['public']['Tables']['diets']['Insert']
type MealInsert = Database['public']['Tables']['meals']['Insert']
type MealItemInsert = Database['public']['Tables']['meal_items']['Insert']

export async function createDiet(clientId: string, name: string) {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) throw authError
    if (!user) throw new Error('Not authenticated')

    const newDiet: DietInsert = {
      client_id: clientId,
      professional_id: user.id,
      name,
      is_active: true,
    }

    const { data, error } = await supabase.from('diets').insert(newDiet).select().single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error creating diet:', error)
    return { data: null, error }
  }
}

export async function getProfessionalDiets() {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) throw authError
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('diets')
      .select('*')
      .eq('professional_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching professional diets:', error)
    return { data: null, error }
  }
}

export async function getClientActiveDiet(clientId: string) {
  try {
    const { data, error } = await supabase
      .from('diets')
      .select('*')
      .eq('client_id', clientId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 is no rows returned
    return { data: data || null, error: null }
  } catch (error) {
    console.error('Error fetching active diet:', error)
    return { data: null, error }
  }
}

export async function addMeal(dietId: string, name: string, time: string, orderIndex: number) {
  try {
    const newMeal: MealInsert = {
      diet_id: dietId,
      name,
      time,
      order_index: orderIndex,
    }

    const { data, error } = await supabase.from('meals').insert(newMeal).select().single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error adding meal:', error)
    return { data: null, error }
  }
}

export async function addMealItem(
  mealId: string,
  foodItemId: string,
  portionG: number,
  notes?: string,
) {
  try {
    const newMealItem: MealItemInsert = {
      meal_id: mealId,
      food_item_id: foodItemId,
      portion_g: portionG,
      notes: notes || null,
    }

    const { data, error } = await supabase.from('meal_items').insert(newMealItem).select().single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error adding meal item:', error)
    return { data: null, error }
  }
}

export async function getFullDietDetails(dietId: string) {
  try {
    const { data, error } = await supabase
      .from('diets')
      .select(`
        *,
        meals (
          *,
          meal_items (
            *,
            food_items (
              id,
              name,
              energy_kcal,
              protein_g,
              carbs_g,
              fats_g
            )
          )
        )
      `)
      .eq('id', dietId)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching full diet details:', error)
    return { data: null, error }
  }
}
