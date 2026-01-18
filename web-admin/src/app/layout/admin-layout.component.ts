import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AdminAuthService} from '../auth/admin-auth.service';

type AdminNavItem = {
  label: string;
  path: string;
  description: string;
};

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="layout">
      <aside class="sidebar">
        <div class="brand">
          <span class="brand-mark">BG</span>
          <span class="brand-text">Bulk Gym Admin</span>
        </div>

        <nav class="nav">
          <a
            *ngFor="let item of navItems"
            [routerLink]="item.path"
            routerLinkActive="nav-link-active"
            [routerLinkActiveOptions]="{ exact: true }"
            class="nav-link"
          >
            <span class="nav-label">{{ item.label }}</span>
            <span class="nav-description">{{ item.description }}</span>
          </a>
        </nav>
      </aside>

      <main class="content">
        <header class="top-bar">
          <span class="top-bar-title">Super admin</span>
          <button type="button" class="sign-out" (click)="onSignOut()">
            Sign out
          </button>
        </header>
        <router-outlet />
      </main>
    </div>
  `,
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  private readonly auth = inject(AdminAuthService);

  protected readonly navItems: AdminNavItem[] = [
    {
      label: 'System control',
      path: '/app/system',
      description: 'Super admin access, system overview, and global settings',
    },
    {
      label: 'Configuration',
      path: '/app/configuration',
      description: 'Plans, trainers, schedules, promotions',
    },
    {
      label: 'Content',
      path: '/app/content',
      description: 'Workout, nutrition, and media content',
    },
    {
      label: 'Analytics',
      path: '/app/analytics',
      description: 'Revenue, membership, and engagement dashboards',
    },
    {
      label: 'Monitoring',
      path: '/app/monitoring',
      description: 'Audit logs, payments, and automation status',
    },
  ];

  async onSignOut() {
    await this.auth.signOut();
  }
}
