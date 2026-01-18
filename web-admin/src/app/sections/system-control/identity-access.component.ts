import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

type SuperAdminAccount = {
  id: string;
  email: string;
  name: string;
  lastSignInAt: string;
  status: 'active' | 'disabled';
};

@Component({
  selector: 'app-identity-access',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2>Identity and access</h2>
      <p>
        Read-only view of Super Admin accounts. Identity and roles are managed in Supabase, not in
        this panel.
      </p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Last sign-in</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let admin of accounts">
            <td>{{ admin.name }}</td>
            <td>{{ admin.email }}</td>
            <td>{{ admin.lastSignInAt }}</td>
            <td>
              <span
                [class.chip-active]="admin.status === 'active'"
                [class.chip-inactive]="admin.status === 'disabled'"
              >
                {{ admin.status === 'active' ? 'Active' : 'Disabled' }}
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
export class IdentityAccessComponent {
  protected accounts: SuperAdminAccount[] = [
    {
      id: 'sa1',
      email: 'owner@bulkgym.com',
      name: 'Bulk Gym Owner',
      lastSignInAt: '2026-01-10 09:14',
      status: 'active',
    },
    {
      id: 'sa2',
      email: 'ops@bulkgym.com',
      name: 'Operations Lead',
      lastSignInAt: '2026-01-16 16:42',
      status: 'active',
    },
    {
      id: 'sa3',
      email: 'finance@bulkgym.com',
      name: 'Finance Admin',
      lastSignInAt: '2025-12-21 11:03',
      status: 'disabled',
    },
  ];
}

