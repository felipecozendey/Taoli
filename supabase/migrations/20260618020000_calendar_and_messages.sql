-- Adiciona campo de recorrência em appointments
ALTER TABLE public.appointments
  ADD COLUMN IF NOT EXISTS recurrence_rule TEXT;

-- Cria tabela de mensagens
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Configura RLS para messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can read own messages" ON public.messages;
  CREATE POLICY "Users can read own messages"
    ON public.messages FOR SELECT
    TO authenticated
    USING (sender_id = auth.uid() OR receiver_id = auth.uid());

  DROP POLICY IF EXISTS "Users can insert own messages" ON public.messages;
  CREATE POLICY "Users can insert own messages"
    ON public.messages FOR INSERT
    TO authenticated
    WITH CHECK (sender_id = auth.uid());

  DROP POLICY IF EXISTS "Users can update own messages" ON public.messages;
  CREATE POLICY "Users can update own messages"
    ON public.messages FOR UPDATE
    TO authenticated
    USING (sender_id = auth.uid() OR receiver_id = auth.uid());
END $$;
