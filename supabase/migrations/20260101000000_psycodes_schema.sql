-- ==============================================================================
-- PSYCODES STUDIO // SUPABASE POSTGRESQL PRODUCTION SCHEMA
-- Architect: Bilawal Feroze
-- Brand: PsyCodes Studio (Karachi, PK)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('admin', 'editor', 'member');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE inquiry_status AS ENUM ('new', 'reviewed', 'in_discovery', 'contracted', 'archived');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role user_role DEFAULT 'member',
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  full_story TEXT,
  category TEXT NOT NULL, -- 'AI & Automation', 'Mobile Apps', 'Unity Games', 'Web & SaaS'
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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PROJECT IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.project_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  is_cover BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. GAMES TABLE (PsyCodes Arcade)
CREATE TABLE IF NOT EXISTS public.games (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  genre TEXT NOT NULL,
  engine TEXT NOT NULL DEFAULT 'Unity 6',
  platform TEXT NOT NULL DEFAULT 'WebGL / Browser',
  release_date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'In Development',
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  thumbnail_url TEXT,
  banner_url TEXT,
  playable_url TEXT,
  orientation TEXT DEFAULT 'Landscape',
  controls_scheme JSONB DEFAULT '[]'::jsonb,
  features TEXT[] DEFAULT '{}',
  specs JSONB DEFAULT '{}'::jsonb,
  telemetry JSONB DEFAULT '{}'::jsonb,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Cpu',
  timeline_estimate TEXT NOT NULL,
  pricing_tier TEXT NOT NULL,
  deliverables TEXT[] DEFAULT '{}',
  tech_stack TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. INQUIRIES TABLE (Contact & Transmission Dossiers)
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  discipline TEXT NOT NULL,
  timeline TEXT NOT NULL,
  budget_tier TEXT NOT NULL,
  comm_channel TEXT NOT NULL,
  scope TEXT NOT NULL,
  nda_requested BOOLEAN DEFAULT false,
  status inquiry_status DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Helper functions for role checking
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES POLICIES
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- PROJECTS POLICIES
CREATE POLICY "Projects are viewable by everyone" 
  ON public.projects FOR SELECT USING (true);

CREATE POLICY "Only admins can modify projects" 
  ON public.projects FOR ALL USING (public.is_admin());

-- PROJECT IMAGES POLICIES
CREATE POLICY "Project images are viewable by everyone" 
  ON public.project_images FOR SELECT USING (true);

CREATE POLICY "Only admins can modify project images" 
  ON public.project_images FOR ALL USING (public.is_admin());

-- GAMES POLICIES
CREATE POLICY "Games are viewable by everyone" 
  ON public.games FOR SELECT USING (true);

CREATE POLICY "Only admins can modify games" 
  ON public.games FOR ALL USING (public.is_admin());

-- SERVICES POLICIES
CREATE POLICY "Services are viewable by everyone" 
  ON public.services FOR SELECT USING (true);

CREATE POLICY "Only admins can modify services" 
  ON public.services FOR ALL USING (public.is_admin());

-- INQUIRIES POLICIES
CREATE POLICY "Anyone can submit an inquiry" 
  ON public.inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view inquiries" 
  ON public.inquiries FOR SELECT USING (public.is_admin());

CREATE POLICY "Only admins can update inquiries" 
  ON public.inquiries FOR UPDATE USING (public.is_admin());

CREATE POLICY "Only admins can delete inquiries" 
  ON public.inquiries FOR DELETE USING (public.is_admin());

-- SITE SETTINGS POLICIES
CREATE POLICY "Site settings viewable by everyone" 
  ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Only admins can modify site settings" 
  ON public.site_settings FOR ALL USING (public.is_admin());

-- ==============================================================================
-- STORAGE BUCKETS CONFIGURATION
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('project-media', 'project-media', true),
  ('game-media', 'game-media', true),
  ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Project media is publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-media');

CREATE POLICY "Admins can upload project media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-media' AND (auth.role() = 'service_role' OR public.is_admin()));

CREATE POLICY "Admins can update project media"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'project-media' AND (auth.role() = 'service_role' OR public.is_admin()));

CREATE POLICY "Admins can delete project media"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'project-media' AND (auth.role() = 'service_role' OR public.is_admin()));

CREATE POLICY "Game media is publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'game-media');

CREATE POLICY "Admins can manage game media"
  ON storage.objects FOR ALL
  USING (bucket_id = 'game-media' AND (auth.role() = 'service_role' OR public.is_admin()));

