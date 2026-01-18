# Bulk Gym Super Admin Accounts and Dashboard

This document defines Super Admin identities for the Bulk Gym WEB ADMIN PANEL, along with how the
dashboard, features, forms, and modules are organized once a Super Admin signs in.

These credentials are for non-production and testing environments only. Do not reuse them in any
live environment or share them outside your development team.

==================================================
SUPER ADMIN ACCOUNTS (NON-PRODUCTION)
==================================================

All Super Admin accounts are modeled in Supabase Auth with metadata `role = 'superAdmin'`.

1) Primary Owner Super Admin
   - Purpose: Overall platform ownership and strategic configuration.
   - Email: owner.superadmin@bulkgym.local
   - Password: Owner!BulkGym123

2) Operations Super Admin
   - Purpose: Day-to-day management of membership plans, trainers, and schedules.
   - Email: ops.superadmin@bulkgym.local
   - Password: Ops!BulkGym123

3) Finance & Analytics Super Admin
   - Purpose: Revenue reporting, membership analytics, and payment monitoring.
   - Email: finance.superadmin@bulkgym.local
   - Password: Finance!BulkGym123

4) Content Super Admin
   - Purpose: Workout, nutrition, and video content management.
   - Email: content.superadmin@bulkgym.local
   - Password: Content!BulkGym123

All of these users:

- Must exist as Supabase users in the relevant environment.
- Should have `role = 'superAdmin'` set either in `user_metadata` or `app_metadata` so that the
  web admin panel can enforce Super Admin-only access.

==================================================
SEEDING SUPER ADMIN ACCOUNTS IN SUPABASE
==================================================

You can seed these accounts either via the Supabase dashboard UI or with SQL. Use only in
development and staging projects.

Option A — Using the Supabase dashboard:

- In your Supabase project, open Authentication → Users.
- For each Super Admin:
  - Click “Add user”.
  - Enter the email from the list above.
  - Set a temporary password matching the value above.
  - Ensure “Auto-confirm user” is enabled so you can log in immediately.
  - After creation, open the user details and set `role = "superAdmin"` in either:
    - `user_metadata`, or
    - `app_metadata`.
- Save changes for each user.

Option B — Using SQL (PostgREST):

- Run SQL from the Supabase SQL editor that inserts rows into `auth.users` using the Supabase
  admin functions, then update `raw_user_meta_data` or `raw_app_meta_data` to include
  `"role": "superAdmin"`.
- Always perform this only in non-production environments and rotate credentials frequently.

==================================================
SUPER ADMIN LOGIN PAGE
==================================================

Entry route:

- `/auth/login`

Behavior:

- Unauthenticated users navigating to `/app/**` are redirected to `/auth/login`.
- On successful login:
  - If the user is a Super Admin, they are redirected to `/app`.
  - If the user is not a Super Admin, they are signed out and shown an appropriate error.

Login form:

- Title: “Bulk Gym Super Admin”
- Subtitle: “Super admin access only. Changes here affect the live member experience.”
- Fields:
  - Email (required, valid email).
  - Password (required).
- Button:
  - Label: “Sign in”.
  - Disabled while the form is invalid or a request is in flight.
- Errors:
  - Invalid credentials or connectivity issues.
  - “This account does not have Super Admin access.” when role checks fail.

==================================================
POST-LOGIN DASHBOARD AND NAVIGATION
==================================================

After a Super Admin logs in, they are redirected to `/app`. All admin features must be accessible
from this area, grouped under a single layout and navigation shell.

Top-level navigation sections:

1. System
2. Configuration
3. Content
4. Analytics
5. Monitoring

Each section has:

- An overview page.
- Links into more detailed feature views.
- Contextual help where appropriate to explain impact on the mobile experience.

==================================================
OVERVIEW DASHBOARD
==================================================

Landing view for `/app`:

- Name: “Super Admin Overview”.
- Contains:
  - Quick metrics:
    - Active members, new sign-ups last 30 days, monthly churn.
    - Overall class occupancy, app engagement index.
  - Quick links:
    - “Manage membership plans”.
    - “Review trainer profiles”.
    - “Open revenue dashboard”.
    - “Check automation status”.

==================================================
SECTION LAYOUTS UNDER SUPER ADMIN LOGIN
==================================================

1) System
   - System control overview (current platform health summary).
   - Identity and access (read-only view of Super Admin accounts).
   - Global settings (branding, locations, time zones).

2) Configuration
   - Membership plans & pricing.
   - Trainer profiles.
   - Class schedules.
   - Promotions & discounts.
   - Notification templates.
   - Automation rules.

3) Content
   - Workout templates.
   - Nutrition plans.
   - Video library.
   - Live class setup.

4) Analytics
   - Overview analytics dashboard.
   - Revenue analytics.
   - Membership analytics.
   - Attendance trends.
   - Trainer performance.
   - Engagement metrics.

5) Monitoring
   - Audit log views.
   - Payment monitoring.
   - Automation status.
   - Error and activity logs.

==================================================
ROUTING UNDER SUPER ADMIN LOGIN
==================================================

All routes live under `/app` and use Angular route guards to enforce Super Admin-only access.

Examples:

- `/auth/login` — Super Admin login page.
- `/app/system` — System control overview.
- `/app/configuration` — Configuration overview.
- `/app/configuration/membership-plans` — Membership plans module.
- `/app/configuration/trainers` — Trainer profiles module.
- `/app/configuration/class-schedules` — Class schedules module.
- `/app/configuration/promotions` — Promotions & discounts module.
- `/app/configuration/notification-templates` — Notification templates module.
- `/app/configuration/automation-rules` — Automation rules module.
- `/app/content` — Content overview.
- `/app/analytics` — Analytics overview dashboards.
- `/app/monitoring` — Monitoring and audit overview.

All of the above routes are available only after successful Super Admin login and are not visible
to non-admin or anonymous users.
