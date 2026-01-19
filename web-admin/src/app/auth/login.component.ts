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
  styles: [
    `
      .auth {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: radial-gradient(circle at top right, #1e293b, #020617);
        padding: 1rem;
      }

      .auth-card {
        width: 100%;
        max-width: 400px;
        padding: 2.5rem;
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 1rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      }

      .auth-title {
        font-size: 1.75rem;
        font-weight: 700;
        margin: 0 0 0.5rem;
        background: linear-gradient(to right, #60a5fa, #c084fc);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
      }

      .auth-subtitle {
        color: #94a3b8;
        font-size: 0.875rem;
        text-align: center;
        margin-bottom: 2rem;
        line-height: 1.5;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .field span {
        font-size: 0.875rem;
        font-weight: 500;
        color: #cbd5e1;
      }

      input,
      select {
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        background: rgba(2, 6, 23, 0.5);
        border: 1px solid #334155;
        color: #f8fafc;
        font-family: inherit;
        font-size: 0.95rem;
        transition: all 0.2s;
      }

      input:focus,
      select:focus {
        outline: none;
        border-color: #60a5fa;
        box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2);
      }

      button {
        margin-top: 0.5rem;
        padding: 0.75rem;
        border-radius: 0.5rem;
        background: linear-gradient(to right, #3b82f6, #8b5cf6);
        color: white;
        font-weight: 600;
        border: none;
        cursor: pointer;
        transition: opacity 0.2s;
      }

      button:hover {
        opacity: 0.9;
      }

      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .error {
        color: #ef4444;
        font-size: 0.875rem;
        text-align: center;
        background: rgba(239, 68, 68, 0.1);
        padding: 0.5rem;
        border-radius: 0.375rem;
      }

      .env {
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
      }
    `,
  ],
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
