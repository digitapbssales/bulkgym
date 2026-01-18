import {CanActivateFn, Router, Routes, UrlTree} from '@angular/router';
import {inject} from '@angular/core';
import {AdminAuthService} from './auth/admin-auth.service';

export const adminAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(AdminAuthService);
  if (auth.isSuperAdminSession()) {
    return true;
  }
  return router.createUrlTree(['/auth/login']) as UrlTree;
};

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/login.component').then(m => m.LoginComponent),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
    ],
  },
  {
    path: 'app',
    canActivate: [adminAuthGuard],
    loadComponent: () =>
      import('./layout/admin-layout.component').then(
        m => m.AdminLayoutComponent,
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'system',
      },
      {
        path: 'system',
        loadComponent: () =>
          import('./sections/system-control/system-control-overview.component').then(
            m => m.SystemControlOverviewComponent,
          ),
      },
      {
        path: 'system/identity-access',
        loadComponent: () =>
          import('./sections/system-control/identity-access.component').then(
            m => m.IdentityAccessComponent,
          ),
      },
      {
        path: 'system/global-settings',
        loadComponent: () =>
          import('./sections/system-control/global-settings.component').then(
            m => m.GlobalSettingsComponent,
          ),
      },
      {
        path: 'configuration',
        loadComponent: () =>
          import('./sections/configuration/configuration-overview.component').then(
            m => m.ConfigurationOverviewComponent,
          ),
      },
      {
        path: 'configuration/membership-plans',
        loadComponent: () =>
          import('./sections/configuration/membership-plans.component').then(
            m => m.MembershipPlansComponent,
          ),
      },
      {
        path: 'configuration/trainers',
        loadComponent: () =>
          import('./sections/configuration/trainer-profiles.component').then(
            m => m.TrainerProfilesComponent,
          ),
      },
      {
        path: 'configuration/class-schedules',
        loadComponent: () =>
          import('./sections/configuration/class-schedules.component').then(
            m => m.ClassSchedulesComponent,
          ),
      },
      {
        path: 'configuration/promotions',
        loadComponent: () =>
          import('./sections/configuration/promotions.component').then(
            m => m.PromotionsComponent,
          ),
      },
      {
        path: 'configuration/notification-templates',
        loadComponent: () =>
          import('./sections/configuration/notification-templates.component').then(
            m => m.NotificationTemplatesComponent,
          ),
      },
      {
        path: 'configuration/automation-rules',
        loadComponent: () =>
          import('./sections/configuration/automation-rules.component').then(
            m => m.AutomationRulesComponent,
          ),
      },
      {
        path: 'content',
        loadComponent: () =>
          import('./sections/content/content-overview.component').then(
            m => m.ContentOverviewComponent,
          ),
      },
      {
        path: 'content/workouts',
        loadComponent: () =>
          import('./sections/content/workout-templates.component').then(
            m => m.WorkoutTemplatesComponent,
          ),
      },
      {
        path: 'content/nutrition',
        loadComponent: () =>
          import('./sections/content/nutrition-plans.component').then(
            m => m.NutritionPlansComponent,
          ),
      },
      {
        path: 'content/videos',
        loadComponent: () =>
          import('./sections/content/video-content.component').then(
            m => m.VideoContentComponent,
          ),
      },
      {
        path: 'content/live-classes',
        loadComponent: () =>
          import('./sections/content/live-class-setup.component').then(
            m => m.LiveClassSetupComponent,
          ),
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./sections/analytics/analytics-overview.component').then(
            m => m.AnalyticsOverviewComponent,
          ),
      },
      {
        path: 'monitoring',
        loadComponent: () =>
          import('./sections/monitoring/monitoring-overview.component').then(
            m => m.MonitoringOverviewComponent,
          ),
      },
      {
        path: 'monitoring/audit-logs',
        loadComponent: () =>
          import('./sections/monitoring/audit-logs.component').then(
            m => m.AuditLogsComponent,
          ),
      },
      {
        path: 'monitoring/payments',
        loadComponent: () =>
          import('./sections/monitoring/payment-monitoring.component').then(
            m => m.PaymentMonitoringComponent,
          ),
      },
      {
        path: 'monitoring/automation',
        loadComponent: () =>
          import('./sections/monitoring/automation-status.component').then(
            m => m.AutomationStatusComponent,
          ),
      },
      {
        path: 'monitoring/logs',
        loadComponent: () =>
          import('./sections/monitoring/error-activity-logs.component').then(
            m => m.ErrorActivityLogsComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
