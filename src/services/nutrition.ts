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

export interface NutritionAssessment {
  id: string
  client_id: string
  professional_id?: string
  date: string
  weight?: number
  height?: number
  body_fat_percentage?: number
  muscle_mass_percentage?: number
  bmr?: number
  tdee?: number
  goal_weight?: number
  status?: string
  method?: string
  formulas_used?: Record<string, any>
  circumferences?: Record<string, number>
  skinfolds?: Record<string, number>
  observations?: string
  created_at: string
  front_photo_url?: string
  side_photo_url?: string
  back_photo_url?: string
}

export interface NutritionSupplement {
  id: string
  client_id: string
  professional_id?: string
  name: string
  dosage: string
  frequency?: string
  timing?: string
  observations?: string
  is_active: boolean
  created_at: string
}

export async function createAssessment(assessment: Partial<NutritionAssessment>) {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) throw authError
    if (!user) throw new Error('Not authenticated')

    const newAssessment = {
      ...assessment,
      professional_id: user.id,
    }

    const { data, error } = await supabase
      .from('nutrition_assessments')
      .insert(newAssessment as any)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error creating assessment:', error)
    return { data: null, error }
  }
}

export async function updateAssessment(id: string, data: Partial<NutritionAssessment>) {
  try {
    const { data: result, error } = await supabase
      .from('nutrition_assessments')
      .update(data as any)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { data: result, error: null }
  } catch (error) {
    console.error('Error updating assessment:', error)
    return { data: null, error }
  }
}

export async function deleteAssessment(id: string) {
  try {
    const { error } = await supabase.from('nutrition_assessments').delete().eq('id', id)
    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Error deleting assessment:', error)
    return { error }
  }
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

export const getTrackingByPeriod = async (clientId: string, startDate: string, endDate: string) => {
  const { data, error } = await supabase
    .from('food_water_tracking')
    .select('*')
    .eq('client_id', clientId)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true })
  if (error) throw error
  return data || []
}

export const addExtraMealToDay = async (clientId: string, date: string, extraMeal: any) => {
  const { data: existing } = await supabase
    .from('food_water_tracking')
    .select('id, extra_meals')
    .eq('client_id', clientId)
    .eq('date', date)
    .maybeSingle()

  const currentExtras = existing?.extra_meals || []
  const updatedExtras = [
    ...(Array.isArray(currentExtras) ? currentExtras : []),
    { ...extraMeal, id: crypto.randomUUID(), added_at: new Date().toISOString() },
  ]

  const { error } = await supabase.from('food_water_tracking').upsert(
    {
      id: existing?.id,
      client_id: clientId,
      date,
      extra_meals: updatedExtras,
    },
    { onConflict: 'client_id, date' },
  )

  if (error) throw error
}

export const deleteExtraMealFromDay = async (clientId: string, date: string, mealId: string) => {
  const { data: existing } = await supabase
    .from('food_water_tracking')
    .select('id, extra_meals')
    .eq('client_id', clientId)
    .eq('date', date)
    .maybeSingle()
  if (!existing) return
  const updatedExtras = (Array.isArray(existing.extra_meals) ? existing.extra_meals : []).filter(
    (m: any) => m.id !== mealId,
  )
  const { error } = await supabase
    .from('food_water_tracking')
    .update({ extra_meals: updatedExtras })
    .eq('id', existing.id)
  if (error) throw error
}

export const updateExtraMealInDay = async (clientId: string, date: string, updatedMeal: any) => {
  const { data: existing } = await supabase
    .from('food_water_tracking')
    .select('id, extra_meals')
    .eq('client_id', clientId)
    .eq('date', date)
    .maybeSingle()
  if (!existing) return
  const updatedExtras = (Array.isArray(existing.extra_meals) ? existing.extra_meals : []).map(
    (m: any) => (m.id === updatedMeal.id ? updatedMeal : m),
  )
  const { error } = await supabase
    .from('food_water_tracking')
    .update({ extra_meals: updatedExtras })
    .eq('id', existing.id)
  if (error) throw error
}

