import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {createClient} from '@supabase/supabase-js';
import {getSupabaseEnv} from '../../config/supabase-env';

const {url, anonKey} = getSupabaseEnv();
const supabase = createClient(url, anonKey);

interface Tenant {
  id: string;
  name: string;
  slug: string;
  status: 'active' | 'disabled';
  subscription_plan: string;
  created_at: string;
}

@Component({
  selector: 'app-tenant-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section>
      <h2>Tenant Management</h2>
      <p>Manage Gyms/Tenants on the platform.</p>

      <div class="toolbar">
        <button class="btn-primary" (click)="showCreateForm = true">Create New Tenant</button>
      </div>

      <!-- Create Form -->
      <div *ngIf="showCreateForm" class="modal-overlay">
        <div class="modal-content">
          <h3>Create New Tenant</h3>
          <form (ngSubmit)="createTenant()">
            <label>
              Gym Name
              <input [(ngModel)]="newTenant.name" name="name" required placeholder="e.g. Iron Paradise" />
            </label>
            <label>
              Slug (URL)
              <input [(ngModel)]="newTenant.slug" name="slug" required placeholder="e.g. iron-paradise" />
            </label>
            <label>
              Admin Email
              <input [(ngModel)]="newTenant.adminEmail" name="adminEmail" required type="email" />
            </label>
            <label>
              Subscription Plan
              <select [(ngModel)]="newTenant.subscription_plan" name="subscription_plan">
                <option value="basic">Basic</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </label>
            
            <div class="actions">
                <button type="button" class="btn-secondary" (click)="showCreateForm = false">Cancel</button>
                <button type="submit" class="btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Plan</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let tenant of tenants">
            <td>{{ tenant.name }}</td>
            <td>{{ tenant.slug }}</td>
            <td>
              <span [class.chip-active]="tenant.status === 'active'" [class.chip-inactive]="tenant.status === 'disabled'">
                {{ tenant.status | titlecase }}
              </span>
            </td>
            <td>{{ tenant.subscription_plan | titlecase }}</td>
            <td>{{ tenant.created_at | date }}</td>
            <td>
              <button class="btn-small" *ngIf="tenant.status === 'active'" (click)="toggleStatus(tenant, 'disabled')">Disable</button>
              <button class="btn-small" *ngIf="tenant.status === 'disabled'" (click)="toggleStatus(tenant, 'active')">Enable</button>
            </td>
          </tr>
          <tr *ngIf="tenants.length === 0">
            <td colspan="6" class="empty-state">No tenants found.</td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  styles: [`
    section { padding: 1rem; }
    .toolbar { margin-bottom: 1rem; }
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
    .modal-content { background: white; padding: 2rem; border-radius: 8px; width: 400px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    
    label { display: block; margin-bottom: 1rem; font-weight: 500; }
    input, select { width: 100%; padding: 0.5rem; margin-top: 0.25rem; border: 1px solid #ccc; border-radius: 4px; }
    
    .actions { margin-top: 1.5rem; display: flex; justify-content: flex-end; gap: 0.5rem; }
    
    .data-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    .data-table th, .data-table td { text-align: left; padding: 0.75rem; border-bottom: 1px solid #eee; }
    .data-table th { background-color: #f9fafb; font-weight: 600; }
    
    .chip-active { background: #dcfce7; color: #166534; padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.875rem; }
    .chip-inactive { background: #fee2e2; color: #991b1b; padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.875rem; }
    
    .btn-primary { background: #2563eb; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }
    .btn-secondary { background: #f3f4f6; color: #374151; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }
    .btn-small { padding: 0.25rem 0.5rem; font-size: 0.875rem; cursor: pointer; border: 1px solid #ccc; background: white; border-radius: 4px; }
    
    .empty-state { text-align: center; color: #6b7280; padding: 2rem; }
  `]
})
export class TenantManagementComponent implements OnInit {
  tenants: Tenant[] = [];
  showCreateForm = false;
  newTenant = {
    name: '',
    slug: '',
    adminEmail: '',
    subscription_plan: 'basic'
  };

  async ngOnInit() {
    await this.loadTenants();
  }

  async loadTenants() {
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error loading tenants:', error);
    } else {
      this.tenants = data || [];
    }
  }

  async createTenant() {
    // 1. Create Tenant
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .insert({
        name: this.newTenant.name,
        slug: this.newTenant.slug,
        subscription_plan: this.newTenant.subscription_plan,
        status: 'active'
      })
      .select()
      .single();

    if (tenantError) {
        alert('Error creating tenant: ' + tenantError.message);
        return;
    }

    // 2. Note about Admin User
    alert(`Tenant "${tenant.name}" created successfully!\n\nPlease manually invite ${this.newTenant.adminEmail} or use the Admin API to create their account and link it to Tenant ID: ${tenant.id}`);
    
    this.showCreateForm = false;
    this.newTenant = { name: '', slug: '', adminEmail: '', subscription_plan: 'basic' }; // Reset
    this.loadTenants();
  }

  async toggleStatus(tenant: Tenant, status: 'active' | 'disabled') {
    if (!confirm(`Are you sure you want to ${status} this tenant?`)) return;

    const { error } = await supabase
      .from('tenants')
      .update({ status })
      .eq('id', tenant.id);

    if (error) alert('Error updating status: ' + error.message);
    else this.loadTenants();
  }
}
