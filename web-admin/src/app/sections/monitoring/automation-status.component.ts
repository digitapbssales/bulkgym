import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

type AutomationRunRow = {
  id: string;
  ruleName: string;
  trigger: string;
  status: 'succeeded' | 'failed';
  executedAt: string;
};

@Component({
  selector: 'app-automation-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2>Automation status</h2>
      <p>Recent runs of automation rules, including failures that need investigation.</p>
      <table>
        <thead>
          <tr>
            <th>Rule</th>
            <th>Trigger</th>
            <th>Status</th>
            <th>Executed at</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows">
            <td>{{ row.ruleName }}</td>
            <td>{{ row.trigger }}</td>
            <td>
              <span
                [class.chip-ok]="row.status === 'succeeded'"
                [class.chip-error]="row.status === 'failed'"
              >
                {{ row.status === 'succeeded' ? 'Succeeded' : 'Failed' }}
              </span>
            </td>
            <td>{{ row.executedAt }}</td>
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

      .chip-error {
        background-color: #fee2e2;
        color: #991b1b;
      }
    `,
  ],
})
export class AutomationStatusComponent {
  protected rows: AutomationRunRow[] = [
    {
      id: 'ar1',
      ruleName: 'Membership expiring in 7 days',
      trigger: 'membership_expiring',
      status: 'succeeded',
      executedAt: '2026-01-16 08:10',
    },
    {
      id: 'ar2',
      ruleName: 'Missed weekly workout target',
      trigger: 'missed_workout',
      status: 'failed',
      executedAt: '2026-01-16 07:45',
    },
  ];
}

