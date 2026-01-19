import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {createClient} from '@supabase/supabase-js';
import {getSupabaseEnv} from '../../config/supabase-env';
import {AdminAuthService} from '../../auth/admin-auth.service';

interface Lead {
  id: string;
  name: string;
  phone: string;
  interest: string;
  status: 'new' | 'contacted' | 'converted' | 'lost';
  notes: string;
  created_at: string;
}

@Component({
  selector: 'app-sales-crm',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 h-full flex flex-col">
      <header class="mb-6 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold mb-2">Sales CRM</h1>
          <p class="text-gray-600">Manage leads and track conversions.</p>
        </div>
        <button (click)="loadLeads()" class="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
          Refresh
        </button>
      </header>

      <div class="flex-1 overflow-x-auto">
        <div class="flex gap-4 min-w-max h-full">
          <!-- Column: New -->
          <div class="w-80 bg-gray-50 rounded-lg p-4 flex flex-col">
            <h3 class="font-bold text-gray-700 mb-4 flex justify-between">
              New <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{{ getLeadsByStatus('new').length }}</span>
            </h3>
            <div class="flex-1 overflow-y-auto space-y-3">
              <div *ngFor="let lead of getLeadsByStatus('new')" class="bg-white p-3 rounded shadow-sm border border-gray-200">
                <div class="font-semibold">{{ lead.name }}</div>
                <div class="text-sm text-gray-500">{{ lead.interest }}</div>
                <div class="text-xs text-gray-400 mt-1">{{ lead.created_at | date:'short' }}</div>
                <div class="mt-3 flex gap-2">
                  <button (click)="updateStatus(lead, 'contacted')" class="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100">Contact</button>
                  <button (click)="updateStatus(lead, 'lost')" class="text-xs bg-red-50 text-red-600 px-2 py-1 rounded hover:bg-red-100">Lost</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Column: Contacted -->
          <div class="w-80 bg-gray-50 rounded-lg p-4 flex flex-col">
            <h3 class="font-bold text-gray-700 mb-4 flex justify-between">
              Contacted <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">{{ getLeadsByStatus('contacted').length }}</span>
            </h3>
            <div class="flex-1 overflow-y-auto space-y-3">
              <div *ngFor="let lead of getLeadsByStatus('contacted')" class="bg-white p-3 rounded shadow-sm border border-gray-200">
                <div class="font-semibold">{{ lead.name }}</div>
                <div class="text-sm text-gray-500">{{ lead.phone }}</div>
                <div class="text-sm text-gray-600 mt-1">{{ lead.notes }}</div>
                <div class="mt-3 flex gap-2">
                  <button (click)="updateStatus(lead, 'converted')" class="text-xs bg-green-50 text-green-600 px-2 py-1 rounded hover:bg-green-100">Convert</button>
                  <button (click)="updateStatus(lead, 'lost')" class="text-xs bg-red-50 text-red-600 px-2 py-1 rounded hover:bg-red-100">Lost</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Column: Converted -->
          <div class="w-80 bg-gray-50 rounded-lg p-4 flex flex-col">
            <h3 class="font-bold text-gray-700 mb-4 flex justify-between">
              Converted <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{{ getLeadsByStatus('converted').length }}</span>
            </h3>
            <div class="flex-1 overflow-y-auto space-y-3">
              <div *ngFor="let lead of getLeadsByStatus('converted')" class="bg-white p-3 rounded shadow-sm border border-green-200 bg-green-50/50">
                <div class="font-semibold text-green-900">{{ lead.name }}</div>
                <div class="text-sm text-green-700">Member</div>
                <div class="text-xs text-green-600 mt-1">Won on {{ lead.created_at | date:'shortDate' }}</div> <!-- Placeholder for updated_at if needed -->
              </div>
            </div>
          </div>

          <!-- Column: Lost -->
          <div class="w-80 bg-gray-50 rounded-lg p-4 flex flex-col">
            <h3 class="font-bold text-gray-700 mb-4 flex justify-between">
              Lost <span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">{{ getLeadsByStatus('lost').length }}</span>
            </h3>
            <div class="flex-1 overflow-y-auto space-y-3">
              <div *ngFor="let lead of getLeadsByStatus('lost')" class="bg-white p-3 rounded shadow-sm border border-gray-200 opacity-75">
                <div class="font-semibold text-gray-500">{{ lead.name }}</div>
                <div class="text-sm text-gray-400">{{ lead.interest }}</div>
                 <div class="mt-2">
                  <button (click)="updateStatus(lead, 'new')" class="text-xs text-gray-400 hover:text-gray-600 underline">Reopen</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `
})
export class SalesCrmComponent implements OnInit {
  private supabase = createClient(getSupabaseEnv().url, getSupabaseEnv().anonKey);
  private auth = inject(AdminAuthService);
  
  leads: Lead[] = [];
  loading = false;

  ngOnInit() {
    this.loadLeads();
  }

  async loadLeads() {
    this.loading = true;
    const tenantId = this.auth.getTenantId();
    if (!tenantId) return;

    const { data, error } = await this.supabase
      .from('leads')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading leads:', error);
    } else {
      this.leads = data || [];
    }
    this.loading = false;
  }

  getLeadsByStatus(status: string) {
    return this.leads.filter(l => l.status === status);
  }

  async updateStatus(lead: Lead, newStatus: 'new' | 'contacted' | 'converted' | 'lost') {
    const previousStatus = lead.status;
    // Optimistic update
    lead.status = newStatus;

    const { error } = await this.supabase
      .from('leads')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', lead.id);

    if (error) {
      console.error('Error updating status:', error);
      lead.status = previousStatus; // Revert
      alert('Failed to update status');
    }
  }
}
