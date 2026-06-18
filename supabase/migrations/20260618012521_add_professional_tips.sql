-- Create professional_tips table
CREATE TABLE IF NOT EXISTS public.professional_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.professional_tips ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Prof manage own tips" ON public.professional_tips;
CREATE POLICY "Prof manage own tips"
  ON public.professional_tips
  FOR ALL
  TO authenticated
  USING (professional_id = auth.uid())
  WITH CHECK (professional_id = auth.uid());

-- Seed food items
INSERT INTO public.food_items (id, name, energy_kcal, protein_g, carbs_g, fats_g, base_qty_g, source)
VALUES
  (gen_random_uuid(), 'Arroz Branco Cozido', 130, 2.5, 28.1, 0.2, 100, 'TACO'),
  (gen_random_uuid(), 'Feijão Carioca Cozido', 76, 4.8, 13.6, 0.5, 100, 'TACO'),
  (gen_random_uuid(), 'Peito de Frango Grelhado', 165, 31, 0, 3.6, 100, 'TACO'),
  (gen_random_uuid(), 'Ovo de Galinha Cozido', 155, 13.3, 1.1, 10.6, 100, 'TACO'),
  (gen_random_uuid(), 'Banana Prata', 98, 1.3, 26, 0.1, 100, 'TACO')
ON CONFLICT DO NOTHING;

DO $$
DECLARE
  prof_id UUID;
  recipe_id UUID;
  food_banana UUID;
  food_ovo UUID;
BEGIN
  -- Select a professional
  SELECT id INTO prof_id FROM public.profiles WHERE is_nutritionist = true OR role = 'professional' LIMIT 1;
  
  -- Insert foods and get IDs
  INSERT INTO public.food_items (id, name, energy_kcal, protein_g, carbs_g, fats_g, base_qty_g, source)
  VALUES (gen_random_uuid(), 'Banana Prata (Seed)', 98, 1.3, 26, 0.1, 100, 'Seed')
  RETURNING id INTO food_banana;

  INSERT INTO public.food_items (id, name, energy_kcal, protein_g, carbs_g, fats_g, base_qty_g, source)
  VALUES (gen_random_uuid(), 'Ovo de Galinha (Seed)', 155, 13.3, 1.1, 10.6, 100, 'Seed')
  RETURNING id INTO food_ovo;

  IF prof_id IS NOT NULL THEN
    INSERT INTO public.recipes (id, professional_id, name, instructions, total_calories, total_protein, total_carbs, total_fats)
    VALUES (gen_random_uuid(), prof_id, 'Panqueca de Banana Fit', 'Amasse a banana, misture com o ovo e frite em frigideira antiaderente.', 253, 14.6, 27.1, 10.7)
    RETURNING id INTO recipe_id;

    INSERT INTO public.recipe_ingredients (recipe_id, food_item_id, amount_grams)
    VALUES 
      (recipe_id, food_banana, 100),
      (recipe_id, food_ovo, 100);
  END IF;
END $$;
