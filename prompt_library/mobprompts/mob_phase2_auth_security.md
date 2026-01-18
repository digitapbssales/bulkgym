# PHASE 2 — AUTH AND SECURITY (Sub-prompt)

You are now in PHASE 2 — AUTH AND SECURITY for the Bulk Gym MOBILE APP.

Focus exclusively on the features listed under AUTH AND SECURITY in the master prompt:

- Supabase Auth
- Email and phone login
- Secure local token storage
- Role enforcement

Your goals in this phase:

1. Auth User Experience and Flows
   - Design the complete auth-related user experience:
     - Welcome or splash and initial loading.
     - Login and signup with email and phone.
     - Password reset and phone-based verification flows.
     - Session restoration and auto-login using secure locally stored tokens.
   - Describe how error states are presented, such as invalid code, network issues, and server errors, without adding new features.

2. Supabase Auth Integration Plan
   - Define which Supabase Auth capabilities are used:
     - Email and password, magic links, or one-time passcodes for phone, and choose a minimal, coherent set.
   - Describe how auth state is:
     - Observed through listeners or subscriptions.
     - Stored using a secure storage pattern.
     - Reacted to in navigation, including redirecting to the main app versus the auth stack.

3. Role Enforcement
   - Explain how roles for Super Admin, Manager, Trainer, and Member are:
     - Obtained from Supabase using user metadata or a role table.
     - Cached locally.
     - Mapped to allowed screens and routes.
   - Provide a role enforcement strategy:
     - Use route guards, high-order components, or hooks.
     - Block and redirect users from forbidden screens.

4. Security and Offline Considerations
   - Describe:
     - How tokens and critical secrets are stored securely.
     - How to handle auth in offline scenarios using the last known session.
     - When to force logout and how to handle token expiry.

5. Output Format
   - Return:
     - A screen and flow list for auth.
     - A sequence diagram or narrative describing login, logout, and session restoration.
     - A role enforcement model showing how roles map to access.
     - A security checklist for this phase.

Do not design or describe any non-auth features in this phase.

