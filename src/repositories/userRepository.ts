import type { ApiClient } from '@/clients/api';
import type { User } from '@/entities/user';

export interface UserRepository {
  getUserInfo(args: { token: string }): Promise<User>;
  deleteUser(args: { token: string }): Promise<{ message: 'ok' }>;
  changePassword(
    args: { token: string },
    body: { old_password: string; new_password: string },
  ): Promise<{ token: string }>;
  attachFacebookAccount(args: { token: string }, body: { fb_id: string; fb_token: string }): Promise<{ token: string }>;
  detachFacebookAccount(args: { token: string }): Promise<{ token: string }>;
  addIdPassword(args: { token: string }, body: { id: string; password: string }): Promise<{ token: string }>;
}

type Deps = { clients: [ApiClient] };
export const getUserRepository = ({ clients: [apiClient] }: Deps): UserRepository => {
  return {
    getUserInfo: async ({ token }) =>
      (await apiClient.get<User>('/v1/user/info', { headers: { 'x-access-token': token } })).data,
    deleteUser: async ({ token }) =>
      (await apiClient.delete<{ message: 'ok' }>('/v1/user/account', { headers: { 'x-access-token': token } })).data,
    changePassword: async ({ token }, body) =>
      (await apiClient.put<{ token: string }>('/v1/user/password', body, { headers: { 'x-access-token': token } }))
        .data,
    addIdPassword: async ({ token }, body) =>
      (await apiClient.post<{ token: string }>('/v1/user/password', body, { headers: { 'x-access-token': token } }))
        .data,
    attachFacebookAccount: async ({ token }, body) =>
      (await apiClient.post<{ token: string }>('/v1/user/facebook', body, { headers: { 'x-access-token': token } }))
        .data,
    detachFacebookAccount: async ({ token }) =>
      (await apiClient.delete<{ token: string }>('/v1/user/facebook', { headers: { 'x-access-token': token } })).data,
  };
};
