-- Create food consumption logs table
CREATE TABLE IF NOT EXISTS public.food_consumption_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  consumed_on DATE NOT NULL,
  food_name TEXT NOT NULL,
  calories NUMERIC DEFAULT 0,
  protein NUMERIC DEFAULT 0,
  carbs NUMERIC DEFAULT 0,
  fat NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create water consumption logs table
CREATE TABLE IF NOT EXISTS public.water_consumption_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  consumed_on DATE NOT NULL,
  amount_ml INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.food_consumption_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.water_consumption_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for food_consumption_logs

-- Patient Access: Allow ALL (SELECT, INSERT, UPDATE, DELETE) for own logs
CREATE POLICY "Patients can manage own food logs"
  ON public.food_consumption_logs
  FOR ALL
  TO authenticated
  USING (client_id = auth.uid())
  WITH CHECK (client_id = auth.uid());

-- Professional Access: Allow SELECT for linked active patients
CREATE POLICY "Professionals can view active patients food logs"
  ON public.food_consumption_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.professional_client_links pcl
      WHERE pcl.client_id = food_consumption_logs.client_id
        AND pcl.professional_id = auth.uid()
        AND pcl.status = 'active'
    )
  );

-- Master Access: Allow SELECT for all records if admin
CREATE POLICY "Admins can view all food logs"
  ON public.food_consumption_logs
  FOR SELECT
  TO authenticated
  USING (is_admin_user());

-- RLS Policies for water_consumption_logs

-- Patient Access: Allow ALL (SELECT, INSERT, UPDATE, DELETE) for own logs
CREATE POLICY "Patients can manage own water logs"
  ON public.water_consumption_logs
  FOR ALL
  TO authenticated
  USING (client_id = auth.uid())
  WITH CHECK (client_id = auth.uid());

-- Professional Access: Allow SELECT for linked active patients
CREATE POLICY "Professionals can view active patients water logs"
  ON public.water_consumption_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.professional_client_links pcl
      WHERE pcl.client_id = water_consumption_logs.client_id
        AND pcl.professional_id = auth.uid()
        AND pcl.status = 'active'
    )
  );

-- Master Access: Allow SELECT for all records if admin
CREATE POLICY "Admins can view all water logs"
  ON public.water_consumption_logs
  FOR SELECT
  TO authenticated
  USING (is_admin_user());
