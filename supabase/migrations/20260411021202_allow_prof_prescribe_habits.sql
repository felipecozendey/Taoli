-- Allow professionals to insert, update and delete habits for their linked clients
DROP POLICY IF EXISTS "Profs can insert linked habits" ON public.habits;
CREATE POLICY "Profs can insert linked habits" ON public.habits
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM professional_client_links pcl 
      WHERE pcl.client_id = habits.client_id 
      AND pcl.professional_id = auth.uid()
      AND pcl.status = 'active'
    )
  );

DROP POLICY IF EXISTS "Profs can update linked habits" ON public.habits;
CREATE POLICY "Profs can update linked habits" ON public.habits
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM professional_client_links pcl 
      WHERE pcl.client_id = habits.client_id 
      AND pcl.professional_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Profs can delete linked habits" ON public.habits;
CREATE POLICY "Profs can delete linked habits" ON public.habits
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM professional_client_links pcl 
      WHERE pcl.client_id = habits.client_id 
      AND pcl.professional_id = auth.uid()
    )
  );
