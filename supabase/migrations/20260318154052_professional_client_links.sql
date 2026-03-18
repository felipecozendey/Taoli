-- Add specialization flags to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_nutritionist BOOLEAN DEFAULT false NOT NULL,
  ADD COLUMN IF NOT EXISTS is_trainer BOOLEAN DEFAULT false NOT NULL,
  ADD COLUMN IF NOT EXISTS is_psychologist BOOLEAN DEFAULT false NOT NULL;

-- Create professional_client_links table
CREATE TABLE IF NOT EXISTS public.professional_client_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'rejected')),
  invite_code TEXT UNIQUE,
  can_view_nutrition BOOLEAN NOT NULL DEFAULT false,
  can_view_training BOOLEAN NOT NULL DEFAULT false,
  can_view_mind BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT professional_client_links_unique_connection UNIQUE(professional_id, client_id)
);

-- Apply updated_at trigger
DROP TRIGGER IF EXISTS on_professional_client_links_updated ON public.professional_client_links;
CREATE TRIGGER on_professional_client_links_updated
  BEFORE UPDATE ON public.professional_client_links
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable RLS
ALTER TABLE public.professional_client_links ENABLE ROW LEVEL SECURITY;

-- Client access policies
CREATE POLICY "Clients can view their own links"
  ON public.professional_client_links FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Clients can update their own links"
  ON public.professional_client_links FOR UPDATE
  TO authenticated
  USING (client_id = auth.uid())
  WITH CHECK (client_id = auth.uid());

-- Professional access policies
CREATE POLICY "Professionals can view their own created links"
  ON public.professional_client_links FOR SELECT
  TO authenticated
  USING (professional_id = auth.uid());

CREATE POLICY "Professionals can insert links"
  ON public.professional_client_links FOR INSERT
  TO authenticated
  WITH CHECK (professional_id = auth.uid());

CREATE POLICY "Professionals can delete links"
  ON public.professional_client_links FOR DELETE
  TO authenticated
  USING (professional_id = auth.uid());
