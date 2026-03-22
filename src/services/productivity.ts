import { supabase } from '@/lib/supabase/client'

export interface ProductivityTask {
  id: string
  user_id: string
  title: string
  description?: string | null
  status: 'todo' | 'in_progress' | 'done' | string
  priority: 'low' | 'medium' | 'high' | string
  due_date?: string | null
  created_at: string
}

export interface ProductivityHabit {
  id: string
  user_id: string
  title: string
  color?: string | null
  frequency?: string | null
  created_at: string
}

export interface ProductivityHabitLog {
  id: string
  habit_id: string
  completed_date: string
  created_at: string
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

  async toggleHabitLog(habitId: string, date: string) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Check if log exists
      const { data: existingLogs, error: checkError } = await supabase
        .from('productivity_habit_logs')
        .select('id')
        .eq('habit_id', habitId)
        .eq('completed_date', date)

      if (checkError) throw checkError

      if (existingLogs && existingLogs.length > 0) {
        // Log exists, so we delete it (uncheck)
        const { error: deleteError } = await supabase
          .from('productivity_habit_logs')
          .delete()
          .eq('id', existingLogs[0].id)

        if (deleteError) throw deleteError
        return { status: false, error: null }
      } else {
        // Log does not exist, so we create it (check)
        const { error: insertError } = await supabase
          .from('productivity_habit_logs')
          .insert([{ habit_id: habitId, completed_date: date }])

        if (insertError) throw insertError
        return { status: true, error: null }
      }
    } catch (error) {
      console.error('Error toggling habit log:', error)
      return { status: false, error }
    }
  },
}
