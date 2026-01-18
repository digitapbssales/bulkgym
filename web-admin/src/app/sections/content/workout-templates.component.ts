import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

type WorkoutTemplateRow = {
  id: string;
  programName: string;
  phase: string;
  durationWeeks: number;
  status: 'draft' | 'published';
};

@Component({
  selector: 'app-workout-templates',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2>Workout templates</h2>
      <p>Program-level templates that the mobile app consumes for training flows.</p>
      <table>
        <thead>
          <tr>
            <th>Program</th>
            <th>Phase</th>
            <th>Duration</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows">
            <td>{{ row.programName }}</td>
            <td>{{ row.phase }}</td>
            <td>{{ row.durationWeeks }} weeks</td>
            <td>
              <span
                [class.chip-published]="row.status === 'published'"
                [class.chip-draft]="row.status === 'draft'"
              >
                {{ row.status === 'published' ? 'Published' : 'Draft' }}
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

      .chip-published,
      .chip-draft {
        display: inline-flex;
        align-items: center;
        padding: 0.125rem 0.5rem;
        border-radius: 999px;
        font-size: 0.75rem;
      }

      .chip-published {
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
export class WorkoutTemplatesComponent {
  protected rows: WorkoutTemplateRow[] = [
    {
      id: 'wt1',
      programName: 'Strength foundations',
      phase: 'Phase 1',
      durationWeeks: 8,
      status: 'published',
    },
    {
      id: 'wt2',
      programName: 'Hypertrophy club',
      phase: 'Phase 2',
      durationWeeks: 12,
      status: 'published',
    },
    {
      id: 'wt3',
      programName: 'Return to training',
      phase: 'Phase 0',
      durationWeeks: 4,
      status: 'draft',
    },
  ];
}

