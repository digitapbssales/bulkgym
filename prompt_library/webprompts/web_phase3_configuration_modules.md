# PHASE 3 — CONFIGURATION MODULES (Sub-prompt)

You are now in PHASE 3 — CONFIGURATION MODULES for the Bulk Gym WEB ADMIN PANEL.

Focus on the admin configuration capabilities listed in the master prompt:

- Membership plans and pricing.
- Trainer profiles.
- Class schedules.
- Promotions and discounts.
- Notification templates.
- Automation rules.

Your goals in this phase:

1. Configuration Information Architecture
   - Group configuration areas into logical modules or sections in the admin UI.
   - For each area (plans, trainers, schedules, promotions, notifications, automations):
     - Define the main entities and relationships.
     - Clarify how super admins navigate between them.

2. Screen and Form Design
   - For each configuration area, design:
     - List views (search, filters, pagination).
     - Detail/edit views with fields, validation rules, and helper controls.
     - Creation and duplication flows for reusable configuration (e.g., cloning a plan or automation).
   - Describe how to prevent destructive actions by mistake (confirmations, soft delete, audit trail hooks).

3. Data Model and APIs
   - For each configuration domain, outline:
     - Supabase tables, key columns, and relationships.
     - Required REST API endpoints for CRUD operations and bulk updates.
   - Describe any needed validation or business rules enforced on the backend (e.g., non-overlapping schedules, active vs archived plans).

4. Automation and Dependency Handling
   - Explain how configuration changes affect other parts of the system:
     - How changes to membership plans impact active members.
     - How class schedule updates interact with downstream booking systems (without designing the consumer flows).
     - How notification templates and automation rules are referenced by other services.
   - Define safe rollout patterns (draft vs published states, versioning where needed).

5. Output Format
   - Return:
     - A configuration module map showing all sections and screens.
     - A per-domain data model outline (tables and relationships).
     - A list of validation and business rules per configuration area.
     - A change-impact checklist super admins must understand before editing configuration.

Do not design end-user booking or workout experiences here; only admin configuration surfaces and their system impact.

