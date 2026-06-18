CREATE TABLE IF NOT EXISTS public.lab_exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    marker_name TEXT NOT NULL,
    value NUMERIC NOT NULL,
    unit TEXT NOT NULL,
    min_ref NUMERIC,
    max_ref NUMERIC,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.anamnesis_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    professional_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    fields JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.anamnesis_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    template_id UUID NOT NULL REFERENCES public.anamnesis_templates(id) ON DELETE CASCADE,
    responses JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.strength_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    exercise_name TEXT NOT NULL,
    weight_kg NUMERIC NOT NULL,
    reps INT NOT NULL,
    estimated_1rm NUMERIC,
    date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS lab_exams
ALTER TABLE public.lab_exams ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "prof_manage_lab_exams" ON public.lab_exams;
CREATE POLICY "prof_manage_lab_exams" ON public.lab_exams
    FOR ALL TO authenticated USING (professional_id = auth.uid()) WITH CHECK (professional_id = auth.uid());
DROP POLICY IF EXISTS "client_view_lab_exams" ON public.lab_exams;
CREATE POLICY "client_view_lab_exams" ON public.lab_exams
    FOR SELECT TO authenticated USING (client_id = auth.uid());

-- RLS anamnesis_templates
ALTER TABLE public.anamnesis_templates ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "prof_manage_anamnesis_templates" ON public.anamnesis_templates;
CREATE POLICY "prof_manage_anamnesis_templates" ON public.anamnesis_templates
    FOR ALL TO authenticated USING (professional_id = auth.uid()) WITH CHECK (professional_id = auth.uid());

-- RLS anamnesis_responses
ALTER TABLE public.anamnesis_responses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "prof_manage_anamnesis_responses" ON public.anamnesis_responses;
CREATE POLICY "prof_manage_anamnesis_responses" ON public.anamnesis_responses
    FOR ALL TO authenticated USING (professional_id = auth.uid()) WITH CHECK (professional_id = auth.uid());
DROP POLICY IF EXISTS "client_view_anamnesis_responses" ON public.anamnesis_responses;
CREATE POLICY "client_view_anamnesis_responses" ON public.anamnesis_responses
    FOR SELECT TO authenticated USING (client_id = auth.uid());

-- RLS strength_tests
ALTER TABLE public.strength_tests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "prof_manage_strength_tests" ON public.strength_tests;
CREATE POLICY "prof_manage_strength_tests" ON public.strength_tests
    FOR ALL TO authenticated USING (professional_id = auth.uid()) WITH CHECK (professional_id = auth.uid());
DROP POLICY IF EXISTS "client_view_strength_tests" ON public.strength_tests;
CREATE POLICY "client_view_strength_tests" ON public.strength_tests
    FOR SELECT TO authenticated USING (client_id = auth.uid());
