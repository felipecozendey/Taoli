import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

type DietInsert = Database['public']['Tables']['diets']['Insert']
type MealInsert = Database['public']['Tables']['meals']['Insert']
type MealItemInsert = Database['public']['Tables']['meal_items']['Insert']

export interface FoodLog {
  id: string
  client_id: string
  consumed_on: string
  food_name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  created_at?: string
}

export interface WaterLog {
  id: string
  client_id: string
  consumed_on: string
  amount_ml: number
  created_at?: string
}

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

    if (error && error.code !== 'PGRST116') throw error
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

export type FoodItemDetails = Pick<
  Database['public']['Tables']['food_items']['Row'],
  'id' | 'name' | 'energy_kcal' | 'protein_g' | 'carbs_g' | 'fats_g' | 'base_qty_g'
>

export type MealItemDetails = Database['public']['Tables']['meal_items']['Row'] & {
  food_items: FoodItemDetails | null
}

export type MealDetails = Database['public']['Tables']['meals']['Row'] & {
  meal_items: MealItemDetails[]
}

export type FullDietDetails = Database['public']['Tables']['diets']['Row'] & {
  meals: MealDetails[]
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
              fats_g,
              base_qty_g
            )
          )
        )
      `)
      .eq('id', dietId)
      .single()

    if (error) throw error

    return { data: data as unknown as FullDietDetails, error: null }
  } catch (error) {
    console.error('Error fetching full diet details:', error)
    return { data: null, error }
  }
}

export async function addFoodLog(
  clientId: string,
  date: string,
  data: Omit<FoodLog, 'id' | 'client_id' | 'consumed_on' | 'created_at'>,
) {
  try {
    const { data: result, error } = await supabase
      .from('food_consumption_logs')
      .insert({
        client_id: clientId,
        consumed_on: date,
        food_name: data.food_name,
        calories: data.calories,
        protein: data.protein,
        carbs: data.carbs,
        fat: data.fat,
      })
      .select()
      .single()

    if (error) throw error
    return { data: result, error: null }
  } catch (error) {
    console.error('Error adding food log:', error)
    return { data: null, error }
  }
}

export async function deleteFoodLog(logId: string) {
  try {
    const { error } = await supabase.from('food_consumption_logs').delete().eq('id', logId)

    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Error deleting food log:', error)
    return { error }
  }
}

export async function addWaterLog(clientId: string, date: string, amountMl: number) {
  try {
    const { data, error } = await supabase
      .from('water_consumption_logs')
      .insert({
        client_id: clientId,
        consumed_on: date,
        amount_ml: amountMl,
      })
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error adding water log:', error)
    return { data: null, error }
  }
}

export async function getDailyNutritionProgress(clientId: string, date: string) {
  try {
    const { data: activeDiet } = await getClientActiveDiet(clientId)
    let targets = { calories: 0, protein: 0, carbs: 0, fat: 0 }

    if (activeDiet) {
      const { data: fullDiet } = await getFullDietDetails(activeDiet.id)
      if (fullDiet && fullDiet.meals) {
        targets = fullDiet.meals.reduce(
          (acc, meal) => {
            meal.meal_items.forEach((item) => {
              if (item.food_items) {
                const ratio = item.portion_g / (item.food_items.base_qty_g || 100)
                acc.calories += Number(item.food_items.energy_kcal || 0) * ratio
                acc.protein += Number(item.food_items.protein_g || 0) * ratio
                acc.carbs += Number(item.food_items.carbs_g || 0) * ratio
                acc.fat += Number(item.food_items.fats_g || 0) * ratio
              }
            })
            return acc
          },
          { calories: 0, protein: 0, carbs: 0, fat: 0 },
        )
      }
    }

    const { data: foodLogs, error: foodError } = await supabase
      .from('food_consumption_logs')
      .select('*')
      .eq('client_id', clientId)
      .eq('consumed_on', date)
      .order('created_at', { ascending: true })

    if (foodError) throw foodError

    const consumed = { calories: 0, protein: 0, carbs: 0, fat: 0, water: 0 }
    const logs: FoodLog[] = (foodLogs || []).map((log) => ({
      id: log.id,
      client_id: log.client_id,
      consumed_on: log.consumed_on,
      food_name: log.food_name,
      calories: Number(log.calories || 0),
      protein: Number(log.protein || 0),
      carbs: Number(log.carbs || 0),
      fat: Number(log.fat || 0),
      created_at: log.created_at,
    }))

    logs.forEach((log) => {
      consumed.calories += log.calories
      consumed.protein += log.protein
      consumed.carbs += log.carbs
      consumed.fat += log.fat
    })

    const { data: waterLogs, error: waterError } = await supabase
      .from('water_consumption_logs')
      .select('*')
      .eq('client_id', clientId)
      .eq('consumed_on', date)

    if (waterError) throw waterError

    ;(waterLogs || []).forEach((log) => {
      consumed.water += Number(log.amount_ml || 0)
    })

    return {
      targets: {
        calories: Math.round(targets.calories),
        protein: Math.round(targets.protein),
        carbs: Math.round(targets.carbs),
        fat: Math.round(targets.fat),
      },
      consumed: {
        calories: Math.round(consumed.calories),
        protein: Math.round(consumed.protein),
        carbs: Math.round(consumed.carbs),
        fat: Math.round(consumed.fat),
        water: Math.round(consumed.water),
      },
      logs,
    }
  } catch (error) {
    console.error('Error fetching daily nutrition progress:', error)
    return {
      targets: { calories: 0, protein: 0, carbs: 0, fat: 0 },
      consumed: { calories: 0, protein: 0, carbs: 0, fat: 0, water: 0 },
      logs: [],
    }
  }
}

export async function searchFoodItems(query: string) {
  try {
    const { data, error } = await supabase
      .from('food_items')
      .select('id, name, energy_kcal, protein_g, carbs_g, fats_g, base_qty_g, source')
      .ilike('name', `%${query}%`)
      .limit(10)

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error searching food items:', error)
    return { data: null, error }
  }
}

export async function addCustomFoodItem(data: {
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  serving_size: string | number
}) {
  try {
    const { data: result, error } = await supabase
      .from('food_items')
      .insert({
        name: data.name,
        energy_kcal: data.calories,
        protein_g: data.protein,
        carbs_g: data.carbs,
        fats_g: data.fat,
        base_qty_g: 100, // Normalized to 100g as per requirements
        source: 'Customizado', // Tagging as a custom entry
      })
      .select()
      .single()

    if (error) throw error
    return { data: result, error: null }
  } catch (error) {
    console.error('Error adding custom food item:', error)
    return { data: null, error }
  }
}
