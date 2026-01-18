import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

type Promotion = {
  id: string;
  code: string;
  description: string;
  discountPercent: number;
  startsOn: string;
  endsOn: string;
  isActive: boolean;
};

@Component({
  selector: 'app-promotions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section>
      <h2>Promotions and discounts</h2>
      <p>Configure promo codes and time-bound offers for memberships.</p>

      <div class="toolbar">
        <label>
          Filter promotions
          <input [(ngModel)]="filter" placeholder="Search by code" />
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Discount</th>
            <th>Window</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let promo of filteredPromotions">
            <td>{{ promo.code }}</td>
            <td>{{ promo.description }}</td>
            <td>{{ promo.discountPercent }}%</td>
            <td>{{ promo.startsOn }} → {{ promo.endsOn }}</td>
            <td>
              <span
                [class.chip-active]="promo.isActive"
                [class.chip-inactive]="!promo.isActive"
              >
                {{ promo.isActive ? 'Active' : 'Archived' }}
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
export class PromotionsComponent {
  protected filter = '';

  protected promotions: Promotion[] = [
    {
      id: 'p1',
      code: 'NEW15',
      description: '15% off first month for new members',
      discountPercent: 15,
      startsOn: '2025-01-01',
      endsOn: '2025-03-31',
      isActive: true,
    },
    {
      id: 'p2',
      code: 'SUMMER20',
      description: 'Summer challenge discount',
      discountPercent: 20,
      startsOn: '2025-06-01',
      endsOn: '2025-08-31',
      isActive: false,
    },
  ];

  get filteredPromotions(): Promotion[] {
    const term = this.filter.toLowerCase().trim();
    if (!term) {
      return this.promotions;
    }
    return this.promotions.filter(promo => promo.code.toLowerCase().includes(term));
  }
}

