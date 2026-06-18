-- Enable patients to insert/update/delete their own meals and meal_items

DROP POLICY IF EXISTS "Clients manage own meals (ALL)" ON public.meals;
CREATE POLICY "Clients manage own meals (ALL)" ON public.meals
  FOR ALL TO authenticated 
  USING (
    diet_id IN (SELECT id FROM public.diets WHERE client_id = auth.uid())
  )
  WITH CHECK (
    diet_id IN (SELECT id FROM public.diets WHERE client_id = auth.uid())
  );

DROP POLICY IF EXISTS "Clients manage own meal items (ALL)" ON public.meal_items;
CREATE POLICY "Clients manage own meal items (ALL)" ON public.meal_items
  FOR ALL TO authenticated
  USING (
    meal_id IN (
      SELECT m.id FROM public.meals m 
      JOIN public.diets d ON d.id = m.diet_id 
      WHERE d.client_id = auth.uid()
    )
  )
  WITH CHECK (
    meal_id IN (
      SELECT m.id FROM public.meals m 
      JOIN public.diets d ON d.id = m.diet_id 
      WHERE d.client_id = auth.uid()
    )
  );
