import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

type LiveClassRow = {
  id: string;
  classType: string;
  provider: string;
  linkedSchedule: string;
  status: 'draft' | 'active';
};

@Component({
  selector: 'app-live-class-setup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2>Live class setup</h2>
      <p>Configuration for streamed classes, including provider and schedule linkage.</p>
      <table>
        <thead>
          <tr>
            <th>Class type</th>
            <th>Provider</th>
            <th>Linked schedule</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows">
            <td>{{ row.classType }}</td>
            <td>{{ row.provider }}</td>
            <td>{{ row.linkedSchedule }}</td>
            <td>
              <span
                [class.chip-active]="row.status === 'active'"
                [class.chip-draft]="row.status === 'draft'"
              >
                {{ row.status === 'active' ? 'Active' : 'Draft' }}
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
      .chip-draft {
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

      .chip-draft {
        background-color: #e5e7eb;
        color: #374151;
      }
    `,
  ],
})
export class LiveClassSetupComponent {
  protected rows: LiveClassRow[] = [
    {
      id: 'lc1',
      classType: 'Live strength club',
      provider: 'Zoom',
      linkedSchedule: 'Downtown strength foundations',
      status: 'active',
    },
    {
      id: 'lc2',
      classType: 'Live conditioning',
      provider: 'YouTube Live',
      linkedSchedule: 'Conditioning East Side',
      status: 'draft',
    },
  ];
}

