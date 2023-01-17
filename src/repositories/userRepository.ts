import { User } from '@/entities/user';

export interface UserRepository {
  getUserInfo(args: { baseUrl: string; apikey: string; token: string }): Promise<User>;
  deleteUser(args: { baseUrl: string; apikey: string; token: string }): Promise<{ message: 'ok' }>;
}

const getUserRepository = (): UserRepository => {
  return {
    getUserInfo: async ({ baseUrl, apikey, token }) => {
      const response = await fetch(`${baseUrl}/user/info`, {
        headers: { 'x-access-apikey': apikey, 'x-access-token': token },
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as User;
    },
    deleteUser: async ({ baseUrl, apikey, token }) => {
      const response = await fetch(`${baseUrl}/user/account`, {
        headers: { 'x-access-apikey': apikey, 'x-access-token': token },
        method: 'DELETE',
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as { message: 'ok' };
    },
  };
};

export const userRepository = getUserRepository();
