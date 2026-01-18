import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

type PaymentRow = {
  id: string;
  member: string;
  amount: number;
  status: 'succeeded' | 'failed' | 'refunded' | 'disputed';
  provider: string;
};

@Component({
  selector: 'app-payment-monitoring',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2>Payment monitoring</h2>
      <p>Recent payments and issues across providers.</p>
      <table>
        <thead>
          <tr>
            <th>Member</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Provider</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows">
            <td>{{ row.member }}</td>
            <td>{{ row.amount | currency: 'USD' : 'symbol-narrow' }}</td>
            <td>
              <span
                [class.chip-ok]="row.status === 'succeeded'"
                [class.chip-warning]="row.status === 'refunded'"
                [class.chip-error]="row.status === 'failed' || row.status === 'disputed'"
              >
                {{ row.status }}
              </span>
            </td>
            <td>{{ row.provider }}</td>
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

      .chip-ok,
      .chip-warning,
      .chip-error {
        display: inline-flex;
        align-items: center;
        padding: 0.125rem 0.5rem;
        border-radius: 999px;
        font-size: 0.75rem;
      }

      .chip-ok {
        background-color: #dcfce7;
        color: #166534;
      }

      .chip-warning {
        background-color: #fef9c3;
        color: #854d0e;
      }

      .chip-error {
        background-color: #fee2e2;
        color: #991b1b;
      }
    `,
  ],
})
export class PaymentMonitoringComponent {
  protected rows: PaymentRow[] = [
    {
      id: 'pm1',
      member: 'Member 1024',
      amount: 69,
      status: 'succeeded',
      provider: 'Stripe',
    },
    {
      id: 'pm2',
      member: 'Member 2048',
      amount: 49,
      status: 'failed',
      provider: 'Stripe',
    },
    {
      id: 'pm3',
      member: 'Member 4096',
      amount: 599,
      status: 'refunded',
      provider: 'Adyen',
    },
  ];
}

