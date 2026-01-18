import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

type AuditLogRow = {
  id: string;
  actor: string;
  timestamp: string;
  entity: string;
  action: string;
};

@Component({
  selector: 'app-audit-logs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2>Audit logs</h2>
      <p>Configuration and content changes performed by Super Admins.</p>
      <table>
        <thead>
          <tr>
            <th>When</th>
            <th>Actor</th>
            <th>Entity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows">
            <td>{{ row.timestamp }}</td>
            <td>{{ row.actor }}</td>
            <td>{{ row.entity }}</td>
            <td>{{ row.action }}</td>
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
    `,
  ],
})
export class AuditLogsComponent {
  protected rows: AuditLogRow[] = [
    {
      id: 'al1',
      actor: 'Bulk Gym Owner',
      timestamp: '2026-01-15 10:22',
      entity: 'Membership plan: Premium monthly',
      action: 'Updated price from 59 to 69',
    },
    {
      id: 'al2',
      actor: 'Operations Lead',
      timestamp: '2026-01-14 09:05',
      entity: 'Class schedule: Strength foundations (Downtown)',
      action: 'Updated capacity from 18 to 20',
    },
  ];
}

