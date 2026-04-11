DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public) 
  VALUES ('avatars', 'avatars', true) 
  ON CONFLICT (id) DO NOTHING;
END $$;

DO $$
BEGIN
  DROP POLICY IF EXISTS "Avatar Public Access" ON storage.objects;
  DROP POLICY IF EXISTS "Avatar Upload" ON storage.objects;
  DROP POLICY IF EXISTS "Avatar Update" ON storage.objects;
  
  CREATE POLICY "Avatar Public Access" ON storage.objects 
    FOR SELECT USING (bucket_id = 'avatars');
    
  CREATE POLICY "Avatar Upload" ON storage.objects 
    FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
    
  CREATE POLICY "Avatar Update" ON storage.objects 
    FOR UPDATE USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');
END $$;
