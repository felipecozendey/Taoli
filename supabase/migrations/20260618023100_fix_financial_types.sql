DO $$
BEGIN
  ALTER TABLE public.financial_transactions 
    ALTER COLUMN amount TYPE NUMERIC(10,2) USING amount::NUMERIC(10,2);
  
  ALTER TABLE public.service_plans 
    ALTER COLUMN price TYPE NUMERIC(10,2) USING price::NUMERIC(10,2);
END $$;
