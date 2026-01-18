# PHASE 5 — ANALYTICS AND REPORTING (Sub-prompt)

You are now in PHASE 5 — ANALYTICS AND REPORTING for the Bulk Gym WEB ADMIN PANEL.

Focus on admin analytics and reporting capabilities:

- Revenue reports.
- Membership analytics.
- Attendance trends.
- Trainer performance.
- App engagement metrics.

Your goals in this phase:

1. Analytics Use Cases and Questions
   - For each analytics area, define the key questions a Bulk Gym super admin must answer.
   - Map each question to specific metrics, dimensions, and filters.

2. Dashboards and Report Layouts
   - Design dashboard(s) and reports:
     - The main overview dashboard for high-level KPIs.
     - Dedicated views for revenue, membership, attendance, trainer performance, and engagement.
   - For each, specify:
     - Charts and visualizations.
     - Filters (time range, location, membership type, trainer, engagement segment, etc.).
     - Table views and export options (CSV, XLSX, etc.), if any.

3. Data Sources and Modeling
   - Describe where each metric comes from:
     - Supabase tables and fields.
     - Aggregations or derived tables needed.
   - Define:
     - How data is prepared (real-time queries vs pre-aggregated views).
     - Any ETL or materialized views required.

4. Performance and Access
   - Explain:
     - How to keep dashboards fast and responsive for large datasets.
     - How to paginate and lazy-load heavy data.
     - How to ensure analytics queries respect the Super Admin-only access model.
   - Consider how to handle partial or missing data safely in the UI.

5. Output Format
   - Return:
     - A list of analytics use cases and associated metrics.
     - Wireframe-level descriptions of dashboards and reports.
     - A data modeling and sourcing plan for each metric group.
     - A performance and robustness checklist.

Do not design any consumer analytics surfaces; all analytics are for super admin use only in the web panel.

