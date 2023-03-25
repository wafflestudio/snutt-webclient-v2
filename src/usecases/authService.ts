import { type SignInResponse } from '@/entities/auth';
import { type AuthRepository } from '@/repositories/authRepository';
import { type StorageRepository } from '@/repositories/storageRepository';
import { type UserRepository } from '@/repositories/userRepository';
import { type EnvService } from '@/usecases/envService';

export interface AuthService {
  getApiKey(): string;
  getToken(): string | null;
  saveToken(token: string, persist: boolean): void;
  clearToken(): void;
  isValidPassword(password: string): boolean;
  changePassword(token: string, body: { old_password: string; new_password: string }): Promise<{ token: string }>;
  signIn(
    params: { type: 'LOCAL'; id: string; password: string } | { type: 'FACEBOOK'; fb_id: string; fb_token: string },
  ): Promise<SignInResponse>;
  signUp(body: { id: string; password: string }): Promise<{ message: 'ok'; token: string; user_id: string }>;
  closeAccount(token: string): Promise<{ message: 'ok' }>;
  findIdByEmail(body: { email: string }): Promise<{ message: 'ok' }>;
  passwordResetCheckEmail(body: { user_id: string }): Promise<{ email: string }>;
  sendPasswordResetVerificationEmail(body: { user_email: string }): Promise<{ message: 'ok' }>;
  verifyPasswordResetCode(body: { user_id: string; code: string }): Promise<{ message: 'ok' }>;
  resetPassword(body: { user_id: string; password: string }): Promise<{ message: 'ok' }>;
}

export const getAuthService = (args: {
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
        ? authRepo.signInWithIdPassword({ id: params.id, password: params.password })
        : authRepo.signInWithFacebook({ fb_id: params.fb_id, fb_token: params.fb_token }),
    signUp: (params) => authRepo.signUpWithIdPassword(params),
    closeAccount: (token) => userRepo.deleteUser({ baseUrl, token, apikey: apiKey }),
    findIdByEmail: (body) => authRepo.findId(body),
    passwordResetCheckEmail: (body) => authRepo.passwordResetCheckEmail(body),
    sendPasswordResetVerificationEmail: (body) => authRepo.sendPasswordResetVerificationEmail(body),
    verifyPasswordResetCode: (body) => authRepo.verifyPasswordResetCode(body),
    resetPassword: (body) => authRepo.resetPassword(body),
  };
};
