import { type SignInResponse } from '@/entities/auth';
import { type AuthRepository } from '@/repositories/authRepository';
import { type StorageRepository } from '@/repositories/storageRepository';
import { type UserRepository } from '@/repositories/userRepository';

export interface AuthService {
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

type Deps = { repositories: [StorageRepository, AuthRepository, UserRepository] };
export const getAuthService = ({
  repositories: [storageRepository, authRepository, userRepository],
}: Deps): AuthService => {
  return {
    getToken: () => storageRepository.get('snutt_token', false) ?? storageRepository.get('snutt_token', true),
    saveToken: (token, persist) => storageRepository.set('snutt_token', token, persist),
    clearToken: () => {
      storageRepository.remove('snutt_token', false);
      storageRepository.remove('snutt_token', true);
    },
    isValidPassword: (password) =>
      password.split('').some((item) => /[0-9]+/.test(item)) &&
      password.split('').some((item) => /[a-zA-Z]+/.test(item)) &&
      password.length >= 6 &&
      password.length <= 20,
    changePassword: async (token, body) => userRepository.changePassword({ token }, body),
    signIn: (params) =>
      params.type === 'LOCAL'
        ? authRepository.signInWithIdPassword({ id: params.id, password: params.password })
        : authRepository.signInWithFacebook({ fb_id: params.fb_id, fb_token: params.fb_token }),
    signUp: (params) => authRepository.signUpWithIdPassword(params),
    closeAccount: (token) => userRepository.deleteUser({ token }),
    findIdByEmail: (body) => authRepository.findId(body),
    passwordResetCheckEmail: (body) => authRepository.passwordResetCheckEmail(body),
    sendPasswordResetVerificationEmail: (body) => authRepository.sendPasswordResetVerificationEmail(body),
    verifyPasswordResetCode: (body) => authRepository.verifyPasswordResetCode(body),
    resetPassword: (body) => authRepository.resetPassword(body),
  };
};
