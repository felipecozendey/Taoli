import { supabase } from '@/lib/supabase/client'

export interface ProductivityTask {
  id: string
  user_id: string
  title: string
  description?: string | null
  status: 'todo' | 'in_progress' | 'done' | string
  priority: 'low' | 'medium' | 'high' | string
  due_date?: string | null
  is_urgent?: boolean | null
  tags?: string[] | null
  created_at: string
}

export interface ProductivityHabit {
  id: string
  user_id: string
  title: string
  color?: string | null
  frequency?: string | null
  target_value?: number | null
  target_unit?: string | null
  is_active?: boolean | null
  tags?: string[] | null
  created_at: string
}

export interface ProductivityHabitLog {
  id: string
  habit_id: string
  completed_date: string
  progress_made?: number | null
  created_at: string
}

export interface FocusSettings {
  user_id: string
  reminder_interval: number | null
  is_enabled: boolean | null
  sound_volume: number | null
  created_at: string | null
}

export const productivityService = {
  // --- Tasks ---
  async getTasks(startDate?: string, endDate?: string) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      let query = supabase
        .from('productivity_tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (startDate) {
        query = query.gte('due_date', startDate)
      }
      if (endDate) {
        query = query.lte('due_date', endDate)
      }

      const { data, error } = await query
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching tasks:', error)
      return { data: [], error }
    }
  },

  async createTask(task: Partial<ProductivityTask>) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('productivity_tasks')
        .insert([{ ...task, user_id: user.id }])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating task:', error)
      return { data: null, error }
    }
  },

  async updateTask(id: string, updates: Partial<ProductivityTask>) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('productivity_tasks')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error updating task:', error)
      return { data: null, error }
    }
  },

  async deleteTask(id: string) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error } = await supabase
        .from('productivity_tasks')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Error deleting task:', error)
      return { error }
    }
  },

  // --- Habits ---
  async getHabits() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('productivity_habits')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching habits:', error)
      return { data: [], error }
    }
  },

  async createHabit(habit: Partial<ProductivityHabit>) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('productivity_habits')
        .insert([{ ...habit, user_id: user.id }])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating habit:', error)
      return { data: null, error }
    }
  },

  async deleteHabit(id: string) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error } = await supabase
        .from('productivity_habits')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Error deleting habit:', error)
      return { error }
    }
  },

  // --- Habit Logs ---
  async getHabitLogs(startDate: string, endDate: string) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('productivity_habit_logs')
        .select('*')
        .gte('completed_date', startDate)
        .lte('completed_date', endDate)

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching habit logs:', error)
      return { data: [], error }
    }
  },

  async toggleHabitLog(habitId: string, date: string, progress?: number) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data: existingLogs, error: checkError } = await supabase
        .from('productivity_habit_logs')
        .select('*')
        .eq('habit_id', habitId)
        .eq('completed_date', date)

      if (checkError) throw checkError

      if (existingLogs && existingLogs.length > 0) {
        const log = existingLogs[0]
        if (progress !== undefined) {
          // Add progress to existing log
          const newProgress = (log.progress_made || 0) + progress
          const { error } = await supabase
            .from('productivity_habit_logs')
            .update({ progress_made: newProgress })
            .eq('id', log.id)

          if (error) throw error
          return { status: true, error: null }
        } else {
          // Log exists, so we delete it (uncheck)
          const { error: deleteError } = await supabase
            .from('productivity_habit_logs')
            .delete()
            .eq('id', log.id)

          if (deleteError) throw deleteError
          return { status: false, error: null }
        }
      } else {
        // Log does not exist, so we create it
        const { error: insertError } = await supabase
          .from('productivity_habit_logs')
          .insert([{ habit_id: habitId, completed_date: date, progress_made: progress || 1 }])

        if (insertError) throw insertError
        return { status: true, error: null }
      }
    } catch (error) {
      console.error('Error toggling habit log:', error)
      return { status: false, error }
    }
  },

  // --- Focus Guardian Settings ---
  async getFocusSettings() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('productivity_focus_settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

      if (error) throw error

      if (!data) {
        const defaultSettings = {
          user_id: user.id,
          reminder_interval: 15,
          is_enabled: false,
          sound_volume: 0.5,
        }
        const { data: newData, error: insertError } = await supabase
          .from('productivity_focus_settings')
          .insert([defaultSettings])
          .select()
          .single()

        if (insertError) throw insertError
        return { data: newData as FocusSettings, error: null }
      }

      return { data: data as FocusSettings, error: null }
    } catch (error) {
      console.error('Error fetching focus settings:', error)
      return { data: null, error }
    }
  },

  async updateFocusSettings(settings: Partial<FocusSettings>) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('productivity_focus_settings')
        .update(settings)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error updating focus settings:', error)
      return { data: null, error }
    }
  },
}

// --- GTD Tasks ---
export const getTasks = async (clientId: string) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export const createTask = async (
  clientId: string,
  title: string,
  targetDate: string | null = null,
) => {
  const { error } = await supabase
    .from('tasks')
    .insert([{ client_id: clientId, title, target_date: targetDate }])
  if (error) throw error
}

export const updateTask = async (taskId: string, updates: any) => {
  const { error } = await supabase.from('tasks').update(updates).eq('id', taskId)
  if (error) throw error
}

export const deleteTask = async (taskId: string) => {
  const { error } = await supabase.from('tasks').delete().eq('id', taskId)
  if (error) throw error
}

// --- GTD Habits ---
export const getHabits = async (clientId: string) => {
  const { data, error } = await supabase
    .from('habits')
    .select('*, habit_logs(completed_date)')
    .eq('client_id', clientId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data || []
}

export const createHabit = async (clientId: string, title: string) => {
  const { error } = await supabase.from('habits').insert([{ client_id: clientId, title }])
  if (error) throw error
}

export const toggleHabitLog = async (habitId: string, date: string, isCompleted: boolean) => {
  if (isCompleted) {
    const { error } = await supabase
      .from('habit_logs')
      .insert([{ habit_id: habitId, completed_date: date }])
    if (error && error.code !== '23505') throw error // Ignora erro de duplicidade
  } else {
    const { error } = await supabase
      .from('habit_logs')
      .delete()
      .match({ habit_id: habitId, completed_date: date })
    if (error) throw error
  }
}

export const deleteHabit = async (habitId: string) => {
  const { error } = await supabase.from('habits').delete().eq('id', habitId)
  if (error) throw error
}
