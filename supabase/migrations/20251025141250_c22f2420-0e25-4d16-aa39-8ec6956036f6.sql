-- Create visitor feedback table
CREATE TABLE public.visitor_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  market_visited TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback_message TEXT NOT NULL,
  agree_to_contact BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create market invitation enquiries table
CREATE TABLE public.market_invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_person_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT NOT NULL,
  organization_name TEXT NOT NULL,
  city TEXT NOT NULL,
  venue_address TEXT NOT NULL,
  expected_footfall TEXT,
  preferred_dates TEXT NOT NULL,
  frequency TEXT NOT NULL,
  additional_notes TEXT,
  agree_to_contact BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.visitor_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_invitations ENABLE ROW LEVEL SECURITY;

-- Create policies for public insert access (forms are public)
CREATE POLICY "Anyone can submit visitor feedback" 
ON public.visitor_feedback 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can submit market invitations" 
ON public.market_invitations 
FOR INSERT 
WITH CHECK (true);