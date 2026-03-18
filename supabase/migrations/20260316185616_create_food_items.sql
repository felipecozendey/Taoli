-- Create food_items table
CREATE TABLE IF NOT EXISTS public.food_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  calories NUMERIC NOT NULL,
  protein NUMERIC NOT NULL,
  carbs NUMERIC NOT NULL,
  fat NUMERIC NOT NULL,
  serving_size TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.food_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Food items are viewable by everyone" ON public.food_items;
CREATE POLICY "Food items are viewable by everyone" 
  ON public.food_items FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Professionals can manage food items" ON public.food_items;
CREATE POLICY "Professionals can manage food items" 
  ON public.food_items FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'professional'
    )
  );
