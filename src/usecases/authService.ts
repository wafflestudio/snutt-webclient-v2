import { AuthRepository, authRepository } from '@/repositories/authRepository';
import { EnvRepository, envRepository } from '@/repositories/envRepository';
import { StorageRepository, storageRepository } from '@/repositories/storageRepository';
import { EnvService, envService } from '@/usecases/envService';

export interface AuthService {
  getApiKey(): string;
  getToken(): string | null;
  saveToken(token: string, persist: boolean): void;
  clearToken(): void;
  isValidPassword(password: string): boolean;
  changePassword(oldPassword: string, newPassword: string): Promise<{ token: string }>;
  signIn(
    params: { type: 'LOCAL'; id: string; password: string } | { type: 'FACEBOOK'; fb_id: string; fb_token: string },
  ): Promise<any>;
}

const getAuthService = (args: {
  repositories: [EnvRepository, StorageRepository, AuthRepository];
  services: [EnvService];
}): AuthService => {
  const [envRepo, storageRepo, authRepo] = args.repositories;

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
    signIn: (params) =>
      params.type === 'LOCAL'
        ? authRepo.signInWithIdPassword({ ...params, baseUrl: envRepo.getBaseUrl(), apikey: envRepo.getApiKey() })
        : authRepo.signInWithFacebook({ ...params, baseUrl: envRepo.getBaseUrl() }),
  };
};

export const authService = getAuthService({
  repositories: [envRepository, storageRepository, authRepository],
  services: [envService],
});
