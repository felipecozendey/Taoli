-- Enable patient authorship for training and mind modules

-- 1. Add created_by column to habits
ALTER TABLE public.habits 
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) DEFAULT auth.uid();

-- 2. Update RLS policies for habits to allow patient CRUD
DROP POLICY IF EXISTS "Client INSERT own habits" ON public.habits;
CREATE POLICY "Client INSERT own habits" ON public.habits
    FOR INSERT TO authenticated WITH CHECK (client_id = auth.uid() OR public.is_admin_user());

DROP POLICY IF EXISTS "Client UPDATE own habits" ON public.habits;
CREATE POLICY "Client UPDATE own habits" ON public.habits
    FOR UPDATE TO authenticated USING (client_id = auth.uid() OR public.is_admin_user()) WITH CHECK (client_id = auth.uid() OR public.is_admin_user());

DROP POLICY IF EXISTS "Client DELETE own habits" ON public.habits;
CREATE POLICY "Client DELETE own habits" ON public.habits
    FOR DELETE TO authenticated USING (client_id = auth.uid() OR public.is_admin_user());

-- 3. Ensure exercise_plans has created_by
ALTER TABLE public.exercise_plans 
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) DEFAULT auth.uid();

-- 4. Update RLS policies for exercise_plans to allow patient CRUD
DROP POLICY IF EXISTS "Client INSERT own exercise_plans" ON public.exercise_plans;
CREATE POLICY "Client INSERT own exercise_plans" ON public.exercise_plans
    FOR INSERT TO authenticated WITH CHECK (client_id = auth.uid() OR public.is_admin_user());

DROP POLICY IF EXISTS "Client UPDATE own exercise_plans" ON public.exercise_plans;
CREATE POLICY "Client UPDATE own exercise_plans" ON public.exercise_plans
    FOR UPDATE TO authenticated USING (client_id = auth.uid() OR public.is_admin_user()) WITH CHECK (client_id = auth.uid() OR public.is_admin_user());

DROP POLICY IF EXISTS "Client DELETE own exercise_plans" ON public.exercise_plans;
CREATE POLICY "Client DELETE own exercise_plans" ON public.exercise_plans
    FOR DELETE TO authenticated USING (client_id = auth.uid() OR public.is_admin_user());
