-- Enable RLS on all targeted tables to ensure safety
ALTER TABLE public.anamnesis_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strength_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_supplements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_water_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diet_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anamnesis_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_client_links ENABLE ROW LEVEL SECURITY;

-- 1. EMR & Tracking Tables
-- anamnesis_responses
DROP POLICY IF EXISTS "client_view_anamnesis_responses" ON public.anamnesis_responses;
DROP POLICY IF EXISTS "prof_manage_anamnesis_responses" ON public.anamnesis_responses;
DROP POLICY IF EXISTS "Client SELECT own anamnesis" ON public.anamnesis_responses;
DROP POLICY IF EXISTS "Client UPDATE own anamnesis" ON public.anamnesis_responses;
DROP POLICY IF EXISTS "Client INSERT own anamnesis" ON public.anamnesis_responses;
DROP POLICY IF EXISTS "Prof manage client anamnesis" ON public.anamnesis_responses;

CREATE POLICY "Client SELECT own anamnesis" ON public.anamnesis_responses FOR SELECT TO authenticated USING (client_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Client UPDATE own anamnesis" ON public.anamnesis_responses FOR UPDATE TO authenticated USING (client_id = auth.uid() OR public.is_admin_user()) WITH CHECK (client_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Client INSERT own anamnesis" ON public.anamnesis_responses FOR INSERT TO authenticated WITH CHECK (client_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Prof manage client anamnesis" ON public.anamnesis_responses FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.professional_client_links WHERE professional_id = auth.uid() AND client_id = anamnesis_responses.client_id AND status = 'active') OR public.is_admin_user()) WITH CHECK (EXISTS (SELECT 1 FROM public.professional_client_links WHERE professional_id = auth.uid() AND client_id = anamnesis_responses.client_id AND status = 'active') OR public.is_admin_user());

-- lab_exams
DROP POLICY IF EXISTS "client_view_lab_exams" ON public.lab_exams;
DROP POLICY IF EXISTS "prof_manage_lab_exams" ON public.lab_exams;
DROP POLICY IF EXISTS "Client SELECT own lab_exams" ON public.lab_exams;
DROP POLICY IF EXISTS "Client UPDATE own lab_exams" ON public.lab_exams;
DROP POLICY IF EXISTS "Prof manage client lab_exams" ON public.lab_exams;

CREATE POLICY "Client SELECT own lab_exams" ON public.lab_exams FOR SELECT TO authenticated USING (client_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Client UPDATE own lab_exams" ON public.lab_exams FOR UPDATE TO authenticated USING (client_id = auth.uid() OR public.is_admin_user()) WITH CHECK (client_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Prof manage client lab_exams" ON public.lab_exams FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.professional_client_links WHERE professional_id = auth.uid() AND client_id = lab_exams.client_id AND status = 'active') OR public.is_admin_user()) WITH CHECK (EXISTS (SELECT 1 FROM public.professional_client_links WHERE professional_id = auth.uid() AND client_id = lab_exams.client_id AND status = 'active') OR public.is_admin_user());

-- nutrition_assessments
DROP POLICY IF EXISTS "Clients view own assessments" ON public.nutrition_assessments;
DROP POLICY IF EXISTS "Masters manage assessments" ON public.nutrition_assessments;
DROP POLICY IF EXISTS "Masters view all assessments" ON public.nutrition_assessments;
DROP POLICY IF EXISTS "Professionals delete assessments" ON public.nutrition_assessments;
DROP POLICY IF EXISTS "Professionals insert assessments" ON public.nutrition_assessments;
DROP POLICY IF EXISTS "Professionals select assessments" ON public.nutrition_assessments;
DROP POLICY IF EXISTS "Professionals update assessments" ON public.nutrition_assessments;
DROP POLICY IF EXISTS "Client SELECT own nutrition_assessments" ON public.nutrition_assessments;
DROP POLICY IF EXISTS "Client UPDATE own nutrition_assessments" ON public.nutrition_assessments;
DROP POLICY IF EXISTS "Prof manage client nutrition_assessments" ON public.nutrition_assessments;

CREATE POLICY "Client SELECT own nutrition_assessments" ON public.nutrition_assessments FOR SELECT TO authenticated USING (client_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Client UPDATE own nutrition_assessments" ON public.nutrition_assessments FOR UPDATE TO authenticated USING (client_id = auth.uid() OR public.is_admin_user()) WITH CHECK (client_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Prof manage client nutrition_assessments" ON public.nutrition_assessments FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.professional_client_links WHERE professional_id = auth.uid() AND client_id = nutrition_assessments.client_id AND status = 'active') OR public.is_admin_user()) WITH CHECK (EXISTS (SELECT 1 FROM public.professional_client_links WHERE professional_id = auth.uid() AND client_id = nutrition_assessments.client_id AND status = 'active') OR public.is_admin_user());

