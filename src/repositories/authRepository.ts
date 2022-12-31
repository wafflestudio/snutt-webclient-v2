import { SignInResponse } from '@/entities/auth';

export interface AuthRepository {
  signInWithIdPassword(args: {
    baseUrl: string;
    apikey: string;
    id: string;
    password: string;
  }): Promise<SignInResponse>;
  signInWithFacebook(args: { baseUrl: string; fb_id: string; fb_token: string }): Promise<SignInResponse>;
}

const getAuthRepository = (): AuthRepository => {
  return {
    signInWithIdPassword: async ({ baseUrl, apikey, id, password }) => {
      const params = new URLSearchParams({ id, password });

      const response = await fetch(`${baseUrl}/auth/login_local`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-apikey': apikey,
        },
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
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: params.toString(),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as SignInResponse;
    },
  };
};

export const authRepository = getAuthRepository();
