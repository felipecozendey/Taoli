-- Secure Diet Templates
ALTER TABLE public.diet_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diet_template_meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diet_template_items ENABLE ROW LEVEL SECURITY;

-- 1. Policies for diet_templates
DROP POLICY IF EXISTS "Profs manage own templates" ON public.diet_templates;
CREATE POLICY "Profs manage own templates" ON public.diet_templates
    FOR ALL TO authenticated USING (
        auth.uid() = professional_id OR public.is_admin_user()
    );

-- 2. Policies for diet_template_meals
DROP POLICY IF EXISTS "Profs manage own template meals" ON public.diet_template_meals;
CREATE POLICY "Profs manage own template meals" ON public.diet_template_meals
    FOR ALL TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.diet_templates 
            WHERE id = template_id AND (professional_id = auth.uid() OR public.is_admin_user())
        )
    );

-- 3. Policies for diet_template_items
DROP POLICY IF EXISTS "Profs manage own template items" ON public.diet_template_items;
CREATE POLICY "Profs manage own template items" ON public.diet_template_items
    FOR ALL TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.diet_template_meals m
            JOIN public.diet_templates t ON t.id = m.template_id
            WHERE m.id = meal_id AND (t.professional_id = auth.uid() OR public.is_admin_user())
        )
    );

-- Secure the main diets tables adding admin bypass, ensuring the system remains completely stable
DROP POLICY IF EXISTS "Professionals can manage created diets" ON public.diets;
CREATE POLICY "Professionals can manage created diets" ON public.diets
    FOR ALL TO authenticated USING (
        professional_id = auth.uid() OR public.is_admin_user()
    );

DROP POLICY IF EXISTS "Professionals can manage own meals" ON public.meals;
CREATE POLICY "Professionals can manage own meals" ON public.meals
    FOR ALL TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.diets 
            WHERE diets.id = meals.diet_id 
            AND (diets.professional_id = auth.uid() OR public.is_admin_user())
        )
    );

DROP POLICY IF EXISTS "Professionals can manage own meal items" ON public.meal_items;
CREATE POLICY "Professionals can manage own meal items" ON public.meal_items
    FOR ALL TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.meals
            JOIN public.diets ON diets.id = meals.diet_id
            WHERE meals.id = meal_items.meal_id
            AND (diets.professional_id = auth.uid() OR public.is_admin_user())
        )
    );
