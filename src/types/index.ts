export type ProjectCategory = 
  | 'mobile' 
  | 'web' 
  | 'saas' 
  | 'ai' 
  | 'games' 
  | 'creative';

export type GameStatus = 'coming_soon' | 'in_development' | 'available';
export type ProjectStatus = 'Live System' | 'Active Beta' | 'In Production' | 'Alpha Ready' | 'Production Ready' | 'Prototyping';

export interface Project {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  description: string;
  category: ProjectCategory;
  category_label: string;
  cover_image: string;
  logo?: string;
  screenshots?: string[];
  technologies: string[];
  features?: string[];
  project_url?: string;
  play_store_url?: string;
  github_url?: string;
  status: ProjectStatus;
  featured: boolean;
  published: boolean;
  display_order: number;
  engineering_challenge?: string;
  core_architecture?: string;
  runtime_target?: string;
  state_paradigm?: string;
  storage_engine?: string;
  created_at?: string;
}

export interface Game {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  category_label: string;
  thumbnail: string;
  cover_image: string;
  game_url?: string;
  instructions?: string;
  status: GameStatus;
  status_label: string;
  published: boolean;
  featured: boolean;
  display_order: number;
  engine_spec?: string;
  runtime_target?: string;
  controller_support?: string;
  estimated_release?: string;
  tech_details?: string;
  hud_specs?: {
    drawcalls?: string;
    physics_tick?: string;
    texture_vram?: string;
  };
  features?: {
    title: string;
    description: string;
    icon?: string;
  }[];
  created_at?: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  discipline_tag: string;
  badge: string;
  category: 'ai' | 'engineering' | 'mobile' | 'game' | 'design' | 'video';
  description: string;
  icon: string;
  tech_stack: string[];
  deliverables: string[];
  features?: {
    title: string;
    description: string;
    icon: string;
  }[];
  case_anchor?: {
    label: string;
    detail: string;
  };
  reliability_metric?: {
    label: string;
    value: string;
    subtext: string;
  };
  display_order: number;
  published: boolean;
}

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  whatsapp?: string;
  company?: string;
  project_type: string;
  budget: string;
  timeline?: string;
  preferred_contact: string;
  description: string;
  nda_requested?: boolean;
  status?: 'new' | 'reviewing' | 'in_progress' | 'completed' | 'archived';
  created_at?: string;
}

export interface SiteSettings {
  contact_email: string;
  headquarters: string;
  response_sla: string;
  linkedin_url: string;
  x_url: string;
  instagram_url: string;
  play_store_url: string;
}

