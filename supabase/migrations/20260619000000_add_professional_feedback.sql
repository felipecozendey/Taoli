-- Add professional_feedback column to diets, exercise_plans and habits
ALTER TABLE public.diets ADD COLUMN IF NOT EXISTS professional_feedback TEXT;
ALTER TABLE public.exercise_plans ADD COLUMN IF NOT EXISTS professional_feedback TEXT;
ALTER TABLE public.habits ADD COLUMN IF NOT EXISTS professional_feedback TEXT;
