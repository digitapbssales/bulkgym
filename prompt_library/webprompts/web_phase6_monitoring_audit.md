# PHASE 6 — MONITORING AND AUDIT (Sub-prompt)

You are now in PHASE 6 — MONITORING AND AUDIT for the Bulk Gym WEB ADMIN PANEL.

Focus on operational monitoring visible to super admins:

- Audit logs.
- Payment monitoring.
- Automation status.
- Error and activity logs.

Your goals in this phase:

1. Audit Logging Model
   - Define what actions must be logged (configuration changes, content updates, auth events, etc.).
   - For each event type, specify:
     - Required fields (who, what, when, where, before/after values if applicable).
     - Retention and retrieval requirements.

2. Monitoring Screens and Workflows
   - Design admin views for:
     - Browsing and filtering audit logs.
     - Monitoring payments (success, failures, disputes).
     - Viewing automation job statuses and recent runs.
     - Reviewing error and activity logs from backend and frontend.
   - Describe the workflows for triaging and resolving issues from these screens.

3. Technical Implementation Strategy
   - Outline how logs and monitoring data are captured:
     - Supabase tables, third-party logging/monitoring tools, or both.
     - How Node.js + Express and the Angular app send structured logs.
   - Explain alerting strategies that relate to what super admins see in the panel (e.g., surfaced alerts vs background notifications).

4. Security, Privacy, and Compliance
   - Describe:
     - How to avoid logging sensitive data (passwords, full card information, secrets).
     - How access to logs is restricted to Super Admins.
     - Data retention policies and how they are enforced.

5. Output Format
   - Return:
     - An event catalog listing all audit and monitoring event types.
     - Screen and workflow descriptions for monitoring sections.
     - A technical capture and storage plan for logs.
     - A compliance and safety checklist for logging.

Do not add new business features; stay focused on observability, monitoring, and auditability of the existing system.

