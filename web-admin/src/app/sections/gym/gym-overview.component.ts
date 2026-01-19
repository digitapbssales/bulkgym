import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-gym-overview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overview">
      <h2>Gym Overview</h2>
      <p>Welcome to your Gym Admin Dashboard.</p>
    </div>
  `,
})
export class GymOverviewComponent {}
