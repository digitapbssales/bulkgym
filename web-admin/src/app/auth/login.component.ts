import {CommonModule} from '@angular/common';
import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AdminAuthService} from './admin-auth.service';
import {
  getSupabaseEnvironmentName,
  setSupabaseEnvironmentName,
  SupabaseEnvironmentName,
} from '../config/supabase-env';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <main class="auth">
      <section class="auth-card">
        <h1 class="auth-title">Bulk Gym Super Admin</h1>
        <p class="auth-subtitle">
          Super admin access only. Changes here affect the live member experience.
        </p>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <label class="field">
            <span>Email</span>
            <input type="email" formControlName="email" autocomplete="username" />
          </label>

          <label class="field">
            <span>Password</span>
            <input
              type="password"
              formControlName="password"
              autocomplete="current-password"
            />
          </label>

          <button type="submit" [disabled]="form.invalid || loading()">
            {{ loading() ? 'Signing in…' : 'Sign in' }}
          </button>

          <p class="error" *ngIf="error()">{{ error() }}</p>
        </form>

        <div class="env">
          <label>
            <span>Environment</span>
            <select
              [value]="environment()"
              (change)="onEnvironmentChange($any($event.target).value)"
            >
              <option *ngFor="let env of environments" [value]="env">
                {{ env }}
              </option>
            </select>
          </label>
        </div>
      </section>
    </main>
  `,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AdminAuthService);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly environment = signal<SupabaseEnvironmentName>(
    getSupabaseEnvironmentName(),
  );
  readonly environments: SupabaseEnvironmentName[] = [
    'development',
    'staging',
    'production',
  ];

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onEnvironmentChange(value: string) {
    const env = value as SupabaseEnvironmentName;
    if (!this.environments.includes(env) || env === this.environment()) {
      return;
    }
    setSupabaseEnvironmentName(env);
    this.environment.set(env);
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }

  async onSubmit() {
    if (this.form.invalid || this.loading()) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const {email, password} = this.form.getRawValue();

    try {
      await this.auth.signInWithEmail(email, password);
      await this.router.navigate(['/app']);
    } catch (err) {
      const message =
        err instanceof Error && err.message === 'not_super_admin'
          ? 'This account does not have super admin access.'
          : 'Invalid credentials or unable to reach the auth service.';
      this.error.set(message);
    } finally {
      this.loading.set(false);
    }
  }
}
