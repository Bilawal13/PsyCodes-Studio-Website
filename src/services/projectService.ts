import { supabase, isSupabaseConfigured } from '../lib/supabase/client';
import { PROJECTS } from '../data/mockData';
import { Project } from '../types';

export const projectService = {
  async getAll(): Promise<Project[]> {
    if (!isSupabaseConfigured()) {
      return PROJECTS;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return PROJECTS;
      }

      return data as unknown as Project[];
    } catch {
      return PROJECTS;
    }
  },

  async getBySlug(slug: string): Promise<Project | null> {
    if (!isSupabaseConfigured()) {
      return PROJECTS.find((p) => p.slug === slug) || null;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        return PROJECTS.find((p) => p.slug === slug) || null;
      }

      return data as unknown as Project;
    } catch {
      return PROJECTS.find((p) => p.slug === slug) || null;
    }
  },

  async create(project: Partial<Project>): Promise<boolean> {
    if (!isSupabaseConfigured()) {
      return false;
    }
    const { error } = await supabase.from('projects').insert(project as any);
    return !error;
  },

  async update(id: string, project: Partial<Project>): Promise<boolean> {
    if (!isSupabaseConfigured()) {
      return false;
    }
    const { error } = await supabase.from('projects').update(project as any).eq('id', id);
    return !error;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured()) {
      return false;
    }
    const { error } = await supabase.from('projects').delete().eq('id', id);
    return !error;
  }
};
export default projectService;
