import type { Notification } from '@/entities/notification';
import type { NotificationRepository } from '@/repositories/notificationRepository';

export interface NotificationService {
  getCount(token: string): Promise<{ count: number }>;
  getList(token: string): Promise<Notification[]>;
}

type Deps = { repositories: [NotificationRepository] };
export const getNotificationService = ({ repositories: [notificationRepository] }: Deps): NotificationService => {
  return {
    getCount: (token: string) => notificationRepository.getCount({ token }),
    getList: (token: string) => notificationRepository.getList({ token }),
  };
};
