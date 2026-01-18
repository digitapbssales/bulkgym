# PHASE 7 — TESTING AND DEPLOYMENT (Sub-prompt)

You are now in PHASE 7 — TESTING AND DEPLOYMENT for the Bulk Gym WEB ADMIN PANEL.

Focus on how the web admin panel is validated and released to production:

- Testing strategy for Angular, Node.js + Express, and Supabase-integrated logic.
- CI/CD, environments, and deployment pipeline.
- Release safety and rollback.

Your goals in this phase:

1. Testing Strategy
   - Define the testing layers:
     - Unit tests for Angular components, services, and guards.
     - Unit and integration tests for Node.js + Express APIs.
     - End-to-end tests covering critical admin flows (login, configuration edits, content publishing, analytics viewing, monitoring).
   - Describe how to handle Supabase-dependent tests (mocks, test instances, seeded data).

2. Quality Gates and Automation
   - Specify:
     - What checks must run on each commit (lint, type check, unit tests).
     - What runs on merge to main or before a release (e2e tests, security checks).
   - Describe how failures block deployments and how results are surfaced to the team.

3. Environments and Deployment Pipeline
   - Define environment strategy:
     - Dev, staging, and production configurations for Angular, Node.js, and Supabase.
   - Describe the CI/CD pipeline:
     - Build, test, deploy steps for the web app and backend.
     - How environment variables and secrets are managed securely.

4. Release, Monitoring, and Rollback
   - Explain:
     - How to perform safe, incremental releases.
     - How to monitor the system immediately after a deployment using the monitoring and audit tooling designed earlier.
     - Rollback strategies if a deployment introduces problems.

5. Output Format
   - Return:
     - A testing matrix mapping features to test types.
     - A CI/CD pipeline outline (stages and checks).
     - An environment and configuration management plan.
     - A release and rollback playbook.

Do not introduce new product features; focus entirely on testing, deployment, and operational readiness for the existing web admin panel.

