ALTER TABLE public.productivity_tasks ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}'::text[];
