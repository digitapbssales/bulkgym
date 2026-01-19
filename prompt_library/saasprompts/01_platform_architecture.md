# 01 - Multi-Tenant SaaS Architecture & Platform Admin

You are an autonomous senior software engineer transforming "Bulk Gym" from a single-tenant application into a Multi-Tenant SaaS Platform.

## 1. Core Architecture Changes
Refactor the database schema to support multi-tenancy.
- **New Table `tenants` (or `gyms`)**:
  - Columns: `id` (UUID), `name`, `slug` (unique), `status` (active/disabled), `created_at`, `subscription_plan`.
- **User Table Updates**:
  - Add `tenant_id` (UUID, foreign key to `tenants`, nullable).
  - **Constraint**: `tenant_id` is NULL for "Super Admin" (Platform Owner), but REQUIRED for all other roles (Gym Admins, Staff, Members).
- **Row Level Security (RLS)**:
  - Implement strict RLS policies in Supabase.
  - **Super Admin**: Can access ALL rows in `tenants` and ALL data globally.
  - **Tenant Users**: Can ONLY access rows where `tenant_id` matches their own.

## 2. Super Admin (Platform Owner) Dashboard
Refactor the existing Web Admin (`/app`) to be the "SaaS Control Center" for the Super Admin.

**Role & Scope**:
- The "Super Admin" is now the **Platform Owner**.
- They do NOT manage daily gym operations (classes, workouts) directly anymore.
- They manage **Tenants (Gyms)**.

**Key Features**:
1. **Tenant Management**:
   - **List View**: See all registered Gyms/Tenants.
   - **Actions**:
     - **Create New Tenant**: Form to input Gym Name, Admin Email, Initial Subscription.
     - **Enable/Disable Tenant**: A "kill switch" to block access for a non-paying or violating gym.
2. **Platform Finance**:
   - **Income View**: Dashboard showing revenue generated from Tenants (Subscription fees).
   - **Payment Collection**:
     - Integrate **Bank Alfalah (Alfa Payment Gateway)** and **Bank Transfer** options for Tenants to pay the Platform.

## 3. Output Requirements
- Provide the SQL migration scripts for `tenants` table and `users` modification.
- Update the Angular `admin-auth.service.ts` to handle the distinction between Platform Admin and Tenant Admin.
- Create the "Tenant Management" screen in the Angular Web Admin.
