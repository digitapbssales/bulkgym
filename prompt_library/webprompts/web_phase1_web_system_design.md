# PHASE 1 — WEB SYSTEM DESIGN (Sub-prompt)

You are now in PHASE 1 — WEB SYSTEM DESIGN for the Bulk Gym WEB ADMIN PANEL.

Your job in this phase is to design the end-to-end web admin system while strictly following the master rules:

- This is only the WEB ADMIN PANEL for SUPER ADMINS.
- Tech stack: Angular (SPA), Supabase (Auth, DB, Storage), Node.js + Express APIs, REST.
- No member or trainer-facing workflows.
- No bookings, workouts, chat, or community features as end-user flows.
- All work here is design and architecture only, no detailed implementation steps yet.

In this phase, produce:

1. Admin Use Cases and Boundaries
   - Describe what the Bulk Gym super admin can and cannot do in this panel.
   - Map the mandatory feature areas (system control, configuration, content, analytics, monitoring) to concrete admin responsibilities.
   - Explicitly list out-of-scope items that must stay in the mobile app or consumer surfaces.

2. High-Level Architecture
   - Define the overall architecture of the web admin platform:
     - Angular app structure and how it consumes Node.js + Express APIs backed by Supabase.
     - How Supabase Auth, DB, Storage, and RLS fit into the system.
     - Separation of concerns between front-end, backend APIs, and Supabase.
   - Describe how environment configuration works for dev, staging, and production.

3. Module and Routing Structure
   - Propose a modular Angular structure:
     - Core/shared modules.
     - Feature modules for system control, configuration, content, analytics, and monitoring.
   - Define the main route tree:
     - Auth routes.
     - Layout shell and top-level sections.
     - Child routes for each feature area.
   - Explain how admin-only route guards are wired into this structure.

4. Data Domains and API Surfaces
   - Identify the main data domains the admin panel manages:
     - Membership plans and pricing.
     - Trainers and classes.
     - Promotions, discounts, and notification templates.
     - Automation rules.
     - Analytics and logs.
   - For each domain, outline:
     - Key tables or entities in Supabase.
     - Required REST API endpoints (read/write) exposed by Node.js + Express.
     - How the Angular app consumes these APIs in a secure way.

5. Security and Compliance Baseline
   - Describe:
     - How Super Admin-only access is enforced end-to-end (Auth, RLS, route guards).
     - How secrets and environment variables are managed.
     - How to protect against common web vulnerabilities (XSS, CSRF, injection) within this tech stack.

6. Output Format
   - Return:
     - A concise architecture overview (one or two paragraphs).
     - A module and route map showing how the Angular app is organized.
     - A data and API surface outline linking domains to tables and endpoints.
     - A list of explicit in-scope vs out-of-scope responsibilities for the admin panel.

Do not propose any consumer or trainer-facing features and stay strictly within the master list and tech stack.

