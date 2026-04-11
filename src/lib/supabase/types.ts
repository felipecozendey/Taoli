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

// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: appointments
//   id: uuid (not null, default: gen_random_uuid())
//   professional_id: uuid (not null)
//   client_id: uuid (nullable)
//   title: text (not null)
//   start_time: timestamp with time zone (not null)
//   end_time: timestamp with time zone (not null)
//   status: text (nullable, default: 'scheduled'::text)
//   appointment_type: text (nullable, default: 'consultation'::text)
//   notes: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: audit_logs
//   id: uuid (not null, default: gen_random_uuid())
//   admin_id: uuid (not null)
//   target_user_id: uuid (not null)
//   action: text (not null)
//   details: jsonb (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: client_subscriptions
//   id: uuid (not null, default: gen_random_uuid())
//   professional_id: uuid (not null)
//   client_id: uuid (not null)
//   plan_id: uuid (not null)
//   status: text (nullable, default: 'active'::text)
//   next_billing_date: date (not null)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: diet_template_items
//   id: uuid (not null, default: gen_random_uuid())
//   meal_id: uuid (not null)
//   food_item_id: uuid (not null)
//   amount_grams: numeric (not null)
// Table: diet_template_meals
//   id: uuid (not null, default: gen_random_uuid())
//   template_id: uuid (not null)
//   name: text (not null)
//   time: text (nullable)
// Table: diet_templates
//   id: uuid (not null, default: gen_random_uuid())
//   professional_id: uuid (not null)
//   name: text (not null)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: diets
//   id: uuid (not null, default: gen_random_uuid())
//   client_id: uuid (not null)
//   professional_id: uuid (not null)
//   name: text (not null)
//   is_active: boolean (not null, default: true)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: exercise_plan_items
//   id: uuid (not null, default: gen_random_uuid())
//   plan_id: uuid (not null)
//   exercise_id: uuid (not null)
//   sets: integer (not null)
//   reps: text (not null)
//   rest_seconds: integer (nullable)
//   target_load_kg: numeric (nullable)
//   frequency: text (nullable)
//   pain_limit_eva: integer (nullable)
//   notes: text (nullable)
//   order_index: integer (not null)
// Table: exercise_plans
//   id: uuid (not null, default: gen_random_uuid())
//   professional_id: uuid (not null)
//   client_id: uuid (not null)
//   name: text (not null)
//   plan_type: text (not null)
//   is_active: boolean (not null, default: true)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: exercises
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   category: text (not null)
//   muscle_group: text (not null)
//   video_url: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: financial_transactions
//   id: uuid (not null, default: gen_random_uuid())
//   professional_id: uuid (not null)
//   type: text (not null)
//   amount: numeric (not null)
//   description: text (not null)
//   transaction_date: date (not null)
//   category: text (nullable, default: 'general'::text)
//   status: text (nullable, default: 'paid'::text)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: food_consumption_logs
//   id: uuid (not null, default: gen_random_uuid())
//   client_id: uuid (not null)
//   consumed_on: date (not null)
//   food_name: text (not null)
//   calories: numeric (nullable, default: 0)
//   protein: numeric (nullable, default: 0)
//   carbs: numeric (nullable, default: 0)
//   fat: numeric (nullable, default: 0)
//   created_at: timestamp with time zone (not null, default: now())
// Table: food_items
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   source: text (nullable)
//   food_group: text (nullable)
//   base_qty_g: numeric (nullable, default: 100)
//   energy_kcal: numeric (nullable)
//   protein_g: numeric (nullable)
//   carbs_g: numeric (nullable)
//   fats_g: numeric (nullable)
//   fiber_g: numeric (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: food_water_tracking
//   id: uuid (not null, default: gen_random_uuid())
//   client_id: uuid (not null)
//   date: date (not null)
//   water_ml: integer (nullable, default: 0)
//   meals: jsonb (nullable, default: '[]'::jsonb)
//   extra_meals: jsonb (nullable, default: '[]'::jsonb)
//   total_calories: numeric (nullable, default: 0)
//   total_protein: numeric (nullable, default: 0)
//   total_carbs: numeric (nullable, default: 0)
//   total_fats: numeric (nullable, default: 0)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: habit_logs
//   id: uuid (not null, default: gen_random_uuid())
//   habit_id: uuid (not null)
//   completed_date: date (not null)
// Table: habits
//   id: uuid (not null, default: gen_random_uuid())
//   client_id: uuid (not null)
//   title: text (not null)
//   professional_id: uuid (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: meal_items
//   id: uuid (not null, default: gen_random_uuid())
//   meal_id: uuid (not null)
//   food_item_id: uuid (not null)
//   portion_g: numeric (not null)
//   notes: text (nullable)
// Table: meals
//   id: uuid (not null, default: gen_random_uuid())
//   diet_id: uuid (not null)
//   name: text (not null)
//   time: time without time zone (not null)
//   order_index: integer (not null)
// Table: note_links
//   id: uuid (not null, default: gen_random_uuid())
//   source_note_id: uuid (not null)
//   target_note_id: uuid (not null)
// Table: nutrition_assessments
//   id: uuid (not null, default: gen_random_uuid())
//   client_id: uuid (not null)
//   professional_id: uuid (nullable)
//   date: date (not null, default: CURRENT_DATE)
//   weight: numeric (nullable)
//   height: numeric (nullable)
//   body_fat_percentage: numeric (nullable)
//   muscle_mass_percentage: numeric (nullable)
//   bmr: numeric (nullable)
//   tdee: numeric (nullable)
//   goal_weight: numeric (nullable)
//   status: text (nullable)
//   method: text (nullable)
//   formulas_used: jsonb (nullable, default: '{}'::jsonb)
//   circumferences: jsonb (nullable, default: '{}'::jsonb)
//   skinfolds: jsonb (nullable, default: '{}'::jsonb)
//   observations: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   front_photo_url: text (nullable)
//   side_photo_url: text (nullable)
//   back_photo_url: text (nullable)
// Table: nutrition_supplements
//   id: uuid (not null, default: gen_random_uuid())
//   client_id: uuid (not null)
//   professional_id: uuid (nullable)
//   name: text (not null)
//   dosage: text (not null)
//   frequency: text (nullable)
//   timing: text (nullable)
//   observations: text (nullable)
//   is_active: boolean (nullable, default: true)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: productivity_focus_settings
//   user_id: uuid (not null)
//   reminder_interval: integer (nullable, default: 15)
//   is_enabled: boolean (nullable, default: false)
//   sound_volume: double precision (nullable, default: 0.5)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: productivity_habit_logs
//   id: uuid (not null, default: gen_random_uuid())
//   habit_id: uuid (not null)
//   completed_date: date (not null)
//   created_at: timestamp with time zone (not null, default: now())
//   progress_made: integer (nullable, default: 1)
// Table: productivity_habits
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   title: text (not null)
//   color: text (nullable, default: 'blue'::text)
//   frequency: text (nullable, default: 'daily'::text)
//   created_at: timestamp with time zone (not null, default: now())
//   target_value: integer (nullable, default: 1)
//   target_unit: text (nullable, default: 'vezes'::text)
//   is_active: boolean (nullable, default: true)
//   tags: _text (nullable, default: '{}'::text[])
// Table: productivity_tasks
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   title: text (not null)
//   description: text (nullable)
//   status: text (not null, default: 'todo'::text)
//   priority: text (not null, default: 'medium'::text)
//   due_date: date (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   is_urgent: boolean (nullable, default: false)
//   tags: _text (nullable, default: '{}'::text[])
// Table: professional_client_links
//   id: uuid (not null, default: gen_random_uuid())
//   professional_id: uuid (not null)
//   client_id: uuid (not null)
//   status: text (not null, default: 'pending'::text)
//   invite_code: text (nullable)
//   can_view_nutrition: boolean (not null, default: false)
//   can_view_training: boolean (not null, default: false)
//   can_view_mind: boolean (not null, default: false)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: professional_settings
//   id: uuid (not null, default: gen_random_uuid())
//   professional_id: uuid (not null)
//   pix_key: text (nullable)
//   payment_gateway_link: text (nullable)
//   consultation_duration: integer (nullable, default: 60)
//   working_hours: jsonb (nullable, default: '{"friday": ["09:00", "18:00"], "monday": ["09:00", "18:00"], "tuesday": ["09:00", "18:00"], "thursday": ["09:00", "18:00"], "wednesday": ["09:00", "18:00"]}'::jsonb)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: profiles
//   id: uuid (not null)
//   name: text (nullable)
//   email: text (nullable)
//   role: text (nullable, default: 'client'::text)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
//   is_nutritionist: boolean (not null, default: false)
//   is_trainer: boolean (not null, default: false)
//   is_psychologist: boolean (not null, default: false)
// Table: recipe_ingredients
//   id: uuid (not null, default: gen_random_uuid())
//   recipe_id: uuid (not null)
//   food_item_id: uuid (not null)
//   amount_grams: numeric (not null)
// Table: recipes
//   id: uuid (not null, default: gen_random_uuid())
//   professional_id: uuid (not null)
//   name: text (not null)
//   instructions: text (nullable)
//   total_calories: numeric (nullable, default: 0)
//   total_protein: numeric (nullable, default: 0)
//   total_carbs: numeric (nullable, default: 0)
//   total_fats: numeric (nullable, default: 0)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: service_plans
//   id: uuid (not null, default: gen_random_uuid())
//   professional_id: uuid (not null)
//   name: text (not null)
//   description: text (nullable)
//   price: numeric (not null)
//   billing_cycle: text (nullable, default: 'monthly'::text)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: study_decks
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   title: text (not null)
//   description: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
// Table: study_flashcards
//   id: uuid (not null, default: gen_random_uuid())
//   deck_id: uuid (not null)
//   front_content: text (not null)
//   back_content: text (not null)
//   interval: integer (not null, default: 0)
//   repetition: integer (not null, default: 0)
//   ease_factor: numeric (not null, default: 2.5)
//   next_review_date: timestamp with time zone (nullable)
//   card_type: text (not null, default: 'traditional'::text)
//   options: jsonb (nullable, default: '[]'::jsonb)
//   efactor: real (not null, default: 2.5)
//   next_review: timestamp with time zone (not null, default: now())
// Table: study_folders
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   name: text (not null)
//   parent_id: uuid (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: study_notes
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   title: text (not null)
//   content: text (not null)
//   tags: _text (not null, default: '{}'::text[])
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
//   folder_id: uuid (nullable)
// Table: tasks
//   id: uuid (not null, default: gen_random_uuid())
//   client_id: uuid (not null)
//   title: text (not null)
//   description: text (nullable)
//   status: text (nullable, default: 'pending'::text)
//   target_date: date (nullable)
//   priority: text (nullable, default: 'medium'::text)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: water_consumption_logs
//   id: uuid (not null, default: gen_random_uuid())
//   client_id: uuid (not null)
//   consumed_on: date (not null)
//   amount_ml: integer (not null, default: 0)
//   created_at: timestamp with time zone (not null, default: now())

