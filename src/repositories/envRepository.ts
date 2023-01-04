// 이 파일은 전체 프로젝트에서 유일하게 @/constants/environment 에 접근할 수 있습니다.
// eslint-disable-next-line no-restricted-imports
import { EnvironmentVariables, viteEnvironmentVariables } from '@/constants/environment';
import { AppEnv } from '@/entities/env';

export interface EnvRepository {
  getAppEnv(): AppEnv;
  getApiKey(): string;
  getBaseUrl(): string;
  getGitSha(): string;
}

type Dependencies = { external: [EnvironmentVariables] };
const getEnvRepository = ({ external: [envVariables] }: Dependencies): EnvRepository => {
  const { API_BASE_URL, API_KEY, APP_ENV, GIT_SHA } = envVariables;
  return {
    getAppEnv: () => {
      if (APP_ENV === undefined) throw new Error('APP_ENV not provided');
      return APP_ENV as AppEnv;
    },
    getApiKey: () => {
      if (API_KEY === undefined) throw new Error('API_KEY not provided');
      return API_KEY;
    },
    getBaseUrl: () => {
      if (API_BASE_URL === undefined) throw new Error('API_BASE_URL not provided');
      return API_BASE_URL;
    },
    getGitSha: () => {
      if (GIT_SHA === undefined) throw new Error('GIT_SHA not provided');
      return GIT_SHA;
    },
  };
};

export const envRepository = getEnvRepository({ external: [viteEnvironmentVariables] });
