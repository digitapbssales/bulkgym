-- 1. Grant Gym Admin control over profiles
-- This allows Gym Admins to create/update/delete staff members (Receptionist, Trainer, etc.)
CREATE POLICY "Gym Admin can do everything on profiles in same tenant"
ON public.profiles
FOR ALL
USING (
  public.get_current_user_role() = 'gymAdmin' 
  AND tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid())
);

-- 2. Create Leads (Walk-ins) table for CRM
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  interest TEXT, -- e.g., "Weight Loss", "Muscle Gain", "Yoga"
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'lost')),
  notes TEXT,
  created_by UUID REFERENCES public.profiles(id), -- Receptionist who entered the data
  assigned_to UUID REFERENCES public.profiles(id), -- Sales person handling the lead
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RLS for Leads

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Super Admin Policy
CREATE POLICY "Super Admin can do everything on leads"
ON public.leads
FOR ALL
USING (
  public.get_current_user_role() = 'superAdmin'
);

-- Gym Admin Policy
CREATE POLICY "Gym Admin can do everything on leads in same tenant"
ON public.leads
FOR ALL
USING (
  public.get_current_user_role() = 'gymAdmin'
  AND tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid())
);

-- Receptionist Policy (Insert & View own tenant's leads)
CREATE POLICY "Receptionist can insert leads"
ON public.leads
FOR INSERT
WITH CHECK (
  public.get_current_user_role() = 'receptionist'
  AND tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "Receptionist can view leads in same tenant"
ON public.leads
FOR SELECT
USING (
  public.get_current_user_role() = 'receptionist'
  AND tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid())
);

-- Sales Policy (View & Update own tenant's leads)
CREATE POLICY "Sales can view leads in same tenant"
ON public.leads
FOR SELECT
USING (
  public.get_current_user_role() IN ('sales', 'sales_marketing') -- accommodating potential variations
  AND tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "Sales can update leads in same tenant"
ON public.leads
FOR UPDATE
USING (
  public.get_current_user_role() IN ('sales', 'sales_marketing')
  AND tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid())
);

-- Trainer Policy (Maybe read-only if they need to see leads? Assuming no access for now based on prompt)

-- 4. Update Profiles RLS for specific roles if needed
-- Existing "Users can view profiles in same tenant" covers everyone viewing each other.

-- 5. Add Trainer specific fields to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS specialties TEXT[],
ADD COLUMN IF NOT EXISTS avatar_url TEXT;
