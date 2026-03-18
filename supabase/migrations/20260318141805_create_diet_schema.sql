-- Create diets table
CREATE TABLE IF NOT EXISTS public.diets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES public.profiles(id),
    name TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create meals table
CREATE TABLE IF NOT EXISTS public.meals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    diet_id UUID NOT NULL REFERENCES public.diets(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    time TIME NOT NULL,
    order_index INTEGER NOT NULL
);

-- Create meal_items table
CREATE TABLE IF NOT EXISTS public.meal_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meal_id UUID NOT NULL REFERENCES public.meals(id) ON DELETE CASCADE,
    food_item_id UUID NOT NULL REFERENCES public.food_items(id),
    portion_g NUMERIC NOT NULL,
    notes TEXT
);

-- Enable RLS
ALTER TABLE public.diets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_items ENABLE ROW LEVEL SECURITY;

-- Trigger for updated_at on diets
CREATE OR REPLACE FUNCTION public.update_diets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language plpgsql;

DROP TRIGGER IF EXISTS update_diets_updated_at_trigger ON public.diets;
CREATE TRIGGER update_diets_updated_at_trigger
    BEFORE UPDATE ON public.diets
    FOR EACH ROW
    EXECUTE FUNCTION public.update_diets_updated_at();

-- RLS Policies for diets
DROP POLICY IF EXISTS "Clients can read own diets" ON public.diets;
CREATE POLICY "Clients can read own diets"
    ON public.diets
    FOR SELECT
    TO authenticated
    USING (client_id = auth.uid());

DROP POLICY IF EXISTS "Professionals can manage created diets" ON public.diets;
CREATE POLICY "Professionals can manage created diets"
    ON public.diets
    FOR ALL
    TO authenticated
    USING (professional_id = auth.uid())
    WITH CHECK (professional_id = auth.uid());

-- RLS Policies for meals
DROP POLICY IF EXISTS "Clients can read own meals" ON public.meals;
CREATE POLICY "Clients can read own meals"
    ON public.meals
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.diets 
            WHERE diets.id = meals.diet_id 
            AND diets.client_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Professionals can manage own meals" ON public.meals;
CREATE POLICY "Professionals can manage own meals"
    ON public.meals
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.diets 
            WHERE diets.id = meals.diet_id 
            AND diets.professional_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.diets 
            WHERE diets.id = meals.diet_id 
            AND diets.professional_id = auth.uid()
        )
    );

-- RLS Policies for meal_items
DROP POLICY IF EXISTS "Clients can read own meal items" ON public.meal_items;
CREATE POLICY "Clients can read own meal items"
    ON public.meal_items
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.meals
            JOIN public.diets ON diets.id = meals.diet_id
            WHERE meals.id = meal_items.meal_id
            AND diets.client_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Professionals can manage own meal items" ON public.meal_items;
CREATE POLICY "Professionals can manage own meal items"
    ON public.meal_items
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.meals
            JOIN public.diets ON diets.id = meals.diet_id
            WHERE meals.id = meal_items.meal_id
            AND diets.professional_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.meals
            JOIN public.diets ON diets.id = meals.diet_id
            WHERE meals.id = meal_items.meal_id
            AND diets.professional_id = auth.uid()
        )
    );
