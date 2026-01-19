-- 1. Create tenants table
CREATE TABLE IF NOT EXISTS public.tenants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled')),
  subscription_plan TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create profiles table (User Table Updates)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  tenant_id UUID REFERENCES public.tenants(id),
  role TEXT DEFAULT 'member', -- superAdmin, gymAdmin, trainer, member
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraint: tenant_id must be present unless role is superAdmin
  CONSTRAINT tenant_id_required_unless_superadmin 
    CHECK (role = 'superAdmin' OR tenant_id IS NOT NULL)
);

-- 3. RLS Policies

-- Enable RLS
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
DECLARE
  _role TEXT;
BEGIN
  SELECT role INTO _role FROM public.profiles WHERE id = auth.uid();
  RETURN _role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Tenants Policies
-- Super Admin can do everything
CREATE POLICY "Super Admin can do everything on tenants"
ON public.tenants
FOR ALL
USING (
  public.get_current_user_role() = 'superAdmin'
);

-- Tenant Users can view their own tenant
CREATE POLICY "Users can view their own tenant"
ON public.tenants
FOR SELECT
USING (
  id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid())
);

-- Profiles Policies
-- Super Admin can do everything
CREATE POLICY "Super Admin can do everything on profiles"
ON public.profiles
FOR ALL
USING (
  public.get_current_user_role() = 'superAdmin'
);

-- Users can view profiles in their same tenant
CREATE POLICY "Users can view profiles in same tenant"
ON public.profiles
FOR SELECT
USING (
  tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid())
);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (
  id = auth.uid()
);

-- 4. Initial Super Admin Profile Creation (if superadmin exists)
-- This attempts to backfill a profile for the existing superadmin if they exist in auth.users
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'superAdmin'
FROM auth.users
WHERE email = 'superadmin@bulkgym.com'
ON CONFLICT (id) DO UPDATE SET role = 'superAdmin';
