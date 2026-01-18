import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

type TrainerProfile = {
  id: string;
  fullName: string;
  primaryLocation: string;
  specialties: string[];
  isActive: boolean;
};

@Component({
  selector: 'app-trainer-profiles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section>
      <h2>Trainer profiles</h2>
      <p>Configure trainer details that surface in member booking flows.</p>

      <div class="toolbar">
        <label>
          Filter trainers
          <input [(ngModel)]="filter" placeholder="Search by name or specialty" />
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Specialties</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let trainer of filteredTrainers">
            <td>{{ trainer.fullName }}</td>
            <td>{{ trainer.primaryLocation }}</td>
            <td>{{ trainer.specialties.join(', ') }}</td>
            <td>
              <span
                [class.chip-active]="trainer.isActive"
                [class.chip-inactive]="!trainer.isActive"
              >
                {{ trainer.isActive ? 'Active' : 'Archived' }}
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
export class TrainerProfilesComponent {
  protected filter = '';

  protected trainers: TrainerProfile[] = [
    {
      id: 't1',
      fullName: 'Alex Strength',
      primaryLocation: 'Downtown',
      specialties: ['Strength', 'Hypertrophy'],
      isActive: true,
    },
    {
      id: 't2',
      fullName: 'Jamie Performance',
      primaryLocation: 'East Side',
      specialties: ['Conditioning', 'Athletic performance'],
      isActive: true,
    },
    {
      id: 't3',
      fullName: 'Taylor Recovery',
      primaryLocation: 'Downtown',
      specialties: ['Mobility', 'Rehab'],
      isActive: false,
    },
  ];

  get filteredTrainers(): TrainerProfile[] {
    const term = this.filter.toLowerCase().trim();
    if (!term) {
      return this.trainers;
    }
    return this.trainers.filter(trainer => {
      const haystack = `${trainer.fullName} ${trainer.specialties.join(' ')}`.toLowerCase();
      return haystack.includes(term);
    });
  }
}

