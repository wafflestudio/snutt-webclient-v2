import { EnvRepository, envRepository } from '@/repositories/envRepository';
import { StorageRepository, storageRepository } from '@/repositories/storageRepository';

export interface AuthService {
  getApiKey(): string;
  getToken(): string | null;
  saveToken(token: string, persist: boolean): void;
  clearToken(): void;
}

const getAuthService = (args: { repositories: [EnvRepository, StorageRepository] }): AuthService => {
  const [envRepo, storageRepo] = args.repositories;

  return {
    getApiKey: () => envRepo.getApiKey(),
    getToken: () => storageRepo.get('snutt_token', false) ?? storageRepo.get('snutt_token', true),
    saveToken: (token, persist) => storageRepo.set('snutt_token', token, persist),
    clearToken: () => {
      storageRepo.remove('snutt_token', false);
      storageRepo.remove('snutt_token', true);
    },
  };
};

export const authService = getAuthService({ repositories: [envRepository, storageRepository] });
