import { AppEnv } from '@/entities/env';
import { EnvRepository, envRepository } from '@/repositories/envRepository';

export interface EnvService {
  getAppEnv(): AppEnv;
  getApiKey(): string;
  getBaseUrl(): string;
  getGitSha(): string;
  getGitTag(): string;
}

const getEnvService = (args: { repositories: [EnvRepository] }): EnvService => {
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
  };
};

export const envService = getEnvService({ repositories: [envRepository] });
