import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-content-overview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section>
      <h2>Content management</h2>
      <p>Programming for workouts, nutrition, and live experiences.</p>
      <div class="grid">
        <a routerLink="/app/content/workouts">
          <h3>Workout templates</h3>
          <p>Programs, phases, and exercise blocks consumed by the mobile app.</p>
        </a>
        <a routerLink="/app/content/nutrition">
          <h3>Nutrition plans</h3>
          <p>Goal-based macro profiles and meal templates.</p>
        </a>
        <a routerLink="/app/content/videos">
          <h3>Video content</h3>
          <p>On-demand workout videos referencing Supabase Storage paths.</p>
        </a>
        <a routerLink="/app/content/live-classes">
          <h3>Live class setup</h3>
          <p>Streaming configuration and schedule linkage for live classes.</p>
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
export class ContentOverviewComponent {}
