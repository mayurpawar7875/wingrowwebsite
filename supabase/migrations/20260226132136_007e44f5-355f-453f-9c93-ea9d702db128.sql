
-- Create markets table
CREATE TABLE public.markets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  city TEXT NOT NULL,
  market_name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.markets ENABLE ROW LEVEL SECURITY;

-- Anyone can read active markets (public data for the dropdown)
CREATE POLICY "Anyone can read active markets"
ON public.markets FOR SELECT
USING (is_active = true);

-- Seed with existing hardcoded data
INSERT INTO public.markets (city, market_name) VALUES
('Pune','Kharadi'),('Pune','Hadapsar'),('Pune','Magarpatta'),('Pune','Ivy Estate'),('Pune','Baner'),('Pune','Wakad'),('Pune','Aundh'),
('Pune','Pimple Saudagar'),('Pune','Kalyani Nagar'),('Pune','Viman Nagar'),('Pune','Kothrud'),('Pune','Shivaji Nagar'),
('Pune','Katraj'),('Pune','Warje'),('Pune','Undri'),('Pune','Kondhwa'),('Pune','Hinjewadi'),('Pune','Pashan'),('Pune','Bavdhan'),
('Pune','Sus'),('Pune','Pimpri'),('Pune','Chinchwad'),('Pune','Nigdi'),
('Mumbai','Dombivli'),('Mumbai','Thane'),('Mumbai','Mulund'),('Mumbai','Ghatkopar'),('Mumbai','Borivali'),('Mumbai','Chembur'),('Mumbai','Andheri'),
('Mumbai','Kandivali'),('Mumbai','Malad'),('Mumbai','Goregaon'),('Mumbai','Dahisar'),('Mumbai','Mira Road'),('Mumbai','Bhandup'),('Mumbai','Vikhroli'),
('Mumbai','Powai'),('Mumbai','Kurla'),('Mumbai','Vashi'),('Mumbai','Kharghar'),('Mumbai','Panvel'),('Mumbai','Nerul'),('Mumbai','Airoli'),
('Mumbai','Sanpada'),('Mumbai','Kopar Khairane');

-- Admin password table for simple auth
CREATE TABLE public.admin_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT NOT NULL
);

ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- No public access to admin_settings
-- We'll use an edge function for admin auth

-- Insert default admin password (should be changed)
INSERT INTO public.admin_settings (setting_key, setting_value) VALUES ('admin_password', 'wingrow@admin2024');
