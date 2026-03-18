CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  target_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Masters can view all logs" ON public.audit_logs
  FOR SELECT TO authenticated
  USING (public.is_admin_user());

CREATE POLICY "Masters can insert logs" ON public.audit_logs
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin_user());
