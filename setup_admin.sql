-- 1. Ensure the user exists in Supabase Dashboard -> Authentication -> Users
--    Email: superadmin@bulkgym.com
--    (If not, create it manually or sign up)

-- 2. Run this SQL in Supabase Dashboard -> SQL Editor:

UPDATE auth.users
SET
  raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{role}',
    '"superAdmin"'
  ),
  raw_app_meta_data = jsonb_set(
    COALESCE(raw_app_meta_data, '{}'::jsonb),
    '{role}',
    '"superAdmin"'
  ),
  is_super_admin = true
WHERE email = 'superadmin@bulkgym.com';

-- Verify the update
SELECT email, raw_user_meta_data, raw_app_meta_data FROM auth.users WHERE email = 'superadmin@bulkgym.com';
