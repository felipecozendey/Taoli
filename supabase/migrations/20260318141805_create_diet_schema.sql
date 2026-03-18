-- Create diets table
CREATE TABLE diets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES profiles(id),
    name TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create meals table
CREATE TABLE meals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    diet_id UUID NOT NULL REFERENCES diets(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    time TIME NOT NULL,
    order_index INTEGER NOT NULL
);

-- Create meal_items table
CREATE TABLE meal_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meal_id UUID NOT NULL REFERENCES meals(id) ON DELETE CASCADE,
    food_item_id UUID NOT NULL REFERENCES food_items(id),
    portion_g NUMERIC NOT NULL,
    notes TEXT
);

-- Enable RLS
ALTER TABLE diets ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_items ENABLE ROW LEVEL SECURITY;

-- Trigger for updated_at on diets
CREATE OR REPLACE FUNCTION update_diets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language plpgsql;

CREATE TRIGGER update_diets_updated_at_trigger
    BEFORE UPDATE ON diets
    FOR EACH ROW
    EXECUTE FUNCTION update_diets_updated_at();

-- RLS Policies for diets

-- Clients can read their own diets
CREATE POLICY "Clients can read own diets"
    ON diets
    FOR SELECT
    TO authenticated
    USING (client_id = auth.uid());

-- Professionals can manage diets they created
CREATE POLICY "Professionals can manage created diets"
    ON diets
    FOR ALL
    TO authenticated
    USING (professional_id = auth.uid())
    WITH CHECK (professional_id = auth.uid());

-- RLS Policies for meals

-- Clients can read meals from their diets
CREATE POLICY "Clients can read own meals"
    ON meals
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM diets 
            WHERE diets.id = meals.diet_id 
            AND diets.client_id = auth.uid()
        )
    );

-- Professionals can manage meals of diets they created
CREATE POLICY "Professionals can manage own meals"
    ON meals
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM diets 
            WHERE diets.id = meals.diet_id 
            AND diets.professional_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM diets 
            WHERE diets.id = meals.diet_id 
            AND diets.professional_id = auth.uid()
        )
    );

-- RLS Policies for meal_items

-- Clients can read meal items from their diets
CREATE POLICY "Clients can read own meal items"
    ON meal_items
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM meals
            JOIN diets ON diets.id = meals.diet_id
            WHERE meals.id = meal_items.meal_id
            AND diets.client_id = auth.uid()
        )
    );

-- Professionals can manage meal items of diets they created
CREATE POLICY "Professionals can manage own meal items"
    ON meal_items
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM meals
            JOIN diets ON diets.id = meals.diet_id
            WHERE meals.id = meal_items.meal_id
            AND diets.professional_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM meals
            JOIN diets ON diets.id = meals.diet_id
            WHERE meals.id = meal_items.meal_id
            AND diets.professional_id = auth.uid()
        )
    );
