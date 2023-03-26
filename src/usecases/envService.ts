import type { AppEnv } from '@/entities/env';
import type { EnvRepository } from '@/repositories/envRepository';

export interface EnvService {
  getAppEnv(): AppEnv;
  getApiKey(): string;
  getBaseUrl(): string;
  getGitSha(): string;
  getGitTag(): string;
  getFacebookAppId(): string;
  getTruffleApiKey(): string;
  getNodeEnv(): string;
}

export const getEnvService = (args: { repositories: [EnvRepository] }): EnvService => {
  return {
    getAppEnv: () => args.repositories[0].getAppEnv(),
    getApiKey: () => args.repositories[0].getApiKey(),
    getBaseUrl: () => args.repositories[0].getBaseUrl(),
    getGitSha: () => {
      try {
        return args.repositories[0].getGitSha();
      } catch (err) {
        return 'unknown';
      }
    },
    getGitTag: () => {
      try {
        return args.repositories[0].getGitTag();
      } catch (err) {
        return 'unknown';
      }
    },
    getFacebookAppId: () => args.repositories[0].getFacebookAppId(),
    getTruffleApiKey: () => args.repositories[0].getTruffleApiKey(),
    getNodeEnv: () => args.repositories[0].getNodeEnv(),
  };
};