// --- CONSTRAINTS ---
// Table: appointments
//   FOREIGN KEY appointments_client_id_fkey: FOREIGN KEY (client_id) REFERENCES auth.users(id) ON DELETE SET NULL
//   PRIMARY KEY appointments_pkey: PRIMARY KEY (id)
//   FOREIGN KEY appointments_professional_id_fkey: FOREIGN KEY (professional_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: audit_logs
//   FOREIGN KEY audit_logs_admin_id_fkey: FOREIGN KEY (admin_id) REFERENCES profiles(id) ON DELETE CASCADE
//   PRIMARY KEY audit_logs_pkey: PRIMARY KEY (id)
//   FOREIGN KEY audit_logs_target_user_id_fkey: FOREIGN KEY (target_user_id) REFERENCES profiles(id) ON DELETE CASCADE
// Table: client_subscriptions
//   FOREIGN KEY client_subscriptions_client_id_fkey: FOREIGN KEY (client_id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY client_subscriptions_pkey: PRIMARY KEY (id)
//   FOREIGN KEY client_subscriptions_plan_id_fkey: FOREIGN KEY (plan_id) REFERENCES service_plans(id) ON DELETE RESTRICT
//   FOREIGN KEY client_subscriptions_professional_id_fkey: FOREIGN KEY (professional_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: diet_template_items
//   FOREIGN KEY diet_template_items_food_item_id_fkey: FOREIGN KEY (food_item_id) REFERENCES food_items(id) ON DELETE CASCADE
//   FOREIGN KEY diet_template_items_meal_id_fkey: FOREIGN KEY (meal_id) REFERENCES diet_template_meals(id) ON DELETE CASCADE
//   PRIMARY KEY diet_template_items_pkey: PRIMARY KEY (id)
// Table: diet_template_meals
//   PRIMARY KEY diet_template_meals_pkey: PRIMARY KEY (id)
//   FOREIGN KEY diet_template_meals_template_id_fkey: FOREIGN KEY (template_id) REFERENCES diet_templates(id) ON DELETE CASCADE
// Table: diet_templates
//   PRIMARY KEY diet_templates_pkey: PRIMARY KEY (id)
//   FOREIGN KEY diet_templates_professional_id_fkey: FOREIGN KEY (professional_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: diets
//   FOREIGN KEY diets_client_id_fkey: FOREIGN KEY (client_id) REFERENCES profiles(id) ON DELETE CASCADE
//   PRIMARY KEY diets_pkey: PRIMARY KEY (id)
//   FOREIGN KEY diets_professional_id_fkey: FOREIGN KEY (professional_id) REFERENCES profiles(id)
// Table: exercise_plan_items
//   FOREIGN KEY exercise_plan_items_exercise_id_fkey: FOREIGN KEY (exercise_id) REFERENCES exercises(id)
//   CHECK exercise_plan_items_pain_limit_eva_check: CHECK (((pain_limit_eva >= 0) AND (pain_limit_eva <= 10)))
//   PRIMARY KEY exercise_plan_items_pkey: PRIMARY KEY (id)
//   FOREIGN KEY exercise_plan_items_plan_id_fkey: FOREIGN KEY (plan_id) REFERENCES exercise_plans(id) ON DELETE CASCADE
// Table: exercise_plans
//   FOREIGN KEY exercise_plans_client_id_fkey: FOREIGN KEY (client_id) REFERENCES profiles(id) ON DELETE CASCADE
//   PRIMARY KEY exercise_plans_pkey: PRIMARY KEY (id)
//   FOREIGN KEY exercise_plans_professional_id_fkey: FOREIGN KEY (professional_id) REFERENCES profiles(id)
// Table: exercises
//   PRIMARY KEY exercises_pkey: PRIMARY KEY (id)
// Table: financial_transactions
//   PRIMARY KEY financial_transactions_pkey: PRIMARY KEY (id)
//   FOREIGN KEY financial_transactions_professional_id_fkey: FOREIGN KEY (professional_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: food_consumption_logs
//   FOREIGN KEY food_consumption_logs_client_id_fkey: FOREIGN KEY (client_id) REFERENCES profiles(id) ON DELETE CASCADE
//   PRIMARY KEY food_consumption_logs_pkey: PRIMARY KEY (id)
// Table: food_items
//   PRIMARY KEY food_items_pkey: PRIMARY KEY (id)
// Table: food_water_tracking
//   UNIQUE food_water_tracking_client_id_date_key: UNIQUE (client_id, date)
//   FOREIGN KEY food_water_tracking_client_id_fkey: FOREIGN KEY (client_id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY food_water_tracking_pkey: PRIMARY KEY (id)
// Table: habit_logs
//   UNIQUE habit_logs_habit_id_completed_date_key: UNIQUE (habit_id, completed_date)
//   FOREIGN KEY habit_logs_habit_id_fkey: FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE
//   PRIMARY KEY habit_logs_pkey: PRIMARY KEY (id)
// Table: habits
//   FOREIGN KEY habits_client_id_fkey: FOREIGN KEY (client_id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY habits_pkey: PRIMARY KEY (id)
//   FOREIGN KEY habits_professional_id_fkey: FOREIGN KEY (professional_id) REFERENCES auth.users(id) ON DELETE SET NULL
// Table: meal_items
//   FOREIGN KEY meal_items_food_item_id_fkey: FOREIGN KEY (food_item_id) REFERENCES food_items(id)
//   FOREIGN KEY meal_items_meal_id_fkey: FOREIGN KEY (meal_id) REFERENCES meals(id) ON DELETE CASCADE
//   PRIMARY KEY meal_items_pkey: PRIMARY KEY (id)
// Table: meals
//   FOREIGN KEY meals_diet_id_fkey: FOREIGN KEY (diet_id) REFERENCES diets(id) ON DELETE CASCADE
//   PRIMARY KEY meals_pkey: PRIMARY KEY (id)
// Table: note_links
//   PRIMARY KEY note_links_pkey: PRIMARY KEY (id)
//   FOREIGN KEY note_links_source_note_id_fkey: FOREIGN KEY (source_note_id) REFERENCES study_notes(id) ON DELETE CASCADE
//   UNIQUE note_links_source_note_id_target_note_id_key: UNIQUE (source_note_id, target_note_id)
//   FOREIGN KEY note_links_target_note_id_fkey: FOREIGN KEY (target_note_id) REFERENCES study_notes(id) ON DELETE CASCADE
// Table: nutrition_assessments
//   FOREIGN KEY nutrition_assessments_client_id_fkey: FOREIGN KEY (client_id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY nutrition_assessments_pkey: PRIMARY KEY (id)
//   FOREIGN KEY nutrition_assessments_professional_id_fkey: FOREIGN KEY (professional_id) REFERENCES auth.users(id) ON DELETE SET NULL
// Table: nutrition_supplements
//   FOREIGN KEY nutrition_supplements_client_id_fkey: FOREIGN KEY (client_id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY nutrition_supplements_pkey: PRIMARY KEY (id)
//   FOREIGN KEY nutrition_supplements_professional_id_fkey: FOREIGN KEY (professional_id) REFERENCES auth.users(id) ON DELETE SET NULL
// Table: productivity_focus_settings
//   PRIMARY KEY productivity_focus_settings_pkey: PRIMARY KEY (user_id)
//   FOREIGN KEY productivity_focus_settings_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: productivity_habit_logs
//   UNIQUE productivity_habit_logs_habit_id_completed_date_key: UNIQUE (habit_id, completed_date)
//   FOREIGN KEY productivity_habit_logs_habit_id_fkey: FOREIGN KEY (habit_id) REFERENCES productivity_habits(id) ON DELETE CASCADE
//   PRIMARY KEY productivity_habit_logs_pkey: PRIMARY KEY (id)
// Table: productivity_habits
//   PRIMARY KEY productivity_habits_pkey: PRIMARY KEY (id)
//   FOREIGN KEY productivity_habits_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: productivity_tasks
//   PRIMARY KEY productivity_tasks_pkey: PRIMARY KEY (id)
//   FOREIGN KEY productivity_tasks_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: professional_client_links
//   FOREIGN KEY professional_client_links_client_id_fkey: FOREIGN KEY (client_id) REFERENCES profiles(id) ON DELETE CASCADE
//   UNIQUE professional_client_links_invite_code_key: UNIQUE (invite_code)
//   PRIMARY KEY professional_client_links_pkey: PRIMARY KEY (id)
//   FOREIGN KEY professional_client_links_professional_id_fkey: FOREIGN KEY (professional_id) REFERENCES profiles(id) ON DELETE CASCADE
//   CHECK professional_client_links_status_check: CHECK ((status = ANY (ARRAY['pending'::text, 'active'::text, 'rejected'::text])))
//   UNIQUE professional_client_links_unique_connection: UNIQUE (professional_id, client_id)
// Table: professional_settings
//   PRIMARY KEY professional_settings_pkey: PRIMARY KEY (id)
//   FOREIGN KEY professional_settings_professional_id_fkey: FOREIGN KEY (professional_id) REFERENCES auth.users(id) ON DELETE CASCADE
//   UNIQUE professional_settings_professional_id_key: UNIQUE (professional_id)
// Table: profiles
//   FOREIGN KEY profiles_id_fkey: FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY profiles_pkey: PRIMARY KEY (id)
// Table: recipe_ingredients
//   FOREIGN KEY recipe_ingredients_food_item_id_fkey: FOREIGN KEY (food_item_id) REFERENCES food_items(id) ON DELETE CASCADE
//   PRIMARY KEY recipe_ingredients_pkey: PRIMARY KEY (id)
//   FOREIGN KEY recipe_ingredients_recipe_id_fkey: FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
// Table: recipes
//   PRIMARY KEY recipes_pkey: PRIMARY KEY (id)
//   FOREIGN KEY recipes_professional_id_fkey: FOREIGN KEY (professional_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: service_plans
//   PRIMARY KEY service_plans_pkey: PRIMARY KEY (id)
//   FOREIGN KEY service_plans_professional_id_fkey: FOREIGN KEY (professional_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: study_decks
//   PRIMARY KEY study_decks_pkey: PRIMARY KEY (id)
//   FOREIGN KEY study_decks_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: study_flashcards
//   FOREIGN KEY study_flashcards_deck_id_fkey: FOREIGN KEY (deck_id) REFERENCES study_decks(id) ON DELETE CASCADE
//   PRIMARY KEY study_flashcards_pkey: PRIMARY KEY (id)
// Table: study_folders
//   FOREIGN KEY study_folders_parent_id_fkey: FOREIGN KEY (parent_id) REFERENCES study_folders(id) ON DELETE CASCADE
//   PRIMARY KEY study_folders_pkey: PRIMARY KEY (id)
//   FOREIGN KEY study_folders_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: study_notes
//   FOREIGN KEY study_notes_folder_id_fkey: FOREIGN KEY (folder_id) REFERENCES study_folders(id) ON DELETE SET NULL
//   PRIMARY KEY study_notes_pkey: PRIMARY KEY (id)
//   FOREIGN KEY study_notes_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: tasks
//   FOREIGN KEY tasks_client_id_fkey: FOREIGN KEY (client_id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY tasks_pkey: PRIMARY KEY (id)
// Table: water_consumption_logs
//   FOREIGN KEY water_consumption_logs_client_id_fkey: FOREIGN KEY (client_id) REFERENCES profiles(id) ON DELETE CASCADE
//   PRIMARY KEY water_consumption_logs_pkey: PRIMARY KEY (id)

