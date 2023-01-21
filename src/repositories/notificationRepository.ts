import { Notification } from '@/entities/notification';

export interface NotificationRepository {
  getCount(args: { baseUrl: string; apikey: string; token: string }): Promise<{ count: number }>;
  getList(args: { baseUrl: string; apikey: string; token: string }): Promise<Notification[]>;
}

const getNotificationRepository = (): NotificationRepository => {
  return {
    getCount: async ({ baseUrl, apikey, token }) => {
      const response = await fetch(`${baseUrl}/v1/notification/count`, {
        headers: { 'x-access-apikey': apikey, 'x-access-token': token },
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as { count: number };
    },
    getList: async ({ baseUrl, apikey, token }) => {
      const response = await fetch(`${baseUrl}/v1/notification`, {
        headers: { 'x-access-apikey': apikey, 'x-access-token': token },
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as Notification[];
    },
  };
};

export const notificationRepository = getNotificationRepository();
