-- 1. First, create the user in Supabase Dashboard -> Authentication -> Users
--    Email: superadmin@bulkgym.com
--    Password: BulkGym2024!
--    (Or sign up using the Web Admin login page once deployed)

-- 2. Run this SQL in Supabase Dashboard -> SQL Editor to grant Super Admin privileges:

UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"superAdmin"'
)
WHERE email = 'superadmin@bulkgym.com';

-- Verify the update
SELECT email, raw_user_meta_data FROM auth.users WHERE email = 'superadmin@bulkgym.com';
