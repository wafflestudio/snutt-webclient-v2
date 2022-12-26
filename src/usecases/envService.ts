import { EnvRepository, envRepository } from '@/repositories/envRepository';

export interface EnvService {
  getAppEnv(): 'dev' | 'prod' | 'test';
}

const getEnvService = (args: { repositories: [EnvRepository] }): EnvService => {
  return {
    getAppEnv: () => args.repositories[0].getAppEnv(),
  };
};

export const envService = getEnvService({ repositories: [envRepository] });
