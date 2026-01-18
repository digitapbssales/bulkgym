import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

type ClassSchedule = {
  id: string;
  name: string;
  location: string;
  weekday: string;
  startTime: string;
  capacity: number;
  bookingOpensHours: number;
};

@Component({
  selector: 'app-class-schedules',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section>
      <h2>Class schedules</h2>
      <p>Manage recurring classes, capacity, and booking windows.</p>

      <div class="toolbar">
        <label>
          Filter classes
          <input [(ngModel)]="filter" placeholder="Search by name or location" />
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>Class</th>
            <th>Location</th>
            <th>When</th>
            <th>Capacity</th>
            <th>Booking window</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of filteredSchedules">
            <td>{{ row.name }}</td>
            <td>{{ row.location }}</td>
            <td>{{ row.weekday }} {{ row.startTime }}</td>
            <td>{{ row.capacity }}</td>
            <td>{{ row.bookingOpensHours }}h before start</td>
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
    `,
  ],
})
export class ClassSchedulesComponent {
  protected filter = '';

  protected schedules: ClassSchedule[] = [
    {
      id: 'c1',
      name: 'Strength foundations',
      location: 'Downtown',
      weekday: 'Mon',
      startTime: '07:00',
      capacity: 20,
      bookingOpensHours: 48,
    },
    {
      id: 'c2',
      name: 'Conditioning',
      location: 'East Side',
      weekday: 'Wed',
      startTime: '18:00',
      capacity: 18,
      bookingOpensHours: 24,
    },
  ];

  get filteredSchedules(): ClassSchedule[] {
    const term = this.filter.toLowerCase().trim();
    if (!term) {
      return this.schedules;
    }
    return this.schedules.filter(row => {
      const haystack = `${row.name} ${row.location}`.toLowerCase();
      return haystack.includes(term);
    });
  }
}

