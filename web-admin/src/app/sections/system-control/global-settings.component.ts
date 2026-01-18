import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

type GlobalSettingsForm = {
  brandName: string;
  primaryColor: string;
  timeZone: string;
  locations: string;
  enableChallenges: boolean;
  enableNutrition: boolean;
};

@Component({
  selector: 'app-global-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section>
      <h2>Global settings</h2>
      <p>
        Platform-wide settings for branding, locations, time zones, and feature flags that affect
        the mobile experience.
      </p>
      <form class="form">
        <label>
          <span>Brand name</span>
          <input [(ngModel)]="model.brandName" name="brandName" />
        </label>
        <label>
          <span>Primary color</span>
          <input [(ngModel)]="model.primaryColor" name="primaryColor" type="color" />
        </label>
        <label>
          <span>Default time zone</span>
          <select [(ngModel)]="model.timeZone" name="timeZone">
            <option value="America/New_York">America/New_York</option>
            <option value="America/Chicago">America/Chicago</option>
            <option value="America/Los_Angeles">America/Los_Angeles</option>
          </select>
        </label>
        <label>
          <span>Supported locations</span>
          <textarea
            [(ngModel)]="model.locations"
            name="locations"
            rows="3"
            placeholder="One location per line"
          ></textarea>
        </label>
        <fieldset>
          <legend>Feature flags</legend>
          <label class="checkbox">
            <input
              type="checkbox"
              [(ngModel)]="model.enableChallenges"
              name="enableChallenges"
            />
            <span>Enable challenges in the mobile app</span>
          </label>
          <label class="checkbox">
            <input
              type="checkbox"
              [(ngModel)]="model.enableNutrition"
              name="enableNutrition"
            />
            <span>Enable nutrition coaching features</span>
          </label>
        </fieldset>
      </form>
      <aside class="hint">
        Changes here are conceptual and stored locally. In a real deployment these settings would be
        persisted via a secure admin API and enforced by Supabase Row Level Security.
      </aside>
    </section>
  `,
  styles: [
    `
      section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .form {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 0.75rem;
        max-width: 480px;
      }

      label {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        font-size: 0.875rem;
      }

      input,
      select,
      textarea {
        border-radius: 0.375rem;
        border: 1px solid #d1d5db;
        padding: 0.4rem 0.5rem;
        font-size: 0.875rem;
      }

      fieldset {
        border-radius: 0.5rem;
        border: 1px solid #e5e7eb;
        padding: 0.75rem;
      }

      legend {
        padding: 0 0.25rem;
        font-size: 0.875rem;
        font-weight: 500;
      }

      .checkbox {
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.25rem;
      }

      .hint {
        max-width: 520px;
        font-size: 0.75rem;
        color: #6b7280;
      }
    `,
  ],
})
export class GlobalSettingsComponent {
  protected model: GlobalSettingsForm = {
    brandName: 'Bulk Gym',
    primaryColor: '#00b894',
    timeZone: 'America/New_York',
    locations: 'Downtown\nEast Side',
    enableChallenges: true,
    enableNutrition: true,
  };
}

