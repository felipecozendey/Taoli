-- 1. Create or replace the RPC for audit logging
CREATE OR REPLACE FUNCTION public.register_audit_log(
    p_action TEXT,
    p_target_user_id UUID,
    p_details JSONB DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Ensure the user is an admin
    IF NOT public.is_admin_user() THEN
        RAISE EXCEPTION 'Access denied: User is not an admin';
    END IF;

    INSERT INTO public.audit_logs (admin_id, target_user_id, action, details)
    VALUES (auth.uid(), p_target_user_id, p_action, p_details);
END;
$$;

-- Helper function to identify professional users securely without causing infinite recursion
CREATE OR REPLACE FUNCTION public.is_professional_user()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND (is_nutritionist = true OR is_trainer = true OR is_psychologist = true)
  );
$$;

-- 2. Restrict direct client INSERTs to audit_logs
DROP POLICY IF EXISTS "Masters can insert logs" ON public.audit_logs;

-- 3. Profiles RLS Hardening
-- Drop the permissive public profiles policy at the very top, before any new policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;

-- Drop existing restrictive policies to recreate them idempotently
DROP POLICY IF EXISTS "Users can select own profile" ON public.profiles;
DROP POLICY IF EXISTS "Masters can select all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Professionals can select linked client profiles" ON public.profiles;

-- Create restrictive policies based on the Acceptance Criteria
CREATE POLICY "Users can select own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Masters can select all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (public.is_admin_user() OR role = 'master');

CREATE POLICY "Professionals can select linked client profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (
    public.is_professional_user()
    AND EXISTS (
      SELECT 1 FROM public.professional_client_links pcl
      WHERE pcl.professional_id = auth.uid()
      AND pcl.client_id = profiles.id
      AND pcl.status = 'active'
    )
  );

-- 4. Support for Secure Admin Impersonation
-- Ensure master role RLS policies are added to tables missing them so impersonation does not return 403/empty
DROP POLICY IF EXISTS "Masters can manage all productivity_tasks" ON public.productivity_tasks;
CREATE POLICY "Masters can manage all productivity_tasks" ON public.productivity_tasks FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());

DROP POLICY IF EXISTS "Masters can manage all productivity_habits" ON public.productivity_habits;
CREATE POLICY "Masters can manage all productivity_habits" ON public.productivity_habits FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());

DROP POLICY IF EXISTS "Masters can manage all productivity_habit_logs" ON public.productivity_habit_logs;
CREATE POLICY "Masters can manage all productivity_habit_logs" ON public.productivity_habit_logs FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());

DROP POLICY IF EXISTS "Masters can manage all productivity_focus_settings" ON public.productivity_focus_settings;
CREATE POLICY "Masters can manage all productivity_focus_settings" ON public.productivity_focus_settings FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());

DROP POLICY IF EXISTS "Masters can manage all study_decks" ON public.study_decks;
CREATE POLICY "Masters can manage all study_decks" ON public.study_decks FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());

DROP POLICY IF EXISTS "Masters can manage all study_flashcards" ON public.study_flashcards;
CREATE POLICY "Masters can manage all study_flashcards" ON public.study_flashcards FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());

DROP POLICY IF EXISTS "Masters can manage all study_folders" ON public.study_folders;
CREATE POLICY "Masters can manage all study_folders" ON public.study_folders FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());

DROP POLICY IF EXISTS "Masters can manage all study_notes" ON public.study_notes;
CREATE POLICY "Masters can manage all study_notes" ON public.study_notes FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());

DROP POLICY IF EXISTS "Masters can manage all note_links" ON public.note_links;
CREATE POLICY "Masters can manage all note_links" ON public.note_links FOR ALL TO authenticated USING (public.is_admin_user()) WITH CHECK (public.is_admin_user());
