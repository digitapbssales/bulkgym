import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

type AutomationTrigger =
  | 'membership_expiring'
  | 'missed_workout'
  | 'new_member_signup'
  | 'class_waitlist_spot_open';

type AutomationRule = {
  id: string;
  name: string;
  trigger: AutomationTrigger;
  templateKey: string;
  isActive: boolean;
};

@Component({
  selector: 'app-automation-rules',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section>
      <h2>Automation rules</h2>
      <p>
        Define rules that tie system events to notification templates and future workflows.
      </p>

      <div class="toolbar">
        <label>
          Filter rules
          <input [(ngModel)]="filter" placeholder="Search by name or trigger" />
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Trigger</th>
            <th>Notification template</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let rule of filteredRules">
            <td>{{ rule.name }}</td>
            <td>{{ rule.trigger }}</td>
            <td>{{ rule.templateKey }}</td>
            <td>
              <span
                [class.chip-active]="rule.isActive"
                [class.chip-inactive]="!rule.isActive"
              >
                {{ rule.isActive ? 'Active' : 'Disabled' }}
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
export class AutomationRulesComponent {
  protected filter = '';

  protected rules: AutomationRule[] = [
    {
      id: 'a1',
      name: 'Membership expiring in 7 days',
      trigger: 'membership_expiring',
      templateKey: 'membership_expiring',
      isActive: true,
    },
    {
      id: 'a2',
      name: 'Missed weekly workout target',
      trigger: 'missed_workout',
      templateKey: 'missed_checkin',
      isActive: true,
    },
    {
      id: 'a3',
      name: 'New member welcome',
      trigger: 'new_member_signup',
      templateKey: 'new_member_welcome',
      isActive: false,
    },
  ];

  get filteredRules(): AutomationRule[] {
    const term = this.filter.toLowerCase().trim();
    if (!term) {
      return this.rules;
    }
    return this.rules.filter(rule => {
      const haystack = `${rule.name} ${rule.trigger}`.toLowerCase();
      return haystack.includes(term);
    });
  }
}

