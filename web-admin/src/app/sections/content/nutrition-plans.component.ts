import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

type NutritionPlanRow = {
  id: string;
  name: string;
  target: string;
  macroProfile: string;
  status: 'draft' | 'published';
};

@Component({
  selector: 'app-nutrition-plans',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2>Nutrition plans</h2>
      <p>Structured templates for nutrition coaching that pair with workouts.</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Target</th>
            <th>Macro profile</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows">
            <td>{{ row.name }}</td>
            <td>{{ row.target }}</td>
            <td>{{ row.macroProfile }}</td>
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
export class NutritionPlansComponent {
  protected rows: NutritionPlanRow[] = [
    {
      id: 'np1',
      name: 'Fat loss baseline',
      target: 'Fat loss',
      macroProfile: 'High protein, moderate carb',
      status: 'published',
    },
    {
      id: 'np2',
      name: 'Muscle gain',
      target: 'Muscle gain',
      macroProfile: 'High protein, higher carb',
      status: 'published',
    },
    {
      id: 'np3',
      name: 'Recomp maintenance',
      target: 'Body recomposition',
      macroProfile: 'Balanced macros',
      status: 'draft',
    },
  ];
}

