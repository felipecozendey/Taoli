ALTER TABLE public.financial_transactions ADD COLUMN IF NOT EXISTS client_id uuid REFERENCES public.profiles(id);

DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -- Insert seed user if not exists
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'felipecozendey@gmail.com') THEN
    v_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      v_user_id, '00000000-0000-0000-0000-000000000000', 'felipecozendey@gmail.com', crypt('Skip@Pass', gen_salt('bf')), NOW(),
      NOW(), NOW(), '{"provider": "email", "providers": ["email"]}', '{"name": "Felipe Cozendey", "role": "professional"}',
      false, 'authenticated', 'authenticated', '', '', '', '', '', NULL, '', '', ''
    );

    INSERT INTO public.profiles (id, email, name, role, is_nutritionist, is_trainer)
    VALUES (v_user_id, 'felipecozendey@gmail.com', 'Felipe Cozendey', 'professional', true, true)
    ON CONFLICT (id) DO NOTHING;
  ELSE
    SELECT id INTO v_user_id FROM auth.users WHERE email = 'felipecozendey@gmail.com';
  END IF;

  -- Seed standard service plans
  IF NOT EXISTS (SELECT 1 FROM public.service_plans WHERE professional_id = v_user_id AND name = 'Consulta Avulsa') THEN
    INSERT INTO public.service_plans (professional_id, name, description, price, billing_cycle) VALUES
    (v_user_id, 'Consulta Avulsa', 'Consulta nutricional única', 200.00, 'one-off'),
    (v_user_id, 'Plano Mensal', 'Acompanhamento nutricional mensal', 150.00, 'monthly'),
    (v_user_id, 'Plano Trimestral', 'Acompanhamento nutricional trimestral', 400.00, 'quarterly'),
    (v_user_id, 'Consultoria Online', 'Treino + Nutrição (Anual)', 1200.00, 'yearly');
  END IF;

  -- Seed sample financial transactions for chart
  IF NOT EXISTS (SELECT 1 FROM public.financial_transactions WHERE professional_id = v_user_id AND description = 'Mensalidades Janeiro') THEN
    INSERT INTO public.financial_transactions (professional_id, type, amount, description, transaction_date, category, status) VALUES
    (v_user_id, 'income', 1500, 'Mensalidades Janeiro', (CURRENT_DATE - INTERVAL '5 months')::date, 'general', 'paid'),
    (v_user_id, 'income', 1800, 'Mensalidades Fevereiro', (CURRENT_DATE - INTERVAL '4 months')::date, 'general', 'paid'),
    (v_user_id, 'income', 1600, 'Mensalidades Março', (CURRENT_DATE - INTERVAL '3 months')::date, 'general', 'paid'),
    (v_user_id, 'income', 2100, 'Mensalidades Abril', (CURRENT_DATE - INTERVAL '2 months')::date, 'general', 'paid'),
    (v_user_id, 'income', 2500, 'Mensalidades Maio', (CURRENT_DATE - INTERVAL '1 month')::date, 'general', 'paid'),
    (v_user_id, 'income', 2200, 'Mensalidades Junho', CURRENT_DATE, 'general', 'paid'),
    (v_user_id, 'income', 200, 'Consulta João', CURRENT_DATE, 'general', 'pending');
  END IF;

END $$;

DROP POLICY IF EXISTS "Profs manage own plans" ON public.service_plans;
CREATE POLICY "Profs manage own plans" ON public.service_plans
  FOR ALL TO authenticated USING (professional_id = auth.uid());

DROP POLICY IF EXISTS "Clients view subscribed plans" ON public.service_plans;
CREATE POLICY "Clients view subscribed plans" ON public.service_plans
  FOR SELECT TO authenticated USING (
    id IN (SELECT plan_id FROM public.client_subscriptions WHERE client_id = auth.uid())
  );

DROP POLICY IF EXISTS "Profs manage own subscriptions" ON public.client_subscriptions;
CREATE POLICY "Profs manage own subscriptions" ON public.client_subscriptions
  FOR ALL TO authenticated USING (professional_id = auth.uid());

DROP POLICY IF EXISTS "Clients view own subscriptions" ON public.client_subscriptions;
CREATE POLICY "Clients view own subscriptions" ON public.client_subscriptions
  FOR SELECT TO authenticated USING (client_id = auth.uid());

DROP POLICY IF EXISTS "Profs manage own finances" ON public.financial_transactions;
CREATE POLICY "Profs manage own finances" ON public.financial_transactions
  FOR ALL TO authenticated USING (professional_id = auth.uid());
