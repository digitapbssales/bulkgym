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
    url: 'https://iokmfvyzbotfkpjwhlap.supabase.co',
    anonKey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlva21mdnl6Ym90ZmtwandobGFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3MTQ3MzksImV4cCI6MjA4NDI5MDczOX0.3JL-xlYzpb4nR0CTyr_VTZ73ue3foNEsXqZr4HO79yA',
  },
  staging: {
    name: 'staging',
    url: 'https://iokmfvyzbotfkpjwhlap.supabase.co',
    anonKey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlva21mdnl6Ym90ZmtwandobGFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3MTQ3MzksImV4cCI6MjA4NDI5MDczOX0.3JL-xlYzpb4nR0CTyr_VTZ73ue3foNEsXqZr4HO79yA',
  },
  production: {
    name: 'production',
    url: 'https://iokmfvyzbotfkpjwhlap.supabase.co',
    anonKey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlva21mdnl6Ym90ZmtwandobGFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3MTQ3MzksImV4cCI6MjA4NDI5MDczOX0.3JL-xlYzpb4nR0CTyr_VTZ73ue3foNEsXqZr4HO79yA',
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
