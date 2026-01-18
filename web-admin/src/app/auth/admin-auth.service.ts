import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {createClient} from '@supabase/supabase-js';
import {getSupabaseEnv} from '../config/supabase-env';

const {url, anonKey} = getSupabaseEnv();
const supabase = createClient(url, anonKey);

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private readonly roleKey = 'bg_admin_role';
  private readonly router = inject(Router);

  async signInWithEmail(email: string, password: string) {
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    const session = data.session;
    const user = session?.user;
    const role =
      ((user?.user_metadata as {role?: string} | null)?.role ??
        (user?.app_metadata as {role?: string} | null)?.role ??
        '') || '';

    if (role !== 'superAdmin') {
      await supabase.auth.signOut();
      throw new Error('not_super_admin');
    }

    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(this.roleKey, 'superAdmin');
    }
  }

  async getAccessToken() {
    const {data} = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  }

  isSuperAdminSession() {
    if (typeof window === 'undefined') {
      return false;
    }
    const raw = window.sessionStorage.getItem(this.roleKey);
    return raw === 'superAdmin';
  }

  async signOut() {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(this.roleKey);
    }
    await supabase.auth.signOut();
    await this.router.navigate(['/auth/login']);
  }
}
