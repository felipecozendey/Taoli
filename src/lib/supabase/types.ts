// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
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
            foreignKeyName: "diets_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diets_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
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
            foreignKeyName: "meal_items_food_item_id_fkey"
            columns: ["food_item_id"]
            isOneToOne: false
            referencedRelation: "food_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_items_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
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
            foreignKeyName: "meals_diet_id_fkey"
            columns: ["diet_id"]
            isOneToOne: false
            referencedRelation: "diets"
            referencedColumns: ["id"]
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
            foreignKeyName: "note_links_source_note_id_fkey"
            columns: ["source_note_id"]
            isOneToOne: false
            referencedRelation: "study_notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_links_target_note_id_fkey"
            columns: ["target_note_id"]
            isOneToOne: false
            referencedRelation: "study_notes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          role?: string | null
          updated_at?: string
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
          deck_id: string
          ease_factor: number
          front_content: string
          id: string
          interval: number
          next_review_date: string | null
          repetition: number
        }
        Insert: {
          back_content: string
          deck_id: string
          ease_factor?: number
          front_content: string
          id?: string
          interval?: number
          next_review_date?: string | null
          repetition?: number
        }
        Update: {
          back_content?: string
          deck_id?: string
          ease_factor?: number
          front_content?: string
          id?: string
          interval?: number
          next_review_date?: string | null
          repetition?: number
        }
        Relationships: [
          {
            foreignKeyName: "study_flashcards_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "study_decks"
            referencedColumns: ["id"]
          },
        ]
      }
      study_notes: {
        Row: {
          content: string
          created_at: string
          id: string
          tags: string[]
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          tags?: string[]
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          tags?: string[]
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
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
// Table: diets
//   id: uuid (not null, default: gen_random_uuid())
//   client_id: uuid (not null)
//   professional_id: uuid (not null)
//   name: text (not null)
//   is_active: boolean (not null, default: true)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
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
// Table: profiles
//   id: uuid (not null)
//   name: text (nullable)
//   email: text (nullable)
//   role: text (nullable, default: 'client'::text)
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())
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
// Table: study_notes
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   title: text (not null)
//   content: text (not null)
//   tags: _text (not null, default: '{}'::text[])
//   created_at: timestamp with time zone (not null, default: now())
//   updated_at: timestamp with time zone (not null, default: now())

// --- CONSTRAINTS ---
// Table: diets
//   FOREIGN KEY diets_client_id_fkey: FOREIGN KEY (client_id) REFERENCES profiles(id) ON DELETE CASCADE
//   PRIMARY KEY diets_pkey: PRIMARY KEY (id)
//   FOREIGN KEY diets_professional_id_fkey: FOREIGN KEY (professional_id) REFERENCES profiles(id)
// Table: food_items
//   PRIMARY KEY food_items_pkey: PRIMARY KEY (id)
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
// Table: profiles
//   FOREIGN KEY profiles_id_fkey: FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY profiles_pkey: PRIMARY KEY (id)
// Table: study_decks
//   PRIMARY KEY study_decks_pkey: PRIMARY KEY (id)
//   FOREIGN KEY study_decks_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
// Table: study_flashcards
//   FOREIGN KEY study_flashcards_deck_id_fkey: FOREIGN KEY (deck_id) REFERENCES study_decks(id) ON DELETE CASCADE
//   PRIMARY KEY study_flashcards_pkey: PRIMARY KEY (id)
// Table: study_notes
//   PRIMARY KEY study_notes_pkey: PRIMARY KEY (id)
//   FOREIGN KEY study_notes_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE

// --- ROW LEVEL SECURITY POLICIES ---
// Table: diets
//   Policy "Clients can read own diets" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (client_id = auth.uid())
//   Policy "Professionals can manage created diets" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (professional_id = auth.uid())
//     WITH CHECK: (professional_id = auth.uid())
// Table: food_items
//   Policy "Authenticated users can select food items" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Food items are viewable by everyone" (SELECT, PERMISSIVE) roles={public}
//     USING: true
//   Policy "Professionals can manage food items" (ALL, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1    FROM profiles   WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'professional'::text))))
// Table: meal_items
//   Policy "Clients can read own meal items" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM (meals      JOIN diets ON ((diets.id = meals.diet_id)))   WHERE ((meals.id = meal_items.meal_id) AND (diets.client_id = auth.uid()))))
//   Policy "Professionals can manage own meal items" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM (meals      JOIN diets ON ((diets.id = meals.diet_id)))   WHERE ((meals.id = meal_items.meal_id) AND (diets.professional_id = auth.uid()))))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM (meals      JOIN diets ON ((diets.id = meals.diet_id)))   WHERE ((meals.id = meal_items.meal_id) AND (diets.professional_id = auth.uid()))))
// Table: meals
//   Policy "Clients can read own meals" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM diets   WHERE ((diets.id = meals.diet_id) AND (diets.client_id = auth.uid()))))
//   Policy "Professionals can manage own meals" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM diets   WHERE ((diets.id = meals.diet_id) AND (diets.professional_id = auth.uid()))))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM diets   WHERE ((diets.id = meals.diet_id) AND (diets.professional_id = auth.uid()))))
// Table: note_links
//   Policy "Users can manage own note links" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM study_notes   WHERE ((study_notes.id = note_links.source_note_id) AND (study_notes.user_id = auth.uid()))))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM study_notes   WHERE ((study_notes.id = note_links.source_note_id) AND (study_notes.user_id = auth.uid()))))
// Table: profiles
//   Policy "Public profiles are viewable by everyone." (SELECT, PERMISSIVE) roles={public}
//     USING: true
//   Policy "Users can insert their own profile." (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: (auth.uid() = id)
//   Policy "Users can update own profile." (UPDATE, PERMISSIVE) roles={public}
//     USING: (auth.uid() = id)
// Table: study_decks
//   Policy "Users can manage own study decks" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//     WITH CHECK: (user_id = auth.uid())
// Table: study_flashcards
//   Policy "Users can manage own study flashcards" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (EXISTS ( SELECT 1    FROM study_decks   WHERE ((study_decks.id = study_flashcards.deck_id) AND (study_decks.user_id = auth.uid()))))
//     WITH CHECK: (EXISTS ( SELECT 1    FROM study_decks   WHERE ((study_decks.id = study_flashcards.deck_id) AND (study_decks.user_id = auth.uid()))))
// Table: study_notes
//   Policy "Users can manage own study notes" (ALL, PERMISSIVE) roles={authenticated}
//     USING: (user_id = auth.uid())
//     WITH CHECK: (user_id = auth.uid())

// --- DATABASE FUNCTIONS ---
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
// Table: profiles
//   on_profiles_updated: CREATE TRIGGER on_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION handle_updated_at()

// --- INDEXES ---
// Table: note_links
//   CREATE UNIQUE INDEX note_links_source_note_id_target_note_id_key ON public.note_links USING btree (source_note_id, target_note_id)

