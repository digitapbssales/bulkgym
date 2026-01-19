import {Injectable} from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {getSupabaseEnv} from '../config/supabase-env';

@Injectable({
  providedIn: 'root',
})
export class GymService {
  private supabase: SupabaseClient;

  constructor() {
    const {url, anonKey} = getSupabaseEnv();
    this.supabase = createClient(url, anonKey);
  }

  async getGymUsers(tenantId: string) {
    const {data, error} = await this.supabase
      .from('profiles')
      .select('*')
      .eq('tenant_id', tenantId);

    if (error) throw error;
    return data || [];
  }
}
