import { supabase, isSupabaseConfigured } from '../lib/supabase/client';
import { GAMES } from '../data/mockData';
import { Game } from '../types';

export const gameService = {
  async getAll(): Promise<Game[]> {
    if (!isSupabaseConfigured()) {
      return GAMES;
    }

    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return GAMES;
      }

      return data as unknown as Game[];
    } catch {
      return GAMES;
    }
  },

  async getBySlug(slug: string): Promise<Game | null> {
    if (!isSupabaseConfigured()) {
      return GAMES.find((g) => g.slug === slug) || null;
    }

    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        return GAMES.find((g) => g.slug === slug) || null;
      }

      return data as unknown as Game;
    } catch {
      return GAMES.find((g) => g.slug === slug) || null;
    }
  },

  async create(game: Partial<Game>): Promise<boolean> {
    if (!isSupabaseConfigured()) {
      return false;
    }
    const { error } = await supabase.from('games').insert(game as any);
    return !error;
  },

  async update(id: string, game: Partial<Game>): Promise<boolean> {
    if (!isSupabaseConfigured()) {
      return false;
    }
    const { error } = await supabase.from('games').update(game as any).eq('id', id);
    return !error;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured()) {
      return false;
    }
    const { error } = await supabase.from('games').delete().eq('id', id);
    return !error;
  }
};
export default gameService;
