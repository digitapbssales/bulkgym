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
  private readonly tenantKey = 'bg_tenant_id';
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

    if (!user) throw new Error('No user found');

    // 1. Try to fetch profile from public.profiles (SaaS Architecture)
    const {data: profile} = await supabase
      .from('profiles')
      .select('role, tenant_id')
      .eq('id', user.id)
      .single();

    let role = profile?.role;
    const tenantId = profile?.tenant_id;

    // 2. Fallback to metadata if profile not found (Backward Compatibility)
    if (!role) {
      role =
        ((user?.user_metadata as {role?: string} | null)?.role ??
          (user?.app_metadata as {role?: string} | null)?.role ??
          '') || '';
    }

    // Fail-safe: Allow specific superadmin email
    const isSuperEmail = user?.email?.toLowerCase() === 'superadmin@bulkgym.com';
    
    if (isSuperEmail && !role) {
        role = 'superAdmin';
    }

    if (
      role !== 'superAdmin' &&
      role !== 'gymAdmin' &&
      role !== 'accounts' &&
      role !== 'guard' &&
      role !== 'trainer' &&
      role !== 'receptionist' &&
      role !== 'sales'
    ) {
      console.error(
        'Login Failed. Unauthorized Role.',
        'Role:', role,
        'Email:', user?.email
      );
      await supabase.auth.signOut();
      throw new Error('unauthorized_role');
    }

    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(this.roleKey, role || '');
      if (tenantId) {
        window.sessionStorage.setItem(this.tenantKey, tenantId);
      } else {
        window.sessionStorage.removeItem(this.tenantKey);
      }
    }
  }

  async getAccessToken() {
    const {data} = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  }

  getUserRole(): string {
    if (typeof window === 'undefined') {
      return '';
    }
    return window.sessionStorage.getItem(this.roleKey) || '';
  }

  isSuperAdminSession() {
    return this.getUserRole() === 'superAdmin';
  }

  isTenantAdminSession() {
    return this.getUserRole() === 'gymAdmin';
  }

  canAccessGymPanel() {
    const role = this.getUserRole();
    return ['gymAdmin', 'accounts', 'guard', 'trainer', 'receptionist', 'sales'].includes(role);
  }

  getTenantId() {
    if (typeof window === 'undefined') {
      return null;
    }
    return window.sessionStorage.getItem(this.tenantKey);
  }

  async signOut() {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(this.roleKey);
      window.sessionStorage.removeItem(this.tenantKey);
    }
    await supabase.auth.signOut();
    await this.router.navigate(['/auth/login']);
  }
}