// --- ROW LEVEL SECURITY POLICIES ---
// Table: appointments
//   Policy "Clients view own appointments" (SELECT, PERMISSIVE) roles={public}
//     USING: (auth.uid() = client_id)
//   Policy "Master views all appointments" (ALL, PERMISSIVE) roles={public}
//     USING: (((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'master'::text)
//   Policy "Profs manage own appointments" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.uid() = professional_id)
// Table: audit_logs
//   Policy "Masters can insert logs" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: is_admin_user()
//   Policy "Masters can view all logs" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: is_admin_user()
// Table: client_subscriptions
//   Policy "Clients view own subscriptions" (SELECT, PERMISSIVE) roles={public}
//     USING: (auth.uid() = client_id)
//   Policy "Master views all subscriptions" (ALL, PERMISSIVE) roles={public}
//     USING: (((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'master'::text)
//   Policy "Profs manage own subscriptions" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.uid() = professional_id)
// Table: diet_template_items
//   Policy "Profs manage own template items" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM (diet_template_meals m      JOIN diet_templates t ON ((t.id = m.template_id)))   WHERE ((m.id = diet_template_items.meal_id) AND ((t.professional_id = auth.uid()) OR is_admin_user()))))
// Table: diet_template_meals
//   Policy "Profs manage own template meals" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM diet_templates   WHERE ((diet_templates.id = diet_template_meals.template_id) AND ((diet_templates.professional_id = auth.uid()) OR is_admin_user()))))
// Table: diet_templates
//   Policy "Profs manage own templates" (ALL, PERMISSIVE) roles={authenticated}
//     USING: ((auth.uid() = professional_id) OR is_admin_user())
// Table: diets
//   Policy "Clients can read own diets" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (client_id = auth.uid())
//   Policy "Professionals can manage created diets" (ALL, PERMISSIVE) roles={authenticated}
//     USING: ((professional_id = auth.uid()) OR is_admin_user())
// Table: exercise_plan_items
//   Policy "Patients can view their own exercise plan items" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM exercise_plans   WHERE ((exercise_plans.id = exercise_plan_items.plan_id) AND (exercise_plans.client_id = auth.uid()))))
//   Policy "Professionals can manage own exercise plan items" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM exercise_plans   WHERE ((exercise_plans.id = exercise_plan_items.plan_id) AND (exercise_plans.professional_id = auth.uid()))))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM exercise_plans   WHERE ((exercise_plans.id = exercise_plan_items.plan_id) AND (exercise_plans.professional_id = auth.uid()))))
// Table: exercise_plans
//   Policy "Patients can view their own exercise plans" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (client_id = auth.uid())
//   Policy "Professionals can manage own exercise plans" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (professional_id = auth.uid())
//     WITH CHECK: (professional_id = auth.uid())
// Table: exercises
//   Policy "Authenticated users can select exercises" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Masters can manage exercises" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM profiles   WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'master'::text))))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM profiles   WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'master'::text))))
// Table: financial_transactions
//   Policy "Master views all finances" (ALL, PERMISSIVE) roles={public}
//     USING: (((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'master'::text)
//   Policy "Profs manage own finances" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.uid() = professional_id)
// Table: food_consumption_logs
//   Policy "Admins can view all food logs" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: is_admin_user()
//   Policy "Patients can manage own food logs" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (client_id = auth.uid())
//     WITH CHECK: (client_id = auth.uid())
//   Policy "Professionals can view active patients food logs" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM professional_client_links pcl   WHERE ((pcl.client_id = food_consumption_logs.client_id) AND (pcl.professional_id = auth.uid()) AND (pcl.status = 'active'::text))))
// Table: food_items
//   Policy "Authenticated users can select food items" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Food items are viewable by everyone" (SELECT, PERMISSIVE) roles={public}
//     USING: true
//   Policy "Professionals can manage food items" (ALL, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1    FROM profiles   WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'professional'::text))))
// Table: food_water_tracking
//   Policy "Clients manage own tracking" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.uid() = client_id)
//   Policy "Masters view tracking" (ALL, PERMISSIVE) roles={public}
//     USING: ((((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'master'::text) OR (auth.email() = 'admin@system.com'::text))
//   Policy "Professionals view tracking" (SELECT, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1    FROM professional_client_links pcl   WHERE ((pcl.client_id = food_water_tracking.client_id) AND (pcl.professional_id = auth.uid()))))
// Table: habit_logs
//   Policy "Clients manage own habit logs" (ALL, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1    FROM habits   WHERE ((habits.id = habit_logs.habit_id) AND (habits.client_id = auth.uid()))))
//   Policy "Master views all habit logs" (ALL, PERMISSIVE) roles={public}
//     USING: (((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'master'::text)
//   Policy "Profs view linked habit logs" (SELECT, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1    FROM (habits h      JOIN professional_client_links pcl ON ((pcl.client_id = h.client_id)))   WHERE ((h.id = habit_logs.habit_id) AND (pcl.professional_id = auth.uid()))))
// Table: habits
//   Policy "Clients manage own habits" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.uid() = client_id)
//   Policy "Master views all habits" (ALL, PERMISSIVE) roles={public}
//     USING: (((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'master'::text)
//   Policy "Profs can delete linked habits" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM professional_client_links pcl   WHERE ((pcl.client_id = habits.client_id) AND (pcl.professional_id = auth.uid()))))
//   Policy "Profs can insert linked habits" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (EXISTS ( SELECT 1    FROM professional_client_links pcl   WHERE ((pcl.client_id = habits.client_id) AND (pcl.professional_id = auth.uid()) AND (pcl.status = 'active'::text))))
//   Policy "Profs can update linked habits" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM professional_client_links pcl   WHERE ((pcl.client_id = habits.client_id) AND (pcl.professional_id = auth.uid()))))
//   Policy "Profs view linked habits" (SELECT, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1    FROM professional_client_links pcl   WHERE ((pcl.client_id = habits.client_id) AND (pcl.professional_id = auth.uid()))))
// Table: meal_items
//   Policy "Clients can read own meal items" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM (meals      JOIN diets ON ((diets.id = meals.diet_id)))   WHERE ((meals.id = meal_items.meal_id) AND (diets.client_id = auth.uid()))))
//   Policy "Professionals can manage own meal items" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM (meals      JOIN diets ON ((diets.id = meals.diet_id)))   WHERE ((meals.id = meal_items.meal_id) AND ((diets.professional_id = auth.uid()) OR is_admin_user()))))
// Table: meals
//   Policy "Clients can read own meals" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM diets   WHERE ((diets.id = meals.diet_id) AND (diets.client_id = auth.uid()))))
//   Policy "Professionals can manage own meals" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM diets   WHERE ((diets.id = meals.diet_id) AND ((diets.professional_id = auth.uid()) OR is_admin_user()))))
// Table: note_links
//   Policy "Users can manage own note links" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM study_notes   WHERE ((study_notes.id = note_links.source_note_id) AND (study_notes.user_id = auth.uid()))))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM study_notes   WHERE ((study_notes.id = note_links.source_note_id) AND (study_notes.user_id = auth.uid()))))
// Table: nutrition_assessments
//   Policy "Clients view own assessments" (SELECT, PERMISSIVE) roles={public}
//     USING: (auth.uid() = client_id)
//   Policy "Masters manage assessments" (ALL, PERMISSIVE) roles={public}
//     USING: ((((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'master'::text) OR (auth.email() = 'admin@system.com'::text))
//   Policy "Masters view all assessments" (ALL, PERMISSIVE) roles={public}
//     USING: (((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'master'::text)
//     WITH CHECK: (((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'master'::text)
//   Policy "Professionals delete assessments" (DELETE, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1    FROM professional_client_links pcl   WHERE ((pcl.client_id = pcl.client_id) AND (pcl.professional_id = auth.uid()))))
//   Policy "Professionals insert assessments" (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: (EXISTS ( SELECT 1    FROM professional_client_links pcl   WHERE ((pcl.client_id = pcl.client_id) AND (pcl.professional_id = auth.uid()))))
//   Policy "Professionals select assessments" (SELECT, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1    FROM professional_client_links pcl   WHERE ((pcl.client_id = nutrition_assessments.client_id) AND (pcl.professional_id = auth.uid()))))
//   Policy "Professionals update assessments" (UPDATE, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1    FROM professional_client_links pcl   WHERE ((pcl.client_id = pcl.client_id) AND (pcl.professional_id = auth.uid()))))
// Table: nutrition_supplements
//   Policy "Clients view own supplements" (SELECT, PERMISSIVE) roles={public}
//     USING: (auth.uid() = client_id)
//   Policy "Masters manage supplements" (ALL, PERMISSIVE) roles={public}
//     USING: ((((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'master'::text) OR (auth.email() = 'admin@system.com'::text))
//   Policy "Masters view all supplements" (ALL, PERMISSIVE) roles={public}
//     USING: (((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'master'::text)
//     WITH CHECK: (((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'master'::text)
//   Policy "Professionals manage supplements" (ALL, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1    FROM professional_client_links pcl   WHERE ((pcl.client_id = pcl.client_id) AND (pcl.professional_id = auth.uid()))))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM professional_client_links pcl   WHERE ((pcl.client_id = pcl.client_id) AND (pcl.professional_id = auth.uid()))))
// Table: productivity_focus_settings
//   Policy "Users manage own settings" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.uid() = user_id)
// Table: productivity_habit_logs
//   Policy "Users manage their own habit logs" (ALL, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1    FROM productivity_habits h   WHERE ((h.id = productivity_habit_logs.habit_id) AND (h.user_id = auth.uid()))))
// Table: productivity_habits
//   Policy "Users manage their own habits" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.uid() = user_id)
// Table: productivity_tasks
//   Policy "Users manage their own tasks" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.uid() = user_id)
// Table: professional_client_links
//   Policy "Clients can insert links" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (client_id = auth.uid())
//   Policy "Clients can update their own links" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: (client_id = auth.uid())
//     WITH CHECK: (client_id = auth.uid())
//   Policy "Clients can view their own links" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (client_id = auth.uid())
//   Policy "Masters manage professional_client_links" (ALL, PERMISSIVE) roles={public}
//     USING: ((((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'master'::text) OR (auth.email() = 'admin@system.com'::text))
//   Policy "Professionals can delete links" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: (professional_id = auth.uid())
//   Policy "Professionals can insert links" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: (professional_id = auth.uid())
//   Policy "Professionals can view their own created links" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (professional_id = auth.uid())
// Table: professional_settings
//   Policy "Profs manage own clinic settings" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.uid() = professional_id)
//   Policy "Public can view clinic settings" (SELECT, PERMISSIVE) roles={public}
//     USING: true
// Table: profiles
//   Policy "Masters can update any profile" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: is_admin_user()
//     WITH CHECK: is_admin_user()
//   Policy "Public profiles are viewable by everyone." (SELECT, PERMISSIVE) roles={public}
//     USING: true
//   Policy "Users can insert their own profile." (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: (auth.uid() = id)
//   Policy "Users can update own profile." (UPDATE, PERMISSIVE) roles={public}
//     USING: (auth.uid() = id)
// Table: recipe_ingredients
//   Policy "Clients view linked prof recipe ingredients" (SELECT, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1    FROM (recipes r      JOIN professional_client_links pcl ON ((pcl.professional_id = r.professional_id)))   WHERE ((r.id = recipe_ingredients.recipe_id) AND (pcl.client_id = auth.uid()))))
//   Policy "Master views recipe ingredients" (ALL, PERMISSIVE) roles={public}
//     USING: (((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'master'::text)
//   Policy "Profs manage own recipe ingredients" (ALL, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1    FROM recipes   WHERE ((recipes.id = recipe_ingredients.recipe_id) AND (recipes.professional_id = auth.uid()))))
// Table: recipes
//   Policy "Clients view linked prof recipes" (SELECT, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1    FROM professional_client_links pcl   WHERE ((pcl.client_id = auth.uid()) AND (pcl.professional_id = recipes.professional_id))))
//   Policy "Master views recipes" (ALL, PERMISSIVE) roles={public}
//     USING: (((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'master'::text)
//   Policy "Profs manage own recipes" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.uid() = professional_id)
// Table: service_plans
//   Policy "Clients view subscribed plans" (SELECT, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1    FROM client_subscriptions cs   WHERE ((cs.plan_id = service_plans.id) AND (cs.client_id = auth.uid()))))
//   Policy "Master views all plans" (ALL, PERMISSIVE) roles={public}
//     USING: (((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'master'::text)
//   Policy "Profs manage own plans" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.uid() = professional_id)
// Table: study_decks
//   Policy "Users can manage own study decks" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//     WITH CHECK: (user_id = auth.uid())
// Table: study_flashcards
//   Policy "Users can manage own study flashcards" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM study_decks   WHERE ((study_decks.id = study_flashcards.deck_id) AND (study_decks.user_id = auth.uid()))))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM study_decks   WHERE ((study_decks.id = study_flashcards.deck_id) AND (study_decks.user_id = auth.uid()))))
// Table: study_folders
//   Policy "Users can manage their own folders" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.uid() = user_id)
// Table: study_notes
//   Policy "Users can manage own study notes" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//     WITH CHECK: (user_id = auth.uid())
// Table: tasks
//   Policy "Clients manage own tasks" (ALL, PERMISSIVE) roles={public}
//     USING: (auth.uid() = client_id)
//   Policy "Master views all tasks" (ALL, PERMISSIVE) roles={public}
//     USING: (((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'master'::text)
//   Policy "Profs view linked tasks" (SELECT, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1    FROM professional_client_links pcl   WHERE ((pcl.client_id = tasks.client_id) AND (pcl.professional_id = auth.uid()))))
// Table: water_consumption_logs
//   Policy "Admins can view all water logs" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: is_admin_user()
//   Policy "Patients can manage own water logs" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (client_id = auth.uid())
//     WITH CHECK: (client_id = auth.uid())
//   Policy "Professionals can view active patients water logs" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM professional_client_links pcl   WHERE ((pcl.client_id = water_consumption_logs.client_id) AND (pcl.professional_id = auth.uid()) AND (pcl.status = 'active'::text))))

