export interface EnvRepository {
  getAppEnv(): 'dev' | 'prod' | 'test';
  getApiKey(): string;
  getBaseUrl(): string;
}

const getEnvRepository = (): EnvRepository => {
  return {
    getAppEnv: () => import.meta.env.VITE_APP_ENV as 'dev' | 'prod' | 'test',
    getApiKey: () => import.meta.env.VITE_API_KEY as string,
    getBaseUrl: () => import.meta.env.VITE_BASE_URL ?? '',
  };
};

export const envRepository = getEnvRepository();
