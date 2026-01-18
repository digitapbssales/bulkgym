# PHASE 4 — CONTENT MANAGEMENT (Sub-prompt)

You are now in PHASE 4 — CONTENT MANAGEMENT for the Bulk Gym WEB ADMIN PANEL.

Focus on admin content management capabilities:

- Workout templates.
- Nutrition plans.
- Video content.
- Live class setup.

Your goals in this phase:

1. Content Taxonomy and Structure
   - Define how content is organized for admins:
     - Workout categories, programs, and individual exercises.
     - Nutrition plans, meal templates, and macro targets.
     - Video library organization (tags, difficulty, duration).
     - Live class types, time slots, and streaming configuration references.
   - Describe how this taxonomy stays consistent with mobile/consumer experiences without designing those experiences.

2. Content Authoring Workflows
   - For each content type, design:
     - Creation and editing flows (fields, rich text, media attachments).
     - Draft/publish lifecycle and versioning, if needed.
     - Localization or regionalization strategy, if applicable.
   - Describe how super admins preview content before publishing.

3. Storage, Media, and Integration
   - Explain how Supabase Storage is used for videos and media assets.
   - Describe:
     - File upload flows and validation (size, format).
     - CDN or delivery considerations for media.
     - How content metadata is stored in Supabase tables and connected to media assets.

4. Governance and Safety
   - Define rules and controls around:
     - Who can publish or unpublish content (within the Super Admin model).
     - Handling of deprecated or replaced content.
     - Ensuring references from automations, schedules, or promotions remain valid when content changes.

5. Output Format
   - Return:
     - A content model map covering all content types and relationships.
     - Authoring workflow descriptions for each content type.
     - A storage and delivery model for media assets.
     - A governance checklist for safe content changes.

Do not describe member-facing consumption flows; stay strictly on admin content creation and management.