-- strength_tests
DROP POLICY IF EXISTS "client_view_strength_tests" ON public.strength_tests;
DROP POLICY IF EXISTS "prof_manage_strength_tests" ON public.strength_tests;
DROP POLICY IF EXISTS "Client SELECT own strength_tests" ON public.strength_tests;
DROP POLICY IF EXISTS "Client UPDATE own strength_tests" ON public.strength_tests;
DROP POLICY IF EXISTS "Prof manage client strength_tests" ON public.strength_tests;

CREATE POLICY "Client SELECT own strength_tests" ON public.strength_tests FOR SELECT TO authenticated USING (client_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Client UPDATE own strength_tests" ON public.strength_tests FOR UPDATE TO authenticated USING (client_id = auth.uid() OR public.is_admin_user()) WITH CHECK (client_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Prof manage client strength_tests" ON public.strength_tests FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.professional_client_links WHERE professional_id = auth.uid() AND client_id = strength_tests.client_id AND status = 'active') OR public.is_admin_user()) WITH CHECK (EXISTS (SELECT 1 FROM public.professional_client_links WHERE professional_id = auth.uid() AND client_id = strength_tests.client_id AND status = 'active') OR public.is_admin_user());

-- diets
DROP POLICY IF EXISTS "Clients can read own diets" ON public.diets;
DROP POLICY IF EXISTS "Professionals can manage created diets" ON public.diets;
DROP POLICY IF EXISTS "Client SELECT own diets" ON public.diets;
DROP POLICY IF EXISTS "Client UPDATE own diets" ON public.diets;
DROP POLICY IF EXISTS "Prof manage client diets" ON public.diets;

CREATE POLICY "Client SELECT own diets" ON public.diets FOR SELECT TO authenticated USING (client_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Client UPDATE own diets" ON public.diets FOR UPDATE TO authenticated USING (client_id = auth.uid() OR public.is_admin_user()) WITH CHECK (client_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Prof manage client diets" ON public.diets FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.professional_client_links WHERE professional_id = auth.uid() AND client_id = diets.client_id AND status = 'active') OR public.is_admin_user()) WITH CHECK (EXISTS (SELECT 1 FROM public.professional_client_links WHERE professional_id = auth.uid() AND client_id = diets.client_id AND status = 'active') OR public.is_admin_user());

-- exercise_plans
DROP POLICY IF EXISTS "Patients can view their own exercise plans" ON public.exercise_plans;
DROP POLICY IF EXISTS "Professionals can manage own exercise plans" ON public.exercise_plans;
DROP POLICY IF EXISTS "Client SELECT own exercise_plans" ON public.exercise_plans;
DROP POLICY IF EXISTS "Client UPDATE own exercise_plans" ON public.exercise_plans;
DROP POLICY IF EXISTS "Prof manage client exercise_plans" ON public.exercise_plans;

CREATE POLICY "Client SELECT own exercise_plans" ON public.exercise_plans FOR SELECT TO authenticated USING (client_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Client UPDATE own exercise_plans" ON public.exercise_plans FOR UPDATE TO authenticated USING (client_id = auth.uid() OR public.is_admin_user()) WITH CHECK (client_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Prof manage client exercise_plans" ON public.exercise_plans FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.professional_client_links WHERE professional_id = auth.uid() AND client_id = exercise_plans.client_id AND status = 'active') OR public.is_admin_user()) WITH CHECK (EXISTS (SELECT 1 FROM public.professional_client_links WHERE professional_id = auth.uid() AND client_id = exercise_plans.client_id AND status = 'active') OR public.is_admin_user());

-- nutrition_supplements
DROP POLICY IF EXISTS "Clients view own supplements" ON public.nutrition_supplements;
DROP POLICY IF EXISTS "Masters manage supplements" ON public.nutrition_supplements;
DROP POLICY IF EXISTS "Masters view all supplements" ON public.nutrition_supplements;
DROP POLICY IF EXISTS "Professionals manage supplements" ON public.nutrition_supplements;
DROP POLICY IF EXISTS "Client SELECT own nutrition_supplements" ON public.nutrition_supplements;
DROP POLICY IF EXISTS "Client UPDATE own nutrition_supplements" ON public.nutrition_supplements;
DROP POLICY IF EXISTS "Prof manage client nutrition_supplements" ON public.nutrition_supplements;

CREATE POLICY "Client SELECT own nutrition_supplements" ON public.nutrition_supplements FOR SELECT TO authenticated USING (client_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Client UPDATE own nutrition_supplements" ON public.nutrition_supplements FOR UPDATE TO authenticated USING (client_id = auth.uid() OR public.is_admin_user()) WITH CHECK (client_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Prof manage client nutrition_supplements" ON public.nutrition_supplements FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.professional_client_links WHERE professional_id = auth.uid() AND client_id = nutrition_supplements.client_id AND status = 'active') OR public.is_admin_user()) WITH CHECK (EXISTS (SELECT 1 FROM public.professional_client_links WHERE professional_id = auth.uid() AND client_id = nutrition_supplements.client_id AND status = 'active') OR public.is_admin_user());

