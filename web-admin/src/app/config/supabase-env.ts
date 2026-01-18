export type SupabaseEnvironmentName = 'development' | 'staging' | 'production';

export type SupabaseEnvConfig = {
  name: SupabaseEnvironmentName;
  url: string;
  anonKey: string;
};

const ENV_STORAGE_KEY = 'bg_supabase_env';

const configs: Record<SupabaseEnvironmentName, SupabaseEnvConfig> = {
  development: {
    name: 'development',
    url: '',
    anonKey: '',
  },
  staging: {
    name: 'staging',
    url: '',
    anonKey: '',
  },
  production: {
    name: 'production',
    url: '',
    anonKey: '',
  },
};

export function getSupabaseEnvironmentName(): SupabaseEnvironmentName {
  if (typeof window === 'undefined') {
    return 'development';
  }
  const raw = window.localStorage.getItem(ENV_STORAGE_KEY);
  if (raw === 'staging' || raw === 'production' || raw === 'development') {
    return raw;
  }
  return 'development';
}

export function setSupabaseEnvironmentName(name: SupabaseEnvironmentName) {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(ENV_STORAGE_KEY, name);
}

export function getSupabaseEnv(): SupabaseEnvConfig {
  const name = getSupabaseEnvironmentName();
  return configs[name];
}

export const supabaseEnvironments = configs;
