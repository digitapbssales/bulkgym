import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

type RevenueBreakdownRow = {
  label: string;
  memberships: number;
  personalTraining: number;
  store: number;
  total: number;
};

type SimpleMetric = {
  label: string;
  value: string;
  helper?: string;
};

type AttendanceRow = {
  className: string;
  occupancy: string;
  checkInsPerWeek: number;
};

type TrainerPerformanceRow = {
  trainer: string;
  sessionsPerWeek: number;
  retention: string;
  satisfaction: string;
};

type EngagementRow = {
  feature: string;
  weeklyActive: string;
  completionRate: string;
};

@Component({
  selector: 'app-analytics-overview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2>Analytics and reporting</h2>
      <p>
        Visibility into revenue, membership health, trainer performance, and engagement across Bulk
        Gym.
      </p>

      <div class="grid">
        <article class="card">
          <header class="card-header">
            <h3>Revenue</h3>
            <p>Breakdown by line of business for the last full month.</p>
          </header>
          <table>
            <thead>
              <tr>
                <th>Segment</th>
                <th>Memberships</th>
                <th>PT</th>
                <th>Store</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of revenueRows">
                <td>{{ row.label }}</td>
                <td>{{ row.memberships | currency: 'USD' : 'symbol-narrow' }}</td>
                <td>{{ row.personalTraining | currency: 'USD' : 'symbol-narrow' }}</td>
                <td>{{ row.store | currency: 'USD' : 'symbol-narrow' }}</td>
                <td>{{ row.total | currency: 'USD' : 'symbol-narrow' }}</td>
              </tr>
            </tbody>
          </table>
        </article>

        <article class="card">
          <header class="card-header">
            <h3>Membership health</h3>
            <p>Growth, churn, and plan mix at a glance.</p>
          </header>
          <ul class="metric-list">
            <li *ngFor="let metric of membershipMetrics">
              <div class="metric-main">
                <span class="metric-label">{{ metric.label }}</span>
                <span class="metric-value">{{ metric.value }}</span>
              </div>
              <span class="metric-helper" *ngIf="metric.helper">
                {{ metric.helper }}
              </span>
            </li>
          </ul>
        </article>

        <article class="card">
          <header class="card-header">
            <h3>Attendance</h3>
            <p>Utilization of key class types and locations.</p>
          </header>
          <table>
            <thead>
              <tr>
                <th>Class</th>
                <th>Occupancy</th>
                <th>Check-ins / week</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of attendanceRows">
                <td>{{ row.className }}</td>
                <td>{{ row.occupancy }}</td>
                <td>{{ row.checkInsPerWeek }}</td>
              </tr>
            </tbody>
          </table>
        </article>

        <article class="card">
          <header class="card-header">
            <h3>Trainer performance</h3>
            <p>Coaching throughput and retention across locations.</p>
          </header>
          <table>
            <thead>
              <tr>
                <th>Trainer</th>
                <th>Sessions / week</th>
                <th>Client retention</th>
                <th>Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of trainerPerformanceRows">
                <td>{{ row.trainer }}</td>
                <td>{{ row.sessionsPerWeek }}</td>
                <td>{{ row.retention }}</td>
                <td>{{ row.satisfaction }}</td>
              </tr>
            </tbody>
          </table>
        </article>

        <article class="card">
          <header class="card-header">
            <h3>App engagement</h3>
            <p>Usage of key mobile features that drive retention.</p>
          </header>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Weekly active</th>
                <th>Completion rate</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of engagementRows">
                <td>{{ row.feature }}</td>
                <td>{{ row.weeklyActive }}</td>
                <td>{{ row.completionRate }}</td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    </section>
  `,
  styles: [
    `
      section {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      h2 {
        margin: 0;
        font-size: 1.5rem;
      }

      p {
        margin: 0;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.25rem;
      }

      .card {
        border-radius: 0.5rem;
        border: 1px solid #e5e7eb;
        padding: 1rem;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .card-header h3 {
        margin: 0;
        font-size: 1rem;
      }

      .card-header p {
        margin-top: 0.25rem;
        font-size: 0.875rem;
        color: #6b7280;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.875rem;
      }

      th,
      td {
        padding: 0.35rem 0.5rem;
        border-bottom: 1px solid #e5e7eb;
        text-align: left;
      }

      th {
        font-weight: 600;
        color: #4b5563;
      }

      .metric-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .metric-main {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 0.75rem;
      }

      .metric-label {
        font-size: 0.875rem;
        color: #4b5563;
      }

      .metric-value {
        font-size: 0.95rem;
        font-weight: 600;
        color: #111827;
      }

      .metric-helper {
        font-size: 0.75rem;
        color: #6b7280;
      }
    `,
  ],
})
export class AnalyticsOverviewComponent {
  protected revenueRows: RevenueBreakdownRow[] = [
    {
      label: 'All locations',
      memberships: 82000,
      personalTraining: 31000,
      store: 12500,
      total: 82000 + 31000 + 12500,
    },
    {
      label: 'Downtown',
      memberships: 42000,
      personalTraining: 18000,
      store: 6400,
      total: 42000 + 18000 + 6400,
    },
    {
      label: 'East Side',
      memberships: 26000,
      personalTraining: 9400,
      store: 3800,
      total: 26000 + 9400 + 3800,
    },
  ];

  protected membershipMetrics: SimpleMetric[] = [
    {
      label: 'Active members',
      value: '2,430',
      helper: '+6.2% vs last month',
    },
    {
      label: 'Monthly churn',
      value: '2.1%',
      helper: 'Target: under 3%',
    },
    {
      label: 'New sign-ups',
      value: '187',
      helper: 'Driven by 12-week transformation promo',
    },
    {
      label: 'Plan mix (premium)',
      value: '38%',
      helper: 'Higher ARPU driven by PT add-ons',
    },
  ];

  protected attendanceRows: AttendanceRow[] = [
    {
      className: 'Strength foundations (Downtown)',
      occupancy: '82%',
      checkInsPerWeek: 146,
    },
    {
      className: 'Conditioning (East Side)',
      occupancy: '74%',
      checkInsPerWeek: 98,
    },
    {
      className: 'Hypertrophy club (Downtown)',
      occupancy: '89%',
      checkInsPerWeek: 121,
    },
  ];

  protected trainerPerformanceRows: TrainerPerformanceRow[] = [
    {
      trainer: 'Alex Strength',
      sessionsPerWeek: 32,
      retention: '94%',
      satisfaction: '4.9 / 5',
    },
    {
      trainer: 'Jamie Performance',
      sessionsPerWeek: 26,
      retention: '91%',
      satisfaction: '4.7 / 5',
    },
    {
      trainer: 'Taylor Recovery',
      sessionsPerWeek: 18,
      retention: '88%',
      satisfaction: '4.8 / 5',
    },
  ];

  protected engagementRows: EngagementRow[] = [
    {
      feature: 'Workout tracking',
      weeklyActive: '63% of active members',
      completionRate: '78% log 3+ sessions / week',
    },
    {
      feature: 'Class booking',
      weeklyActive: '71% of active members',
      completionRate: '92% attend booked sessions',
    },
    {
      feature: 'Nutrition tracking',
      weeklyActive: '41% of active members',
      completionRate: '54% log 4+ days / week',
    },
    {
      feature: 'Challenges and community',
      weeklyActive: '29% of active members',
      completionRate: '64% complete current challenge',
    },
  ];
}

