-- Create calculator_state table
CREATE TABLE IF NOT EXISTS public.calculator_state (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  display TEXT NOT NULL DEFAULT '0',
  previous_value TEXT,
  operation TEXT,
  waiting_for_operand BOOLEAN NOT NULL DEFAULT false,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on calculator_state
ALTER TABLE public.calculator_state ENABLE ROW LEVEL SECURITY;

-- RLS policies for calculator_state
CREATE POLICY "Calculator state is viewable by everyone" 
ON public.calculator_state FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create calculator state" 
ON public.calculator_state FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update calculator state" 
ON public.calculator_state FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete calculator state" 
ON public.calculator_state FOR DELETE 
USING (auth.role() = 'authenticated');