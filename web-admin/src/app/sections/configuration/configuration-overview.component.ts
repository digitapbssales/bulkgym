import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-configuration-overview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section>
      <h2>Configuration</h2>
      <p>Operational configuration for memberships, trainers, and classes.</p>
      <div class="grid">
        <a routerLink="/app/configuration/membership-plans">
          <h3>Membership plans and pricing</h3>
          <p>Define plans, billing cadence, and base pricing.</p>
        </a>
        <a routerLink="/app/configuration/trainers">
          <h3>Trainer profiles</h3>
          <p>Manage trainer bios, specialties, and assignments.</p>
        </a>
        <a routerLink="/app/configuration/class-schedules">
          <h3>Class schedules</h3>
          <p>Configure recurring classes, capacities, and booking windows.</p>
        </a>
        <a routerLink="/app/configuration/promotions">
          <h3>Promotions and discounts</h3>
          <p>Set up promo codes and time-bound offers.</p>
        </a>
        <a routerLink="/app/configuration/notification-templates">
          <h3>Notification templates</h3>
          <p>Author message templates for key system events.</p>
        </a>
        <a routerLink="/app/configuration/automation-rules">
          <h3>Automation rules</h3>
          <p>Define triggers that drive notifications and workflows.</p>
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
export class ConfigurationOverviewComponent {}
