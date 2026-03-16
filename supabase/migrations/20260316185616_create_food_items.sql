CREATE TABLE food_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    source TEXT,
    food_group TEXT,
    base_qty_g NUMERIC DEFAULT 100,
    energy_kcal NUMERIC,
    protein_g NUMERIC,
    carbs_g NUMERIC,
    fats_g NUMERIC,
    fiber_g NUMERIC,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE food_items ENABLE ROW LEVEL SECURITY;

-- Create policy allowing all authenticated users to read food items
CREATE POLICY "Authenticated users can select food items"
    ON food_items
    FOR SELECT
    TO authenticated
    USING (true);

-- Seed initial data (TACO 4.0 reference, 100g base quantity)
INSERT INTO food_items (name, source, food_group, base_qty_g, energy_kcal, protein_g, carbs_g, fats_g, fiber_g) VALUES
('Arroz, tipo 1, cozido', 'TACO_4ed', 'Cereais e derivados', 100, 128, 2.5, 28.1, 0.2, 1.6),
('Feijão, carioca, cozido', 'TACO_4ed', 'Leguminosas e derivados', 100, 76, 4.8, 13.6, 0.5, 8.5),
('Frango, peito, sem pele, grelhado', 'TACO_4ed', 'Carnes e derivados', 100, 159, 32.0, 0, 2.5, 0),
('Ovo, de galinha, inteiro, cozido', 'TACO_4ed', 'Ovos e derivados', 100, 146, 13.3, 0.6, 9.5, 0),
('Banana, prata, crua', 'TACO_4ed', 'Frutas e derivados', 100, 89, 1.3, 22.8, 0.1, 2.0),
('Carne, bovina, patinho, sem gordura, grelhado', 'TACO_4ed', 'Carnes e derivados', 100, 219, 35.9, 0, 7.3, 0),
('Batata, doce, cozida', 'TACO_4ed', 'Raízes, tubérculos e derivados', 100, 77, 0.6, 18.4, 0.1, 2.2),
('Aveia, flocos, crua', 'TACO_4ed', 'Cereais e derivados', 100, 394, 13.9, 66.6, 8.5, 9.1),
('Pão, de trigo, francês', 'TACO_4ed', 'Cereais e derivados', 100, 300, 8.0, 58.6, 3.1, 2.3),
('Leite, de vaca, desnatado, pó', 'TACO_4ed', 'Leite e derivados', 100, 362, 34.7, 53.4, 0.9, 0),
('Pão, de forma, integral', 'TACO_4ed', 'Cereais e derivados', 100, 253, 9.4, 49.9, 3.7, 6.9),
('Maçã, Fuji, com casca, crua', 'TACO_4ed', 'Frutas e derivados', 100, 52, 0.3, 13.5, 0, 1.3),
('Mamão, Formosa, cru', 'TACO_4ed', 'Frutas e derivados', 100, 37, 0.8, 9.4, 0.1, 1.8),
('Alface, crespa, crua', 'TACO_4ed', 'Verduras, hortaliças e derivados', 100, 11, 1.3, 1.7, 0.2, 1.8),
('Tomate, com semente, cru', 'TACO_4ed', 'Verduras, hortaliças e derivados', 100, 15, 1.1, 3.1, 0.2, 1.2),
('Cebola, crua', 'TACO_4ed', 'Verduras, hortaliças e derivados', 100, 39, 1.3, 8.9, 0.1, 2.2),
('Azeite, de oliva, extra virgem', 'TACO_4ed', 'Óleos e gorduras', 100, 884, 0, 0, 100, 0),
('Manteiga, com sal', 'TACO_4ed', 'Óleos e gorduras', 100, 726, 0.4, 0.1, 82.4, 0),
('Queijo, minas, frescal', 'TACO_4ed', 'Leite e derivados', 100, 264, 17.4, 3.2, 20.2, 0),
('Iogurte, natural, desnatado', 'TACO_4ed', 'Leite e derivados', 100, 41, 3.8, 5.8, 0.3, 0);
