export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = 'admin' | 'editor' | 'member';
export type InquiryStatus = 'new' | 'reviewed' | 'in_discovery' | 'contracted' | 'archived';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          role: UserRole;
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          role?: UserRole;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          role?: UserRole;
          avatar_url?: string | null;
          bio?: string | null;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          tagline: string;
          description: string;
          full_story: string | null;
          category: string;
          client: string;
          year: string;
          duration: string;
          role: string;
          metrics: Json;
          tech_stack: string[];
          deliverables: string[];
          live_url: string | null;
          repo_url: string | null;
          featured: boolean;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          tagline: string;
          description: string;
          full_story?: string | null;
          category: string;
          client: string;
          year: string;
          duration: string;
          role: string;
          metrics?: Json;
          tech_stack?: string[];
          deliverables?: string[];
          live_url?: string | null;
          repo_url?: string | null;
          featured?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          tagline?: string;
          description?: string;
          full_story?: string | null;
          category?: string;
          client?: string;
          year?: string;
          duration?: string;
          role?: string;
          metrics?: Json;
          tech_stack?: string[];
          deliverables?: string[];
          live_url?: string | null;
          repo_url?: string | null;
          featured?: boolean;
          order_index?: number;
          updated_at?: string;
        };
      };
      games: {
        Row: {
          id: string;
          slug: string;
          title: string;
          genre: string;
          engine: string;
          platform: string;
          release_date: string;
          status: string;
          short_description: string;
          full_description: string;
          thumbnail_url: string | null;
          banner_url: string | null;
          playable_url: string | null;
          orientation: string;
          controls_scheme: Json;
          features: string[];
          specs: Json;
          telemetry: Json;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          genre: string;
          engine?: string;
          platform?: string;
          release_date: string;
          status?: string;
          short_description: string;
          full_description: string;
          thumbnail_url?: string | null;
          banner_url?: string | null;
          playable_url?: string | null;
          orientation?: string;
          controls_scheme?: Json;
          features?: string[];
          specs?: Json;
          telemetry?: Json;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          genre?: string;
          engine?: string;
          platform?: string;
          release_date?: string;
          status?: string;
          short_description?: string;
          full_description?: string;
          thumbnail_url?: string | null;
          banner_url?: string | null;
          playable_url?: string | null;
          orientation?: string;
          controls_scheme?: Json;
          features?: string[];
          specs?: Json;
          telemetry?: Json;
          order_index?: number;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          slug: string;
          title: string;
          short_description: string;
          full_description: string;
          icon_name: string;
          timeline_estimate: string;
          pricing_tier: string;
          deliverables: string[];
          tech_stack: string[];
          featured: boolean;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          short_description: string;
          full_description: string;
          icon_name?: string;
          timeline_estimate: string;
          pricing_tier: string;
          deliverables?: string[];
          tech_stack?: string[];
          featured?: boolean;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          short_description?: string;
          full_description?: string;
          icon_name?: string;
          timeline_estimate?: string;
          pricing_tier?: string;
          deliverables?: string[];
          tech_stack?: string[];
          featured?: boolean;
          order_index?: number;
          updated_at?: string;
        };
      };
      inquiries: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          whatsapp?: string | null;
          discipline: string;
          timeline: string;
          budget_tier: string;
          comm_channel: string;
          scope: string;
          nda_requested: boolean;
          status: InquiryStatus;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          whatsapp?: string | null;
          discipline: string;
          timeline: string;
          budget_tier: string;
          comm_channel: string;
          scope: string;
          nda_requested?: boolean;
          status?: InquiryStatus;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          whatsapp?: string | null;
          discipline?: string;
          timeline?: string;
          budget_tier?: string;
          comm_channel?: string;
          scope?: string;
          nda_requested?: boolean;
          status?: InquiryStatus;
          notes?: string | null;
          updated_at?: string;
        };
      };
      site_settings: {
        Row: {
          key: string;
          value: Json;
          description: string | null;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
          description?: string | null;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: Json;
          description?: string | null;
          updated_at?: string;
        };
      };
    };
  };
}

