DO $$
DECLARE
  admin_user_id uuid := gen_random_uuid();
  prof_user_id uuid := gen_random_uuid();
  client_user_id uuid := gen_random_uuid();
BEGIN
  -- 1) Admin User
  INSERT INTO auth.users (
    id, instance_id, email, encrypted_password, email_confirmed_at,
    created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
    is_super_admin, role, aud,
    confirmation_token, recovery_token, email_change_token_new,
    email_change, email_change_token_current,
    phone, phone_change, phone_change_token, reauthentication_token
  ) VALUES (
    admin_user_id,
    '00000000-0000-0000-0000-000000000000',
    'admin@system.com',
    crypt('Admin123!', gen_salt('bf')),
    NOW(), NOW(), NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{"name": "Master Admin"}',
    false, 'authenticated', 'authenticated',
    '', '', '', '', '', NULL, '', '', ''
  );
  
  INSERT INTO public.profiles (id, email, name, role) 
  VALUES (admin_user_id, 'admin@system.com', 'Master Admin', 'admin')
  ON CONFLICT (id) DO UPDATE SET role = 'admin', name = 'Master Admin';

  -- 2) Professional User
  INSERT INTO auth.users (
    id, instance_id, email, encrypted_password, email_confirmed_at,
    created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
    is_super_admin, role, aud,
    confirmation_token, recovery_token, email_change_token_new,
    email_change, email_change_token_current,
    phone, phone_change, phone_change_token, reauthentication_token
  ) VALUES (
    prof_user_id,
    '00000000-0000-0000-0000-000000000000',
    'profissional@clinica.com',
    crypt('Prof123!', gen_salt('bf')),
    NOW(), NOW(), NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{"name": "Dra. Ana Silva"}',
    false, 'authenticated', 'authenticated',
    '', '', '', '', '', NULL, '', '', ''
  );

  INSERT INTO public.profiles (id, email, name, role) 
  VALUES (prof_user_id, 'profissional@clinica.com', 'Dra. Ana Silva', 'professional')
  ON CONFLICT (id) DO UPDATE SET role = 'professional', name = 'Dra. Ana Silva';

  -- 3) Client User
  INSERT INTO auth.users (
    id, instance_id, email, encrypted_password, email_confirmed_at,
    created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
    is_super_admin, role, aud,
    confirmation_token, recovery_token, email_change_token_new,
    email_change, email_change_token_current,
    phone, phone_change, phone_change_token, reauthentication_token
  ) VALUES (
    client_user_id,
    '00000000-0000-0000-0000-000000000000',
    'cliente@email.com',
    crypt('Client123!', gen_salt('bf')),
    NOW(), NOW(), NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{"name": "Carlos Mendes"}',
    false, 'authenticated', 'authenticated',
    '', '', '', '', '', NULL, '', '', ''
  );

  INSERT INTO public.profiles (id, email, name, role) 
  VALUES (client_user_id, 'cliente@email.com', 'Carlos Mendes', 'client')
  ON CONFLICT (id) DO UPDATE SET role = 'client', name = 'Carlos Mendes';

END $$;
