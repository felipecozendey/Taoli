-- Enable patient authorship for diets and exercise_plans

-- 1. Add created_by column to diets and exercise_plans
ALTER TABLE public.diets 
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) DEFAULT auth.uid();

ALTER TABLE public.exercise_plans 
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) DEFAULT auth.uid();

-- 2. Update RLS policies for diets to allow patient CRUD
DROP POLICY IF EXISTS "Client INSERT own diets" ON public.diets;
CREATE POLICY "Client INSERT own diets" ON public.diets
    FOR INSERT TO authenticated WITH CHECK (client_id = auth.uid() OR public.is_admin_user());

DROP POLICY IF EXISTS "Client UPDATE own diets" ON public.diets;
CREATE POLICY "Client UPDATE own diets" ON public.diets
    FOR UPDATE TO authenticated USING (client_id = auth.uid() OR public.is_admin_user()) WITH CHECK (client_id = auth.uid() OR public.is_admin_user());

DROP POLICY IF EXISTS "Client DELETE own diets" ON public.diets;
CREATE POLICY "Client DELETE own diets" ON public.diets
    FOR DELETE TO authenticated USING (client_id = auth.uid() OR public.is_admin_user());

-- 3. Update RLS policies for exercise_plans to allow patient CRUD
DROP POLICY IF EXISTS "Client INSERT own exercise_plans" ON public.exercise_plans;
CREATE POLICY "Client INSERT own exercise_plans" ON public.exercise_plans
    FOR INSERT TO authenticated WITH CHECK (client_id = auth.uid() OR public.is_admin_user());

DROP POLICY IF EXISTS "Client UPDATE own exercise_plans" ON public.exercise_plans;
CREATE POLICY "Client UPDATE own exercise_plans" ON public.exercise_plans
    FOR UPDATE TO authenticated USING (client_id = auth.uid() OR public.is_admin_user()) WITH CHECK (client_id = auth.uid() OR public.is_admin_user());

DROP POLICY IF EXISTS "Client DELETE own exercise_plans" ON public.exercise_plans;
CREATE POLICY "Client DELETE own exercise_plans" ON public.exercise_plans
    FOR DELETE TO authenticated USING (client_id = auth.uid() OR public.is_admin_user());
