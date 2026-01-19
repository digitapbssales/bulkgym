-- Create tenant_payment_configs table
CREATE TABLE IF NOT EXISTS public.tenant_payment_configs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  gateway_type TEXT NOT NULL CHECK (gateway_type IN ('stripe', 'easypaisa', 'jazzcash', 'bank_transfer')),
  is_active BOOLEAN DEFAULT false,
  config JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(tenant_id, gateway_type)
);

-- Enable RLS
ALTER TABLE public.tenant_payment_configs ENABLE ROW LEVEL SECURITY;

-- Policies

-- Super Admin can do everything
CREATE POLICY "Super Admin can do everything on tenant_payment_configs"
ON public.tenant_payment_configs
FOR ALL
USING (
  public.get_current_user_role() = 'superAdmin'
);

-- Gym Admin can view and update their own payment configs
CREATE POLICY "Gym Admin can view own payment configs"
ON public.tenant_payment_configs
FOR SELECT
USING (
  tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "Gym Admin can update own payment configs"
ON public.tenant_payment_configs
FOR UPDATE
USING (
  tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "Gym Admin can insert own payment configs"
ON public.tenant_payment_configs
FOR INSERT
WITH CHECK (
  tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid())
);
