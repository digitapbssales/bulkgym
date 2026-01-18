import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

type ErrorLogRow = {
  id: string;
  level: 'info' | 'warning' | 'error';
  service: string;
  message: string;
  timestamp: string;
};

@Component({
  selector: 'app-error-activity-logs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2>Error and activity logs</h2>
      <p>Aggregated view of errors and key events across services.</p>
      <table>
        <thead>
          <tr>
            <th>When</th>
            <th>Level</th>
            <th>Service</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows">
            <td>{{ row.timestamp }}</td>
            <td>
              <span
                [class.chip-info]="row.level === 'info'"
                [class.chip-warning]="row.level === 'warning'"
                [class.chip-error]="row.level === 'error'"
              >
                {{ row.level }}
              </span>
            </td>
            <td>{{ row.service }}</td>
            <td>{{ row.message }}</td>
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

      .chip-info,
      .chip-warning,
      .chip-error {
        display: inline-flex;
        align-items: center;
        padding: 0.125rem 0.5rem;
        border-radius: 999px;
        font-size: 0.75rem;
      }

      .chip-info {
        background-color: #e0f2fe;
        color: #075985;
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
export class ErrorActivityLogsComponent {
  protected rows: ErrorLogRow[] = [
    {
      id: 'el1',
      level: 'error',
      service: 'payments',
      message: 'Stripe charge failed for member 2048',
      timestamp: '2026-01-16 07:10',
    },
    {
      id: 'el2',
      level: 'warning',
      service: 'automation',
      message: 'Retrying missed_workout rule due to transient error',
      timestamp: '2026-01-16 07:12',
    },
    {
      id: 'el3',
      level: 'info',
      service: 'api-gateway',
      message: 'Deployment completed for web-admin v1.3.2',
      timestamp: '2026-01-15 22:04',
    },
  ];
}