export const getTrackingForDay = async (clientId: string, date: string) => {
  const { data, error } = await supabase
    .from('food_water_tracking')
    .select('*')
    .eq('client_id', clientId)
    .eq('date', date)
    .maybeSingle()
  if (error && error.code !== 'PGRST116') throw error
  return data
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
      .limit(20)

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
        base_qty_g: 100,
        source: 'Customizado',
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

export async function updateCustomFoodItem(
  id: string,
  data: {
    name: string
    calories: number
    protein: number
    carbs: number
    fat: number
    serving_size: string | number
  },
) {
  try {
    const { data: result, error } = await supabase
      .from('food_items')
      .update({
        name: data.name,
        energy_kcal: data.calories,
        protein_g: data.protein,
        carbs_g: data.carbs,
        fats_g: data.fat,
        base_qty_g: 100,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { data: result, error: null }
  } catch (error) {
    console.error('Error updating custom food item:', error)
    return { data: null, error }
  }
}

export async function getClientAssessments(userId?: string) {
  try {
    let targetId = userId
    if (!targetId) {
      const { data } = await supabase.auth.getUser()
      targetId = data?.user?.id
    }
    if (!targetId) throw new Error('Não autenticado ou ID não fornecido')

    const { data, error } = await supabase
      .from('nutrition_assessments')
      .select('*')
      .eq('client_id', targetId)
      .order('date', { ascending: false })

    if (error) throw error
    return { data: data as NutritionAssessment[], error: null }
  } catch (error) {
    console.error('Error fetching assessments:', error)
    return { data: null, error }
  }
}

export async function getPatientAssessments(patientId: string) {
  try {
    const { data, error } = await supabase
      .from('nutrition_assessments')
      .select('*')
      .eq('client_id', patientId)
      .order('date', { ascending: false })

    if (error) throw error
    return { data: data as NutritionAssessment[], error: null }
  } catch (error) {
    console.error('Error fetching patient assessments:', error)
    return { data: null, error }
  }
}

export async function getClientSupplements(userId?: string) {
  try {
    let targetId = userId
    if (!targetId) {
      const { data } = await supabase.auth.getUser()
      targetId = data?.user?.id
    }
    if (!targetId) throw new Error('Não autenticado ou ID não fornecido')

    const { data, error } = await supabase
      .from('nutrition_supplements')
      .select('*')
      .eq('client_id', targetId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data: data as NutritionSupplement[], error: null }
  } catch (error) {
    console.error('Error fetching supplements:', error)
    return { data: null, error }
  }
}

export async function createSupplement(supplement: Partial<NutritionSupplement>) {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) throw authError
    if (!user) throw new Error('Not authenticated')

    const newSupplement = {
      ...supplement,
      professional_id: user.id,
    }

    const { data, error } = await supabase
      .from('nutrition_supplements')
      .insert(newSupplement as any)
      .select()
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error creating supplement:', error)
    return { data: null, error }
  }
}

export async function updateSupplement(id: string, data: Partial<NutritionSupplement>) {
  try {
    const { data: result, error } = await supabase
      .from('nutrition_supplements')
      .update(data as any)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { data: result, error: null }
  } catch (error) {
    console.error('Error updating supplement:', error)
    return { data: null, error }
  }
}

export async function deleteSupplement(id: string) {
  try {
    const { error } = await supabase.from('nutrition_supplements').delete().eq('id', id)

    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Error deleting supplement:', error)
    return { error }
  }
}

export async function getPatientSupplements(patientId: string) {
  try {
    const { data, error } = await supabase
      .from('nutrition_supplements')
      .select('*')
      .eq('client_id', patientId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data: data as NutritionSupplement[], error: null }
  } catch (error) {
    console.error('Error fetching patient supplements:', error)
    return { data: null, error }
  }
}

export async function saveDiet(
  clientId: string,
  professionalId: string,
  name: string,
  mealsData: any[],
) {
  try {
    const { data: diet, error: dietErr } = await supabase
      .from('diets')
      .insert({
        client_id: clientId,
        professional_id: professionalId,
        name,
        is_active: true,
      })
      .select()
      .single()

    if (dietErr) throw dietErr

    for (let i = 0; i < mealsData.length; i++) {
      const meal = mealsData[i]

      const { data: mealRow, error: mealErr } = await supabase
        .from('meals')
        .insert({
          diet_id: diet.id,
          name: meal.name,
          time: meal.time || '12:00',
          order_index: i,
        })
        .select()
        .single()

      if (mealErr) continue

      const itemsToInsert = meal.items.map((item: any) => ({
        meal_id: mealRow.id,
        food_item_id: item.food.id,
        portion_g: item.amount_grams,
        notes: item.notes || null,
      }))

      if (itemsToInsert.length > 0) {
        await supabase.from('meal_items').insert(itemsToInsert)
      }
    }

    return { data: diet, error: null }
  } catch (error) {
    console.error('Error saving full diet:', error)
    return { data: null, error }
  }
}

// Templates API
export const getDietTemplates = async (professionalId: string) => {
  try {
    const { data, error } = await supabase
      .from('diet_templates')
      .select('id, name')
      .eq('professional_id', professionalId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('Error fetching templates:', error)
    return { data: null, error }
  }
}

export const getTemplateDetails = async (templateId: string) => {
  try {
    const { data, error } = await supabase
      .from('diet_template_meals')
      .select(`
        id, 
        name, 
        time, 
        items:diet_template_items(
          id, 
          amount_grams, 
          food:food_items(*)
        )
      `)
      .eq('template_id', templateId)

    if (error) throw error
    return { data: data || [], error: null }
  } catch (error) {
    console.error('Error fetching template details:', error)
    return { data: null, error }
  }
}

export const saveDietTemplate = async (professionalId: string, name: string, mealsData: any[]) => {
  try {
    const { data: tpl, error: tplErr } = await supabase
      .from('diet_templates')
      .insert([{ professional_id: professionalId, name }])
      .select()
      .single()

    if (tplErr) throw tplErr

    for (const meal of mealsData) {
      const { data: mData, error: mErr } = await supabase
        .from('diet_template_meals')
        .insert([{ template_id: tpl.id, name: meal.name, time: meal.time }])
        .select()
        .single()

      if (mErr) continue

      const itemsToInsert = meal.items.map((item: any) => ({
        meal_id: mData.id,
        food_item_id: item.food.id,
        amount_grams: item.amount_grams,
      }))

      if (itemsToInsert.length > 0) {
        await supabase.from('diet_template_items').insert(itemsToInsert)
      }
    }
    return { data: tpl, error: null }
  } catch (error) {
    console.error('Error saving template:', error)
    return { data: null, error }
  }
}
