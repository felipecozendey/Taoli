-- Adiciona política RLS para permitir que administradores atualizem perfis de outros usuários
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$;

DROP POLICY IF EXISTS "Masters can update any profile" ON public.profiles;

CREATE POLICY "Masters can update any profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());
