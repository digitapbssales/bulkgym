# PHASE 2 — AUTH AND ACCESS CONTROL (Sub-prompt)

You are now in PHASE 2 — AUTH AND ACCESS CONTROL for the Bulk Gym WEB ADMIN PANEL.

Focus exclusively on authentication, authorization, and access control for super admins:

- Supabase Auth as the identity provider.
- Super Admin-only access to the web panel.
- Admin-only Angular route guards.
- Supabase RLS and secure API consumption.

Your goals in this phase:

1. Auth Flows and UX
   - Design the complete admin authentication experience:
     - Entry point and redirect behavior for unauthenticated users.
     - Login flow (email/password or other chosen Supabase auth modes).
     - Password reset and account recovery flows appropriate for super admins.
   - Describe error handling and UX for invalid credentials, locked accounts, and network/API failures.

2. Supabase Auth Integration
   - Define exactly which Supabase Auth capabilities are used and why.
   - Describe how auth state is:
     - Observed (listeners, hooks, or services).
     - Stored on the client (short-lived and long-lived tokens).
     - Propagated into the Angular app (guards, interceptors, state management).
   - Explain how logout, session expiry, and token refresh are handled.

3. Role and Permission Enforcement
   - Since this panel is Super Admin-only, define:
     - How Super Admin identity and permissions are modeled in Supabase (claims, tables, or metadata).
     - How to prevent any non-super-admin account from accessing any panel route or API.
   - Describe:
     - Angular route guard strategy for admin-only routes.
     - Backend authorization checks in Node.js + Express for each protected endpoint.
     - Supabase RLS policies that enforce Super Admin-only access at the data layer.

4. Secure API Consumption
   - Define how the Angular app calls backend APIs securely:
     - Use of HTTP interceptors for attaching tokens.
     - Handling of 401/403 responses and global redirect behavior.
   - Describe logging and monitoring for auth-related events (successful logins, failed attempts, suspicious activity).

5. Output Format
   - Return:
     - A detailed description of auth flows and screens.
     - A diagram or narrative of auth state flow from browser to Supabase and backend.
     - A permission and policy model summarizing how Super Admin-only enforcement works at UI, API, and DB layers.
     - A security checklist for this phase.

Do not design any non-auth business features in this phase. Stay focused on auth and access control only.

