import type { EnvironmentVariables } from '@/constants/environment';
import type { AppEnv, NodeEnv } from '@/entities/env';

export interface EnvRepository {
  getAppEnv(): AppEnv;
  getApiKey(): string;
  getBaseUrl(): string;
  getGitSha(): string;
  getGitTag(): string;
  getFacebookAppId(): string;
  getTruffleApiKey(): string;
  getNodeEnv(): NodeEnv;
}

type Dependencies = { external: [EnvironmentVariables] };
export const getEnvRepository = ({ external: [envVariables] }: Dependencies): EnvRepository => {
  const { API_BASE_URL, API_KEY, APP_ENV, GIT_SHA, GIT_TAG, FACEBOOK_APP_ID, TRUFFLE_API_KEY, NODE_ENV } = envVariables;
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
    getGitTag: () => {
      if (GIT_TAG === undefined) throw new Error('GIT_TAG not provided');
      return GIT_TAG;
    },
    getFacebookAppId: () => {
      if (FACEBOOK_APP_ID === undefined) throw new Error('FACEBOOK_APP_ID not provided');
      return FACEBOOK_APP_ID;
    },
    getTruffleApiKey: () => {
      if (TRUFFLE_API_KEY === undefined) throw new Error('TRUFFLE_API_KEY not provided');
      return TRUFFLE_API_KEY;
    },
    getNodeEnv: () => {
      if (NODE_ENV === undefined) throw new Error('NODE_ENV not provided');
      return NODE_ENV as NodeEnv;
    },
  };
};
