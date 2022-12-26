export interface EnvRepository {
  getAppEnv(): 'dev' | 'prod' | 'test';
  getApiKey(): string;
  getToken(): string; // TODO: remove (로컬 개발용 임시 변수)
}

const getEnvRepository = (): EnvRepository => {
  return {
    getAppEnv: () => import.meta.env.VITE_APP_ENV as 'dev' | 'prod' | 'test',
    getApiKey: () => import.meta.env.VITE_API_KEY as string,
    getToken: () => import.meta.env.VITE_TOKEN as string,
  };
};

export const envRepository = getEnvRepository();