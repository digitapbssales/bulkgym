export interface PaymentConfig {
  id?: string;
  tenant_id: string;
  gateway_type: 'stripe' | 'easypaisa' | 'jazzcash' | 'bank_transfer';
  is_active: boolean;
  config: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}
