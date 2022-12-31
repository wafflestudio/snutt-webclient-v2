import { EnvRepository, envRepository } from '@/repositories/envRepository';
import { StorageRepository, storageRepository } from '@/repositories/storageRepository';

export interface AuthService {
  getApiKey(): string;
  getToken(): string | null;
  saveToken(token: string, persist: boolean): void;
  clearToken(): void;
  isValidPassword(password: string): boolean;
  changePassword(oldPassword: string, newPassword: string): Promise<{ token: string }>;
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
    isValidPassword: (password) =>
      password.split('').some((item) => /[0-9]+/.test(item)) &&
      password.split('').some((item) => /[a-zA-Z]+/.test(item)) &&
      password.length >= 6 &&
      password.length <= 20,
    changePassword: async (oldPassword, newPassword) => {
      console.log('not implemented');
      console.log(oldPassword, newPassword);
      return { token: '' };
    },
  };
};

export const authService = getAuthService({ repositories: [envRepository, storageRepository] });
