
-- Create women_market_schedule table
CREATE TABLE public.women_market_schedule (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  city TEXT NOT NULL,
  date DATE NOT NULL,
  day TEXT NOT NULL,
  venue TEXT NOT NULL,
  slots_total INTEGER NOT NULL DEFAULT 40,
  slots_remaining INTEGER NOT NULL DEFAULT 40,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.women_market_schedule ENABLE ROW LEVEL SECURITY;

-- Public can read active schedules
CREATE POLICY "Anyone can read active women market schedules"
ON public.women_market_schedule
FOR SELECT
USING (is_active = true);

-- Seed existing data - Pune
INSERT INTO public.women_market_schedule (city, date, day, venue, slots_total, slots_remaining) VALUES
('Pune', '2025-10-15', 'Tuesday', 'Kharadi IT Park', 40, 28),
('Pune', '2025-10-16', 'Wednesday', 'Magarpatta City', 50, 35),
('Pune', '2025-10-17', 'Thursday', 'Baner', 45, 30),
('Pune', '2025-10-18', 'Friday', 'Kothrud', 40, 25),
('Pune', '2025-10-19', 'Saturday', 'Wakad', 50, 38),
('Pune', '2025-10-20', 'Sunday', 'Aundh', 60, 45);

-- Seed existing data - Mumbai
INSERT INTO public.women_market_schedule (city, date, day, venue, slots_total, slots_remaining) VALUES
('Mumbai', '2025-10-16', 'Wednesday', 'Andheri', 50, 32),
('Mumbai', '2025-10-17', 'Thursday', 'Thane', 45, 28),
('Mumbai', '2025-10-18', 'Friday', 'Vashi', 40, 22),
('Mumbai', '2025-10-19', 'Saturday', 'Borivali', 50, 35),
('Mumbai', '2025-10-20', 'Sunday', 'Powai', 55, 40);
