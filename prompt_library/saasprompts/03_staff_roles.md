# 03 - Gym Staff Roles & Operational Workflows

Expand the Gym's operational capabilities by implementing specialized staff roles and the CRM.

## 1. Staff Roles Hierarchy
All these roles are scoped to a specific `tenant_id`.
- **Accounts**: Finance & Accounting focus.
- **Guard**: Security & Access control.
- **Trainer**: Fitness & Member guidance.
- **Receptionist**: Front desk & Walk-ins.
- **Sales/Marketing**: Lead management & Growth.

## 2. Role-Specific Dashboards/Views
Implement distinct views or permissions in the Web Admin (or Mobile App where appropriate) for each role:

### A. Accounts (Finance)
- **Access**: Web Admin.
- **Features**:
  - Full view of Gym Financials (Income, Expenses).
  - Cannot change Gym Settings or manage Gym Staff.

### B. Guard (Security)
- **Access**: Mobile App or simplified Web View.
- **Features**:
  - **Attendance**: Mark/Scan member attendance (QR code scanner).
  - **Profile**: View basic personal profile and shift roster.

### C. Trainer (Coaching)
- **Access**: Mobile App & Web Admin.
- **Features**:
  - **Public Profile**: Update bio, specialties, and photos visible to Customers.
  - **Workout/Diet Plans**: Create and share plans with assigned Students/Customers.
  - **Schedule**: View assigned classes/sessions.

### D. Receptionist (Front Desk)
- **Access**: Web Admin.
- **Features**:
  - **Walk-in Entry**: Form to quick-add data for walk-in inquiries (Name, Phone, Interest).
  - **Member Lookup**: Check active status for entry.

### E. Sales & Marketing (CRM)
- **Access**: Web Admin.
- **Features**:
  - **Inbuilt CRM**:
    - View "Walk-in" data entered by Receptionist.
    - Pipeline status (New, Contacted, Converted, Lost).
    - Send bulk notifications/promotions (Email/SMS).

## 3. End User (Student/Customer) Updates
- **Online Shop**: Members can browse and purchase items/services from *their specific gym's* shop.
- **Trainer Access**: View their Gym's trainers and assigned plans.

## 4. Output Requirements
- Define the `permissions` or `policies` for each role in Supabase.
- Create the "Walk-in" data entry form (Receptionist) and CRM Board (Sales).
- Update the Trainer Profile editor to be self-service for Trainer users.
