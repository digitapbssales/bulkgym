# 02 - Tenant (Gym) Admin & Payments

Continuing from the SaaS architecture, build the "Gym Admin" experience.

## 1. Gym Admin Persona
- **Role**: `admin` (scoped to a specific `tenant_id`).
- **Access**: Log into the same Web Admin portal, but see a **Gym-Specific Dashboard** instead of the Platform Dashboard.
- **Permissions**: Full control over *their* gym's data (Members, Trainers, Classes, Finance) but NO access to other gyms or Platform settings.

## 2. Gym Admin Dashboard Features
When a user with `role='admin'` and a valid `tenant_id` logs in:
1. **User Management**:
   - Create and manage users *under their tenant*: Staff (Guard, Trainer, etc.) and Members.
2. **Gym Configuration**:
   - Configure gym details, branding, and location.
3. **Gym Finance & Payments**:
   - **Income View**: See revenue from *their* members (Subscriptions, Shop Sales).
   - **Payment Gateways**:
     - Allow Gym Admin to configure *their own* payment credentials.
     - Supported Methods for Members to pay the Gym:
       - **Bank Transfer**
       - **Card Payment**
       - **Easypaisa**
       - **Jazzcash**

## 3. Technical Implementation
- **Angular Routes**:
  - Create a `/gym` module separate from the Super Admin's `/platform` module (or reuse components with strict permission checks).
- **Payment Integration**:
  - Abstract the payment service to handle multiple gateways (Easypaisa, Jazzcash, etc.) configured dynamically per Tenant.