-- food_water_tracking
DROP POLICY IF EXISTS "Clients manage own tracking" ON public.food_water_tracking;
DROP POLICY IF EXISTS "Masters view tracking" ON public.food_water_tracking;
DROP POLICY IF EXISTS "Professionals view tracking" ON public.food_water_tracking;
DROP POLICY IF EXISTS "Client SELECT own food_water_tracking" ON public.food_water_tracking;
DROP POLICY IF EXISTS "Client UPDATE own food_water_tracking" ON public.food_water_tracking;
DROP POLICY IF EXISTS "Client INSERT own food_water_tracking" ON public.food_water_tracking;
DROP POLICY IF EXISTS "Prof manage client food_water_tracking" ON public.food_water_tracking;

CREATE POLICY "Client SELECT own food_water_tracking" ON public.food_water_tracking FOR SELECT TO authenticated USING (client_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Client UPDATE own food_water_tracking" ON public.food_water_tracking FOR UPDATE TO authenticated USING (client_id = auth.uid() OR public.is_admin_user()) WITH CHECK (client_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Client INSERT own food_water_tracking" ON public.food_water_tracking FOR INSERT TO authenticated WITH CHECK (client_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Prof manage client food_water_tracking" ON public.food_water_tracking FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.professional_client_links WHERE professional_id = auth.uid() AND client_id = food_water_tracking.client_id AND status = 'active') OR public.is_admin_user()) WITH CHECK (EXISTS (SELECT 1 FROM public.professional_client_links WHERE professional_id = auth.uid() AND client_id = food_water_tracking.client_id AND status = 'active') OR public.is_admin_user());

-- habit_logs
DROP POLICY IF EXISTS "Clients manage own habit logs" ON public.habit_logs;
DROP POLICY IF EXISTS "Master views all habit logs" ON public.habit_logs;
DROP POLICY IF EXISTS "Profs view linked habit logs" ON public.habit_logs;
DROP POLICY IF EXISTS "Client SELECT own habit_logs" ON public.habit_logs;
DROP POLICY IF EXISTS "Client UPDATE own habit_logs" ON public.habit_logs;
DROP POLICY IF EXISTS "Client INSERT own habit_logs" ON public.habit_logs;
DROP POLICY IF EXISTS "Prof manage client habit_logs" ON public.habit_logs;

CREATE POLICY "Client SELECT own habit_logs" ON public.habit_logs FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.habits h WHERE h.id = habit_logs.habit_id AND h.client_id = auth.uid()) OR public.is_admin_user());
CREATE POLICY "Client UPDATE own habit_logs" ON public.habit_logs FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM public.habits h WHERE h.id = habit_logs.habit_id AND h.client_id = auth.uid()) OR public.is_admin_user()) WITH CHECK (EXISTS (SELECT 1 FROM public.habits h WHERE h.id = habit_logs.habit_id AND h.client_id = auth.uid()) OR public.is_admin_user());
CREATE POLICY "Client INSERT own habit_logs" ON public.habit_logs FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM public.habits h WHERE h.id = habit_logs.habit_id AND h.client_id = auth.uid()) OR public.is_admin_user());
CREATE POLICY "Prof manage client habit_logs" ON public.habit_logs FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.habits h JOIN public.professional_client_links pcl ON pcl.client_id = h.client_id WHERE h.id = habit_logs.habit_id AND pcl.professional_id = auth.uid() AND pcl.status = 'active') OR public.is_admin_user()) WITH CHECK (EXISTS (SELECT 1 FROM public.habits h JOIN public.professional_client_links pcl ON pcl.client_id = h.client_id WHERE h.id = habit_logs.habit_id AND pcl.professional_id = auth.uid() AND pcl.status = 'active') OR public.is_admin_user());

-- 2. Messaging Security
DROP POLICY IF EXISTS "Users can read own messages" ON public.messages;
DROP POLICY IF EXISTS "Users can insert own messages" ON public.messages;
DROP POLICY IF EXISTS "Users can update own messages" ON public.messages;
DROP POLICY IF EXISTS "Users can insert messages if linked" ON public.messages;
DROP POLICY IF EXISTS "Users can delete own messages" ON public.messages;

