import type { ApiClient } from '@/clients/api';
import type { Notification } from '@/entities/notification';

export interface NotificationRepository {
  getCount(args: { token: string }): Promise<{ count: number }>;
  getList(args: { token: string }): Promise<Notification[]>;
}

type Deps = { clients: [ApiClient] };
export const getNotificationRepository = ({ clients: [apiClient] }: Deps): NotificationRepository => {
  return {
    getCount: async ({ token }) =>
      (
        await apiClient.get<{ count: number }>(`/v1/notification/count`, {
          headers: { 'x-access-token': token },
        })
      ).data,
    getList: async ({ token }) =>
      (await apiClient.get<Notification[]>(`/v1/notification`, { headers: { 'x-access-token': token } })).data,
  };
};
