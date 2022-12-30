import { EnvRepository, envRepository } from '@/repositories/envRepository';
import { StorageRepository, storageRepository } from '@/repositories/storageRepository';

export interface AuthService {
  getApiKey(): string;
  getToken(): string | null;
}

const getAuthService = (args: { repositories: [EnvRepository, StorageRepository] }): AuthService => {
  return {
    getApiKey: () => args.repositories[0].getApiKey(),
    getToken: () => args.repositories[1].getToken(),
  };
};

export const authService = getAuthService({ repositories: [envRepository, storageRepository] });
