import type { ApiClient } from '@/clients/api';
import type { Notification } from '@/entities/notification';

export interface NotificationRepository {
  getCount(): Promise<{ count: number }>;
  getList(): Promise<Notification[]>;
}

type Deps = { clients: [ApiClient] };
export const getNotificationRepository = ({ clients: [apiClient] }: Deps): NotificationRepository => {
  return {
    getCount: async () => (await apiClient.get<{ count: number }>(`/v1/notification/count`)).data,
    getList: async () => (await apiClient.get<Notification[]>(`/v1/notification`)).data,
  };
};
