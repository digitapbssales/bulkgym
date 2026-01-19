import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {createClient} from '@supabase/supabase-js';
import {getSupabaseEnv} from '../../config/supabase-env';

type BillingPeriod = 'monthly' | 'yearly';

type MembershipPlan = {
  id: string;
  name: string;
  billingPeriod: BillingPeriod;
  price: number;
  isActive: boolean;
};

type MembershipPlanRow = {
  id: string;
  name: string;
  billing_period: string | null;
  price: number | null;
  status: string | null;
};

const {url, anonKey} = getSupabaseEnv();
const supabase = createClient(url, anonKey);

@Component({
  selector: 'app-membership-plans',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section>
      <h2>Membership plans and pricing</h2>
      <p>
        Configure the plans members can purchase, including billing cadence and active status.
      </p>

      <div class="toolbar">
        <label>
          Filter plans
          <input [(ngModel)]="filter" placeholder="Search by name" />
        </label>
      </div>

      <p *ngIf="loading">Loading plans…</p>
      <p *ngIf="!loading && error" class="error">{{ error }}</p>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Billing</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let plan of filteredPlans">
            <td>{{ plan.name }}</td>
            <td>{{ plan.billingPeriod }}</td>
            <td>{{ plan.price | currency: 'USD' }}</td>
            <td>
              <span [class.chip-active]="plan.isActive" [class.chip-inactive]="!plan.isActive">
                {{ plan.isActive ? 'Active' : 'Archived' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  styles: [
    `
      section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .toolbar {
        display: flex;
        justify-content: flex-start;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        padding: 0.5rem 0.75rem;
        border-bottom: 1px solid #e5e7eb;
        text-align: left;
      }

      th {
        font-weight: 600;
      }

      .chip-active,
      .chip-inactive {
        display: inline-flex;
        align-items: center;
        padding: 0.125rem 0.5rem;
        border-radius: 999px;
        font-size: 0.75rem;
      }

      .chip-active {
        background-color: #dcfce7;
        color: #166534;
      }

      .chip-inactive {
        background-color: #fee2e2;
        color: #991b1b;
      }

      .error {
        color: #b91c1c;
        font-size: 0.875rem;
      }
    `,
  ],
})
export class MembershipPlansComponent implements OnInit {
  protected filter = '';

  protected loading = false;
  protected error: string | null = null;
  protected plans: MembershipPlan[] = [];

  ngOnInit() {
    this.loadPlans();
  }

  async loadPlans() {
    this.loading = true;
    this.error = null;
    const {data, error} = await supabase
      .from('membership_plans')
      .select('id,name,billing_period,price,status')
      .order('name', {ascending: true});

    if (error) {
      this.loading = false;
      this.error = 'Unable to load membership plans.';
      return;
    }

    const rows = (data ?? []) as MembershipPlanRow[];
    this.plans = rows.map(row => ({
      id: row.id,
      name: row.name,
      billingPeriod: row.billing_period === 'yearly' ? 'yearly' : 'monthly',
      price: row.price ?? 0,
      isActive: row.status === 'active',
    }));
    this.loading = false;
  }

  get filteredPlans(): MembershipPlan[] {
    const term = this.filter.toLowerCase().trim();
    if (!term) {
      return this.plans;
    }
    return this.plans.filter(plan => plan.name.toLowerCase().includes(term));
  }
}
