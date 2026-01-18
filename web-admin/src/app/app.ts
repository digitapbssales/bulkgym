import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>Bulk Gym Web Admin</h1>
    <router-outlet />
  `,
  styleUrl: './app.scss',
})
export class App {}