CREATE POLICY "Users can read own messages" ON public.messages FOR SELECT TO authenticated USING (sender_id = auth.uid() OR receiver_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Users can update own messages" ON public.messages FOR UPDATE TO authenticated USING (sender_id = auth.uid() OR receiver_id = auth.uid() OR public.is_admin_user()) WITH CHECK (sender_id = auth.uid() OR receiver_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Users can insert messages if linked" ON public.messages FOR INSERT TO authenticated WITH CHECK (sender_id = auth.uid() AND (public.is_admin_user() OR EXISTS (SELECT 1 FROM public.professional_client_links WHERE status = 'active' AND ((professional_id = sender_id AND client_id = receiver_id) OR (professional_id = receiver_id AND client_id = sender_id)))));
CREATE POLICY "Users can delete own messages" ON public.messages FOR DELETE TO authenticated USING (sender_id = auth.uid() OR public.is_admin_user());

-- 3. Professional Asset Protection
-- recipes
DROP POLICY IF EXISTS "Clients view linked prof recipes" ON public.recipes;
DROP POLICY IF EXISTS "Master views recipes" ON public.recipes;
DROP POLICY IF EXISTS "Profs manage own recipes" ON public.recipes;
DROP POLICY IF EXISTS "Prof manage own recipes" ON public.recipes;
DROP POLICY IF EXISTS "Client view linked prof recipes" ON public.recipes;

CREATE POLICY "Prof manage own recipes" ON public.recipes FOR ALL TO authenticated USING (professional_id = auth.uid() OR public.is_admin_user()) WITH CHECK (professional_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Client view linked prof recipes" ON public.recipes FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.professional_client_links WHERE client_id = auth.uid() AND professional_id = recipes.professional_id AND status = 'active'));

-- diet_templates
DROP POLICY IF EXISTS "Profs manage own templates" ON public.diet_templates;
DROP POLICY IF EXISTS "Prof manage own diet_templates" ON public.diet_templates;
DROP POLICY IF EXISTS "Client view linked prof diet_templates" ON public.diet_templates;

CREATE POLICY "Prof manage own diet_templates" ON public.diet_templates FOR ALL TO authenticated USING (professional_id = auth.uid() OR public.is_admin_user()) WITH CHECK (professional_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Client view linked prof diet_templates" ON public.diet_templates FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.professional_client_links WHERE client_id = auth.uid() AND professional_id = diet_templates.professional_id AND status = 'active'));

-- anamnesis_templates
DROP POLICY IF EXISTS "prof_manage_anamnesis_templates" ON public.anamnesis_templates;
DROP POLICY IF EXISTS "Prof manage own anamnesis_templates" ON public.anamnesis_templates;
DROP POLICY IF EXISTS "Client view linked prof anamnesis_templates" ON public.anamnesis_templates;

CREATE POLICY "Prof manage own anamnesis_templates" ON public.anamnesis_templates FOR ALL TO authenticated USING (professional_id = auth.uid() OR public.is_admin_user()) WITH CHECK (professional_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Client view linked prof anamnesis_templates" ON public.anamnesis_templates FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.professional_client_links WHERE client_id = auth.uid() AND professional_id = anamnesis_templates.professional_id AND status = 'active'));

-- 4. Professional-Client Links Security
DROP POLICY IF EXISTS "Clients can view their own links" ON public.professional_client_links;
DROP POLICY IF EXISTS "Clients can update their own links" ON public.professional_client_links;
DROP POLICY IF EXISTS "Professionals can view their own created links" ON public.professional_client_links;
DROP POLICY IF EXISTS "Professionals can insert links" ON public.professional_client_links;
DROP POLICY IF EXISTS "Professionals can delete links" ON public.professional_client_links;
DROP POLICY IF EXISTS "Clients can insert links" ON public.professional_client_links;
DROP POLICY IF EXISTS "Masters manage professional_client_links" ON public.professional_client_links;
DROP POLICY IF EXISTS "Users view own links" ON public.professional_client_links;
DROP POLICY IF EXISTS "Professionals insert links" ON public.professional_client_links;
DROP POLICY IF EXISTS "Professionals update links" ON public.professional_client_links;
DROP POLICY IF EXISTS "Professionals delete links" ON public.professional_client_links;

CREATE POLICY "Users view own links" ON public.professional_client_links FOR SELECT TO authenticated USING (professional_id = auth.uid() OR client_id = auth.uid() OR public.is_admin_user());
CREATE POLICY "Professionals insert links" ON public.professional_client_links FOR INSERT TO authenticated WITH CHECK ((professional_id = auth.uid() AND public.is_professional_user()) OR public.is_admin_user());
CREATE POLICY "Professionals update links" ON public.professional_client_links FOR UPDATE TO authenticated USING ((professional_id = auth.uid() AND public.is_professional_user()) OR public.is_admin_user()) WITH CHECK ((professional_id = auth.uid() AND public.is_professional_user()) OR public.is_admin_user());
CREATE POLICY "Professionals delete links" ON public.professional_client_links FOR DELETE TO authenticated USING ((professional_id = auth.uid() AND public.is_professional_user()) OR public.is_admin_user());
