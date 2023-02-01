import { User } from '@/entities/user';

export interface UserRepository {
  getUserInfo(args: { baseUrl: string; apikey: string; token: string }): Promise<User>;
  deleteUser(args: { baseUrl: string; apikey: string; token: string }): Promise<{ message: 'ok' }>;
  changePassword(
    args: { baseUrl: string; apiKey: string; token: string },
    body: { old_password: string; new_password: string },
  ): Promise<{ token: string }>;
  attachFacebookAccount(
    args: {
      baseUrl: string;
      apikey: string;
      token: string;
    },
    body: { fb_id: string; fb_token: string },
  ): Promise<{ token: string }>;
  detachFacebookAccount(args: { baseUrl: string; apikey: string; token: string }): Promise<{ token: string }>;
}

const getUserRepository = (): UserRepository => {
  return {
    getUserInfo: async ({ baseUrl, apikey, token }) => {
      const response = await fetch(`${baseUrl}/v1/user/info`, {
        headers: { 'x-access-apikey': apikey, 'x-access-token': token },
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as User;
    },
    deleteUser: async ({ baseUrl, apikey, token }) => {
      const response = await fetch(`${baseUrl}/v1/user/account`, {
        headers: { 'x-access-apikey': apikey, 'x-access-token': token },
        method: 'DELETE',
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as { message: 'ok' };
    },
    changePassword: async ({ baseUrl, apiKey, token }, body) => {
      const response = await fetch(`${baseUrl}/v1/user/password`, {
        headers: { 'Content-Type': 'application/json', 'x-access-apikey': apiKey, 'x-access-token': token },
        method: 'PUT',
        body: JSON.stringify(body),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as { token: string };
    },
    attachFacebookAccount: async ({ baseUrl, apikey, token }, body) => {
      const response = await fetch(`${baseUrl}/v1/user/facebook`, {
        headers: { 'Content-Type': 'application/json', 'x-access-apikey': apikey, 'x-access-token': token },
        method: 'POST',
        body: JSON.stringify(body),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data;
    },
    detachFacebookAccount: async ({ baseUrl, apikey, token }) => {
      const response = await fetch(`${baseUrl}/v1/user/facebook`, {
        headers: { 'Content-Type': 'application/json', 'x-access-apikey': apikey, 'x-access-token': token },
        method: 'DELETE',
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data;
    },
  };
};

export const userRepository = getUserRepository();
