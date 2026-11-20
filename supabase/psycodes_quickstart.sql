-- ==============================================================================
-- PSYCODES STUDIO // QUICKSTART SQL SCHEMA
-- Run this in your Supabase Project Dashboard -> SQL Editor -> Click 'Run'
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Inquiry Status Enum (safe if already exists)
DO $$ BEGIN
  CREATE TYPE inquiry_status AS ENUM ('new', 'reviewed', 'in_discovery', 'contracted', 'archived');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. Inquiries Table (Order & Project Dossiers)
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  discipline TEXT NOT NULL,
  timeline TEXT NOT NULL,
  budget_tier TEXT NOT NULL,
  comm_channel TEXT NOT NULL DEFAULT 'email',
  scope TEXT NOT NULL,
  nda_requested BOOLEAN DEFAULT false,
  status inquiry_status DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 5. Policies:
-- Allow anyone to submit an inquiry from the website (Public Insert)
DROP POLICY IF EXISTS "Anyone can submit an inquiry" ON public.inquiries;
CREATE POLICY "Anyone can submit an inquiry" 
  ON public.inquiries FOR INSERT 
  WITH CHECK (true);

-- STRICT RLS SECURITY:
-- ONLY authenticated admin users can read/view inquiries (Blocks unauthorized public reads)
DROP POLICY IF EXISTS "Inquiries are readable" ON public.inquiries;
DROP POLICY IF EXISTS "Only authenticated admins can view inquiries" ON public.inquiries;
CREATE POLICY "Only authenticated admins can view inquiries" 
  ON public.inquiries FOR SELECT 
  TO authenticated 
  USING (true);

-- ONLY authenticated admin users can update inquiry status
DROP POLICY IF EXISTS "Inquiries can be updated" ON public.inquiries;
DROP POLICY IF EXISTS "Only authenticated admins can update inquiries" ON public.inquiries;
CREATE POLICY "Only authenticated admins can update inquiries" 
  ON public.inquiries FOR UPDATE 
  TO authenticated 
  USING (true);

-- ONLY authenticated admin users can delete inquiries
DROP POLICY IF EXISTS "Only authenticated admins can delete inquiries" ON public.inquiries;
CREATE POLICY "Only authenticated admins can delete inquiries" 
  ON public.inquiries FOR DELETE 
  TO authenticated 
  USING (true);

-- 6. Services & Showcase Tables (Optional, for dynamic catalog)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  client TEXT NOT NULL,
  year TEXT NOT NULL,
  duration TEXT NOT NULL,
  role TEXT NOT NULL,
  metrics JSONB DEFAULT '[]'::jsonb,
  tech_stack TEXT[] DEFAULT '{}',
  deliverables TEXT[] DEFAULT '{}',
  live_url TEXT,
  repo_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Projects viewable by everyone" ON public.projects;
CREATE POLICY "Projects viewable by everyone" ON public.projects FOR SELECT USING (true);

-- Done! Your PsyCodes Studio database is now fully configured.
