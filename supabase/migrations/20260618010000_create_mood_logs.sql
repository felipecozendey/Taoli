CREATE TABLE IF NOT EXISTS public.mood_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  logged_at timestamptz DEFAULT now(),
  mood text NOT NULL,
  notes text
);

ALTER TABLE public.mood_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Clients manage own mood" ON public.mood_logs;
CREATE POLICY "Clients manage own mood" ON public.mood_logs
  FOR ALL TO authenticated
  USING (client_id = auth.uid())
  WITH CHECK (client_id = auth.uid());

DROP POLICY IF EXISTS "Masters view mood" ON public.mood_logs;
CREATE POLICY "Masters view mood" ON public.mood_logs
  FOR ALL TO authenticated
  USING (is_admin_user());

DROP POLICY IF EXISTS "Professionals view mood" ON public.mood_logs;
CREATE POLICY "Professionals view mood" ON public.mood_logs
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.professional_client_links
      WHERE professional_client_links.client_id = mood_logs.client_id
      AND professional_client_links.professional_id = auth.uid()
      AND professional_client_links.status = 'active'
    )
  );
