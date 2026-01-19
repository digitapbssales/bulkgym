import {CommonModule} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AdminAuthService} from '../auth/admin-auth.service';

type NavItem = {
  label: string;
  path: string;
  description: string;
};

@Component({
  selector: 'app-gym-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="layout">
      <aside class="sidebar">
        <div class="brand">
          <span class="brand-mark">GA</span>
          <span class="brand-text">Gym Admin</span>
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
          <span class="top-bar-title">Gym Admin</span>
          <div class="top-bar-actions">
            <button 
              type="button" 
              class="theme-toggle" 
              (click)="toggleTheme()" 
              [attr.aria-label]="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <span class="icon">{{ isDarkMode ? '☀️' : '🌙' }}</span>
            </button>
            <button type="button" class="sign-out" (click)="onSignOut()">
              Sign out
            </button>
          </div>
        </header>
        <router-outlet />
      </main>
    </div>
  `,
  styleUrls: ['./admin-layout.component.scss'],
})
export class GymLayoutComponent implements OnInit {
  private readonly auth = inject(AdminAuthService);
  isDarkMode = true;

  protected navItems: NavItem[] = [];

  ngOnInit() {
    this.initializeTheme();
    this.setupNavigation();
  }

  private setupNavigation() {
    const role = this.auth.getUserRole();

    if (role === 'gymAdmin') {
      this.navItems = [
        {
          label: 'Overview',
          path: '/gym/overview',
          description: 'Gym Dashboard',
        },
        {
          label: 'User Management',
          path: '/gym/users',
          description: 'Manage staff and members',
        },
        {
          label: 'Configuration',
          path: '/gym/config',
          description: 'Gym details and branding',
        },
        {
          label: 'Finance & Payments',
          path: '/gym/finance',
          description: 'Revenue and payment gateways',
        },
      ];
    } else if (role === 'accounts') {
      this.navItems = [
        {
          label: 'Finance & Payments',
          path: '/gym/finance',
          description: 'Revenue and payment gateways',
        },
      ];
    } else if (role === 'guard') {
      this.navItems = [
        {
          label: 'Guard Terminal',
          path: '/gym/guard',
          description: 'Scan attendance',
        },
      ];
    } else if (role === 'trainer') {
      this.navItems = [
        {
          label: 'Trainer Dashboard',
          path: '/gym/trainer',
          description: 'Profile and Schedule',
        },
      ];
    } else if (role === 'receptionist') {
      this.navItems = [
        {
          label: 'Reception',
          path: '/gym/reception',
          description: 'Walk-in Entry',
        },
      ];
    } else if (role === 'sales' || role === 'sales_marketing') {
      this.navItems = [
        {
          label: 'Sales CRM',
          path: '/gym/crm',
          description: 'Manage leads',
        },
      ];
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else {
      this.isDarkMode = true;
    }
    this.applyTheme();
  }

  private applyTheme() {
    if (this.isDarkMode) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  async onSignOut() {
    await this.auth.signOut();
  }
}
