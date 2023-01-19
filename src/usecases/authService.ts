import { AuthRepository, authRepository } from '@/repositories/authRepository';
import { StorageRepository, storageRepository } from '@/repositories/storageRepository';
import { UserRepository, userRepository } from '@/repositories/userRepository';
import { EnvService, envService } from '@/usecases/envService';

export interface AuthService {
  getApiKey(): string;
  getToken(): string | null;
  saveToken(token: string, persist: boolean): void;
  clearToken(): void;
  isValidPassword(password: string): boolean;
  changePassword(token: string, body: { old_password: string; new_password: string }): Promise<{ token: string }>;
  signIn(
    params: { type: 'LOCAL'; id: string; password: string } | { type: 'FACEBOOK'; fb_id: string; fb_token: string },
  ): Promise<any>;
  signUp(body: { id: string; password: string }): Promise<{ message: 'ok'; token: string; user_id: string }>;
  closeAccount(token: string): Promise<{ message: 'ok' }>;
  findIdByEmail(body: { email: string }): Promise<{ message: 'ok' }>;
  passwordResetCheckEmail(body: { user_id: string }): Promise<{ email: string }>;
  sendPasswordResetVerificationEmail(body: { user_email: string }): Promise<{ message: 'ok' }>;
  verifyPasswordResetCode(body: { user_id: string; code: string }): Promise<{ message: 'ok' }>;
  resetPassword(body: { user_id: string; password: string }): Promise<{ message: 'ok' }>;
}

const getAuthService = (args: {
  repositories: [StorageRepository, AuthRepository, UserRepository];
  services: [EnvService];
}): AuthService => {
  const [storageRepo, authRepo, userRepo] = args.repositories;
  const [envService] = args.services;

  const baseUrl = envService.getBaseUrl();
  const apiKey = envService.getApiKey();

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
    changePassword: async (token, body) => userRepo.changePassword({ baseUrl, apiKey, token }, body),
    signIn: (params) =>
      params.type === 'LOCAL'
        ? authRepo.signInWithIdPassword({ ...params, baseUrl, apikey: apiKey })
        : authRepo.signInWithFacebook({ ...params, baseUrl }),
    signUp: (params) =>
      authRepo.signUpWithIdPassword({ baseUrl, apiKey }, { id: params.id, password: params.password }),
    closeAccount: (token) => userRepo.deleteUser({ baseUrl, token, apikey: apiKey }),
    findIdByEmail: (body) => authRepo.findId({ baseUrl, apiKey }, body),
    passwordResetCheckEmail: (body) => authRepo.passwordResetCheckEmail({ baseUrl, apiKey }, body),
    sendPasswordResetVerificationEmail: (body) =>
      authRepo.sendPasswordResetVerificationEmail({ baseUrl, apiKey }, body),
    verifyPasswordResetCode: (body) => authRepo.verifyPasswordResetCode({ baseUrl, apiKey }, body),
    resetPassword: (body) => authRepo.resetPassword({ baseUrl, apiKey }, body),
  };
};

export const authService = getAuthService({
  repositories: [storageRepository, authRepository, userRepository],
  services: [envService],
});