// --- DATABASE FUNCTIONS ---
// FUNCTION get_client_favorite_foods(uuid)
//   CREATE OR REPLACE FUNCTION public.get_client_favorite_foods(p_client_id uuid)
//    RETURNS TABLE(food_item_id uuid, name text, base_calories numeric, base_protein numeric, base_carbs numeric, base_fats numeric, usage_count bigint)
//    LANGUAGE plpgsql
//   AS $function$
//   BEGIN
//     RETURN QUERY
//     WITH all_extras AS (
//       SELECT jsonb_array_elements(extra_meals) as meal
//       FROM public.food_water_tracking
//       WHERE client_id = p_client_id
//       AND date > (now() - interval '30 days')
//     )
//     SELECT
//       (meal->>'food_item_id')::UUID as food_id,
//       meal->>'name' as food_name,
//       (meal->>'calories')::DECIMAL as cal,
//       (meal->>'protein')::DECIMAL as prot,
//       (meal->>'carbs')::DECIMAL as carb,
//       (meal->>'fats')::DECIMAL as fat,
//       COUNT(*) as frequency
//     FROM all_extras
//     WHERE meal->>'food_item_id' IS NOT NULL
//     GROUP BY food_id, food_name, cal, prot, carb, fat
//     ORDER BY frequency DESC
//     LIMIT 5;
//   END;
//   $function$
//
// FUNCTION handle_updated_at()
//   CREATE OR REPLACE FUNCTION public.handle_updated_at()
//    RETURNS trigger
//    LANGUAGE plpgsql
//   AS $function$
//   BEGIN
//     NEW.updated_at = now();
//     RETURN NEW;
//   END;
//   $function$
//
// FUNCTION is_admin_user()
//   CREATE OR REPLACE FUNCTION public.is_admin_user()
//    RETURNS boolean
//    LANGUAGE sql
//    SECURITY DEFINER
//    SET search_path TO 'public'
//   AS $function$
//     SELECT EXISTS (
//       SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
//     );
//   $function$
//
// FUNCTION rls_auto_enable()
//   CREATE OR REPLACE FUNCTION public.rls_auto_enable()
//    RETURNS event_trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//    SET search_path TO 'pg_catalog'
//   AS $function$
//   DECLARE
//     cmd record;
//   BEGIN
//     FOR cmd IN
//       SELECT *
//       FROM pg_event_trigger_ddl_commands()
//       WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
//         AND object_type IN ('table','partitioned table')
//     LOOP
//        IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
//         BEGIN
//           EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
//           RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
//         EXCEPTION
//           WHEN OTHERS THEN
//             RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
//         END;
//        ELSE
//           RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
//        END IF;
//     END LOOP;
//   END;
//   $function$
//
// FUNCTION update_diets_updated_at()
//   CREATE OR REPLACE FUNCTION public.update_diets_updated_at()
//    RETURNS trigger
//    LANGUAGE plpgsql
//   AS $function$
//   BEGIN
//       NEW.updated_at = now();
//       RETURN NEW;
//   END;
//   $function$
//

