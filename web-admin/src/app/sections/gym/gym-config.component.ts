import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-gym-config',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="config">
      <h2>Gym Configuration</h2>
      <p>Configure your gym details, branding, and location.</p>
    </div>
  `,
})
export class GymConfigComponent {}
