# PHASE 1 — MOBILE SYSTEM DESIGN (Sub-prompt)

You are now in PHASE 1 — MOBILE SYSTEM DESIGN for the Bulk Gym MOBILE APP.

Your job in this phase is to design the end-to-end mobile system while strictly following the master rules:

- This is only the MOBILE APP (React Native, iOS + Android).
- Tech stack: React Native, Supabase (Auth, DB, Storage, Realtime), Node.js + Express APIs, REST, Offline-first.
- No web admin panels, dashboards, or reporting UIs.
- No features outside the master feature list.
- All work here is design and architecture only, no detailed implementation steps yet.

In this phase, produce:

1. App Vision and Role Mapping
   - Clarify how each role uses the mobile app:
     - Super Admin (owner): what they can see and do on mobile without becoming an admin panel.
     - Manager: operations they handle on mobile (scheduling, oversight of classes and trainers, high-level monitoring).
     - Trainer: coaching, scheduling, workouts, chat, progress review.
     - Member: consumer UI for booking, workouts, progress, community, store, and related features.
   - Clearly state what is explicitly out of scope for mobile, for example deep financial reporting or complex configuration UIs reserved for web admin.

2. Information Architecture and Navigation
   - Define the primary navigation model, such as bottom tabs with stacked screens and role-aware sections.
   - Map out all major areas, only based on the master feature list:
     - Auth and onboarding
     - Home or dashboard
     - Profile and membership
     - Booking and check-in
     - Workouts and exercise library
     - Progress and challenges
     - Nutrition and macros
     - Chat and community feed
     - Live and recorded classes
     - Loyalty, referrals, and points
     - In-app store
     - Notifications and automation surfaces
     - Settings
   - For each area, list the key screens and entry points.

3. Offline-First and Data Flow Design
   - Describe the offline-first strategy:
     - Which data is cached on-device, such as profiles, workouts, schedules, and chat history.
     - How synchronization works with Supabase and REST APIs.
     - How to handle conflict resolution and stale data.
   - Define the core data domains tied to the feature list:
     - Users, roles, and profiles
     - Memberships
     - Classes and schedules
     - Bookings
     - Trainers and availability
     - Workouts and exercises
     - Progress metrics
     - Nutrition plans
     - Chat messages
     - Community posts
     - Challenges, badges, and leaderboards
     - Loyalty points and referrals
     - Orders and payments
     - Notifications and automation triggers

4. Security and Role Enforcement at App Level
   - Describe how role-based access is enforced in the mobile UI:
     - Which screens and features are visible to which roles.
     - How to prevent members from accessing manager or trainer-only flows.
   - Explain how secure local token storage and session handling integrate with navigation and offline mode.

5. Output Format
   - Return:
     - A concise system overview, one or two paragraphs.
     - A navigation map, using a structured list of tabs, sections, and screens.
     - A data model outline listing high-level entities and relationships.
     - A role-to-feature matrix showing which role uses which features on mobile.

Do not propose any new user-facing features and stay strictly within the master list and tech stack.

