import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

type NotificationChannel = 'email' | 'sms' | 'push';

type NotificationTemplate = {
  id: string;
  key: string;
  label: string;
  channel: NotificationChannel;
  subject: string;
  isActive: boolean;
};

@Component({
  selector: 'app-notification-templates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section>
      <h2>Notification templates</h2>
      <p>Author message templates for key lifecycle and engagement events.</p>

      <div class="toolbar">
        <label>
          Filter templates
          <input [(ngModel)]="filter" placeholder="Search by label or key" />
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>Template</th>
            <th>Key</th>
            <th>Channel</th>
            <th>Subject</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let template of filteredTemplates">
            <td>{{ template.label }}</td>
            <td>{{ template.key }}</td>
            <td>{{ template.channel }}</td>
            <td>{{ template.subject }}</td>
            <td>
              <span
                [class.chip-active]="template.isActive"
                [class.chip-inactive]="!template.isActive"
              >
                {{ template.isActive ? 'Active' : 'Archived' }}
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
export class NotificationTemplatesComponent {
  protected filter = '';

  protected templates: NotificationTemplate[] = [
    {
      id: 'nt1',
      key: 'membership_expiring',
      label: 'Membership expiring soon',
      channel: 'email',
      subject: 'Your Bulk Gym membership is expiring soon',
      isActive: true,
    },
    {
      id: 'nt2',
      key: 'class_booking_confirmation',
      label: 'Class booking confirmation',
      channel: 'sms',
      subject: 'You are booked into a Bulk Gym class',
      isActive: true,
    },
    {
      id: 'nt3',
      key: 'missed_checkin',
      label: 'Missed check-in nudge',
      channel: 'push',
      subject: 'We missed you at Bulk Gym',
      isActive: false,
    },
  ];

  get filteredTemplates(): NotificationTemplate[] {
    const term = this.filter.toLowerCase().trim();
    if (!term) {
      return this.templates;
    }
    return this.templates.filter(template => {
      const haystack = `${template.label} ${template.key}`.toLowerCase();
      return haystack.includes(term);
    });
  }
}

