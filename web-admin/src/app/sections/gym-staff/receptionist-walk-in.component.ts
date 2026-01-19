import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {createClient} from '@supabase/supabase-js';
import {getSupabaseEnv} from '../../config/supabase-env';
import {AdminAuthService} from '../../auth/admin-auth.service';

@Component({
  selector: 'app-receptionist-walk-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6">
      <header class="mb-6">
        <h1 class="text-2xl font-bold mb-2">Walk-In Entry</h1>
        <p class="text-gray-600">Register new walk-in inquiries quickly.</p>
      </header>

      <div class="bg-white rounded-lg shadow p-6 max-w-lg">
        <form (ngSubmit)="onSubmit()" #form="ngForm">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              type="text" 
              [(ngModel)]="formData.name" 
              name="name" 
              required 
              class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Visitor Name"
            >
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input 
              type="tel" 
              [(ngModel)]="formData.phone" 
              name="phone" 
              required 
              class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Phone Number"
            >
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Interest</label>
            <select 
              [(ngModel)]="formData.interest" 
              name="interest" 
              class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Interest...</option>
              <option value="Weight Loss">Weight Loss</option>
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="General Fitness">General Fitness</option>
              <option value="Yoga">Yoga</option>
              <option value="CrossFit">CrossFit</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea 
              [(ngModel)]="formData.notes" 
              name="notes" 
              rows="3" 
              class="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any specific requirements or comments..."
            ></textarea>
          </div>

          <div *ngIf="message" [class]="'p-3 rounded mb-4 ' + (messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')">
            {{ message }}
          </div>

          <button 
            type="submit" 
            [disabled]="loading || !form.valid"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {{ loading ? 'Saving...' : 'Register Walk-In' }}
          </button>
        </form>
      </div>
    </div>
  `
})
export class ReceptionistWalkInComponent {
  private supabase = createClient(getSupabaseEnv().url, getSupabaseEnv().anonKey);
  private auth = inject(AdminAuthService);
  
  formData = {
    name: '',
    phone: '',
    interest: '',
    notes: ''
  };

  loading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  async onSubmit() {
    this.loading = true;
    this.message = '';

    try {
      const tenantId = this.auth.getTenantId(); // We need to expose getTenantId properly or ensure it's available
      // Note: AdminAuthService.getTenantId returns string | null.
      
      if (!tenantId) throw new Error('Tenant ID not found. Please relogin.');

      // Get current user ID for 'created_by'
      const {data: {user}} = await this.supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await this.supabase
        .from('leads')
        .insert({
          tenant_id: tenantId,
          name: this.formData.name,
          phone: this.formData.phone,
          interest: this.formData.interest,
          notes: this.formData.notes,
          status: 'new',
          created_by: user.id
        });

      if (error) throw error;

      this.message = 'Walk-in registered successfully!';
      this.messageType = 'success';
      this.formData = { name: '', phone: '', interest: '', notes: '' };
      
    } catch (err: any) {
      console.error('Error saving lead:', err);
      this.message = err.message || 'Failed to save walk-in.';
      this.messageType = 'error';
    } finally {
      this.loading = false;
    }
  }
}
