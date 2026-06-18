// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.4'
  }
  public: {
    Tables: {
      anamnesis_responses: {
        Row: {
          client_id: string
          created_at: string | null
          id: string
          professional_id: string
          responses: Json
          template_id: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          id?: string
          professional_id: string
          responses?: Json
          template_id: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          id?: string
          professional_id?: string
          responses?: Json
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'anamnesis_responses_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'anamnesis_responses_professional_id_fkey'
            columns: ['professional_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'anamnesis_responses_template_id_fkey'
            columns: ['template_id']
            isOneToOne: false
            referencedRelation: 'anamnesis_templates'
            referencedColumns: ['id']
          },
        ]
      }
      anamnesis_templates: {
        Row: {
          created_at: string | null
          fields: Json
          id: string
          name: string
          professional_id: string
        }
        Insert: {
          created_at?: string | null
          fields?: Json
          id?: string
          name: string
          professional_id: string
        }
        Update: {
          created_at?: string | null
          fields?: Json
          id?: string
          name?: string
          professional_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'anamnesis_templates_professional_id_fkey'
            columns: ['professional_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      appointments: {
        Row: {
          appointment_type: string | null
          client_id: string | null
          created_at: string | null
          end_time: string
          id: string
          notes: string | null
          professional_id: string
          start_time: string
          status: string | null
          title: string
        }
        Insert: {
          appointment_type?: string | null
          client_id?: string | null
          created_at?: string | null
          end_time: string
          id?: string
          notes?: string | null
          professional_id: string
          start_time: string
          status?: string | null
          title: string
        }
        Update: {
          appointment_type?: string | null
          client_id?: string | null
          created_at?: string | null
          end_time?: string
          id?: string
          notes?: string | null
          professional_id?: string
          start_time?: string
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          admin_id: string
          created_at: string
          details: Json | null
          id: string
          target_user_id: string
        }
        Insert: {
          action: string
          admin_id: string
          created_at?: string
          details?: Json | null
          id?: string
          target_user_id: string
        }
        Update: {
          action?: string
          admin_id?: string
          created_at?: string
          details?: Json | null
          id?: string
          target_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'audit_logs_admin_id_fkey'
            columns: ['admin_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'audit_logs_target_user_id_fkey'
            columns: ['target_user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      client_subscriptions: {
        Row: {
          client_id: string
          created_at: string | null
          id: string
          next_billing_date: string
          plan_id: string
          professional_id: string
          status: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          id?: string
          next_billing_date: string
          plan_id: string
          professional_id: string
          status?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          id?: string
          next_billing_date?: string
          plan_id?: string
          professional_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'client_subscriptions_plan_id_fkey'
            columns: ['plan_id']
            isOneToOne: false
            referencedRelation: 'service_plans'
            referencedColumns: ['id']
          },
        ]
      }
      diet_template_items: {
        Row: {
          amount_grams: number
          food_item_id: string
          id: string
          meal_id: string
        }
        Insert: {
          amount_grams: number
          food_item_id: string
          id?: string
          meal_id: string
        }
        Update: {
          amount_grams?: number
          food_item_id?: string
          id?: string
          meal_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'diet_template_items_food_item_id_fkey'
            columns: ['food_item_id']
            isOneToOne: false
            referencedRelation: 'food_items'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'diet_template_items_meal_id_fkey'
            columns: ['meal_id']
            isOneToOne: false
            referencedRelation: 'diet_template_meals'
            referencedColumns: ['id']
          },
        ]
      }
      diet_template_meals: {
        Row: {
          id: string
          name: string
          template_id: string
          time: string | null
        }
        Insert: {
          id?: string
          name: string
          template_id: string
          time?: string | null
        }
        Update: {
          id?: string
          name?: string
          template_id?: string
          time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'diet_template_meals_template_id_fkey'
            columns: ['template_id']
            isOneToOne: false
            referencedRelation: 'diet_templates'
            referencedColumns: ['id']
          },
        ]
      }
      diet_templates: {
        Row: {
          created_at: string | null
          id: string
          name: string
          professional_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          professional_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          professional_id?: string
        }
        Relationships: []
      }
      diets: {
        Row: {
          client_id: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          professional_id: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          professional_id: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          professional_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'diets_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'diets_professional_id_fkey'
            columns: ['professional_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      exercise_plan_items: {
        Row: {
          exercise_id: string
          frequency: string | null
          id: string
          notes: string | null
          order_index: number
          pain_limit_eva: number | null
          plan_id: string
          reps: string
          rest_seconds: number | null
          sets: number
          target_load_kg: number | null
        }
        Insert: {
          exercise_id: string
          frequency?: string | null
          id?: string
          notes?: string | null
          order_index: number
          pain_limit_eva?: number | null
          plan_id: string
          reps: string
          rest_seconds?: number | null
          sets: number
          target_load_kg?: number | null
        }
        Update: {
          exercise_id?: string
          frequency?: string | null
          id?: string
          notes?: string | null
          order_index?: number
          pain_limit_eva?: number | null
          plan_id?: string
          reps?: string
          rest_seconds?: number | null
          sets?: number
          target_load_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'exercise_plan_items_exercise_id_fkey'
            columns: ['exercise_id']
            isOneToOne: false
            referencedRelation: 'exercises'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'exercise_plan_items_plan_id_fkey'
            columns: ['plan_id']
            isOneToOne: false
            referencedRelation: 'exercise_plans'
            referencedColumns: ['id']
          },
        ]
      }
      exercise_plans: {
        Row: {
          client_id: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          plan_type: string
          professional_id: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          plan_type: string
          professional_id: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          plan_type?: string
          professional_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'exercise_plans_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'exercise_plans_professional_id_fkey'
            columns: ['professional_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      exercises: {
        Row: {
          category: string
          created_at: string
          id: string
          muscle_group: string
          name: string
          video_url: string | null
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          muscle_group: string
          name: string
          video_url?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          muscle_group?: string
          name?: string
          video_url?: string | null
        }
        Relationships: []
      }
      financial_transactions: {
        Row: {
          amount: number
          category: string | null
          created_at: string | null
          description: string
          id: string
          professional_id: string
          status: string | null
          transaction_date: string
          type: string
        }
        Insert: {
          amount: number
          category?: string | null
          created_at?: string | null
          description: string
          id?: string
          professional_id: string
          status?: string | null
          transaction_date: string
          type: string
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string | null
          description?: string
          id?: string
          professional_id?: string
          status?: string | null
          transaction_date?: string
          type?: string
        }
        Relationships: []
      }
      food_consumption_logs: {
        Row: {
          calories: number | null
          carbs: number | null
          client_id: string
          consumed_on: string
          created_at: string
          fat: number | null
          food_name: string
          id: string
          protein: number | null
        }
        Insert: {
          calories?: number | null
          carbs?: number | null
          client_id: string
          consumed_on: string
          created_at?: string
          fat?: number | null
          food_name: string
          id?: string
          protein?: number | null
        }
        Update: {
          calories?: number | null
          carbs?: number | null
          client_id?: string
          consumed_on?: string
          created_at?: string
          fat?: number | null
          food_name?: string
          id?: string
          protein?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'food_consumption_logs_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      food_items: {
        Row: {
          base_qty_g: number | null
          carbs_g: number | null
          created_at: string
          energy_kcal: number | null
          fats_g: number | null
          fiber_g: number | null
          food_group: string | null
          id: string
          name: string
          protein_g: number | null
          source: string | null
        }
        Insert: {
          base_qty_g?: number | null
          carbs_g?: number | null
          created_at?: string
          energy_kcal?: number | null
          fats_g?: number | null
          fiber_g?: number | null
          food_group?: string | null
          id?: string
          name: string
          protein_g?: number | null
          source?: string | null
        }
        Update: {
          base_qty_g?: number | null
          carbs_g?: number | null
          created_at?: string
          energy_kcal?: number | null
          fats_g?: number | null
          fiber_g?: number | null
          food_group?: string | null
          id?: string
          name?: string
          protein_g?: number | null
          source?: string | null
        }
        Relationships: []
      }
      food_water_tracking: {
        Row: {
          client_id: string
          created_at: string | null
          date: string
          extra_meals: Json | null
          id: string
          meals: Json | null
          total_calories: number | null
          total_carbs: number | null
          total_fats: number | null
          total_protein: number | null
          water_ml: number | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          date: string
          extra_meals?: Json | null
          id?: string
          meals?: Json | null
          total_calories?: number | null
          total_carbs?: number | null
          total_fats?: number | null
          total_protein?: number | null
          water_ml?: number | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          date?: string
          extra_meals?: Json | null
          id?: string
          meals?: Json | null
          total_calories?: number | null
          total_carbs?: number | null
          total_fats?: number | null
          total_protein?: number | null
          water_ml?: number | null
        }
        Relationships: []
      }
      habit_logs: {
        Row: {
          completed_date: string
          habit_id: string
          id: string
        }
        Insert: {
          completed_date: string
          habit_id: string
          id?: string
        }
        Update: {
          completed_date?: string
          habit_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'habit_logs_habit_id_fkey'
            columns: ['habit_id']
            isOneToOne: false
            referencedRelation: 'habits'
            referencedColumns: ['id']
          },
        ]
      }
      habits: {
        Row: {
          client_id: string
          created_at: string | null
          id: string
          professional_id: string | null
          title: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          id?: string
          professional_id?: string | null
          title: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          id?: string
          professional_id?: string | null
          title?: string
        }
        Relationships: []
      }
      lab_exams: {
        Row: {
          client_id: string
          created_at: string | null
          date: string
          id: string
          marker_name: string
          max_ref: number | null
          min_ref: number | null
          professional_id: string
          unit: string
          value: number
        }
        Insert: {
          client_id: string
          created_at?: string | null
          date: string
          id?: string
          marker_name: string
          max_ref?: number | null
          min_ref?: number | null
          professional_id: string
          unit: string
          value: number
        }
        Update: {
          client_id?: string
          created_at?: string | null
          date?: string
          id?: string
          marker_name?: string
          max_ref?: number | null
          min_ref?: number | null
          professional_id?: string
          unit?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: 'lab_exams_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'lab_exams_professional_id_fkey'
            columns: ['professional_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      meal_items: {
        Row: {
          food_item_id: string
          id: string
          meal_id: string
          notes: string | null
          portion_g: number
        }
        Insert: {
          food_item_id: string
          id?: string
          meal_id: string
          notes?: string | null
          portion_g: number
        }
        Update: {
          food_item_id?: string
          id?: string
          meal_id?: string
          notes?: string | null
          portion_g?: number
        }
        Relationships: [
          {
            foreignKeyName: 'meal_items_food_item_id_fkey'
            columns: ['food_item_id']
            isOneToOne: false
            referencedRelation: 'food_items'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'meal_items_meal_id_fkey'
            columns: ['meal_id']
            isOneToOne: false
            referencedRelation: 'meals'
            referencedColumns: ['id']
          },
        ]
      }
      meals: {
        Row: {
          diet_id: string
          id: string
          name: string
          order_index: number
          time: string
        }
        Insert: {
          diet_id: string
          id?: string
          name: string
          order_index: number
          time: string
        }
        Update: {
          diet_id?: string
          id?: string
          name?: string
          order_index?: number
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: 'meals_diet_id_fkey'
            columns: ['diet_id']
            isOneToOne: false
            referencedRelation: 'diets'
            referencedColumns: ['id']
          },
        ]
      }
      mood_logs: {
        Row: {
          client_id: string | null
          id: string
          logged_at: string | null
          mood: string
          notes: string | null
        }
        Insert: {
          client_id?: string | null
          id?: string
          logged_at?: string | null
          mood: string
          notes?: string | null
        }
        Update: {
          client_id?: string | null
          id?: string
          logged_at?: string | null
          mood?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'mood_logs_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      note_links: {
        Row: {
          id: string
          source_note_id: string
          target_note_id: string
        }
        Insert: {
          id?: string
          source_note_id: string
          target_note_id: string
        }
        Update: {
          id?: string
          source_note_id?: string
          target_note_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'note_links_source_note_id_fkey'
            columns: ['source_note_id']
            isOneToOne: false
            referencedRelation: 'study_notes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'note_links_target_note_id_fkey'
            columns: ['target_note_id']
            isOneToOne: false
            referencedRelation: 'study_notes'
            referencedColumns: ['id']
          },
        ]
      }
      nutrition_assessments: {
        Row: {
          back_photo_url: string | null
          bmr: number | null
          body_fat_percentage: number | null
          circumferences: Json | null
          client_id: string
          created_at: string | null
          date: string
          formulas_used: Json | null
          front_photo_url: string | null
          goal_weight: number | null
          height: number | null
          id: string
          method: string | null
          muscle_mass_percentage: number | null
          observations: string | null
          professional_id: string | null
          side_photo_url: string | null
          skinfolds: Json | null
          status: string | null
          tdee: number | null
          weight: number | null
        }
        Insert: {
          back_photo_url?: string | null
          bmr?: number | null
          body_fat_percentage?: number | null
          circumferences?: Json | null
          client_id: string
          created_at?: string | null
          date?: string
          formulas_used?: Json | null
          front_photo_url?: string | null
          goal_weight?: number | null
          height?: number | null
          id?: string
          method?: string | null
          muscle_mass_percentage?: number | null
          observations?: string | null
          professional_id?: string | null
          side_photo_url?: string | null
          skinfolds?: Json | null
          status?: string | null
          tdee?: number | null
          weight?: number | null
        }
        Update: {
          back_photo_url?: string | null
          bmr?: number | null
          body_fat_percentage?: number | null
          circumferences?: Json | null
          client_id?: string
          created_at?: string | null
          date?: string
          formulas_used?: Json | null
          front_photo_url?: string | null
          goal_weight?: number | null
          height?: number | null
          id?: string
          method?: string | null
          muscle_mass_percentage?: number | null
          observations?: string | null
          professional_id?: string | null
          side_photo_url?: string | null
          skinfolds?: Json | null
          status?: string | null
          tdee?: number | null
          weight?: number | null
        }
        Relationships: []
      }
      nutrition_supplements: {
        Row: {
          client_id: string
          created_at: string | null
          dosage: string
          frequency: string | null
          id: string
          is_active: boolean | null
          name: string
          observations: string | null
          professional_id: string | null
          timing: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          dosage: string
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          observations?: string | null
          professional_id?: string | null
          timing?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          dosage?: string
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          observations?: string | null
          professional_id?: string | null
          timing?: string | null
        }
        Relationships: []
      }
      productivity_focus_settings: {
        Row: {
          created_at: string | null
          is_enabled: boolean | null
          reminder_interval: number | null
          sound_volume: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          is_enabled?: boolean | null
          reminder_interval?: number | null
          sound_volume?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          is_enabled?: boolean | null
          reminder_interval?: number | null
          sound_volume?: number | null
          user_id?: string
        }
        Relationships: []
      }
      productivity_habit_logs: {
        Row: {
          completed_date: string
          created_at: string
          habit_id: string
          id: string
          progress_made: number | null
        }
        Insert: {
          completed_date: string
          created_at?: string
          habit_id: string
          id?: string
          progress_made?: number | null
        }
        Update: {
          completed_date?: string
          created_at?: string
          habit_id?: string
          id?: string
          progress_made?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'productivity_habit_logs_habit_id_fkey'
            columns: ['habit_id']
            isOneToOne: false
            referencedRelation: 'productivity_habits'
            referencedColumns: ['id']
          },
        ]
      }
      productivity_habits: {
        Row: {
          color: string | null
          created_at: string
          frequency: string | null
          id: string
          is_active: boolean | null
          tags: string[] | null
          target_unit: string | null
          target_value: number | null
          title: string
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          tags?: string[] | null
          target_unit?: string | null
          target_value?: number | null
          title: string
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          tags?: string[] | null
          target_unit?: string | null
          target_value?: number | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      productivity_tasks: {
        Row: {
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          is_urgent: boolean | null
          priority: string
          status: string
          tags: string[] | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          is_urgent?: boolean | null
          priority?: string
          status?: string
          tags?: string[] | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          is_urgent?: boolean | null
          priority?: string
          status?: string
          tags?: string[] | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      professional_client_links: {
        Row: {
          can_view_mind: boolean
          can_view_nutrition: boolean
          can_view_training: boolean
          client_id: string
          created_at: string
          id: string
          invite_code: string | null
          professional_id: string
          status: string
          updated_at: string
        }
        Insert: {
          can_view_mind?: boolean
          can_view_nutrition?: boolean
          can_view_training?: boolean
          client_id: string
          created_at?: string
          id?: string
          invite_code?: string | null
          professional_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          can_view_mind?: boolean
          can_view_nutrition?: boolean
          can_view_training?: boolean
          client_id?: string
          created_at?: string
          id?: string
          invite_code?: string | null
          professional_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'professional_client_links_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'professional_client_links_professional_id_fkey'
            columns: ['professional_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      professional_settings: {
        Row: {
          consultation_duration: number | null
          created_at: string | null
          id: string
          payment_gateway_link: string | null
          pix_key: string | null
          professional_id: string
          updated_at: string | null
          working_hours: Json | null
        }
        Insert: {
          consultation_duration?: number | null
          created_at?: string | null
          id?: string
          payment_gateway_link?: string | null
          pix_key?: string | null
          professional_id: string
          updated_at?: string | null
          working_hours?: Json | null
        }
        Update: {
          consultation_duration?: number | null
          created_at?: string | null
          id?: string
          payment_gateway_link?: string | null
          pix_key?: string | null
          professional_id?: string
          updated_at?: string | null
          working_hours?: Json | null
        }
        Relationships: []
      }
      professional_tips: {
        Row: {
          category: string | null
          content: string
          created_at: string
          id: string
          professional_id: string
          title: string
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          id?: string
          professional_id: string
          title: string
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          id?: string
          professional_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'professional_tips_professional_id_fkey'
            columns: ['professional_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          is_nutritionist: boolean
          is_psychologist: boolean
          is_trainer: boolean
          name: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          is_nutritionist?: boolean
          is_psychologist?: boolean
          is_trainer?: boolean
          name?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          is_nutritionist?: boolean
          is_psychologist?: boolean
          is_trainer?: boolean
          name?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      recipe_ingredients: {
        Row: {
          amount_grams: number
          food_item_id: string
          id: string
          recipe_id: string
        }
        Insert: {
          amount_grams: number
          food_item_id: string
          id?: string
          recipe_id: string
        }
        Update: {
          amount_grams?: number
          food_item_id?: string
          id?: string
          recipe_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'recipe_ingredients_food_item_id_fkey'
            columns: ['food_item_id']
            isOneToOne: false
            referencedRelation: 'food_items'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'recipe_ingredients_recipe_id_fkey'
            columns: ['recipe_id']
            isOneToOne: false
            referencedRelation: 'recipes'
            referencedColumns: ['id']
          },
        ]
      }
      recipes: {
        Row: {
          created_at: string | null
          id: string
          instructions: string | null
          name: string
          professional_id: string
          total_calories: number | null
          total_carbs: number | null
          total_fats: number | null
          total_protein: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          instructions?: string | null
          name: string
          professional_id: string
          total_calories?: number | null
          total_carbs?: number | null
          total_fats?: number | null
          total_protein?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          instructions?: string | null
          name?: string
          professional_id?: string
          total_calories?: number | null
          total_carbs?: number | null
          total_fats?: number | null
          total_protein?: number | null
        }
        Relationships: []
      }
      service_plans: {
        Row: {
          billing_cycle: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          price: number
          professional_id: string
        }
        Insert: {
          billing_cycle?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          price: number
          professional_id: string
        }
        Update: {
          billing_cycle?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          price?: number
          professional_id?: string
        }
        Relationships: []
      }
      strength_tests: {
        Row: {
          client_id: string
          created_at: string | null
          date: string
          estimated_1rm: number | null
          exercise_name: string
          id: string
          professional_id: string
          reps: number
          weight_kg: number
        }
        Insert: {
          client_id: string
          created_at?: string | null
          date: string
          estimated_1rm?: number | null
          exercise_name: string
          id?: string
          professional_id: string
          reps: number
          weight_kg: number
        }
        Update: {
          client_id?: string
          created_at?: string | null
          date?: string
          estimated_1rm?: number | null
          exercise_name?: string
          id?: string
          professional_id?: string
          reps?: number
          weight_kg?: number
        }
        Relationships: [
          {
            foreignKeyName: 'strength_tests_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'strength_tests_professional_id_fkey'
            columns: ['professional_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      study_decks: {
        Row: {
          created_at: string
          description: string | null
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      study_flashcards: {
        Row: {
          back_content: string
          card_type: string
          deck_id: string
          ease_factor: number
          efactor: number
          front_content: string
          id: string
          interval: number
          next_review: string
          next_review_date: string | null
          options: Json | null
          repetition: number
        }
        Insert: {
          back_content: string
          card_type?: string
          deck_id: string
          ease_factor?: number
          efactor?: number
          front_content: string
          id?: string
          interval?: number
          next_review?: string
          next_review_date?: string | null
          options?: Json | null
          repetition?: number
        }
        Update: {
          back_content?: string
          card_type?: string
          deck_id?: string
          ease_factor?: number
          efactor?: number
          front_content?: string
          id?: string
          interval?: number
          next_review?: string
          next_review_date?: string | null
          options?: Json | null
          repetition?: number
        }
        Relationships: [
          {
            foreignKeyName: 'study_flashcards_deck_id_fkey'
            columns: ['deck_id']
            isOneToOne: false
            referencedRelation: 'study_decks'
            referencedColumns: ['id']
          },
        ]
      }
      study_folders: {
        Row: {
          created_at: string
          id: string
          name: string
          parent_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          parent_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          parent_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'study_folders_parent_id_fkey'
            columns: ['parent_id']
            isOneToOne: false
            referencedRelation: 'study_folders'
            referencedColumns: ['id']
          },
        ]
      }
      study_notes: {
        Row: {
          content: string
          created_at: string
          folder_id: string | null
          id: string
          tags: string[]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          folder_id?: string | null
          id?: string
          tags?: string[]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          folder_id?: string | null
          id?: string
          tags?: string[]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'study_notes_folder_id_fkey'
            columns: ['folder_id']
            isOneToOne: false
            referencedRelation: 'study_folders'
            referencedColumns: ['id']
          },
        ]
      }
      tasks: {
        Row: {
          client_id: string
          created_at: string | null
          description: string | null
          id: string
          priority: string | null
          status: string | null
          target_date: string | null
          title: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          target_date?: string | null
          title: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          target_date?: string | null
          title?: string
        }
        Relationships: []
      }
      water_consumption_logs: {
        Row: {
          amount_ml: number
          client_id: string
          consumed_on: string
          created_at: string
          id: string
        }
        Insert: {
          amount_ml?: number
          client_id: string
          consumed_on: string
          created_at?: string
          id?: string
        }
        Update: {
          amount_ml?: number
          client_id?: string
          consumed_on?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'water_consumption_logs_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_client_favorite_foods: {
        Args: { p_client_id: string }
        Returns: {
          base_calories: number
          base_carbs: number
          base_fats: number
          base_protein: number
          food_item_id: string
          name: string
          usage_count: number
        }[]
      }
      is_admin_user: { Args: never; Returns: boolean }
      is_professional_user: { Args: never; Returns: boolean }
      register_audit_log: {
        Args: { p_action: string; p_details?: Json; p_target_user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
