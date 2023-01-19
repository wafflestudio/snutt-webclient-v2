import { SignInResponse } from '@/entities/auth';

export interface AuthRepository {
  signInWithIdPassword(args: {
    baseUrl: string;
    apikey: string;
    id: string;
    password: string;
  }): Promise<SignInResponse>;
  signInWithFacebook(args: { baseUrl: string; fb_id: string; fb_token: string }): Promise<SignInResponse>;
  signUpWithIdPassword(
    args: { baseUrl: string; apiKey: string },
    body: { id: string; password: string },
  ): Promise<{ message: 'ok'; token: string; user_id: string }>;
  findId(args: { baseUrl: string; apiKey: string }, body: { email: string }): Promise<{ message: 'ok' }>;
  passwordResetCheckEmail(
    args: { baseUrl: string; apiKey: string },
    body: { user_id: string },
  ): Promise<{ email: string }>;
  sendPasswordResetVerificationEmail(
    args: { baseUrl: string; apiKey: string },
    body: { user_email: string },
  ): Promise<{ message: 'ok' }>;
  verifyPasswordResetCode(
    args: { baseUrl: string; apiKey: string },
    body: { user_id: string; code: string },
  ): Promise<{ message: 'ok' }>;
  resetPassword(
    args: { baseUrl: string; apiKey: string },
    body: { user_id: string; password: string },
  ): Promise<{ message: 'ok' }>;
}

const getAuthRepository = (): AuthRepository => {
  return {
    signInWithIdPassword: async ({ baseUrl, apikey, id, password }) => {
      const params = new URLSearchParams({ id, password });

      const response = await fetch(`${baseUrl}/auth/login_local`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'x-access-apikey': apikey },
        method: 'POST',
        body: params.toString(),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as SignInResponse;
    },
    signInWithFacebook: async ({ baseUrl, fb_id, fb_token }) => {
      const params = new URLSearchParams({ fb_id, fb_token });

      const response = await fetch(`${baseUrl}/auth/login_fb`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        body: params.toString(),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as SignInResponse;
    },
    signUpWithIdPassword: async ({ baseUrl, apiKey }, body) => {
      const response = await fetch(`${baseUrl}/auth/register_local`, {
        headers: { 'Content-Type': 'application/json', 'x-access-apikey': apiKey },
        method: 'POST',
        body: JSON.stringify(body),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as { message: 'ok'; token: string; user_id: string };
    },
    findId: async ({ baseUrl, apiKey }, body) => {
      const response = await fetch(`${baseUrl}/auth/id/find`, {
        headers: { 'Content-Type': 'application/json', 'x-access-apikey': apiKey },
        method: 'POST',
        body: JSON.stringify(body),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as { message: 'ok' };
    },
    passwordResetCheckEmail: async ({ baseUrl, apiKey }, body) => {
      const response = await fetch(`${baseUrl}/auth/password/reset/email/check`, {
        headers: { 'Content-Type': 'application/json', 'x-access-apikey': apiKey },
        method: 'POST',
        body: JSON.stringify(body),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as { email: string };
    },
    sendPasswordResetVerificationEmail: async ({ baseUrl, apiKey }, body) => {
      const response = await fetch(`${baseUrl}/auth/password/reset/email/send`, {
        headers: { 'Content-Type': 'application/json', 'x-access-apikey': apiKey },
        method: 'POST',
        body: JSON.stringify(body),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as { message: 'ok' };
    },
    verifyPasswordResetCode: async ({ baseUrl, apiKey }, body) => {
      const response = await fetch(`${baseUrl}/auth/password/reset/verification/code`, {
        headers: { 'Content-Type': 'application/json', 'x-access-apikey': apiKey },
        method: 'POST',
        body: JSON.stringify(body),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as { message: 'ok' };
    },
    resetPassword: async ({ baseUrl, apiKey }, body) => {
      const response = await fetch(`${baseUrl}/auth/password/reset`, {
        headers: { 'Content-Type': 'application/json', 'x-access-apikey': apiKey },
        method: 'POST',
        body: JSON.stringify(body),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as { message: 'ok' };
    },
  };
};

export const authRepository = getAuthRepository();
