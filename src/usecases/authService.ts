import { StorageRepository, storageRepository } from '@/repositories/storageRepository';
import { EnvService, envService } from '@/usecases/envService';

export interface AuthService {
  getApiKey(): string;
  getToken(): string | null;
  saveToken(token: string, persist: boolean): void;
  clearToken(): void;
  isValidPassword(password: string): boolean;
  changePassword(oldPassword: string, newPassword: string): Promise<{ token: string }>;
}

const getAuthService = (args: { repositories: [StorageRepository]; services: [EnvService] }): AuthService => {
  const [storageRepo] = args.repositories;

  return {
    getApiKey: () => args.services[0].getApiKey(),
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

export const authService = getAuthService({ repositories: [storageRepository], services: [envService] });