// --- TRIGGERS ---
// Table: diets
//   update_diets_updated_at_trigger: CREATE TRIGGER update_diets_updated_at_trigger BEFORE UPDATE ON public.diets FOR EACH ROW EXECUTE FUNCTION update_diets_updated_at()
// Table: exercise_plans
//   on_exercise_plans_updated: CREATE TRIGGER on_exercise_plans_updated BEFORE UPDATE ON public.exercise_plans FOR EACH ROW EXECUTE FUNCTION handle_updated_at()
// Table: professional_client_links
//   on_professional_client_links_updated: CREATE TRIGGER on_professional_client_links_updated BEFORE UPDATE ON public.professional_client_links FOR EACH ROW EXECUTE FUNCTION handle_updated_at()
// Table: profiles
//   on_profiles_updated: CREATE TRIGGER on_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION handle_updated_at()

// --- INDEXES ---
// Table: food_water_tracking
//   CREATE UNIQUE INDEX food_water_tracking_client_id_date_key ON public.food_water_tracking USING btree (client_id, date)
// Table: habit_logs
//   CREATE UNIQUE INDEX habit_logs_habit_id_completed_date_key ON public.habit_logs USING btree (habit_id, completed_date)
// Table: note_links
//   CREATE UNIQUE INDEX note_links_source_note_id_target_note_id_key ON public.note_links USING btree (source_note_id, target_note_id)
// Table: productivity_habit_logs
//   CREATE UNIQUE INDEX productivity_habit_logs_habit_id_completed_date_key ON public.productivity_habit_logs USING btree (habit_id, completed_date)
// Table: professional_client_links
//   CREATE UNIQUE INDEX professional_client_links_invite_code_key ON public.professional_client_links USING btree (invite_code)
//   CREATE UNIQUE INDEX professional_client_links_unique_connection ON public.professional_client_links USING btree (professional_id, client_id)
// Table: professional_settings
//   CREATE UNIQUE INDEX professional_settings_professional_id_key ON public.professional_settings USING btree (professional_id)
