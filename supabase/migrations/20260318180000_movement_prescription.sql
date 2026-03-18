-- Table: exercises
CREATE TABLE IF NOT EXISTS public.exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  muscle_group TEXT NOT NULL,
  video_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: exercise_plans
CREATE TABLE IF NOT EXISTS public.exercise_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES public.profiles(id),
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  plan_type TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: exercise_plan_items
CREATE TABLE IF NOT EXISTS public.exercise_plan_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES public.exercise_plans(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES public.exercises(id),
  sets INTEGER NOT NULL,
  reps TEXT NOT NULL,
  rest_seconds INTEGER,
  target_load_kg NUMERIC,
  frequency TEXT,
  pain_limit_eva INTEGER CHECK (pain_limit_eva >= 0 AND pain_limit_eva <= 10),
  notes TEXT,
  order_index INTEGER NOT NULL
);

-- Enable RLS
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_plan_items ENABLE ROW LEVEL SECURITY;

-- Policies for exercises
CREATE POLICY "Authenticated users can select exercises" 
  ON public.exercises FOR SELECT 
  TO authenticated USING (true);

CREATE POLICY "Masters can manage exercises" 
  ON public.exercises FOR ALL 
  TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'master'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'master'));

-- Policies for exercise_plans
CREATE POLICY "Patients can view their own exercise plans" 
  ON public.exercise_plans FOR SELECT 
  TO authenticated USING (client_id = auth.uid());

CREATE POLICY "Professionals can manage own exercise plans" 
  ON public.exercise_plans FOR ALL 
  TO authenticated 
  USING (professional_id = auth.uid())
  WITH CHECK (professional_id = auth.uid());

-- Policies for exercise_plan_items
CREATE POLICY "Patients can view their own exercise plan items" 
  ON public.exercise_plan_items FOR SELECT 
  TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.exercise_plans 
      WHERE exercise_plans.id = exercise_plan_items.plan_id 
      AND exercise_plans.client_id = auth.uid()
    )
  );

CREATE POLICY "Professionals can manage own exercise plan items" 
  ON public.exercise_plan_items FOR ALL 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM public.exercise_plans 
      WHERE exercise_plans.id = exercise_plan_items.plan_id 
      AND exercise_plans.professional_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.exercise_plans 
      WHERE exercise_plans.id = exercise_plan_items.plan_id 
      AND exercise_plans.professional_id = auth.uid()
    )
  );

-- Trigger for updated_at
CREATE TRIGGER on_exercise_plans_updated
  BEFORE UPDATE ON public.exercise_plans
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Seed Data for Exercises
INSERT INTO public.exercises (name, category, muscle_group) VALUES
  ('Supino Reto com Barra', 'strength', 'Peito'),
  ('Desenvolvimento com Halteres', 'strength', 'Ombros'),
  ('Tríceps Pulley', 'strength', 'Tríceps'),
  ('Leg Press 45°', 'strength', 'Pernas'),
  ('Remada Curvada', 'strength', 'Costas'),
  ('Agachamento Livre', 'strength', 'Pernas'),
  ('Alongamento de Isquiotibiais', 'rehabilitation', 'Posterior de Coxa'),
  ('Caminhada Leve', 'cardio', 'Corpo Inteiro'),
  ('Elevação Pélvica', 'strength', 'Glúteos'),
  ('Mobilidade de Tornozelo', 'mobility', 'Tornozelo'),
  ('Manguito Rotador Interno', 'rehabilitation', 'Ombro'),
  ('Manguito Rotador Externo', 'rehabilitation', 'Ombro');
