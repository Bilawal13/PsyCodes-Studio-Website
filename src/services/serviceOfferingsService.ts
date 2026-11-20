import { supabase, isSupabaseConfigured } from '../lib/supabase/client';
import { SERVICES } from '../data/mockData';
import { Service } from '../types';

export const serviceOfferingsService = {
  async getAll(): Promise<Service[]> {
    if (!isSupabaseConfigured()) {
      return SERVICES;
    }

    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return SERVICES;
      }

      return data as unknown as Service[];
    } catch {
      return SERVICES;
    }
  },

  async create(service: Partial<Service>): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('services').insert(service as any);
    return !error;
  },

  async update(id: string, service: Partial<Service>): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('services').update(service as any).eq('id', id);
    return !error;
  },

  async delete(id: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('services').delete().eq('id', id);
    return !error;
  }
};
export default serviceOfferingsService;
