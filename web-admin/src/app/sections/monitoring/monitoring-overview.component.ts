import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-monitoring-overview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section>
      <h2>Monitoring and audit</h2>
      <p>Operational visibility into platform health and automation.</p>
      <div class="grid">
        <a routerLink="/app/monitoring/audit-logs">
          <h3>Audit logs</h3>
          <p>Configuration changes, content updates, and sensitive actions.</p>
        </a>
        <a routerLink="/app/monitoring/payments">
          <h3>Payment monitoring</h3>
          <p>Recent payments, failures, refunds, and disputes.</p>
        </a>
        <a routerLink="/app/monitoring/automation">
          <h3>Automation status</h3>
          <p>Run history and failures for automation rules.</p>
        </a>
        <a routerLink="/app/monitoring/logs">
          <h3>Error and activity logs</h3>
          <p>Aggregated errors and key events across services.</p>
        </a>
      </div>
    </section>
  `,
  styles: [
    `
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
      }

      a {
        display: block;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        border: 1px solid #e5e7eb;
        text-decoration: none;
        color: inherit;
        background-color: #ffffff;
      }

      h3 {
        margin: 0 0 0.25rem 0;
        font-size: 0.95rem;
      }

      p {
        margin: 0;
        font-size: 0.85rem;
        color: #4b5563;
      }
    `,
  ],
})
export class MonitoringOverviewComponent {}
