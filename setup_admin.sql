-- 1. Ensure the user exists in Supabase Dashboard -> Authentication -> Users
--    Email: superadmin@bulkgym.com

-- 2. Run this SQL in Supabase Dashboard -> SQL Editor:
--    This version overwrites metadata directly to avoid JSON merging issues.

UPDATE auth.users
SET
  raw_user_meta_data = '{"role": "superAdmin", "email_verified": true}',
  raw_app_meta_data = '{"role": "superAdmin", "provider": "email", "providers": ["email"]}',
  is_super_admin = true
WHERE email = 'superadmin@bulkgym.com';

-- Verify the update
SELECT email, raw_user_meta_data, raw_app_meta_data FROM auth.users WHERE email = 'superadmin@bulkgym.com';
