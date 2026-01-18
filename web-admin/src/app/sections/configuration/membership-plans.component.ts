import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

type BillingPeriod = 'monthly' | 'yearly';

type MembershipPlan = {
  id: string;
  name: string;
  billingPeriod: BillingPeriod;
  price: number;
  isActive: boolean;
};

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
    `,
  ],
})
export class MembershipPlansComponent {
  protected filter = '';

  protected plans: MembershipPlan[] = [
    {
      id: 'standard-monthly',
      name: 'Standard monthly',
      billingPeriod: 'monthly',
      price: 49,
      isActive: true,
    },
    {
      id: 'premium-monthly',
      name: 'Premium monthly',
      billingPeriod: 'monthly',
      price: 69,
      isActive: true,
    },
    {
      id: 'annual',
      name: 'Annual all-access',
      billingPeriod: 'yearly',
      price: 599,
      isActive: true,
    },
    {
      id: 'founders',
      name: 'Founders legacy',
      billingPeriod: 'monthly',
      price: 39,
      isActive: false,
    },
  ];

  get filteredPlans(): MembershipPlan[] {
    const term = this.filter.toLowerCase().trim();
    if (!term) {
      return this.plans;
    }
    return this.plans.filter(plan => plan.name.toLowerCase().includes(term));
  }
}

