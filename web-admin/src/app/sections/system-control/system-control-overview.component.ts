import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-system-control-overview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section>
      <h2>System control</h2>
      <p>Central control for the Bulk Gym platform under Super Admin login.</p>
      <div class="grid">
        <a routerLink="/app/system">
          <h3>System overview</h3>
          <p>Snapshot of auth, locations, and key configuration status.</p>
        </a>
        <a routerLink="/app/system/identity-access">
          <h3>Identity and access</h3>
          <p>Read-only list of Super Admin accounts managed in Supabase.</p>
        </a>
        <a routerLink="/app/system/global-settings">
          <h3>Global settings</h3>
          <p>Branding, time zones, and feature flags for the mobile app.</p>
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
export class SystemControlOverviewComponent {}
