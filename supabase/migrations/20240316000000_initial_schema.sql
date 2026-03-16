-- Create Custom Role Enum
CREATE TYPE user_role AS ENUM ('ADMIN', 'PROFESSIONAL', 'CLIENT');

-- 1. Profiles Table
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'CLIENT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Professionals Data Table
CREATE TABLE professionals_data (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    specialty TEXT,
    bio TEXT,
    document_number TEXT
);

-- 3. Professional-Client Links Table
CREATE TABLE professional_client_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    professional_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive')),
    manages_nutrition BOOLEAN NOT NULL DEFAULT false,
    manages_training BOOLEAN NOT NULL DEFAULT false,
    manages_mind BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(professional_id, client_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE professionals_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_client_links ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Client Access: Clients can only read their own profile records.
CREATE POLICY "Clients can read own profile records" 
    ON profiles 
    FOR SELECT 
    USING (auth.uid() = id);

-- Professional Access: Professionals can read the profile records of Clients only if a record exists in professional_client_links connecting them.
CREATE POLICY "Professionals can read the profile records of linked clients" 
    ON profiles 
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 
            FROM professional_client_links 
            WHERE professional_client_links.professional_id = auth.uid() 
            AND professional_client_links.client_id = profiles.id
        )
    );
