import {Injectable} from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {getSupabaseEnv} from '../config/supabase-env';
import {PaymentConfig} from '../models/payment-config.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private supabase: SupabaseClient;

  constructor() {
    const {url, anonKey} = getSupabaseEnv();
    this.supabase = createClient(url, anonKey);
  }

  async getPaymentConfigs(tenantId: string): Promise<PaymentConfig[]> {
    const {data, error} = await this.supabase
      .from('tenant_payment_configs')
      .select('*')
      .eq('tenant_id', tenantId);

    if (error) throw error;
    return data || [];
  }

  async upsertPaymentConfig(config: PaymentConfig): Promise<void> {
    const {error} = await this.supabase
      .from('tenant_payment_configs')
      .upsert(config);

    if (error) throw error;
  }
}
